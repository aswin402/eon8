import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { KeyRound, Trash2, UserPlus, Wand2 } from 'lucide-react';
import {
  adminFetch,
  formatDateTime,
  generateTempPassword,
  jsonBody,
  type AdminUserRecord,
  type AuditEntry,
} from '@/lib/admin/adminApi';
import { ui } from './adminStyles';

interface Props {
  currentUserId?: number;
}

const emptyForm = { email: '', name: '', role: 'editor' as 'admin' | 'editor', password: '' };

export function AdminUsersView({ currentUserId }: Props) {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setUsers((await adminFetch<{ items: AdminUserRecord[] }>('/api/admin/users')).items);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  const run = async (fn: () => Promise<unknown>, success: string) => {
    setError('');
    setNotice('');
    try {
      await fn();
      setNotice(success);
      void load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await run(
      () => adminFetch('/api/admin/users', { method: 'POST', body: jsonBody(form) }),
      `Account created for ${form.email}. Share the temporary password privately; they must change it on first sign-in.`
    );
    setForm(emptyForm);
    setBusy(false);
  };

  const resetPassword = (u: AdminUserRecord) => {
    const password = generateTempPassword();
    if (!window.confirm(`Reset the password for ${u.email}? They will be signed out and must set a new password.\n\nNew temporary password:\n${password}\n\nCopy it now; it is not shown again.`)) return;
    void run(
      () => adminFetch(`/api/admin/users/${u.id}/reset-password`, { method: 'POST', body: jsonBody({ password }) }),
      `Password reset for ${u.email}.`
    );
  };

  return (
    <div className="space-y-6">
      {error && <div className={ui.error}>{error}</div>}
      {notice && <div className={ui.notice} role="status">{notice}</div>}

      <form onSubmit={create} className={`${ui.card} grid gap-4 lg:grid-cols-12 items-end`}>
        <div className="lg:col-span-3 space-y-1.5">
          <label htmlFor="u-email" className={ui.label}>Email</label>
          <input id="u-email" type="email" required className={ui.input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="lg:col-span-3 space-y-1.5">
          <label htmlFor="u-name" className={ui.label}>Name</label>
          <input id="u-name" className={ui.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor="u-role" className={ui.label}>Role</label>
          <select id="u-role" className={`${ui.select} w-full`} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'editor' })}>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="lg:col-span-3 space-y-1.5">
          <label htmlFor="u-pass" className={ui.label}>Temporary password</label>
          <div className="flex gap-2">
            <input id="u-pass" required minLength={12} className={`${ui.input} font-mono`} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" className={ui.iconBtn} title="Generate a strong password" onClick={() => setForm({ ...form, password: generateTempPassword() })}>
              <Wand2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <button type="submit" disabled={busy} className={`${ui.primaryBtn} w-full`} title="Add user">
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
        <p className={`${ui.hint} lg:col-span-12`}>
          Editors manage blog posts, media, leads, redirects and page SEO. Admins can also change site settings, manage users and see the activity log.
        </p>
      </form>

      <div className={ui.tableCard}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={ui.thead}>
                <th className={ui.th}>User</th>
                <th className={ui.th}>Role</th>
                <th className={ui.th}>Active</th>
                <th className={ui.th}>Last sign-in</th>
                <th className={`${ui.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {users.map((u) => {
                const self = u.id === currentUserId;
                return (
                  <tr key={u.id} className={`hover:bg-muted/35 ${u.isActive ? '' : 'opacity-60'}`}>
                    <td className={ui.td}>
                      <p className="font-semibold text-foreground">{u.name || u.email}{self && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                      {u.mustChangePassword && <p className="text-[11px] font-bold text-amber-600">Temporary password not changed yet</p>}
                    </td>
                    <td className={ui.td}>
                      <select aria-label={`Role for ${u.email}`} className={ui.select} value={u.role} disabled={self}
                        onChange={(e) => void run(() => adminFetch(`/api/admin/users/${u.id}`, { method: 'PATCH', body: jsonBody({ role: e.target.value }) }), 'Role updated.')}>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className={ui.td}>
                      <input type="checkbox" aria-label={`${u.email} active`} checked={u.isActive} disabled={self}
                        onChange={() => void run(() => adminFetch(`/api/admin/users/${u.id}`, { method: 'PATCH', body: jsonBody({ isActive: !u.isActive }) }), u.isActive ? 'Account disabled and signed out.' : 'Account enabled.')} />
                    </td>
                    <td className={`${ui.td} text-xs text-muted-foreground whitespace-nowrap`}>{formatDateTime(u.lastLoginAt)}</td>
                    <td className={`${ui.td} text-right whitespace-nowrap`}>
                      {!self && (
                        <>
                          <button type="button" className={ui.iconBtn} title="Reset password" onClick={() => resetPassword(u)}>
                            <KeyRound className="w-4 h-4" />
                          </button>
                          <button type="button" className={ui.dangerIconBtn} title="Delete user"
                            onClick={() => window.confirm(`Delete ${u.email}? This cannot be undone.`) &&
                              void run(() => adminFetch(`/api/admin/users/${u.id}`, { method: 'DELETE' }), 'User deleted.')}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ENTITIES = ['', 'blog_post', 'lead', 'leads', 'redirect', 'page_seo', 'settings', 'admin_user', 'media', 'blog_category'];

export function AdminActivityView() {
  const [items, setItems] = useState<AuditEntry[]>([]);
  const [entity, setEntity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    adminFetch<{ items: AuditEntry[] }>(`/api/admin/audit?limit=200${entity ? `&entity=${entity}` : ''}`)
      .then((r) => setItems(r.items))
      .catch((err: Error) => setError(err.message));
  }, [entity]);

  return (
    <div className="space-y-4">
      {error && <div className={ui.error}>{error}</div>}
      <div className="flex items-center gap-3">
        <label htmlFor="audit-entity" className={ui.label}>Show</label>
        <select id="audit-entity" className={ui.select} value={entity} onChange={(e) => setEntity(e.target.value)}>
          {ENTITIES.map((e) => <option key={e} value={e}>{e ? e.replace('_', ' ') : 'Everything'}</option>)}
        </select>
      </div>
      <div className={ui.tableCard}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={ui.thead}>
                <th className={ui.th}>When</th>
                <th className={ui.th}>Who</th>
                <th className={ui.th}>What</th>
                <th className={ui.th}>Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {items.length === 0 && <tr><td colSpan={4} className="p-12 text-center text-muted-foreground">No activity yet.</td></tr>}
              {items.map((a) => (
                <tr key={a.id}>
                  <td className={`${ui.td} text-xs whitespace-nowrap text-muted-foreground`}>{formatDateTime(a.createdAt)}</td>
                  <td className={`${ui.td} text-xs`}>{a.userEmail ?? 'system'}</td>
                  <td className={`${ui.td} text-xs font-bold`}>{a.action.replace('_', ' ')} {a.entity.replace('_', ' ')}{a.entityId ? ` #${a.entityId}` : ''}</td>
                  <td className={`${ui.td} text-xs font-mono text-muted-foreground break-all`}>{a.detail ? JSON.stringify(a.detail) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
