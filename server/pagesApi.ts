import type { IncomingMessage, ServerResponse } from 'node:http';
import { audit, requireUser, type AdminUser } from './lib/auth.ts';
import { isDatabaseConfigured, query, transaction, type Queryable } from './lib/db.ts';
import { HttpError, readJsonBody, sendJson } from './lib/http.ts';

/**
 * Editable website pages (see migrations/003_pages.sql).
 *
 * Public:
 *   GET  /api/pages/index                 published page keys + paths (small, cached)
 *   GET  /api/pages/content?key=...        one published page's content
 * Admin (admin + editor):
 *   GET    /api/admin/pages                every edited / custom page (no content)
 *   GET    /api/admin/pages/item?key=...   one page with content (drafts too)
 *   PUT    /api/admin/pages/item           create or save
 *   DELETE /api/admin/pages/item?key=...   custom: delete; override: back to original
 *   GET    /api/admin/pages/revisions?key=...
 *   POST   /api/admin/pages/revisions/restore   { id }
 */

/** Templates the public site can render. Custom pages may use the last two. */
export const PAGE_TEMPLATES = [
  'service',
  'crypto-service',
  'crypto-agency',
  'ieo-listing',
  'nft-service',
  'nft-community',
  'influencer-agency',
  'instagram-influencer',
  'twitter-influencer',
  'creator-platform',
  'policy',
  'content',
] as const;
const CUSTOM_TEMPLATES = new Set(['service', 'content']);
const KEY_RE = /^([a-z0-9-]+):([a-z0-9][a-z0-9-]{0,95})$/;
const MAX_PAGE_BODY = 3 * 1024 * 1024;
const MAX_REVISIONS = 20;

export interface PageIndexEntry {
  key: string;
  path: string;
  kind: 'override' | 'custom';
  template: string;
  title: string;
  description: string;
  noIndex: boolean;
  ogImage: string;
  updatedAt: string;
}

interface PageRow {
  page_key: string;
  path: string;
  kind: 'override' | 'custom';
  template: string;
  title: string;
  status: 'published' | 'draft';
  data: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  updated_by_email: string | null;
}

// ---------------------------------------------------------------------------
// Published index (used by the site, the router, SEO tags and the sitemap)

let indexCache: { at: number; value: PageIndexEntry[] } | null = null;
const listeners: Array<() => void> = [];

/** Lets other modules (route, SEO and sitemap caches) clear themselves when pages change. */
export function onPagesChanged(fn: () => void): void {
  listeners.push(fn);
}

function pagesChanged(): void {
  indexCache = null;
  for (const fn of listeners) fn();
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

/** Title, description and share image as the page shows them (same fields the page uses). */
function seoFromData(data: Record<string, unknown>, fallbackTitle: string) {
  const hero = (data.hero ?? {}) as Record<string, unknown>;
  return {
    title: str(data.metaTitle) || str(data.title) || fallbackTitle,
    description: str(data.metaDesc) || str(data.metaDescription) || str(data.excerpt),
    noIndex: data.noIndex === true,
    ogImage: str(data.ogImage) || str(hero.mediaSrc) || str(data.coverImage),
  };
}

export async function publishedPages(): Promise<PageIndexEntry[]> {
  if (!isDatabaseConfigured()) return [];
  if (indexCache && Date.now() - indexCache.at < 60_000) return indexCache.value;
  const r = await query<PageRow>(`SELECT * FROM cms_pages WHERE status = 'published'`);
  const value = r.rows.map((row) => ({
    key: row.page_key,
    path: row.path,
    kind: row.kind,
    template: row.template,
    ...seoFromData(row.data, row.title),
    updatedAt: row.updated_at.toISOString(),
  }));
  indexCache = { at: Date.now(), value };
  return value;
}

/** Published custom page at this path, if any (path like /my-page/ or /my-page). */
export async function customPageAt(pathname: string): Promise<PageIndexEntry | null> {
  const want = `/${pathname.replace(/^\/+|\/+$/g, '').toLowerCase()}/`;
  try {
    return (await publishedPages()).find((p) => p.kind === 'custom' && p.path.toLowerCase() === want) ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Validation

/** Rejects script URLs anywhere in the content; returns the cleaned object. */
function checkContent(value: unknown, depth = 0): void {
  if (depth > 40) throw new HttpError(400, 'Page content is nested too deeply.');
  if (typeof value === 'string') {
    if (/^\s*(javascript|vbscript|data:text\/html)/i.test(value)) {
      throw new HttpError(400, 'Links must start with https://, /, #, tel: or mailto:.');
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) checkContent(v, depth + 1);
    return;
  }
  if (value && typeof value === 'object') {
    for (const v of Object.values(value)) checkContent(v, depth + 1);
  }
}

function parseKey(raw: unknown): { key: string; template: string; slug: string } {
  const key = String(raw || '').trim().toLowerCase();
  const m = key.match(KEY_RE);
  if (!m) throw new HttpError(400, 'Invalid page key.');
  if (!(PAGE_TEMPLATES as readonly string[]).includes(m[1])) throw new HttpError(400, 'Unknown page template.');
  return { key, template: m[1], slug: m[2] };
}

export type PathChecker = (path: string, slug: string) => Promise<string | null>;
let customPathProblem: PathChecker = async () => null;

/** Set by the router so a custom page cannot take over an existing URL. */
export function setCustomPathChecker(fn: PathChecker): void {
  customPathProblem = fn;
}

// ---------------------------------------------------------------------------
// Writes

async function saveRevision(db: Queryable, row: PageRow, user: AdminUser): Promise<void> {
  await db.query(
    `INSERT INTO cms_page_revisions (page_key, title, status, data, saved_by, saved_by_email)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [row.page_key, row.title, row.status, JSON.stringify(row.data), user.id, user.email]
  );
  await db.query(
    `DELETE FROM cms_page_revisions WHERE page_key = $1 AND id NOT IN (
       SELECT id FROM cms_page_revisions WHERE page_key = $1 ORDER BY saved_at DESC, id DESC LIMIT ${MAX_REVISIONS})`,
    [row.page_key]
  );
}

function toItem(row: PageRow, withData: boolean) {
  return {
    key: row.page_key,
    path: row.path,
    kind: row.kind,
    template: row.template,
    title: row.title,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    updatedBy: row.updated_by_email,
    ...(withData ? { data: row.data } : {}),
  };
}

export async function handlePagesApi(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const { pathname } = url;
  const method = (req.method || 'GET').toUpperCase();
  if (!pathname.startsWith('/api/pages') && !pathname.startsWith('/api/admin/pages')) return false;
  if (!isDatabaseConfigured()) throw new HttpError(503, 'The database is not configured.');

  // ---- public ----
  if (method === 'GET' && pathname === '/api/pages/index') {
    const pages = await publishedPages();
    res.setHeader('Cache-Control', 'public, max-age=30');
    sendJson(res, 200, {
      pages: pages.map((p) => ({ key: p.key, path: p.path, kind: p.kind, template: p.template, updatedAt: p.updatedAt })),
    });
    return true;
  }
  if (method === 'GET' && pathname === '/api/pages/content') {
    const { key } = parseKey(url.searchParams.get('key'));
    const r = await query<PageRow>(`SELECT * FROM cms_pages WHERE page_key = $1 AND status = 'published'`, [key]);
    if (!r.rows[0]) throw new HttpError(404, 'Page not found.');
    res.setHeader('Cache-Control', 'public, max-age=30');
    const row = r.rows[0];
    sendJson(res, 200, { key: row.page_key, path: row.path, kind: row.kind, template: row.template, title: row.title, data: row.data, updatedAt: row.updated_at.toISOString() });
    return true;
  }

  // ---- admin ----
  const user = await requireUser(req, { roles: ['admin', 'editor'] });

  if (method === 'GET' && pathname === '/api/admin/pages') {
    const r = await query<PageRow>('SELECT * FROM cms_pages ORDER BY updated_at DESC');
    sendJson(res, 200, { items: r.rows.map((row) => toItem(row, false)) });
    return true;
  }

  if (method === 'GET' && pathname === '/api/admin/pages/item') {
    const { key } = parseKey(url.searchParams.get('key'));
    const r = await query<PageRow>('SELECT * FROM cms_pages WHERE page_key = $1', [key]);
    sendJson(res, 200, { item: r.rows[0] ? toItem(r.rows[0], true) : null });
    return true;
  }

  if (method === 'PUT' && pathname === '/api/admin/pages/item') {
    const body = await readJsonBody<Record<string, unknown>>(req, MAX_PAGE_BODY);
    const { key, template, slug } = parseKey(body.key);
    const kind = body.kind === 'custom' ? 'custom' : 'override';
    const status = body.status === 'draft' ? 'draft' : 'published';
    const title = String(body.title ?? '').trim().slice(0, 200);
    const data = body.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new HttpError(400, 'Page content is missing.');
    checkContent(data);
    if (!title) throw new HttpError(400, 'Page title is required.');

    let path: string;
    if (kind === 'custom') {
      if (!CUSTOM_TEMPLATES.has(template)) throw new HttpError(400, 'New pages can use the Landing page or Simple page template.');
      if (key !== `${template}:${slug}` || !key.startsWith(`${template}:`)) throw new HttpError(400, 'Invalid page key.');
      path = `/${slug}/`;
    } else {
      path = String(body.path || '').trim();
      if (!/^\/[a-z0-9/-]*$/i.test(path) || path.length > 200) throw new HttpError(400, 'Invalid page path.');
    }

    const saved = await transaction(async (db) => {
      const prev = await db.query<PageRow>('SELECT * FROM cms_pages WHERE page_key = $1 FOR UPDATE', [key]);
      const before = prev.rows[0];
      if (before && before.kind !== kind) throw new HttpError(409, 'This page key is already used by another page.');
      if (kind === 'custom') {
        const clash = await db.query('SELECT 1 FROM cms_pages WHERE lower(path) = lower($1) AND page_key <> $2', [path, key]);
        if (clash.rowCount) throw new HttpError(409, `Another page already uses ${path}.`);
        if (!before) {
          const problem = await customPathProblem(path, slug);
          if (problem) throw new HttpError(409, problem);
        }
      }
      if (before) await saveRevision(db, before, user);
      const r = await db.query<PageRow>(
        `INSERT INTO cms_pages (page_key, path, kind, template, title, status, data, updated_by, updated_by_email)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (page_key) DO UPDATE SET
           path = EXCLUDED.path, title = EXCLUDED.title, status = EXCLUDED.status, data = EXCLUDED.data,
           updated_at = now(), updated_by = EXCLUDED.updated_by, updated_by_email = EXCLUDED.updated_by_email
         RETURNING *`,
        [key, path, kind, template, title, status, JSON.stringify(data), user.id, user.email]
      );
      await audit(user, before ? 'update' : 'create', 'page', key, { path, status, kind }, db);
      return r.rows[0];
    });
    pagesChanged();
    sendJson(res, 200, { item: toItem(saved, true) });
    return true;
  }

  if (method === 'DELETE' && pathname === '/api/admin/pages/item') {
    const { key } = parseKey(url.searchParams.get('key'));
    const removed = await transaction(async (db) => {
      const prev = await db.query<PageRow>('SELECT * FROM cms_pages WHERE page_key = $1 FOR UPDATE', [key]);
      if (!prev.rows[0]) return null;
      await saveRevision(db, prev.rows[0], user);
      await db.query('DELETE FROM cms_pages WHERE page_key = $1', [key]);
      await audit(user, prev.rows[0].kind === 'custom' ? 'delete' : 'reset', 'page', key, { path: prev.rows[0].path }, db);
      return prev.rows[0];
    });
    if (!removed) throw new HttpError(404, 'Page not found.');
    pagesChanged();
    sendJson(res, 200, { ok: true, kind: removed.kind });
    return true;
  }

  if (method === 'GET' && pathname === '/api/admin/pages/revisions') {
    const { key } = parseKey(url.searchParams.get('key'));
    const r = await query<{ id: string; title: string; status: string; saved_at: Date; saved_by_email: string | null }>(
      'SELECT id, title, status, saved_at, saved_by_email FROM cms_page_revisions WHERE page_key = $1 ORDER BY saved_at DESC, id DESC',
      [key]
    );
    sendJson(res, 200, {
      items: r.rows.map((x) => ({ id: Number(x.id), title: x.title, status: x.status, savedAt: x.saved_at.toISOString(), savedBy: x.saved_by_email })),
    });
    return true;
  }

  if (method === 'POST' && pathname === '/api/admin/pages/revisions/restore') {
    const body = await readJsonBody<{ id?: number }>(req);
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, 'Invalid revision.');
    const rev = await query<{ page_key: string; title: string; status: string; data: Record<string, unknown> }>(
      'SELECT page_key, title, status, data FROM cms_page_revisions WHERE id = $1',
      [id]
    );
    if (!rev.rows[0]) throw new HttpError(404, 'Revision not found.');
    sendJson(res, 200, { revision: { key: rev.rows[0].page_key, title: rev.rows[0].title, status: rev.rows[0].status, data: rev.rows[0].data } });
    return true;
  }

  throw new HttpError(404, `Unknown pages endpoint: ${method} ${pathname}`);
}
