import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { cryptoPagesData } from './cryptoPagesData';
import { 
  ChevronDown, ArrowRight, Check, Coins, 
  Share2, MessageCircle, BarChart3, Radio, 
  Video, Globe, ShieldCheck, Zap, Users,
  Gem, Megaphone, Flame
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Map indices to different icons for visual variety
const ICON_POOL = [
  Coins, Megaphone, Share2, MessageCircle, 
  BarChart3, Radio, Video, Globe, 
  ShieldCheck, Zap, Users, Gem, Flame
];

interface CryptoServicePageProps {
  type: string;
}

export function CryptoServicePage({ type }: CryptoServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = cryptoPagesData[type];

  // Dynamically update SEO head details
  useEffect(() => {
    if (data) {
      document.title = data.metaTitle || `${data.heroTitle} | Eon8`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc || "Eon8 Cryptocurrency marketing and promotion services");
      }
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [data, type]);

  // GSAP scroll trigger animations
  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      // Hero Title entrance
      gsap.fromTo('.cry-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
      );

      // Staggered cards reveal
      gsap.fromTo('.cry-card-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cry-cards-trigger',
            start: 'top 80%',
          }
        }
      );

      // Staggered process steps
      gsap.fromTo('.cry-step-reveal',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cry-steps-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data, type]);

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold">Service Page Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested crypto service page could not be located.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-b border-blue-500/10">
        {/* Glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10 cry-hero-content">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Crypto Marketing & PR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight leading-tight max-w-4xl mx-auto">
            {data.heroTitle}
          </h1>

          {data.heroSubtitle && (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {data.heroSubtitle}
            </p>
          )}

          {data.heroPoints && data.heroPoints.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
              {data.heroPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-200 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-gradient-to-r from-orange-500 to-primary text-white font-bold h-13 px-8 text-sm shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer"
            >
              <span>Get Free Consultation</span>
            </Button>
            
            <a href="#services">
              <Button 
                variant="ghost" 
                className="text-white hover:text-orange-400 rounded-full border border-white/20 px-6 h-13 font-bold text-sm cursor-pointer"
              >
                <span>View Our Services</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">{data.introTitle}</h2>
        <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {data.introDesc}
        </p>
      </section>

      {/* 3. Services Grid Section */}
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-border/30 px-6 cry-cards-trigger">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <p className="text-primary font-bold uppercase tracking-wider text-xs">Core Services Matrix</p>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.servicesTitle || "Services We Offer"}</h2>
            {data.servicesSubtitle && (
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">{data.servicesSubtitle}</p>
            )}
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((srv, idx) => {
              const Icon = ICON_POOL[idx % ICON_POOL.length];
              return (
                <div 
                  key={idx}
                  className="cry-card-reveal bg-white dark:bg-slate-950 border border-border/40 hover:border-orange-500/30 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-foreground">{srv.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Process Workflow Section */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-6 max-w-6xl mx-auto space-y-16 cry-steps-trigger">
          <div className="text-center space-y-3">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-xs">Execution Lifecycle</p>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.processTitle}</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.processSteps.map((st, idx) => (
              <div 
                key={idx}
                className="cry-step-reveal bg-card/40 border border-border/40 hover:border-blue-500/20 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="absolute top-6 right-8 text-5xl font-heading font-black text-blue-500/10 font-mono select-none">
                  {`0${idx + 1}`}
                </span>
                <div className="space-y-3 pt-4">
                  <h4 className="text-lg font-heading font-bold text-foreground">{st.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Why Choose Section */}
      <section className="py-24 bg-gradient-to-tr from-slate-900 via-slate-950 to-blue-950 text-white px-6 border-y border-blue-500/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-black leading-tight bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent">
            {data.whyTitle}
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            {data.whyDesc}
          </p>
        </div>
      </section>

      {/* 6. FAQ Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black font-heading">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-border/40 rounded-2xl bg-card/30 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4.5 h-4.5 shrink-0 transition-transform duration-300 ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-muted-foreground text-xs sm:text-sm leading-relaxed border-t border-border/10 text-left">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. CTA Section */}
      <section className="py-24 bg-slate-950 dark:bg-slate-900 text-white px-6 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white max-w-2xl mx-auto leading-tight">
            Ready to Dominate the <br /> Cryptocurrency Market?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Schedule a session with our Web 3.0 marketing experts and launch campaigns that scale your token valuation and user acquisition.
          </p>

          <div className="flex justify-center">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-gradient-to-r from-orange-500 to-primary text-white font-bold h-14 px-8 text-base shadow-xl shadow-orange-500/20 hover:scale-102 transition-transform cursor-pointer gap-2"
            >
              <span>Talk to our Crypto Experts</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
