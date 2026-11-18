import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from 'lucide-react';
import { PageSeo, SmartActionButton } from '@/components/sections';
import { RichText } from '@/pages/crypto/components/RichText';
import {
  BLOG_CATEGORY_PAIRS,
  blogPostsBySlug,
  blogPostsIndex,
  getSlugForCategory,
  loadBlogPost,
  type ArticleBlock,
  type BlogPost,
} from './blogPostsData';

function ArticleFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <figure className="my-7 space-y-2">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-auto rounded-2xl border border-border shadow-sm mx-auto"
      />
      {caption && (
        <figcaption className="text-center text-xs text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

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

function renderArticleBlock(block: ArticleBlock, idx: number) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-heading font-extrabold text-foreground mt-8 mb-3.5 leading-snug"
          >
            {block.text}
          </h2>
        );
      }
      if (block.level === 3) {
        return (
          <h3
            key={idx}
            className="text-lg sm:text-xl font-heading font-bold text-foreground mt-6 mb-2.5 leading-snug"
          >
            {block.text}
          </h3>
        );
      }
      return (
        <h4
          key={idx}
          className="text-base sm:text-lg font-heading font-bold text-foreground mt-5 mb-2"
        >
          {block.text}
        </h4>
      );

    case 'paragraph':
      return (
        <p key={idx} className="text-[16px] sm:text-[17px] text-muted-foreground leading-[1.8] mb-5">
          <RichText nodes={block.content} />
        </p>
      );

    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={idx}
          className={`${
            block.ordered ? 'list-decimal' : 'list-disc'
          } pl-6 space-y-2.5 mb-6 text-[16px] text-muted-foreground`}
        >
          {block.items.map((item, iIdx) => (
            <li key={iIdx} className="leading-[1.75]">
              <RichText nodes={item} />
            </li>
          ))}
        </ListTag>
      );
    }

    case 'image':
      return (
        <ArticleFigure
          key={idx}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      );

    case 'blockquote':
      return (
        <blockquote
          key={idx}
          className="my-6 border-l-4 border-[#FD5900] bg-orange-500/[0.06] rounded-r-2xl py-4 px-6 italic text-foreground text-base leading-relaxed"
        >
          <RichText nodes={block.content} />
        </blockquote>
      );

    case 'table':
      return (
        <div
          key={idx}
          className="my-7 rounded-2xl border border-border bg-card overflow-x-auto shadow-xs"
        >
          <table className="w-full min-w-[520px] border-collapse text-left">
            {block.headers.length > 0 && (
              <thead>
                <tr className="bg-slate-900 text-white">
                  {block.headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-3.5 px-5 text-sm font-heading font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-border">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-3 px-5 text-sm text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'cta':
      return (
        <div key={idx} className="my-6">
          <SmartActionButton
            action={{
              label: block.label,
              href: block.href,
              external: block.href.startsWith('http'),
              variant: 'primary',
            }}
          />
        </div>
      );

    default:
      return null;
  }
}

interface BlogPostPageProps {
  slug?: string;
}

export function BlogPostPage({ slug: propSlug }: BlogPostPageProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const activeSlug = (propSlug || paramSlug || '').replace(/^\/+|\/+$/g, '');
  const summary = blogPostsBySlug[activeSlug];

  const [loaded, setLoaded] = useState<{ slug: string; post: BlogPost | null } | null>(null);

  useEffect(() => {
    if (!activeSlug || !summary) return;
    let cancelled = false;
    loadBlogPost(activeSlug).then((data) => {
      if (!cancelled) {
        setLoaded({ slug: activeSlug, post: data });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [activeSlug, summary]);

  const currentIndex = useMemo(
    () => (summary ? blogPostsIndex.findIndex((p) => p.slug === summary.slug) : -1),
    [summary]
  );

  const prevChronologicalPost =
    currentIndex >= 0 && currentIndex < blogPostsIndex.length - 1
      ? blogPostsIndex[currentIndex + 1]
      : undefined;
  const newerChronologicalPost =
    currentIndex > 0 ? blogPostsIndex[currentIndex - 1] : undefined;

  const recentSidebarPosts = useMemo(() => blogPostsIndex.slice(0, 6), []);

  if (!summary) {
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

  const currentPost = loaded?.slug === activeSlug ? loaded.post : null;
  const isLoading = loaded?.slug !== activeSlug;
  const catSlug = getSlugForCategory(summary.category);
  const formattedDate = formatDayMonthYear(summary.dateIso, summary.date);
  const firstBlockIsImg = currentPost?.blocks[0]?.type === 'image';
  const showTopThumb = Boolean(summary.thumbnail) && !firstBlockIsImg;

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title={`${summary.title} - Eon8`}
        description={summary.excerpt}
        canonicalPath={`/blog/${summary.slug}`}
      />

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
              <span>{summary.category}</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-[1.16] tracking-tight">
            {summary.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-200 pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FD5900]" />
              <time dateTime={summary.dateIso}>{formattedDate}</time>
            </span>

            {summary.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#FD5900]" />
                <span>{summary.author}</span>
              </span>
            )}

            {summary.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FD5900]" />
                <span>{summary.readTime}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Article + Sidebar */}
      <section className="py-12 sm:py-16 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Article Body */}
          <article className="lg:col-span-8 rounded-2xl bg-card border border-border p-6 sm:p-10 shadow-sm">
            {showTopThumb && (
              <img
                src={summary.thumbnail}
                alt={summary.title}
                className="w-full h-auto rounded-2xl border border-border mb-8 object-cover"
              />
            )}

            {isLoading ? (
              <div className="py-20 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div>
                {currentPost?.blocks.map((block, idx) => renderArticleBlock(block, idx))}
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
                {BLOG_CATEGORY_PAIRS.map((cat) => (
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
