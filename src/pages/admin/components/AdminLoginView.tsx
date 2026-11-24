import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminLoginViewProps {
  onLogin: (email: string, password: string) => Promise<void>;
  totalPublishedCount: number;
  categoryCount: number;
}

export function AdminLoginView({
  onLogin,
  totalPublishedCount,
  categoryCount,
}: AdminLoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both your admin email and password.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onLogin(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#061022] text-white font-body selection:bg-[#FD5900] selection:text-white">
      {/* Left Architectural Editorial Showcase */}
      <div className="lg:col-span-7 relative overflow-hidden p-8 sm:p-14 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br from-[#040B18] via-[#071938] to-[#003E9C]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 w-96 h-96 rounded-full bg-[#FD5900]/25 blur-[110px]"
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FD5900] flex items-center justify-center font-heading font-extrabold text-white text-lg shadow-lg shadow-[#FD5900]/30">
              E8
            </div>
            <div>
              <p className="font-heading font-extrabold tracking-tight text-lg leading-none">
                EON8 STUDIO
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300 mt-1">
                Editorial Command Center
              </p>
            </div>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors no-underline px-3.5 py-2 rounded-xl bg-white/8 border border-white/12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Public Blog
          </Link>
        </div>

        <div className="relative z-10 my-12 lg:my-0 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-orange-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FD5900]" />
            <span>Restricted Hidden Route • Search No-Index Active</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.1] text-white">
            Publish high-authority research without touching code.
          </h1>

          <p className="text-sm sm:text-base text-slate-200/85 leading-relaxed">
            Manage all Eon8 articles, visual content blocks, drafts, featured spotlights,
            categories, media uploads, and search-engine metadata from a single studio
            interface.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="rounded-2xl bg-slate-950/45 border border-white/12 p-4">
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {totalPublishedCount}
              </p>
              <p className="text-xs text-slate-300 mt-1">Live Articles</p>
            </div>
            <div className="rounded-2xl bg-slate-950/45 border border-white/12 p-4">
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-[#FD5900]">
                {categoryCount}
              </p>
              <p className="text-xs text-slate-300 mt-1">Topic Verticals</p>
            </div>
            <div className="rounded-2xl bg-slate-950/45 border border-white/12 p-4">
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-400">
                100%
              </p>
              <p className="text-xs text-slate-300 mt-1">Live SERP Sync</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-4 text-xs text-slate-300/80">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Scrypt + HMAC Session Protection
          </span>
          <span>•</span>
          <span>Supabase-Ready Repository Architecture</span>
        </div>
      </div>

      {/* Right Sign-In Form */}
      <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#070D19]">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FD5900]">
              Administrator Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Sign in to Editorial Studio
            </h2>
            <p className="text-sm text-slate-400">
              Enter your administrator email and password to unlock blog CRUD controls.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/40 bg-red-500/12 px-4 py-3 text-sm text-red-200 font-medium"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="cms-admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="cms-admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-900/90 border border-white/15 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FD5900] focus:ring-2 focus:ring-[#FD5900]/30 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cms-admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="cms-admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-900/90 border border-white/15 pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FD5900] focus:ring-2 focus:ring-[#FD5900]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#FD5900] hover:bg-[#e55000] disabled:opacity-60 text-white font-heading font-extrabold text-sm py-3.5 px-6 shadow-lg shadow-[#FD5900]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials…</span>
                </>
              ) : (
                <span>Unlock Editorial Dashboard</span>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 leading-relaxed">
            Initial credentials are seeded from <code className="text-slate-300">.env</code>{' '}
            (<code className="text-slate-300">CMS_ADMIN_EMAIL</code> &amp;{' '}
            <code className="text-slate-300">CMS_ADMIN_PASSWORD</code>) and can be rotated
            anytime inside Security &amp; Account settings.
          </p>
        </div>
      </div>
    </div>
  );
}
