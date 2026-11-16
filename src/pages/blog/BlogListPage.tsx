import { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  blogPostsIndex,
  getCategoryNameBySlug,
  getSlugForCategory,
} from './blogPostsData';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/ai-core-blog-pages.css';

const POSTS_PER_PAGE = 20;

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

  const queryCategory = searchParams.get('category');
  const activeCategoryName = useMemo(() => {
    if (categorySlug) {
      return getCategoryNameBySlug(categorySlug);
    }
    if (queryCategory && queryCategory !== 'All') {
      return queryCategory;
    }
    return null;
  }, [categorySlug, queryCategory]);

  const filteredPosts = useMemo(() => {
    if (!activeCategoryName) return blogPostsIndex;
    const target = activeCategoryName.toLowerCase();
    return blogPostsIndex.filter((post) => {
      const cats = post.categories?.length ? post.categories : [post.category];
      return cats.some((c) => c.toLowerCase() === target);
    });
  }, [activeCategoryName]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const parsedPage = pageNum ? parseInt(pageNum, 10) : 1;
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage >= 1 ? Math.min(parsedPage, totalPages) : 1;

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = activeCategoryName
      ? `${activeCategoryName} Archives - Eon8`
      : 'Digital Marketing Blogs & Social Media Blogs Provider in Chennai';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Stay updated with the latest news, events, and other interesting information on Digital Marketing, AI Agents, SEO, Social Media, and Web3 from Eon8.'
      );
    }
  }, [activeCategoryName, currentPage]);

  const pageUrl = (page: number) => {
    if (categorySlug) {
      return page === 1
        ? `/category/${categorySlug}`
        : `/category/${categorySlug}/page/${page}`;
    }
    if (queryCategory) {
      return `/blog?category=${encodeURIComponent(queryCategory)}`;
    }
    return page === 1 ? '/blog' : `/blog/page/${page}`;
  };

  const paginationItems = buildPaginationItems(currentPage, totalPages);

  return (
    <div className="eon8-live-page blog-page-scope">
      <div id="site-content">
        <main>
          <header className="page_title_wrap">
            <div className="container">
              <h1 className="page_title">{activeCategoryName || 'Blog'}</h1>
            </div>
          </header>

          <section className="blog-hub-section">
            <div className="container">
              {activeCategoryName && (
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <Link
                    to="/blog"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#0022ff',
                      textDecoration: 'none',
                    }}
                  >
                    ← View All Blog Posts ({blogPostsIndex.length})
                  </Link>
                </div>
              )}

              <div
                className="bdpp-wrap bdpp-lite bdpp-post-grid-wrap bdpp-post-data-wrap bdpp-design-1 bdpp-grid-3 bdpp-clearfix"
                id="bdpp-post-grid-1"
              >
                <div className="bdpp-post-grid-inr-wrap bdpp-post-data-inr-wrap bdpp-clearfix">
                  {paginatedPosts.map((post) => {
                    const postUrl = `/blog/${post.slug}`;
                    const catSlug = getSlugForCategory(post.category);
                    const thumb =
                      post.thumbnail || '/wp-content/uploads/2026/03/Logo_bg-1.png';

                    return (
                      <div
                        key={post.slug}
                        className="bdpp-post-grid bdpp-col-3 bdpp-columns bdpp-post-standard bdpp-has-thumb"
                      >
                        <div className="bdpp-post-grid-content">
                          <div className="bdpp-post-img-bg">
                            <Link to={postUrl}>
                              <img
                                alt={post.title}
                                className="bdpp-img bdpp-post-feat-img"
                                decoding="async"
                                loading="lazy"
                                src={thumb}
                              />
                            </Link>
                          </div>

                          <div className="bdpp-post-cats">
                            <Link
                              className="bdpp-post-cat-link"
                              to={`/category/${catSlug}`}
                            >
                              {post.category}
                            </Link>
                          </div>

                          <h2 className="bdpp-post-title">
                            <Link to={postUrl}>{post.title}</Link>
                          </h2>

                          <div className="bdpp-post-meta bdpp-post-meta-up">
                            <span className="bdpp-post-meta-data bdpp-post-author">
                              <i
                                aria-hidden="true"
                                className="bdpp-fa fa-solid fa-user"
                                style={{ marginRight: 5 }}
                              />
                              {post.author}
                            </span>
                            <span className="bdpp-post-meta-sep">–</span>
                            <span className="bdpp-post-meta-data bdpp-post-date">
                              <i
                                aria-hidden="true"
                                className="bdpp-fa fa-regular fa-clock"
                                style={{ marginRight: 5 }}
                              />
                              {post.date}
                            </span>
                          </div>

                          <div className="bdpp-post-content">
                            <div className="bdpp-post-desc">{post.excerpt}</div>
                            <Link className="bdpp-rdmr-btn" to={postUrl}>
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <nav aria-label="Blog pagination" className="bdpp-paging bdpp-clearfix">
                    {currentPage > 1 && (
                      <Link className="prev page-numbers" to={pageUrl(currentPage - 1)}>
                        « Previous
                      </Link>
                    )}

                    {paginationItems.map((item, idx) =>
                      item === 'dots' ? (
                        <span key={`dots-${idx}`} className="page-numbers dots">
                          …
                        </span>
                      ) : item === currentPage ? (
                        <span
                          key={item}
                          aria-current="page"
                          className="page-numbers current"
                        >
                          {item}
                        </span>
                      ) : (
                        <Link key={item} className="page-numbers" to={pageUrl(item)}>
                          {item}
                        </Link>
                      )
                    )}

                    {currentPage < totalPages && (
                      <Link className="next page-numbers" to={pageUrl(currentPage + 1)}>
                        Next »
                      </Link>
                    )}
                  </nav>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default BlogListPage;
