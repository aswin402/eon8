import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Search, Sparkles, Tag } from 'lucide-react';
import { PageSeo, ServiceHeroSection } from '@/components/sections';
import {
  resolveCategoryNameFromSlug,
  resolveCategorySlug,
  useBlogCmsStore,
} from '@/lib/cms/blogStore';

const POSTS_PER_PAGE = 18;

function buildPaginationItems(current: number, total: number): (number | 'dots')[] {
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  if (current <= 2) {
    pages.add(2);
    pages.add(3);
  }
  if (current >= total - 1) {
    pages.add(total - 1);
    pages.add(total - 2);
  }
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const out: (number | 'dots')[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      out.push('dots');
    }
    out.push(sorted[i]);
  }
  return out;
}

export function BlogListPage() {
  const { pageNum, categorySlug } = useParams<{ pageNum?: string; categorySlug?: string }>();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const publishedPosts = useBlogCmsStore((s) => s.publishedPosts);
  const categories = useBlogCmsStore((s) => s.categories);
  const initPublic = useBlogCmsStore((s) => s.initPublic);

  useEffect(() => {
    void initPublic();
  }, [initPublic]);

  const queryCategory = searchParams.get('category');
  const activeCategoryName = useMemo(() => {
    if (categorySlug) {
      return resolveCategoryNameFromSlug(categorySlug, categories);
    }
    if (queryCategory && queryCategory !== 'All') {
      return queryCategory;
    }
    return null;
  }, [categorySlug, queryCategory, categories]);

  const featuredPosts = useMemo(
    () => publishedPosts.filter((p) => p.featured).slice(0, 3),
    [publishedPosts]
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return publishedPosts.filter((post) => {
      if (activeCategoryName) {
        const cats = post.categories?.length ? post.categories : [post.category];
        if (!cats.some((c) => c.toLowerCase() === activeCategoryName.toLowerCase())) {
          return false;
        }
      }
      if (q) {
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [publishedPosts, activeCategoryName, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const parsedPage = pageNum ? parseInt(pageNum, 10) : 1;
  const currentPage =
    searchQuery.trim().length > 0
      ? 1
      : Number.isFinite(parsedPage) && parsedPage >= 1
        ? Math.min(parsedPage, totalPages)
        : 1;

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const pageUrl = (page: number) => {
    if (categorySlug) {
      return page === 1 ? `/category/${categorySlug}` : `/category/${categorySlug}/page/${page}`;
    }
    if (queryCategory) {
      return `/blog?category=${encodeURIComponent(queryCategory)}`;
    }
    return page === 1 ? '/blog' : `/blog/page/${page}`;
  };

  const paginationItems = buildPaginationItems(currentPage, totalPages);
  const showFeaturedSpotlight =
    featuredPosts.length > 0 && !activeCategoryName && !searchQuery.trim() && currentPage === 1;

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title={
          activeCategoryName
            ? `${activeCategoryName} Archives - Eon8`
            : 'Digital Marketing Blogs & Social Media Blogs Provider in Chennai'
        }
        description="Stay updated with the latest news, events, and other interesting information on Digital Marketing, AI Agents, SEO, Social Media, and Web3 from Eon8."
      />

      {/* 1. Hero Header */}
      <ServiceHeroSection
        theme="brand"
        layout="centered"
        badge="EON8 Knowledge Hub"
        heading={activeCategoryName || 'Insights, Playbooks & Growth Research'}
        paragraphs={[
          `Explore ${publishedPosts.length} in-depth articles covering SEO, AI Agents, Performance Marketing, Reputation Management, and Web3 growth.`,
        ]}
      />

      {/* 2. Search & Category Filter Bar */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-border bg-slate-50/70 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search articles, topics, or strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
              />
            </div>

            {activeCategoryName && (
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View All Articles ({publishedPosts.length})</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <Link
              to="/blog"
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap border transition-colors no-underline ${
                !activeCategoryName
                  ? 'bg-[#FD5900] text-white border-[#FD5900]'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              All ({publishedPosts.length})
            </Link>
            {categories.map((cat) => {
              const isSelected =
                activeCategoryName?.toLowerCase() === cat.name.toLowerCase();
              return (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap border transition-colors no-underline ${
                    isSelected
                      ? 'bg-[#FD5900] text-white border-[#FD5900]'
                      : 'bg-card text-muted-foreground border-border hover:text-foreground'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Spotlight (when featured posts exist) */}
      {showFeaturedSpotlight && (
        <section className="pt-12 pb-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FD5900]">
              <Sparkles className="w-4 h-4" />
              <span>Featured Editorial Picks</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={`featured-${post.slug}`}
                  to={`/blog/${post.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#06152D] via-[#0B224B] to-[#0053C6] p-6 text-white border border-white/10 shadow-lg hover:shadow-xl transition-all no-underline flex flex-col justify-between min-h-[210px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FD5900] text-white text-[11px] font-extrabold uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="text-xs text-slate-300">{post.readTime}</span>
                  </div>
                  <div className="space-y-2 mt-6">
                    <span className="text-xs font-bold text-orange-300">{post.category}</span>
                    <h2 className="text-lg sm:text-xl font-heading font-extrabold leading-snug group-hover:text-orange-200 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-slate-200/85 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. 3-Column Blog Cards Grid */}
      <section className="py-14 sm:py-18 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                No matching articles found
              </h2>
              <p className="text-muted-foreground">
                Try clearing your search query or choosing another category.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-xl bg-[#FD5900] text-white font-bold text-sm cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginatedPosts.map((post) => {
                const postUrl = `/blog/${post.slug}`;
                const catSlug = resolveCategorySlug(post.category, categories);
                const hasRealThumb = Boolean(
                  post.thumbnail && !post.thumbnail.includes('Logo_bg')
                );

                return (
                  <article
                    key={post.slug}
                    className="group rounded-2xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        to={postUrl}
                        className="relative block aspect-[16/9] overflow-hidden bg-slate-900 no-underline"
                      >
                        {hasRealThumb ? (
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#061229] via-[#0B224B] to-[#0053C6] p-6 flex flex-col justify-between text-white">
                            <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-orange-300">
                              EON8 Insights
                            </span>
                            <span className="text-base sm:text-lg font-heading font-extrabold leading-snug line-clamp-2 text-white">
                              {post.title}
                            </span>
                          </div>
                        )}
                        {post.featured && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FD5900] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                            Featured
                          </span>
                        )}
                      </Link>

                      <div className="p-6 space-y-3.5">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <Link
                            to={`/category/${catSlug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0053C6]/10 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400 font-bold no-underline"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{post.category}</span>
                          </Link>

                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </span>

                          {post.readTime && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{post.readTime}</span>
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground leading-snug group-hover:text-[#FD5900] transition-colors">
                          <Link to={postUrl} className="no-underline text-inherit">
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <Link
                        to={postUrl}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 group-hover:text-[#FD5900] transition-colors no-underline"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!searchQuery.trim() && totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-14 flex flex-wrap items-center justify-center gap-2"
            >
              {currentPage > 1 && (
                <Link
                  to={pageUrl(currentPage - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-bold text-foreground hover:border-[#FD5900] no-underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Link>
              )}

              {paginationItems.map((item, idx) =>
                item === 'dots' ? (
                  <span key={`dots-${idx}`} className="px-2 text-muted-foreground font-bold">
                    …
                  </span>
                ) : (
                  <Link
                    key={item}
                    to={pageUrl(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors no-underline ${
                      item === currentPage
                        ? 'bg-[#FD5900] text-white border-[#FD5900] shadow-md'
                        : 'bg-card text-foreground border-border hover:border-[#FD5900]'
                    }`}
                  >
                    {item}
                  </Link>
                )
              )}

              {currentPage < totalPages && (
                <Link
                  to={pageUrl(currentPage + 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-bold text-foreground hover:border-[#FD5900] no-underline"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogListPage;
