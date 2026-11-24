import { useEffect, useState } from 'react';
import { History, RotateCcw, X } from 'lucide-react';
import { adminFetch, formatDateTime } from '@/lib/admin/adminApi';
import type { CmsBlogPostRecord } from '@/lib/cms/types';
import { ui } from './adminStyles';

interface Revision {
  id: number;
  savedAt: string;
  savedBy: string | null;
  title: string;
  status: string;
}

interface Props {
  postId: number;
  hasUnsavedChanges: boolean;
  onRestored: (post: CmsBlogPostRecord) => void;
  onClose: () => void;
}

/** Lists earlier saved versions of a post and restores one of them. */
export function AdminRevisionsPanel({ postId, hasUnsavedChanges, onRestored, onClose }: Props) {
  const [items, setItems] = useState<Revision[] | null>(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    adminFetch<{ items: Revision[] }>(`/api/cms/admin/posts/${postId}/revisions`)
      .then((r) => active && setItems(r.items))
      .catch((err: Error) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [postId]);

  const restore = async (rev: Revision) => {
    const warning = hasUnsavedChanges ? '\n\nYour unsaved edits in the editor will be lost.' : '';
    if (!window.confirm(`Restore the version saved ${formatDateTime(rev.savedAt)}? The current version is kept in this history.${warning}`)) return;
    setBusyId(rev.id);
    setError('');
    try {
      const res = await adminFetch<{ post: CmsBlogPostRecord }>(`/api/cms/admin/revisions/${rev.id}/restore`, {
        method: 'POST',
        body: '{}',
      });
      onRestored(res.post);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" role="dialog" aria-modal="true" aria-labelledby="revisions-title" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-card border-l border-border p-6 overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 id="revisions-title" className="text-lg font-heading font-extrabold text-foreground inline-flex items-center gap-2">
            <History className="w-5 h-5 text-[#0053C6]" /> Version history
          </h2>
          <button type="button" className={ui.iconBtn} onClick={onClose} aria-label="Close version history">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className={ui.hint}>A copy is kept each time the article is saved (the last 20 versions).</p>
        {error && <div className={ui.error}>{error}</div>}
        {items === null && !error && <p className="text-sm text-muted-foreground">Loading…</p>}
        {items?.length === 0 && <p className="text-sm text-muted-foreground">No earlier versions yet. They appear after the article is saved again.</p>}
        <ul className="divide-y divide-border">
          {items?.map((rev) => (
            <li key={rev.id} className="py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{rev.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(rev.savedAt)} · {rev.status}
                  {rev.savedBy ? ` · ${rev.savedBy}` : ''}
                </p>
              </div>
              <button type="button" className={ui.secondaryBtn} disabled={busyId !== null} onClick={() => void restore(rev)}>
                <RotateCcw className="w-4 h-4" /> {busyId === rev.id ? 'Restoring…' : 'Restore'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
