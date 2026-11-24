import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pipeline } from 'node:stream';
import zlib from 'node:zlib';
import { handleApiRequest } from './api.ts';
import { closeDatabase, isDatabaseConfigured, ready } from './lib/db.ts';
import { env, isProduction, ROOT_DIR } from './lib/env.ts';
import { SECURITY_HEADERS, safeDecodePath } from './lib/http.ts';
import { applyRedirect } from './redirectsApi.ts';
import { isKnownRoute } from './routes.ts';
import { injectHead, liveSitemap } from './seoApi.ts';

const DIST_DIR = path.join(ROOT_DIR, 'dist');
const UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'uploads');
const port = Number(env('PORT', '4173'));

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
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
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg']);

/** Resolves a URL path inside a base folder, refusing anything that escapes it. */
function resolveInside(baseDir: string, relPath: string): string | null {
  const resolved = path.resolve(baseDir, relPath);
  const rel = path.relative(baseDir, resolved);
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return resolved;
}

function encodingFor(req: http.IncomingMessage): 'br' | 'gzip' | null {
  const accept = String(req.headers['accept-encoding'] || '');
  if (/\bbr\b/.test(accept)) return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return null;
}

function cacheControlFor(urlPath: string, ext: string): string {
  if (ext === '.html') return 'no-cache';
  if (urlPath.startsWith('/assets/')) return 'public, max-age=31536000, immutable'; // hashed build files
  return 'public, max-age=86400';
}

function serveFile(req: http.IncomingMessage, res: http.ServerResponse, filePath: string, urlPath: string): boolean {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return false;
  }
  if (!stat.isFile()) return false;
  const ext = path.extname(filePath).toLowerCase();
  const headers: Record<string, string | number> = {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    'Cache-Control': cacheControlFor(urlPath, ext),
    'Last-Modified': stat.mtime.toUTCString(),
  };
  if (req.headers['if-modified-since'] && new Date(req.headers['if-modified-since']) >= new Date(stat.mtime.toUTCString())) {
    res.writeHead(304, headers);
    res.end();
    return true;
  }
  const encoding = COMPRESSIBLE.has(ext) && stat.size > 1024 ? encodingFor(req) : null;
  if (encoding) {
    headers['Content-Encoding'] = encoding;
    headers.Vary = 'Accept-Encoding';
  } else {
    headers['Content-Length'] = stat.size;
  }
  res.writeHead(200, headers);
  if (req.method === 'HEAD') {
    res.end();
    return true;
  }
  const source = fs.createReadStream(filePath);
  const onError = () => res.destroy();
  if (encoding === 'br') pipeline(source, zlib.createBrotliCompress(), res, (e) => e && onError());
  else if (encoding === 'gzip') pipeline(source, zlib.createGzip(), res, (e) => e && onError());
  else pipeline(source, res, (e) => e && onError());
  return true;
}

let indexTemplate: string | null = null;
function readIndexTemplate(): string | null {
  if (indexTemplate && isProduction()) return indexTemplate;
  try {
    indexTemplate = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    return indexTemplate;
  } catch {
    return null;
  }
}

async function serveApp(req: http.IncomingMessage, res: http.ServerResponse, pathname: string): Promise<void> {
  const template = readIndexTemplate();
  if (!template) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Build output not found. Run `npm run build` before `npm start`.');
    return;
  }
  // Unknown URLs still get the app (it shows its "not found" page) but with a
  // real 404 status, so search engines do not index them as soft 404s.
  const status = (await isKnownRoute(pathname)) ? 200 : 404;
  const html = Buffer.from(await injectHead(template, pathname), 'utf-8');
  const encoding = encodingFor(req);
  const body = encoding === 'br' ? zlib.brotliCompressSync(html) : encoding === 'gzip' ? zlib.gzipSync(html) : html;
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Content-Length': body.length,
    ...(encoding ? { 'Content-Encoding': encoding, Vary: 'Accept-Encoding' } : {}),
  });
  res.end(req.method === 'HEAD' ? undefined : body);
}

const server = http.createServer(async (req, res) => {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  if (isProduction()) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  try {
    if (await handleApiRequest(req, res)) return;

    const method = (req.method || 'GET').toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Method not allowed');
      return;
    }

    let url: URL;
    try {
      url = new URL(req.url || '/', 'http://localhost');
    } catch {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }
    const decoded = safeDecodePath(url.pathname);
    if (decoded === null || decoded.includes('\0')) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }

    if (await applyRedirect(req, res, url)) return;

    const rel = decoded.replace(/^\/+/, '');
    if (rel === 'sitemap.xml') {
      let staticXml = '';
      try {
        staticXml = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf-8');
      } catch {
        // fall through to 404 below
      }
      if (staticXml) {
        const xml = Buffer.from(await liveSitemap(staticXml), 'utf-8');
        const encoding = encodingFor(req);
        const body = encoding === 'gzip' ? zlib.gzipSync(xml) : encoding === 'br' ? zlib.brotliCompressSync(xml) : xml;
        res.writeHead(200, {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'Content-Length': body.length,
          ...(encoding ? { 'Content-Encoding': encoding, Vary: 'Accept-Encoding' } : {}),
        });
        res.end(req.method === 'HEAD' ? undefined : body);
        return;
      }
    }
    if (rel.startsWith('uploads/')) {
      const file = resolveInside(UPLOADS_DIR, rel.slice('uploads/'.length));
      if (file && serveFile(req, res, file, decoded)) return;
    }
    if (rel && rel !== 'index.html') {
      const file = resolveInside(DIST_DIR, rel);
      if (file && serveFile(req, res, file, decoded)) return;
      // A missing file with an extension is a real 404, not an app route
      // (except old WordPress-style .html links, which the app handles).
      if (/\.[a-z0-9]{2,5}$/i.test(rel) && !/\.html?$/i.test(rel)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' });
        res.end('Not found');
        return;
      }
    }
    await serveApp(req, res, decoded);
  } catch (err) {
    console.error('[server] request failed', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
    } else {
      res.end();
    }
  }
});

async function start(): Promise<void> {
  if (isDatabaseConfigured()) {
    try {
      await ready();
      console.log('[db] connected and migrations are up to date');
    } catch (err) {
      console.error('[db] not available at startup; the API will retry on each request.', (err as Error).message);
    }
  } else if (isProduction()) {
    console.error('[db] DATABASE_URL is not set: admin, leads, redirects and SEO are disabled.');
  }
  server.listen(port, () => {
    console.log(`EON8 server listening on http://localhost:${port}`);
  });
}

function shutdown(signal: string): void {
  console.log(`[server] ${signal} received, shutting down`);
  server.close(() => {
    void closeDatabase().finally(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

void start();
