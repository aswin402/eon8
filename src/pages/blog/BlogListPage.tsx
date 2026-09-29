import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPostsData } from './blogPostsData';
import { 
  Search, Calendar, Clock, ArrowRight, Sparkles, 
  BookOpen, User, ChevronRight, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

const CATEGORIES = [
  'All', 
  'Digital Marketing', 
  'AI Agents', 
  'Social Media', 
  'Growth Guides', 
  'Engineering & Safety'
];

export function BlogListPage() {
  const { setContactModalOpen } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Digital Marketing & AI Insights Blog | Eon8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore actionable strategies, technical breakdowns, and growth insights on AI agents, digital marketing, SEO, social media, and Web3 from Eon8 experts.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const allPosts = useMemo(() => Object.values(blogPostsData), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = allPosts[0];

  return (
    <div className="bg-background text-foreground min-h-screen font-body">
      {/* 1. Dedicated Full-Bleed Dark Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-b border-border/30 overflow-hidden">
        {/* Background ambient gradient glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-orange-500/15 via-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 text-center">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-200 font-semibold">Blog & Insights</span>
          </div>

          {/* Header Hero Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Growth Intelligence & Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight leading-tight text-white">
              Eon8 <span className="bg-gradient-to-r from-orange-500 to-blue-400 bg-clip-text text-transparent">Insights & Blog</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Actionable strategies, technical breakdowns, and industry playbooks on AI Agents, performance marketing, search algorithms, and modern business automation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 sm:space-y-16">

        {/* Featured Post Spotlight (shown when unfiltered) */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <div className="bg-card/70 border border-border/50 rounded-3xl overflow-hidden shadow-xl hover:border-orange-500/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 relative">
            <div className="lg:col-span-6 overflow-hidden rounded-2xl relative group">
              <img
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-md">
                  Featured
                </span>
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/10">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  {featuredPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-snug">
                <Link to={`/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/30 text-xs">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  <span>By {featuredPost.author}</span>
                </span>
                <Link to={`/${featuredPost.slug}`}>
                  <Button className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-md">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles, topics, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-9 bg-card/60 border border-border/50 rounded-2xl text-xs focus:outline-none focus:border-primary transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Total Count */}
            <span className="text-xs text-muted-foreground font-semibold">
              Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' 
                ? allPosts.length 
                : allPosts.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-card/60 border border-border/40 text-muted-foreground hover:text-foreground hover:border-orange-500/30'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Magazine Card Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-card/70 border border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between group text-left"
              >
                <div>
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white rounded-lg text-[10px] font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      <Link to={`/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/10 flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                    <User className="w-3 h-3 text-orange-500" />
                    <span>{post.author}</span>
                  </span>
                  <Link
                    to={`/${post.slug}`}
                    className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-card/40 border border-border/40 rounded-3xl p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
            <h3 className="text-lg font-bold">No articles match your search</h3>
            <p className="text-xs text-muted-foreground">Try adjusting your keyword query or select "All" categories.</p>
            <Button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              variant="outline"
              className="rounded-xl text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Bottom Consultation CTA Banner */}
        <div className="bg-gradient-to-r from-orange-500/10 via-card to-primary/10 border border-orange-500/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-black">
              Ready to Accelerate Your Brand’s Growth?
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Connect with Eon8’s growth strategists and engineers to build high-performance marketing funnels, AI agent workflows, and Web3 community adoption.
            </p>
          </div>

          <Button
            onClick={() => setContactModalOpen(true)}
            size="lg"
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 text-sm shadow-xl shadow-orange-500/20"
          >
            Schedule Free Strategy Call
          </Button>
        </div>
      </div>
    </div>
  );
}
