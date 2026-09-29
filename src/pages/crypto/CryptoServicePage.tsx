import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { cryptoPagesData } from './cryptoPagesData';
import { 
  ChevronDown, ArrowRight, Check, Coins, 
  Share2, MessageCircle, BarChart3, Radio, 
  Video, Globe, ShieldCheck, Zap, Users,
  Gem, Megaphone, Flame, RefreshCw, Sparkles,
  Phone, CheckCircle2, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

const PR_PUBLICATIONS = [
  'CoinTelegraph',
  'Bloomberg',
  'Yahoo Finance',
  'Business Insider',
  'CoinDesk',
  'Forbes',
  'Benzinga',
  'Decrypt'
];

const PROJECT_TYPES = [
  { name: 'NFT Marketing', desc: 'Pre-mint hype, whitelist mechanics, and blue-chip collector onboarding.' },
  { name: 'ICO Marketing', desc: 'Compliant global investor outreach and seed round momentum.' },
  { name: 'STO Marketing', desc: 'Security token offerings with accredited institutional positioning.' },
  { name: 'IDO Marketing', desc: 'Decentralized launchpad distribution and liquidity pair seeding.' },
  { name: 'IEO Marketing', desc: 'Tier-1 exchange launchpad coordination and trading volume support.' },
  { name: 'DeFi & Protocol Marketing', desc: 'TVL growth, yield farming incentive promotion, and DAO governance.' }
];

interface CryptoServicePageProps {
  type: string;
}

export function CryptoServicePage({ type }: CryptoServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFunnelTab, setActiveFunnelTab] = useState<'attract' | 'engage' | 'convert'>('attract');
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadHandle, setLeadHandle] = useState('');
  const [projectStage, setProjectStage] = useState('Concept / Pre-Launch');
  const [captchaNum1, setCaptchaNum1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [captchaNum2, setCaptchaNum2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // Staggered cards reveal
      gsap.fromTo('.cry-card-reveal',
        { opacity: 0, y: 35 },
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
      console.log('Crypto Lead Submitted:', {
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
        <p className="text-muted-foreground mt-2">The requested crypto service page could not be located.</p>
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
          <span className="text-slate-300">Crypto Marketing</span>
          <span>/</span>
          <span className="text-[#ff6a00] font-semibold truncate max-w-[280px] sm:max-w-md">{data.heroTitle}</span>
        </div>
      </div>

      {/* 2. Signature Split Hero Section with Inline Lead Card */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#070b19] via-[#0d1633] to-[#050814] text-white border-b border-blue-500/10 overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6a00]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Web3 Metrics */}
            <div className="lg:col-span-7 space-y-6 text-left cry-hero-content">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6a00]/15 border border-[#ff6a00]/30 rounded-full text-[#ff6a00] text-xs font-bold uppercase tracking-wider">
                <Coins className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Web3 & Crypto Growth Specialists</span>
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
                  <span>Book Web3 Strategy Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <a href="#funnel">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-[#ff6a00] hover:bg-white/5 rounded-xl border border-white/20 px-6 h-12 sm:h-13 font-bold text-sm cursor-pointer transition-colors"
                  >
                    <span>View Growth Funnel</span>
                  </Button>
                </a>
              </div>

              {/* Proof highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#ff6a00]">180+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Token Launches</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-white">$420M+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Volume Generated</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-green-400">1.2M+</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-semibold uppercase">Community Scaled</p>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Capture Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6a00]">Fast Execution Squad</span>
                  <h3 className="text-2xl font-heading font-extrabold text-white mt-1">Reach Out To Us</h3>
                  <p className="text-xs text-slate-400 mt-1">Connect with our Web3 Growth Architects within 5 minutes.</p>
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
                        placeholder="Your Name *"
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
                        placeholder="Telegram or Discord Handle *"
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
                        <option value="Concept / Pre-Launch" className="bg-slate-900 text-white">Stage: Concept / Pre-Launch</option>
                        <option value="TGE / Presale Upcoming" className="bg-slate-900 text-white">Stage: TGE / Presale Upcoming</option>
                        <option value="Live Token / Scaling Trading Volume" className="bg-slate-900 text-white">Stage: Live Token / Scaling Volume</option>
                        <option value="DeFi / NFT Project Scale" className="bg-slate-900 text-white">Stage: DeFi / NFT Project Scale</option>
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
                          <span>Connecting Strategist...</span>
                        </>
                      ) : (
                        <span>Submit Campaign Inquiry</span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="inline-flex p-3 bg-green-500/10 rounded-full border border-green-500/20 text-green-400">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-heading font-extrabold text-white">Inquiry Sent Successfully!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{leadName}</strong>. Our crypto strategy director will reach out via Telegram/Discord (<strong className="text-white">{leadHandle}</strong>) or email shortly.
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
          Web 3.0 Market Dominance
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
          {data.introTitle}
        </h2>
        <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full" />
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-normal">
          {data.introDesc}
        </p>
      </section>

      {/* 5. 3-Stage Growth Funnel (Attract, Engage, Convert) */}
      <section id="funnel" className="py-20 bg-muted/20 border-y border-border/40 px-6">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">Proprietary Framework</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black mt-1">Get Maximum ROI With Our Crypto Strategy</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              A comprehensive three-stage funnel engineered to transform cold retail into committed token holders.
            </p>
          </div>

          {/* Interactive Funnel Switcher */}
          <div className="inline-flex p-1.5 bg-card border border-border/60 rounded-2xl shadow-sm gap-2">
            {[
              { id: 'attract', label: '1. Attract (Awareness)', icon: Flame },
              { id: 'engage', label: '2. Engage (Community)', icon: Users },
              { id: 'convert', label: '3. Convert (Holders & Volume)', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFunnelTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFunnelTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#ff6a00] text-white shadow-md' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Cards */}
          <div className="bg-card text-card-foreground border border-border/60 p-8 sm:p-10 rounded-3xl shadow-lg text-left">
            {activeFunnelTab === 'attract' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#ff6a00]">Stage 01: Global Discovery</span>
                <h3 className="text-2xl font-heading font-extrabold">Top-of-Funnel Virality & Mass Reach</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We generate intense organic discovery across YouTube, Twitter (X) spaces, DEXTools trending, CoinMarketCap top-gainers, and digital PR publications (CoinDesk, CoinTelegraph) to ensure your token lands on every investor's watchlist.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40 text-xs">
                  <div className="p-3 bg-muted/40 rounded-xl">✓ 500+ Tier-1 Crypto Influencers Network</div>
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Viral Meme & Narrative Amplification</div>
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Guaranteed Press Releases & Syndication</div>
                </div>
              </div>
            )}

            {activeFunnelTab === 'engage' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#ff6a00]">Stage 02: Cult Formation</span>
                <h3 className="text-2xl font-heading font-extrabold">24/7 Telegram & Discord Community Management</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Attracting eyeballs is meaningless without converting them into raving believers. Our crypto-native community moderators operate 24/7 across Asian, European, and US time zones to answer technical questions, run AMAs, and squash FUD instantly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40 text-xs">
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Multi-Lingual Moderation Squads</div>
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Gamified Zealy & Galxe Quests</div>
                  <div className="p-3 bg-muted/40 rounded-xl">✓ High-Impact Twitter / Discord AMAs</div>
                </div>
              </div>
            )}

            {activeFunnelTab === 'convert' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#ff6a00]">Stage 03: Liquidity Compounding</span>
                <h3 className="text-2xl font-heading font-extrabold">Token Sales, Staking & Sustained Market Volume</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We orchestrate seamless token generation events (TGE), whitelist distribution, decentralized exchange (Uniswap/Raydium/PancakeSwap) liquidity provisioning, and tier-1 centralized exchange (MEXC, Gate.io, KuCoin, Bybit) listing promotions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40 text-xs">
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Direct CEX Listing Fast-Track</div>
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Market Maker Coordination & Depth</div>
                  <div className="p-3 bg-muted/40 rounded-xl">✓ Staking & Token Utility Architecture</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. Extensive Crypto Services Grid */}
      <section id="services" className="py-24 bg-background px-6 cry-cards-trigger">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Full Spectrum Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.servicesTitle || "Our Crypto Marketing Services"}</h2>
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
                  className="cry-card-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00] p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-white rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-foreground">{srv.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-border/40 mt-6 flex items-center justify-between text-xs font-semibold text-[#ff6a00]">
                    <span>Web3 Native Protocol</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Different Project Types We Cover */}
      <section className="py-20 bg-muted/20 border-y border-border/40 px-6">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a00]">Ecosystem Reach</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black mt-1">We Cover Crypto Marketing For Different Projects</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              Customized playbooks tailored to your specific tokenomics and consensus model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {PROJECT_TYPES.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-card text-card-foreground border border-border/60 p-6 rounded-2xl shadow-xs hover:border-[#ff6a00] hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center font-bold text-xs">
                    {`0${idx + 1}`}
                  </div>
                  <h4 className="font-heading font-bold text-lg">{proj.name}</h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Campaign Roadmap (Process Workflow) */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-6 bg-background cry-steps-trigger">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[#ff6a00] font-bold uppercase tracking-wider text-xs">Launch Roadmap</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black">{data.processTitle}</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">A structured 5-stage flight path to market dominance.</p>
              <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {data.processSteps.map((st, idx) => (
                <div 
                  key={idx}
                  className="cry-step-reveal bg-card text-card-foreground border border-border/60 hover:border-[#ff6a00]/50 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-lg transition-all"
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
      <section className="py-24 bg-gradient-to-tr from-slate-900 via-slate-950 to-blue-950 text-white px-6 border-y border-blue-500/10 relative">
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
              <p className="text-xs text-slate-400 uppercase tracking-wider">Transparent Telemetry</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-[#ff6a00]">24/7</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Global Moderation</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">18+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-green-400">0%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Bot Vanity Followers</p>
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
            Ready to Launch the Next Blue-Chip Web 3.0 Phenomenon?
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Partner with Asia's leading crypto marketing agency. Connect with our senior token strategists to formulate your viral launch roadmap.
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
