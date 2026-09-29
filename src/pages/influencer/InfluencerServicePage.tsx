import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { influencerPagesData } from './influencerPagesData';
import { 
  ChevronDown, ArrowRight, Check, Users, 
  Share2, MessageCircle, BarChart3, Video, 
  Globe, ShieldCheck, Zap, Flame, Compass,
  RefreshCw, Sparkles, Phone, CheckCircle2,
  Award, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Map indices to different icons for visual variety
const ICON_POOL = [
  Users, Share2, MessageCircle, BarChart3, Video, 
  Globe, ShieldCheck, Zap, Flame, Compass, Award, Eye
];

const PLATFORMS = [
  'YouTube',
  'Instagram',
  'TikTok',
  'LinkedIn',
  'Twitter (X)',
  'Twitch',
  'Snapchat',
  'Telegram'
];

const INFLUENCER_TIERS = [
  {
    tier: 'Nano Creators',
    range: '1K – 10K Followers',
    desc: 'Hyper-focused local communities with 7-10% engagement rates. Best for authentic user-generated content (UGC) and initial product proof.',
    roi: '8.4x Engagement Avg'
  },
  {
    tier: 'Micro Influencers',
    range: '10K – 100K Followers',
    desc: 'Deep niche subject-matter authorities in tech, beauty, gaming, and finance with exceptional audience loyalty and trust.',
    roi: 'Highest Sales Conversion'
  },
  {
    tier: 'Macro Influencers',
    range: '100K – 1M Followers',
    desc: 'Broad category leaders capable of driving massive brand awareness spikes, high video views, and retail footfall.',
    roi: 'Rapid Market Reach'
  },
  {
    tier: 'Mega & Celebrities',
    range: '1M+ Followers',
    desc: 'Household cultural names that instantly position your brand as a market leader during flagship product releases.',
    roi: 'Maximum Cultural Impact'
  }
];

const CONTENT_FORMATS = [
  { name: 'Dedicated Video Reviews', desc: 'In-depth long-form YouTube and tutorial showcases highlighting product benefits.' },
  { name: 'Short-Form Reels & Shorts', desc: 'Viral 30-60 second hooks on Instagram, TikTok, and YouTube Shorts for quick action.' },
  { name: 'Unboxing & Live Demos', desc: 'First-hand authentic unboxing reactions and live-stream interactive product trials.' },
  { name: 'Event & Store Visits', desc: 'On-ground VIP creator invitations to store openings, popups, and product launches.' }
];

interface InfluencerServicePageProps {
  type: string;
}

export function InfluencerServicePage({ type }: InfluencerServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadBrand, setLeadBrand] = useState('');
  const [primaryPlatform, setPrimaryPlatform] = useState('Instagram & YouTube');
  const [captchaNum1, setCaptchaNum1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [captchaNum2, setCaptchaNum2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = influencerPagesData[type];

  // Dynamically update SEO head details
  useEffect(() => {
    if (data) {
      document.title = data.metaTitle || `${data.heroTitle} | Eon8`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc || "Eon8 influencer marketing and promotion services");
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
      gsap.fromTo('.inf-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // Staggered cards reveal
      gsap.fromTo('.inf-card-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.inf-cards-trigger',
            start: 'top 80%',
          }
        }
      );

      // Staggered process steps
      gsap.fromTo('.inf-step-reveal',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.inf-steps-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data, type]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadName.trim() || !leadEmail.trim() || !leadBrand.trim()) {
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
      console.log('Influencer Lead Submitted:', {
        service: data?.heroTitle,
        name: leadName,
        email: leadEmail,
        brand: leadBrand,
        platform: primaryPlatform
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
        <p className="text-muted-foreground mt-2">The requested influencer service page could not be located.</p>
        <Link to="/" className="inline-block mt-4 text-[#ff6a00] hover:underline font-bold">Return Home</Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* Signature Split Hero Section with Integrated Breadcrumbs and Lead Form */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 bg-gradient-to-br from-[#0e0719] via-[#150d24] to-[#080312] text-white border-b border-purple-500/10 overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6a00]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
          {/* Integrated Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Influencer Marketing</span>
            <span>/</span>
            <span className="text-[#ff6a00] font-semibold truncate max-w-[280px] sm:max-w-md">{data.heroTitle}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Proof Metrics */}
            <div className="lg:col-span-7 space-y-6 text-left inf-hero-content">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6a00]/15 border border-[#ff6a00]/30 rounded-full text-[#ff6a00] text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Premier Influencer Marketing Agency</span>
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
                  <span>Connect with Creator Strategist</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <a href="#tiers">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-[#ff6a00] hover:bg-white/5 rounded-xl border border-white/20 px-6 h-12 sm:h-13 font-bold text-sm cursor-pointer transition-colors"
                  >
                    <span>View Creator Tiers</span>
                  </Button>
                </a>
              </div>

              {/* Proof highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#ff6a00]">500+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Campaigns Delivered</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-white">200M+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Viral Impressions</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-green-400">10,000+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Vetted Creators</p>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Capture Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6a00]">Custom Creator Roster</span>
                  <h3 className="text-2xl font-heading font-extrabold text-white mt-1">Request Free Quote</h3>
                  <p className="text-xs text-slate-400 mt-1">Receive a vetted creator shortlist within 24 hours.</p>
                </div>

                {formError && (
                  <div className="mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    {formError}
                  </div>
                )}

                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Work Email Address *"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Brand or Website Name *"
                        value={leadBrand}
                        onChange={(e) => setLeadBrand(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    <div>
                      <select
                        value={primaryPlatform}
                        onChange={(e) => setPrimaryPlatform(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff6a00]"
                      >
                        <option value="Instagram & YouTube" className="bg-slate-900 text-white">Target: Instagram & YouTube</option>
                        <option value="TikTok & Shorts Virality" className="bg-slate-900 text-white">Target: TikTok & Shorts</option>
                        <option value="LinkedIn Executive Creators" className="bg-slate-900 text-white">Target: LinkedIn B2B Thought Leaders</option>
                        <option value="Twitter (X) & Web3 Influencers" className="bg-slate-900 text-white">Target: Twitter (X) & Web3 KOLs</option>
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
                          <span>Matching Creators...</span>
                        </>
                      ) : (
                        <span>Get Vetted Influencer Roster</span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="inline-flex p-3 bg-green-500/10 rounded-full border border-green-500/20 text-green-400">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-heading font-extrabold text-white">Roster Request Received!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{leadName}</strong>. Our creator casting team is matching top influencers for <strong className="text-white">{leadBrand}</strong> and will contact you at <strong className="text-white">{leadEmail}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setLeadName('');
                        setLeadEmail('');
                        setLeadBrand('');
                        refreshCaptcha();
                      }}
                      className="text-xs text-[#ff6a00] hover:underline font-bold"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Platform Channels Marquee */}
      <section className="py-8 bg-slate-950 border-b border-border/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Multi-Platform Creator Reach & Activation Network
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
            {PLATFORMS.map((platform) => (
              <span key={platform} className="font-heading font-extrabold text-base sm:text-lg text-slate-300 tracking-wider hover:text-[#ff6a00] transition-colors select-none">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strategic Overview / Intro */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] font-bold text-xs uppercase tracking-widest">
          Creator Economy Mastery
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
          {data.introTitle}
        </h2>
        <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full" />
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-normal">
          {data.introDesc}
        </p>
      </section>

      {/* 5. Influencer Tiers Matrix */}
      <section id="tiers" className="py-20 bg-muted/20 border-y border-border/40 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">Audience Segmentation</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black">Influencer Tiers Tailored to Your Goals</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              We blend creators across tiers to maximize both cost-effective conversions and mass cultural reach.
            </p>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFLUENCER_TIERS.map((tier, idx) => (
              <div 
                key={idx}
                className="bg-card text-card-foreground border border-border/60 p-6 rounded-3xl shadow-sm hover:border-[#ff6a00] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] text-xs font-bold uppercase">
                    {tier.roi}
                  </div>
                  <h3 className="text-xl font-heading font-extrabold">{tier.tier}</h3>
                  <p className="text-xs font-bold text-slate-500 font-mono">{tier.range}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">{tier.desc}</p>
                </div>
                <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs font-semibold text-[#ff6a00]">
                  <span>Vetted Roster Available</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Campaign Content Formats */}
      <section className="py-24 bg-background px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">Creative Execution</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">High-Impact Campaign Content Formats</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Formats engineered to drive real clicks, app installs, and e-commerce checkouts.
            </p>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {CONTENT_FORMATS.map((fmt, idx) => (
              <div 
                key={idx}
                className="bg-card text-card-foreground border border-border/60 p-8 rounded-3xl shadow-sm hover:border-[#ff6a00] hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center font-bold text-sm">
                    <Video className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-xl">{fmt.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Extensive Influencer Services Grid */}
      <section id="services" className="py-24 bg-muted/20 border-y border-border/40 px-6 inf-cards-trigger">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Capabilities Blueprint</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.servicesTitle || "Our Influencer Marketing Services"}</h2>
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
                  className="inf-card-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00] p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-white rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-foreground">{srv.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-border/40 mt-6 flex items-center justify-between text-xs font-semibold text-[#ff6a00]">
                    <span>Managed End-to-End</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. 8-Step Campaign Roadmap */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-6 bg-background inf-steps-trigger">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Campaign Roadmap</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.processTitle}</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">From creator casting to synchronized multi-platform launch.</p>
              <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {data.processSteps.map((st, idx) => (
                <div 
                  key={idx}
                  className="inf-step-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00]/50 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-lg transition-all"
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

      {/* 9. Why Partner with Eon8 Section */}
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
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">0%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Fake Bot Audiences</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-[#ff6a00]">100%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Usage Rights Included</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">18+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-green-400">500+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Campaigns Delivered</p>
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
            Ready to Ignite Massive Brand Recall with Top Creators?
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Connect with our creator partnership directors to get your custom shortlisted influencer roster today.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-white text-[#ff6a00] hover:bg-slate-50 font-bold h-14 px-8 text-base shadow-2xl hover:scale-105 transition-transform cursor-pointer gap-2"
            >
              <span>Schedule Creator Strategy Session</span>
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
