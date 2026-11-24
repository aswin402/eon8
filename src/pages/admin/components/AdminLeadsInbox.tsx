import { useCallback, useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Globe,
  Inbox,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Save,
  Search,
  Trash2,
} from 'lucide-react';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'archived';

export interface AdminLeadRecord {
  id: string;
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  website?: string;
  message?: string;
  preferredSlot?: string;
  pageUrl?: string;
  status: LeadStatus;
  notes?: string;
  webhookForwarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatusCounts = Record<LeadStatus | 'total', number>;

const TOKEN_STORAGE_KEY = 'eon8_cms_bearer_token';

const STATUS_OPTIONS: Array<{ value: LeadStatus; label: string; badgeCls: string }> = [
  {
    value: 'new',
    label: 'New',
    badgeCls: 'bg-[#FD5900]/15 text-[#FD5900] border-[#FD5900]/30',
  },
  {
    value: 'contacted',
    label: 'Contacted',
    badgeCls: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30',
  },
  {
    value: 'qualified',
    label: 'Qualified',
    badgeCls: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
  },
  {
    value: 'won',
    label: 'Won',
    badgeCls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
  },
  {
    value: 'archived',
    label: 'Archived',
    badgeCls: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
  },
];

function buildAuthHeaders(extra?: Record<string, string>): Headers {
  const headers = new Headers(extra);
  try {
    const token = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) headers.set('Authorization', `Bearer ${token}`);
  } catch {
    // Ignore storage errors
  }
  return headers;
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

interface AdminLeadsInboxProps {
  onCountsChange?: (counts: LeadStatusCounts) => void;
}

export function AdminLeadsInbox({ onCountsChange }: AdminLeadsInboxProps) {
  const [leads, setLeads] = useState<AdminLeadRecord[]>([]);
  const [counts, setCounts] = useState<LeadStatusCounts>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    archived: 0,
  });
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      const qs = params.toString();
      const res = await fetch(`/api/leads/admin${qs ? `?${qs}` : ''}`, {
        credentials: 'include',
        headers: buildAuthHeaders(),
      });
      const data = (await res.json()) as {
        leads?: AdminLeadRecord[];
        counts?: LeadStatusCounts;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || `Failed to load leads (${res.status})`);
      }
      const nextLeads = data.leads || [];
      setLeads(nextLeads);
      if (data.counts) {
        setCounts(data.counts);
        onCountsChange?.(data.counts);
      }
      setNotesDraft((prev) => {
        const merged = { ...prev };
        for (const lead of nextLeads) {
          if (merged[lead.id] === undefined) {
            merged[lead.id] = lead.notes || '';
          }
        }
        return merged;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load leads inbox.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery, onCountsChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadLeads();
    }, 120);
    return () => clearTimeout(timer);
  }, [loadLeads]);

  const handleStatusChange = async (lead: AdminLeadRecord, nextStatus: LeadStatus) => {
    setBusyId(lead.id);
    try {
      const res = await fetch(`/api/leads/admin/${encodeURIComponent(lead.id)}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: buildAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = (await res.json()) as {
        lead?: AdminLeadRecord;
        counts?: LeadStatusCounts;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || 'Failed to update lead status');
      if (data.lead) {
        setLeads((prev) =>
          prev
            .map((l) => (l.id === lead.id ? data.lead! : l))
            .filter((l) => statusFilter === 'all' || l.status === statusFilter)
        );
      }
      if (data.counts) {
        setCounts(data.counts);
        onCountsChange?.(data.counts);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setBusyId(null);
    }
  };

  const handleSaveNotes = async (lead: AdminLeadRecord) => {
    setBusyId(lead.id);
    try {
      const res = await fetch(`/api/leads/admin/${encodeURIComponent(lead.id)}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: buildAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ notes: notesDraft[lead.id] ?? '' }),
      });
      const data = (await res.json()) as { lead?: AdminLeadRecord; error?: string };
      if (!res.ok) throw new Error(data.error || 'Failed to save notes');
      if (data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === lead.id ? data.lead! : l)));
      }
      setSavedNoteId(lead.id);
      setTimeout(() => setSavedNoteId((cur) => (cur === lead.id ? null : cur)), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (lead: AdminLeadRecord) => {
    if (!window.confirm(`Delete enquiry from ${lead.name || lead.email || lead.phone || 'visitor'}?`)) {
      return;
    }
    setBusyId(lead.id);
    try {
      const res = await fetch(`/api/leads/admin/${encodeURIComponent(lead.id)}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: buildAuthHeaders(),
      });
      const data = (await res.json()) as { counts?: LeadStatusCounts; error?: string };
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      if (data.counts) {
        setCounts(data.counts);
        onCountsChange?.(data.counts);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  const handleExportCsv = async () => {
    try {
      const query = statusFilter !== 'all' ? `?status=${encodeURIComponent(statusFilter)}` : '';
      const res = await fetch(`/api/leads/admin/export.csv${query}`, {
        credentials: 'include',
        headers: buildAuthHeaders(),
      });
      if (!res.ok) throw new Error(`Export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eon8-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'CSV export failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Total Leads
          </p>
          <p className="text-2xl font-heading font-extrabold text-foreground mt-1">
            {counts.total}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            New / Unread
          </p>
          <p className="text-2xl font-heading font-extrabold text-[#FD5900] mt-1">
            {counts.new}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Contacted
          </p>
          <p className="text-2xl font-heading font-extrabold text-sky-600 dark:text-sky-400 mt-1">
            {counts.contacted}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Qualified
          </p>
          <p className="text-2xl font-heading font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {counts.qualified}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Won Deals
          </p>
          <p className="text-2xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {counts.won}
          </p>
        </div>
      </div>

      {/* Filter & Export Bar */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0053C6] text-white border-[#0053C6]'
                : 'bg-background text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            All ({counts.total})
          </button>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                statusFilter === opt.value
                  ? 'bg-[#FD5900] text-white border-[#FD5900]'
                  : 'bg-background text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {opt.label} ({counts[opt.value]})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Search name, email, phone, source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0053C6]"
            />
          </div>

          <button
            type="button"
            onClick={() => void loadLeads()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background hover:border-[#0053C6] text-xs font-bold text-foreground cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => void handleExportCsv()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {/* Leads List */}
      {loading && leads.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
          Loading incoming enquiries…
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0053C6]/10 text-[#0053C6] dark:text-sky-400 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-heading font-extrabold text-foreground">
            No enquiries match this filter yet
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Every contact form, callback request, discovery call, floating drawer, and ChatGPT Ads
            audit submitted across the website automatically arrives here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const statusMeta =
              STATUS_OPTIONS.find((s) => s.value === lead.status) || STATUS_OPTIONS[0];
            const cleanDigits = (lead.phone || '').replace(/\D/g, '');
            const waUrl = cleanDigits
              ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(
                  `Hi ${lead.name || 'there'}, following up on your enquiry with EON8 regarding ${lead.source}.`
                )}`
              : null;

            return (
              <article
                key={lead.id}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${statusMeta.badgeCls}`}
                      >
                        {statusMeta.label}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-muted text-muted-foreground">
                        {lead.source}
                      </span>
                      {lead.webhookForwarded && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Webhook Sent
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-heading font-extrabold text-foreground">
                      {lead.name || lead.email || lead.phone || 'Anonymous Enquiry'}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDateTime(lead.createdAt)}
                      </span>
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-1 font-semibold text-[#0053C6] dark:text-sky-400 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-[#FD5900]"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {lead.phone}
                        </a>
                      )}
                      {lead.country && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {lead.country}
                        </span>
                      )}
                      {lead.website && (
                        <span className="inline-flex items-center gap-1 break-all">
                          <Globe className="w-3.5 h-3.5" />
                          {lead.website}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions & Status Selector */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <select
                      aria-label="Lead status"
                      disabled={busyId === lead.id}
                      value={lead.status}
                      onChange={(e) =>
                        void handleStatusChange(lead, e.target.value as LeadStatus)
                      }
                      className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground focus:outline-none focus:border-[#0053C6] cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    <button
                      type="button"
                      disabled={busyId === lead.id}
                      onClick={() => void handleDelete(lead)}
                      aria-label="Delete lead"
                      className="p-2 rounded-xl border border-red-500/25 text-red-500 hover:bg-red-500/10 cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {(lead.preferredSlot || lead.message || lead.pageUrl) && (
                  <div className="rounded-xl bg-muted/50 border border-border/60 p-3.5 space-y-2 text-xs sm:text-sm">
                    {lead.preferredSlot && (
                      <p className="font-semibold text-foreground">
                        Preferred Slot:{' '}
                        <span className="text-[#FD5900]">{lead.preferredSlot}</span>
                      </p>
                    )}
                    {lead.message && (
                      <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {lead.message}
                      </p>
                    )}
                    {lead.pageUrl && (
                      <p className="text-[11px] text-muted-foreground break-all flex items-center gap-1.5">
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span>Page: {lead.pageUrl}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Internal Sales Notes */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                  <input
                    type="text"
                    placeholder="Add internal sales notes (owner, budget, follow-up date)..."
                    value={notesDraft[lead.id] ?? lead.notes ?? ''}
                    onChange={(e) =>
                      setNotesDraft((prev) => ({ ...prev, [lead.id]: e.target.value }))
                    }
                    className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0053C6]"
                  />
                  <button
                    type="button"
                    disabled={busyId === lead.id}
                    onClick={() => void handleSaveNotes(lead)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0053C6] hover:bg-[#0044a3] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savedNoteId === lead.id ? 'Saved!' : 'Save Note'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
