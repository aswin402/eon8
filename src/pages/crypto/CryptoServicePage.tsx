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
          <Button variant="outline" className="rounded-xl">
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-foreground overflow-hidden font-body selection:bg-[#ffd700] selection:text-black">
      
      {/* 1. Breadcrumb Strip */}
      <div className="bg-[#0e0e0e] border-b border-white/5 py-3 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/crypto-marketing-agency" className="text-slate-300 hover:text-white transition-colors">Crypto Marketing</Link>
          <span>/</span>
          <span className="text-[#ffd700] font-semibold truncate max-w-[260px] sm:max-w-md">{data.heroTitle}</span>
        </div>
      </div>

      {/* 2. Signature Dark Gold Web3 Hero Section */}
      <section className="relative py-16 sm:py-24 md:py-28 bg-gradient-to-br from-[#0c0c0c] via-[#141414] to-[#453600] text-white border-b border-[#ffd700]/15 overflow-hidden">
        {/* Subtle radial golden glow overlays */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#ffd700]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headline and Web3 Features */}
            <div className="lg:col-span-7 space-y-6 text-left cry-hero-content">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full text-[#ffd700] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Coins className="w-3.5 h-3.5 animate-spin-slow text-[#ffd700]" />
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
                  '✔ Get Measurable results.',
                  '✔ Competitor analysis.',
                  '✔ Scale without hiring.',
                  '✔ In-depth experience.'
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f5d76e] bg-white/[0.04] border border-[#ffd700]/15 px-3.5 py-2 rounded-xl backdrop-blur-sm">
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://api.whatsapp.com/send?phone=919042294007"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#ffd700] to-[#c9a200] hover:from-[#ffe033] hover:to-[#dbb000] text-black font-extrabold h-12 sm:h-13 px-7 text-sm shadow-xl shadow-amber-500/20 hover:scale-103 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Whatsapp Us</span>
                </a>

                <Button 
                  onClick={() => setContactModalOpen(true)}
                  className="rounded-xl bg-white/10 hover:bg-white/15 text-white border border-[#ffd700]/40 font-bold h-12 sm:h-13 px-6 text-sm hover:scale-102 transition-all cursor-pointer gap-2"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4 text-[#ffd700]" />
                </Button>

                <a 
                  href="tel:+919042294007" 
                  className="text-xs font-semibold text-slate-300 hover:text-[#ffd700] flex items-center gap-1.5 transition-colors ml-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>+91 90422 94007</span>
                </a>
              </div>

              {/* Proof highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#ffd700]">180+</h4>
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

            {/* Right Column: Dark Gold Lead Capture Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#121212] border border-[#ffd700]/25 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-5 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ffd700]">Fast Execution Squad</span>
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
                        placeholder="Name *"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full h-11 bg-[#1c1c1c] border border-white/10 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full h-11 bg-[#1c1c1c] border border-white/10 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Telegram or Discord Handle *"
                        value={leadHandle}
                        onChange={(e) => setLeadHandle(e.target.value)}
                        className="w-full h-11 bg-[#1c1c1c] border border-white/10 rounded-xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <select
                        value={projectStage}
                        onChange={(e) => setProjectStage(e.target.value)}
                        className="w-full h-11 bg-[#1c1c1c] border border-white/10 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffd700] cursor-pointer"
                      >
                        <option value="Concept / Pre-Launch">Stage: Concept / Pre-Launch</option>
                        <option value="TGE / Presale Upcoming">Stage: TGE / Presale Upcoming</option>
                        <option value="Live Token / Scaling Trading Volume">Stage: Live Token / Scaling Volume</option>
                        <option value="DeFi / NFT Project Scale">Stage: DeFi / NFT Project Scale</option>
                      </select>
                    </div>

                    {/* Math Captcha */}
                    <div className="bg-[#1c1c1c] border border-white/10 p-3 rounded-xl flex items-center justify-between gap-3 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold tracking-wide text-[#f5d76e]">
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

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-[#ffd700] to-[#c9a200] hover:from-[#ffe033] hover:to-[#dbb000] text-black font-extrabold rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/25 cursor-pointer mt-2 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-black" />
                          <span>Connecting Strategist...</span>
                        </>
                      ) : (
                        <span>Submit Campaign Inquiry</span>
                      )}
                    </button>
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
                      className="text-xs text-[#ffd700] hover:underline font-bold"
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
      <section className="py-12 bg-[#0d0d0d] border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              We Helped Our Clients Take Their Biggest Step
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
              Trusted by leading blockchain ecosystems, gamefi metaverses, and decentralized projects.
            </p>
          </div>

          {/* Marquee Track Container */}
          <div className="relative overflow-hidden w-full py-4 group">
            {/* Left and right fade gradients */}
            <div className="absolute top-0 left-0 h-full w-16 sm:w-28 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-16 sm:w-28 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee gap-8 sm:gap-12 items-center group-hover:[animation-play-state:paused]">
              {/* Duplicate set for infinite loop */}
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center px-4 py-2 bg-white/[0.03] border border-white/5 rounded-2xl w-44 h-20 shrink-0 hover:border-[#ffd700]/40 hover:bg-white/[0.06] transition-all"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-12 max-w-[120px] object-contain opacity-70 hover:opacity-100 hover:scale-105 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Viral Growth Engine ("Attract, Engage & Convert") with Floating 3D Icons */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#241a00] text-white border-b border-[#ffd700]/15 overflow-hidden text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffd700]/10 rounded-full blur-[150px] pointer-events-none" />

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
          <div className="inline-block px-3.5 py-1 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full text-[#ffd700] text-xs font-bold uppercase tracking-widest">
            Attract, Engage & Convert
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight text-white drop-shadow-sm">
            {data.heroTitle}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Crypto marketing sets you apart from your potential competition, helping build trust in your brand. Eon8 is a 360° marketing agency with deep expertise in Web3, tokenomics, and decentralized communities.
          </p>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            With exponential crypto growth and rising competition, partnering with a specialized marketing squad is essential to scale your project effectively and thrive in any market condition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://api.whatsapp.com/send?phone=919042294007"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gradient-to-r from-[#ffd700] to-[#c9a200] hover:from-[#ffe033] hover:to-[#dbb000] text-black font-extrabold h-12 px-7 text-sm shadow-xl shadow-amber-500/20 hover:scale-103 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Whatsapp Us</span>
            </a>

            <Button
              onClick={() => setContactModalOpen(true)}
              className="rounded-xl bg-white/10 hover:bg-white/15 text-white border border-[#ffd700]/40 font-bold h-12 px-7 text-sm hover:scale-102 transition-all cursor-pointer gap-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#ffd700]" />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Strategic Overview & 3-Step ROI Framework */}
      <section className="py-20 sm:py-28 bg-[#0f0f0f] border-b border-white/5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Title & Value */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700]">Proprietary Framework</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight">
              Get Maximum ROI With Our Crypto Marketing Strategy
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ffd700] to-[#c9a200] rounded-full" />
            <p className="text-slate-300 text-sm leading-relaxed pt-2">
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
                  className="bg-[#151515] border border-white/10 hover:border-[#ffd700]/50 p-6 rounded-2xl relative transition-all duration-300 hover:-translate-y-1 group flex gap-5 items-start shadow-md"
                >
                  {/* Gold side highlight line on hover */}
                  <div className="w-1.5 h-full absolute left-0 top-0 bg-gradient-to-b from-[#ffd700] to-[#c9a200] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/25 flex items-center justify-center shrink-0 text-[#ffd700] group-hover:bg-[#ffd700] group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#ffd700]">{st.step}.</span>
                      <h3 className="text-lg font-heading font-extrabold text-white">{st.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0c0c0c] via-[#141414] to-[#1f1600] border-b border-white/5 px-4 sm:px-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Content & Interactive Chips */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700]">Measurable Results</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight">
              How We Bring Value To Your Cryptos?
            </h2>

            {/* Interactive Chip Group */}
            <div className="flex flex-wrap gap-2 pt-1">
              {SERVICE_CHIPS.map((chip) => (
                <Link
                  key={chip.name}
                  to={chip.path}
                  className="px-3.5 py-1.5 rounded-full bg-[#1c1c1c] border border-[#ffd700]/20 text-[#f5d76e] text-xs font-semibold hover:bg-gradient-to-r hover:from-[#ffd700] hover:to-[#c9a200] hover:text-black hover:border-transparent transition-all shadow-xs"
                >
                  {chip.name}
                </Link>
              ))}
            </div>

            <div className="space-y-3 pt-3">
              <div className="flex items-start gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-xl text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
                <span>Eliminate mistrust in the industry by building rock-solid credibility with tailored Web3 marketing playbooks.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-xl text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
                <span>Thrive even in bear markets by delivering the right narrative across crypto-native alpha platforms.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-xl text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
                <span>Maximize ROI with scalable, data-driven crypto marketing campaigns and transparent telemetry.</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setContactModalOpen(true)}
                className="rounded-xl bg-gradient-to-r from-[#ffd700] to-[#c9a200] text-black font-extrabold h-11 px-6 text-xs shadow-lg hover:scale-102 transition-all cursor-pointer"
              >
                Request Custom Crypto Roadmap
              </Button>
            </div>
          </div>

          {/* Right 3D Floating Bitcoin Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ffd700]/20 rounded-full blur-3xl pointer-events-none scale-90" />
              <img
                src="/imgs/bitcoin.png"
                alt="Eon8 Bitcoin Crypto Growth"
                className="w-64 sm:w-80 h-auto object-contain animate-float drop-shadow-[0_0_35px_rgba(255,215,0,0.35)] relative z-10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. Full-Spectrum Capabilities Grid */}
      <section className="py-24 bg-[#0a0a0a] px-4 sm:px-6 cry-cards-trigger border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#ffd700] font-bold uppercase tracking-wider text-xs">Full Spectrum Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">
              {data.servicesTitle || "Our Crypto Marketing Services"}
            </h2>
            {data.servicesSubtitle && (
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">{data.servicesSubtitle}</p>
            )}
            <div className="w-16 h-1 bg-gradient-to-r from-[#ffd700] to-[#c9a200] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((srv, idx) => {
              const Icon = ICON_POOL[idx % ICON_POOL.length];
              return (
                <div 
                  key={idx}
                  className="cry-card-reveal bg-[#131313] border border-white/10 hover:border-[#ffd700]/50 p-7 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="w-13 h-13 bg-[#ffd700]/10 text-[#ffd700] group-hover:bg-[#ffd700] group-hover:text-black rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-[#ffd700] transition-colors">{srv.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-semibold text-[#ffd700]">
                    <span>Web3 Native Protocol</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Different Project Types We Cover */}
      <section className="py-20 bg-[#0f0f0f] border-b border-white/5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700]">Ecosystem Reach</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">We Cover Crypto Marketing For Different Projects</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Customized playbooks tailored to your specific tokenomics, consensus model, and investor audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {PROJECT_TYPES.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-[#141414] border border-white/10 p-6 rounded-2xl hover:border-[#ffd700]/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ffd700]/10 text-[#ffd700] flex items-center justify-center font-bold text-xs group-hover:bg-[#ffd700] group-hover:text-black transition-colors">
                    {`0${idx + 1}`}
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white group-hover:text-[#ffd700] transition-colors">{proj.name}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Campaign Roadmap (Process Workflow) */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-24 px-4 sm:px-6 bg-[#0a0a0a] border-b border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[#ffd700] font-bold uppercase tracking-wider text-xs">Launch Roadmap</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">{data.processTitle}</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">A structured 3 to 5 stage flight path to crypto market dominance.</p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#ffd700] to-[#c9a200] mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {data.processSteps.map((st, idx) => (
                <div 
                  key={idx}
                  className="bg-[#141414] border border-white/10 hover:border-[#ffd700]/40 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-lg transition-all group"
                >
                  <span className="absolute top-6 right-8 text-5xl font-heading font-black text-[#ffd700]/15 font-mono select-none group-hover:text-[#ffd700]/30 transition-colors">
                    {`0${idx + 1}`}
                  </span>
                  <div className="space-y-3 pt-4">
                    <h4 className="text-xl font-heading font-bold text-white group-hover:text-[#ffd700] transition-colors">{st.title}</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Why Partner with Eon8 Section */}
      <section className="py-24 bg-gradient-to-tr from-[#0e0e0e] via-[#141414] to-[#2b1f00] text-white px-4 sm:px-6 border-b border-[#ffd700]/15 relative">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ffd700]/10 text-[#ffd700] font-bold text-xs uppercase tracking-widest border border-[#ffd700]/30">
            Proven Performance
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black leading-tight text-white">
            {data.whyTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ffd700] to-[#c9a200] mx-auto rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            {data.whyDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-white">100%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Transparent Telemetry</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-heading font-black text-[#ffd700]">24/7</h4>
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
            <span className="text-[#ffd700] font-bold uppercase tracking-wider text-xs">Clarity & Answers</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ffd700] to-[#c9a200] mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/10 rounded-2xl bg-[#141414] overflow-hidden shadow-xs hover:border-[#ffd700]/40 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-white hover:text-[#ffd700] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#ffd700] transition-transform duration-300 ${
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
                      <p className="p-6 pt-0 text-slate-300 text-sm leading-relaxed border-t border-white/10 text-left">
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

      {/* 12. High-Impact Gold Closing CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-[#211500] via-[#755900] to-[#bfa000] text-white px-4 sm:px-6 relative text-center overflow-hidden">
        {/* Radial depth rings overlay */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white max-w-2xl mx-auto leading-tight drop-shadow-sm">
            Spread The Word To The Masses With Crypto Marketing Today
          </h2>
          <p className="text-amber-100 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Partner with Asia's leading crypto marketing agency. Connect with our senior token strategists to formulate your viral launch roadmap.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-xl bg-black text-[#ffd700] hover:bg-slate-900 border border-[#ffd700] font-bold h-14 px-8 text-base shadow-2xl hover:scale-105 transition-transform cursor-pointer gap-2"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-5 h-5 text-[#ffd700]" />
            </Button>

            <a href="tel:+919042294007">
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-xl bg-[#ffd700] text-black hover:bg-amber-400 border-none font-extrabold h-14 px-8 text-base cursor-pointer gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4 text-black" />
                <span>Call +91 90422 94007</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
