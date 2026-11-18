import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleCmsApiRequest } from './cmsApi.ts';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(currentDir, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'uploads');

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
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function serveStaticFile(filePath: string, res: http.ServerResponse): boolean {
  if (!fs.existsSync(filePath)) return false;
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
    });
    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

const port = Number(process.env.PORT || 4173);

const server = http.createServer(async (req, res) => {
  const handledByApi = await handleCmsApiRequest(req, res);
  if (handledByApi) return;

  const parsedUrl = new URL(req.url || '/', `http://localhost:${port}`);
  const safeRel = decodeURIComponent(parsedUrl.pathname).replace(/^\/+/, '');

  // Serve runtime uploaded blog images directly from public/uploads
  if (safeRel.startsWith('uploads/')) {
    const uploadPath = path.resolve(PUBLIC_UPLOADS_DIR, safeRel.slice('uploads/'.length));
    if (uploadPath.startsWith(PUBLIC_UPLOADS_DIR) && serveStaticFile(uploadPath, res)) {
      return;
    }
  }

  // Serve built static assets from dist/
  if (safeRel) {
    const distAsset = path.resolve(DIST_DIR, safeRel);
    if (distAsset.startsWith(DIST_DIR) && serveStaticFile(distAsset, res)) {
      return;
    }
  }

  // SPA fallback -> dist/index.html
  const indexHtml = path.join(DIST_DIR, 'index.html');
  if (serveStaticFile(indexHtml, res)) {
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Build output not found. Run `npm run build` before `npm start`.');
});

server.listen(port, () => {
  console.log(`Eon8 server + Blog CMS API listening on http://localhost:${port}`);
});
