import type { IncomingMessage, ServerResponse } from 'node:http';
import { audit, requireUser } from './lib/auth.ts';
import { isDatabaseConfigured, query } from './lib/db.ts';
import { adminPath, env } from './lib/env.ts';
import { HttpError, parseCsv, readJsonBody, safeDecodePath, sendJson } from './lib/http.ts';

const CODES = [301, 302, 307, 308, 410] as const;
const CACHE_TTL_MS = 60_000;

interface RedirectRow {
  id: string;
  source_path: string;
  target: string;
  status_code: number;
  is_active: boolean;
  hits: string;
  last_hit_at: Date | null;
  note: string | null;
  created_at: Date;
  updated_at: Date;
}

const toRedirect = (r: RedirectRow) => ({
  id: Number(r.id),
  sourcePath: r.source_path,
  target: r.target,
  statusCode: r.status_code,
  isActive: r.is_active,
  hits: Number(r.hits),
  lastHitAt: r.last_hit_at?.toISOString() ?? null,
  note: r.note,
  createdAt: r.created_at.toISOString(),
  updatedAt: r.updated_at.toISOString(),
});

/** Canonical form used for matching: leading slash, decoded, lower case, no trailing slash. */
export function normalizePath(input: string): string | null {
  let p = String(input || '').trim();
  if (!p) return null;
  p = p.replace(/^https?:\/\/[^/]+/i, '');
  p = p.split('#')[0].split('?')[0];
  const decoded = safeDecodePath(p);
  if (decoded === null) return null;
  p = decoded.startsWith('/') ? decoded : `/${decoded}`;
  p = p.replace(/\/{2,}/g, '/');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p.toLowerCase();
}

const SITE_HOSTS = () =>
  env('SITE_HOSTS', 'eon8.com,www.eon8.com')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);

/** Same-site absolute URLs become paths; other targets must be http(s) or start with "/". */
/**
 * Percent-encodes characters that are not allowed in an HTTP Location header
 * (e.g. Devanagari or spaces) without double-encoding existing %XX escapes.
 */
function encodeForLocation(value: string): string {
  let decoded = value;
  try {
    decoded = decodeURI(value);
  } catch {
    // Malformed escapes: encode the text as given.
  }
  return encodeURI(decoded);
}

function normalizeTarget(input: string): string {
  const t = String(input || '').trim();
  if (!t) return '';
  if (/[\r\n]/.test(t)) throw new HttpError(400, 'Target cannot contain line breaks.');
  const abs = t.match(/^https?:\/\/([^/]+)(\/.*)?$/i);
  if (abs) {
    if (SITE_HOSTS().includes(abs[1].toLowerCase())) return encodeForLocation(abs[2] || '/');
    try {
      return new URL(t).href;
    } catch {
      throw new HttpError(400, 'Target is not a valid URL.');
    }
  }
  if (t.startsWith('//')) throw new HttpError(400, 'Target cannot start with "//".');
  return encodeForLocation(t.startsWith('/') ? t : `/${t}`);
}

function assertAllowedSource(source: string): void {
  const reserved = ['/api', '/assets', normalizePath(adminPath()) || '/admin-dashboard'];
  if (source === '/') throw new HttpError(400, 'The home page cannot be redirected here.');
  if (reserved.some((r) => source === r || source.startsWith(`${r}/`))) {
    throw new HttpError(400, `"${source}" is a reserved path and cannot be redirected.`);
  }
  if (source.length > 500) throw new HttpError(400, 'Source path is too long.');
}

// ---------------------------------------------------------------------------
// In-memory cache used on every page request

let cache: Map<string, { id: number; target: string; code: number }> | null = null;
let cacheLoadedAt = 0;
let loading: Promise<void> | null = null;

async function loadCache(): Promise<void> {
  const { rows } = await query<RedirectRow>('SELECT * FROM redirects WHERE is_active');
  cache = new Map(rows.map((r) => [r.source_path, { id: Number(r.id), target: r.target, code: r.status_code }]));
  cacheLoadedAt = Date.now();
}

function invalidateCache(): void {
  cacheLoadedAt = 0;
}

/**
 * Sends a redirect for GET/HEAD page requests that match an active rule.
 * Returns true when a response was sent. Database problems never block pages.
 */
export async function applyRedirect(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') return false;
  if (!isDatabaseConfigured()) return false;
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/assets/')) return false;
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !/\.html?$/i.test(url.pathname)) return false;
  try {
    if (!cache || Date.now() - cacheLoadedAt > CACHE_TTL_MS) {
      loading ??= loadCache().finally(() => {
        loading = null;
      });
      await loading;
    }
  } catch {
    return false;
  }
  const key = normalizePath(url.pathname);
  const rule = key ? cache?.get(key) : undefined;
  if (!rule) return false;
  void query('UPDATE redirects SET hits = hits + 1, last_hit_at = now() WHERE id = $1', [rule.id]).catch(() => undefined);
  if (rule.code === 410) {
    res.writeHead(410, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
    res.end('<!doctype html><title>Gone</title><h1>This page has been removed.</h1><p><a href="/">Go to the EON8 home page</a></p>');
    return true;
  }
  let location = rule.target;
  if (url.search && !location.includes('?')) location += url.search;
  res.writeHead(rule.code, {
    Location: location,
    'Cache-Control': rule.code === 301 || rule.code === 308 ? 'public, max-age=3600' : 'no-store',
  });
  res.end();
  return true;
}

// ---------------------------------------------------------------------------

interface RedirectInput {
  sourcePath?: string;
  target?: string;
  statusCode?: number;
  isActive?: boolean;
  note?: string;
}

async function validateInput(input: RedirectInput, selfId?: number) {
  const source = normalizePath(input.sourcePath || '');
  if (!source) throw new HttpError(400, 'Source path is required (for example /old-page/).');
  assertAllowedSource(source);
  const statusCode = Number(input.statusCode ?? 301);
  if (!(CODES as readonly number[]).includes(statusCode)) throw new HttpError(400, 'Status must be 301, 302, 307, 308 or 410.');
  const target = statusCode === 410 ? '' : normalizeTarget(input.target || '');
  if (statusCode !== 410 && !target) throw new HttpError(400, 'Target is required unless the status is 410 (gone).');
  if (target.startsWith('/') && normalizePath(target) === source) throw new HttpError(400, 'A redirect cannot point to itself.');
  if (target.startsWith('/')) {
    const loop = await query<{ id: string }>(
      'SELECT id FROM redirects WHERE source_path = $1 AND is_active AND id <> $2 AND lower(target) IN ($3, $4)',
      [normalizePath(target), selfId ?? 0, source, `${source}/`]
    );
    if (loop.rowCount) throw new HttpError(400, 'This would create a redirect loop with an existing rule.');
  }
  return { source, target, statusCode, isActive: input.isActive ?? true, note: String(input.note ?? '').trim().slice(0, 300) || null };
}

function importColumn(header: string): 'source' | 'target' | 'code' | 'matching' | 'status' | null {
  const h = header.toLowerCase().replace(/[^a-z]/g, '');
  if (/^(source|sources|from|old|oldurl|sourceurl|url)$/.test(h)) return 'source';
  if (/^(destination|to|target|new|newurl|redirect|redirectto|url_to|destinationurl)$/.test(h)) return 'target';
  if (/^(type|code|statuscode|httpcode|redirecttype|header)$/.test(h)) return 'code';
  if (/^(matching|comparison|match)$/.test(h)) return 'matching';
  if (/^(status|active|enabled)$/.test(h)) return 'status';
  return null;
}

export async function handleRedirectsApi(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const pathname = url.pathname.replace(/\/+$/, '');
  if (!pathname.startsWith('/api/admin/redirects')) return false;
  const method = (req.method || 'GET').toUpperCase();
  const user = await requireUser(req, { roles: ['admin', 'editor'] });

  if (method === 'GET' && pathname === '/api/admin/redirects') {
    const q = (url.searchParams.get('q') || '').trim().toLowerCase();
    const { rows } = await query<RedirectRow>(
      q
        ? `SELECT * FROM redirects WHERE source_path LIKE $1 OR lower(target) LIKE $1 ORDER BY updated_at DESC LIMIT 1000`
        : 'SELECT * FROM redirects ORDER BY updated_at DESC LIMIT 1000',
      q ? [`%${q}%`] : []
    );
    sendJson(res, 200, { items: rows.map(toRedirect) });
    return true;
  }

  if (method === 'POST' && pathname === '/api/admin/redirects') {
    const v = await validateInput(await readJsonBody<RedirectInput>(req));
    const exists = await query('SELECT 1 FROM redirects WHERE source_path = $1', [v.source]);
    if (exists.rowCount) throw new HttpError(409, `A redirect for ${v.source} already exists.`);
    const { rows } = await query<RedirectRow>(
      `INSERT INTO redirects (source_path, target, status_code, is_active, note) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [v.source, v.target, v.statusCode, v.isActive, v.note]
    );
    invalidateCache();
    await audit(user, 'create', 'redirect', rows[0].id, { source: v.source, target: v.target, code: v.statusCode });
    sendJson(res, 201, { item: toRedirect(rows[0]) });
    return true;
  }

  if (method === 'POST' && pathname === '/api/admin/redirects/import') {
    const body = await readJsonBody<{ csv?: string; overwrite?: boolean }>(req, 5 * 1024 * 1024);
    const rows = parseCsv(String(body.csv || ''));
    if (rows.length < 2) throw new HttpError(400, 'The CSV needs a header row and at least one redirect.');
    const cols = rows[0].map(importColumn);
    if (!cols.includes('source')) throw new HttpError(400, 'No source column found (expected "source" or "from").');
    let created = 0;
    let updated = 0;
    const skipped: Array<{ line: number; reason: string }> = [];
    for (const [i, row] of rows.slice(1).entries()) {
      const rec: Partial<Record<'source' | 'target' | 'code' | 'matching' | 'status', string>> = {};
      row.forEach((value, idx) => {
        const c = cols[idx];
        if (c && rec[c] === undefined) rec[c] = value.trim();
      });
      const line = i + 2;
      if (rec.matching && !/^(exact|)$/i.test(rec.matching)) {
        skipped.push({ line, reason: `"${rec.matching}" matching is not supported (exact only)` });
        continue;
      }
      if (rec.status && /^(inactive|disabled|0|false|trashed?)$/i.test(rec.status)) {
        skipped.push({ line, reason: 'inactive in the source file' });
        continue;
      }
      // Rank Math can list several sources in one cell separated by newlines.
      for (const source of (rec.source || '').split(/\r?\n|\|/).map((s) => s.trim()).filter(Boolean)) {
        try {
          const v = await validateInput({ sourcePath: source, target: rec.target, statusCode: Number(rec.code) || 301 });
          const result = await query<{ inserted: boolean }>(
            `INSERT INTO redirects (source_path, target, status_code, note) VALUES ($1,$2,$3,'Imported')
             ON CONFLICT (source_path) DO ${body.overwrite ? 'UPDATE SET target = EXCLUDED.target, status_code = EXCLUDED.status_code, is_active = true, updated_at = now()' : 'NOTHING'}
             RETURNING (xmax = 0) AS inserted`,
            [v.source, v.target, v.statusCode]
          );
          if (!result.rowCount) skipped.push({ line, reason: `${v.source} already exists` });
          else if (result.rows[0].inserted) created += 1;
          else updated += 1;
        } catch (err) {
          skipped.push({ line, reason: (err as Error).message });
        }
      }
    }
    invalidateCache();
    await audit(user, 'import', 'redirect', null, { created, updated, skipped: skipped.length });
    sendJson(res, 200, { created, updated, skipped: skipped.slice(0, 100), skippedCount: skipped.length });
    return true;
  }

  const idMatch = pathname.match(/^\/api\/admin\/redirects\/(\d+)$/);
  if (!idMatch) throw new HttpError(404, 'Unknown redirects endpoint.');
  const id = Number(idMatch[1]);

  if (method === 'PUT') {
    const v = await validateInput(await readJsonBody<RedirectInput>(req), id);
    const clash = await query('SELECT 1 FROM redirects WHERE source_path = $1 AND id <> $2', [v.source, id]);
    if (clash.rowCount) throw new HttpError(409, `A redirect for ${v.source} already exists.`);
    const { rows } = await query<RedirectRow>(
      `UPDATE redirects SET source_path=$1, target=$2, status_code=$3, is_active=$4, note=$5, updated_at=now()
        WHERE id=$6 RETURNING *`,
      [v.source, v.target, v.statusCode, v.isActive, v.note, id]
    );
    if (!rows[0]) throw new HttpError(404, 'Redirect not found.');
    invalidateCache();
    await audit(user, 'update', 'redirect', id, { source: v.source, target: v.target, code: v.statusCode, active: v.isActive });
    sendJson(res, 200, { item: toRedirect(rows[0]) });
    return true;
  }

  if (method === 'DELETE') {
    const { rows } = await query<RedirectRow>('DELETE FROM redirects WHERE id = $1 RETURNING *', [id]);
    if (!rows[0]) throw new HttpError(404, 'Redirect not found.');
    invalidateCache();
    await audit(user, 'delete', 'redirect', id, { source: rows[0].source_path });
    sendJson(res, 200, { ok: true });
    return true;
  }

  throw new HttpError(405, 'Method not allowed.');
}
