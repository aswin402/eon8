/**
 * Writes public/route-manifest.json: every URL the React app can render.
 * The production server uses it to answer unknown URLs with a real 404 status
 * (the page still shows the app's "not found" screen).
 *
 * Sources: route paths and slug lists in src/App.tsx, the service slugs, the
 * built-in blog posts and categories. Posts and categories created in the
 * admin are checked in the database at request time.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_SERVICE_SLUGS } from '../src/pages/services/types.ts';
import { BLOG_CATEGORY_PAIRS, BLOG_POSTS_SUMMARIES } from '../src/pages/blog/blogIndexData.ts';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptsDir, '..');
const appSource = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf-8');

const normalize = (p: string) => {
  let out = `/${p.trim().replace(/^\/+/, '')}`.toLowerCase();
  if (out.length > 1) out = out.replace(/\/+$/, '');
  return out;
};

const paths = new Set<string>(['/']);

// `path: 'about-us'` literals. Parameterised paths are handled as patterns by the server.
for (const m of appSource.matchAll(/path:\s*'([^']+)'/g)) {
  if (!m[1].includes(':') && m[1] !== '*') paths.add(normalize(m[1]));
}

// Slug arrays used with `.map((slug) => ({ path: slug, ... }))`.
for (const block of appSource.matchAll(/const\s+[A-Z_]+_SLUGS\s*=\s*\[([\s\S]*?)\]/g)) {
  for (const s of block[1].matchAll(/'([a-z0-9-]+)'/g)) paths.add(normalize(s[1]));
}

// Legacy WordPress short links: ['from', '/to'] pairs.
const legacy = appSource.match(/LEGACY_WP_REDIRECTS[^=]*=\s*\[([\s\S]*?)\n\];/);
if (legacy) {
  for (const pair of legacy[1].matchAll(/\[\s*'([^']+)'\s*,\s*'[^']+'\s*\]/g)) paths.add(normalize(pair[1]));
}

for (const slug of ALL_SERVICE_SLUGS) paths.add(normalize(slug));

const blogSlugs = BLOG_POSTS_SUMMARIES.map((p) => p.slug.toLowerCase());
const categorySlugs = BLOG_CATEGORY_PAIRS.map((c) => c.slug.toLowerCase());

const manifest = {
  generatedAt: new Date().toISOString(),
  paths: [...paths].sort(),
  blogSlugs: [...new Set(blogSlugs)].sort(),
  categorySlugs: [...new Set(categorySlugs)].sort(),
};

const out = path.join(root, 'public', 'route-manifest.json');
fs.writeFileSync(out, `${JSON.stringify(manifest)}\n`, 'utf-8');
console.log(
  `Generated route-manifest.json: ${manifest.paths.length} paths, ${manifest.blogSlugs.length} blog posts, ${manifest.categorySlugs.length} categories`
);
