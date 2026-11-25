import crypto from 'node:crypto';
import type { IncomingMessage } from 'node:http';
import { promisify } from 'node:util';
import { onDatabaseReady, query, type Queryable } from './db.ts';
import { env } from './env.ts';
import { HttpError, isSecureRequest, parseCookies } from './http.ts';

const scrypt = promisify(crypto.scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: crypto.ScryptOptions
) => Promise<Buffer>;

export type AdminRole = 'admin' | 'editor';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  mustChangePassword: boolean;
  updatedAt: string;
}

export const SESSION_COOKIE = 'eon8_admin_session';
const SESSION_TTL_MS = Number(env('SESSION_TTL_HOURS', '168')) * 60 * 60 * 1000;
const SCRYPT = { N: 16384, r: 8, p: 1 } as const;

/** Values that appeared in docs or old code; never accept them as a real password. */
const KNOWN_WEAK_PASSWORDS = new Set(
  ['ChangeMe@Eon8_2026!', 'Eon8Admin@2026', 'password', 'admin123', 'changeme'].map((p) =>
    p.toLowerCase()
  )
);

export function passwordProblem(password: string): string | null {
  if (password.length < 12) return 'Password must be at least 12 characters long.';
  if (password.length > 200) return 'Password is too long.';
  if (KNOWN_WEAK_PASSWORDS.has(password.toLowerCase())) {
    return 'That password is a published example. Choose a different one.';
  }
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(password));
  if (classes.length < 3) {
    return 'Use at least three of: lowercase, uppercase, numbers, symbols.';
  }
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, 64, SCRYPT);
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString('hex')}$${hash.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, n, r, p, saltHex, hashHex] = parts;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

const sha256 = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  password_hash: string;
  is_active: boolean;
  must_change_password: boolean;
  updated_at: Date;
}

export function toAdminUser(row: UserRow): AdminUser {
  return {
    id: Number(row.id),
    email: row.email,
    name: row.name,
    role: row.role,
    mustChangePassword: row.must_change_password,
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const { rows } = await query<UserRow>('SELECT * FROM admin_users WHERE email = $1', [
    email.trim().toLowerCase(),
  ]);
  return rows[0] ?? null;
}

export async function createSession(
  userId: number,
  req: IncomingMessage
): Promise<{ token: string; maxAgeSec: number }> {
  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await query(
    `INSERT INTO admin_sessions (token_hash, user_id, expires_at, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      sha256(token),
      userId,
      expiresAt,
      req.socket.remoteAddress ?? null,
      String(req.headers['user-agent'] ?? '').slice(0, 300),
    ]
  );
  await query('UPDATE admin_users SET last_login_at = now() WHERE id = $1', [userId]);
  await query('DELETE FROM admin_sessions WHERE expires_at < now()');
  return { token, maxAgeSec: Math.floor(SESSION_TTL_MS / 1000) };
}

export async function destroySession(req: IncomingMessage): Promise<void> {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (token) await query('DELETE FROM admin_sessions WHERE token_hash = $1', [sha256(token)]);
}

export async function destroyUserSessions(
  userId: number,
  exceptToken?: string,
  db: Queryable = { query }
): Promise<void> {
  await db.query('DELETE FROM admin_sessions WHERE user_id = $1 AND token_hash <> $2', [
    userId,
    exceptToken ? sha256(exceptToken) : '',
  ]);
}

export function sessionCookie(req: IncomingMessage, token: string, maxAgeSec: number): string {
  const secure = isSecureRequest(req) ? '; Secure' : '';
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax${secure}`;
}

export function clearSessionCookie(req: IncomingMessage): string {
  const secure = isSecureRequest(req) ? '; Secure' : '';
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export async function getSessionUser(req: IncomingMessage): Promise<AdminUser | null> {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const { rows } = await query<UserRow>(
    `SELECT u.* FROM admin_sessions s
       JOIN admin_users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now() AND u.is_active`,
    [sha256(token)]
  );
  return rows[0] ? toAdminUser(rows[0]) : null;
}

/**
 * Returns the signed-in user or throws 401/403. A user with a temporary
 * password may only change it until they do.
 */
export async function requireUser(
  req: IncomingMessage,
  options: { roles?: AdminRole[]; allowPendingPasswordChange?: boolean } = {}
): Promise<AdminUser> {
  const user = await getSessionUser(req);
  if (!user) throw new HttpError(401, 'Authentication required. Please sign in again.');
  if (user.mustChangePassword && !options.allowPendingPasswordChange) {
    throw new HttpError(403, 'Change your temporary password before continuing.');
  }
  if (options.roles && !options.roles.includes(user.role)) {
    throw new HttpError(403, 'Your account does not have permission for this action.');
  }
  return user;
}

export async function audit(
  user: Pick<AdminUser, 'id' | 'email'> | null,
  action: string,
  entity: string,
  entityId?: string | number | null,
  detail?: Record<string, unknown>,
  db: Queryable = { query }
): Promise<void> {
  await db.query(
    `INSERT INTO audit_log (user_id, user_email, action, entity, entity_id, detail)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      user?.id ?? null,
      user?.email ?? null,
      action,
      entity,
      entityId === undefined || entityId === null ? null : String(entityId),
      detail ? JSON.stringify(detail) : null,
    ]
  );
}

/**
 * Creates the first administrator from CMS_ADMIN_EMAIL / CMS_ADMIN_PASSWORD
 * when no admin user exists yet. There is no built-in default password.
 */
onDatabaseReady(async (db) => {
  const { rows } = await db.query<{ count: string }>('SELECT count(*) FROM admin_users');
  if (Number(rows[0].count) > 0) return;
  const email = env('CMS_ADMIN_EMAIL').toLowerCase();
  const password = env('CMS_ADMIN_PASSWORD');
  if (!email || !password) {
    console.warn(
      '[auth] No admin account exists. Set CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD and restart to create one.'
    );
    return;
  }
  const problem = passwordProblem(password);
  if (problem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn(`[auth] First admin not created: ${problem ?? 'CMS_ADMIN_EMAIL is not a valid email.'}`);
    return;
  }
  const hash = await hashPassword(password);
  const created = await db.query<{ id: string }>(
    `INSERT INTO admin_users (email, name, role, password_hash)
     VALUES ($1, 'Administrator', 'admin', $2) RETURNING id`,
    [email, hash]
  );
  await audit(null, 'bootstrap', 'admin_user', created.rows[0].id, { email }, db);
  console.log(`[auth] Created the first admin account (${email}). Remove CMS_ADMIN_PASSWORD from .env now.`);
});
