import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArchiveRestore,
  Copy,
  ExternalLink,
  FileText,
  FolderKanban,
  History,
  Image as ImageIcon,
  Inbox,
  LogOut,
  Route,
  ScanSearch,
  SlidersHorizontal,
  Users,
  Moon,
  Pencil,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  Trash2,
} from 'lucide-react';
import { PageSeo } from '@/components/sections';
import { useBlogCmsStore } from '@/lib/cms/blogStore';
import type { CmsBlogPostRecord, ManagedBlogSummary } from '@/lib/cms/types';
import { useThemeStore } from '@/store/useThemeStore';
import { AdminArticleStudio } from './components/AdminArticleStudio';
import { AdminCategoryManager } from './components/AdminCategoryManager';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminMediaLibrary } from './components/AdminMediaModal';
import { AdminLeadsView } from './components/AdminLeadsView';
import { AdminRedirectsView } from './components/AdminRedirectsView';
import { AdminSeoView } from './components/AdminSeoView';
import { AdminSettingsView } from './components/AdminSettingsView';
import { AdminSiteSettingsView } from './components/AdminSiteSettingsView';
import { AdminActivityView, AdminUsersView } from './components/AdminUsersView';

type AdminSectionTab =
  | 'articles'
  | 'categories'
  | 'media'
  | 'leads'
  | 'redirects'
  | 'seo'
  | 'site'
  | 'users'
  | 'activity'
  | 'settings'
  | 'trash';

/** Sections added for the backend; `adminOnly` ones are hidden from editors. */
const BACKEND_TABS: Array<{
  id: AdminSectionTab;
  label: string;
  icon: typeof Inbox;
  color: string;
  adminOnly?: boolean;
  title: string;
  description: string;
}> = [
  { id: 'leads', label: 'Leads', icon: Inbox, color: 'text-rose-300', title: 'Website Leads', description: 'Every enquiry from the website forms. Update status, add notes, export to CSV.' },
  { id: 'redirects', label: 'Redirects', icon: Route, color: 'text-violet-300', title: 'URL Redirects', description: 'Permanent (301) and temporary redirects served by the server, including old WordPress URLs.' },
  { id: 'seo', label: 'Page SEO', icon: ScanSearch, color: 'text-sky-300', title: 'Page SEO Overrides', description: 'Titles, descriptions, share images, noindex and structured data for any page.' },
  { id: 'site', label: 'Site Settings', icon: SlidersHorizontal, color: 'text-teal-300', adminOnly: true, title: 'Site Settings', description: 'Contact details, social links, lead email recipients and tracking codes.' },
  { id: 'users', label: 'Users', icon: Users, color: 'text-indigo-300', adminOnly: true, title: 'Admin Users', description: 'Add editors and admins, reset passwords and disable accounts.' },
  { id: 'activity', label: 'Activity Log', icon: History, color: 'text-slate-300', adminOnly: true, title: 'Activity Log', description: 'Who changed what, and when.' },
];
type StatusFilterTab = 'all' | 'published' | 'draft' | 'featured' | 'custom';
type SortOption = 'newest' | 'oldest' | 'title' | 'updated';

const ADMIN_ROWS_PER_PAGE = 25;

export function AdminDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme, setTheme } = useThemeStore();

  const sessionChecked = useBlogCmsStore((s) => s.sessionChecked);
  const session = useBlogCmsStore((s) => s.session);
  const adminReady = useBlogCmsStore((s) => s.adminReady);
  const adminPosts = useBlogCmsStore((s) => s.adminPosts);
  const publishedPosts = useBlogCmsStore((s) => s.publishedPosts);
  const deletedStaticPosts = useBlogCmsStore((s) => s.deletedStaticPosts);
  const categories = useBlogCmsStore((s) => s.categories);

  const checkSession = useBlogCmsStore((s) => s.checkSession);
  const login = useBlogCmsStore((s) => s.login);
  const logout = useBlogCmsStore((s) => s.logout);
  const loadPostForEditor = useBlogCmsStore((s) => s.loadPostForEditor);
  const createBlankPostDraft = useBlogCmsStore((s) => s.createBlankPostDraft);
  const quickUpdatePostMeta = useBlogCmsStore((s) => s.quickUpdatePostMeta);
  const duplicatePost = useBlogCmsStore((s) => s.duplicatePost);
  const deletePost = useBlogCmsStore((s) => s.deletePost);
  const restoreStaticPost = useBlogCmsStore((s) => s.restoreStaticPost);
  const bulkMutate = useBlogCmsStore((s) => s.bulkMutate);

  const [activeTab, setActiveTab] = useState<AdminSectionTab>('articles');
  const [statusFilter, setStatusFilter] = useState<StatusFilterTab>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [busyPostId, setBusyPostId] = useState<number | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ManagedBlogSummary | null>(null);

  const [editorState, setEditorState] = useState<{
    post: CmsBlogPostRecord;
    isNew: boolean;
  } | null>(null);
  const [loadingEditor, setLoadingEditor] = useState(false);

  const isAdmin = (session.admin?.role ?? 'admin') === 'admin';
  const activeBackendTab = BACKEND_TABS.find((t) => t.id === activeTab);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  // Open ?edit=<id> automatically when linked from Draft Preview
  const editQueryId = searchParams.get('edit');
  useEffect(() => {
    if (!session.authenticated || !adminReady || !editQueryId || editorState) return;
    const idNum = Number(editQueryId);
    const match = adminPosts.find((p) => p.id === idNum);
    if (!match) return;
    let cancelled = false;
    loadPostForEditor(match).then((full) => {
      if (!cancelled) {
        setEditorState({ post: full, isNew: false });
        setSearchParams({}, { replace: true });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [
    session.authenticated,
    adminReady,
    editQueryId,
    adminPosts,
    editorState,
    loadPostForEditor,
    setSearchParams,
  ]);

  const metrics = useMemo(() => {
    let published = 0;
    let drafts = 0;
    let featured = 0;
    let customOrEdited = 0;
    for (const p of adminPosts) {
      if (p.status === 'published') published += 1;
      else drafts += 1;
      if (p.featured) featured += 1;
      if (p.source !== 'static') customOrEdited += 1;
    }
    return {
      total: adminPosts.length,
      published,
      drafts,
      featured,
      customOrEdited,
    };
  }, [adminPosts]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = adminPosts.filter((post) => {
      if (statusFilter === 'published' && post.status !== 'published') return false;
      if (statusFilter === 'draft' && post.status !== 'draft') return false;
      if (statusFilter === 'featured' && !post.featured) return false;
      if (statusFilter === 'custom' && post.source === 'static') return false;

      if (categoryFilter !== 'ALL') {
        const cats = post.categories?.length ? post.categories : [post.category];
        if (!cats.some((c) => c.toLowerCase() === categoryFilter.toLowerCase())) {
          return false;
        }
      }

      if (q) {
        return (
          post.title.toLowerCase().includes(q) ||
          post.slug.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
        );
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'oldest') {
        return (a.dateIso || '').localeCompare(b.dateIso || '');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'updated') {
        return (b.updatedAt || b.dateIso || '').localeCompare(
          a.updatedAt || a.dateIso || ''
        );
      }
      const cmp = (b.dateIso || '').localeCompare(a.dateIso || '');
      return cmp !== 0 ? cmp : b.id - a.id;
    });

    return list;
  }, [adminPosts, statusFilter, categoryFilter, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ADMIN_ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageArticles = useMemo(() => {
    const start = (safePage - 1) * ADMIN_ROWS_PER_PAGE;
    return filteredArticles.slice(start, start + ADMIN_ROWS_PER_PAGE);
  }, [filteredArticles, safePage]);

  const openEditorForSummary = async (summary: ManagedBlogSummary) => {
    setLoadingEditor(true);
    try {
      const full = await loadPostForEditor(summary);
      setEditorState({ post: full, isNew: false });
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to load article');
    } finally {
      setLoadingEditor(false);
    }
  };

  const openBlankEditor = () => {
    setEditorState({
      post: createBlankPostDraft(),
      isNew: true,
    });
  };

  const handleDuplicate = async (summary: ManagedBlogSummary) => {
    setBusyPostId(summary.id);
    try {
      const cloned = await duplicatePost(summary);
      setEditorState({ post: cloned, isNew: false });
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to duplicate post');
    } finally {
      setBusyPostId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setBusyPostId(deleteTarget.id);
    try {
      await deletePost(deleteTarget.id, deleteTarget.slug);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });
      setDeleteTarget(null);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusyPostId(null);
    }
  };

  const handleBulkAction = async (
    action: 'publish' | 'draft' | 'feature' | 'unfeature' | 'delete'
  ) => {
    if (selectedIds.size === 0) return;
    if (
      action === 'delete' &&
      !window.confirm(`Delete ${selectedIds.size} selected article(s)?`)
    ) {
      return;
    }

    const targets = adminPosts
      .filter((p) => selectedIds.has(p.id))
      .map((p) => ({ id: p.id, slug: p.slug }));
    setBulkBusy(true);
    try {
      await bulkMutate({ ids: targets, action });
      setSelectedIds(new Set());
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Bulk action failed');
    } finally {
      setBulkBusy(false);
    }
  };

  const toggleSelectAllOnPage = () => {
    const pageIds = pageArticles.map((p) => p.id);
    const allSelected =
      pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  return (
    <>
      <PageSeo
        title="Editorial Studio — Eon8"
        description="Restricted blog administration portal"
        noIndex
      />

      {!sessionChecked ? (
        <div className="min-h-screen bg-[#061022] flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !session.authenticated ? (
        <AdminLoginView
          onLogin={login}
          totalPublishedCount={publishedPosts.length}
          categoryCount={categories.length}
        />
      ) : session.admin?.mustChangePassword ? (
        <div className="min-h-screen bg-slate-50 dark:bg-[#070D19] p-5 sm:p-10">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 font-medium">
              You signed in with a temporary password. Choose a new password to continue.
            </div>
            <AdminSettingsView />
            <button
              type="button"
              onClick={() => void logout()}
              className="text-xs font-bold text-red-500 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : editorState ? (
        <AdminArticleStudio
          initialPost={editorState.post}
          isNewPost={editorState.isNew}
          onBack={() => setEditorState(null)}
          onSaved={(saved) => setEditorState({ post: saved, isNew: false })}
        />
      ) : (
        <div className="min-h-screen bg-slate-50 dark:bg-[#070D19] text-foreground flex flex-col lg:flex-row">
          {/* Left Editorial Studio Rail */}
          <aside className="lg:w-64 shrink-0 bg-[#06152D] text-white border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between p-5">
            <div className="space-y-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FD5900] flex items-center justify-center font-heading font-extrabold text-white text-sm shadow-md">
                    E8
                  </div>
                  <div>
                    <p className="font-heading font-extrabold text-sm tracking-tight leading-none">
                      EON8 STUDIO
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300 mt-1">
                      Blog Admin
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  title="Toggle Light / Dark theme"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-xl bg-white/8 hover:bg-white/15 text-slate-200 cursor-pointer"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={openBlankEditor}
                className="w-full py-3 px-4 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#FD5900]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Blog</span>
              </button>

              <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 'articles'
                      ? 'bg-white/14 text-white'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#FD5900]" />
                    <span>All Articles</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">
                    {metrics.total}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('categories')}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 'categories'
                      ? 'bg-white/14 text-white'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <FolderKanban className="w-4 h-4 text-sky-400" />
                    <span>Categories</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">
                    {categories.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 'media'
                      ? 'bg-white/14 text-white'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Media Library</span>
                  </span>
                </button>

                {BACKEND_TABS.filter((t) => isAdmin || !t.adminOnly).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === t.id
                        ? 'bg-white/14 text-white'
                        : 'text-slate-300 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <t.icon className={`w-4 h-4 ${t.color}`} />
                      <span>{t.label}</span>
                    </span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-white/14 text-white'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-amber-300" />
                    <span>Security &amp; Account</span>
                  </span>
                </button>

                {deletedStaticPosts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('trash')}
                    className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === 'trash'
                        ? 'bg-white/14 text-white'
                        : 'text-slate-300 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <ArchiveRestore className="w-4 h-4 text-rose-400" />
                      <span>Removed Baseline</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[10px]">
                      {deletedStaticPosts.length}
                    </span>
                  </button>
                )}
              </nav>
            </div>

            <div className="hidden lg:flex flex-col gap-2 pt-6 border-t border-white/10">
              <div className="px-2 pb-1">
                <p className="text-[11px] font-bold text-white truncate">
                  {session.admin?.email || 'Administrator'}
                </p>
                <p className="text-[10px] text-emerald-400">
                  ● {isAdmin ? 'Admin' : 'Editor'} · Connected
                </p>
              </div>

              <a
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/8 hover:bg-white/14 text-xs font-bold text-slate-200 no-underline"
              >
                <span>View Public Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => void logout()}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl hover:bg-red-500/15 text-xs font-bold text-red-300 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Workspace */}
          <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1500px] w-full mx-auto space-y-7">
            {/* Top Workspace Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
                  {activeTab === 'articles' && 'Blog Articles & Publications'}
                  {activeTab === 'categories' && 'Topic & Category Architecture'}
                  {activeTab === 'media' && 'Editorial Media Library'}
                  {activeTab === 'settings' && 'Security & Account'}
                  {activeTab === 'trash' && 'Removed Baseline Articles'}
                  {activeBackendTab?.title}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {activeTab === 'articles' &&
                    'Create, edit, feature, draft, or delete articles with instant live synchronization.'}
                  {activeTab === 'categories' &&
                    'Organize Eon8 category archives and topic taxonomy.'}
                  {activeTab === 'media' &&
                    'Upload cover visuals and inline illustrations or browse existing assets.'}
                  {activeTab === 'settings' &&
                    'Change your email or password and export a backup of the blog content.'}
                  {activeTab === 'trash' &&
                    'Restore previously removed baseline articles back to the live catalog.'}
                  {activeBackendTab?.description}
                </p>
              </div>

              <div className="flex lg:hidden items-center gap-2">
                <a
                  href="/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground no-underline"
                >
                  Live Blog ↗
                </a>
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="px-3 py-2 rounded-xl border border-red-500/30 text-xs font-bold text-red-500 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {loadingEditor && (
              <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-3 text-sm font-bold text-foreground">
                <span className="w-5 h-5 border-2 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
                <span>Opening Article Studio…</span>
              </div>
            )}

            {activeTab === 'categories' && <AdminCategoryManager />}

            {activeTab === 'media' && <AdminMediaLibrary mode="page" />}

            {activeTab === 'settings' && <AdminSettingsView />}

            {activeTab === 'leads' && <AdminLeadsView isAdmin={isAdmin} />}

            {activeTab === 'redirects' && <AdminRedirectsView />}

            {activeTab === 'seo' && <AdminSeoView />}

            {activeTab === 'site' && isAdmin && <AdminSiteSettingsView />}

            {activeTab === 'users' && isAdmin && <AdminUsersView currentUserId={session.admin?.id} />}

            {activeTab === 'activity' && isAdmin && <AdminActivityView />}

            {activeTab === 'trash' && (
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
                {deletedStaticPosts.length === 0 ? (
                  <div className="p-12 text-center text-sm text-muted-foreground">
                    No removed baseline articles.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[540px] text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border bg-muted/50 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                          <th className="py-3.5 px-5">Title</th>
                          <th className="py-3.5 px-5">Slug</th>
                          <th className="py-3.5 px-5 text-right">Restore</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-sm">
                        {deletedStaticPosts.map((item) => (
                          <tr key={item.id}>
                            <td className="py-3.5 px-5 font-semibold text-foreground">
                              {item.title}
                            </td>
                            <td className="py-3.5 px-5 text-xs font-mono text-muted-foreground">
                              /blog/{item.slug}
                            </td>
                            <td className="py-3.5 px-5 text-right">
                              <button
                                type="button"
                                onClick={() => void restoreStaticPost(item.id, item.slug)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                              >
                                <ArchiveRestore className="w-3.5 h-3.5" />
                                <span>Restore</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="space-y-6">
                {/* KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Total Articles
                    </p>
                    <p className="text-2xl font-heading font-extrabold text-foreground mt-1">
                      {metrics.total}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Published Live
                    </p>
                    <p className="text-2xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                      {metrics.published}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Private Drafts
                    </p>
                    <p className="text-2xl font-heading font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                      {metrics.drafts}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Featured Picks
                    </p>
                    <p className="text-2xl font-heading font-extrabold text-[#FD5900] mt-1">
                      {metrics.featured}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      CMS Added / Edited
                    </p>
                    <p className="text-2xl font-heading font-extrabold text-[#0053C6] dark:text-sky-400 mt-1">
                      {metrics.customOrEdited}
                    </p>
                  </div>
                </div>

                {/* Filter, Search & Sort Controls */}
                <div className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex flex-wrap rounded-xl bg-muted p-1 gap-1">
                      {(
                        [
                          ['all', `All (${metrics.total})`],
                          ['published', `Published (${metrics.published})`],
                          ['draft', `Drafts (${metrics.drafts})`],
                          ['featured', `Featured (${metrics.featured})`],
                          ['custom', `CMS Custom/Edited (${metrics.customOrEdited})`],
                        ] as const
                      ).map(([tabKey, label]) => (
                        <button
                          key={tabKey}
                          type="button"
                          onClick={() => {
                            setStatusFilter(tabKey);
                            setCurrentPage(1);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            statusFilter === tabKey
                              ? 'bg-card text-foreground shadow-xs'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={openBlankEditor}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-xs font-heading font-extrabold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Blog Post</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-6 relative">
                      <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="search"
                        placeholder="Search by title, slug, excerpt, category, or author..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <select
                        value={categoryFilter}
                        onChange={(e) => {
                          setCategoryFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs sm:text-sm text-foreground"
                      >
                        <option value="ALL">All Categories</option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs sm:text-sm text-foreground"
                      >
                        <option value="newest">Sort: Newest First</option>
                        <option value="updated">Sort: Recently Edited</option>
                        <option value="oldest">Sort: Oldest First</option>
                        <option value="title">Sort: Title A–Z</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi-Select Bulk Action Bar */}
                  {selectedIds.size > 0 && (
                    <div className="rounded-xl bg-[#06152D] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FD5900]" />
                        {selectedIds.size} article(s) selected
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={bulkBusy}
                          onClick={() => void handleBulkAction('publish')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold cursor-pointer"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          disabled={bulkBusy}
                          onClick={() => void handleBulkAction('draft')}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer"
                        >
                          Move to Draft
                        </button>
                        <button
                          type="button"
                          disabled={bulkBusy}
                          onClick={() => void handleBulkAction('feature')}
                          className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold cursor-pointer"
                        >
                          Feature
                        </button>
                        <button
                          type="button"
                          disabled={bulkBusy}
                          onClick={() => void handleBulkAction('delete')}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedIds(new Set())}
                          className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Articles Table */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
                  {pageArticles.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <p className="text-base font-heading font-bold text-foreground">
                        No articles match your current filters
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                          setCategoryFilter('ALL');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FD5900] text-white text-xs font-bold cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[820px]">
                        <thead>
                          <tr className="border-b border-border bg-muted/50 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                            <th className="py-3.5 pl-5 pr-2 w-10">
                              <input
                                type="checkbox"
                                checked={
                                  pageArticles.length > 0 &&
                                  pageArticles.every((p) => selectedIds.has(p.id))
                                }
                                onChange={toggleSelectAllOnPage}
                                aria-label="Select all articles on this page"
                              />
                            </th>
                            <th className="py-3.5 px-3 w-10 text-center">★</th>
                            <th className="py-3.5 px-4">Article</th>
                            <th className="py-3.5 px-4">Category</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Date</th>
                            <th className="py-3.5 px-5 text-right">CRUD Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-sm">
                          {pageArticles.map((post) => {
                            const isBusy = busyPostId === post.id;
                            const hasThumb = Boolean(
                              post.thumbnail && !post.thumbnail.includes('Logo_bg')
                            );

                            return (
                              <tr
                                key={post.id}
                                className="hover:bg-muted/35 transition-colors"
                              >
                                <td className="py-3.5 pl-5 pr-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedIds.has(post.id)}
                                    onChange={() =>
                                      setSelectedIds((prev) => {
                                        const next = new Set(prev);
                                        if (next.has(post.id)) next.delete(post.id);
                                        else next.add(post.id);
                                        return next;
                                      })
                                    }
                                    aria-label={`Select ${post.title}`}
                                  />
                                </td>

                                <td className="py-3.5 px-3 text-center">
                                  <button
                                    type="button"
                                    disabled={isBusy}
                                    title={
                                      post.featured
                                        ? 'Remove from Featured Spotlight'
                                        : 'Pin to Featured Spotlight'
                                    }
                                    onClick={() => {
                                      setBusyPostId(post.id);
                                      void quickUpdatePostMeta(post, {
                                        featured: !post.featured,
                                      }).finally(() => setBusyPostId(null));
                                    }}
                                    className="p-1 rounded-lg hover:bg-muted cursor-pointer"
                                  >
                                    <Star
                                      className={`w-4 h-4 ${
                                        post.featured
                                          ? 'text-[#FD5900] fill-[#FD5900]'
                                          : 'text-muted-foreground/50 hover:text-[#FD5900]'
                                      }`}
                                    />
                                  </button>
                                </td>

                                <td className="py-3.5 px-4 max-w-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-[#06152D] to-[#0053C6] shrink-0 border border-border flex items-center justify-center text-[10px] font-extrabold text-white">
                                      {hasThumb ? (
                                        <img
                                          src={post.thumbnail}
                                          alt=""
                                          loading="lazy"
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        'E8'
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <button
                                        type="button"
                                        onClick={() => void openEditorForSummary(post)}
                                        className="text-left font-heading font-bold text-foreground hover:text-[#FD5900] transition-colors line-clamp-1 cursor-pointer"
                                      >
                                        {post.title}
                                      </button>
                                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                                        <span className="font-mono truncate max-w-[230px]">
                                          /blog/{post.slug}
                                        </span>
                                        {post.source !== 'static' && (
                                          <span className="px-1.5 py-0.2 rounded bg-[#0053C6]/12 text-[#0053C6] dark:text-sky-400 font-bold text-[10px]">
                                            {post.source === 'cms' ? 'New' : 'Edited'}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <span className="inline-block px-2.5 py-1 rounded-full bg-muted text-xs font-semibold text-foreground">
                                    {post.category}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <button
                                    type="button"
                                    disabled={isBusy}
                                    title="Click to toggle Published / Draft"
                                    onClick={() => {
                                      setBusyPostId(post.id);
                                      void quickUpdatePostMeta(post, {
                                        status:
                                          post.status === 'published'
                                            ? 'draft'
                                            : 'published',
                                      }).finally(() => setBusyPostId(null));
                                    }}
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider cursor-pointer ${
                                      post.status === 'published'
                                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-amber-500/18 text-amber-700 dark:text-amber-300'
                                    }`}
                                  >
                                    {post.status}
                                  </button>
                                </td>

                                <td className="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
                                  <div>{post.date}</div>
                                  <div className="text-[11px] opacity-75">{post.author}</div>
                                </td>

                                <td className="py-3.5 px-5">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      type="button"
                                      title="Edit article"
                                      onClick={() => void openEditorForSummary(post)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0053C6]/10 hover:bg-[#0053C6] text-[#0053C6] dark:text-sky-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                      <span>Edit</span>
                                    </button>

                                    <button
                                      type="button"
                                      disabled={isBusy}
                                      title="Duplicate as Draft"
                                      onClick={() => void handleDuplicate(post)}
                                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>

                                    <a
                                      href={
                                        post.status === 'draft'
                                          ? `/blog/${post.slug}?preview=1`
                                          : `/blog/${post.slug}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={
                                        post.status === 'draft'
                                          ? 'Preview Draft'
                                          : 'Open Live Article'
                                      }
                                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>

                                    <button
                                      type="button"
                                      disabled={isBusy}
                                      title="Delete article"
                                      onClick={() => setDeleteTarget(post)}
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
                  )}

                  {/* Admin Table Pagination */}
                  {totalPages > 1 && (
                    <div className="px-5 py-3.5 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>
                        Showing {(safePage - 1) * ADMIN_ROWS_PER_PAGE + 1}–
                        {Math.min(safePage * ADMIN_ROWS_PER_PAGE, filteredArticles.length)}{' '}
                        of {filteredArticles.length} articles
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={safePage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-bold text-foreground disabled:opacity-40 cursor-pointer"
                        >
                          Prev
                        </button>
                        <span className="px-2 font-bold text-foreground">
                          Page {safePage} / {totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={safePage >= totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-bold text-foreground disabled:opacity-40 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>

          {/* Delete Confirmation Modal */}
          {deleteTarget && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl p-6 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-500">
                    Confirm Deletion
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-foreground">
                    Delete “{deleteTarget.title}”?
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This removes <code className="text-foreground">/blog/{deleteTarget.slug}</code>{' '}
                    from your public blog archive immediately.
                    {deleteTarget.source === 'static' &&
                      ' (Because this is a baseline article, you can still restore it anytime from Removed Baseline.)'}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-foreground cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={busyPostId === deleteTarget.id}
                    onClick={() => void handleConfirmDelete()}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    {busyPostId === deleteTarget.id ? 'Deleting…' : 'Delete Article'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminDashboardPage;
