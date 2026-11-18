import { useMemo, useState, type FormEvent } from 'react';
import {
  Check,
  ExternalLink,
  FolderPlus,
  Pencil,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { useBlogCmsStore } from '@/lib/cms/blogStore';
import { slugifyText } from '@/lib/cms/richTextCodec';

export function AdminCategoryManager() {
  const categories = useBlogCmsStore((s) => s.categories);
  const adminPosts = useBlogCmsStore((s) => s.adminPosts);
  const createCategory = useBlogCmsStore((s) => s.createCategory);
  const renameCategory = useBlogCmsStore((s) => s.renameCategory);
  const deleteCategory = useBlogCmsStore((s) => s.deleteCategory);

  const [newName, setNewName] = useState('');
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countsByCatLower = useMemo(() => {
    const map = new Map<string, { published: number; draft: number }>();
    for (const post of adminPosts) {
      const cats = post.categories?.length ? post.categories : [post.category];
      for (const cat of cats) {
        const key = cat.toLowerCase();
        const prev = map.get(key) ?? { published: 0, draft: 0 };
        if (post.status === 'published') prev.published += 1;
        else prev.draft += 1;
        map.set(key, prev);
      }
    }
    return map;
  }, [adminPosts]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createCategory(newName.trim());
      setNewName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setBusy(false);
    }
  };

  const handleRename = async (oldSlug: string) => {
    if (!editingName.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await renameCategory(oldSlug, editingName.trim());
      setEditingSlug(null);
      setEditingName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rename category');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (slug: string, name: string, count: number) => {
    const msg =
      count > 0
        ? `Remove "${name}" from the category filter bar? (${count} articles currently reference this topic.)`
        : `Delete category "${name}"?`;
    if (!window.confirm(msg)) return;
    setBusy(true);
    setError(null);
    try {
      await deleteCategory(slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300 font-medium">
          {error}
        </div>
      )}

      {/* Create New Category Card */}
      <form
        onSubmit={handleCreate}
        className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-stretch sm:items-end gap-4 shadow-2xs"
      >
        <div className="flex-1 space-y-1.5">
          <label
            htmlFor="new-category-input"
            className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground"
          >
            Create Topic / Category
          </label>
          <input
            id="new-category-input"
            type="text"
            placeholder="e.g. Generative Engine Optimization (GEO)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
          />
          {newName.trim() && (
            <p className="text-xs text-muted-foreground">
              Archive route:{' '}
              <code className="text-[#0053C6] dark:text-sky-400">
                /category/{slugifyText(newName)}
              </code>
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={busy || !newName.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-sm font-heading font-extrabold disabled:opacity-50 cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </form>

      {/* Categories Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-5">Category Name</th>
                <th className="py-3.5 px-5">Archive Slug</th>
                <th className="py-3.5 px-5">Published</th>
                <th className="py-3.5 px-5">Drafts</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {categories.map((cat) => {
                const stats = countsByCatLower.get(cat.name.toLowerCase()) ?? {
                  published: 0,
                  draft: 0,
                };
                const isEditing = editingSlug === cat.slug;

                return (
                  <tr
                    key={cat.slug}
                    className="hover:bg-muted/35 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-semibold text-foreground">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                          />
                          <button
                            type="button"
                            onClick={() => void handleRename(cat.slug)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingSlug(null)}
                            className="p-1.5 rounded-lg bg-muted text-muted-foreground cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-[#FD5900]" />
                          {cat.name}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-muted-foreground font-mono">
                      /category/{cat.slug}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-foreground">
                      {stats.published}
                    </td>
                    <td className="py-3.5 px-5 text-muted-foreground">
                      {stats.draft}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/category/${cat.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open archive page"
                          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          title="Rename category"
                          onClick={() => {
                            setEditingSlug(cat.slug);
                            setEditingName(cat.name);
                          }}
                          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="Delete category"
                          onClick={() =>
                            void handleDelete(
                              cat.slug,
                              cat.name,
                              stats.published + stats.draft
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
