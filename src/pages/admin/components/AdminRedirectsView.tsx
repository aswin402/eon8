import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ExternalLink, Pencil, Search, Trash2, Upload, X } from 'lucide-react';
import { adminFetch, formatDateTime, jsonBody, type RedirectRule } from '@/lib/admin/adminApi';
import { ui } from './adminStyles';

const CODES = [
  { value: 301, label: '301 Permanent' },
  { value: 302, label: '302 Temporary' },
  { value: 307, label: '307 Temporary (keep method)' },
  { value: 308, label: '308 Permanent (keep method)' },
  { value: 410, label: '410 Gone (removed page)' },
];

const emptyForm = { sourcePath: '', target: '', statusCode: 301, isActive: true, note: '' };

interface ImportResult {
  created: number;
  updated: number;
  skippedCount: number;
  skipped: Array<{ line: number; reason: string }>;
}

export function AdminRedirectsView() {
  const [items, setItems] = useState<RedirectRule[]>([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [overwrite, setOverwrite] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await adminFetch<{ items: RedirectRule[] }>(`/api/admin/redirects${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      setItems(res.items);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [q]);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(t);
  }, [load]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await adminFetch(editingId ? `/api/admin/redirects/${editingId}` : '/api/admin/redirects', {
        method: editingId ? 'PUT' : 'POST',
        body: jsonBody(form),
      });
      setNotice(editingId ? 'Redirect updated.' : 'Redirect added. It is live immediately.');
      setForm(emptyForm);
      setEditingId(null);
      void load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (r: RedirectRule) => {
    try {
      await adminFetch(`/api/admin/redirects/${r.id}`, {
        method: 'PUT',
        body: jsonBody({ sourcePath: r.sourcePath, target: r.target, statusCode: r.statusCode, isActive: !r.isActive, note: r.note }),
      });
      void load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const remove = async (r: RedirectRule) => {
    if (!window.confirm(`Delete the redirect from ${r.sourcePath}?`)) return;
    try {
      await adminFetch(`/api/admin/redirects/${r.id}`, { method: 'DELETE' });
      void load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const importCsv = async (file: File) => {
    setError('');
    setImportResult(null);
    try {
      const res = await adminFetch<ImportResult>('/api/admin/redirects/import', {
        method: 'POST',
        body: jsonBody({ csv: await file.text(), overwrite }),
      });
      setImportResult(res);
      void load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className={ui.error}>{error}</div>}
      {notice && <div className={ui.notice} role="status">{notice}</div>}

      <form onSubmit={save} className={`${ui.card} grid gap-4 lg:grid-cols-12 items-end`}>
        <div className="lg:col-span-4 space-y-1.5">
          <label htmlFor="rd-source" className={ui.label}>Old path</label>
          <input id="rd-source" className={ui.input} placeholder="/old-page/" value={form.sourcePath}
            onChange={(e) => setForm({ ...form, sourcePath: e.target.value })} required />
        </div>
        <div className="lg:col-span-4 space-y-1.5">
          <label htmlFor="rd-target" className={ui.label}>Redirect to</label>
          <input id="rd-target" className={ui.input} placeholder="/new-page/ or https://…" value={form.target}
            disabled={form.statusCode === 410} onChange={(e) => setForm({ ...form, target: e.target.value })} />
        </div>
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor="rd-code" className={ui.label}>Type</label>
          <select id="rd-code" className={`${ui.select} w-full`} value={form.statusCode}
            onChange={(e) => setForm({ ...form, statusCode: Number(e.target.value) })}>
            {CODES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="lg:col-span-2 flex gap-2">
          <button type="submit" disabled={busy} className={`${ui.primaryBtn} flex-1`}>{editingId ? 'Update' : 'Add'}</button>
          {editingId && (
            <button type="button" className={ui.iconBtn} title="Cancel editing" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="lg:col-span-12 space-y-1.5">
          <label htmlFor="rd-note" className={ui.label}>Note (optional)</label>
          <input id="rd-note" className={ui.input} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <p className={ui.hint}>
            Paths are matched without the trailing slash and ignore upper/lower case. Query strings are passed on.
            Use 301 for pages that moved for good; 410 tells Google a page was removed.
          </p>
        </div>
      </form>

      <div className={`${ui.card} flex flex-wrap items-center gap-4 justify-between`}>
        <div>
          <p className="text-sm font-heading font-extrabold text-foreground">Import from CSV</p>
          <p className={ui.hint}>
            Works with the Rank Math redirections export (columns source, destination, type). Only exact matches are imported.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-xs font-bold text-foreground">
            <input type="checkbox" checked={overwrite} onChange={(e) => setOverwrite(e.target.checked)} />
            Overwrite existing
          </label>
          <button type="button" className={ui.secondaryBtn} onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4" /> Choose CSV
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden"
            onChange={(e) => e.target.files?.[0] && void importCsv(e.target.files[0])} />
        </div>
        {importResult && (
          <div className="w-full text-sm space-y-1">
            <p className="font-bold text-foreground">
              Added {importResult.created}, updated {importResult.updated}, skipped {importResult.skippedCount}.
            </p>
            {importResult.skipped.length > 0 && (
              <ul className="max-h-40 overflow-y-auto text-xs text-muted-foreground list-disc pl-5">
                {importResult.skipped.map((s, i) => <li key={i}>Line {s.line}: {s.reason}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
        <input aria-label="Search redirects" className={`${ui.input} pl-9`} placeholder="Search paths" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className={ui.tableCard}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={ui.thead}>
                <th className={ui.th}>Old path</th>
                <th className={ui.th}>Redirects to</th>
                <th className={ui.th}>Type</th>
                <th className={ui.th}>Hits</th>
                <th className={ui.th}>Active</th>
                <th className={`${ui.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {items.length === 0 && (
                <tr><td colSpan={6} className="p-12 text-center text-muted-foreground">No redirects yet.</td></tr>
              )}
              {items.map((r) => (
                <tr key={r.id} className={`hover:bg-muted/35 ${r.isActive ? '' : 'opacity-60'}`}>
                  <td className={`${ui.td} font-mono text-xs break-all`}>{r.sourcePath}</td>
                  <td className={`${ui.td} font-mono text-xs break-all`}>{r.statusCode === 410 ? '— (gone)' : r.target}</td>
                  <td className={`${ui.td} text-xs font-bold`}>{r.statusCode}</td>
                  <td className={`${ui.td} text-xs`} title={`Last hit ${formatDateTime(r.lastHitAt)}`}>{r.hits}</td>
                  <td className={ui.td}>
                    <input type="checkbox" aria-label={`Redirect ${r.sourcePath} active`} checked={r.isActive} onChange={() => void toggle(r)} />
                  </td>
                  <td className={`${ui.td} text-right whitespace-nowrap`}>
                    <a href={r.sourcePath} target="_blank" rel="noopener noreferrer" className={ui.iconBtn} title="Test this redirect">
                      <ExternalLink className="w-4 h-4 inline" />
                    </a>
                    <button type="button" className={ui.iconBtn} title="Edit" onClick={() => {
                      setEditingId(r.id);
                      setForm({ sourcePath: r.sourcePath, target: r.target, statusCode: r.statusCode, isActive: r.isActive, note: r.note ?? '' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button type="button" className={ui.dangerIconBtn} title="Delete" onClick={() => void remove(r)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
