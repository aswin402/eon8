import type { IncomingMessage, ServerResponse } from 'node:http';
import { envFlag, isProduction } from './env.ts';

export class HttpError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
  headers: Record<string, string | string[]> = {}
): void {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  });
  res.end(JSON.stringify(body));
}

export function sendText(
  res: ServerResponse,
  status: number,
  body: string,
  headers: Record<string, string> = {}
): void {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  res.end(body);
}

const DEFAULT_MAX_BODY = 1024 * 1024; // 1 MB

export function readJsonBody<T>(req: IncomingMessage, maxBytes = DEFAULT_MAX_BODY): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    let failed = false;
    req.on('data', (chunk: Buffer) => {
      if (failed) return;
      total += chunk.length;
      if (total > maxBytes) {
        failed = true;
        reject(new HttpError(413, `Request body is larger than ${Math.round(maxBytes / 1024)} KB.`));
        req.resume();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (failed) return;
      const raw = Buffer.concat(chunks).toString('utf-8');
      if (!raw) return resolve({} as T);
      try {
        resolve(JSON.parse(raw) as T);
      } catch {
        reject(new HttpError(400, 'Request body is not valid JSON.'));
      }
    });
    req.on('error', reject);
  });
}

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const header = req.headers.cookie;
  const cookies: Record<string, string> = {};
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx <= 0) continue;
    const key = part.slice(0, idx).trim();
    const raw = part.slice(idx + 1).trim();
    try {
      cookies[key] = decodeURIComponent(raw);
    } catch {
      cookies[key] = raw;
    }
  }
  return cookies;
}

/**
 * The visitor's IP. Proxy headers are only trusted when TRUST_PROXY is set.
 * X-Real-IP (set by our Nginx config to the connecting address) is preferred;
 * otherwise the right-most X-Forwarded-For entry, the one added by our own
 * proxy. The left-most entries are chosen by the client and can be faked.
 */
export function clientIp(req: IncomingMessage): string {
  if (envFlag('TRUST_PROXY')) {
    const realIp = req.headers['x-real-ip'];
    const real = (Array.isArray(realIp) ? realIp[0] : realIp)?.trim();
    if (real) return real;
    const forwarded = req.headers['x-forwarded-for'];
    const entries = (Array.isArray(forwarded) ? forwarded.join(',') : forwarded || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (entries.length) return entries[entries.length - 1];
  }
  return req.socket.remoteAddress || 'unknown';
}

export function isSecureRequest(req: IncomingMessage): boolean {
  if (envFlag('TRUST_PROXY') && req.headers['x-forwarded-proto'] === 'https') return true;
  return Boolean((req.socket as { encrypted?: boolean }).encrypted) || isProduction();
}

/**
 * State-changing requests must come from this site. A cross-site form or fetch
 * carries a foreign Origin (or none with a non-JSON body), so it is rejected.
 */
export function assertSameOrigin(req: IncomingMessage): void {
  const method = (req.method || 'GET').toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') return;
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] && envFlag('TRUST_PROXY')
    ? String(req.headers['x-forwarded-host'])
    : req.headers.host;
  if (origin) {
    let originHost: string;
    try {
      originHost = new URL(origin).host;
    } catch {
      throw new HttpError(403, 'Request origin is not allowed.');
    }
    if (originHost !== host) throw new HttpError(403, 'Request origin is not allowed.');
    return;
  }
  const contentType = String(req.headers['content-type'] || '');
  if (!contentType.includes('application/json')) {
    throw new HttpError(403, 'Requests must send JSON from this site.');
  }
}

/** Simple fixed-window rate limiter kept in memory, with expired entries pruned. */
export function createRateLimiter(limit: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  let lastPrune = Date.now();
  return {
    /** Returns the seconds to wait when the key is over its limit, otherwise 0. */
    check(key: string): number {
      const now = Date.now();
      if (now - lastPrune > windowMs) {
        for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
        lastPrune = now;
      }
      const bucket = buckets.get(key);
      if (bucket && bucket.resetAt > now && bucket.count >= limit) {
        return Math.ceil((bucket.resetAt - now) / 1000);
      }
      return 0;
    },
    hit(key: string): void {
      const now = Date.now();
      const bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= now) buckets.set(key, { count: 1, resetAt: now + windowMs });
      else bucket.count += 1;
    },
    reset(key: string): void {
      buckets.delete(key);
    },
  };
}

/** Headers sent with every response from the production server. */
export const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

export function safeDecodePath(pathname: string): string | null {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return null;
  }
}

export function toCsv(rows: Array<Array<string | number | null | undefined>>): string {
  const cell = (v: string | number | null | undefined) => {
    let s = v === null || v === undefined ? '' : String(v);
    // Neutralise spreadsheet formula injection from user-submitted text.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return rows.map((r) => r.map(cell).join(',')).join('\r\n');
}

/** Minimal RFC 4180 CSV parser (quoted fields, escaped quotes, CRLF). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const src = text.startsWith(String.fromCharCode(0xfeff)) ? text.slice(1) : text;
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 1;
        } else quoted = false;
      } else field += ch;
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}
