import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, ExternalLink, FilePlus2, History, Pencil, RotateCcw, Save, Search, Trash2, X } from 'lucide-react';
import { formatDateTime } from '@/lib/admin/adminApi';
import { pagesAdminApi, type AdminPageRow, type PageRevision } from '@/lib/admin/pagesAdminApi';
import { slugifyText } from '@/lib/cms/richTextCodec';
import { BUILT_IN_PAGES, CODE_ONLY_PAGES, TEMPLATE_LABELS, type PageTemplate } from '@/lib/pages/registry';
import { AdminMediaLibrary } from './AdminMediaModal';
import { PageFieldsEditor } from './AdminFieldEditor';
import { ui } from './adminStyles';

type JsonObject = Record<string, unknown>;

interface PageEntry {
  key: string;
  path: string;
  template: PageTemplate;
  group: string;
  label: string;
  aliases?: string[];
  builtIn: boolean;
  row?: AdminPageRow;
}

type StatusFilter = 'all' | 'edited' | 'original' | 'draft' | 'new';

const GROUPS = ['Services', 'Packages', 'Landing pages', 'Crypto', 'NFT & Discord', 'Influencer', 'Policies', 'New pages'];

function statusBadge(entry: PageEntry) {
  const row = entry.row;
  if (!row) return { text: 'Original', cls: 'bg-slate-500/10 text-slate-600 dark:text-slate-300' };
  if (row.kind === 'custom') {
    return row.status === 'published'
      ? { text: 'New · Published', cls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' }
      : { text: 'New · Draft', cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' };
  }
  return row.status === 'published'
    ? { text: 'Edited · Published', cls: 'bg-sky-500/15 text-sky-700 dark:text-sky-300' }
    : { text: 'Edited · Draft', cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' };
}

const newLandingPage = (slug: string, title: string): JsonObject => ({
  slug,
  theme: 'brand',
  title: `${title} | EON8`,
  metaDesc: '',
  hero: {
    badge: 'EON8 Digital Excellence',
    heading: title,
    subheading: '',
    paragraphs: [['Describe the service in one or two sentences.']],
    bullets: ['First benefit', 'Second benefit'],
    actions: [{ label: 'Get a free proposal', opensModal: true, variant: 'primary' }],
    layout: 'split-form',
    mediaSrc: '',
    mediaAlt: '',
    formHeading: 'Request Free Quote',
    formSubmitLabel: 'Get My Free Proposal',
  },
  sections: [
    { type: 'feature-grid', heading: 'What we offer', subheading: '', columns: 3, cards: [{ title: 'Card title', description: 'Short description.' }] },
    { type: 'faq', heading: 'Frequently Asked Questions', faqs: [{ question: 'Question?', answerParagraphs: [['Answer.']] }] },
  ],
  disclaimer: '',
});

const newSimplePage = (title: string): JsonObject => ({
  title: `${title} | EON8`,
  metaDesc: '',
  noIndex: false,
  heroBadge: '',
  heroHeading: title,
  heroSubheading: '',
  heroImage: '',
  blocks: [{ type: 'paragraph', content: ['Start writing here.'] }],
});

// ---------------------------------------------------------------------------

function NewPageDialog({ onClose, onCreated }: { onClose: () => void; onCreated: (entry: PageEntry) => void }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [template, setTemplate] = useState<'service' | 'content'>('service');
  const [copyFrom, setCopyFrom] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const landingPages = useMemo(() => BUILT_IN_PAGES.filter((p) => p.template === 'service'), []);
  const finalSlug = slugTouched ? slugifyText(slug) : slugifyText(title);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !finalSlug) {
      setError('Enter a page title.');
      return;
    }
    setBusy(true);
    try {
      let data: JsonObject;
      if (template === 'service' && copyFrom) {
        const source = landingPages.find((p) => p.key === copyFrom);
        const saved = source ? await pagesAdminApi.get(source.key) : null;
        data = JSON.parse(JSON.stringify(saved?.data ?? (await source!.load()))) as JsonObject;
        data.slug = finalSlug;
        data.title = `${title.trim()} | EON8`;
        if (data.hero && typeof data.hero === 'object') (data.hero as JsonObject).heading = title.trim();
      } else {
        data = template === 'service' ? newLandingPage(finalSlug, title.trim()) : newSimplePage(title.trim());
      }
      const key = `${template}:${finalSlug}`;
      const row = await pagesAdminApi.save({ key, kind: 'custom', title: title.trim(), status: 'draft', data });
      onCreated({ key, path: row.path, template, group: 'New pages', label: row.title, builtIn: false, row });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="new-page-title">
      <form onSubmit={submit} className={`${ui.card} w-full max-w-lg space-y-4`}>
        <div className="flex items-center justify-between">
          <h2 id="new-page-title" className="text-lg font-heading font-extrabold text-foreground">New page</h2>
          <button type="button" className={ui.iconBtn} onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        {error && <div className={ui.error}>{error}</div>}
        <div className="space-y-1.5">
          <label htmlFor="np-title" className={ui.label}>Page title</label>
          <input id="np-title" className={ui.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="SEO Services in Hyderabad" autoFocus />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="np-slug" className={ui.label}>Page address</label>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>eon8.com/</span>
            <input
              id="np-slug"
              className={ui.input}
              value={slugTouched ? slug : finalSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
            />
            <span>/</span>
          </div>
        </div>
        <fieldset className="space-y-2">
          <legend className={ui.label}>Layout</legend>
          {([
            ['service', 'Landing page', 'Hero with enquiry form, then sections you choose: cards, text + image, process, FAQ, pricing, logos…'],
            ['content', 'Simple page', 'A heading and free text with images, lists and buttons, like a blog post.'],
          ] as const).map(([value, label, hint]) => (
            <label key={value} className={`flex gap-3 rounded-xl border p-3 cursor-pointer ${template === value ? 'border-[#FD5900] bg-[#FD5900]/5' : 'border-border'}`}>
              <input type="radio" name="np-template" checked={template === value} onChange={() => setTemplate(value)} className="mt-1 accent-[#FD5900]" />
              <span>
                <span className="block text-sm font-bold text-foreground">{label}</span>
                <span className={ui.hint}>{hint}</span>
              </span>
            </label>
          ))}
        </fieldset>
        {template === 'service' && (
          <div className="space-y-1.5">
            <label htmlFor="np-copy" className={ui.label}>Start from</label>
            <select id="np-copy" className={`${ui.select} w-full`} value={copyFrom} onChange={(e) => setCopyFrom(e.target.value)}>
              <option value="">A blank landing page</option>
              {landingPages.map((p) => (
                <option key={p.key} value={p.key}>
                  Copy of {p.label} ({p.path})
                </option>
              ))}
            </select>
          </div>
        )}
        <p className={ui.hint}>The page is created as a draft. Publish it from the editor when it is ready.</p>
        <div className="flex justify-end gap-2">
          <button type="button" className={ui.secondaryBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={ui.primaryBtn} disabled={busy}>
            <FilePlus2 className="w-4 h-4" /> {busy ? 'Creating…' : 'Create page'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------

function PageEditor({ entry, onClose, onSaved }: { entry: PageEntry; onClose: () => void; onSaved: () => void }) {
  const [data, setData] = useState<JsonObject | null>(null);
  const [row, setRow] = useState<AdminPageRow | null>(entry.row ?? null);
  const [title, setTitle] = useState(entry.row?.title || entry.label);
  const [status, setStatus] = useState<'published' | 'draft'>(entry.row?.status ?? 'published');
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [picker, setPicker] = useState<((url: string) => void) | null>(null);
  const [revisions, setRevisions] = useState<PageRevision[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const saved = await pagesAdminApi.get(entry.key);
        const builtIn = BUILT_IN_PAGES.find((p) => p.key === entry.key);
        const content = saved?.data ?? (builtIn ? await builtIn.load() : null);
        if (cancelled) return;
        if (!content) throw new Error('This page could not be loaded.');
        setRow(saved);
        if (saved) {
          setTitle(saved.title);
          setStatus(saved.status);
        }
        setData(JSON.parse(JSON.stringify(content)) as JsonObject);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [entry.key]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const isCustom = entry.row?.kind === 'custom' || !entry.builtIn;

  const save = async (nextStatus = status) => {
    if (!data) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const saved = await pagesAdminApi.save({
        key: entry.key,
        path: entry.path,
        kind: isCustom ? 'custom' : 'override',
        title: title.trim() || entry.label,
        status: nextStatus,
        data,
      });
      setRow(saved);
      setStatus(saved.status);
      setDirty(false);
      setNotice(
        saved.status === 'published'
          ? 'Saved and published. Visitors see the change on their next page load (allow up to a minute).'
          : isCustom
            ? 'Saved as a draft. The page is not visible on the website yet.'
            : 'Saved as a draft. The website keeps showing the current version until you publish.'
      );
      onSaved();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const resetOrDelete = async () => {
    const msg = isCustom
      ? `Delete the page ${entry.path}? It disappears from the website. Its last version stays in History.`
      : `Put ${entry.path} back to its original content? Your edits stay in History.`;
    if (!window.confirm(msg)) return;
    setBusy(true);
    try {
      await pagesAdminApi.remove(entry.key);
      onSaved();
      onClose();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  const showHistory = async () => {
    try {
      setRevisions(await pagesAdminApi.revisions(entry.key));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const loadRevision = async (id: number) => {
    try {
      const rev = await pagesAdminApi.revision(id);
      setData(rev.data);
      setTitle(rev.title || title);
      setDirty(true);
      setRevisions(null);
      setNotice('Old version loaded into the editor. Save to use it.');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const close = () => {
    if (dirty && !window.confirm('You have unsaved changes. Leave without saving?')) return;
    onClose();
  };

  return (
    <div className="space-y-5">
      <div className={`${ui.card} !p-4 flex flex-wrap items-center gap-3 sticky top-2 z-20`}>
        <button type="button" className={ui.secondaryBtn} onClick={close}>
          <ArrowLeft className="w-4 h-4" /> All pages
        </button>
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-heading font-extrabold text-foreground truncate">{title || entry.label}</p>
          <p className="text-xs text-muted-foreground truncate">
            {entry.path} · {TEMPLATE_LABELS[entry.template]}
            {entry.aliases?.length ? ` · also shown at ${entry.aliases.join(', ')}` : ''}
          </p>
        </div>
        <select className={ui.select} value={status} onChange={(e) => { setStatus(e.target.value as 'published' | 'draft'); setDirty(true); }} aria-label="Status">
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <a href={entry.path} target="_blank" rel="noopener noreferrer" className={`${ui.secondaryBtn} no-underline`}>
          View <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button type="button" className={ui.secondaryBtn} onClick={() => void showHistory()}>
          <History className="w-4 h-4" /> History
        </button>
        {(row || isCustom) && (
          <button type="button" className={ui.secondaryBtn} onClick={() => void resetOrDelete()} disabled={busy}>
            {isCustom ? <Trash2 className="w-4 h-4 text-red-500" /> : <RotateCcw className="w-4 h-4" />}
            {isCustom ? 'Delete page' : 'Reset to original'}
          </button>
        )}
        <button type="button" className={ui.primaryBtn} onClick={() => void save()} disabled={busy || !data}>
          <Save className="w-4 h-4" /> {busy ? 'Saving…' : dirty ? 'Save changes' : 'Save'}
        </button>
      </div>

      {error && <div className={ui.error}>{error}</div>}
      {notice && <div className={ui.notice} role="status">{notice}</div>}

      {revisions && (
        <div className={`${ui.card} space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-extrabold text-foreground">Previous versions</h3>
            <button type="button" className={ui.iconBtn} onClick={() => setRevisions(null)} aria-label="Close history">
              <X className="w-4 h-4" />
            </button>
          </div>
          {revisions.length === 0 ? (
            <p className={ui.hint}>No previous versions yet. One is kept each time the page is saved (newest 20).</p>
          ) : (
            <ul className="divide-y divide-border">
              {revisions.map((r) => (
                <li key={r.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <span>
                    <span className="font-bold text-foreground">{formatDateTime(r.savedAt)}</span>
                    <span className="text-muted-foreground"> · {r.savedBy || 'unknown'} · {r.status}</span>
                  </span>
                  <button type="button" className={`${ui.secondaryBtn} !py-1.5 !text-xs`} onClick={() => void loadRevision(r.id)}>
                    Load this version
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {isCustom && (
        <div className={`${ui.card} space-y-1.5`}>
          <label htmlFor="page-admin-title" className={ui.label}>Name in the admin</label>
          <input id="page-admin-title" className={ui.input} value={title} onChange={(e) => { setTitle(e.target.value); setDirty(true); }} />
        </div>
      )}

      {!data && !error && (
        <div className={`${ui.card} flex items-center gap-3 text-sm font-bold text-foreground`}>
          <span className="w-5 h-5 border-2 border-[#FD5900] border-t-transparent rounded-full animate-spin" /> Loading page content…
        </div>
      )}

      {data && (
        <PageFieldsEditor
          data={data}
          onChange={(next) => {
            setData(next);
            setDirty(true);
          }}
          ctx={{ template: entry.template, pickImage: (cb) => setPicker(() => cb) }}
        />
      )}

      {picker && (
        <AdminMediaLibrary
          mode="modal"
          onSelect={(url) => {
            picker(url);
            setPicker(null);
          }}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

export function AdminPagesView() {
  const [rows, setRows] = useState<AdminPageRow[]>([]);
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [editing, setEditing] = useState<PageEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setRows(await pagesAdminApi.list());
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  const entries = useMemo<PageEntry[]>(() => {
    const byKey = new Map(rows.map((r) => [r.key, r]));
    const builtIn = BUILT_IN_PAGES.map((p) => ({ ...p, builtIn: true, row: byKey.get(p.key) }));
    const custom = rows
      .filter((r) => r.kind === 'custom')
      .map((r) => ({ key: r.key, path: r.path, template: r.template as PageTemplate, group: 'New pages', label: r.title, builtIn: false, row: r }));
    return [...custom, ...builtIn];
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return entries.filter((e) => {
      if (group !== 'all' && e.group !== group) return false;
      if (statusFilter === 'edited' && !(e.row && e.row.kind === 'override')) return false;
      if (statusFilter === 'original' && e.row) return false;
      if (statusFilter === 'draft' && e.row?.status !== 'draft') return false;
      if (statusFilter === 'new' && e.row?.kind !== 'custom') return false;
      if (!needle) return true;
      return e.label.toLowerCase().includes(needle) || e.path.includes(needle) || (e.row?.title ?? '').toLowerCase().includes(needle);
    });
  }, [entries, q, group, statusFilter]);

  if (editing) {
    return <PageEditor entry={editing} onClose={() => setEditing(null)} onSaved={() => void load()} />;
  }

  const editedCount = rows.filter((r) => r.kind === 'override').length;
  const customCount = rows.filter((r) => r.kind === 'custom').length;

  return (
    <div className="space-y-5">
      {error && <div className={ui.error}>{error}</div>}

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Website pages', BUILT_IN_PAGES.length],
          ['Edited here', editedCount],
          ['New pages', customCount],
        ].map(([label, value]) => (
          <div key={label} className={`${ui.card} !p-4`}>
            <p className={ui.label}>{label}</p>
            <p className="text-2xl font-heading font-extrabold text-foreground mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input className={`${ui.input} pl-9`} placeholder="Search pages by name or address" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className={ui.select} value={group} onChange={(e) => setGroup(e.target.value)} aria-label="Section">
          <option value="all">All sections</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select className={ui.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} aria-label="Status">
          <option value="all">Any status</option>
          <option value="edited">Edited</option>
          <option value="original">Original</option>
          <option value="draft">Drafts</option>
          <option value="new">New pages</option>
        </select>
        <button type="button" className={ui.primaryBtn} onClick={() => setCreating(true)}>
          <FilePlus2 className="w-4 h-4" /> New page
        </button>
      </div>

      <div className={ui.tableCard}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className={ui.thead}>
                <th className={ui.th}>Page</th>
                <th className={ui.th}>Layout</th>
                <th className={ui.th}>Status</th>
                <th className={ui.th}>Last change</th>
                <th className={`${ui.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const badge = statusBadge(e);
                return (
                  <tr key={e.key} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className={ui.td}>
                      <button type="button" className="text-left font-bold text-foreground hover:text-[#FD5900] cursor-pointer" onClick={() => setEditing(e)}>
                        {e.row?.title || e.label}
                      </button>
                      <p className="text-xs text-muted-foreground">{e.path}</p>
                    </td>
                    <td className={`${ui.td} text-xs text-muted-foreground whitespace-nowrap`}>
                      {TEMPLATE_LABELS[e.template]}
                      <br />
                      {e.group}
                    </td>
                    <td className={ui.td}>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-extrabold whitespace-nowrap ${badge.cls}`}>{badge.text}</span>
                    </td>
                    <td className={`${ui.td} text-xs text-muted-foreground whitespace-nowrap`}>
                      {e.row ? (
                        <>
                          {formatDateTime(e.row.updatedAt)}
                          <br />
                          {e.row.updatedBy}
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className={`${ui.td} text-right whitespace-nowrap`}>
                      <button type="button" className={ui.iconBtn} title="Edit" onClick={() => setEditing(e)}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <a href={e.path} target="_blank" rel="noopener noreferrer" className={`${ui.iconBtn} inline-flex`} title="View on the website">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-sm text-muted-foreground">No pages match.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${ui.card} space-y-2`}>
        <p className="text-sm font-bold text-foreground">Not editable here yet</p>
        <p className={ui.hint}>
          These pages have their text written inside the page code. They need to be moved to the same content format first:{' '}
          {CODE_ONLY_PAGES.map((p) => `${p.label} (${p.path})`).join(', ')}.
        </p>
      </div>

      {creating && (
        <NewPageDialog
          onClose={() => setCreating(false)}
          onCreated={(entry) => {
            setCreating(false);
            void load();
            setEditing(entry);
          }}
        />
      )}
    </div>
  );
}
