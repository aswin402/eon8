import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from './blogPostsData';
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, User } from 'lucide-react';
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

  // Get other posts for related section
  const relatedPosts = Object.values(blogPostsData)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="bg-background text-foreground min-h-screen py-16 px-6 font-body">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-orange-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs">{post.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight text-foreground">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex items-center justify-between border-y border-border/40 py-4 text-xs text-muted-foreground flex-wrap gap-4">
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

            {/* Share / Tags */}
            <div className="flex items-center gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-muted/40 rounded-md text-[10px] font-semibold text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="overflow-hidden rounded-3xl border border-border/40 shadow-xl">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-80 sm:h-[420px] object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="border-l-4 border-orange-500 pl-6 py-2">
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
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action Banner */}
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
            Get Free Consultation
          </Button>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-border/40">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-heading font-black">Related Articles</h3>
              <Link to="/blog" className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/${rel.slug}`}
                  className="bg-card/70 border border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-orange-500/30 transition-all p-4 space-y-3 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-32 object-cover rounded-xl group-hover:scale-103 transition-transform"
                    />
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-2 border-t border-border/10">
                    <Clock className="w-3 h-3" />
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
