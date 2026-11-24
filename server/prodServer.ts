import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import {
  getEnvValue,
  handleCmsApiRequest,
  isPathInsideDir,
  readCmsContentStateForServer,
  validateCmsSecurityConfig,
} from './cmsApi.ts';
import { handleLeadsApiRequest } from './leadsApi.ts';

interface ManifestPageSeo {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noIndex?: boolean;
  inSitemap?: boolean;
  priority?: string;
  changefreq?: string;
}

interface ManifestBlogPostSeo {
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
  generatedAt: string;
  baseUrl: string;
  defaultOgImage: string;
  pages: Record<string, ManifestPageSeo>;
  blogPosts: Record<string, ManifestBlogPostSeo>;
  blogCategories: Record<string, string>;
  redirects: Record<string, string>;
}

interface ResolvedRouteMeta {
  statusCode: number;
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

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(currentDir, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'uploads');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const MANIFEST_PATH = path.join(DIST_DIR, 'seo-manifest.json');

const BASE_URL = 'https://www.eon8.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/wp-content/uploads/2026/03/Logo_bg-1.png`;
const ADMIN_PATH_KEY = (getEnvValue('VITE_ADMIN_PATH', '/admin-dashboard') || '/admin-dashboard')
  .replace(/^\/+|\/+$/g, '')
  .toLowerCase();
const BLOG_ROOT_REDIRECT_ENABLED =
  getEnvValue('BLOG_ROOT_REDIRECT', 'true').toLowerCase() !== 'false';
const TRUST_PROXY = ['1', 'true', 'yes'].includes(
  getEnvValue('TRUST_PROXY', 'false').toLowerCase()
);

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const COMPRESSIBLE_EXTS = new Set([
  '.html',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.xml',
  '.txt',
  '.svg',
]);

const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.eon8.com https://lh3.googleusercontent.com https://lh4.googleusercontent.com https://lh5.googleusercontent.com https://lh6.googleusercontent.com",
  "media-src 'self' data: blob:",
  "frame-src 'self' https://www.google.com https://calendly.com https://www.youtube.com",
  "connect-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

function isHttpsRequest(req: http.IncomingMessage): boolean {
  if ((req.socket as { encrypted?: boolean }).encrypted) return true;
  if (TRUST_PROXY) {
    const proto = String(req.headers['x-forwarded-proto'] || '')
      .split(',')[0]
      .trim()
      .toLowerCase();
    return proto === 'https';
  }
  return false;
}

function getSecurityHeaders(req: http.IncomingMessage, isHtml = false): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
  if (isHtml) {
    headers['Content-Security-Policy'] = CSP_POLICY;
  }
  if (isHttpsRequest(req)) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
  }
  return headers;
}

function selectCompression(req: http.IncomingMessage): 'br' | 'gzip' | null {
  const accept = String(req.headers['accept-encoding'] || '').toLowerCase();
  if (accept.includes('br')) return 'br';
  if (accept.includes('gzip')) return 'gzip';
  return null;
}

function sendCompressedBuffer(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  statusCode: number,
  body: Buffer,
  contentType: string,
  extraHeaders: Record<string, string> = {},
  isHtml = false
): void {
  const secHeaders = getSecurityHeaders(req, isHtml);
  const method = (req.method || 'GET').toUpperCase();
  const encoding = body.length >= 1024 ? selectCompression(req) : null;

  let payload = body;
  const headers: Record<string, string | number> = {
    ...secHeaders,
    'Content-Type': contentType,
    ...extraHeaders,
  };

  if (encoding === 'br') {
    payload = zlib.brotliCompressSync(body, {
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 },
    });
    headers['Content-Encoding'] = 'br';
    headers['Vary'] = 'Accept-Encoding';
  } else if (encoding === 'gzip') {
    payload = zlib.gzipSync(body, { level: 6 });
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
  }

  headers['Content-Length'] = payload.length;
  res.writeHead(statusCode, headers);
  if (method === 'HEAD') {
    res.end();
  } else {
    res.end(payload);
  }
}

function sendRedirect(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  location: string,
  statusCode = 301
): void {
  res.writeHead(statusCode, {
    ...getSecurityHeaders(req, false),
    Location: location,
    'Cache-Control': statusCode === 301 ? 'public, max-age=3600' : 'no-cache',
  });
  res.end();
}

function loadManifest(): SeoManifest {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8')) as SeoManifest;
    } catch {
      // Fallback empty manifest
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    defaultOgImage: DEFAULT_OG_IMAGE,
    pages: {},
    blogPosts: {},
    blogCategories: {},
    redirects: {},
  };
}

function loadIndexHtmlTemplate(): string | null {
  if (!fs.existsSync(INDEX_HTML_PATH)) return null;
  try {
    return fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
  } catch {
    return null;
  }
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toAbsoluteUrl(urlOrPath?: string): string {
  if (!urlOrPath || !urlOrPath.trim()) return DEFAULT_OG_IMAGE;
  const trimmed = urlOrPath.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `${BASE_URL}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
}

function buildJsonLdGraph(meta: ResolvedRouteMeta): Record<string, unknown> {
  const cleanPath = new URL(meta.canonicalUrl).pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);
  const breadcrumbItems: Array<Record<string, unknown>> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
  ];
  let acc = '';
  segments.forEach((seg, idx) => {
    acc += `/${seg}`;
    const label =
      idx === segments.length - 1
        ? meta.title.split('|')[0].split('–')[0].trim()
        : seg.replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: label,
      item: `${BASE_URL}${acc}`,
    });
  });

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'EON8',
      url: `${BASE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
      },
      telephone: '+91-90422-94007',
      email: 'info@eon8.com',
      sameAs: [
        'https://www.facebook.com/eon8official',
        'https://www.instagram.com/eon8official/',
        'https://www.linkedin.com/company/eon8/',
        'https://twitter.com/Eon8Official',
        'https://www.youtube.com/c/EON8Digital',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'EON8 Digital Marketing Agency',
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${meta.canonicalUrl}#webpage`,
      url: meta.canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: meta.ogImage,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${meta.canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
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
      author: {
        '@type': 'Person',
        name: meta.article.author || 'EON8 Editorial Team',
      },
      publisher: { '@id': `${BASE_URL}/#organization` },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function injectSeoIntoHtml(template: string, meta: ResolvedRouteMeta): string {
  const safeTitle = escapeHtmlText(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeCanonical = escapeHtmlAttr(meta.canonicalUrl);
  const safeOgImage = escapeHtmlAttr(meta.ogImage);
  const ogType = meta.article ? 'article' : 'website';

  const headTags: string[] = [
    `<link rel="canonical" href="${safeCanonical}" />`,
    meta.noIndex
      ? `<meta name="robots" content="noindex, nofollow, noarchive" />`
      : `<meta name="robots" content="index, follow" />`,
    `<meta property="og:site_name" content="EON8" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta property="og:description" content="${safeDesc}" />`,
    `<meta property="og:url" content="${safeCanonical}" />`,
    `<meta property="og:image" content="${safeOgImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${safeDesc}" />`,
    `<meta name="twitter:image" content="${safeOgImage}" />`,
  ];

  if (!meta.noIndex && meta.statusCode === 200) {
    const jsonLd = JSON.stringify(buildJsonLdGraph(meta)).replace(/</g, '\\u003c');
    headTags.push(`<script type="application/ld+json" id="eon8-jsonld">${jsonLd}</script>`);
  }

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/i,
    `<meta name="description" content="${safeDesc}" />`
  );
  return html.replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`);
}

function getLiveBlogCatalog(manifest: SeoManifest) {
  const cms = readCmsContentStateForServer();
  const deletedIds = new Set<number>(cms.deletedPostIds);
  const deletedSlugs = new Set<string>(cms.deletedSlugs);
  const publishedBySlug = new Map<
    string,
    {
      id: number;
      slug: string;
      title: string;
      metaTitle: string;
      description: string;
      ogImage: string;
      dateIso: string;
      updatedAt?: string;
      author: string;
      category: string;
    }
  >();
  const overriddenStaticIds = new Set<number>();

  // 1. Live CMS upserted posts (new + edited static)
  for (const post of Object.values(cms.upsertedPosts)) {
    overriddenStaticIds.add(post.id);
    if (deletedIds.has(post.id) || post.status !== 'published') continue;
    publishedBySlug.set(post.slug, {
      id: post.id,
      slug: post.slug,
      title: post.title,
      metaTitle: post.seo?.metaTitle?.trim() || `${post.title} - Eon8`,
      description: post.seo?.metaDescription?.trim() || post.excerpt || post.title,
      ogImage: toAbsoluteUrl(post.seo?.ogImage?.trim() || post.thumbnail),
      dateIso: post.dateIso,
      updatedAt: post.updatedAt,
      author: post.author || 'EON8 Editorial Team',
      category: post.category || 'Digital Marketing',
    });
  }

  // 2. Unmodified static blog posts
  for (const post of Object.values(manifest.blogPosts)) {
    if (overriddenStaticIds.has(post.id)) continue;
    if (deletedIds.has(post.id) || deletedSlugs.has(post.slug)) continue;
    publishedBySlug.set(post.slug, {
      id: post.id,
      slug: post.slug,
      title: post.title,
      metaTitle: post.metaTitle,
      description: post.description,
      ogImage: toAbsoluteUrl(post.ogImage),
      dateIso: post.dateIso,
      author: post.author,
      category: post.category,
    });
  }

  // 3. Categories (static + CMS custom minus deleted)
  const deletedCatSlugs = new Set(cms.deletedCategorySlugs.map((s) => s.toLowerCase()));
  const categories = new Map<string, string>();
  for (const [slug, name] of Object.entries(manifest.blogCategories)) {
    if (!deletedCatSlugs.has(slug.toLowerCase())) {
      categories.set(slug.toLowerCase(), name);
    }
  }
  for (const pair of cms.customCategories) {
    if (!deletedCatSlugs.has(pair.slug.toLowerCase())) {
      categories.set(pair.slug.toLowerCase(), pair.name);
    }
  }

  return {
    publishedBySlug,
    categories,
    slugRedirects: cms.slugRedirects,
  };
}

function buildDynamicSitemapXml(manifest: SeoManifest): string {
  const today = new Date().toISOString().split('T')[0];
  const entries: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [];
  const seen = new Set<string>();

  for (const [key, page] of Object.entries(manifest.pages)) {
    if (!page.inSitemap || page.noIndex) continue;
    const clean = key.replace(/^\/+|\/+$/g, '');
    const loc = `${BASE_URL}/${clean ? `${clean}/` : ''}`;
    if (seen.has(loc)) continue;
    seen.add(loc);
    entries.push({
      loc,
      lastmod: today,
      changefreq: page.changefreq || 'weekly',
      priority: page.priority || '0.8',
    });
  }

  const { publishedBySlug } = getLiveBlogCatalog(manifest);
  for (const post of publishedBySlug.values()) {
    const loc = `${BASE_URL}/blog/${post.slug}/`;
    if (seen.has(loc)) continue;
    seen.add(loc);
    const lastmod = (post.updatedAt || post.dateIso || today).slice(0, 10);
    entries.push({
      loc,
      lastmod,
      changefreq: 'monthly',
      priority: '0.7',
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
}

function resolveRouteOrRedirect(
  pathname: string,
  searchParams: URLSearchParams,
  manifest: SeoManifest
): { kind: 'redirect'; redirect: string } | { kind: 'route'; route: ResolvedRouteMeta } {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  const lower = clean.toLowerCase();

  // 1. Legacy WordPress query param (?p=<id>)
  if (clean === '' && searchParams.has('p')) {
    const postId = Number(searchParams.get('p'));
    if (Number.isFinite(postId)) {
      const { publishedBySlug } = getLiveBlogCatalog(manifest);
      for (const post of publishedBySlug.values()) {
        if (post.id === postId) {
          return { kind: 'redirect', redirect: `/blog/${post.slug}` };
        }
      }
    }
    return { kind: 'redirect', redirect: '/blog' };
  }

  // 2. Common legacy WordPress paths (feeds, authors, tags -> /blog; wp-admin/login -> 404)
  if (
    lower === 'feed' ||
    lower.endsWith('/feed') ||
    lower === 'author' ||
    lower.startsWith('author/') ||
    lower === 'tag' ||
    lower.startsWith('tag/')
  ) {
    return { kind: 'redirect', redirect: '/blog' };
  }
  if (
    lower === 'wp-admin' ||
    lower.startsWith('wp-admin/') ||
    lower === 'wp-login.php' ||
    lower === 'xmlrpc.php'
  ) {
    return {
      kind: 'route',
      route: {
        statusCode: 404,
        title: 'Page Not Found | EON8',
        description: 'The page you are looking for could not be found.',
        canonicalUrl: `${BASE_URL}/404`,
        ogImage: DEFAULT_OG_IMAGE,
        noIndex: true,
      },
    };
  }

  // 3. Configured static legacy redirects (301)
  if (manifest.redirects[lower]) {
    return { kind: 'redirect', redirect: manifest.redirects[lower] };
  }

  // 4. Hidden Admin Dashboard route (200, noindex)
  if (lower === ADMIN_PATH_KEY) {
    return {
      kind: 'route',
      route: {
        statusCode: 200,
        title: 'Editorial Studio | EON8 CMS',
        description: 'Restricted EON8 Blog CMS editorial dashboard.',
        canonicalUrl: `${BASE_URL}/${ADMIN_PATH_KEY}`,
        ogImage: DEFAULT_OG_IMAGE,
        noIndex: true,
      },
    };
  }

  // 5. Known non-blog static / vertical / service / policy pages
  const pageMatch = manifest.pages[clean] || manifest.pages[lower];
  if (pageMatch) {
    const canonicalPath = pageMatch.canonicalPath || `/${clean}`;
    return {
      kind: 'route',
      route: {
        statusCode: 200,
        title: pageMatch.title,
        description: pageMatch.description,
        canonicalUrl:
          canonicalPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${canonicalPath}`,
        ogImage: toAbsoluteUrl(pageMatch.ogImage),
        noIndex: Boolean(pageMatch.noIndex),
      },
    };
  }

  // 6. Live CMS & Static Blog Routes
  const { publishedBySlug, categories, slugRedirects } = getLiveBlogCatalog(manifest);

  // /blog/page/:n
  const blogPageMatch = /^blog\/page\/(\d+)$/i.exec(clean);
  if (blogPageMatch) {
    const pageNum = Number(blogPageMatch[1]);
    if (pageNum >= 1) {
      return {
        kind: 'route',
        route: {
          statusCode: 200,
          title: `Digital Marketing Blog — Page ${pageNum} | EON8`,
          description:
            'Explore EON8 digital marketing, AI agents, SEO, social media, and Web3 growth articles.',
          canonicalUrl: pageNum === 1 ? `${BASE_URL}/blog` : `${BASE_URL}/blog/page/${pageNum}`,
          ogImage: DEFAULT_OG_IMAGE,
          noIndex: false,
        },
      };
    }
  }

  // /category/:slug and /category/:slug/page/:n
  const categoryMatch = /^category\/([^/]+)(?:\/page\/(\d+))?$/i.exec(clean);
  if (categoryMatch) {
    const catSlug = categoryMatch[1].toLowerCase();
    const catName = categories.get(catSlug);
    const pageNum = categoryMatch[2] ? Number(categoryMatch[2]) : 1;
    if (catName && pageNum >= 1) {
      return {
        kind: 'route',
        route: {
          statusCode: 200,
          title: `${catName} Articles & Guides | EON8 Blog`,
          description: `Read EON8 articles, case studies, and playbooks on ${catName}.`,
          canonicalUrl:
            pageNum === 1
              ? `${BASE_URL}/category/${catSlug}`
              : `${BASE_URL}/category/${catSlug}/page/${pageNum}`,
          ogImage: DEFAULT_OG_IMAGE,
          noIndex: false,
        },
      };
    }
  }

  // /blog/:slug
  if (lower.startsWith('blog/')) {
    const slug = clean.slice('blog/'.length);
    if (!slug.includes('/')) {
      if (slugRedirects[slug] && slugRedirects[slug] !== slug) {
        return { kind: 'redirect', redirect: `/blog/${slugRedirects[slug]}` };
      }
      const post = publishedBySlug.get(slug);
      if (post) {
        return {
          kind: 'route',
          route: {
            statusCode: 200,
            title: post.metaTitle,
            description: post.description,
            canonicalUrl: `${BASE_URL}/blog/${post.slug}`,
            ogImage: post.ogImage,
            noIndex: false,
            article: {
              headline: post.title,
              publishedTime: post.dateIso,
              modifiedTime: post.updatedAt || post.dateIso,
              author: post.author,
              section: post.category,
            },
          },
        };
      }
      // Allow draft preview URLs (/blog/:slug?preview=1) to render client-side auth check cleanly
      if (searchParams.get('preview') === '1') {
        return {
          kind: 'route',
          route: {
            statusCode: 200,
            title: 'Draft Preview | EON8 Blog',
            description: 'Editorial draft preview.',
            canonicalUrl: `${BASE_URL}/blog/${slug}`,
            ogImage: DEFAULT_OG_IMAGE,
            noIndex: true,
          },
        };
      }
    }
  }

  // Legacy root-level blog post slug (/<slug>) -> 301 to /blog/<slug> (or 200 if BLOG_ROOT_REDIRECT=false)
  if (clean && !clean.includes('/')) {
    if (slugRedirects[clean] && slugRedirects[clean] !== clean) {
      return { kind: 'redirect', redirect: `/blog/${slugRedirects[clean]}` };
    }
    const rootPost = publishedBySlug.get(clean);
    if (rootPost) {
      if (BLOG_ROOT_REDIRECT_ENABLED) {
        return { kind: 'redirect', redirect: `/blog/${rootPost.slug}` };
      }
      return {
        kind: 'route',
        route: {
          statusCode: 200,
          title: rootPost.metaTitle,
          description: rootPost.description,
          canonicalUrl: `${BASE_URL}/blog/${rootPost.slug}`,
          ogImage: rootPost.ogImage,
          noIndex: false,
          article: {
            headline: rootPost.title,
            publishedTime: rootPost.dateIso,
            modifiedTime: rootPost.updatedAt || rootPost.dateIso,
            author: rootPost.author,
            section: rootPost.category,
          },
        },
      };
    }
  }

  // Unknown route -> Real HTTP 404 (prevents soft-404s in Google Search Console)
  return {
    kind: 'route',
    route: {
      statusCode: 404,
      title: 'Page Not Found | EON8',
      description:
        'The page you are looking for could not be found on EON8. Explore our digital marketing, AI agent, SEO, and Web3 services.',
      canonicalUrl: `${BASE_URL}/404`,
      ogImage: DEFAULT_OG_IMAGE,
      noIndex: true,
    },
  };
}

function serveStaticFile(
  filePath: string,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  isImmutableHashedAsset = false
): boolean {
  if (!fs.existsSync(filePath)) return false;
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const cacheControl =
      ext === '.html'
        ? 'no-cache'
        : isImmutableHashedAsset
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=86400';

    if (COMPRESSIBLE_EXTS.has(ext) && stat.size <= 5 * 1024 * 1024) {
      const content = fs.readFileSync(filePath);
      sendCompressedBuffer(
        req,
        res,
        200,
        content,
        contentType,
        { 'Cache-Control': cacheControl },
        ext === '.html'
      );
      return true;
    }

    const method = (req.method || 'GET').toUpperCase();
    res.writeHead(200, {
      ...getSecurityHeaders(req, false),
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': cacheControl,
    });
    if (method === 'HEAD') {
      res.end();
    } else {
      fs.createReadStream(filePath).pipe(res);
    }
    return true;
  } catch {
    return false;
  }
}

// Fail fast on startup if production CMS credentials or session secret are missing/weak
const allowInsecureDev = ['1', 'true', 'yes'].includes(
  (process.env.CMS_ALLOW_INSECURE_DEV || '').toLowerCase()
);
const securityCheck = validateCmsSecurityConfig(!allowInsecureDev);
if (!securityCheck.ok) {
  console.error('Refusing to start Eon8 production server due to insecure CMS configuration:');
  for (const err of securityCheck.errors) {
    console.error(`  - ${err}`);
  }
  console.error(
    'Set strong CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD (>=10 chars), and CMS_SESSION_SECRET (>=32 random chars) in .env or environment variables.'
  );
  process.exit(1);
}
if (securityCheck.warnings.length > 0) {
  for (const warn of securityCheck.warnings) {
    console.warn(`[CMS Security Warning] ${warn}`);
  }
}

const manifest = loadManifest();
const indexHtmlTemplate = loadIndexHtmlTemplate();
const port = Number(process.env.PORT || 4173);

const server = http.createServer(async (req, res) => {
  try {
    if (await handleCmsApiRequest(req, res)) return;
    if (await handleLeadsApiRequest(req, res)) return;

    let parsedUrl: URL;
    let decodedPathname: string;
    try {
      parsedUrl = new URL(req.url || '/', `http://localhost:${port}`);
      decodedPathname = decodeURIComponent(parsedUrl.pathname);
    } catch {
      sendCompressedBuffer(
        req,
        res,
        400,
        Buffer.from('Bad Request: Malformed URL encoding.', 'utf-8'),
        'text/plain; charset=utf-8',
        { 'Cache-Control': 'no-store' }
      );
      return;
    }

    const safeRel = decodedPathname.replace(/^\/+/, '');

    // Dynamic live /sitemap.xml (always reflects published/edited/deleted CMS posts)
    if (safeRel === 'sitemap.xml') {
      const xml = buildDynamicSitemapXml(manifest);
      sendCompressedBuffer(
        req,
        res,
        200,
        Buffer.from(xml, 'utf-8'),
        'application/xml; charset=utf-8',
        { 'Cache-Control': 'public, max-age=300' }
      );
      return;
    }

    // Serve runtime uploaded blog images directly from public/uploads with strict path check
    if (safeRel.startsWith('uploads/')) {
      const uploadPath = path.resolve(PUBLIC_UPLOADS_DIR, safeRel.slice('uploads/'.length));
      if (isPathInsideDir(uploadPath, PUBLIC_UPLOADS_DIR) && serveStaticFile(uploadPath, req, res)) {
        return;
      }
      sendCompressedBuffer(
        req,
        res,
        404,
        Buffer.from('Not Found', 'utf-8'),
        'text/plain; charset=utf-8',
        { 'Cache-Control': 'no-store' }
      );
      return;
    }

    // Never expose internal build manifest over HTTP
    if (safeRel === 'seo-manifest.json') {
      sendCompressedBuffer(
        req,
        res,
        404,
        Buffer.from('Not Found', 'utf-8'),
        'text/plain; charset=utf-8',
        { 'Cache-Control': 'no-store' }
      );
      return;
    }

    // Serve built static assets from dist/ with strict path check & immutable cache on /assets/*
    if (safeRel) {
      const distAsset = path.resolve(DIST_DIR, safeRel);
      const isHashedAsset = safeRel.startsWith('assets/');
      if (
        isPathInsideDir(distAsset, DIST_DIR) &&
        distAsset !== INDEX_HTML_PATH &&
        serveStaticFile(distAsset, req, res, isHashedAsset)
      ) {
        return;
      }
    }

    // Resolve SPA route, 301 redirect, or real HTTP 404 with server-side SEO head injection
    const resolution = resolveRouteOrRedirect(decodedPathname, parsedUrl.searchParams, manifest);
    if (resolution.kind === 'redirect') {
      sendRedirect(req, res, resolution.redirect, 301);
      return;
    }

    const template = indexHtmlTemplate || loadIndexHtmlTemplate();
    if (!template) {
      sendCompressedBuffer(
        req,
        res,
        503,
        Buffer.from('Build output not found. Run `npm run build` before `npm start`.', 'utf-8'),
        'text/plain; charset=utf-8',
        { 'Cache-Control': 'no-store' }
      );
      return;
    }

    const html = injectSeoIntoHtml(template, resolution.route);
    sendCompressedBuffer(
      req,
      res,
      resolution.route.statusCode,
      Buffer.from(html, 'utf-8'),
      'text/html; charset=utf-8',
      { 'Cache-Control': 'no-cache' },
      true
    );
  } catch (err) {
    console.error('[Eon8 Server Error]', err);
    if (!res.headersSent) {
      res.writeHead(500, {
        ...getSecurityHeaders(req, false),
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end('Internal Server Error');
    }
  }
});

server.listen(port, () => {
  console.log(`Eon8 production server + Blog CMS API listening on http://localhost:${port}`);
});
