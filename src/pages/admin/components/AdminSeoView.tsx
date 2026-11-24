import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { ExternalLink, Pencil, Search, Trash2, X } from 'lucide-react';
import { adminFetch, formatDateTime, jsonBody, type PageSeoOverride } from '@/lib/admin/adminApi';
import { ui } from './adminStyles';

const emptyForm = { path: '', title: '', description: '', ogImage: '', canonical: '', noindex: false, schemaJson: '' };

function Counter({ value, ideal, max }: { value: string; ideal: number; max: number }) {
  const n = value.length;
  const tone = n === 0 ? 'text-muted-foreground' : n <= ideal ? 'text-emerald-600 dark:text-emerald-400' : n <= max ? 'text-amber-600' : 'text-red-600';
  return <span className={`text-[11px] font-bold ${tone}`}>{n} / {ideal}</span>;
}

export function AdminSeoView() {
  const [items, setItems] = useState<PageSeoOverride[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems((await adminFetch<{ items: PageSeoOverride[] }>('/api/admin/seo')).items);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return needle ? items.filter((i) => i.path.includes(needle) || (i.title ?? '').toLowerCase().includes(needle)) : items;
  }, [items, q]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await adminFetch('/api/admin/seo', { method: 'PUT', body: jsonBody(form) });
      setNotice('Saved. Search engines and share previews see it on the next visit (allow up to a minute).');
      setForm(emptyForm);
      setEditing(false);
      void load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: PageSeoOverride) => {
    if (!window.confirm(`Remove the SEO override for ${item.path}? The page goes back to its built-in title and description.`)) return;
    try {
      await adminFetch(`/api/admin/seo?path=${encodeURIComponent(item.path)}`, { method: 'DELETE' });
      void load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className={ui.error}>{error}</div>}
      {notice && <div className={ui.notice} role="status">{notice}</div>}

      <form onSubmit={save} className={`${ui.card} grid gap-4 lg:grid-cols-2`}>
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor="seo-path" className={ui.label}>Page path</label>
          <input id="seo-path" className={ui.input} placeholder="/about-us/" value={form.path} readOnly={editing}
            onChange={(e) => setForm({ ...form, path: e.target.value })} required />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between"><label htmlFor="seo-title" className={ui.label}>Title</label><Counter value={form.title} ideal={60} max={70} /></div>
          <input id="seo-title" className={ui.input} value={form.title} maxLength={120} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="seo-og" className={ui.label}>Share image (og:image)</label>
          <input id="seo-og" className={ui.input} placeholder="/wp-content/uploads/…/image.jpg" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} />
        </div>
        <div className="lg:col-span-2 space-y-1.5">
          <div className="flex justify-between"><label htmlFor="seo-desc" className={ui.label}>Meta description</label><Counter value={form.description} ideal={155} max={170} /></div>
          <textarea id="seo-desc" rows={2} className={ui.input} value={form.description} maxLength={320} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="seo-canon" className={ui.label}>Canonical URL (optional)</label>
          <input id="seo-canon" className={ui.input} placeholder="Leave empty to use the page's own URL" value={form.canonical} onChange={(e) => setForm({ ...form, canonical: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm font-bold text-foreground self-end pb-2.5">
          <input type="checkbox" checked={form.noindex} onChange={(e) => setForm({ ...form, noindex: e.target.checked })} />
          Hide from search engines (noindex)
        </label>
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor="seo-schema" className={ui.label}>Structured data JSON-LD (optional)</label>
          <textarea id="seo-schema" rows={4} className={`${ui.input} font-mono text-xs`} placeholder='{"@context":"https://schema.org","@type":"Service", …}'
            value={form.schemaJson} onChange={(e) => setForm({ ...form, schemaJson: e.target.value })} />
          <p className={ui.hint}>
            Overrides are written into the page HTML by the server, so Google and social previews see them without running JavaScript.
          </p>
        </div>
        <div className="lg:col-span-2 flex gap-2">
          <button type="submit" disabled={busy} className={ui.primaryBtn}>{editing ? 'Update override' : 'Save override'}</button>
          {editing && (
            <button type="button" className={ui.secondaryBtn} onClick={() => { setForm(emptyForm); setEditing(false); }}>
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </form>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
        <input aria-label="Search SEO overrides" className={`${ui.input} pl-9`} placeholder="Search path or title" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className={ui.tableCard}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={ui.thead}>
                <th className={ui.th}>Path</th>
                <th className={ui.th}>Title / description</th>
                <th className={ui.th}>Flags</th>
                <th className={ui.th}>Updated</th>
                <th className={`${ui.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-12 text-center text-muted-foreground">No SEO overrides yet. Pages use their built-in titles.</td></tr>
              )}
              {filtered.map((item) => (
                <tr key={item.path} className="hover:bg-muted/35">
                  <td className={`${ui.td} font-mono text-xs break-all`}>{item.path}</td>
                  <td className={ui.td}>
                    <p className="font-semibold text-foreground">{item.title || <span className="text-muted-foreground">(built-in title)</span>}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </td>
                  <td className={`${ui.td} text-xs space-x-1`}>
                    {item.noindex && <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 font-bold">noindex</span>}
                    {item.schemaJson ? <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-700 font-bold">schema</span> : null}
                    {item.ogImage && <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 font-bold">image</span>}
                  </td>
                  <td className={`${ui.td} text-xs text-muted-foreground whitespace-nowrap`}>{formatDateTime(item.updatedAt)}</td>
                  <td className={`${ui.td} text-right whitespace-nowrap`}>
                    <a href={item.path} target="_blank" rel="noopener noreferrer" className={ui.iconBtn} title="Open page">
                      <ExternalLink className="w-4 h-4 inline" />
                    </a>
                    <button type="button" className={ui.iconBtn} title="Edit" onClick={() => {
                      setEditing(true);
                      setForm({
                        path: item.path,
                        title: item.title ?? '',
                        description: item.description ?? '',
                        ogImage: item.ogImage ?? '',
                        canonical: item.canonical ?? '',
                        noindex: item.noindex,
                        schemaJson: item.schemaJson ? JSON.stringify(item.schemaJson, null, 2) : '',
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button type="button" className={ui.dangerIconBtn} title="Remove override" onClick={() => void remove(item)}>
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
