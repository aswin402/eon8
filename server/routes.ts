import fs from 'node:fs';
import path from 'node:path';
import { isDatabaseConfigured, query } from './lib/db.ts';
import { adminPath, ROOT_DIR } from './lib/env.ts';
import { normalizePath } from './redirectsApi.ts';

/**
 * Decides whether a URL is a page the React app can show, so the server can
 * send a real 404 status for everything else. Built from
 * scripts/generate-route-manifest.ts plus admin-created posts and categories.
 * When in doubt (no manifest, database down) it answers "known" so a real page
 * is never served as 404.
 */

interface Manifest {
  paths: Set<string>;
  blogSlugs: Set<string>;
  categorySlugs: Set<string>;
}

const MANIFEST_FILE = path.join(ROOT_DIR, 'dist', 'route-manifest.json');
let manifest: Manifest | null | undefined;

function loadManifest(): Manifest | null {
  if (manifest !== undefined) return manifest;
  try {
    const raw = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8')) as {
      paths: string[];
      blogSlugs: string[];
      categorySlugs: string[];
    };
    manifest = {
      paths: new Set(raw.paths),
      blogSlugs: new Set(raw.blogSlugs),
      categorySlugs: new Set(raw.categorySlugs),
    };
  } catch {
    console.warn('[routes] dist/route-manifest.json not found; unknown pages will return 200.');
    manifest = null;
  }
  return manifest;
}

interface DbRoutes {
  posts: Set<string>;
  hidden: Set<string>;
  renamed: Set<string>;
  categories: Set<string>;
}

let dbCache: { at: number; value: DbRoutes } | null = null;

async function dbRoutes(): Promise<DbRoutes | null> {
  if (!isDatabaseConfigured()) return { posts: new Set(), hidden: new Set(), renamed: new Set(), categories: new Set() };
  if (dbCache && Date.now() - dbCache.at < 60_000) return dbCache.value;
  try {
    const [posts, hidden, renamed, categories] = await Promise.all([
      query<{ slug: string }>(`SELECT lower(slug) AS slug FROM cms_posts WHERE status = 'published'`),
      query<{ slug: string }>('SELECT lower(slug) AS slug FROM cms_hidden_slugs'),
      query<{ slug: string }>('SELECT lower(from_slug) AS slug FROM cms_slug_redirects'),
      query<{ slug: string }>('SELECT lower(slug) AS slug FROM cms_categories'),
    ]);
    const value = {
      posts: new Set(posts.rows.map((r) => r.slug)),
      hidden: new Set(hidden.rows.map((r) => r.slug)),
      renamed: new Set(renamed.rows.map((r) => r.slug)),
      categories: new Set(categories.rows.map((r) => r.slug)),
    };
    dbCache = { at: Date.now(), value };
    return value;
  } catch {
    return null;
  }
}

async function isBlogSlug(slug: string, m: Manifest): Promise<boolean> {
  const db = await dbRoutes();
  if (!db) return true; // database unavailable: do not risk a false 404
  if (db.posts.has(slug) || db.renamed.has(slug)) return true;
  return m.blogSlugs.has(slug) && !db.hidden.has(slug);
}

export async function isKnownRoute(pathname: string): Promise<boolean> {
  const m = loadManifest();
  if (!m) return true;
  const key = normalizePath(pathname) || '/';
  if (m.paths.has(key)) return true;

  const admin = normalizePath(adminPath()) || '/admin-dashboard';
  if (key === admin || key.startsWith(`${admin}/`)) return true;
  if (/^\/blog\/page\/\d+$/.test(key)) return true;

  const category = key.match(/^\/category\/([^/]+)(\/page\/\d+)?$/);
  if (category) {
    if (m.categorySlugs.has(category[1])) return true;
    const db = await dbRoutes();
    return !db || db.categories.has(category[1]);
  }

  const blog = key.match(/^\/blog\/([^/]+)$/);
  if (blog) return isBlogSlug(blog[1], m);

  // Root-level blog slugs (old WordPress post URLs) are rendered by the app.
  const rootSlug = key.match(/^\/([^/]+)$/);
  if (rootSlug) return isBlogSlug(rootSlug[1], m);

  return false;
}

/** Call after blog posts or categories change, so new URLs are known at once. */
export function resetDbRouteCache(): void {
  dbCache = null;
}

/** Also re-reads the build manifest (tests, deploys). */
export function resetRouteCaches(): void {
  manifest = undefined;
  dbCache = null;
}
