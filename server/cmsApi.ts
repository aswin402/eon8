import crypto from 'node:crypto';
import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(currentDir, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const AUTH_FILE = path.join(DATA_DIR, 'cms-auth.json');
const CONTENT_FILE = path.join(DATA_DIR, 'cms-content.json');
const UPLOADS_BLOG_DIR = path.join(ROOT_DIR, 'public', 'uploads', 'blog');
const WP_UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'wp-content', 'uploads');

const SESSION_COOKIE_NAME = 'eon8_cms_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_BODY_BYTES = 12 * 1024 * 1024; // 12 MB (supports 8 MB base64 image uploads)

interface StoredAuthState {
  email: string;
  passwordHash: string;
  passwordSalt: string;
  sessionSecret: string;
  sessionSecretFingerprint?: string;
  authVersion: number;
  passwordChangedInDashboard: boolean;
  seededEnvFingerprint: string;
  updatedAt: string;
}

interface StoredCategoryPair {
  name: string;
  slug: string;
}

interface StoredBlogPost {
  id: number;
  slug: string;
  originalSlug?: string;
  title: string;
  status: 'published' | 'draft';
  featured: boolean;
  category: string;
  categories: string[];
  date: string;
  dateIso: string;
  readTime: string;
  author: string;
  thumbnail: string;
  excerpt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  createdAt: string;
  updatedAt: string;
  blocks: unknown[];
}

interface StoredContentState {
  version: number;
  upsertedPosts: Record<string, StoredBlogPost>;
  deletedPostIds: number[];
  deletedSlugs: string[];
  slugRedirects: Record<string, string>;
  customCategories: StoredCategoryPair[];
  deletedCategorySlugs: string[];
}

const loginAttemptsByIp = new Map<string, { count: number; resetAt: number }>();
const MAX_RATE_LIMIT_ENTRIES = 5000;
let ephemeralDevSecret: string | null = null;
let hasWarnedWeakDevConfig = false;

export function isPathInsideDir(targetPath: string, baseDir: string): boolean {
  const resolvedBase = path.resolve(baseDir);
  const resolvedTarget = path.resolve(targetPath);
  const rel = path.relative(resolvedBase, resolvedTarget);
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function safeDecodeUriComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

function isTruthyEnv(key: string): boolean {
  const val = getEnvValue(key, '').toLowerCase();
  return val === '1' || val === 'true' || val === 'yes';
}

function isProductionMode(): boolean {
  return (process.env.NODE_ENV || '').toLowerCase() === 'production';
}

function isPlaceholderPassword(password: string): boolean {
  const trimmed = password.trim();
  if (trimmed.length < 10) return true;
  return /^(changeme|password|admin123|eon8admin|12345678|replace-with)/i.test(trimmed) ||
    /ChangeMe@Eon8/i.test(trimmed);
}

function isPlaceholderSecret(secret: string): boolean {
  const trimmed = secret.trim();
  if (trimmed.length < 32) return true;
  return /(replace-with|changeme|your-secret|example|placeholder|default-secret)/i.test(trimmed);
}

function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function loadDotEnvMap(): Record<string, string> {
  const envMap: Record<string, string> = {};
  const envPath = path.join(ROOT_DIR, '.env');
  if (!fs.existsSync(envPath)) return envMap;
  try {
    const raw = fs.readFileSync(envPath, 'utf-8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx <= 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      envMap[key] = val;
    }
  } catch {
    // Ignore .env parse errors
  }
  return envMap;
}

export function getEnvValue(key: string, fallback = ''): string {
  if (process.env[key] && process.env[key]!.trim().length > 0) {
    return process.env[key]!.trim();
  }
  const dotEnv = loadDotEnvMap();
  if (dotEnv[key] && dotEnv[key].trim().length > 0) {
    return dotEnv[key].trim();
  }
  return fallback;
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, expectedHex: string): boolean {
  const computed = Buffer.from(hashPassword(password, salt), 'hex');
  const expected = Buffer.from(expectedHex, 'hex');
  if (computed.length !== expected.length) return false;
  return crypto.timingSafeEqual(computed, expected);
}

export function atomicWriteJson(filePath: string, data: unknown, mode?: number): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpFile = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpFile, `${JSON.stringify(data, null, 2)}\n`, {
    encoding: 'utf-8',
    ...(mode ? { mode } : {}),
  });
  fs.renameSync(tmpFile, filePath);
}

function readExistingAuthFile(): StoredAuthState | null {
  if (!fs.existsSync(AUTH_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8')) as StoredAuthState;
  } catch {
    return null;
  }
}

export function validateCmsSecurityConfig(strict = isProductionMode()): {
  ok: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const existing = readExistingAuthFile();
  const hasDashboardPassword = Boolean(existing?.passwordChangedInDashboard && existing.passwordHash);

  const envEmail = getEnvValue('CMS_ADMIN_EMAIL', '').toLowerCase();
  const envPassword = getEnvValue('CMS_ADMIN_PASSWORD', '');
  const envSecret = getEnvValue('CMS_SESSION_SECRET', '');

  if (!hasDashboardPassword) {
    if (!envEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(envEmail)) {
      errors.push('CMS_ADMIN_EMAIL must be set to a valid email address in the environment or .env.');
    }
    if (!envPassword) {
      errors.push('CMS_ADMIN_PASSWORD must be set in the environment or .env.');
    } else if (isPlaceholderPassword(envPassword)) {
      const msg =
        'CMS_ADMIN_PASSWORD is too weak or uses a placeholder value (minimum 10 characters; avoid example/default passwords).';
      if (strict) errors.push(msg);
      else warnings.push(msg);
    }
  }

  if (!envSecret || isPlaceholderSecret(envSecret)) {
    const msg =
      'CMS_SESSION_SECRET must be a unique random string of at least 32 characters (generate via `node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"`).';
    if (strict) errors.push(msg);
    else warnings.push(msg);
  }

  return { ok: errors.length === 0, errors, warnings };
}

function resolveSessionSecret(strict: boolean): string {
  const envSecret = getEnvValue('CMS_SESSION_SECRET', '');
  if (envSecret && !isPlaceholderSecret(envSecret)) {
    return envSecret;
  }
  if (strict) {
    throw new Error(
      'CMS_SESSION_SECRET is missing, shorter than 32 characters, or uses a placeholder value. Refusing to start CMS auth in production.'
    );
  }
  if (!ephemeralDevSecret) {
    ephemeralDevSecret = crypto.randomBytes(32).toString('hex');
  }
  return ephemeralDevSecret;
}

function ensureAuthState(): StoredAuthState {
  const strict = isProductionMode();
  const validation = validateCmsSecurityConfig(strict);
  if (!validation.ok) {
    throw new Error(`CMS security configuration error: ${validation.errors.join(' ')}`);
  }
  if (validation.warnings.length > 0 && !hasWarnedWeakDevConfig) {
    hasWarnedWeakDevConfig = true;
    console.warn(`[CMS Security Warning] ${validation.warnings.join(' ')}`);
  }

  const envEmail = getEnvValue('CMS_ADMIN_EMAIL', '').toLowerCase();
  const envPassword = getEnvValue('CMS_ADMIN_PASSWORD', '');
  const resolvedSecret = resolveSessionSecret(strict);
  const secretFingerprint = sha256Hex(resolvedSecret);
  const envFingerprint = envEmail && envPassword ? sha256Hex(`${envEmail}:${envPassword}`) : '';

  const parsed = readExistingAuthFile();
  if (parsed) {
    let changed = false;
    let next: StoredAuthState = { ...parsed };

    // Rotate stored session secret immediately if placeholder or CMS_SESSION_SECRET changed in env
    const storedSecretInvalid = !next.sessionSecret || isPlaceholderSecret(next.sessionSecret);
    const envSecretRotated =
      Boolean(getEnvValue('CMS_SESSION_SECRET', '')) &&
      !isPlaceholderSecret(getEnvValue('CMS_SESSION_SECRET', '')) &&
      next.sessionSecretFingerprint !== secretFingerprint;

    if (storedSecretInvalid || envSecretRotated) {
      next = {
        ...next,
        sessionSecret: resolvedSecret,
        sessionSecretFingerprint: secretFingerprint,
        authVersion: (next.authVersion || 1) + 1,
        updatedAt: new Date().toISOString(),
      };
      changed = true;
    }

    // If admin never manually changed password in dashboard and updated .env, sync automatically
    if (
      !next.passwordChangedInDashboard &&
      envEmail &&
      envPassword &&
      next.seededEnvFingerprint !== envFingerprint
    ) {
      const salt = crypto.randomBytes(16).toString('hex');
      next = {
        ...next,
        email: envEmail,
        passwordSalt: salt,
        passwordHash: hashPassword(envPassword, salt),
        seededEnvFingerprint: envFingerprint,
        authVersion: (next.authVersion || 1) + 1,
        updatedAt: new Date().toISOString(),
      };
      changed = true;
    }

    if (changed) {
      atomicWriteJson(AUTH_FILE, next, 0o600);
    }
    return next;
  }

  if (!envEmail || !envPassword) {
    throw new Error(
      'CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD must be configured in .env before signing in.'
    );
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const initial: StoredAuthState = {
    email: envEmail,
    passwordSalt: salt,
    passwordHash: hashPassword(envPassword, salt),
    sessionSecret: resolvedSecret,
    sessionSecretFingerprint: secretFingerprint,
    authVersion: 1,
    passwordChangedInDashboard: false,
    seededEnvFingerprint: envFingerprint,
    updatedAt: new Date().toISOString(),
  };
  atomicWriteJson(AUTH_FILE, initial, 0o600);
  return initial;
}

export function readCmsContentStateForServer(): StoredContentState {
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8')) as Partial<StoredContentState>;
      return {
        version: parsed.version ?? 1,
        upsertedPosts: parsed.upsertedPosts ?? {},
        deletedPostIds: Array.isArray(parsed.deletedPostIds) ? parsed.deletedPostIds : [],
        deletedSlugs: Array.isArray(parsed.deletedSlugs) ? parsed.deletedSlugs : [],
        slugRedirects: parsed.slugRedirects ?? {},
        customCategories: Array.isArray(parsed.customCategories) ? parsed.customCategories : [],
        deletedCategorySlugs: Array.isArray(parsed.deletedCategorySlugs)
          ? parsed.deletedCategorySlugs
          : [],
      };
    } catch {
      // Fall through to empty state
    }
  }
  return {
    version: 1,
    upsertedPosts: {},
    deletedPostIds: [],
    deletedSlugs: [],
    slugRedirects: {},
    customCategories: [],
    deletedCategorySlugs: [],
  };
}

function ensureContentState(): StoredContentState {
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8')) as Partial<StoredContentState>;
      return {
        version: parsed.version ?? 1,
        upsertedPosts: parsed.upsertedPosts ?? {},
        deletedPostIds: Array.isArray(parsed.deletedPostIds) ? parsed.deletedPostIds : [],
        deletedSlugs: Array.isArray(parsed.deletedSlugs) ? parsed.deletedSlugs : [],
        slugRedirects: parsed.slugRedirects ?? {},
        customCategories: Array.isArray(parsed.customCategories) ? parsed.customCategories : [],
        deletedCategorySlugs: Array.isArray(parsed.deletedCategorySlugs)
          ? parsed.deletedCategorySlugs
          : [],
      };
    } catch {
      // Recreate below if corrupted
    }
  }

  const initial: StoredContentState = {
    version: 1,
    upsertedPosts: {},
    deletedPostIds: [],
    deletedSlugs: [],
    slugRedirects: {},
    customCategories: [],
    deletedCategorySlugs: [],
  };
  atomicWriteJson(CONTENT_FILE, initial);
  return initial;
}

function createSessionToken(auth: StoredAuthState): string {
  const payload = Buffer.from(
    JSON.stringify({
      email: auth.email,
      v: auth.authVersion,
      exp: Date.now() + SESSION_TTL_MS,
    }),
    'utf-8'
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', auth.sessionSecret)
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string | undefined, auth: StoredAuthState): boolean {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;

  const expectedSig = crypto
    .createHmac('sha256', auth.sessionSecret)
    .update(payload)
    .digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
      email: string;
      v: number;
      exp: number;
    };
    if (decoded.exp < Date.now()) return false;
    if (decoded.v !== auth.authVersion) return false;
    if (decoded.email.toLowerCase() !== auth.email.toLowerCase()) return false;
    return true;
  } catch {
    return false;
  }
}

function parseCookies(req: IncomingMessage): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};
  const cookies: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx > 0) {
      const k = part.slice(0, idx).trim();
      const decoded = safeDecodeUriComponent(part.slice(idx + 1).trim());
      if (decoded !== null) {
        cookies[k] = decoded;
      }
    }
  }
  return cookies;
}

function isRequestSecure(req: IncomingMessage): boolean {
  const forced = getEnvValue('CMS_COOKIE_SECURE', '').toLowerCase();
  if (forced === 'true' || forced === '1') return true;
  if (forced === 'false' || forced === '0') return false;
  if ((req.socket as { encrypted?: boolean }).encrypted) return true;
  if (isTruthyEnv('TRUST_PROXY')) {
    const proto = String(req.headers['x-forwarded-proto'] || '')
      .split(',')[0]
      .trim()
      .toLowerCase();
    if (proto === 'https') return true;
  }
  return isProductionMode();
}

function buildSessionCookie(req: IncomingMessage, token: string, maxAgeSec: number): string {
  const secureFlag = isRequestSecure(req) ? '; Secure' : '';
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax${secureFlag}`;
}

export function getClientIp(req: IncomingMessage): string {
  if (isTruthyEnv('TRUST_PROXY')) {
    const forwarded = String(req.headers['x-forwarded-for'] || '')
      .split(',')[0]
      .trim();
    if (forwarded) return forwarded;
  }
  return req.socket.remoteAddress || 'unknown';
}

function pruneLoginAttempts(now: number): void {
  if (loginAttemptsByIp.size === 0) return;
  for (const [key, entry] of loginAttemptsByIp.entries()) {
    if (entry.resetAt <= now) {
      loginAttemptsByIp.delete(key);
    }
  }
  if (loginAttemptsByIp.size >= MAX_RATE_LIMIT_ENTRIES) {
    const excess = loginAttemptsByIp.size - Math.floor(MAX_RATE_LIMIT_ENTRIES * 0.8);
    let removed = 0;
    for (const key of loginAttemptsByIp.keys()) {
      loginAttemptsByIp.delete(key);
      removed += 1;
      if (removed >= excess) break;
    }
  }
}

function isRequestAuthenticated(req: IncomingMessage, auth: StoredAuthState): boolean {
  const cookies = parseCookies(req);
  if (verifySessionToken(cookies[SESSION_COOKIE_NAME], auth)) {
    return true;
  }
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return verifySessionToken(authHeader.slice(7).trim(), auth);
  }
  return false;
}

export function verifyAdminRequest(req: IncomingMessage): boolean {
  try {
    const auth = ensureAuthState();
    return isRequestAuthenticated(req, auth);
  } catch {
    return false;
  }
}

export function sendJson(
  res: ServerResponse,
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {}
): void {
  const json = JSON.stringify(body);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  });
  res.end(json);
}

export function readJsonBody<T>(req: IncomingMessage, maxBytes = MAX_BODY_BYTES): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    req.on('data', (chunk: Buffer) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error(`Payload exceeds maximum size limit (${Math.round(maxBytes / 1024)} KB)`));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf-8');
        resolve((raw ? JSON.parse(raw) : {}) as T);
      } catch {
        reject(new Error('Invalid JSON request body'));
      }
    });
    req.on('error', reject);
  });
}

function stripBlocks(post: StoredBlogPost): Omit<StoredBlogPost, 'blocks'> {
  const { blocks: _blocks, ...summary } = post;
  void _blocks;
  return summary;
}

function slugifyServer(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

const ALLOWED_IMAGE_MIMES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
};

function detectImageExtensionFromMagicBytes(buf: Buffer): { mime: string; ext: string } | null {
  if (buf.length < 12) return null;
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { mime: 'image/jpeg', ext: '.jpg' };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return { mime: 'image/png', ext: '.png' };
  }
  // GIF: GIF87a or GIF89a
  const ascii6 = buf.subarray(0, 6).toString('ascii');
  if (ascii6 === 'GIF87a' || ascii6 === 'GIF89a') {
    return { mime: 'image/gif', ext: '.gif' };
  }
  // WebP: RIFF....WEBP
  if (
    buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buf.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { mime: 'image/webp', ext: '.webp' };
  }
  // AVIF / HEIF ISO BMFF: ....ftyp(avif|avis|mif1)
  if (buf.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buf.subarray(8, 12).toString('ascii');
    if (brand === 'avif' || brand === 'avis' || brand === 'mif1') {
      return { mime: 'image/avif', ext: '.avif' };
    }
  }
  return null;
}

function scanDirectoryImages(
  baseDir: string,
  publicPrefix: string,
  folderType: 'uploaded' | 'site-library',
  maxItems: number,
  query: string
): Array<{
  url: string;
  name: string;
  folder: 'uploaded' | 'site-library';
  size: number;
  updatedAt: string;
}> {
  if (!fs.existsSync(baseDir)) return [];
  const results: Array<{
    url: string;
    name: string;
    folder: 'uploaded' | 'site-library';
    size: number;
    updatedAt: string;
    mtimeMs: number;
  }> = [];

  const q = query.trim().toLowerCase();
  const validExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

  const walk = (dir: string) => {
    if (results.length >= maxItems * 3) return;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (!validExts.has(ext)) continue;
        // Skip tiny WordPress cropped variants like -150x150 or -300x169 when browsing site library
        if (folderType === 'site-library' && /-\d{2,3}x\d{2,3}\.[a-z]+$/i.test(entry.name)) {
          continue;
        }
        if (q && !entry.name.toLowerCase().includes(q)) continue;

        const fullPath = path.join(dir, entry.name);
        try {
          const stat = fs.statSync(fullPath);
          const rel = path.relative(baseDir, fullPath).split(path.sep).join('/');
          results.push({
            url: `${publicPrefix}/${rel}`,
            name: entry.name,
            folder: folderType,
            size: stat.size,
            updatedAt: stat.mtime.toISOString(),
            mtimeMs: stat.mtimeMs,
          });
        } catch {
          // Ignore unreadable file
        }
      }
    }
  };

  walk(baseDir);
  results.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return results.slice(0, maxItems).map(({ mtimeMs: _m, ...rest }) => {
    void _m;
    return rest;
  });
}

export async function handleCmsApiRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  const rawUrl = req.url || '';
  if (!rawUrl.startsWith('/api/cms')) {
    return false;
  }

  const parsedUrl = new URL(rawUrl, 'http://localhost');
  const pathname = parsedUrl.pathname.replace(/\/+$/, '');
  const method = (req.method || 'GET').toUpperCase();

  try {
    // 1. Public State (fast summary merge for /blog, /category/*, /blog/:slug)
    if (method === 'GET' && pathname === '/api/cms/public-state') {
      const content = ensureContentState();
      const publishedSummaries: Record<string, Omit<StoredBlogPost, 'blocks'>> = {};
      for (const [id, post] of Object.entries(content.upsertedPosts)) {
        if (post.status === 'published') {
          publishedSummaries[id] = stripBlocks(post);
        }
      }
      sendJson(res, 200, {
        version: content.version,
        upsertedSummaries: publishedSummaries,
        deletedPostIds: content.deletedPostIds,
        deletedSlugs: content.deletedSlugs,
        slugRedirects: content.slugRedirects,
        customCategories: content.customCategories,
        deletedCategorySlugs: content.deletedCategorySlugs,
      });
      return true;
    }

    // 2. Public Full Single Post by Slug
    if (method === 'GET' && pathname.startsWith('/api/cms/public-post/')) {
      const targetSlug = safeDecodeUriComponent(pathname.slice('/api/cms/public-post/'.length));
      if (targetSlug === null) {
        sendJson(res, 400, { error: 'Malformed post slug.' });
        return true;
      }
      const content = ensureContentState();
      const match = Object.values(content.upsertedPosts).find(
        (p) => p.slug === targetSlug && p.status === 'published'
      );
      sendJson(res, 200, { post: match ?? null });
      return true;
    }

    const auth = ensureAuthState();

    // 3. Auth Session Check
    if (method === 'GET' && pathname === '/api/cms/auth/session') {
      const authenticated = isRequestAuthenticated(req, auth);
      sendJson(res, 200, {
        authenticated,
        mode: 'node-api',
        admin: authenticated
          ? { email: auth.email, updatedAt: auth.updatedAt }
          : undefined,
      });
      return true;
    }

    // 4. Login
    if (method === 'POST' && pathname === '/api/cms/auth/login') {
      const ip = getClientIp(req);
      const now = Date.now();
      pruneLoginAttempts(now);
      const bucket = loginAttemptsByIp.get(ip);
      if (bucket && bucket.resetAt > now && bucket.count >= 8) {
        const waitSec = Math.ceil((bucket.resetAt - now) / 1000);
        sendJson(res, 429, {
          error: `Too many failed sign-in attempts. Please wait ${waitSec}s before trying again.`,
        });
        return true;
      }

      const body = await readJsonBody<{ email?: string; password?: string }>(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';

      const emailMatches = email === auth.email.toLowerCase();
      const passMatches = verifyPassword(password, auth.passwordSalt, auth.passwordHash);

      if (!emailMatches || !passMatches) {
        const prev = bucket && bucket.resetAt > now ? bucket.count : 0;
        loginAttemptsByIp.set(ip, { count: prev + 1, resetAt: now + 10 * 60 * 1000 });
        sendJson(res, 401, { error: 'Invalid email address or password.' });
        return true;
      }

      loginAttemptsByIp.delete(ip);
      const token = createSessionToken(auth);
      const maxAgeSec = Math.floor(SESSION_TTL_MS / 1000);
      sendJson(
        res,
        200,
        {
          authenticated: true,
          mode: 'node-api',
          token,
          admin: { email: auth.email, updatedAt: auth.updatedAt },
        },
        {
          'Set-Cookie': buildSessionCookie(req, token, maxAgeSec),
        }
      );
      return true;
    }

    // 5. Logout
    if (method === 'POST' && pathname === '/api/cms/auth/logout') {
      sendJson(
        res,
        200,
        { ok: true },
        {
          'Set-Cookie': buildSessionCookie(req, '', 0),
        }
      );
      return true;
    }

    // Require Authentication for all /api/cms/admin/* and password change routes
    if (!isRequestAuthenticated(req, auth)) {
      sendJson(res, 401, { error: 'Authentication required. Please sign in again.' });
      return true;
    }

    // 6. Change Admin Email / Password
    if (method === 'POST' && pathname === '/api/cms/auth/change-password') {
      const body = await readJsonBody<{
        currentPassword?: string;
        newEmail?: string;
        newPassword?: string;
      }>(req);

      const currentPassword = body.currentPassword || '';
      const newEmail = (body.newEmail || auth.email).trim().toLowerCase();
      const newPassword = body.newPassword || '';

      if (!verifyPassword(currentPassword, auth.passwordSalt, auth.passwordHash)) {
        sendJson(res, 400, { error: 'Current password is incorrect.' });
        return true;
      }
      if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        sendJson(res, 400, { error: 'Please enter a valid admin email address.' });
        return true;
      }
      if (isPlaceholderPassword(newPassword)) {
        sendJson(res, 400, {
          error: 'New password must be at least 10 characters and not a common/default password.',
        });
        return true;
      }

      const newSalt = crypto.randomBytes(16).toString('hex');
      const updatedAuth: StoredAuthState = {
        ...auth,
        email: newEmail,
        passwordSalt: newSalt,
        passwordHash: hashPassword(newPassword, newSalt),
        authVersion: auth.authVersion + 1,
        passwordChangedInDashboard: true,
        updatedAt: new Date().toISOString(),
      };
      atomicWriteJson(AUTH_FILE, updatedAuth, 0o600);

      const token = createSessionToken(updatedAuth);
      const maxAgeSec = Math.floor(SESSION_TTL_MS / 1000);
      sendJson(
        res,
        200,
        {
          authenticated: true,
          mode: 'node-api',
          token,
          admin: { email: updatedAuth.email, updatedAt: updatedAuth.updatedAt },
        },
        {
          'Set-Cookie': buildSessionCookie(req, token, maxAgeSec),
        }
      );
      return true;
    }

    // 7. Admin Full State (includes drafts)
    if (method === 'GET' && pathname === '/api/cms/admin/state') {
      const content = ensureContentState();
      const allSummaries: Record<string, Omit<StoredBlogPost, 'blocks'>> = {};
      for (const [id, post] of Object.entries(content.upsertedPosts)) {
        allSummaries[id] = stripBlocks(post);
      }
      sendJson(res, 200, {
        version: content.version,
        upsertedSummaries: allSummaries,
        deletedPostIds: content.deletedPostIds,
        deletedSlugs: content.deletedSlugs,
        slugRedirects: content.slugRedirects,
        customCategories: content.customCategories,
        deletedCategorySlugs: content.deletedCategorySlugs,
      });
      return true;
    }

    // 8. Admin Single Post by ID
    if (method === 'GET' && pathname.startsWith('/api/cms/admin/post/')) {
      const idKey = safeDecodeUriComponent(pathname.slice('/api/cms/admin/post/'.length));
      if (idKey === null) {
        sendJson(res, 400, { error: 'Malformed post ID.' });
        return true;
      }
      const content = ensureContentState();
      sendJson(res, 200, { post: content.upsertedPosts[idKey] ?? null });
      return true;
    }

    // 9. Create / Update Blog Post
    if (method === 'POST' && pathname === '/api/cms/admin/posts') {
      const incoming = await readJsonBody<StoredBlogPost>(req);
      const cleanSlug = slugifyServer(incoming.slug || incoming.title || '');
      if (!cleanSlug) {
        sendJson(res, 400, { error: 'A valid URL slug is required.' });
        return true;
      }
      if (!incoming.title?.trim()) {
        sendJson(res, 400, { error: 'Article title is required.' });
        return true;
      }

      const content = ensureContentState();
      const postId =
        Number.isFinite(incoming.id) && incoming.id > 0
          ? incoming.id
          : Date.now();
      const idKey = String(postId);

      // Ensure no other active upserted post owns this slug
      const conflicting = Object.values(content.upsertedPosts).find(
        (p) => p.slug === cleanSlug && p.id !== postId
      );
      if (conflicting) {
        sendJson(res, 409, {
          error: `Slug "/blog/${cleanSlug}" is already used by "${conflicting.title}".`,
        });
        return true;
      }

      const existing = content.upsertedPosts[idKey];
      const nowIso = new Date().toISOString();
      const previousSlug = existing?.slug || incoming.originalSlug;

      // Track slug renames cleanly for redirects & hiding old static slug
      if (previousSlug && previousSlug !== cleanSlug) {
        content.slugRedirects[previousSlug] = cleanSlug;
        if (!content.deletedSlugs.includes(previousSlug)) {
          content.deletedSlugs.push(previousSlug);
        }
      }
      delete content.slugRedirects[cleanSlug];
      content.deletedSlugs = content.deletedSlugs.filter((s) => s !== cleanSlug);
      content.deletedPostIds = content.deletedPostIds.filter((id) => id !== postId);

      // Ensure primary category exists in customCategories if brand new
      const primaryCategory = (incoming.category || 'Digital Marketing').trim();
      const catSlug = slugifyServer(primaryCategory);
      if (
        catSlug &&
        !content.customCategories.some((c) => c.slug === catSlug)
      ) {
        content.customCategories.push({ name: primaryCategory, slug: catSlug });
        content.deletedCategorySlugs = content.deletedCategorySlugs.filter(
          (s) => s !== catSlug
        );
      }

      const record: StoredBlogPost = {
        ...incoming,
        id: postId,
        slug: cleanSlug,
        originalSlug: existing?.originalSlug ?? incoming.originalSlug,
        title: incoming.title.trim(),
        status: incoming.status === 'draft' ? 'draft' : 'published',
        featured: Boolean(incoming.featured),
        category: primaryCategory,
        categories:
          Array.isArray(incoming.categories) && incoming.categories.length > 0
            ? incoming.categories
            : [primaryCategory],
        createdAt: existing?.createdAt || incoming.createdAt || nowIso,
        updatedAt: nowIso,
        blocks: Array.isArray(incoming.blocks) ? incoming.blocks : [],
      };

      content.upsertedPosts[idKey] = record;
      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { post: record });
      return true;
    }

    // 10. Restore Deleted Static Post
    if (method === 'POST' && pathname === '/api/cms/admin/posts/restore') {
      const body = await readJsonBody<{ id: number; slug: string }>(req);
      const content = ensureContentState();
      content.deletedPostIds = content.deletedPostIds.filter((x) => x !== body.id);
      content.deletedSlugs = content.deletedSlugs.filter((s) => s !== body.slug);
      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { ok: true });
      return true;
    }

    // 11. Bulk Post Actions
    if (method === 'POST' && pathname === '/api/cms/admin/posts/bulk') {
      const body = await readJsonBody<{
        action: 'publish' | 'draft' | 'feature' | 'unfeature' | 'delete';
        items: Array<{ id: number; slug: string; seedPost?: StoredBlogPost }>;
      }>(req);

      const content = ensureContentState();
      const nowIso = new Date().toISOString();

      for (const item of body.items || []) {
        const idKey = String(item.id);
        if (body.action === 'delete') {
          const existing = content.upsertedPosts[idKey];
          delete content.upsertedPosts[idKey];
          if (!content.deletedPostIds.includes(item.id)) {
            content.deletedPostIds.push(item.id);
          }
          const slugsToHide = [item.slug, existing?.slug, existing?.originalSlug].filter(
            Boolean
          ) as string[];
          for (const s of slugsToHide) {
            if (!content.deletedSlugs.includes(s)) {
              content.deletedSlugs.push(s);
            }
          }
          continue;
        }

        const target = content.upsertedPosts[idKey] || item.seedPost;
        if (!target) continue;

        const updated: StoredBlogPost = {
          ...target,
          updatedAt: nowIso,
          createdAt: target.createdAt || nowIso,
          status:
            body.action === 'publish'
              ? 'published'
              : body.action === 'draft'
                ? 'draft'
                : target.status,
          featured:
            body.action === 'feature'
              ? true
              : body.action === 'unfeature'
                ? false
                : target.featured,
        };
        content.upsertedPosts[idKey] = updated;
      }

      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { ok: true });
      return true;
    }

    // 12. Delete Single Post
    if (method === 'DELETE' && pathname.startsWith('/api/cms/admin/posts/')) {
      const idStr = safeDecodeUriComponent(pathname.slice('/api/cms/admin/posts/'.length));
      if (idStr === null) {
        sendJson(res, 400, { error: 'Malformed post ID.' });
        return true;
      }
      const idNum = Number(idStr);
      const querySlug = parsedUrl.searchParams.get('slug') || '';
      const content = ensureContentState();

      const existing = content.upsertedPosts[idStr];
      delete content.upsertedPosts[idStr];

      if (Number.isFinite(idNum) && !content.deletedPostIds.includes(idNum)) {
        content.deletedPostIds.push(idNum);
      }
      for (const s of [querySlug, existing?.slug, existing?.originalSlug]) {
        if (s && !content.deletedSlugs.includes(s)) {
          content.deletedSlugs.push(s);
        }
      }

      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { ok: true });
      return true;
    }

    // 13. Category CRUD
    if (method === 'POST' && pathname === '/api/cms/admin/categories') {
      const body = await readJsonBody<{ name?: string; slug?: string }>(req);
      const name = (body.name || '').trim();
      const slug = slugifyServer(body.slug || name);
      if (!name || !slug) {
        sendJson(res, 400, { error: 'Category name is required.' });
        return true;
      }

      const content = ensureContentState();
      const existingIdx = content.customCategories.findIndex((c) => c.slug === slug);
      const pair = { name, slug };
      if (existingIdx >= 0) {
        content.customCategories[existingIdx] = pair;
      } else {
        content.customCategories.push(pair);
      }
      content.deletedCategorySlugs = content.deletedCategorySlugs.filter((s) => s !== slug);
      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { category: pair });
      return true;
    }

    if (method === 'PATCH' && pathname.startsWith('/api/cms/admin/categories/')) {
      const oldSlug = safeDecodeUriComponent(pathname.slice('/api/cms/admin/categories/'.length));
      if (oldSlug === null) {
        sendJson(res, 400, { error: 'Malformed category slug.' });
        return true;
      }
      const body = await readJsonBody<{ newName?: string; oldName?: string }>(req);
      const newName = (body.newName || '').trim();
      const newSlug = slugifyServer(newName);
      if (!newName || !newSlug) {
        sendJson(res, 400, { error: 'New category name is required.' });
        return true;
      }

      const content = ensureContentState();
      if (oldSlug !== newSlug && !content.deletedCategorySlugs.includes(oldSlug)) {
        content.deletedCategorySlugs.push(oldSlug);
      }
      content.customCategories = content.customCategories.filter(
        (c) => c.slug !== oldSlug && c.slug !== newSlug
      );
      const pair = { name: newName, slug: newSlug };
      content.customCategories.push(pair);
      content.deletedCategorySlugs = content.deletedCategorySlugs.filter((s) => s !== newSlug);

      // Update any upserted posts referencing oldName / oldSlug
      const oldNameLower = (body.oldName || '').trim().toLowerCase();
      for (const post of Object.values(content.upsertedPosts)) {
        if (
          slugifyServer(post.category) === oldSlug ||
          (oldNameLower && post.category.toLowerCase() === oldNameLower)
        ) {
          post.category = newName;
        }
        post.categories = post.categories.map((cat) =>
          slugifyServer(cat) === oldSlug ||
          (oldNameLower && cat.toLowerCase() === oldNameLower)
            ? newName
            : cat
        );
      }

      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { category: pair });
      return true;
    }

    if (method === 'DELETE' && pathname.startsWith('/api/cms/admin/categories/')) {
      const slug = safeDecodeUriComponent(pathname.slice('/api/cms/admin/categories/'.length));
      if (slug === null) {
        sendJson(res, 400, { error: 'Malformed category slug.' });
        return true;
      }
      const content = ensureContentState();
      content.customCategories = content.customCategories.filter((c) => c.slug !== slug);
      if (!content.deletedCategorySlugs.includes(slug)) {
        content.deletedCategorySlugs.push(slug);
      }
      content.version += 1;
      atomicWriteJson(CONTENT_FILE, content);
      sendJson(res, 200, { ok: true });
      return true;
    }

    // 14. Media Library List & Upload & Delete
    if (method === 'GET' && pathname === '/api/cms/admin/media') {
      const query = parsedUrl.searchParams.get('q') || '';
      const uploaded = scanDirectoryImages(
        UPLOADS_BLOG_DIR,
        '/uploads/blog',
        'uploaded',
        100,
        query
      );
      const siteLib = scanDirectoryImages(
        WP_UPLOADS_DIR,
        '/wp-content/uploads',
        'site-library',
        80,
        query
      );
      sendJson(res, 200, { items: [...uploaded, ...siteLib] });
      return true;
    }

    if (method === 'POST' && pathname === '/api/cms/admin/media/upload') {
      const body = await readJsonBody<{
        fileName?: string;
        mimeType?: string;
        base64Data?: string;
      }>(req);

      const declaredMime = (body.mimeType || '').toLowerCase();
      if (declaredMime && !ALLOWED_IMAGE_MIMES[declaredMime]) {
        sendJson(res, 400, {
          error: 'Unsupported image format. Please upload JPG, PNG, WEBP, GIF, or AVIF.',
        });
        return true;
      }

      const rawBase64 = (body.base64Data || '').replace(/^data:[^;]+;base64,/, '');
      if (!rawBase64) {
        sendJson(res, 400, { error: 'Image payload is empty.' });
        return true;
      }

      const buffer = Buffer.from(rawBase64, 'base64');
      if (buffer.length === 0 || buffer.length > 8 * 1024 * 1024) {
        sendJson(res, 400, { error: 'Image must be between 1 byte and 8 MB.' });
        return true;
      }

      const detected = detectImageExtensionFromMagicBytes(buffer);
      if (!detected) {
        sendJson(res, 400, {
          error: 'Uploaded file failed image signature validation. Only genuine JPG, PNG, WEBP, GIF, or AVIF binaries are accepted.',
        });
        return true;
      }

      const baseStem =
        slugifyServer(path.basename(body.fileName || 'blog-image', path.extname(body.fileName || ''))) ||
        'blog-image';
      const uniqueSuffix = `${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
      const finalName = `${baseStem}-${uniqueSuffix}${detected.ext}`;

      fs.mkdirSync(UPLOADS_BLOG_DIR, { recursive: true });
      const targetPath = path.resolve(UPLOADS_BLOG_DIR, finalName);
      if (!isPathInsideDir(targetPath, UPLOADS_BLOG_DIR)) {
        sendJson(res, 400, { error: 'Invalid upload destination path.' });
        return true;
      }
      fs.writeFileSync(targetPath, buffer);

      sendJson(res, 200, {
        item: {
          url: `/uploads/blog/${finalName}`,
          name: finalName,
          folder: 'uploaded' as const,
          size: buffer.length,
          updatedAt: new Date().toISOString(),
        },
      });
      return true;
    }

    if (method === 'DELETE' && pathname === '/api/cms/admin/media') {
      const url = parsedUrl.searchParams.get('url') || '';
      if (!url.startsWith('/uploads/blog/')) {
        sendJson(res, 400, { error: 'Only custom uploaded images can be deleted.' });
        return true;
      }
      const fileName = path.basename(url);
      const resolved = path.resolve(UPLOADS_BLOG_DIR, fileName);
      if (!isPathInsideDir(resolved, UPLOADS_BLOG_DIR)) {
        sendJson(res, 400, { error: 'Invalid file path.' });
        return true;
      }
      if (fs.existsSync(resolved)) {
        fs.unlinkSync(resolved);
      }
      sendJson(res, 200, { ok: true });
      return true;
    }

    sendJson(res, 404, { error: `Unknown CMS endpoint: ${method} ${pathname}` });
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    sendJson(res, 500, { error: message });
    return true;
  }
}
