import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ServiceNodeList } from '@/pages/services/components/ServiceNodeRenderer';
import type { ServiceNode } from '@/pages/services/types';
import {
  BLOG_CATEGORY_PAIRS,
  blogPostsIndex,
  blogPostsBySlug,
  getSlugForCategory,
  loadBlogPost,
  type BlogPost,
} from './blogPostsData';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/ai-core-blog-pages.css';

interface BlogPostPageProps {
  slug?: string;
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

function startsWithImageOrFigure(nodes: ServiceNode[] | undefined): boolean {
  if (!nodes) return false;
  for (const node of nodes) {
    if (node.kind === 'text' && !node.value.trim()) continue;
    if (node.kind === 'element' && (node.tag === 'figure' || node.tag === 'img')) {
      return true;
    }
    return false;
  }
  return false;
}

export function BlogPostPage({ slug: propSlug }: BlogPostPageProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const activeSlug = (propSlug || paramSlug || '').replace(/^\/+|\/+$/g, '');
  const summary = blogPostsBySlug[activeSlug];

  const [loaded, setLoaded] = useState<{ slug: string; post: BlogPost | null } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (summary) {
      document.title = `${summary.title} - Eon8`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', summary.excerpt);
      }
    }

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

  const recentSidebarPosts = useMemo(() => blogPostsIndex.slice(0, 7), []);

  if (!summary) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Article Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The requested blog article could not be located.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-full bg-[#FD5900] text-white font-bold text-sm hover:bg-[#e55000] transition-colors"
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
  const showTopThumb =
    Boolean(summary.thumbnail) && !startsWithImageOrFigure(currentPost?.contentNodes);

  return (
    <div className="eon8-live-page blog-page-scope is-single-post single">
      <div id="site-content">
        <main>
          <header className="page_title_wrap">
            <div className="container">
              <h1 className="page_title">{summary.title}</h1>
            </div>
          </header>

          <div className="blog-single-wrap">
            <div className="blog-single-grid">
              {/* Article Column */}
              <div>
                <div className="sin_meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <svg
                      height="14"
                      viewBox="0 0 20 20"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="10" fill="none" r="8.5" stroke="#f7821b" strokeWidth="1.5" />
                      <path d="M10 5v5.2l3.4 2.2" fill="none" stroke="#f7821b" strokeWidth="1.5" />
                    </svg>
                    <time dateTime={summary.dateIso}>{formattedDate}</time>
                  </span>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <svg
                      height="14"
                      viewBox="0 0 20 20"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 Z"
                        fill="none"
                        stroke="#f7821b"
                        strokeWidth="1.4"
                      />
                      <circle cx="14" cy="6" r="1.1" fill="#f7821b" />
                    </svg>
                    <Link to={`/category/${catSlug}`}>{summary.category}</Link>
                  </span>
                </div>

                {showTopThumb && (
                  <div className="sing_thmup">
                    <img
                      src={summary.thumbnail}
                      alt={summary.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                )}

                <article className="post">
                  {isLoading && !currentPost ? (
                    <div style={{ padding: '24px 0', color: '#64748b' }}>Loading article…</div>
                  ) : currentPost?.contentNodes?.length ? (
                    <div className="post-content">
                      <ServiceNodeList nodes={currentPost.contentNodes} />
                    </div>
                  ) : (
                    <div className="post-content">
                      <p>{summary.excerpt}</p>
                    </div>
                  )}
                </article>

                {prevChronologicalPost && (
                  <div className="post-nav-box">
                    <Link to={`/blog/${prevChronologicalPost.slug}`} rel="prev">
                      &lt; {prevChronologicalPost.title}
                    </Link>
                  </div>
                )}

                {newerChronologicalPost && (
                  <div className="post-nav-box" style={{ marginTop: 14 }}>
                    <Link to={`/blog/${newerChronologicalPost.slug}`} rel="next">
                      {newerChronologicalPost.title} &gt;
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <aside className="sidebar post-sidebar">
                <div className="widget widget_categories" id="categories-2">
                  <p className="uk-h4">Categories</p>
                  <ul>
                    {BLOG_CATEGORY_PAIRS.map((cat) => (
                      <li key={cat.slug} className="cat-item">
                        <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="widget widget_recent_entries" id="recent-posts-3">
                  <p className="uk-h4">Recent Posts</p>
                  <ul>
                    {recentSidebarPosts.map((rPost) => (
                      <li key={rPost.slug}>
                        <Link
                          to={`/blog/${rPost.slug}`}
                          aria-current={rPost.slug === summary.slug ? 'page' : undefined}
                        >
                          {rPost.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BlogPostPage;
