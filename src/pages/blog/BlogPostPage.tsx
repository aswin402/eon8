import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from './blogPostsData';
import { 
  Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, 
  User, Check, Copy, Sparkles, Send, RefreshCw, 
  CheckCircle2, Phone, Tag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

interface BlogPostPageProps {
  slug?: string;
}

export function BlogPostPage({ slug: propSlug }: BlogPostPageProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const activeSlug = propSlug || paramSlug || '';
  const post = blogPostsData[activeSlug];
  const { setContactModalOpen } = useAppStore();

  // Social share link copied state
  const [copied, setCopied] = useState(false);

  // Sidebar audit form states
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formService, setFormService] = useState('Digital Marketing & SEO');
  const [captchaNum1, setCaptchaNum1] = useState(5);
  const [captchaNum2, setCaptchaNum2] = useState(3);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Eon8 Insights`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }
      window.scrollTo(0, 0);
    }
  }, [post, activeSlug]);

  useEffect(() => {
    // Generate fresh captcha
    setCaptchaNum1(Math.floor(Math.random() * 8) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 7) + 1);
    setCaptchaAnswer('');
    setCaptchaError(false);
    setFormSubmitted(false);
  }, [activeSlug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading">Article Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested article could not be located.</p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  // All posts array for previous/next and widgets
  const allPosts = Object.values(blogPostsData);
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Related posts (different from active, up to 3)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Recent 5 posts
  const recentPosts = allPosts.slice(0, 5);

  // Categories counts
  const categoryCounts: Record<string, number> = {};
  allPosts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSidebarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
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
    }, 700);
  };

  const articleUrl = encodeURIComponent(window.location.href);
  const articleTitle = encodeURIComponent(post.title);

  return (
    <article className="bg-background text-foreground min-h-screen py-16 px-4 sm:px-6 font-body">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-orange-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 text-left">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-muted-foreground">{post.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold line-clamp-1 max-w-[200px] sm:max-w-md">
            {post.title}
          </span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight text-foreground">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex items-center justify-between border-y border-border/40 py-3.5 text-xs text-muted-foreground flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <div className="w-7 h-7 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <span>{post.author}</span>
              </div>

              <span>•</span>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>{post.date}</span>
              </div>

              <span>•</span>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Social Share Icons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground mr-1 hidden sm:inline">Share:</span>
              <button
                onClick={handleCopyLink}
                className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-orange-500/40 transition-all cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-orange-500/40 transition-all"
                title="Share on LinkedIn"
              >
                <img src="/imgs/Linkedin-1.png" alt="LinkedIn" className="w-4 h-4 object-contain" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-orange-500/40 transition-all"
                title="Share on X"
              >
                <img src="/imgs/twitter-1.png" alt="X" className="w-4 h-4 object-contain" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${articleTitle}%20${articleUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-orange-500/40 transition-all"
                title="Share on WhatsApp"
              >
                <img src="/imgs/Whatsapp-1.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Main Body + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image */}
            <div className="overflow-hidden rounded-3xl border border-border/40 shadow-xl">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-72 sm:h-[420px] object-cover"
              />
            </div>

            {/* Lead Excerpt Blockquote */}
            <div className="border-l-4 border-orange-500 pl-6 py-3 bg-card/40 rounded-r-2xl border-y border-r border-border/20">
              <p className="text-base sm:text-lg font-medium text-foreground/90 italic leading-relaxed">
                "{post.excerpt}"
              </p>
            </div>

            {/* Main Article Body */}
            <div className="space-y-10">
              {post.content.map((sec, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                    {sec.heading}
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {sec.body.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Tags Row */}
            <div className="pt-6 border-t border-border/40 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground">Topics:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-card/80 border border-border/40 rounded-lg text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Previous & Next Post Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/40">
              {prevPost ? (
                <Link
                  to={`/${prevPost.slug}`}
                  className="p-4 rounded-2xl bg-card/60 border border-border/40 hover:border-orange-500/40 transition-all text-left space-y-1 group"
                >
                  <span className="text-[11px] font-bold text-orange-500 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Article</span>
                  </span>
                  <h4 className="text-xs font-heading font-bold text-foreground line-clamp-2">
                    {prevPost.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  to={`/${nextPost.slug}`}
                  className="p-4 rounded-2xl bg-card/60 border border-border/40 hover:border-orange-500/40 transition-all text-right space-y-1 group ml-auto w-full"
                >
                  <span className="text-[11px] font-bold text-orange-500 flex items-center justify-end gap-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <h4 className="text-xs font-heading font-bold text-foreground line-clamp-2">
                    {nextPost.title}
                  </h4>
                </Link>
              )}
            </div>

            {/* Bottom Consultation Banner */}
            <div className="bg-gradient-to-r from-orange-500/10 via-card to-primary/10 border border-orange-500/20 p-8 rounded-3xl text-center space-y-4 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Want to Implement These Strategies for Your Business?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
                Book a complimentary strategy consultation with Eon8’s senior digital growth and AI engineers.
              </p>
              <Button
                onClick={() => setContactModalOpen(true)}
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-11 px-6 shadow-lg shadow-orange-500/20"
              >
                Schedule Free Strategy Call
              </Button>
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Quick Audit / Consultation Lead Card */}
            <div className="bg-card/80 border border-orange-500/30 rounded-3xl p-6 shadow-xl space-y-5 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
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
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
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
                      className="w-full h-10 px-3 bg-background/80 border border-border/50 rounded-xl text-xs focus:outline-none focus:border-orange-500 transition-colors"
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
                      className="w-full h-10 px-3 bg-background/80 border border-border/50 rounded-xl text-xs focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Service of Interest
                    </label>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full h-10 px-3 bg-background/80 border border-border/50 rounded-xl text-xs focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                    >
                      <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                      <option value="AI Agent Development">AI Agent Development</option>
                      <option value="PPC & Performance Ads">PPC & Performance Ads</option>
                      <option value="Crypto & Web3 Growth">Crypto & Web3 Growth</option>
                      <option value="Influencer Marketing">Influencer Marketing</option>
                      <option value="Reputation Management">Reputation Management</option>
                    </select>
                  </div>

                  {/* Math Captcha */}
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
                      className={`w-full h-10 px-3 bg-background/80 border rounded-xl text-xs focus:outline-none transition-colors ${
                        captchaError ? 'border-red-500' : 'border-border/50 focus:border-orange-500'
                      }`}
                    />
                    {captchaError && (
                      <span className="text-[10px] text-red-400 mt-1 block">
                        Incorrect captcha answer. Try again.
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs gap-1.5 shadow-md shadow-orange-500/20"
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

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-1">
                    <Phone className="w-3 h-3 text-orange-500" />
                    <span>Or call: +91 90422 94007</span>
                  </div>
                </form>
              )}
            </div>

            {/* Categories Widget */}
            <div className="bg-card/60 border border-border/40 rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h4 className="text-base font-heading font-black text-foreground border-b border-border/30 pb-2">
                Categories
              </h4>
              <div className="space-y-1.5">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <Link
                    key={cat}
                    to="/blog"
                    className="flex items-center justify-between p-2 rounded-xl text-xs hover:bg-card hover:text-orange-500 transition-colors text-muted-foreground"
                  >
                    <span>{cat}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted/60 text-[10px] font-bold">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-card/60 border border-border/40 rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h4 className="text-base font-heading font-black text-foreground border-b border-border/30 pb-2">
                Recent Insights
              </h4>
              <div className="space-y-4">
                {recentPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    to={`/${rPost.slug}`}
                    className="flex gap-3 group text-left items-start"
                  >
                    <img
                      src={rPost.thumbnail}
                      alt={rPost.title}
                      className="w-16 h-14 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1 min-w-0">
                      <h5 className="text-xs font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {rPost.title}
                      </h5>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        {rPost.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Profile Card */}
            <div className="bg-card/60 border border-border/40 rounded-3xl p-6 shadow-sm space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-foreground">{post.author}</h4>
                  <span className="text-[11px] text-muted-foreground">Growth Strategist at Eon8</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Specializing in search algorithms, multi-agent AI architectures, and high-conversion client acquisition funnels.
              </p>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-border/40">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-heading font-black">Related Articles</h3>
              <Link to="/blog" className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1">
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/${rel.slug}`}
                  className="bg-card/70 border border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-orange-500/30 transition-all p-4 space-y-3 flex flex-col justify-between group text-left"
                >
                  <div className="space-y-2">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-36 object-cover rounded-xl group-hover:scale-103 transition-transform"
                    />
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-2 border-t border-border/10">
                    <Clock className="w-3 h-3 text-orange-500" />
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
