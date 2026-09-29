import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { policyPagesData } from './policyPagesData';
import { ShieldCheck, Calendar, ArrowLeft, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

interface PolicyPageProps {
  slug: string;
}

export function PolicyPage({ slug }: PolicyPageProps) {
  const { setContactModalOpen } = useAppStore();
  const data = policyPagesData[slug];

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc);
      }
      window.scrollTo(0, 0);
    }
  }, [data, slug]);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Policy Document Not Found</h2>
        <Link to="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen font-body">
      {/* 1. Full-Bleed Dark Hero Section */}
      <section className="relative pt-32 pb-14 md:pt-36 md:pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-b border-border/30 overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-orange-500/15 via-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-orange-400 font-semibold">{data.title}</span>
          </div>

          {/* Page Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Policy Document</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white leading-tight">
              {data.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {data.subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-white/10">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Last Updated: <strong className="text-white">{data.lastUpdated}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Policy Content Sections */}
        <div className="space-y-10">
          {data.sections.map((section, idx) => (
            <div 
              key={idx}
              className="bg-card/40 border border-border/40 p-6 sm:p-8 rounded-2xl backdrop-blur-sm space-y-4 shadow-sm hover:border-orange-500/20 transition-all"
            >
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                {section.heading}
              </h2>
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Support Notice Card */}
        <div className="bg-gradient-to-r from-orange-500/10 via-card to-blue-500/10 border border-orange-500/20 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-heading font-bold text-foreground">
              Questions Regarding Our Policies?
            </h3>
            <p className="text-xs text-muted-foreground max-w-md">
              Our compliance and client success team is available to clarify any terms, data protections, or deliverable standards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={() => setContactModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold px-5 h-10 shadow-md"
            >
              Contact Legal Team
            </Button>
            <a href="mailto:info@eon8.com">
              <Button
                variant="outline"
                className="rounded-xl text-xs font-semibold px-4 h-10 border-border/50"
              >
                <Mail className="w-3.5 h-3.5 mr-1" />
                info@eon8.com
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
