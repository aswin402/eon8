import fs from 'node:fs';
import path from 'node:path';
import { isDatabaseConfigured, query } from './lib/db.ts';
import { adminPath, env, ROOT_DIR } from './lib/env.ts';
import { normalizePath } from './redirectsApi.ts';

/**
 * Server-side SEO defaults for every route, built at deploy time by
 * scripts/build-seo-manifest.ts (titles, descriptions, share images, noindex,
 * legacy WordPress redirects), combined with blog posts edited in the admin.
 * Admin "Page SEO" overrides are applied on top of this in seoApi.ts.
 */

interface ManifestPage {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noIndex?: boolean;
}

interface ManifestPost {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  ogImage?: string;
  dateIso: string;
  author: string;
  category: string;
}

interface SeoManifest {
  defaultOgImage: string;
  pages: Record<string, ManifestPage>;
  blogPosts: Record<string, ManifestPost>;
  blogCategories: Record<string, string>;
  redirects: Record<string, string>;
}

export interface RouteMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  noIndex: boolean;
  article?: {
    headline: string;
    publishedTime?: string;
    modifiedTime?: string;
    author: string;
    section: string;
  };
}

const MANIFEST_FILE = path.join(ROOT_DIR, 'dist', 'seo-manifest.json');
let manifestCache: { mtimeMs: number; value: SeoManifest } | null = null;
let warned = false;

export function loadSeoManifest(): SeoManifest | null {
  try {
    const { mtimeMs } = fs.statSync(MANIFEST_FILE);
    if (manifestCache && manifestCache.mtimeMs === mtimeMs) return manifestCache.value;
    const value = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8')) as SeoManifest;
    manifestCache = { mtimeMs, value };
    return value;
  } catch {
    if (!warned) {
      console.warn('[seo] dist/seo-manifest.json not found; pages keep the default <head>.');
      warned = true;
    }
    return null;
  }
}

export const siteOrigin = (): string => env('SITE_URL', 'https://www.eon8.com').replace(/\/+$/, '');

/** Canonical URLs keep WordPress's trailing slash so already-indexed URLs stay identical. */
export function canonicalFor(pathOrUrl: string): string {
  let p = pathOrUrl.replace(/^https?:\/\/[^/]+/i, '').split(/[?#]/)[0] || '/';
  if (!p.startsWith('/')) p = `/${p}`;
  if (p !== '/' && !/\.[a-z0-9]{2,5}$/i.test(p)) p = `${p.replace(/\/+$/, '')}/`;
  return `${siteOrigin()}${p}`;
}

function absoluteUrl(u: string | undefined, fallback: string): string {
  const s = (u || '').trim();
  if (!s) return fallback;
  if (/^https?:\/\//i.test(s)) return s;
  return `${siteOrigin()}${s.startsWith('/') ? s : `/${s}`}`;
}

/** Adds the trailing slash to an internal redirect target (not to files or query URLs). */
function withSlash(target: string): string {
  if (!target.startsWith('/') || target.includes('?') || /\.[a-z0-9]{2,5}$/i.test(target)) return target;
  return target === '/' ? '/' : `${target.replace(/\/+$/, '')}/`;
}

// --- Live blog catalogue (manifest posts + admin changes) -----------------------

interface LivePost extends ManifestPost {
  updatedAt?: string;
}

interface Catalog {
  posts: Map<string, LivePost>;
  slugById: Map<number, string>;
  renamed: Map<string, string>;
  categories: Map<string, string>;
}

interface PostData {
  title?: string;
  excerpt?: string;
  thumbnail?: string;
  dateIso?: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
}

let catalogCache: { at: number; value: Catalog } | null = null;

/** Called whenever posts or categories change in the admin. */
export function resetSeoCatalog(): void {
  catalogCache = null;
}

async function catalog(m: SeoManifest): Promise<Catalog> {
  if (catalogCache && Date.now() - catalogCache.at < 60_000) return catalogCache.value;
  const posts = new Map<string, LivePost>();
  const slugById = new Map<number, string>();
  const renamed = new Map<string, string>();
  const categories = new Map<string, string>();
  for (const [slug, name] of Object.entries(m.blogCategories)) categories.set(slug.toLowerCase(), name);

  let db: {
    rows: Array<{ id: string; slug: string; status: string; data: PostData; updated_at: Date }>;
    hiddenIds: Set<number>;
    hiddenSlugs: Set<string>;
    renames: Array<{ from_slug: string; to_slug: string }>;
    cats: Array<{ slug: string; name: string }>;
    hiddenCats: Set<string>;
  } | null = null;
  if (isDatabaseConfigured()) {
    try {
      const [p, hi, hs, rn, c, hc] = await Promise.all([
        query<{ id: string; slug: string; status: string; data: PostData; updated_at: Date }>(
          'SELECT id, slug, status, data, updated_at FROM cms_posts'
        ),
        query<{ id: string }>('SELECT id FROM cms_hidden_posts'),
        query<{ slug: string }>('SELECT lower(slug) AS slug FROM cms_hidden_slugs'),
        query<{ from_slug: string; to_slug: string }>('SELECT from_slug, to_slug FROM cms_slug_redirects'),
        query<{ slug: string; name: string }>('SELECT slug, name FROM cms_categories'),
        query<{ slug: string }>('SELECT lower(slug) AS slug FROM cms_hidden_categories'),
      ]);
      db = {
        rows: p.rows,
        hiddenIds: new Set(hi.rows.map((r) => Number(r.id))),
        hiddenSlugs: new Set(hs.rows.map((r) => r.slug)),
        renames: rn.rows,
        cats: c.rows,
        hiddenCats: new Set(hc.rows.map((r) => r.slug)),
      };
    } catch {
      db = null; // database down: serve manifest data, retry on the next request
    }
  }

  const overridden = new Set<number>();
  for (const row of db?.rows ?? []) {
    const id = Number(row.id);
    overridden.add(id);
    if (row.status !== 'published' || db?.hiddenIds.has(id)) continue;
    const d = row.data || {};
    const title = d.title || row.slug;
    posts.set(row.slug.toLowerCase(), {
      id,
      slug: row.slug,
      title,
      metaTitle: d.seo?.metaTitle?.trim() || `${title} - Eon8`,
      description: d.seo?.metaDescription?.trim() || d.excerpt || title,
      ogImage: absoluteUrl(d.seo?.ogImage || d.thumbnail, m.defaultOgImage),
      dateIso: d.dateIso || row.updated_at.toISOString(),
      updatedAt: d.updatedAt || row.updated_at.toISOString(),
      author: d.author || 'EON8 Editorial Team',
      category: d.category || 'Digital Marketing',
    });
  }
  for (const post of Object.values(m.blogPosts)) {
    if (overridden.has(post.id) || db?.hiddenIds.has(post.id) || db?.hiddenSlugs.has(post.slug.toLowerCase())) continue;
    posts.set(post.slug.toLowerCase(), { ...post, ogImage: absoluteUrl(post.ogImage, m.defaultOgImage) });
  }
  for (const p of posts.values()) slugById.set(p.id, p.slug);
  for (const r of db?.renames ?? []) renamed.set(r.from_slug.toLowerCase(), r.to_slug);
  for (const c of db?.cats ?? []) categories.set(c.slug.toLowerCase(), c.name);
  for (const slug of db?.hiddenCats ?? []) categories.delete(slug);

  const value = { posts, slugById, renamed, categories };
  if (db || !isDatabaseConfigured()) catalogCache = { at: Date.now(), value };
  return value;
}

// --- Legacy WordPress redirects ------------------------------------------------

const blogRootRedirect = () => env('BLOG_ROOT_REDIRECT', 'true').toLowerCase() !== 'false';

/**
 * Permanent redirects for old WordPress URL patterns: ?p=<id>, feeds, author and
 * tag archives, renamed pages, and posts that used to live at /<slug>/ (now
 * /blog/<slug>/). Admin-managed redirects are checked before this.
 */
export async function legacyRedirect(pathname: string, search: URLSearchParams): Promise<string | null> {
  const m = loadSeoManifest();
  if (!m) return null;
  const key = normalizePath(pathname) || '/';
  const clean = key.slice(1);

  if (key === '/' && search.has('p')) {
    const id = Number(search.get('p'));
    const slug = Number.isFinite(id) ? (await catalog(m)).slugById.get(id) : undefined;
    return slug ? withSlash(`/blog/${slug}`) : '/blog/';
  }
  if (/^(feed|comments\/feed|author|tag)(\/|$)/.test(clean) || /\/feed$/.test(clean)) {
    // /<post>/feed -> the post itself; everything else -> the blog index.
    const parent = clean.replace(/\/feed$/, '');
    if (parent && parent !== clean && !parent.includes('/')) {
      const post = (await catalog(m)).posts.get(parent);
      if (post) return withSlash(`/blog/${post.slug}`);
    }
    return '/blog/';
  }
  const fixed = m.redirects[clean];
  if (fixed) return withSlash(fixed);

  if (clean && !clean.includes('/') && !m.pages[clean]) {
    const c = await catalog(m);
    const to = c.renamed.get(clean);
    if (to && to.toLowerCase() !== clean) return withSlash(`/blog/${to}`);
    const post = c.posts.get(clean);
    if (post && blogRootRedirect()) return withSlash(`/blog/${post.slug}`);
  }
  const blog = clean.match(/^blog\/([^/]+)$/);
  if (blog) {
    const to = (await catalog(m)).renamed.get(blog[1]);
    if (to && to.toLowerCase() !== blog[1]) return withSlash(`/blog/${to}`);
  }
  return null;
}

// --- Per-route meta ------------------------------------------------------------

const NOT_FOUND = (m: SeoManifest): RouteMeta => ({
  title: 'Page Not Found | EON8',
  description:
    'The page you are looking for could not be found on EON8. Explore our digital marketing, AI agent, SEO, and Web3 services.',
  canonicalUrl: canonicalFor('/404'),
  ogImage: m.defaultOgImage,
  noIndex: true,
});

/** Title, description, canonical, share image and article data for a URL, or null if unknown. */
export async function routeMeta(pathname: string, search: URLSearchParams, status: number): Promise<RouteMeta | null> {
  const m = loadSeoManifest();
  if (!m) return null;
  if (status === 404) return NOT_FOUND(m);
  const key = normalizePath(pathname) || '/';
  const clean = key.slice(1);

  const admin = (normalizePath(adminPath()) || '/admin-dashboard').slice(1);
  if (clean === admin || clean.startsWith(`${admin}/`)) {
    return {
      title: 'Editorial Studio | EON8 CMS',
      description: 'Restricted EON8 CMS dashboard.',
      canonicalUrl: canonicalFor(`/${admin}`),
      ogImage: m.defaultOgImage,
      noIndex: true,
    };
  }

  const page = m.pages[clean];
  if (page) {
    return {
      title: page.title,
      description: page.description,
      canonicalUrl: canonicalFor(page.canonicalPath || key),
      ogImage: absoluteUrl(page.ogImage, m.defaultOgImage),
      noIndex: Boolean(page.noIndex),
    };
  }

  const blogPage = clean.match(/^blog\/page\/(\d+)$/);
  if (blogPage) {
    const n = Number(blogPage[1]);
    return {
      title: `Digital Marketing Blog — Page ${n} | EON8`,
      description: 'Explore EON8 digital marketing, AI agents, SEO, social media, and Web3 growth articles.',
      canonicalUrl: canonicalFor(n <= 1 ? '/blog' : key),
      ogImage: m.defaultOgImage,
      noIndex: false,
    };
  }

  const c = await catalog(m);
  const cat = clean.match(/^category\/([^/]+)(?:\/page\/(\d+))?$/);
  if (cat) {
    const name = c.categories.get(cat[1]);
    if (!name) return null;
    const n = cat[2] ? Number(cat[2]) : 1;
    return {
      title: `${name} Articles & Guides | EON8 Blog`,
      description: `Read EON8 articles, case studies, and playbooks on ${name}.`,
      canonicalUrl: canonicalFor(n <= 1 ? `/category/${cat[1]}` : key),
      ogImage: m.defaultOgImage,
      noIndex: false,
    };
  }

  const blog = clean.match(/^blog\/([^/]+)$/) || (!clean.includes('/') ? [clean, clean] : null);
  if (blog && blog[1]) {
    const post = c.posts.get(blog[1]);
    if (post) {
      return {
        title: post.metaTitle,
        description: post.description,
        canonicalUrl: canonicalFor(`/blog/${post.slug}`),
        ogImage: post.ogImage || m.defaultOgImage,
        noIndex: false,
        article: {
          headline: post.title,
          publishedTime: post.dateIso,
          modifiedTime: post.updatedAt || post.dateIso,
          author: post.author,
          section: post.category,
        },
      };
    }
    if (clean.startsWith('blog/') && search.get('preview') === '1') {
      return {
        title: 'Draft Preview | EON8 Blog',
        description: 'Editorial draft preview.',
        canonicalUrl: canonicalFor(key),
        ogImage: m.defaultOgImage,
        noIndex: true,
      };
    }
  }
  return null;
}

// --- Structured data -----------------------------------------------------------

export interface OrgInfo {
  phone?: string;
  email?: string;
  sameAs: string[];
}

export function jsonLdGraph(meta: RouteMeta, org: OrgInfo): Record<string, unknown> {
  const base = siteOrigin();
  const logo = `${base}/wp-content/uploads/2026/03/Logo_bg-1.png`;
  const segments = new URL(meta.canonicalUrl).pathname.split('/').filter(Boolean);
  const crumbs: Array<Record<string, unknown>> = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` }];
  let acc = '';
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const name =
      i === segments.length - 1
        ? meta.title.split('|')[0].split('–')[0].trim()
        : seg.replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
    crumbs.push({ '@type': 'ListItem', position: i + 2, name, item: `${base}${acc}/` });
  });

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: 'EON8',
      url: `${base}/`,
      logo: { '@type': 'ImageObject', url: logo },
      ...(org.phone ? { telephone: org.phone } : {}),
      ...(org.email ? { email: org.email } : {}),
      ...(org.sameAs.length ? { sameAs: org.sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: `${base}/`,
      name: 'EON8 Digital Marketing Agency',
      publisher: { '@id': `${base}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${meta.canonicalUrl}#webpage`,
      url: meta.canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${base}/#website` },
      primaryImageOfPage: { '@type': 'ImageObject', url: meta.ogImage },
    },
    { '@type': 'BreadcrumbList', '@id': `${meta.canonicalUrl}#breadcrumb`, itemListElement: crumbs },
  ];
  if (meta.article) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${meta.canonicalUrl}#article`,
      mainEntityOfPage: { '@id': `${meta.canonicalUrl}#webpage` },
      headline: meta.article.headline,
      description: meta.description,
      image: [meta.ogImage],
      datePublished: meta.article.publishedTime || undefined,
      dateModified: meta.article.modifiedTime || meta.article.publishedTime || undefined,
      articleSection: meta.article.section,
      author: { '@type': 'Person', name: meta.article.author || 'EON8 Editorial Team' },
      publisher: { '@id': `${base}/#organization` },
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
