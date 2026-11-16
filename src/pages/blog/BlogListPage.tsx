import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogCategories, blogPostsIndex } from './blogPostsData';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  User,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

const POSTS_PER_PAGE = 12;

export function BlogListPage() {
  const { setContactModalOpen } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(
    blogCategories.includes(initialCat) ? initialCat : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'Digital Marketing, AI & Web3 Blog | Eon8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore actionable strategies, technical breakdowns, and growth insights on AI agents, digital marketing, SEO, social media, and Web3 from Eon8.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPostsIndex.length };
    for (const post of blogPostsIndex) {
      for (const cat of post.categories || [post.category]) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    }
    return counts;
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return blogPostsIndex.filter((post) => {
      const postCats = post.categories?.length ? post.categories : [post.category];
      const matchesCategory =
        selectedCategory === 'All' || postCats.includes(selectedCategory);
      const matchesSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        postCats.some((cat) => cat.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const showFeatured = selectedCategory === 'All' && searchQuery.trim() === '' && currentPage === 1;
  const featuredPost = showFeatured ? filteredPosts[0] : undefined;
  const gridSource = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.max(1, Math.ceil(gridSource.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = gridSource.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-body">
      {/* Live Eon8 Blog Header Banner */}
      <header
        className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-center pt-20 pb-10 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11, 27, 63, 0.88), rgba(0, 83, 198, 0.72)), url('/wp-content/uploads/2019/08/page_title_bg.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs text-white/80 mb-5">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-white font-semibold">Blog</span>
          </div>

          <div className="relative inline-block pl-4 sm:pl-5 py-1">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-1 w-[54px] sm:w-[65px] h-[calc(100%+10px)] bg-[#f7821b] -z-10"
            />
            <h1 className="text-3xl sm:text-4xl font-heading font-bold uppercase tracking-wide text-white leading-tight m-0">
              Eon8 Insights &amp; Blog
            </h1>
          </div>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
            Playbooks, industry analysis, and growth frameworks across AI Agents, SEO, Performance Ads, ERP/CRM engineering, and Web3 marketing.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 sm:space-y-14">
        {/* Featured Spotlight */}
        {featuredPost && (
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-md hover:border-[#FD5900]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-5 sm:p-8">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="lg:col-span-6 overflow-hidden rounded-2xl relative group block"
            >
              <img
                src={featuredPost.thumbnail || '/wp-content/uploads/2026/03/Logo_bg-1.png'}
                alt={featuredPost.title}
                className="w-full h-56 sm:h-72 lg:h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#FD5900] text-white text-xs font-bold rounded-full shadow-md">
                  Latest Post
                </span>
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                  {featuredPost.category}
                </span>
              </div>
            </Link>

            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FD5900]" />
                  {featuredPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FD5900]" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-snug">
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="hover:text-[#0053c6] dark:hover:text-blue-400 transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FD5900]" />
                  <span>By {featuredPost.author}</span>
                </span>
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button className="rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-sm cursor-pointer">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search & Categories */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 169 articles by keyword or topic..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-11 pl-10 pr-9 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-[#0053c6] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <span className="text-xs sm:text-sm text-muted-foreground font-semibold">
              Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              if (count === 0 && cat !== 'All') return null;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#FD5900] text-white shadow-sm'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-[#FD5900]/40'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginatedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#FD5900]/40 transition-all duration-300 flex flex-col justify-between group text-left"
                >
                  <div>
                    <Link to={`/blog/${post.slug}`} className="relative overflow-hidden h-48 block">
                      <img
                        src={post.thumbnail || '/wp-content/uploads/2026/03/Logo_bg-1.png'}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white rounded-lg text-[10px] font-bold">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#FD5900]" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#FD5900]" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-heading font-extrabold text-foreground line-clamp-2 leading-snug group-hover:text-[#0053c6] dark:group-hover:text-blue-400 transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                      <User className="w-3 h-3 text-[#FD5900]" />
                      <span>{post.author}</span>
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#FD5900] hover:text-[#e55000] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Blog pagination"
                className="flex flex-wrap items-center justify-center gap-2 pt-4"
              >
                <Button
                  type="button"
                  variant="outline"
                  disabled={safePage <= 1}
                  onClick={() => goToPage(safePage - 1)}
                  className="rounded-xl h-10 px-3 text-xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2
                  )
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    return (
                      <span key={page} className="inline-flex items-center gap-2">
                        {prev && page - prev > 1 && (
                          <span className="px-1 text-muted-foreground text-xs">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            page === safePage
                              ? 'bg-[#FD5900] text-white shadow-sm'
                              : 'bg-card border border-border text-foreground hover:border-[#FD5900]/50'
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    );
                  })}

                <Button
                  type="button"
                  variant="outline"
                  disabled={safePage >= totalPages}
                  onClick={() => goToPage(safePage + 1)}
                  className="rounded-xl h-10 px-3 text-xs cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </nav>
            )}
          </>
        ) : (
          <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
            <h3 className="text-lg font-bold">No articles match your search</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Try adjusting your keyword query or select &ldquo;All&rdquo; categories.
            </p>
            <Button
              type="button"
              onClick={() => {
                handleSelectCategory('All');
                handleSearchChange('');
              }}
              variant="outline"
              className="rounded-xl text-xs cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-[#eff4fb] dark:bg-card border border-[#0053c6]/15 dark:border-border p-8 sm:p-12 rounded-3xl text-center space-y-5 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-foreground">
              Ready to Accelerate Your Brand&apos;s Growth?
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Connect with Eon8&apos;s growth strategists and engineers to build high-performance marketing funnels, AI agent workflows, and enterprise software.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setContactModalOpen(true)}
            size="lg"
            className="rounded-full bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 px-8 text-sm shadow-md cursor-pointer"
          >
            Schedule Free Strategy Call
          </Button>
        </div>
      </div>
    </div>
  );
}
