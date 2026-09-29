import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { cryptoPagesData } from './cryptoPagesData';
import { 
  ChevronDown, ArrowRight, Coins, 
  MessageCircle, BarChart3, Radio, 
  Video, Globe, ShieldCheck, Zap, Users,
  Gem, Megaphone, Flame, RefreshCw, Sparkles,
  Phone, CheckCircle2, TrendingUp, Layers, Rocket, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Pool of icons for dynamic services
const ICON_POOL = [
  Coins, Megaphone, MessageCircle, BarChart3, 
  Radio, Video, Globe, ShieldCheck, 
  Zap, Users, Gem, Flame, Layers, Rocket, Target
];

// 10 authentic Web3 client logos downloaded directly from live Eon8
const CLIENT_LOGOS = [
  { name: 'Street Race', src: '/imgs/crypto/street-race.png' },
  { name: 'Space Park Freaks', src: '/imgs/crypto/space-park-freaks.png' },
  { name: 'Rebe World', src: '/imgs/crypto/rebe-world.png' },
  { name: 'Mafia Dogs', src: '/imgs/crypto/mafia-dogs.png' },
  { name: 'Galaxy Fight Club', src: '/imgs/crypto/Galaxy-Fight-Club.png' },
  { name: 'Diamonds Club', src: '/imgs/crypto/diamonds-club.png' },
  { name: 'Cryptorus', src: '/imgs/crypto/cryptorus.png' },
  { name: 'Bad Influence', src: '/imgs/crypto/Bad-Influence.png' },
  { name: 'Alphacadabraz', src: '/imgs/crypto/Alphacadabraz.png' },
  { name: 'THS Logo', src: '/imgs/crypto/ths-logo.png' }
];

// Interactive Service Chips for Value section
const SERVICE_CHIPS = [
  { name: 'NFT Marketing', path: '/nft-marketing-services' },
  { name: 'Discord Agency', path: '/discord-marketing-agency' },
  { name: 'Influencer Marketing', path: '/influencer-marketing-agency' },
  { name: 'Community Building', path: '/discord-community-building-services' },
  { name: 'Crypto PR', path: '/crypto-pr-services' },
  { name: 'Telegram Growth', path: '/crypto-telegram-marketing' },
  { name: 'ICO Marketing', path: '/ico-marketing-agency' },
  { name: 'IDO Marketing', path: '/ido-marketing-agency' },
  { name: 'IEO Marketing', path: '/ieo-marketing-agency' }
];

const PROJECT_TYPES = [
  { name: 'NFT Marketing', desc: 'Pre-mint hype, whitelist mechanics, Discord architecture, and blue-chip collector onboarding.' },
  { name: 'ICO Marketing', desc: 'Compliant global investor outreach, tokenomics modeling, and seed/private round momentum.' },
  { name: 'STO Marketing', desc: 'Security token offerings with accredited institutional positioning and investor verification.' },
  { name: 'IDO Marketing', desc: 'Decentralized launchpad distribution, liquidity pair seeding, and community token allocation.' },
  { name: 'IEO Marketing', desc: 'Tier-1 exchange launchpad coordination, market-making depth, and international trading volume support.' },
  { name: 'DeFi & Protocol Marketing', desc: 'TVL growth, yield farming incentive promotion, DEX volume acceleration, and DAO governance.' }
];

interface CryptoServicePageProps {
  type: string;
}

export function CryptoServicePage({ type }: CryptoServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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
      document.title = data.metaTitle || `${data.heroTitle} | Eon8 Crypto`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc || "Eon8 Cryptocurrency marketing and Web3 promotion services");
      }
      window.scrollTo(0, 0);
    }
  }, [data, type]);

  // GSAP scroll animations
  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.cry-hero-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo('.cry-card-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cry-cards-trigger',
            start: 'top 85%',
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading">Crypto Service Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested crypto service page could not be located.</p>
        <Link to="/">
          <Button variant="outline" className="rounded-full border-orange-500 text-orange-500">
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body selection:bg-orange-500 selection:text-white">
      
      {/* Signature Split Hero Section (Home Page Theme Colors & Style) with Integrated Breadcrumbs */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-b border-border/30 overflow-hidden">
        {/* Ambient Glows matching Home Page */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-orange-500/15 via-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          {/* Integrated Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/crypto-marketing-agency" className="text-slate-400 hover:text-white transition-colors">Crypto Marketing</Link>
            <span>/</span>
            <span className="text-orange-500 font-semibold truncate max-w-[260px] sm:max-w-md">{data.heroTitle}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headline and Features */}
            <div className="lg:col-span-7 space-y-6 text-left cry-hero-content">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Web3 & Crypto Growth Specialists</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1] text-white">
                {data.heroTitle}
              </h1>

              {data.heroSubtitle && (
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                  {data.heroSubtitle}
                </p>
              )}

              {/* 2x2 Feature Check Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg">
                {[
                  'Get Measurable results',
                  'Competitor analysis',
                  'Scale without hiring',
                  'In-depth experience'
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
                    <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons matching Home Page Button Styles */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button 
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 sm:h-14 px-8 text-sm sm:text-base shadow-xl shadow-orange-500/25 hover:scale-102 transition-all cursor-pointer gap-2"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <a
                  href="https://api.whatsapp.com/send?phone=919042294007"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold h-12 sm:h-14 px-7 text-sm flex items-center gap-2 hover:scale-102 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Whatsapp Us</span>
                </a>

                <a 
                  href="tel:+919042294007" 
                  className="text-xs font-semibold text-slate-300 hover:text-orange-400 flex items-center gap-1.5 transition-colors ml-1"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>+91 90422 94007</span>
                </a>
              </div>

              {/* Proof highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-orange-500">180+</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">Token Launches</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-white">$420M+</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">Volume Generated</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-emerald-400">1.2M+</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">Community Scaled</p>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Capture Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 dark:bg-slate-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-5 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">Fast Execution Squad</span>
                  <h3 className="text-2xl font-heading font-extrabold text-white mt-1">Reach Out To Us</h3>
                  <p className="text-xs text-slate-400 mt-1">Connect with our Web3 Growth Architects within 5 minutes.</p>
                </div>

                {formError && (
                  <div className="mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    {formError}
                  </div>
                )}

                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Work Email Address *"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Telegram or Discord Handle *"
                        value={leadHandle}
                        onChange={(e) => setLeadHandle(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <select
                        value={projectStage}
                        onChange={(e) => setProjectStage(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/15 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
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
                        <span className="text-xs font-mono font-bold tracking-wide text-orange-400">
                          Security: {captchaNum1} + {captchaNum2} = ?
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
                      className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25 cursor-pointer mt-2"
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
                    <div className="inline-flex p-3 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400">
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
                      className="text-xs text-orange-400 hover:underline font-bold"
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

      {/* 3. Authentic Web3 Client Logo Infinite Marquee */}
      <section className="py-12 bg-muted/20 border-b border-border/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
              We Helped Our Clients Take Their Biggest Step
            </h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-lg mx-auto">
              Trusted by leading blockchain ecosystems, gamefi metaverses, and decentralized projects.
            </p>
          </div>

          {/* Marquee Track Container */}
          <div className="relative overflow-hidden w-full py-4 group">
            {/* Left and right fade gradients */}
            <div className="absolute top-0 left-0 h-full w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee gap-8 sm:gap-12 items-center group-hover:[animation-play-state:paused]">
              {/* Duplicate set for infinite loop */}
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center px-4 py-2 bg-card border border-border/40 rounded-2xl w-44 h-20 shrink-0 hover:border-orange-500/40 hover:shadow-md transition-all"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-12 max-w-[120px] object-contain opacity-75 hover:opacity-100 hover:scale-105 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Viral Growth Engine ("Attract, Engage & Convert") with Floating 3D Icons */}
      <section className="relative py-20 sm:py-28 bg-card border-b border-border/30 overflow-hidden text-center">
        {/* Floating Icons Left */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-8 pointer-events-none">
          <img src="/imgs/crypto/clock-crypto.png" alt="clock" className="w-14 h-14 object-contain animate-bounce-slow opacity-85" />
          <img src="/imgs/crypto/gift-crypto.png" alt="gift" className="w-14 h-14 object-contain animate-bounce-medium opacity-85" />
          <img src="/imgs/crypto/target-crypto.png" alt="target" className="w-14 h-14 object-contain animate-bounce-slow opacity-85" />
        </div>

        {/* Floating Icons Right */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-8 pointer-events-none">
          <img src="/imgs/crypto/heart-crypto.png" alt="heart" className="w-14 h-14 object-contain animate-bounce-medium opacity-85" />
          <img src="/imgs/crypto/crown-crypto.png" alt="crown" className="w-14 h-14 object-contain animate-bounce-slow opacity-85" />
          <img src="/imgs/crypto/image-crypto.png" alt="image" className="w-14 h-14 object-contain animate-bounce-medium opacity-85" />
        </div>

        {/* Center Viral Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="inline-block px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 text-xs font-bold uppercase tracking-widest">
            Attract, Engage & Convert
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight text-foreground">
            {data.heroTitle}
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Crypto marketing sets you apart from your potential competition, helping build trust in your brand. Eon8 is a 360° marketing agency with deep expertise in Web3, tokenomics, and decentralized communities.
          </p>

          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            With exponential crypto growth and rising competition, partnering with a specialized marketing squad is essential to scale your project effectively and thrive in any market condition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 text-sm shadow-xl shadow-orange-500/20 hover:scale-102 transition-all cursor-pointer gap-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <a
              href="https://api.whatsapp.com/send?phone=919042294007"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-card hover:bg-muted border border-border/60 text-foreground font-bold h-12 px-7 text-sm flex items-center gap-2 hover:scale-102 transition-all cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>Whatsapp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Strategic Overview & 3-Step ROI Framework */}
      <section className="py-20 sm:py-28 bg-muted/30 border-b border-border/30 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Title & Value */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Proprietary Framework</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground leading-tight">
              Get Maximum ROI With Our Crypto Marketing Strategy
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded-full" />
            <p className="text-muted-foreground text-sm leading-relaxed pt-2">
              Our Crypto Marketing Services improve the visibility of your token for fundraising and liquidity depth. We make your project stand out and skyrocket your community ROI.
            </p>
          </div>

          {/* Right 3-Step Stack */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {[
              {
                step: '01',
                title: 'Attract',
                desc: 'We analyze your target investor persona, competitor positioning, and launch viral top-of-funnel campaigns across Crypto Twitter (X), YouTube, and tier-1 PR.',
                icon: Flame
              },
              {
                step: '02',
                title: 'Engage',
                desc: 'We turn passive onlookers into zealous believers with 24/7 Telegram & Discord moderation squads, gamified community quests, and high-impact AMAs.',
                icon: Users
              },
              {
                step: '03',
                title: 'Convert',
                desc: 'We convert engaged members into long-term token holders, staking participants, and liquidity providers across DEX and tier-1 CEX listing environments.',
                icon: TrendingUp
              }
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="bg-card text-card-foreground border border-border/50 hover:border-orange-500/50 p-6 rounded-2xl relative transition-all duration-300 hover:-translate-y-1 group flex gap-5 items-start shadow-sm hover:shadow-md"
                >
                  {/* Orange side highlight line on hover */}
                  <div className="w-1.5 h-full absolute left-0 top-0 bg-orange-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center shrink-0 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-orange-500">{st.step}.</span>
                      <h3 className="text-lg font-heading font-extrabold text-foreground">{st.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. "How We Bring Value To Your Cryptos" with Floating 3D Bitcoin */}
      <section className="py-20 sm:py-28 bg-card border-b border-border/30 px-4 sm:px-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Content & Interactive Chips */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Measurable Results</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground leading-tight">
              How We Bring Value To Your Cryptos?
            </h2>

            {/* Interactive Chip Group */}
            <div className="flex flex-wrap gap-2 pt-1">
              {SERVICE_CHIPS.map((chip) => (
                <Link
                  key={chip.name}
                  to={chip.path}
                  className="px-3.5 py-1.5 rounded-full bg-muted/60 border border-border/60 text-muted-foreground text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-xs"
                >
                  {chip.name}
                </Link>
              ))}
            </div>

            <div className="space-y-3 pt-3">
              <div className="flex items-start gap-3 p-3.5 bg-muted/30 border border-border/40 rounded-xl text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Eliminate mistrust in the industry by building rock-solid credibility with tailored Web3 marketing playbooks.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-muted/30 border border-border/40 rounded-xl text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Thrive even in bear markets by delivering the right narrative across crypto-native alpha platforms.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-muted/30 border border-border/40 rounded-xl text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Maximize ROI with scalable, data-driven crypto marketing campaigns and transparent telemetry.</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setContactModalOpen(true)}
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-11 px-7 text-xs shadow-lg shadow-orange-500/20 hover:scale-102 transition-all cursor-pointer"
              >
                Request Custom Crypto Roadmap
              </Button>
            </div>
          </div>

          {/* Right 3D Floating Bitcoin Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-3xl pointer-events-none scale-90" />
              <img
                src="/imgs/bitcoin.png"
                alt="Eon8 Bitcoin Crypto Growth"
                className="w-64 sm:w-80 h-auto object-contain animate-float drop-shadow-[0_0_35px_rgba(255,106,0,0.3)] relative z-10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. Full-Spectrum Capabilities Grid */}
      <section className="py-24 bg-background px-4 sm:px-6 cry-cards-trigger border-b border-border/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">Full Spectrum Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-foreground">
              {data.servicesTitle || "Our Crypto Marketing Services"}
            </h2>
            {data.servicesSubtitle && (
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{data.servicesSubtitle}</p>
            )}
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((srv, idx) => {
              const Icon = ICON_POOL[idx % ICON_POOL.length];
              return (
                <div 
                  key={idx}
                  className="cry-card-reveal bg-card text-card-foreground border border-border/50 hover:border-orange-500/50 p-7 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="w-13 h-13 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-foreground group-hover:text-primary transition-colors">{srv.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-border/30 mt-6 flex items-center justify-between text-xs font-semibold text-orange-500">
                    <span>Web3 Native Protocol</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Different Project Types We Cover */}
      <section className="py-20 bg-muted/20 border-b border-border/30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Ecosystem Reach</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground mt-1">We Cover Crypto Marketing For Different Projects</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              Customized playbooks tailored to your specific tokenomics, consensus model, and investor audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {PROJECT_TYPES.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-card text-card-foreground border border-border/50 p-6 rounded-2xl hover:border-orange-500/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {`0${idx + 1}`}
                  </div>
                  <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">{proj.name}</h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Campaign Roadmap (Process Workflow) */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-4 sm:px-6 bg-background border-b border-border/30">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">Launch Roadmap</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-foreground">{data.processTitle}</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">A structured 3 to 5 stage flight path to crypto market dominance.</p>
              <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {data.processSteps.map((st, idx) => (
                <div 
                  key={idx}
                  className="bg-card text-card-foreground border border-border/50 hover:border-orange-500/40 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-lg transition-all group"
                >
                  <span className="absolute top-6 right-8 text-5xl font-heading font-black text-orange-500/15 font-mono select-none group-hover:text-orange-500/30 transition-colors">
                    {`0${idx + 1}`}
                  </span>
                  <div className="space-y-3 pt-4">
                    <h4 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{st.title}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Why Partner with Eon8 Section (Achievements Style) */}
      <section className="py-24 bg-slate-950 dark:bg-slate-900 text-white px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-widest border border-orange-500/30">
            Proven Performance
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black leading-tight text-white">
            {data.whyTitle}
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            {data.whyDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">100%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Transparent Telemetry</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-orange-500">24/7</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Global Moderation</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">18+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-emerald-400">0%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Bot Vanity Followers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">Clarity & Answers</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-foreground">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-border/50 rounded-2xl bg-card text-card-foreground overflow-hidden shadow-xs hover:border-orange-500/40 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-foreground hover:text-orange-500 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-orange-500 transition-transform duration-300 ${
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
                      <p className="p-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/30 text-left">
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

      {/* 12. High-Impact Closing CTA Banner (Home Page Theme Style) */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-orange-500/10 via-card to-primary/10 border border-orange-500/20 p-10 sm:p-16 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-foreground">
              Ready to Launch the Next Web3 Phenomenon?
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
              Connect with Eon8’s crypto strategists and growth squad to build high-performance token funnels, community adoption, and tier-1 exchange visibility.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <Button
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 sm:h-14 px-8 text-sm sm:text-base shadow-xl shadow-orange-500/20 hover:scale-102 transition-all cursor-pointer gap-2"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <a href="tel:+919042294007">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold h-12 sm:h-14 px-8 text-sm sm:text-base cursor-pointer gap-2"
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
