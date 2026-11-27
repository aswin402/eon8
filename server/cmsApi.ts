import crypto from 'node:crypto';
import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import {
  audit,
  clearSessionCookie,
  createSession,
  destroySession,
  destroyUserSessions,
  findUserByEmail,
  getSessionUser,
  hashPassword,
  passwordProblem,
  requireUser,
  sessionCookie,
  verifyPassword,
  type AdminUser,
  SESSION_COOKIE,
} from './lib/auth.ts';
import { onDatabaseReady, query, transaction, type Queryable } from './lib/db.ts';
import { ROOT_DIR } from './lib/env.ts';
import { optimiseImage } from './lib/images.ts';
import { resetDbRouteCache } from './routes.ts';
import { invalidateHeadCaches } from './seoApi.ts';
import {
  HttpError,
  clientIp,
  createRateLimiter,
  parseCookies,
  readJsonBody,
  sendJson,
} from './lib/http.ts';

const UPLOADS_BLOG_DIR = path.join(ROOT_DIR, 'public', 'uploads', 'blog');
// The media picker's "site library". The Docker image only ships the build
// output, where Vite has copied public/ into dist/.
const WP_UPLOADS_DIR = [
  path.join(ROOT_DIR, 'public', 'wp-content', 'uploads'),
  path.join(ROOT_DIR, 'dist', 'wp-content', 'uploads'),
].find((dir) => fs.existsSync(dir)) ?? path.join(ROOT_DIR, 'public', 'wp-content', 'uploads');
const LEGACY_CONTENT_FILE = path.join(ROOT_DIR, 'data', 'cms-content.json');
const MAX_UPLOAD_BODY = 12 * 1024 * 1024; // base64 of an 8 MB image
const MAX_POST_BODY = 4 * 1024 * 1024;

interface StoredCategoryPair {
  name: string;
  slug: string;
}

interface StoredBlogPost {
  id: number;
  slug: string;
  originalSlug?: string;
  title: string;
  status: 'published' | 'draft';
  featured: boolean;
  category: string;
  categories: string[];
  date: string;
  dateIso: string;
  readTime: string;
  author: string;
  thumbnail: string;
  excerpt: string;
  postType?: 'post' | 'news' | 'newsletter';
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  createdAt: string;
  updatedAt: string;
  blocks: unknown[];
}

// Per address, and per email *from that address*: a stranger sending wrong
// passwords for an admin's email cannot lock the real admin out.
const loginByIp = createRateLimiter(10, 10 * 60 * 1000);
const loginByEmailAndIp = createRateLimiter(6, 15 * 60 * 1000);

// Compared against when the email is unknown, so the response time does not
// reveal which emails have accounts.
let dummyHash: Promise<string> | null = null;
const getDummyHash = () => (dummyHash ??= hashPassword(crypto.randomBytes(18).toString('base64')));

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

/** Marks blog content as changed: bumps the version and clears dependent caches. */
async function bumpVersion(db: Queryable): Promise<void> {
  await db.query(
    `UPDATE cms_meta SET value = to_jsonb((value::text)::int + 1) WHERE key = 'version'`
  );
  // New or renamed posts must not get a 404 or be missing from the sitemap
  // while these caches are warm.
  resetDbRouteCache();
  invalidateHeadCaches();
}

/** Rebuilds the payload the client expects (same shape as the old JSON file). */
async function loadState(includeDrafts: boolean) {
  const [version, posts, hiddenIds, hiddenSlugs, redirects, categories, hiddenCats] =
    await Promise.all([
      query<{ value: number }>(`SELECT value FROM cms_meta WHERE key = 'version'`),
      query<{ data: StoredBlogPost }>(
        includeDrafts
          ? 'SELECT data - \'blocks\' AS data FROM cms_posts'
          : `SELECT data - 'blocks' AS data FROM cms_posts WHERE status = 'published'`
      ),
      query<{ id: string }>('SELECT id FROM cms_hidden_posts'),
      query<{ slug: string }>('SELECT slug FROM cms_hidden_slugs'),
      query<{ from_slug: string; to_slug: string }>('SELECT * FROM cms_slug_redirects'),
      query<StoredCategoryPair>('SELECT name, slug FROM cms_categories ORDER BY name'),
      query<{ slug: string }>('SELECT slug FROM cms_hidden_categories'),
    ]);
  const upsertedSummaries: Record<string, Omit<StoredBlogPost, 'blocks'>> = {};
  for (const row of posts.rows) upsertedSummaries[String(row.data.id)] = row.data;
  return {
    version: Number(version.rows[0]?.value ?? 1),
    upsertedSummaries,
    deletedPostIds: hiddenIds.rows.map((r) => Number(r.id)),
    deletedSlugs: hiddenSlugs.rows.map((r) => r.slug),
    slugRedirects: Object.fromEntries(redirects.rows.map((r) => [r.from_slug, r.to_slug])),
    customCategories: categories.rows,
    deletedCategorySlugs: hiddenCats.rows.map((r) => r.slug),
  };
}

async function hidePost(db: Queryable, id: number, slugs: Array<string | undefined>) {
  await db.query('INSERT INTO cms_hidden_posts (id) VALUES ($1) ON CONFLICT DO NOTHING', [id]);
  for (const slug of slugs) {
    if (slug) {
      await db.query('INSERT INTO cms_hidden_slugs (slug) VALUES ($1) ON CONFLICT DO NOTHING', [
        slug,
      ]);
    }
  }
}

async function ensureCategory(db: Queryable, name: string): Promise<void> {
  const slug = slugify(name);
  if (!slug) return;
  await db.query(
    'INSERT INTO cms_categories (slug, name) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING',
    [slug, name]
  );
  await db.query('DELETE FROM cms_hidden_categories WHERE slug = $1', [slug]);
}

async function writePost(db: Queryable, post: StoredBlogPost): Promise<void> {
  await db.query(
    `INSERT INTO cms_posts (id, slug, status, featured, data, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id) DO UPDATE
       SET slug = EXCLUDED.slug, status = EXCLUDED.status, featured = EXCLUDED.featured,
           data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`,
    [post.id, post.slug, post.status, post.featured, JSON.stringify(post), post.createdAt, post.updatedAt]
  );
}

const MAX_REVISIONS_PER_POST = 20;

/** Keeps the previous version of a post, trimming to the newest 20. */
async function saveRevision(db: Queryable, previous: StoredBlogPost, user: AdminUser): Promise<void> {
  await db.query(
    'INSERT INTO cms_post_revisions (post_id, data, saved_by, saved_by_email) VALUES ($1, $2, $3, $4)',
    [previous.id, JSON.stringify(previous), user.id, user.email]
  );
  await db.query(
    `DELETE FROM cms_post_revisions WHERE post_id = $1 AND id NOT IN (
       SELECT id FROM cms_post_revisions WHERE post_id = $1 ORDER BY saved_at DESC, id DESC LIMIT ${MAX_REVISIONS_PER_POST})`,
    [previous.id]
  );
}

// ---------------------------------------------------------------------------
// Images

const IMAGE_TYPES: Record<string, { ext: string; magic: (b: Buffer) => boolean }> = {
  'image/jpeg': { ext: '.jpg', magic: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  'image/png': {
    ext: '.png',
    magic: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  },
  'image/gif': { ext: '.gif', magic: (b) => b.subarray(0, 4).toString('ascii') === 'GIF8' },
  'image/webp': {
    ext: '.webp',
    magic: (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP',
  },
  'image/avif': { ext: '.avif', magic: (b) => b.subarray(4, 12).toString('ascii').startsWith('ftypavi') },
};

function scanDirectoryImages(
  baseDir: string,
  publicPrefix: string,
  folder: 'uploaded' | 'site-library',
  maxItems: number,
  q: string
) {
  if (!fs.existsSync(baseDir)) return [];
  const results: Array<{ url: string; name: string; folder: typeof folder; size: number; updatedAt: string; mtimeMs: number }> = [];
  const needle = q.trim().toLowerCase();
  const validExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
  const walk = (dir: string) => {
    if (results.length >= maxItems * 3) return;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.isFile() || !validExts.has(path.extname(entry.name).toLowerCase())) continue;
      if (folder === 'site-library' && /-\d{2,3}x\d{2,3}\.[a-z]+$/i.test(entry.name)) continue;
      if (needle && !entry.name.toLowerCase().includes(needle)) continue;
      try {
        const stat = fs.statSync(full);
        const rel = path.relative(baseDir, full).split(path.sep).join('/');
        results.push({
          url: `${publicPrefix}/${rel}`,
          name: entry.name,
          folder,
          size: stat.size,
          updatedAt: stat.mtime.toISOString(),
          mtimeMs: stat.mtimeMs,
        });
      } catch {
        // Skip unreadable files.
      }
    }
  };
  walk(baseDir);
  results.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return results.slice(0, maxItems).map(({ mtimeMs: _m, ...rest }) => {
    void _m;
    return rest;
  });
}

// ---------------------------------------------------------------------------
// Session payloads

function sessionPayload(user: AdminUser | null) {
  return {
    authenticated: Boolean(user),
    mode: 'node-api' as const,
    admin: user
      ? {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
          updatedAt: user.updatedAt,
        }
      : undefined,
  };
}

// ---------------------------------------------------------------------------

export async function handleCmsApiRequest(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
): Promise<boolean> {
  const pathname = url.pathname.replace(/\/+$/, '');
  if (!pathname.startsWith('/api/cms')) return false;
  const method = (req.method || 'GET').toUpperCase();
  const decodeTail = (prefix: string) => {
    try {
      return decodeURIComponent(pathname.slice(prefix.length));
    } catch {
      throw new HttpError(400, 'Malformed URL.');
    }
  };

  // --- Public ---------------------------------------------------------------
  if (method === 'GET' && pathname === '/api/cms/public-state') {
    sendJson(res, 200, await loadState(false));
    return true;
  }

  if (method === 'GET' && pathname.startsWith('/api/cms/public-post/')) {
    const slug = decodeTail('/api/cms/public-post/');
    const { rows } = await query<{ data: StoredBlogPost }>(
      `SELECT data FROM cms_posts WHERE slug = $1 AND status = 'published'`,
      [slug]
    );
    sendJson(res, 200, { post: rows[0]?.data ?? null });
    return true;
  }

  // --- Auth -----------------------------------------------------------------
  if (method === 'GET' && pathname === '/api/cms/auth/session') {
    sendJson(res, 200, sessionPayload(await getSessionUser(req)));
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/auth/login') {
    const ip = clientIp(req);
    const body = await readJsonBody<{ email?: string; password?: string }>(req);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const emailKey = `${email}|${ip}`;
    const wait = Math.max(loginByIp.check(ip), loginByEmailAndIp.check(emailKey));
    if (wait > 0) {
      throw new HttpError(429, `Too many failed sign-in attempts. Try again in ${wait}s.`);
    }
    const row = email ? await findUserByEmail(email) : null;
    const passwordOk = await verifyPassword(password, row?.password_hash ?? (await getDummyHash()));
    const valid = Boolean(row && row.is_active && passwordOk);
    if (!row || !valid) {
      loginByIp.hit(ip);
      loginByEmailAndIp.hit(emailKey);
      await audit(null, 'login_failed', 'admin_user', row?.id ?? null, { email, ip });
      throw new HttpError(401, 'Invalid email address or password.');
    }
    loginByIp.reset(ip);
    loginByEmailAndIp.reset(emailKey);
    const { token, maxAgeSec } = await createSession(Number(row.id), req);
    await audit({ id: Number(row.id), email: row.email }, 'login', 'admin_user', row.id, { ip });
    const user = await getSessionUserFromRow(row.id);
    sendJson(res, 200, sessionPayload(user), { 'Set-Cookie': sessionCookie(req, token, maxAgeSec) });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/auth/logout') {
    await destroySession(req);
    sendJson(res, 200, { ok: true }, { 'Set-Cookie': clearSessionCookie(req) });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/auth/change-password') {
    const user = await requireUser(req, { allowPendingPasswordChange: true });
    const body = await readJsonBody<{ currentPassword?: string; newEmail?: string; newPassword?: string }>(req);
    const row = await findUserByEmail(user.email);
    if (!row || !(await verifyPassword(String(body.currentPassword || ''), row.password_hash))) {
      throw new HttpError(400, 'Current password is incorrect.');
    }
    const newEmail = String(body.newEmail || user.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      throw new HttpError(400, 'Please enter a valid email address.');
    }
    const newPassword = String(body.newPassword || '');
    const problem = passwordProblem(newPassword);
    if (problem) throw new HttpError(400, problem);
    if (newEmail !== user.email && (await findUserByEmail(newEmail))) {
      throw new HttpError(409, 'Another admin account already uses that email.');
    }
    const hash = await hashPassword(newPassword);
    const currentToken = parseCookies(req)[SESSION_COOKIE];
    await transaction(async (db) => {
      await db.query(
        `UPDATE admin_users
            SET email = $1, password_hash = $2, must_change_password = false, updated_at = now()
          WHERE id = $3`,
        [newEmail, hash, user.id]
      );
      await destroyUserSessions(user.id, currentToken, db);
      await audit(user, 'change_password', 'admin_user', user.id, { emailChanged: newEmail !== user.email }, db);
    });
    sendJson(res, 200, sessionPayload(await getSessionUser(req)));
    return true;
  }

  // --- Admin: blog ----------------------------------------------------------
  const user = await requireUser(req, { roles: ['admin', 'editor'] });

  if (method === 'GET' && pathname === '/api/cms/admin/state') {
    sendJson(res, 200, await loadState(true));
    return true;
  }

  if (method === 'GET' && pathname.startsWith('/api/cms/admin/post/')) {
    const id = Number(decodeTail('/api/cms/admin/post/'));
    const { rows } = await query<{ data: StoredBlogPost }>('SELECT data FROM cms_posts WHERE id = $1', [id]);
    sendJson(res, 200, { post: rows[0]?.data ?? null });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/admin/posts') {
    const incoming = await readJsonBody<StoredBlogPost>(req, MAX_POST_BODY);
    const slug = slugify(incoming.slug || incoming.title || '');
    if (!slug) throw new HttpError(400, 'A valid URL slug is required.');
    if (!incoming.title?.trim()) throw new HttpError(400, 'Article title is required.');
    const postId = Number.isFinite(incoming.id) && incoming.id > 0 ? Math.trunc(incoming.id) : Date.now();

    const record = await transaction(async (db) => {
      const conflict = await db.query<{ data: StoredBlogPost }>(
        'SELECT data FROM cms_posts WHERE slug = $1 AND id <> $2',
        [slug, postId]
      );
      if (conflict.rows[0]) {
        throw new HttpError(409, `Slug "/blog/${slug}" is already used by "${conflict.rows[0].data.title}".`);
      }
      const existing = (await db.query<{ data: StoredBlogPost }>('SELECT data FROM cms_posts WHERE id = $1', [postId]))
        .rows[0]?.data;
      const previousSlug = existing?.slug || incoming.originalSlug;
      if (previousSlug && previousSlug !== slug) {
        await db.query(
          `INSERT INTO cms_slug_redirects (from_slug, to_slug) VALUES ($1, $2)
           ON CONFLICT (from_slug) DO UPDATE SET to_slug = EXCLUDED.to_slug`,
          [previousSlug, slug]
        );
        await db.query('INSERT INTO cms_hidden_slugs (slug) VALUES ($1) ON CONFLICT DO NOTHING', [previousSlug]);
      }
      await db.query('DELETE FROM cms_slug_redirects WHERE from_slug = $1', [slug]);
      await db.query('DELETE FROM cms_hidden_slugs WHERE slug = $1', [slug]);
      await db.query('DELETE FROM cms_hidden_posts WHERE id = $1', [postId]);

      const primaryCategory = String(incoming.category || 'Digital Marketing').trim();
      await ensureCategory(db, primaryCategory);
      const nowIso = new Date().toISOString();
      const next: StoredBlogPost = {
        ...incoming,
        id: postId,
        slug,
        originalSlug: existing?.originalSlug ?? incoming.originalSlug,
        title: incoming.title.trim(),
        status: incoming.status === 'draft' ? 'draft' : 'published',
        featured: Boolean(incoming.featured),
        postType: incoming.postType === 'news' || incoming.postType === 'newsletter' ? incoming.postType : 'post',
        category: primaryCategory,
        categories:
          Array.isArray(incoming.categories) && incoming.categories.length > 0
            ? incoming.categories.map(String)
            : [primaryCategory],
        createdAt: existing?.createdAt || incoming.createdAt || nowIso,
        updatedAt: nowIso,
        blocks: Array.isArray(incoming.blocks) ? incoming.blocks : [],
      };
      if (existing) await saveRevision(db, existing, user);
      await writePost(db, next);
      await bumpVersion(db);
      await audit(user, existing ? 'update' : 'create', 'blog_post', postId, { slug, status: next.status }, db);
      return next;
    });
    sendJson(res, 200, { post: record });
    return true;
  }

  // --- Revision history -------------------------------------------------------
  const revList = pathname.match(/^\/api\/cms\/admin\/posts\/(\d+)\/revisions$/);
  if (method === 'GET' && revList) {
    const { rows } = await query<{ id: string; saved_at: Date; saved_by_email: string | null; title: string; status: string }>(
      `SELECT id, saved_at, saved_by_email, data->>'title' AS title, data->>'status' AS status
         FROM cms_post_revisions WHERE post_id = $1 ORDER BY saved_at DESC`,
      [Number(revList[1])]
    );
    sendJson(res, 200, {
      items: rows.map((r) => ({
        id: Number(r.id),
        savedAt: r.saved_at.toISOString(),
        savedBy: r.saved_by_email,
        title: r.title,
        status: r.status,
      })),
    });
    return true;
  }

  const revRestore = pathname.match(/^\/api\/cms\/admin\/revisions\/(\d+)\/restore$/);
  if (method === 'POST' && revRestore) {
    const restored = await transaction(async (db) => {
      const rev = (await db.query<{ post_id: string; data: StoredBlogPost }>(
        'SELECT post_id, data FROM cms_post_revisions WHERE id = $1',
        [Number(revRestore[1])]
      )).rows[0];
      if (!rev) throw new HttpError(404, 'Revision not found.');
      const current = (await db.query<{ data: StoredBlogPost }>('SELECT data FROM cms_posts WHERE id = $1', [rev.post_id]))
        .rows[0]?.data;
      const slug = slugify(rev.data.slug || rev.data.title || '');
      if (!slug) throw new HttpError(400, 'This version has no valid slug.');
      const clash = await db.query('SELECT 1 FROM cms_posts WHERE slug = $1 AND id <> $2', [slug, rev.post_id]);
      if (clash.rowCount) throw new HttpError(409, `Another post now uses the slug "${slug}". Rename it first.`);
      if (current) await saveRevision(db, current, user);
      // Same slug bookkeeping as a normal save: the slug being replaced redirects
      // to the restored one, and the restored slug is no longer hidden/redirected.
      if (current?.slug && current.slug !== slug) {
        await db.query(
          `INSERT INTO cms_slug_redirects (from_slug, to_slug) VALUES ($1, $2)
           ON CONFLICT (from_slug) DO UPDATE SET to_slug = EXCLUDED.to_slug`,
          [current.slug, slug]
        );
        await db.query('INSERT INTO cms_hidden_slugs (slug) VALUES ($1) ON CONFLICT DO NOTHING', [current.slug]);
      }
      await db.query('DELETE FROM cms_slug_redirects WHERE from_slug = $1', [slug]);
      await db.query('DELETE FROM cms_hidden_slugs WHERE slug = $1', [slug]);
      await db.query('DELETE FROM cms_hidden_posts WHERE id = $1', [rev.post_id]);
      const next: StoredBlogPost = { ...rev.data, slug, updatedAt: new Date().toISOString() };
      await writePost(db, next);
      await bumpVersion(db);
      await audit(user, 'restore_revision', 'blog_post', rev.post_id, { revision: Number(revRestore[1]) }, db);
      return next;
    });
    sendJson(res, 200, { post: restored });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/admin/posts/restore') {
    const body = await readJsonBody<{ id: number; slug: string }>(req);
    await transaction(async (db) => {
      await db.query('DELETE FROM cms_hidden_posts WHERE id = $1', [Number(body.id)]);
      await db.query('DELETE FROM cms_hidden_slugs WHERE slug = $1', [String(body.slug || '')]);
      await bumpVersion(db);
      await audit(user, 'restore', 'blog_post', body.id, { slug: body.slug }, db);
    });
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/admin/posts/bulk') {
    const body = await readJsonBody<{
      action: 'publish' | 'draft' | 'feature' | 'unfeature' | 'delete';
      items: Array<{ id: number; slug: string; seedPost?: StoredBlogPost }>;
    }>(req, MAX_POST_BODY);
    if (!['publish', 'draft', 'feature', 'unfeature', 'delete'].includes(body.action)) {
      throw new HttpError(400, 'Unknown bulk action.');
    }
    await transaction(async (db) => {
      const nowIso = new Date().toISOString();
      for (const item of body.items || []) {
        const id = Number(item.id);
        const existing = (await db.query<{ data: StoredBlogPost }>('SELECT data FROM cms_posts WHERE id = $1', [id]))
          .rows[0]?.data;
        if (body.action === 'delete') {
          await db.query('DELETE FROM cms_posts WHERE id = $1', [id]);
          await hidePost(db, id, [item.slug, existing?.slug, existing?.originalSlug]);
          continue;
        }
        const target = existing || item.seedPost;
        if (!target) continue;
        await writePost(db, {
          ...target,
          id,
          updatedAt: nowIso,
          createdAt: target.createdAt || nowIso,
          status: body.action === 'publish' ? 'published' : body.action === 'draft' ? 'draft' : target.status,
          featured: body.action === 'feature' ? true : body.action === 'unfeature' ? false : target.featured,
        });
      }
      await bumpVersion(db);
      await audit(user, `bulk_${body.action}`, 'blog_post', null, { ids: (body.items || []).map((i) => i.id) }, db);
    });
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (method === 'DELETE' && pathname.startsWith('/api/cms/admin/posts/')) {
    const id = Number(decodeTail('/api/cms/admin/posts/'));
    if (!Number.isFinite(id)) throw new HttpError(400, 'Invalid post id.');
    const querySlug = url.searchParams.get('slug') || '';
    await transaction(async (db) => {
      const existing = (await db.query<{ data: StoredBlogPost }>('SELECT data FROM cms_posts WHERE id = $1', [id]))
        .rows[0]?.data;
      await db.query('DELETE FROM cms_posts WHERE id = $1', [id]);
      await hidePost(db, id, [querySlug, existing?.slug, existing?.originalSlug]);
      await bumpVersion(db);
      await audit(user, 'delete', 'blog_post', id, { slug: existing?.slug || querySlug }, db);
    });
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/admin/categories') {
    const body = await readJsonBody<{ name?: string; slug?: string }>(req);
    const name = String(body.name || '').trim();
    const slug = slugify(body.slug || name);
    if (!name || !slug) throw new HttpError(400, 'Category name is required.');
    await transaction(async (db) => {
      await db.query(
        `INSERT INTO cms_categories (slug, name) VALUES ($1, $2)
         ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name`,
        [slug, name]
      );
      await db.query('DELETE FROM cms_hidden_categories WHERE slug = $1', [slug]);
      await bumpVersion(db);
      await audit(user, 'upsert', 'blog_category', slug, { name }, db);
    });
    sendJson(res, 200, { category: { name, slug } });
    return true;
  }

  if (method === 'PATCH' && pathname.startsWith('/api/cms/admin/categories/')) {
    const oldSlug = decodeTail('/api/cms/admin/categories/');
    const body = await readJsonBody<{ newName?: string; oldName?: string }>(req);
    const newName = String(body.newName || '').trim();
    const newSlug = slugify(newName);
    if (!newName || !newSlug) throw new HttpError(400, 'New category name is required.');
    const oldNameLower = String(body.oldName || '').trim().toLowerCase();
    await transaction(async (db) => {
      if (oldSlug !== newSlug) {
        await db.query('INSERT INTO cms_hidden_categories (slug) VALUES ($1) ON CONFLICT DO NOTHING', [oldSlug]);
      }
      await db.query('DELETE FROM cms_categories WHERE slug = ANY($1)', [[oldSlug, newSlug]]);
      await db.query('INSERT INTO cms_categories (slug, name) VALUES ($1, $2)', [newSlug, newName]);
      await db.query('DELETE FROM cms_hidden_categories WHERE slug = $1', [newSlug]);
      const posts = await db.query<{ data: StoredBlogPost }>('SELECT data FROM cms_posts');
      for (const { data: post } of posts.rows) {
        const matches = (cat: string) => slugify(cat) === oldSlug || (oldNameLower && cat.toLowerCase() === oldNameLower);
        if (!matches(post.category) && !post.categories.some(matches)) continue;
        await writePost(db, {
          ...post,
          category: matches(post.category) ? newName : post.category,
          categories: post.categories.map((c) => (matches(c) ? newName : c)),
        });
      }
      await bumpVersion(db);
      await audit(user, 'rename', 'blog_category', oldSlug, { newName }, db);
    });
    sendJson(res, 200, { category: { name: newName, slug: newSlug } });
    return true;
  }

  if (method === 'DELETE' && pathname.startsWith('/api/cms/admin/categories/')) {
    const slug = decodeTail('/api/cms/admin/categories/');
    await transaction(async (db) => {
      await db.query('DELETE FROM cms_categories WHERE slug = $1', [slug]);
      await db.query('INSERT INTO cms_hidden_categories (slug) VALUES ($1) ON CONFLICT DO NOTHING', [slug]);
      await bumpVersion(db);
      await audit(user, 'delete', 'blog_category', slug, undefined, db);
    });
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (method === 'GET' && pathname === '/api/cms/admin/media') {
    const q = url.searchParams.get('q') || '';
    sendJson(res, 200, {
      items: [
        ...scanDirectoryImages(UPLOADS_BLOG_DIR, '/uploads/blog', 'uploaded', 100, q),
        ...scanDirectoryImages(WP_UPLOADS_DIR, '/wp-content/uploads', 'site-library', 80, q),
      ],
    });
    return true;
  }

  if (method === 'POST' && pathname === '/api/cms/admin/media/upload') {
    const body = await readJsonBody<{ fileName?: string; mimeType?: string; base64Data?: string }>(req, MAX_UPLOAD_BODY);
    const type = IMAGE_TYPES[String(body.mimeType || '').toLowerCase()];
    if (!type) throw new HttpError(400, 'Unsupported image format. Please upload JPG, PNG, WEBP, GIF, or AVIF.');
    const raw = String(body.base64Data || '').replace(/^data:[^;]+;base64,/, '');
    if (!raw) throw new HttpError(400, 'Image payload is empty.');
    const original = Buffer.from(raw, 'base64');
    if (original.length > 8 * 1024 * 1024) throw new HttpError(400, 'Image exceeds the 8 MB upload limit.');
    if (!type.magic(original)) throw new HttpError(400, 'The file content does not match its image type.');
    const { buffer, optimised } = await optimiseImage(original, String(body.mimeType).toLowerCase());
    const stem = slugify(path.basename(body.fileName || 'blog-image', path.extname(body.fileName || ''))) || 'blog-image';
    const finalName = `${stem}-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}${type.ext}`;
    fs.mkdirSync(UPLOADS_BLOG_DIR, { recursive: true });
    fs.writeFileSync(path.join(UPLOADS_BLOG_DIR, finalName), buffer);
    await audit(user, 'upload', 'media', finalName, { size: buffer.length, originalSize: original.length, optimised });
    sendJson(res, 200, {
      item: { url: `/uploads/blog/${finalName}`, name: finalName, folder: 'uploaded', size: buffer.length, updatedAt: new Date().toISOString() },
    });
    return true;
  }

  if (method === 'DELETE' && pathname === '/api/cms/admin/media') {
    const target = url.searchParams.get('url') || '';
    if (!target.startsWith('/uploads/blog/')) throw new HttpError(400, 'Only custom uploaded images can be deleted.');
    const resolved = path.resolve(UPLOADS_BLOG_DIR, path.basename(target));
    if (path.dirname(resolved) !== UPLOADS_BLOG_DIR) throw new HttpError(400, 'Invalid file path.');
    if (fs.existsSync(resolved)) fs.unlinkSync(resolved);
    await audit(user, 'delete', 'media', path.basename(target));
    sendJson(res, 200, { ok: true });
    return true;
  }

  throw new HttpError(404, `Unknown CMS endpoint: ${method} ${pathname}`);
}

async function getSessionUserFromRow(id: string): Promise<AdminUser> {
  const { rows } = await query<{
    id: string; email: string; name: string; role: 'admin' | 'editor'; must_change_password: boolean; updated_at: Date;
  }>('SELECT id, email, name, role, must_change_password, updated_at FROM admin_users WHERE id = $1', [id]);
  const r = rows[0];
  return {
    id: Number(r.id),
    email: r.email,
    name: r.name,
    role: r.role,
    mustChangePassword: r.must_change_password,
    updatedAt: r.updated_at.toISOString(),
  };
}

/** One-time import of the former JSON content file into the database. */
onDatabaseReady(async (db) => {
  const done = await db.query(`SELECT 1 FROM cms_meta WHERE key = 'json_imported'`);
  if (done.rowCount) return;
  if (fs.existsSync(LEGACY_CONTENT_FILE)) {
    const legacy = JSON.parse(fs.readFileSync(LEGACY_CONTENT_FILE, 'utf-8')) as {
      upsertedPosts?: Record<string, StoredBlogPost>;
      deletedPostIds?: number[];
      deletedSlugs?: string[];
      slugRedirects?: Record<string, string>;
      customCategories?: StoredCategoryPair[];
      deletedCategorySlugs?: string[];
    };
    {
      for (const post of Object.values(legacy.upsertedPosts ?? {})) await writePost(db, post);
      for (const id of legacy.deletedPostIds ?? []) await hidePost(db, id, []);
      for (const slug of legacy.deletedSlugs ?? []) {
        await db.query('INSERT INTO cms_hidden_slugs (slug) VALUES ($1) ON CONFLICT DO NOTHING', [slug]);
      }
      for (const [from, to] of Object.entries(legacy.slugRedirects ?? {})) {
        await db.query('INSERT INTO cms_slug_redirects VALUES ($1, $2) ON CONFLICT DO NOTHING', [from, to]);
      }
      for (const c of legacy.customCategories ?? []) {
        await db.query('INSERT INTO cms_categories (slug, name) VALUES ($1, $2) ON CONFLICT DO NOTHING', [c.slug, c.name]);
      }
      for (const slug of legacy.deletedCategorySlugs ?? []) {
        await db.query('INSERT INTO cms_hidden_categories (slug) VALUES ($1) ON CONFLICT DO NOTHING', [slug]);
      }
    }
    console.log('[cms] Imported data/cms-content.json into the database.');
  }
  await db.query(`INSERT INTO cms_meta (key, value) VALUES ('json_imported', 'true') ON CONFLICT DO NOTHING`);
});
