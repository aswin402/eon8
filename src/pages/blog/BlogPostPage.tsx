import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye, Pencil, Tag, User } from 'lucide-react';
import { LeadCaptureCard, PageSeo } from '@/components/sections';
import {
  ADMIN_DASHBOARD_PATH,
  resolveCategorySlug,
  useBlogCmsStore,
} from '@/lib/cms/blogStore';
import type { ManagedBlogPost } from '@/lib/cms/types';
import { ArticleBlocksRenderer } from './ArticleBlocksRenderer';

function formatDayMonthYear(dateIso: string, fallback: string): string {
  if (!dateIso) return fallback;
  const parts = dateIso.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return fallback;
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

interface BlogPostPageProps {
  slug?: string;
}

export function BlogPostPage({ slug: propSlug }: BlogPostPageProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPreviewParam = searchParams.get('preview') === '1';

  const activeSlug = (propSlug || paramSlug || '').replace(/^\/+|\/+$/g, '');

  const publicReady = useBlogCmsStore((s) => s.publicReady);
  const publishedPosts = useBlogCmsStore((s) => s.publishedPosts);
  const publishedBySlug = useBlogCmsStore((s) => s.publishedBySlug);
  const adminPosts = useBlogCmsStore((s) => s.adminPosts);
  const categories = useBlogCmsStore((s) => s.categories);
  const slugRedirects = useBlogCmsStore((s) => s.slugRedirects);
  const session = useBlogCmsStore((s) => s.session);
  const initPublic = useBlogCmsStore((s) => s.initPublic);
  const checkSession = useBlogCmsStore((s) => s.checkSession);
  const loadPostForDisplay = useBlogCmsStore((s) => s.loadPostForDisplay);

  const [loaded, setLoaded] = useState<{
    key: string;
    post: ManagedBlogPost | null;
  } | null>(null);

  useEffect(() => {
    void initPublic();
    if (isPreviewParam) {
      void checkSession();
    }
  }, [initPublic, checkSession, isPreviewParam]);

  const redirectTarget = slugRedirects[activeSlug];

  const summary = useMemo(() => {
    if (isPreviewParam && session.authenticated) {
      const draftOrPub = adminPosts.find((p) => p.slug === activeSlug);
      if (draftOrPub) return draftOrPub;
    }
    return publishedBySlug[activeSlug];
  }, [activeSlug, isPreviewParam, session.authenticated, adminPosts, publishedBySlug]);

  const loadKey = `${activeSlug}:${isPreviewParam && session.authenticated ? 'preview' : 'pub'}:${summary?.updatedAt || ''}`;

  useEffect(() => {
    if (!activeSlug || redirectTarget) return;
    let cancelled = false;
    loadPostForDisplay(activeSlug, isPreviewParam).then((data) => {
      if (!cancelled) {
        setLoaded({ key: loadKey, post: data });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [activeSlug, redirectTarget, isPreviewParam, loadKey, loadPostForDisplay]);

  const currentIndex = useMemo(
    () => (summary ? publishedPosts.findIndex((p) => p.slug === summary.slug) : -1),
    [summary, publishedPosts]
  );

  const prevChronologicalPost =
    currentIndex >= 0 && currentIndex < publishedPosts.length - 1
      ? publishedPosts[currentIndex + 1]
      : undefined;
  const newerChronologicalPost =
    currentIndex > 0 ? publishedPosts[currentIndex - 1] : undefined;

  const recentSidebarPosts = useMemo(() => publishedPosts.slice(0, 6), [publishedPosts]);

  if (redirectTarget && redirectTarget !== activeSlug) {
    return <Navigate to={`/blog/${redirectTarget}`} replace />;
  }

  const currentPost = loaded?.key === loadKey ? loaded.post : null;
  const isLoading = !publicReady || loaded?.key !== loadKey;

  if (!summary && !isLoading && !currentPost) {
    return (
      <div className="min-h-[65vh] pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Article Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The requested blog article could not be located.
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 rounded-xl bg-[#FD5900] text-white font-bold text-sm hover:bg-[#e55000] transition-colors no-underline"
        >
          Back to All Articles
        </Link>
      </div>
    );
  }

  const effectiveSummary = currentPost || summary;
  if (!effectiveSummary) {
    return (
      <div className="min-h-[65vh] pt-32 pb-24 flex items-center justify-center">
        <div className="w-9 h-9 border-3 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const catSlug = resolveCategorySlug(effectiveSummary.category, categories);
  const formattedDate = formatDayMonthYear(effectiveSummary.dateIso, effectiveSummary.date);
  const firstBlockIsImg = currentPost?.blocks[0]?.type === 'image';
  const showTopThumb = Boolean(effectiveSummary.thumbnail) && !firstBlockIsImg;
  const seoTitle = effectiveSummary.seo?.metaTitle?.trim()
    ? effectiveSummary.seo.metaTitle
    : `${effectiveSummary.title} - Eon8`;
  const seoDesc = effectiveSummary.seo?.metaDescription?.trim()
    ? effectiveSummary.seo.metaDescription
    : effectiveSummary.excerpt;
  const seoImage = effectiveSummary.seo?.ogImage?.trim() || effectiveSummary.thumbnail;
  const isDraftView = effectiveSummary.status === 'draft';

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title={seoTitle}
        description={seoDesc}
        canonicalPath={`/blog/${effectiveSummary.slug}`}
        ogImage={seoImage}
        noIndex={isDraftView}
        article={{
          publishedTime: effectiveSummary.dateIso,
          modifiedTime: effectiveSummary.updatedAt,
          author: effectiveSummary.author || 'EON8 Editorial Team',
          section: effectiveSummary.category,
        }}
      />

      {isDraftView && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 text-xs sm:text-sm font-bold flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            Draft Preview — Hidden from public readers and search engines
          </span>
          <Link
            to={`${ADMIN_DASHBOARD_PATH}?edit=${effectiveSummary.id}`}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-950 text-white hover:bg-slate-800 transition-colors no-underline"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit in Studio
          </Link>
        </div>
      )}

      {/* Article Hero Header */}
      <header className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#06152d] via-[#0a2558] to-[#0053C6] text-white">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-white/85 hover:text-[#FD5900] font-semibold no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Blog</span>
            </Link>
            <span>/</span>
            <Link
              to={`/category/${catSlug}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-white font-bold no-underline"
            >
              <Tag className="w-3.5 h-3.5 text-[#FD5900]" />
              <span>{effectiveSummary.category}</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-[1.16] tracking-tight">
            {effectiveSummary.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-200 pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FD5900]" />
              <time dateTime={effectiveSummary.dateIso}>{formattedDate}</time>
            </span>

            {effectiveSummary.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#FD5900]" />
                <span>{effectiveSummary.author}</span>
              </span>
            )}

            {effectiveSummary.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FD5900]" />
                <span>{effectiveSummary.readTime}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Article + Sidebar */}
      <section className="py-12 sm:py-16 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Article Body */}
          {/* min-w-0 + overflow-wrap: long links and words wrap instead of widening the page on small phones */}
          <article className="lg:col-span-8 min-w-0 break-words [overflow-wrap:anywhere] rounded-2xl bg-card border border-border p-6 sm:p-10 shadow-sm">
            {showTopThumb && (
              <img
                src={effectiveSummary.thumbnail}
                alt={effectiveSummary.title}
                className="w-full h-auto rounded-2xl border border-border mb-8 object-cover"
              />
            )}

            {isLoading ? (
              <div className="py-20 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div>
                <ArticleBlocksRenderer blocks={currentPost?.blocks ?? []} />
              </div>
            )}

            {/* Prev / Next Navigation */}
            <nav
              aria-label="Article navigation"
              className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prevChronologicalPost ? (
                <Link
                  to={`/blog/${prevChronologicalPost.slug}`}
                  className="group rounded-xl border border-border p-4 hover:border-[#FD5900] transition-colors no-underline space-y-1"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
                  </span>
                  <p className="text-sm font-heading font-bold text-foreground group-hover:text-[#FD5900] line-clamp-2">
                    {prevChronologicalPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {newerChronologicalPost && (
                <Link
                  to={`/blog/${newerChronologicalPost.slug}`}
                  className="group rounded-xl border border-border p-4 hover:border-[#FD5900] transition-colors no-underline sm:text-right space-y-1"
                >
                  <span className="inline-flex items-center sm:justify-end gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Next Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm font-heading font-bold text-foreground group-hover:text-[#FD5900] line-clamp-2">
                    {newerChronologicalPost.title}
                  </p>
                </Link>
              )}
            </nav>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <LeadCaptureCard
              id="blog-sidebar-enquiry"
              heading="Request Free Growth Audit"
              subheading="Speak directly with an EON8 strategist about your brand goals."
              submitLabel="Get Free Consultation"
              compact
            />

            <div className="rounded-2xl bg-card border border-border p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-heading font-extrabold text-foreground pb-3 border-b border-border">
                Recent Articles
              </h2>
              <ul className="space-y-3.5">
                {recentSidebarPosts.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/blog/${item.slug}`}
                      className="group block space-y-1 no-underline"
                    >
                      <h3 className="text-sm font-heading font-bold text-foreground group-hover:text-[#FD5900] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-heading font-extrabold text-foreground pb-3 border-b border-border">
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-foreground hover:bg-[#FD5900] hover:text-white transition-colors no-underline"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default BlogPostPage;
