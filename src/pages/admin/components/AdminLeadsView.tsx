import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Download, Mail, RefreshCw, Search, Trash2, Upload } from 'lucide-react';
import {
  LEAD_STATUSES,
  adminFetch,
  formatDateTime,
  jsonBody,
  type Lead,
  type LeadList,
  type LeadStatus,
} from '@/lib/admin/adminApi';
import { leadStatusStyle, ui } from './adminStyles';

interface Props {
  isAdmin: boolean;
}

const emailBadge: Record<Lead['emailStatus'], string> = {
  sent: 'text-emerald-600 dark:text-emerald-400',
  pending: 'text-sky-600 dark:text-sky-400',
  skipped: 'text-amber-600 dark:text-amber-400',
  failed: 'text-red-600 dark:text-red-400',
};

export function AdminLeadsView({ isAdmin }: Props) {
  const [data, setData] = useState<LeadList | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<number | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<number, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const query = useCallback(
    (extra: Record<string, string> = {}) => {
      const p = new URLSearchParams({ q, status, source, from, to, ...extra });
      for (const [k, v] of [...p.entries()]) if (!v) p.delete(k);
      return p.toString();
    },
    [q, status, source, from, to]
  );

  // Only the newest request may update the list, so a slow older search
  // cannot overwrite the results of a newer one.
  const requestSeq = useRef(0);
  const load = useCallback(async () => {
    const seq = ++requestSeq.current;
    setLoading(true);
    setError('');
    try {
      const result = await adminFetch<LeadList>(`/api/admin/leads?${query({ page: String(page), pageSize: '25' })}`);
      if (seq === requestSeq.current) setData(result);
    } catch (err) {
      if (seq === requestSeq.current) setError((err as Error).message);
    } finally {
      if (seq === requestSeq.current) setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(t);
  }, [load]);

  const replaceLead = (lead: Lead) =>
    setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === lead.id ? lead : x)) } : d));

  const update = async (id: number, patch: { status?: LeadStatus; notes?: string }) => {
    setError('');
    try {
      const res = await adminFetch<{ lead: Lead }>(`/api/admin/leads/${id}`, { method: 'PATCH', body: jsonBody(patch) });
      replaceLead(res.lead);
      if (patch.notes !== undefined) setNotice('Notes saved.');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const resend = async (id: number) => {
    setError('');
    try {
      const res = await adminFetch<{ lead: Lead }>(`/api/admin/leads/${id}/resend`, { method: 'POST', body: '{}' });
      replaceLead(res.lead);
      setNotice(res.lead.emailStatus === 'sent' ? 'Notification email sent.' : `Email ${res.lead.emailStatus}: ${res.lead.emailError ?? ''}`);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const remove = async (lead: Lead) => {
    if (!window.confirm(`Permanently delete the lead from ${lead.name || lead.email || lead.phone}? This cannot be undone.`)) return;
    try {
      await adminFetch(`/api/admin/leads/${lead.id}`, { method: 'DELETE' });
      setNotice('Lead deleted.');
      void load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const importCsv = async (file: File) => {
    setError('');
    try {
      const csv = await file.text();
      const res = await adminFetch<{ imported: number; skipped: number }>('/api/admin/leads/import', {
        method: 'POST',
        body: jsonBody({ csv }),
      });
      setNotice(`Imported ${res.imported} leads${res.skipped ? `, skipped ${res.skipped} rows without email or phone` : ''}.`);
      void load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="space-y-6">
      {error && <div className={ui.error}>{error}</div>}
      {notice && (
        <div className={ui.notice} role="status">
          {notice}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {(['', ...LEAD_STATUSES] as const).map((s) => (
          <button
            key={s || 'open'}
            type="button"
            onClick={() => {
              setStatus(s);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer ${
              status === s ? 'border-[#0053C6] bg-[#0053C6] text-white' : 'border-border bg-card text-foreground'
            }`}
          >
            {s ? `${s[0].toUpperCase()}${s.slice(1)}` : 'All except spam'}
            {s && data?.counts[s] ? ` · ${data.counts[s]}` : ''}
          </button>
        ))}
      </div>

      <div className={`${ui.card} grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end`}>
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor="lead-search" className={ui.label}>Search</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              id="lead-search"
              className={`${ui.input} pl-9`}
              placeholder="Name, email, phone or message"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-source" className={ui.label}>Form</label>
          <select id="lead-source" className={`${ui.select} w-full`} value={source} onChange={(e) => { setSource(e.target.value); setPage(1); }}>
            <option value="">All forms</option>
            {data?.sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-from" className={ui.label}>From</label>
          <input id="lead-from" type="date" className={ui.input} value={from} onChange={(e) => { setFrom(e.target.value); setPage(1); }} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-to" className={ui.label}>To</label>
          <input id="lead-to" type="date" className={ui.input} value={to} onChange={(e) => { setTo(e.target.value); setPage(1); }} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Loading…' : `${data?.total ?? 0} leads`}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={ui.secondaryBtn} onClick={() => void load()}>
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          {isAdmin && (
            <>
              <a className={`${ui.secondaryBtn} no-underline`} href={`/api/admin/leads/export.csv?${query()}`}>
                <Download className="w-4 h-4" /> Export CSV
              </a>
              <button type="button" className={ui.secondaryBtn} onClick={() => fileRef.current?.click()}>
                <Upload className="w-4 h-4" /> Import CSV
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && void importCsv(e.target.files[0])}
              />
            </>
          )}
        </div>
      </div>

      <div className={ui.tableCard}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={ui.thead}>
                <th className={ui.th}>Received</th>
                <th className={ui.th}>Contact</th>
                <th className={ui.th}>Form</th>
                <th className={ui.th}>Status</th>
                <th className={ui.th}>Email alert</th>
                <th className={`${ui.th} text-right`}>Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {data?.items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground">
                    No leads match these filters.
                  </td>
                </tr>
              )}
              {data?.items.map((lead) => {
                const open = openId === lead.id;
                return (
                  <Fragment key={lead.id}>
                    <tr className="hover:bg-muted/35">
                      <td className={`${ui.td} whitespace-nowrap text-xs text-muted-foreground`}>{formatDateTime(lead.createdAt)}</td>
                      <td className={ui.td}>
                        <p className="font-semibold text-foreground">{lead.name || '—'}</p>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="block text-xs text-[#0053C6] dark:text-sky-400">{lead.email}</a>
                        )}
                        {lead.phone && (
                          <a href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`} className="block text-xs text-muted-foreground">{lead.phone}</a>
                        )}
                      </td>
                      <td className={`${ui.td} text-xs`}>{lead.source}</td>
                      <td className={ui.td}>
                        <select
                          aria-label="Lead status"
                          value={lead.status}
                          onChange={(e) => void update(lead.id, { status: e.target.value as LeadStatus })}
                          className={`rounded-lg px-2 py-1 text-xs font-bold border-0 cursor-pointer ${leadStatusStyle[lead.status]}`}
                        >
                          {LEAD_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className={`${ui.td} text-xs font-bold ${emailBadge[lead.emailStatus]}`} title={lead.emailError ?? ''}>
                        {lead.emailStatus}
                      </td>
                      <td className={`${ui.td} text-right`}>
                        <button type="button" className={ui.iconBtn} aria-expanded={open} onClick={() => setOpenId(open ? null : lead.id)} title="Show details">
                          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                    {open && (
                      <tr className="bg-muted/25">
                        <td colSpan={6} className="px-5 py-5">
                          <div className="grid gap-5 lg:grid-cols-2">
                            <div className="space-y-2 text-sm">
                              <p className="whitespace-pre-wrap text-foreground">{lead.message || <span className="text-muted-foreground">No message.</span>}</p>
                              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                {lead.country && (<><dt className="font-bold">Location</dt><dd>{lead.country}</dd></>)}
                                {lead.website && (<><dt className="font-bold">Website</dt><dd className="break-all">{lead.website}</dd></>)}
                                {lead.preferredSlot && (<><dt className="font-bold">Preferred slot</dt><dd>{lead.preferredSlot}</dd></>)}
                                {lead.pageUrl && (<><dt className="font-bold">Page</dt><dd className="break-all">{lead.pageUrl}</dd></>)}
                                {lead.utm && (<><dt className="font-bold">Campaign</dt><dd className="break-all">{Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(', ')}</dd></>)}
                                {lead.emailError && (<><dt className="font-bold">Email note</dt><dd>{lead.emailError}</dd></>)}
                              </dl>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`notes-${lead.id}`} className={ui.label}>Internal notes</label>
                              <textarea
                                id={`notes-${lead.id}`}
                                rows={4}
                                className={ui.input}
                                value={notesDraft[lead.id] ?? lead.notes ?? ''}
                                onChange={(e) => setNotesDraft((d) => ({ ...d, [lead.id]: e.target.value }))}
                              />
                              <div className="flex flex-wrap gap-2">
                                <button type="button" className={ui.primaryBtn} onClick={() => void update(lead.id, { notes: notesDraft[lead.id] ?? lead.notes ?? '' })}>
                                  Save notes
                                </button>
                                <button type="button" className={ui.secondaryBtn} onClick={() => void resend(lead.id)}>
                                  <Mail className="w-4 h-4" /> Resend email alert
                                </button>
                                {isAdmin && (
                                  <button type="button" className={`${ui.secondaryBtn} text-red-600`} onClick={() => void remove(lead)}>
                                    <Trash2 className="w-4 h-4" /> Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 text-sm">
          <button type="button" className={ui.secondaryBtn} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span className="text-muted-foreground">Page {page} of {totalPages}</span>
          <button type="button" className={ui.secondaryBtn} disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

