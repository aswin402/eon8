import type { IncomingMessage, ServerResponse } from 'node:http';
import { audit, requireUser } from './lib/auth.ts';
import { isDatabaseConfigured, query } from './lib/db.ts';
import { adminPath, env } from './lib/env.ts';
import { HttpError, readJsonBody, sendJson } from './lib/http.ts';
import { normalizePath } from './redirectsApi.ts';
import { jsonLdGraph, resetSeoCatalog, routeMeta, type OrgInfo, type RouteMeta } from './seoManifest.ts';
import { getSetting } from './settingsApi.ts';

interface SeoRow {
  path: string;
  title: string | null;
  description: string | null;
  og_image: string | null;
  canonical: string | null;
  noindex: boolean;
  schema_json: unknown;
  updated_at: Date;
}

export interface PageSeo {
  path: string;
  title: string | null;
  description: string | null;
  ogImage: string | null;
  canonical: string | null;
  noindex: boolean;
  schemaJson: unknown;
  updatedAt: string;
}

const toSeo = (r: SeoRow): PageSeo => ({
  path: r.path,
  title: r.title,
  description: r.description,
  ogImage: r.og_image,
  canonical: r.canonical,
  noindex: r.noindex,
  schemaJson: r.schema_json,
  updatedAt: r.updated_at.toISOString(),
});

const CACHE_TTL_MS = 60_000;
let seoCache: { at: number; map: Map<string, PageSeo> } | null = null;
let trackingCache: { at: number; value: Tracking } | null = null;
let orgCache: { at: number; value: OrgInfo } | null = null;

interface Tracking {
  gtmId: string;
  googleAdsIds: string[];
  googleSiteVerification: string;
  facebookDomainVerification: string;
  tawkPropertyId?: string;
  tawkWidgetId?: string;
}

async function seoMap(): Promise<Map<string, PageSeo>> {
  if (seoCache && Date.now() - seoCache.at < CACHE_TTL_MS) return seoCache.map;
  const { rows } = await query<SeoRow>('SELECT * FROM page_seo');
  seoCache = { at: Date.now(), map: new Map(rows.map((r) => [r.path, toSeo(r)])) };
  return seoCache.map;
}

async function tracking(): Promise<Tracking> {
  if (trackingCache && Date.now() - trackingCache.at < CACHE_TTL_MS) return trackingCache.value;
  trackingCache = { at: Date.now(), value: await getSetting<Tracking & Record<string, unknown>>('tracking') };
  return trackingCache.value;
}

async function orgInfo(): Promise<OrgInfo> {
  if (orgCache && Date.now() - orgCache.at < CACHE_TTL_MS) return orgCache.value;
  const [contact, social] = await Promise.all([
    getSetting<{ phone?: string; email?: string }>('contact'),
    getSetting<Record<string, string>>('social'),
  ]);
  const value = {
    phone: contact.phone || undefined,
    email: contact.email || undefined,
    sameAs: Object.values(social).filter((u) => typeof u === 'string' && /^https:\/\//.test(u)),
  };
  orgCache = { at: Date.now(), value };
  return value;
}

export function invalidateHeadCaches(): void {
  seoCache = null;
  trackingCache = null;
  orgCache = null;
  sitemapCache = null;
  resetSeoCatalog();
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const siteOrigin = () => env('SITE_URL', 'https://www.eon8.com').replace(/\/+$/, '');
const absolute = (u: string) => (u.startsWith('/') ? `${siteOrigin()}${u}` : u);

const FALLBACK_ORG: OrgInfo = { phone: '+91 90422 94007', email: 'info@eon8.com', sameAs: [] };

/**
 * Writes the page's SEO tags into index.html so crawlers that do not run
 * JavaScript still see them: defaults from the build-time SEO manifest
 * (seoManifest.ts), then admin "Page SEO" overrides, then tracking and
 * verification tags from Site Settings. Database problems never break the page.
 */
export async function injectHead(
  html: string,
  pathname: string,
  opts: { search?: URLSearchParams; status?: number } = {}
): Promise<string> {
  const status = opts.status ?? 200;
  let meta: RouteMeta | null = null;
  let seo: PageSeo | undefined;
  let track: Tracking | undefined;
  let org: OrgInfo = FALLBACK_ORG;
  try {
    meta = await routeMeta(pathname, opts.search ?? new URLSearchParams(), status);
  } catch (err) {
    console.error('[seo] route meta failed', err);
  }
  if (isDatabaseConfigured()) {
    try {
      const key = normalizePath(pathname) || '/';
      [seo, track, org] = await Promise.all([
        status === 404 ? Promise.resolve(undefined) : seoMap().then((m) => m.get(key)),
        tracking(),
        orgInfo(),
      ]);
    } catch {
      // Database unavailable: keep the manifest defaults.
    }
  }

  const title = seo?.title || meta?.title;
  const description = seo?.description || meta?.description;
  const canonical = seo?.canonical ? absolute(seo.canonical) : meta?.canonicalUrl;
  const ogImage = seo?.ogImage ? absolute(seo.ogImage) : meta?.ogImage;
  const noIndex = Boolean(seo?.noindex || meta?.noIndex);

  const head: string[] = [];
  let out = html;
  if (title) {
    // Replacer functions: a "$" in admin text must not be read as a replace pattern.
    const titleTag = `<title>${escapeAttr(title)}</title>`;
    out = out.replace(/<title>[\s\S]*?<\/title>/i, () => titleTag);
    head.push(`<meta property="og:title" content="${escapeAttr(title)}" />`);
    head.push(`<meta name="twitter:title" content="${escapeAttr(title)}" />`);
  }
  if (description) {
    out = out.replace(/<meta\s+name="description"[\s\S]*?\/>/i, '');
    head.push(`<meta name="description" content="${escapeAttr(description)}" />`);
    head.push(`<meta property="og:description" content="${escapeAttr(description)}" />`);
    head.push(`<meta name="twitter:description" content="${escapeAttr(description)}" />`);
  }
  if (canonical) {
    head.push(`<link rel="canonical" href="${escapeAttr(canonical)}" />`);
    head.push(`<meta property="og:url" content="${escapeAttr(canonical)}" />`);
  }
  if (meta || seo) {
    head.push('<meta property="og:locale" content="en_US" />');
    head.push('<meta property="og:site_name" content="Eon8" />');
    head.push(`<meta property="og:type" content="${meta?.article ? 'article' : 'website'}" />`);
    head.push('<meta name="twitter:card" content="summary_large_image" />');
    head.push('<meta name="twitter:site" content="@eon8digital" />');
    head.push('<meta name="twitter:creator" content="@eon8digital" />');
  }
  if (ogImage) {
    head.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`);
    head.push(`<meta property="og:image:secure_url" content="${escapeAttr(ogImage)}" />`);
    if (title) head.push(`<meta property="og:image:alt" content="${escapeAttr(title)}" />`);
    head.push(`<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`);
  }
  if (meta?.article?.publishedTime) {
    head.push(`<meta property="article:published_time" content="${escapeAttr(meta.article.publishedTime)}" />`);
    head.push(
      `<meta property="article:modified_time" content="${escapeAttr(meta.article.modifiedTime || meta.article.publishedTime)}" />`
    );
    if (meta.article.section) {
      head.push(`<meta property="article:section" content="${escapeAttr(meta.article.section)}" />`);
    }
  }
  if (noIndex) head.push('<meta name="robots" content="noindex, nofollow" />');
  else if (meta || seo) {
    head.push(
      '<meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />'
    );
  }
  if (meta && !noIndex && status === 200) {
    const graph = jsonLdGraph(
      {
        ...meta,
        title: title || meta.title,
        description: description || meta.description,
        canonicalUrl: canonical || meta.canonicalUrl,
        ogImage: ogImage || meta.ogImage,
      },
      org
    );
    // Same id as the browser-side PageSeo component, so it replaces this block instead of adding a second one.
    head.push(`<script type="application/ld+json" id="eon8-jsonld">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`);
  }
  if (seo?.schemaJson) {
    const json = JSON.stringify(seo.schemaJson).replace(/</g, '\\u003c');
    head.push(`<script type="application/ld+json">${json}</script>`);
  }
  if (track?.googleSiteVerification) {
    out = out.replace(/<meta\s+name="google-site-verification"[\s\S]*?\/>\s*/i, '');
    head.push(`<meta name="google-site-verification" content="${escapeAttr(track.googleSiteVerification)}" />`);
  }
  if (track?.facebookDomainVerification) {
    out = out.replace(/<meta\s+name="facebook-domain-verification"[\s\S]*?\/>\s*/i, '');
    head.push(`<meta name="facebook-domain-verification" content="${escapeAttr(track.facebookDomainVerification)}" />`);
  }
  // Analytics, ads and chat are for visitors: keep them off the admin so staff visits are not counted.
  const adminKey = normalizePath(adminPath()) || '/admin-dashboard';
  const pageKey = normalizePath(pathname) || '/';
  if (track && (pageKey === adminKey || pageKey.startsWith(`${adminKey}/`))) {
    track = { ...track, gtmId: '', googleAdsIds: [], tawkPropertyId: '' };
  }
  if (track?.gtmId) {
    const id = track.gtmId.replace(/[^A-Z0-9-]/gi, '');
    head.push(
      `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');</script>`
    );
    out = out.replace(
      /<body([^>]*)>/i,
      (_m, attrs: string) =>
        `<body${attrs}><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    );
  }
  for (const adsId of track?.googleAdsIds ?? []) {
    const id = adsId.replace(/[^A-Z0-9-]/gi, '');
    head.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>`
    );
  }
  if (track?.tawkPropertyId) {
    const property = track.tawkPropertyId.replace(/[^A-Za-z0-9]/g, '');
    const widget = (track.tawkWidgetId || 'default').replace(/[^A-Za-z0-9]/g, '') || 'default';
    // Tawk.to live chat, raised above the scroll-to-top button in the bottom-right corner.
    head.push(
      `<script>var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();Tawk_API.customStyle={visibility:{desktop:{position:'br',xOffset:20,yOffset:90},mobile:{position:'br',xOffset:12,yOffset:84}}};(function(){var s=document.createElement('script');s.async=true;s.src='https://embed.tawk.to/${property}/${widget}';s.charset='UTF-8';s.setAttribute('crossorigin','*');document.head.appendChild(s);})();</script>`
    );
  }
  const headHtml = `    ${head.join('\n    ')}\n  </head>`;
  return head.length ? out.replace('</head>', () => headHtml) : out;
}

let sitemapCache: { at: number; source: string; xml: string } | null = null;

/**
 * Brings the build-time sitemap up to date with the database: adds blog posts
 * published in the admin, drops hidden or draft posts and noindex pages.
 */
export async function liveSitemap(staticXml: string): Promise<string> {
  if (!isDatabaseConfigured()) return staticXml;
  if (sitemapCache && sitemapCache.source === staticXml && Date.now() - sitemapCache.at < 5 * 60_000) {
    return sitemapCache.xml;
  }
  try {
    const [posts, hidden, seo] = await Promise.all([
      query<{ slug: string; status: string; updated_at: Date }>('SELECT slug, status, updated_at FROM cms_posts'),
      query<{ slug: string }>('SELECT slug FROM cms_hidden_slugs'),
      query<{ path: string }>('SELECT path FROM page_seo WHERE noindex'),
    ]);
    const drop = new Set<string>([
      ...hidden.rows.map((r) => `/blog/${r.slug}`),
      ...posts.rows.filter((p) => p.status !== 'published').map((p) => `/blog/${p.slug}`),
      ...seo.rows.map((r) => r.path),
    ]);
    const blocks = staticXml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    const kept: string[] = [];
    const present = new Set<string>();
    for (const block of blocks) {
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
      const key = normalizePath(loc) || '/';
      if (drop.has(key)) continue;
      present.add(key);
      kept.push(block);
    }
    for (const p of posts.rows) {
      const key = `/blog/${p.slug}`;
      if (p.status !== 'published' || present.has(key) || drop.has(key)) continue;
      kept.push(
        `<url>\n    <loc>${siteOrigin()}${key}/</loc>\n    <lastmod>${p.updated_at.toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      );
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${kept.join('\n  ')}\n</urlset>\n`;
    sitemapCache = { at: Date.now(), source: staticXml, xml };
    return xml;
  } catch {
    return staticXml;
  }
}

function validate(body: Record<string, unknown>) {
  const path = normalizePath(String(body.path || ''));
  if (!path) throw new HttpError(400, 'Page path is required (for example /about-us/).');
  const text = (v: unknown, max: number, field: string) => {
    const s = String(v ?? '').trim();
    if (s.length > max) throw new HttpError(400, `${field} must be ${max} characters or fewer.`);
    return s || null;
  };
  const link = (v: unknown, field: string) => {
    const s = text(v, 500, field);
    if (s && !/^(https?:\/\/|\/)[^\s]*$/i.test(s)) throw new HttpError(400, `${field} must start with https:// or /.`);
    return s;
  };
  let schemaJson: unknown = null;
  if (body.schemaJson !== undefined && body.schemaJson !== null && body.schemaJson !== '') {
    try {
      schemaJson = typeof body.schemaJson === 'string' ? JSON.parse(body.schemaJson) : body.schemaJson;
    } catch {
      throw new HttpError(400, 'Structured data must be valid JSON.');
    }
    if (typeof schemaJson !== 'object') throw new HttpError(400, 'Structured data must be a JSON object or array.');
    if (JSON.stringify(schemaJson).length > 20_000) throw new HttpError(400, 'Structured data is too large (20 KB max).');
  }
  return {
    path,
    title: text(body.title, 120, 'Title'),
    description: text(body.description, 320, 'Description'),
    ogImage: link(body.ogImage, 'Share image'),
    canonical: link(body.canonical, 'Canonical URL'),
    noindex: Boolean(body.noindex),
    schemaJson,
  };
}

export async function handleSeoApi(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const method = (req.method || 'GET').toUpperCase();
  const pathname = url.pathname.replace(/\/+$/, '');

  if (method === 'GET' && pathname === '/api/seo') {
    const key = normalizePath(url.searchParams.get('path') || '/') || '/';
    const seo = (await seoMap()).get(key) ?? null;
    sendJson(res, 200, { seo }, { 'Cache-Control': 'public, max-age=60' });
    return true;
  }

  if (!pathname.startsWith('/api/admin/seo')) return false;
  const user = await requireUser(req, { roles: ['admin', 'editor'] });

  if (method === 'GET' && pathname === '/api/admin/seo') {
    const { rows } = await query<SeoRow>('SELECT * FROM page_seo ORDER BY path');
    sendJson(res, 200, { items: rows.map(toSeo) });
    return true;
  }

  if (method === 'PUT' && pathname === '/api/admin/seo') {
    const v = validate(await readJsonBody<Record<string, unknown>>(req, 64 * 1024));
    const { rows } = await query<SeoRow>(
      `INSERT INTO page_seo (path, title, description, og_image, canonical, noindex, schema_json, updated_at, updated_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,now(),$8)
       ON CONFLICT (path) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, og_image=EXCLUDED.og_image,
         canonical=EXCLUDED.canonical, noindex=EXCLUDED.noindex, schema_json=EXCLUDED.schema_json,
         updated_at=now(), updated_by=EXCLUDED.updated_by
       RETURNING *`,
      [v.path, v.title, v.description, v.ogImage, v.canonical, v.noindex, v.schemaJson === null ? null : JSON.stringify(v.schemaJson), user.id]
    );
    invalidateHeadCaches();
    await audit(user, 'upsert', 'page_seo', v.path, { title: v.title, noindex: v.noindex });
    sendJson(res, 200, { item: toSeo(rows[0]) });
    return true;
  }

  if (method === 'DELETE' && pathname === '/api/admin/seo') {
    const key = normalizePath(url.searchParams.get('path') || '');
    if (!key) throw new HttpError(400, 'Page path is required.');
    await query('DELETE FROM page_seo WHERE path = $1', [key]);
    invalidateHeadCaches();
    await audit(user, 'delete', 'page_seo', key);
    sendJson(res, 200, { ok: true });
    return true;
  }

  throw new HttpError(404, 'Unknown SEO endpoint.');
}
