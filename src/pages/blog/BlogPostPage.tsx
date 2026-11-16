import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ServiceNodeList } from '@/pages/services/components/ServiceNodeRenderer';
import {
  blogPostsIndex,
  blogPostsBySlug,
  loadBlogPost,
  type BlogPost,
  type BlogPostSummary,
} from './blogPostsData';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  ChevronRight,
  Copy,
  Check,
  Tag,
  Sparkles,
  CheckCircle2,
  Send,
  RefreshCw,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

interface BlogPostPageProps {
  slug?: string;
}

function getCategoryCounts() {
  const counts: Record<string, number> = {};
  for (const post of blogPostsIndex) {
    for (const cat of post.categories?.length ? post.categories : [post.category]) {
      counts[cat] = (counts[cat] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);
}

const TOP_CATEGORY_COUNTS = getCategoryCounts();

interface BlogPostBodyProps {
  summary: BlogPostSummary;
  post: BlogPost | null;
  isLoading: boolean;
}

function BlogPostBody({ summary, post, isLoading }: BlogPostBodyProps) {
  const { setContactModalOpen } = useAppStore();
  const [copied, setCopied] = useState(false);

  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formService, setFormService] = useState('Digital Marketing & SEO');
  const [captchaNum1] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [captchaNum2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const currentIndex = useMemo(
    () => blogPostsIndex.findIndex((p) => p.slug === summary.slug),
    [summary.slug]
  );
  const prevPost = currentIndex > 0 ? blogPostsIndex[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex >= 0 && currentIndex < blogPostsIndex.length - 1
      ? blogPostsIndex[currentIndex + 1]
      : undefined;

  const relatedPosts = useMemo(() => {
    const primaryCat = summary.category;
    const sameCat = blogPostsIndex.filter(
      (p) => p.slug !== summary.slug && (p.categories?.includes(primaryCat) || p.category === primaryCat)
    );
    const fallback = blogPostsIndex.filter((p) => p.slug !== summary.slug);
    return (sameCat.length >= 3 ? sameCat : fallback).slice(0, 3);
  }, [summary.slug, summary.category]);

  const recentPosts = useMemo(
    () => blogPostsIndex.filter((p) => p.slug !== summary.slug).slice(0, 4),
    [summary.slug]
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSidebarSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormName('');
      setFormContact('');
      setCaptchaAnswer('');
    }, 600);
  };

  const articleUrl = encodeURIComponent(window.location.href);
  const articleTitle = encodeURIComponent(summary.title);
  const categories = summary.categories?.length ? summary.categories : [summary.category];

  return (
    <article className="bg-background text-foreground min-h-screen font-body">
      {/* Live Eon8 Single Post Header Banner */}
      <header
        className="relative w-full min-h-[240px] sm:min-h-[280px] flex items-center pt-20 pb-10 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11, 27, 63, 0.9), rgba(0, 83, 198, 0.75)), url('/wp-content/uploads/2019/08/page_title_bg.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-5 relative z-10">
          <div className="flex items-center gap-2 text-xs text-white/80 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link
              to={`/blog?category=${encodeURIComponent(summary.category)}`}
              className="hover:text-white transition-colors"
            >
              {summary.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-white font-semibold line-clamp-1 max-w-[220px] sm:max-w-md">
              {summary.title}
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FD5900]/20 border border-[#FD5900]/40 rounded-full text-orange-200 text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>{summary.category}</span>
            </div>

            <div className="relative pl-4 sm:pl-5 py-1">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 w-[44px] sm:w-[60px] h-full bg-[#f7821b] -z-10"
              />
              <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-heading font-bold tracking-tight leading-tight text-white">
                {summary.title}
              </h1>
            </div>

            <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs text-white/85 flex-wrap gap-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <div className="w-7 h-7 bg-[#FD5900]/25 text-orange-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{summary.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#f7821b]" />
                  <span>{summary.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#f7821b]" />
                  <span>{summary.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-white/75 mr-1 hidden sm:inline">
                  Share:
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
                  title="Copy Article Link"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                  title="Share on LinkedIn"
                >
                  <img
                    src="/wp-content/uploads/2026/03/Linkedin-1.png"
                    alt="LinkedIn"
                    className="w-4 h-4 object-contain"
                  />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                  title="Share on X"
                >
                  <img
                    src="/wp-content/uploads/2026/03/twitter-1.png"
                    alt="X"
                    className="w-4 h-4 object-contain"
                  />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${articleTitle}%20${articleUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                  title="Share on WhatsApp"
                >
                  <img
                    src="/wp-content/uploads/2026/03/Whatsapp-1.png"
                    alt="WhatsApp"
                    className="w-4 h-4 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Article Column */}
          <div className="lg:col-span-8 space-y-8 min-w-0">
            {summary.thumbnail && (
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-md">
                <img
                  src={summary.thumbnail}
                  alt={summary.title}
                  className="w-full h-56 sm:h-80 lg:h-[420px] object-cover"
                />
              </div>
            )}

            {isLoading && !post ? (
              <div className="space-y-4 py-6">
                <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
              </div>
            ) : post?.contentNodes?.length ? (
              <div className="wp-article-content text-foreground/90">
                <ServiceNodeList nodes={post.contentNodes} />
              </div>
            ) : (
              <p className="text-base text-muted-foreground leading-relaxed">{summary.excerpt}</p>
            )}

            {/* Categories Row */}
            <div className="pt-6 border-t border-border flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground">Categories:</span>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/blog?category=${encodeURIComponent(cat)}`}
                  className="px-3 py-1 bg-card border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-[#FD5900] hover:border-[#FD5900]/40 transition-colors"
                >
                  #{cat}
                </Link>
              ))}
            </div>

            {/* Previous & Next Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-[#FD5900]/40 transition-all text-left space-y-1 group"
                >
                  <span className="text-[11px] font-bold text-[#FD5900] flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Newer Article</span>
                  </span>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-foreground line-clamp-2">
                    {prevPost.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-[#FD5900]/40 transition-all text-right space-y-1 group ml-auto w-full"
                >
                  <span className="text-[11px] font-bold text-[#FD5900] flex items-center justify-end gap-1">
                    <span>Previous Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-foreground line-clamp-2">
                    {nextPost.title}
                  </h4>
                </Link>
              )}
            </div>

            {/* Bottom Consultation CTA */}
            <div className="bg-[#eff4fb] dark:bg-card border border-[#0053c6]/15 dark:border-border p-7 sm:p-8 rounded-3xl text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Want to Implement These Strategies for Your Business?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
                Book a complimentary strategy consultation with Eon8&apos;s senior digital growth and AI engineers.
              </p>
              <Button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="rounded-full bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-xs sm:text-sm h-11 px-6 shadow-md cursor-pointer"
              >
                Schedule Free Strategy Call
              </Button>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-7 lg:sticky lg:top-24">
            {/* Free Growth Audit Card */}
            <div className="bg-card border border-[#FD5900]/30 rounded-3xl p-6 shadow-md space-y-5 text-left relative overflow-hidden">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FD5900]/10 text-[#FD5900] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Free Growth Audit</span>
                </div>
                <h3 className="text-lg font-heading font-black text-foreground">
                  Get a Custom Growth Proposal
                </h3>
                <p className="text-xs text-muted-foreground">
                  Connect directly with our senior strategists. Get actionable recommendations in 24 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-foreground">Audit Request Received!</h4>
                  <p className="text-xs text-muted-foreground">
                    Our strategy team will review your brand and follow up within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSidebarSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full h-10 px-3 bg-background border border-border rounded-xl text-xs focus:outline-none focus:border-[#FD5900]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Work Email or Phone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      className="w-full h-10 px-3 bg-background border border-border rounded-xl text-xs focus:outline-none focus:border-[#FD5900]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Service of Interest
                    </label>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full h-10 px-3 bg-background border border-border rounded-xl text-xs focus:outline-none focus:border-[#FD5900] cursor-pointer"
                    >
                      <option value="Digital Marketing & SEO">Digital Marketing &amp; SEO</option>
                      <option value="AI Agent Development">AI Agent Development</option>
                      <option value="AI Video Creation">AI Video Creation</option>
                      <option value="ERP & CRM Software">ERP &amp; CRM Software</option>
                      <option value="PPC & Performance Ads">PPC &amp; Performance Ads</option>
                      <option value="Crypto & Web3 Growth">Crypto &amp; Web3 Growth</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Security: {captchaNum1} + {captchaNum2} = ?
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Answer"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className={`w-full h-10 px-3 bg-background border rounded-xl text-xs focus:outline-none ${
                        captchaError ? 'border-red-500' : 'border-border focus:border-[#FD5900]'
                      }`}
                    />
                    {captchaError && (
                      <span className="text-[10px] text-red-500 mt-1 block">
                        Incorrect captcha answer. Try again.
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Free Audit</span>
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                    <Phone className="w-3 h-3 text-[#FD5900]" />
                    <span>Or call: +91 90422 94007</span>
                  </div>
                </form>
              )}
            </div>

            {/* Top Categories */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h4 className="text-base font-heading font-black text-foreground border-b border-border pb-2">
                Categories
              </h4>
              <div className="space-y-1">
                {TOP_CATEGORY_COUNTS.map(([cat, count]) => (
                  <Link
                    key={cat}
                    to={`/blog?category=${encodeURIComponent(cat)}`}
                    className="flex items-center justify-between p-2 rounded-xl text-xs hover:bg-muted hover:text-[#FD5900] transition-colors text-muted-foreground"
                  >
                    <span className="truncate pr-2">{cat}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold shrink-0">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h4 className="text-base font-heading font-black text-foreground border-b border-border pb-2">
                Recent Insights
              </h4>
              <div className="space-y-4">
                {recentPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    to={`/blog/${rPost.slug}`}
                    className="flex gap-3 group text-left items-start"
                  >
                    <img
                      src={rPost.thumbnail || '/wp-content/uploads/2026/03/Logo_bg-1.png'}
                      alt={rPost.title}
                      loading="lazy"
                      className="w-16 h-14 object-cover rounded-xl shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <h5 className="text-xs font-heading font-bold text-foreground line-clamp-2 group-hover:text-[#0053c6] dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {rPost.title}
                      </h5>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FD5900]" />
                        {rPost.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FD5900] to-amber-500 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                  {summary.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-foreground">{summary.author}</h4>
                  <span className="text-[11px] text-muted-foreground">Digital Growth &amp; AI Team</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Specializing in search algorithms, multi-agent AI architectures, ERP/CRM platforms, and client acquisition funnels.
              </p>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-12 mt-12 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-heading font-black">Related Articles</h3>
              <Link
                to="/blog"
                className="text-xs sm:text-sm font-bold text-[#FD5900] hover:underline flex items-center gap-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#FD5900]/40 transition-all p-4 space-y-3 flex flex-col justify-between group text-left"
                >
                  <div className="space-y-2.5">
                    <img
                      src={rel.thumbnail || '/wp-content/uploads/2026/03/Logo_bg-1.png'}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <span className="text-[10px] font-bold text-[#FD5900] uppercase tracking-wider block">
                      {rel.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-heading font-bold text-foreground line-clamp-2 group-hover:text-[#0053c6] dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                    <Clock className="w-3 h-3 text-[#FD5900]" />
                    <span>{rel.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function BlogPostPage({ slug: propSlug }: BlogPostPageProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const activeSlug = (propSlug || paramSlug || '').replace(/^\/+|\/+$/g, '');
  const summary = blogPostsBySlug[activeSlug];

  const [loaded, setLoaded] = useState<{ slug: string; post: BlogPost | null } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (summary) {
      document.title = `${summary.title} | Eon8 Blog`;
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

  return (
    <BlogPostBody
      key={activeSlug}
      summary={summary}
      post={currentPost}
      isLoading={isLoading}
    />
  );
}
