import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  History,
  Calendar,
  CheckCircle2,
  Clock,
  Columns2,
  ExternalLink,
  Eye,
  Globe,
  Image as ImageIcon,
  PenLine,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Star,
  Tag,
  Upload,
  User,
  Wand2,
  X,
} from 'lucide-react';
import { ArticleBlocksRenderer } from '@/pages/blog/ArticleBlocksRenderer';
import { cmsProvider } from '@/lib/cms/provider';
import { useBlogCmsStore } from '@/lib/cms/blogStore';
import {
  computeWordCountAndReadTime,
  evaluatePostSeo,
  formatDisplayDate,
  richNodesToPlainText,
  slugifyText,
} from '@/lib/cms/richTextCodec';
import type { CmsBlogPostRecord } from '@/lib/cms/types';
import { AdminBlockEditor } from './AdminBlockEditor';
import { AdminMediaLibrary } from './AdminMediaModal';
import { AdminRevisionsPanel } from './AdminRevisionsPanel';

interface AdminArticleStudioProps {
  initialPost: CmsBlogPostRecord;
  isNewPost: boolean;
  onBack: () => void;
  onSaved: (saved: CmsBlogPostRecord) => void;
}

export function AdminArticleStudio({
  initialPost,
  isNewPost,
  onBack,
  onSaved,
}: AdminArticleStudioProps) {
  const categories = useBlogCmsStore((s) => s.categories);
  const savePost = useBlogCmsStore((s) => s.savePost);
  const createCategory = useBlogCmsStore((s) => s.createCategory);
  const checkSlugConflict = useBlogCmsStore((s) => s.checkSlugConflict);

  const [draft, setDraft] = useState<CmsBlogPostRecord>(initialPost);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!isNewPost);
  const [autoReadTime, setAutoReadTime] = useState(true);
  const [viewMode, setViewMode] = useState<'write' | 'split' | 'preview'>('write');
  const [showHistory, setShowHistory] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<
    ((url: string) => void) | null
  >(null);

  const { words, readTime: calculatedReadTime } = useMemo(
    () => computeWordCountAndReadTime(draft.title, draft.excerpt, draft.blocks),
    [draft.title, draft.excerpt, draft.blocks]
  );

  const effectiveReadTime = autoReadTime ? calculatedReadTime : draft.readTime;

  const slugConflict = useMemo(
    () => (draft.slug ? checkSlugConflict(draft.slug, draft.id) : 'Enter a URL slug.'),
    [draft.slug, draft.id, checkSlugConflict]
  );

  const seoReport = useMemo(
    () =>
      evaluatePostSeo({
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        thumbnail: draft.thumbnail,
        seo: draft.seo,
        blocks: draft.blocks,
        words,
      }),
    [draft.title, draft.slug, draft.excerpt, draft.thumbnail, draft.seo, draft.blocks, words]
  );

  const updateDraft = useCallback(
    (updater: (prev: CmsBlogPostRecord) => CmsBlogPostRecord) => {
      setDraft((prev) => updater(prev));
      setDirty(true);
      setFeedback(null);
    },
    []
  );

  const handleTitleChange = (title: string) => {
    updateDraft((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : slugifyText(title),
    }));
  };

  const handleAutoExcerpt = () => {
    for (const block of draft.blocks) {
      if (block.type === 'paragraph') {
        const plain = richNodesToPlainText(block.content).trim();
        if (plain.length > 20) {
          const clipped = plain.length > 160 ? `${plain.slice(0, 157).trim()}…` : plain;
          updateDraft((prev) => ({ ...prev, excerpt: clipped }));
          return;
        }
      }
    }
  };

  const handlePersist = useCallback(
    async (overrideStatus?: 'published' | 'draft') => {
      const targetStatus = overrideStatus ?? draft.status;
      const cleanSlug = slugifyText(draft.slug || draft.title);
      if (!draft.title.trim()) {
        setFeedback({ type: 'error', message: 'Please enter an article title before saving.' });
        return;
      }
      const conflict = checkSlugConflict(cleanSlug, draft.id);
      if (conflict) {
        setFeedback({ type: 'error', message: conflict });
        return;
      }

      setSaving(true);
      setFeedback(null);
      try {
        const payload: CmsBlogPostRecord = {
          ...draft,
          slug: cleanSlug,
          status: targetStatus,
          readTime: effectiveReadTime,
          date: formatDisplayDate(draft.dateIso),
        };
        const saved = await savePost(payload);
        setDraft(saved);
        setSlugManuallyEdited(true);
        setDirty(false);
        setFeedback({
          type: 'success',
          message:
            saved.status === 'published'
              ? `Published live at /blog/${saved.slug}`
              : 'Draft saved privately',
        });
        onSaved(saved);
      } catch (err) {
        setFeedback({
          type: 'error',
          message: err instanceof Error ? err.message : 'Failed to save article.',
        });
      } finally {
        setSaving(false);
      }
    },
    [draft, effectiveReadTime, checkSlugConflict, savePost, onSaved]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        void handlePersist();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePersist]);

  const handleCoverUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploadingCover(true);
    try {
      const item = await cmsProvider.uploadMedia(file);
      updateDraft((prev) => ({ ...prev, thumbnail: item.url }));
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Cover upload failed',
      });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleQuickAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setAddingCategory(true);
    try {
      const created = await createCategory(newCategoryName.trim());
      updateDraft((prev) => ({
        ...prev,
        category: created.name,
        categories: Array.from(new Set([created.name, ...(prev.categories || [])])),
      }));
      setNewCategoryName('');
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to add category',
      });
    } finally {
      setAddingCategory(false);
    }
  };

  const toggleAdditionalCategory = (catName: string) => {
    updateDraft((prev) => {
      const current = new Set(prev.categories?.length ? prev.categories : [prev.category]);
      if (current.has(catName)) {
        if (current.size > 1 && catName !== prev.category) {
          current.delete(catName);
        }
      } else {
        current.add(catName);
      }
      return { ...prev, categories: Array.from(current) };
    });
  };

  const serpTitle = (draft.seo?.metaTitle || draft.title || 'Untitled Article').trim();
  const serpDesc = (
    draft.seo?.metaDescription ||
    draft.excerpt ||
    'Add a compelling meta description to maximize click-through rates from Google Search.'
  ).trim();

  const firstBlockIsImg = draft.blocks[0]?.type === 'image';
  const showTopThumbInPreview = Boolean(draft.thumbnail) && !firstBlockIsImg;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {showHistory && (
        <AdminRevisionsPanel
          postId={draft.id}
          hasUnsavedChanges={dirty}
          onClose={() => setShowHistory(false)}
          onRestored={(restored) => {
            setShowHistory(false);
            setDraft(restored);
            setDirty(false);
            void useBlogCmsStore.getState().refreshAdmin();
            onSaved(restored);
          }}
        />
      )}
      {/* Sticky Studio Top Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (dirty && !window.confirm('Discard unsaved changes to this article?')) {
                  return;
                }
                onBack();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-bold text-foreground cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Articles</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className={`px-2.5 py-1 rounded-full font-extrabold uppercase tracking-wider text-[10px] ${
                  draft.status === 'published'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                }`}
              >
                {draft.status}
              </span>
              <span>•</span>
              <span>{words} words</span>
              <span>•</span>
              <span>{effectiveReadTime}</span>
              {dirty && (
                <>
                  <span>•</span>
                  <span className="text-[#FD5900] font-bold">Unsaved edits</span>
                </>
              )}
            </div>
          </div>

          {/* Center View Switcher */}
          <div className="inline-flex rounded-xl bg-muted p-1 gap-1">
            <button
              type="button"
              onClick={() => setViewMode('write')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                viewMode === 'write'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Write</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Right Save & Publish Controls */}
          <div className="flex items-center gap-2">
            {!isNewPost && (
              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-bold text-foreground cursor-pointer"
                title="Earlier saved versions"
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </button>
            )}
            {draft.slug && !isNewPost && (
              <a
                href={
                  draft.status === 'draft'
                    ? `/blog/${draft.slug}?preview=1`
                    : `/blog/${draft.slug}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:border-[#0053C6] text-xs font-bold text-foreground no-underline"
              >
                <span>Open Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              disabled={saving}
              onClick={() => void handlePersist('draft')}
              className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-muted text-xs font-bold text-foreground disabled:opacity-50 cursor-pointer"
            >
              Save Draft
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => void handlePersist('published')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-xs font-heading font-extrabold shadow-md shadow-[#FD5900]/20 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>
                {saving
                  ? 'Saving…'
                  : draft.status === 'published' && !isNewPost
                    ? 'Update Live'
                    : 'Publish Live'}
              </span>
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`max-w-[1600px] mx-auto mt-2.5 rounded-xl px-4 py-2 text-xs font-bold flex items-center justify-between ${
              feedback.type === 'success'
                ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25'
                : 'bg-red-500/12 text-red-600 dark:text-red-300 border border-red-500/25'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {feedback.message}
            </span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="p-0.5 hover:opacity-75 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </header>

      {/* Studio Workspace */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-6">
        {viewMode === 'preview' ? (
          /* Full Authentic Live Eon8 Article Preview */
          <div className="rounded-3xl border border-border overflow-hidden shadow-lg bg-background">
            <div className="py-12 sm:py-16 px-6 sm:px-10 bg-gradient-to-br from-[#06152d] via-[#0a2558] to-[#0053C6] text-white">
              <div className="max-w-4xl mx-auto space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold">
                  <Tag className="w-3.5 h-3.5 text-[#FD5900]" />
                  <span>{draft.category || 'Uncategorized'}</span>
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold leading-tight">
                  {draft.title || 'Untitled Blog Post'}
                </h1>
                <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-200">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#FD5900]" />
                    <span>{formatDisplayDate(draft.dateIso)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#FD5900]" />
                    <span>{draft.author || 'Eon8 Editorial'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FD5900]" />
                    <span>{effectiveReadTime}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 sm:p-12">
              {showTopThumbInPreview && (
                <img
                  src={draft.thumbnail}
                  alt={draft.title}
                  className="w-full h-auto rounded-2xl border border-border mb-8 object-cover"
                />
              )}
              <ArticleBlocksRenderer blocks={draft.blocks} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Editor Column (or Left half in Split mode) */}
            <div
              className={
                viewMode === 'split'
                  ? 'lg:col-span-5 space-y-6'
                  : 'lg:col-span-8 space-y-6'
              }
            >
              {/* Title & Excerpt Card */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 space-y-5 shadow-2xs">
                <div>
                  <label
                    htmlFor="article-title-input"
                    className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground mb-2"
                  >
                    Article Headline
                  </label>
                  <input
                    id="article-title-input"
                    type="text"
                    placeholder="Enter a compelling, search-focused headline..."
                    value={draft.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full text-xl sm:text-3xl font-heading font-extrabold text-foreground bg-transparent border-b border-border pb-3 focus:outline-none focus:border-[#FD5900] placeholder:text-muted-foreground/50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="article-excerpt-input"
                      className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Article Excerpt / Card Summary
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoExcerpt}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] cursor-pointer"
                    >
                      <Wand2 className="w-3 h-3" />
                      <span>Auto-fill from intro</span>
                    </button>
                  </div>
                  <textarea
                    id="article-excerpt-input"
                    rows={3}
                    placeholder="Concise 1–2 sentence summary shown on /blog cards and social shares..."
                    value={draft.excerpt}
                    onChange={(e) =>
                      updateDraft((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6] resize-y"
                  />
                </div>
              </div>

              {/* Rich Block Builder */}
              <AdminBlockEditor
                blocks={draft.blocks}
                onChange={(blocks) => updateDraft((prev) => ({ ...prev, blocks }))}
                onRequestMediaPicker={(cb) => setMediaPickerCallback(() => cb)}
              />
            </div>

            {/* Live Preview Pane in Split Mode */}
            {viewMode === 'split' && (
              <div className="lg:col-span-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-sm">
                <div className="p-5 bg-gradient-to-br from-[#06152d] via-[#0a2558] to-[#0053C6] text-white space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold">
                    {draft.category}
                  </span>
                  <h2 className="text-xl font-heading font-extrabold leading-snug">
                    {draft.title || 'Untitled Article'}
                  </h2>
                  <p className="text-[11px] text-slate-300">
                    {formatDisplayDate(draft.dateIso)} • {draft.author} • {effectiveReadTime}
                  </p>
                </div>
                <div className="p-5">
                  {showTopThumbInPreview && (
                    <img
                      src={draft.thumbnail}
                      alt={draft.title}
                      className="w-full rounded-xl border border-border mb-5 object-cover"
                    />
                  )}
                  <ArticleBlocksRenderer blocks={draft.blocks} />
                </div>
              </div>
            )}

            {/* Right Inspector Sidebar */}
            <aside
              className={
                viewMode === 'split'
                  ? 'lg:col-span-3 space-y-5'
                  : 'lg:col-span-4 space-y-5'
              }
            >
              {/* 1. Publishing & Featured Controls */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                  Publishing &amp; Visibility
                </h3>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-muted">
                  <button
                    type="button"
                    onClick={() =>
                      updateDraft((prev) => ({ ...prev, status: 'published' }))
                    }
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      draft.status === 'published'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => updateDraft((prev) => ({ ...prev, status: 'draft' }))}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      draft.status === 'draft'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Draft
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateDraft((prev) => ({ ...prev, featured: !prev.featured }))
                  }
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    draft.featured
                      ? 'border-[#FD5900] bg-[#FD5900]/10 text-[#FD5900]'
                      : 'border-border bg-background text-foreground hover:border-[#FD5900]'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Star
                      className={`w-4 h-4 ${draft.featured ? 'fill-[#FD5900]' : ''}`}
                    />
                    <span>Pin to Featured Spotlight</span>
                  </span>
                  <span>{draft.featured ? 'Active' : 'Off'}</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={draft.dateIso}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          dateIso: e.target.value,
                          date: formatDisplayDate(e.target.value),
                        }))
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={draft.author}
                      placeholder="Eon8 Editorial"
                      onChange={(e) =>
                        updateDraft((prev) => ({ ...prev, author: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Read Time
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoReadTime}
                        onChange={(e) => setAutoReadTime(e.target.checked)}
                      />
                      Auto ({calculatedReadTime})
                    </label>
                  </div>
                  {!autoReadTime && (
                    <input
                      type="text"
                      value={draft.readTime}
                      placeholder="5 min read"
                      onChange={(e) =>
                        updateDraft((prev) => ({ ...prev, readTime: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  )}
                </div>
              </div>

              {/* 2. Categories Card */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                  Categories &amp; Topics
                </h3>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Primary Category
                  </label>
                  <select
                    value={draft.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateDraft((prev) => ({
                        ...prev,
                        category: val,
                        categories: Array.from(new Set([val, ...(prev.categories || [])])),
                      }));
                    }}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Additional Category Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {categories.map((c) => {
                      const active =
                        draft.category === c.name ||
                        Boolean(draft.categories?.includes(c.name));
                      return (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => toggleAdditionalCategory(c.name)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#0053C6] text-white border-[#0053C6]'
                              : 'bg-background text-muted-foreground border-border hover:text-foreground'
                          }`}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex gap-2">
                  <input
                    type="text"
                    placeholder="New category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        void handleQuickAddCategory();
                      }
                    }}
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                  <button
                    type="button"
                    disabled={addingCategory || !newCategoryName.trim()}
                    onClick={() => void handleQuickAddCategory()}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-muted hover:bg-border text-xs font-bold text-foreground disabled:opacity-40 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* 3. Cover Image Card */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-2xs">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                  Featured Cover Image
                </h3>

                {draft.thumbnail ? (
                  <div className="relative rounded-xl overflow-hidden border border-border aspect-[16/9] bg-slate-900">
                    <img
                      src={draft.thumbnail}
                      alt={draft.title || 'Cover'}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => updateDraft((prev) => ({ ...prev, thumbnail: '' }))}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-white hover:bg-red-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-border aspect-[16/9] flex flex-col items-center justify-center p-4 text-center gap-1.5 bg-muted/20">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      1200 × 630px recommended
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <label className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-xs font-bold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingCover ? 'Uploading…' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      className="hidden"
                      onChange={(e) => void handleCoverUpload(e.target.files?.[0])}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setMediaPickerCallback(
                        () => (url: string) =>
                          updateDraft((prev) => ({ ...prev, thumbnail: url }))
                      )
                    }
                    className="py-2 px-3 rounded-xl border border-border bg-background hover:border-[#0053C6] text-xs font-bold text-foreground cursor-pointer"
                  >
                    Media Library
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Or paste cover image URL..."
                  value={draft.thumbnail}
                  onChange={(e) =>
                    updateDraft((prev) => ({ ...prev, thumbnail: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                />
              </div>

              {/* 4. SEO & SERP Suite */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0053C6]" />
                    <span>SEO &amp; Search Suite</span>
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      seoReport.score >= 80
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : seoReport.score >= 55
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          : 'bg-red-500/15 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {seoReport.score}/100 SEO
                  </span>
                </div>

                {/* Custom URL Slug */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      URL Slug
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSlugManuallyEdited(true);
                        updateDraft((prev) => ({
                          ...prev,
                          slug: slugifyText(prev.title),
                        }));
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0053C6] hover:text-[#FD5900] cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Sync from Title</span>
                    </button>
                  </div>
                  <div className="flex items-center rounded-xl border border-border bg-background overflow-hidden">
                    <span className="pl-3 pr-1 text-xs text-muted-foreground select-none">
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={draft.slug}
                      onChange={(e) => {
                        setSlugManuallyEdited(true);
                        updateDraft((prev) => ({
                          ...prev,
                          slug: slugifyText(e.target.value),
                        }));
                      }}
                      className="flex-1 py-2 pr-3 bg-transparent text-xs font-semibold text-foreground focus:outline-none"
                    />
                  </div>
                  {slugConflict ? (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">
                      {slugConflict}
                    </p>
                  ) : (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      Slug is unique and available
                    </p>
                  )}
                </div>

                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      SEO Meta Title
                    </label>
                    <span className="text-[10px] text-muted-foreground">
                      {serpTitle.length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder={draft.title || 'Custom <title> tag...'}
                    value={draft.seo?.metaTitle || ''}
                    onChange={(e) =>
                      updateDraft((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      SEO Meta Description
                    </label>
                    <span className="text-[10px] text-muted-foreground">
                      {serpDesc.length}/160
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder={draft.excerpt || 'Custom meta description...'}
                    value={draft.seo?.metaDescription || ''}
                    onChange={(e) =>
                      updateDraft((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground resize-y"
                  />
                </div>

                {/* OpenGraph Image Override */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      OpenGraph Social Image
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerCallback(
                          () => (url: string) =>
                            updateDraft((prev) => ({
                              ...prev,
                              seo: { ...prev.seo, ogImage: url },
                            }))
                        )
                      }
                      className="text-[11px] font-bold text-[#0053C6] hover:text-[#FD5900] cursor-pointer"
                    >
                      Pick Image
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Defaults to Featured Cover Image..."
                    value={draft.seo?.ogImage || ''}
                    onChange={(e) =>
                      updateDraft((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, ogImage: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>

                {/* Google SERP Preview Card */}
                <div className="rounded-xl border border-border bg-slate-50 dark:bg-slate-900/70 p-3.5 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FD5900]" />
                    Google Search Preview
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                    https://www.eon8.com › blog › {draft.slug || 'article-slug'}
                  </p>
                  <p className="text-sm font-semibold text-[#1a0dab] dark:text-sky-400 leading-snug line-clamp-2">
                    {serpTitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {serpDesc}
                  </p>
                </div>

                {/* 7-Point SEO Readiness Checklist */}
                <ul className="space-y-1.5 pt-1">
                  {seoReport.checks.map((chk) => (
                    <li
                      key={chk.id}
                      className="flex items-start justify-between gap-2 text-[11px]"
                    >
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            chk.passed ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {chk.label}
                      </span>
                      <span className="text-muted-foreground text-right shrink-0">
                        {chk.hint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>

      {mediaPickerCallback && (
        <AdminMediaLibrary
          mode="modal"
          onSelect={(url) => mediaPickerCallback(url)}
          onClose={() => setMediaPickerCallback(null)}
        />
      )}
    </div>
  );
}
