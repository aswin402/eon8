import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { nftPagesData } from './nftPagesData';
import { 
  ChevronDown, ArrowRight, Check, ShieldCheck, 
  Share2, MessageCircle, BarChart3, Radio, 
  Video, Globe, Zap, Users, Gem, Megaphone, Flame,
  Compass, Eye, Award, Hammer, RefreshCw, Sparkles,
  Phone, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Map indices to different icons for visual variety
const ICON_POOL = [
  Gem, Megaphone, Eye, Share2, MessageCircle, 
  BarChart3, Radio, Video, Globe, 
  ShieldCheck, Zap, Users, Flame, Compass, Award, Hammer
];

const PR_PUBLICATIONS = [
  'CoinTelegraph',
  'Bloomberg',
  'Yahoo Finance',
  'Business Insider',
  'Forbes',
  'Decrypt',
  'Benzinga',
  'CoinDesk'
];

const DISCORD_PILLARS = [
  {
    title: '24/7 Global Moderation',
    desc: 'Trained Web3 moderators operating around the clock across APAC, EMEA, and Americas to squash FUD, welcome new members, and keep engagement high.'
  },
  {
    title: 'Strategic Whitelist Colabs',
    desc: 'Direct partnerships with leading blue-chip NFT DAOs and alpha communities to drive high-intent whitelist applications.'
  },
  {
    title: 'Custom Bot Architecture',
    desc: 'Verification bots, automated floor-price trackers, gas alerts, and gamified leveling systems tailored to your project lore.'
  },
  {
    title: 'Community Quests & Raids',
    desc: 'High-energy Twitter raids, meme competitions, poker nights, and AMAs that turn casual holders into passionate brand evangelists.'
  }
];

interface NftServicePageProps {
  type: string;
}

export function NftServicePage({ type }: NftServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePillar, setActivePillar] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadHandle, setLeadHandle] = useState('');
  const [projectStage, setProjectStage] = useState('Pre-Mint / Whitelist Phase');
  const [captchaNum1, setCaptchaNum1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [captchaNum2, setCaptchaNum2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = nftPagesData[type];

  // Dynamically update SEO head details
  useEffect(() => {
    if (data) {
      document.title = data.metaTitle || `${data.heroTitle} | Eon8`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc || "Eon8 NFT marketing and promotion services");
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
      gsap.fromTo('.nft-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // Staggered cards reveal
      gsap.fromTo('.nft-card-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.nft-cards-trigger',
            start: 'top 80%',
          }
        }
      );

      // Staggered process steps
      gsap.fromTo('.nft-step-reveal',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.nft-steps-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data, type]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadName.trim() || !leadEmail.trim() || !leadHandle.trim()) {
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
      console.log('NFT Lead Submitted:', {
        service: data?.heroTitle,
        name: leadName,
        email: leadEmail,
        handle: leadHandle,
        stage: projectStage
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
        <p className="text-muted-foreground mt-2">The requested NFT or Discord service page could not be located.</p>
        <Link to="/" className="inline-block mt-4 text-[#ff6a00] hover:underline font-bold">Return Home</Link>
      </div>
    );
  }

  const pillars = [
    {
      title: 'Create Hype',
      subtitle: 'Explosive Organic Awareness',
      desc: 'We generate viral interest before public minting through strategic Twitter (X) space takeovers, influencer partnership drops, and PR features on CoinTelegraph & Decrypt.'
    },
    {
      title: 'Drive Value',
      subtitle: 'Floor Price Stability & Volume',
      desc: 'Protect and elevate secondary trading volume on OpenSea, Blur, and Magic Eden by formulating compelling holder utilities, dynamic staking, and real-world perks.'
    },
    {
      title: 'Build Community',
      subtitle: 'Raving Cult Discord Followers',
      desc: 'Transform passive speculators into passionate lifelong advocates through 24/7 dedicated Discord moderation, gamified leveling, alpha calls, and live community AMAs.'
    }
  ];

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Breadcrumb Strip */}
      <div className="bg-slate-900 border-b border-white/10 py-3.5 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-300">NFT Marketing</span>
          <span>/</span>
          <span className="text-[#ff6a00] font-semibold truncate max-w-[280px] sm:max-w-md">{data.heroTitle}</span>
        </div>
      </div>

      {/* 2. Signature Split Hero Section with Inline Lead Card */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0c0517] via-[#1a0a2e] to-[#080210] text-white border-b border-purple-500/10 overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6a00]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Proof Metrics */}
            <div className="lg:col-span-7 space-y-6 text-left nft-hero-content">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6a00]/15 border border-[#ff6a00]/30 rounded-full text-[#ff6a00] text-xs font-bold uppercase tracking-wider">
                <Gem className="w-3.5 h-3.5 animate-pulse" />
                <span>NFT Mint-Out & Community Specialists</span>
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
                  <span>Book Free NFT Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <a href="#pillars">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-[#ff6a00] hover:bg-white/5 rounded-xl border border-white/20 px-6 h-12 sm:h-13 font-bold text-sm cursor-pointer transition-colors"
                  >
                    <span>View 3-Pillar Method</span>
                  </Button>
                </a>
              </div>

              {/* Proof highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#ff6a00]">95+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Mint-Out Launches</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-white">$65M+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Secondary Volume</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-green-400">1.8M+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Discord Members</p>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Capture Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6a00]">Mint-Out Strategy</span>
                  <h3 className="text-2xl font-heading font-extrabold text-white mt-1">Reach Out To Us</h3>
                  <p className="text-xs text-slate-400 mt-1">Get an expert NFT launch roadmap within 5 minutes.</p>
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
                        placeholder="Email Address *"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Discord or Twitter (X) Username *"
                        value={leadHandle}
                        onChange={(e) => setLeadHandle(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all font-mono"
                      />
                    </div>

                    <div>
                      <select
                        value={projectStage}
                        onChange={(e) => setProjectStage(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff6a00]"
                      >
                        <option value="Pre-Mint / Whitelist Phase" className="bg-slate-900 text-white">Stage: Pre-Mint / Whitelist</option>
                        <option value="Discord Community Scaling" className="bg-slate-900 text-white">Stage: Discord Community Growth</option>
                        <option value="Post-Mint Secondary Volume" className="bg-slate-900 text-white">Stage: Post-Mint Volume</option>
                        <option value="Gaming / Metaverse Integration" className="bg-slate-900 text-white">Stage: Gaming / Utility Launch</option>
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
                          <span>Auditing Project...</span>
                        </>
                      ) : (
                        <span>Request Free NFT Strategy</span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="inline-flex p-3 bg-green-500/10 rounded-full border border-green-500/20 text-green-400">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-heading font-extrabold text-white">Strategy Request Received!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{leadName}</strong>. Our senior NFT growth director will reach out via Discord (<strong className="text-white">{leadHandle}</strong>) or email shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setLeadName('');
                        setLeadEmail('');
                        setLeadHandle('');
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

      {/* 3. Tier 1 Publications Marquee */}
      <section className="py-8 bg-slate-950 border-b border-border/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            We Helped Our Clients Take Their Biggest Step Across Tier-1 Publications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80">
            {PR_PUBLICATIONS.map((pub) => (
              <span key={pub} className="font-heading font-extrabold text-base sm:text-lg text-slate-300 tracking-wider hover:text-[#ff6a00] transition-colors select-none">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strategic Overview / Intro */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] font-bold text-xs uppercase tracking-widest">
          High-Velocity Execution
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
          {data.introTitle}
        </h2>
        <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full" />
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-normal">
          {data.introDesc}
        </p>
      </section>

      {/* 5. 3-Pillar Framework Section (Create Hype, Drive Value, Build Community) */}
      <section id="pillars" className="py-20 bg-muted/20 border-y border-border/40 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">The Eon8 Formula</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black">Our 3-Pillar NFT Growth Engine</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              You know how to make great NFTs. We know how to sell them out.
            </p>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pil, idx) => (
              <div 
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={`bg-card text-card-foreground border p-8 rounded-3xl cursor-pointer transition-all duration-300 relative text-left shadow-sm ${
                  activePillar === idx 
                    ? 'border-[#ff6a00] shadow-xl ring-1 ring-[#ff6a00] -translate-y-1' 
                    : 'border-border/60 hover:border-border'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center font-bold text-lg mb-5">
                  {`0${idx + 1}`}
                </div>
                <h3 className="text-2xl font-heading font-extrabold mb-1">{pil.title}</h3>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#ff6a00] mb-3">{pil.subtitle}</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Discord & Community Architecture Deck */}
      <section className="py-24 bg-background px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">Social HQ</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">Discord & Community Marketing</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Building active, engaged servers that generate organic FOMO.
            </p>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {DISCORD_PILLARS.map((col, idx) => (
              <div 
                key={idx}
                className="bg-card text-card-foreground border border-border/60 p-8 rounded-3xl shadow-sm hover:border-[#ff6a00] hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-xl">{col.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Extensive NFT Capabilities Grid */}
      <section id="services" className="py-24 bg-muted/20 border-y border-border/40 px-6 nft-cards-trigger">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Full Spectrum Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.servicesTitle || "Our Core NFT Marketing Services"}</h2>
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
                  className="nft-card-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00] p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
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

      {/* 8. NFT Marketing Roadmap (Process Steps) */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-6 bg-background nft-steps-trigger">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Campaign Roadmap</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.processTitle}</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">From initial lore definition to secondary market floor price defense.</p>
              <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {data.processSteps.map((st, idx) => (
                <div 
                  key={idx}
                  className="nft-step-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00]/50 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-lg transition-all"
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
      <section className="py-24 bg-gradient-to-tr from-slate-900 via-slate-950 to-purple-950 text-white px-6 border-y border-purple-500/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] font-bold text-xs uppercase tracking-widest border border-[#ff6a00]/30">
            Proven Performance
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
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">100%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Organic Whitelisting</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-[#ff6a00]">24/7</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Discord Moderation</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">18+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-green-400">95+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Successful Mint-Outs</p>
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
            Ready to Make Your NFT Collection The Next Big Web3 Sensation?
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Partner with Asia's premier NFT marketing agency. Connect with our senior launch strategists to formulate your viral roadmap.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-white text-[#ff6a00] hover:bg-slate-50 font-bold h-14 px-8 text-base shadow-2xl hover:scale-105 transition-transform cursor-pointer gap-2"
            >
              <span>Schedule Strategy Call</span>
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
