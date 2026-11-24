import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Database,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { cmsProvider } from '@/lib/cms/provider';
import { useBlogCmsStore } from '@/lib/cms/blogStore';

export function AdminSettingsView() {
  const session = useBlogCmsStore((s) => s.session);
  const changeCredentials = useBlogCmsStore((s) => s.changeCredentials);

  const [newEmail, setNewEmail] = useState(session.admin?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setStatus({ type: 'error', message: 'Please enter your current password.' });
      return;
    }
    if (newPassword.length < 10) {
      setStatus({
        type: 'error',
        message: 'New password must be at least 10 characters long.',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus({
        type: 'error',
        message: 'New password and confirmation do not match.',
      });
      return;
    }

    setSaving(true);
    setStatus(null);
    try {
      await changeCredentials({
        currentPassword,
        newEmail: newEmail.trim(),
        newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setStatus({
        type: 'success',
        message: 'Admin credentials updated and session token rotated.',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to update credentials',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExportJson = async () => {
    try {
      const adminState = await cmsProvider.fetchAdminState();
      const blob = new Blob([JSON.stringify(adminState, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eon8-blog-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Export failed');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Admin Credentials Rotation Card */}
      <form
        onSubmit={handlePasswordUpdate}
        className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-2xs"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FD5900]">
              <KeyRound className="w-3.5 h-3.5" />
              Credentials &amp; Access
            </span>
            <h2 className="text-xl font-heading font-extrabold text-foreground">
              Update Admin Email &amp; Password
            </h2>
            <p className="text-xs text-muted-foreground">
              Changing your password invalidates all previous session cookies immediately.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswords((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {showPasswords ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show</span>
              </>
            )}
          </button>
        </div>

        {status && (
          <div
            className={`rounded-xl px-4 py-3 text-xs font-bold flex items-center gap-2 ${
              status.type === 'success'
                ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25'
                : 'bg-red-500/12 text-red-600 dark:text-red-300 border border-red-500/25'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{status.message}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Current Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password to authorize change"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                New Password (min 8 chars)
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New strong password"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-sm font-heading font-extrabold disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Updating Credentials…' : 'Save New Credentials'}
        </button>
      </form>

      {/* Storage Engine & Supabase Readiness Card */}
      <div className="lg:col-span-5 space-y-5">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0053C6] dark:text-sky-400">
            <Database className="w-4 h-4" />
            <span>Storage &amp; Adapter Status</span>
          </div>

          <div className="rounded-xl bg-muted/60 p-4 space-y-1.5">
            <p className="text-sm font-heading font-extrabold text-foreground">
              {session.mode === 'supabase'
                ? 'Active: Supabase Database Adapter'
                : 'Active: Built-in Node File API'}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {session.mode === 'supabase'
                ? 'All blog CRUD operations persist to Supabase Postgres & Storage.'
                : 'All blog CRUD operations persist atomically to gitignored data/cms-content.json and uploaded images save to public/uploads/blog/.'}
            </p>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p className="font-bold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Supabase Migration Ready
            </p>
            <p>
              When you are ready to switch to Supabase, run{' '}
              <code className="text-foreground">supabase/schema.sql</code> in your Supabase
              SQL Editor and plug in a Supabase provider implementing{' '}
              <code className="text-foreground">BlogCmsProvider</code>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleExportJson()}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border hover:border-[#0053C6] text-xs font-bold text-foreground cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#0053C6]" />
            <span>Export CMS State Backup (.json)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
