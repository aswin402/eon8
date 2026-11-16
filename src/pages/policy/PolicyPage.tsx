import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { policyPagesData } from './policyPagesData';
import { useAppStore } from '@/store/useAppStore';

interface PolicyPageProps {
  slug: string;
}

const LEGAL_NAV = [
  { label: 'Privacy Policy', path: '/privacy-policy-2', slug: 'privacy-policy-2' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions', slug: 'terms-and-conditions' },
  { label: 'Refund Policy', path: '/refund-policy', slug: 'refund-policy' },
  { label: 'Delivery Policy', path: '/delivery-policy', slug: 'delivery-policy' },
];

export function PolicyPage({ slug }: PolicyPageProps) {
  const data = policyPagesData[slug];
  const setContactModalOpen = useAppStore((state) => state.setContactModalOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = data.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc);
      }
    }
  }, [slug, data]);

  if (!data) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Policy Page Not Found</h1>
        <Link to="/" className="text-[#FD5900] hover:underline font-medium">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Live EON8 Page Title Banner */}
      <header
        className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-center pt-20 pb-10 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11, 27, 63, 0.88), rgba(0, 83, 198, 0.72)), url('/wp-content/uploads/2019/08/page_title_bg.jpg')`,
        }}
      >
        <div className="max-w-[1170px] mx-auto w-full px-5 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <div className="relative inline-block pl-4 sm:pl-5 py-1">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-1 w-[54px] sm:w-[65px] h-[calc(100%+10px)] bg-[#f7821b] -z-10"
            />
            <h1 className="text-2xl sm:text-4xl font-heading font-bold uppercase tracking-wide text-white leading-tight m-0">
              {data.title}
            </h1>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#f7821b]" />
              EON8 Digital Agency — Legal &amp; Compliance
            </span>
            {data.lastUpdated && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#f7821b]" />
                Updated {data.lastUpdated}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1170px] mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Article Column */}
          <article className="lg:col-span-8 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
              {data.sections.map((section, idx) => (
                <section
                  key={`${section.heading}-${idx}`}
                  className={idx === 0 ? 'space-y-4' : 'space-y-3.5 pt-6 border-t border-border/70'}
                >
                  {idx === 0 ? (
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                      {section.heading}
                    </h2>
                  ) : (
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                      {section.heading}
                    </h3>
                  )}

                  <div className="space-y-3">
                    {section.paragraphs.map((paragraph, pIdx) => {
                      const isBullet = paragraph.startsWith('•');
                      return (
                        <p
                          key={pIdx}
                          className={`text-sm sm:text-[15px] text-muted-foreground leading-relaxed ${
                            isBullet ? 'pl-4 relative text-foreground/90 font-normal' : ''
                          }`}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Bottom Contact Card */}
            <div className="bg-[#eff4fb] dark:bg-card border border-[#0053c6]/15 dark:border-border p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Questions Regarding Our Policies?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                  Our compliance and client success team is available to clarify any terms, data protections, or deliverable standards.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <Button
                  onClick={() => setContactModalOpen(true)}
                  className="bg-[#FD5900] hover:bg-[#e55000] text-white rounded-xl text-xs sm:text-sm font-bold px-5 h-10 shadow-sm cursor-pointer"
                >
                  Contact Legal Team
                </Button>
                <a href="mailto:info@eon8.com">
                  <Button
                    variant="outline"
                    className="rounded-xl text-xs sm:text-sm font-semibold px-4 h-10 border-border bg-background hover:bg-muted cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    info@eon8.com
                  </Button>
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm lg:sticky lg:top-28 space-y-6">
              <div>
                <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground mb-3">
                  Legal Documents
                </h4>
                <nav className="space-y-1.5">
                  {LEGAL_NAV.map((item) => {
                    const isActive =
                      slug === item.slug ||
                      (slug === 'privacy-policy' && item.slug === 'privacy-policy-2');
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#FD5900]/10 text-[#FD5900] font-semibold'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-5 border-t border-border/80 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">EON8 Digital Solutions</p>
                <p>No: 52, Vijayaraghava Rd, T. Nagar, Chennai, Tamil Nadu 600017</p>
                <p>
                  Email:{' '}
                  <a href="mailto:info@eon8.com" className="text-[#0053c6] dark:text-blue-400 hover:underline">
                    info@eon8.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+919042294007" className="text-[#0053c6] dark:text-blue-400 hover:underline">
                    +91 90422 94007
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
