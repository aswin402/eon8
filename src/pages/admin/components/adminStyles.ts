/** Shared class names so the admin screens match the existing Editorial Studio look. */
export const ui = {
  card: 'rounded-2xl border border-border bg-card p-6 shadow-2xs',
  tableCard: 'rounded-2xl border border-border bg-card overflow-hidden shadow-2xs',
  label: 'block text-xs font-extrabold uppercase tracking-wider text-muted-foreground',
  input:
    'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]',
  select:
    'rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]',
  primaryBtn:
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-sm font-heading font-extrabold disabled:opacity-50 cursor-pointer',
  secondaryBtn:
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-[#0053C6] text-sm font-bold text-foreground disabled:opacity-50 cursor-pointer',
  dangerIconBtn: 'p-2 rounded-lg hover:bg-red-500/10 text-red-500 cursor-pointer disabled:opacity-50',
  iconBtn: 'p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50',
  th: 'py-3.5 px-5',
  thead: 'border-b border-border bg-muted/50 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground',
  td: 'py-3.5 px-5 align-top',
  error:
    'rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300 font-medium',
  notice:
    'rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300 font-medium',
  hint: 'text-xs text-muted-foreground leading-relaxed',
} as const;

export const leadStatusStyle: Record<string, string> = {
  new: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  contacted: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  qualified: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  won: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  lost: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
  spam: 'bg-red-500/15 text-red-600 dark:text-red-300',
};
