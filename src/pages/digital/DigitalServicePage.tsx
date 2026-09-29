import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { digitalPagesData } from './digitalPagesData';
import { 
  ChevronDown, ArrowRight, Check, ShieldCheck, 
  Share2, MessageCircle, BarChart3, Radio, 
  Video, Globe, Zap, Users, Gem, Megaphone, Flame,
  Compass, Eye, Award, Hammer, Sparkles, RefreshCw,
  Phone, CheckCircle2, XCircle, AwardIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Map indices to different icons for visual variety
const ICON_POOL = [
  BarChart3, Megaphone, Globe, ShieldCheck, Zap, Users,
  Gem, Eye, Share2, MessageCircle, Radio, Video,
  Flame, Compass, Award, Hammer
];

const SECTOR_PILLS = [
  'E-Commerce & Retail',
  'SaaS & B2B Technology',
  'Web3 & Crypto Protocols',
  'Healthcare & Life Sciences',
  'Real Estate & Developers',
  'FinTech & Banking',
  'Hospitality & Tourism',
  'Education & EdTech'
];

interface DigitalServicePageProps {
  type: string;
}

export function DigitalServicePage({ type }: DigitalServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick Quote Form State
  const [quoteName, setQuoteName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [budget, setBudget] = useState('Select budget range');
  const [captchaNum1, setCaptchaNum1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [captchaNum2, setCaptchaNum2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = digitalPagesData[type];

  // Dynamically update SEO head details
  useEffect(() => {
    if (data) {
      document.title = data.metaTitle || `${data.heroTitle} | Eon8`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc || "Eon8 digital marketing and search engine optimization services");
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
      gsap.fromTo('.digital-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // Staggered cards reveal
      gsap.fromTo('.digital-card-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.digital-cards-trigger',
            start: 'top 80%',
          }
        }
      );

      // Staggered process steps
      gsap.fromTo('.digital-step-reveal',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.digital-steps-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data, type]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!quoteName.trim() || !quoteEmail.trim() || !quotePhone.trim()) {
      setFormError('Please fill out all required fields (*)');
      return;
    }

    if (parseInt(captchaInput.trim(), 10) !== captchaNum1 + captchaNum2) {
      setFormError('Incorrect Captcha answer. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Digital Quote Submitted:', {
        service: data?.heroTitle,
        name: quoteName,
        email: quoteEmail,
        phone: `${countryCode} ${quotePhone}`,
        budget
      });
    }, 600);
  };

  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 8) + 3);
    setCaptchaNum2(Math.floor(Math.random() * 7) + 1);
    setCaptchaInput('');
    setFormError('');
  };

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold">Service Page Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested digital marketing service page could not be located.</p>
        <Link to="/" className="inline-block mt-4 text-[#ff6a00] hover:underline font-bold">Return Home</Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Breadcrumb Strip */}
      <div className="bg-slate-900 border-b border-white/10 py-3.5 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-300">Services</span>
          <span>/</span>
          <span className="text-[#ff6a00] font-semibold truncate max-w-[280px] sm:max-w-md">{data.heroTitle}</span>
        </div>
      </div>

      {/* 2. Signature Split Hero Section with Inline Lead Card */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-950 via-[#0b1329] to-[#06122b] text-white border-b border-indigo-500/10 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff6a00]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Dynamic Content */}
            <div className="lg:col-span-7 space-y-6 text-left digital-hero-content">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6a00]/15 border border-[#ff6a00]/30 rounded-full text-[#ff6a00] text-xs font-bold uppercase tracking-wider">
                <Megaphone className="w-3.5 h-3.5 animate-pulse" />
                <span>Enterprise Growth Agency</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1] text-white drop-shadow-sm">
                {data.heroTitle}
              </h1>

              {data.heroSubtitle && (
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                  {data.heroSubtitle}
                </p>
              )}

              {/* Value Check Pills */}
              {data.heroPoints && data.heroPoints.length > 0 && (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {data.heroPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                      <Check className="w-4 h-4 text-[#ff6a00] shrink-0 stroke-[3]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button 
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] text-white font-bold h-12 sm:h-13 px-7 text-sm shadow-xl shadow-orange-500/20 hover:scale-102 transition-all cursor-pointer gap-2"
                >
                  <span>Speak with Strategist</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <a href="#services">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-[#ff6a00] hover:bg-white/5 rounded-xl border border-white/20 px-6 h-12 sm:h-13 font-bold text-sm cursor-pointer transition-colors"
                  >
                    <span>View Capabilities</span>
                  </Button>
                </a>
              </div>

              {/* Trust Badge Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <AwardIcon className="w-4 h-4 text-[#ff6a00]" />
                  <span>Clutch Top Agency <strong className="text-white">4.9 / 5</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>Google Premier Partner 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>5-Minute Response SLA</span>
                </div>
              </div>

            </div>

            {/* Right: High-Conversion Lead Capture Form */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6a00]">Free Strategy Blueprint</span>
                  <h3 className="text-2xl font-heading font-extrabold text-white mt-1">Get Free Proposal</h3>
                  <p className="text-xs text-slate-400 mt-1">Receive a custom revenue audit & roadmap within 24 hours.</p>
                </div>

                {formError && (
                  <div className="mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    {formError}
                  </div>
                )}

                {!submitted ? (
                  <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Work Email Address *"
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-11 w-24 bg-white/5 border border-white/15 rounded-xl px-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff6a00] font-mono shrink-0"
                      >
                        <option value="+91" className="bg-slate-900 text-white">🇮🇳 +91</option>
                        <option value="+1" className="bg-slate-900 text-white">🇺🇸 +1</option>
                        <option value="+44" className="bg-slate-900 text-white">🇬🇧 +44</option>
                        <option value="+971" className="bg-slate-900 text-white">🇦🇪 +971</option>
                        <option value="+65" className="bg-slate-900 text-white">🇸🇬 +65</option>
                        <option value="+61" className="bg-slate-900 text-white">🇦🇺 +61</option>
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={quotePhone}
                        onChange={(e) => setQuotePhone(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all font-mono"
                      />
                    </div>

                    <div>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff6a00]"
                      >
                        <option value="Select budget range" className="bg-slate-900 text-white">Select Monthly Budget</option>
                        <option value="$1,000 - $3,000" className="bg-slate-900 text-white">$1,000 - $3,000 / month</option>
                        <option value="$3,000 - $5,000" className="bg-slate-900 text-white">$3,000 - $5,000 / month</option>
                        <option value="$5,000 - $10,000" className="bg-slate-900 text-white">$5,000 - $10,000 / month</option>
                        <option value="$10,000+" className="bg-slate-900 text-white">$10,000+ / Enterprise Growth</option>
                      </select>
                    </div>

                    {/* Math Captcha */}
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between gap-3 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold tracking-wide">
                          {captchaNum1} + {captchaNum2} = ?
                        </span>
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                          title="Refresh equation"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Answer"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="w-20 h-8 text-center bg-white text-slate-900 rounded-lg text-xs font-bold focus:outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#ff6a00] hover:bg-[#ea580c] text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-orange-500/25 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                          <span>Preparing Audit...</span>
                        </>
                      ) : (
                        <span>Get Free Proposal Now</span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="inline-flex p-3 bg-green-500/10 rounded-full border border-green-500/20 text-green-400">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-heading font-extrabold text-white">Proposal Request Received!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{quoteName}</strong>. Our digital strategy director is preparing your custom proposal and will contact you at <strong className="text-white">{quoteEmail}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setQuoteName('');
                        setQuoteEmail('');
                        setQuotePhone('');
                        refreshCaptcha();
                      }}
                      className="text-xs text-[#ff6a00] hover:underline font-bold"
                    >
                      Submit another request
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Industry Trust Row */}
      <section className="py-6 bg-slate-900 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" /> Google Premier Partner 2026
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Clutch Top B2B Agency 4.9/5
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Meta Certified Marketing Partner
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> ISO 9001:2015 Quality Certified
            </span>
          </div>
        </div>
      </section>

      {/* 4. Strategic Overview / Intro Section */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] font-bold text-xs uppercase tracking-widest">
          Executive Overview
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
          {data.introTitle}
        </h2>
        <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full" />
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-normal">
          {data.introDesc}
        </p>
      </section>

      {/* 5. Sector Solutions Tags */}
      <section className="py-12 bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">Sectors We Scale</span>
          <h3 className="text-2xl sm:text-3xl font-heading font-black">Tailored For High-Growth Verticals</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {SECTOR_PILLS.map((sec, idx) => (
              <div 
                key={idx}
                className="px-4 py-2 bg-card text-card-foreground border border-border/60 rounded-xl text-xs sm:text-sm font-semibold shadow-xs hover:border-[#ff6a00] transition-colors"
              >
                {sec}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Services Grid Section */}
      <section id="services" className="py-24 bg-background px-6 digital-cards-trigger">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Capabilities Blueprint</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.servicesTitle || "Services We Offer"}</h2>
            {data.servicesSubtitle && (
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{data.servicesSubtitle}</p>
            )}
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((srv, idx) => {
              const Icon = ICON_POOL[idx % ICON_POOL.length];
              return (
                <div 
                  key={idx}
                  className="digital-card-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00] p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-white rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-foreground">{srv.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-border/40 mt-6 flex items-center justify-between text-xs font-semibold text-[#ff6a00]">
                    <span>Standard Deliverable</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Process Workflow Section */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-6 bg-muted/20 border-y border-border/40 digital-steps-trigger">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Agile Methodology</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.processTitle}</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">From initial telemetry audit to sustained organic compounding.</p>
              <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {data.processSteps.map((st, idx) => (
                <div 
                  key={idx}
                  className="digital-step-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00]/50 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-lg transition-all"
                >
                  <span className="absolute top-6 right-8 text-5xl font-heading font-black text-[#ff6a00]/15 font-mono select-none">
                    {`0${idx + 1}`}
                  </span>
                  <div className="space-y-3 pt-4">
                    <h4 className="text-xl font-heading font-bold text-foreground">{st.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Interactive Comparison Table (Eon8 vs Traditional Agencies) */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Competitive Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black">Why Eon8 Outperforms Traditional Agencies</h2>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-card text-card-foreground border border-border/60 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40">
                    <th className="p-5 font-bold text-muted-foreground">Strategic Dimension</th>
                    <th className="p-5 font-extrabold text-[#ff6a00] bg-[#ff6a00]/10">Eon8 Digital Growth Engine</th>
                    <th className="p-5 font-bold text-muted-foreground">Traditional Digital Agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-xs sm:text-sm">
                  <tr>
                    <td className="p-5 font-bold">Execution Speed</td>
                    <td className="p-5 font-semibold text-foreground bg-[#ff6a00]/5">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Real-time sprint deployments & daily monitoring</span>
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0" /> Slow monthly change-requests</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Reporting & Telemetry</td>
                    <td className="p-5 font-semibold text-foreground bg-[#ff6a00]/5">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Live 24/7 custom Looker & BigQuery dashboards</span>
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0" /> Static end-of-month PDF summaries</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Web3 & AI Readiness</td>
                    <td className="p-5 font-semibold text-foreground bg-[#ff6a00]/5">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Autonomous AI agents, LLM integrations & Web3 native</span>
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0" /> Outdated 2018 keyword stuffing playbooks</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Team Composition</td>
                    <td className="p-5 font-semibold text-foreground bg-[#ff6a00]/5">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Dedicated growth pod: Strategist, SEO engineer, copywriter</span>
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0" /> Overworked account manager juggling 30 clients</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">ROI Accountability</td>
                    <td className="p-5 font-semibold text-foreground bg-[#ff6a00]/5">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Milestone-based deliverables & contract flexibility</span>
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0" /> Rigid 12-month lock-in contracts</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Why Choose Section */}
      <section className="py-24 bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 text-white px-6 border-y border-indigo-500/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] font-bold text-xs uppercase tracking-widest border border-[#ff6a00]/30">
            Agency Track Record
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black leading-tight text-white">
            {data.whyTitle}
          </h2>
          <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {data.whyDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">98%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Client Retention Rate</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-[#ff6a00]">57%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Average ROMI Lift</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">18+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-green-400">1250+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Clarity & Answers</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-border/60 rounded-2xl bg-card text-card-foreground overflow-hidden shadow-xs hover:border-[#ff6a00]/40 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-foreground hover:text-[#ff6a00] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#ff6a00] transition-transform duration-300 ${
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
                      <p className="p-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/40 text-left">
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

      {/* 11. High-Impact Closing CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-white px-6 relative text-center">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white max-w-2xl mx-auto leading-tight drop-shadow-xs">
            Ready to Outrank Competitors & Double Inbound Conversions?
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Join 540+ global businesses scaling with Eon8's certified growth architects. Receive your tailored multi-channel strategy today.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-white text-[#ff6a00] hover:bg-slate-50 font-bold h-14 px-8 text-base shadow-2xl hover:scale-105 transition-transform cursor-pointer gap-2"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <a href="tel:+919042294007">
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full border-2 border-white/60 text-white hover:bg-white/10 font-bold h-14 px-8 text-base cursor-pointer gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 90422 94007</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
