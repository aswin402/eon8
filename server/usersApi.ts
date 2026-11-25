import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  audit,
  destroyUserSessions,
  findUserByEmail,
  hashPassword,
  passwordProblem,
  requireUser,
  type AdminRole,
} from './lib/auth.ts';
import { query, transaction } from './lib/db.ts';
import { HttpError, readJsonBody, sendJson } from './lib/http.ts';
import { isEncryptionEnabled } from './lib/crypto.ts';
import { isMailConfigured } from './lib/mailer.ts';

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  is_active: boolean;
  must_change_password: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

const toUser = (r: UserRow) => ({
  id: Number(r.id),
  email: r.email,
  name: r.name,
  role: r.role,
  isActive: r.is_active,
  mustChangePassword: r.must_change_password,
  lastLoginAt: r.last_login_at?.toISOString() ?? null,
  createdAt: r.created_at.toISOString(),
  updatedAt: r.updated_at.toISOString(),
});

const ROLES: AdminRole[] = ['admin', 'editor'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function activeAdminCount(excludeId: number): Promise<number> {
  const { rows } = await query<{ count: string }>(
    `SELECT count(*) FROM admin_users WHERE role = 'admin' AND is_active AND id <> $1`,
    [excludeId]
  );
  return Number(rows[0].count);
}

export async function handleUsersApi(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const pathname = url.pathname.replace(/\/+$/, '');
  const method = (req.method || 'GET').toUpperCase();

  if (pathname === '/api/admin/system' && method === 'GET') {
    await requireUser(req, { roles: ['admin'] });
    const [users, leads, redirects, seo, posts] = await Promise.all([
      query<{ count: string }>('SELECT count(*) FROM admin_users'),
      query<{ count: string }>(`SELECT count(*) FROM leads WHERE status <> 'spam'`),
      query<{ count: string }>('SELECT count(*) FROM redirects WHERE is_active'),
      query<{ count: string }>('SELECT count(*) FROM page_seo'),
      query<{ count: string }>('SELECT count(*) FROM cms_posts'),
    ]);
    const failedMail = await query<{ count: string }>(
      `SELECT count(*) FROM leads WHERE email_status = 'failed' AND created_at > now() - interval '30 days'`
    );
    sendJson(res, 200, {
      database: 'connected',
      mailConfigured: isMailConfigured(),
      leadEncryption: isEncryptionEnabled() ? 'on' : 'off',
      counts: {
        users: Number(users.rows[0].count),
        leads: Number(leads.rows[0].count),
        activeRedirects: Number(redirects.rows[0].count),
        seoOverrides: Number(seo.rows[0].count),
        cmsPosts: Number(posts.rows[0].count),
        failedLeadEmails30d: Number(failedMail.rows[0].count),
      },
    });
    return true;
  }

  if (pathname === '/api/admin/audit' && method === 'GET') {
    await requireUser(req, { roles: ['admin'] });
    const limit = Math.min(500, Math.max(10, Number(url.searchParams.get('limit')) || 100));
    const entity = url.searchParams.get('entity') || '';
    const { rows } = await query<{
      id: string; user_email: string | null; action: string; entity: string; entity_id: string | null; detail: unknown; created_at: Date;
    }>(
      `SELECT id, user_email, action, entity, entity_id, detail, created_at FROM audit_log
        ${entity ? 'WHERE entity = $1' : ''} ORDER BY created_at DESC LIMIT ${limit}`,
      entity ? [entity] : []
    );
    sendJson(res, 200, {
      items: rows.map((r) => ({
        id: Number(r.id),
        userEmail: r.user_email,
        action: r.action,
        entity: r.entity,
        entityId: r.entity_id,
        detail: r.detail,
        createdAt: r.created_at.toISOString(),
      })),
    });
    return true;
  }

  if (!pathname.startsWith('/api/admin/users')) return false;
  const me = await requireUser(req, { roles: ['admin'] });

  if (method === 'GET' && pathname === '/api/admin/users') {
    const { rows } = await query<UserRow>('SELECT * FROM admin_users ORDER BY created_at');
    sendJson(res, 200, { items: rows.map(toUser) });
    return true;
  }

  if (method === 'POST' && pathname === '/api/admin/users') {
    const body = await readJsonBody<{ email?: string; name?: string; role?: AdminRole; password?: string }>(req);
    const email = String(body.email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Please enter a valid email address.');
    const role = ROLES.includes(body.role as AdminRole) ? (body.role as AdminRole) : 'editor';
    const problem = passwordProblem(String(body.password || ''));
    if (problem) throw new HttpError(400, `Temporary password: ${problem}`);
    if (await findUserByEmail(email)) throw new HttpError(409, 'An account with that email already exists.');
    const { rows } = await query<UserRow>(
      `INSERT INTO admin_users (email, name, role, password_hash, must_change_password)
       VALUES ($1, $2, $3, $4, true) RETURNING *`,
      [email, String(body.name || '').trim().slice(0, 120), role, await hashPassword(String(body.password))]
    );
    await audit(me, 'create', 'admin_user', rows[0].id, { email, role });
    sendJson(res, 201, { item: toUser(rows[0]) });
    return true;
  }

  const match = pathname.match(/^\/api\/admin\/users\/(\d+)(\/reset-password)?$/);
  if (!match) throw new HttpError(404, 'Unknown users endpoint.');
  const id = Number(match[1]);
  const target = (await query<UserRow>('SELECT * FROM admin_users WHERE id = $1', [id])).rows[0];
  if (!target) throw new HttpError(404, 'User not found.');

  if (method === 'POST' && match[2]) {
    const body = await readJsonBody<{ password?: string }>(req);
    const problem = passwordProblem(String(body.password || ''));
    if (problem) throw new HttpError(400, `Temporary password: ${problem}`);
    const hash = await hashPassword(String(body.password));
    await transaction(async (db) => {
      await db.query(
        'UPDATE admin_users SET password_hash = $1, must_change_password = true, updated_at = now() WHERE id = $2',
        [hash, id]
      );
      await destroyUserSessions(id, undefined, db);
      await audit(me, 'reset_password', 'admin_user', id, { email: target.email }, db);
    });
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (method === 'PATCH') {
    const body = await readJsonBody<{ name?: string; role?: AdminRole; isActive?: boolean }>(req);
    const role = body.role === undefined ? target.role : body.role;
    if (!ROLES.includes(role)) throw new HttpError(400, 'Role must be admin or editor.');
    const isActive = body.isActive === undefined ? target.is_active : Boolean(body.isActive);
    const losingAdmin = target.role === 'admin' && target.is_active && (role !== 'admin' || !isActive);
    if (id === me.id && losingAdmin) throw new HttpError(400, 'You cannot remove your own admin access.');
    if (losingAdmin && (await activeAdminCount(id)) === 0) {
      throw new HttpError(400, 'At least one active admin must remain.');
    }
    const { rows } = await query<UserRow>(
      'UPDATE admin_users SET name = $1, role = $2, is_active = $3, updated_at = now() WHERE id = $4 RETURNING *',
      [body.name === undefined ? target.name : String(body.name).trim().slice(0, 120), role, isActive, id]
    );
    if (!isActive) await destroyUserSessions(id);
    await audit(me, 'update', 'admin_user', id, { role, isActive });
    sendJson(res, 200, { item: toUser(rows[0]) });
    return true;
  }

  if (method === 'DELETE') {
    if (id === me.id) throw new HttpError(400, 'You cannot delete your own account.');
    if (target.role === 'admin' && target.is_active && (await activeAdminCount(id)) === 0) {
      throw new HttpError(400, 'At least one active admin must remain.');
    }
    await query('DELETE FROM admin_users WHERE id = $1', [id]);
    await audit(me, 'delete', 'admin_user', id, { email: target.email });
    sendJson(res, 200, { ok: true });
    return true;
  }

  throw new HttpError(405, 'Method not allowed.');
}
