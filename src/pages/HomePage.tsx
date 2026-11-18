import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  Coins,
  ExternalLink,
  Globe,
  ListChecks,
  MessageCircle,
  Monitor,
  Palette,
  Phone,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageSeo } from '@/components/sections';
import { useAppStore } from '@/store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    id: 'projects',
    label: 'Project Completed',
    target: 1250,
    suffix: '',
    icon: '/wp-content/uploads/2026/06/Mask-grou.webp',
    alt: 'Projects',
  },
  {
    id: 'clients',
    label: 'Our Happy Clients',
    target: 548,
    suffix: '',
    icon: '/wp-content/uploads/2026/06/costume.webp',
    alt: 'Happy Clients',
  },
  {
    id: 'experience',
    label: 'Years of Experience',
    target: 12,
    suffix: '+',
    icon: '/wp-content/uploads/2026/06/calendar.webp',
    alt: 'Experience',
  },
  {
    id: 'experts',
    label: 'Development Experts',
    target: 250,
    suffix: '+',
    icon: '/wp-content/uploads/2026/06/blueprin.webp',
    alt: 'Experts',
  },
];

const SERVICES = [
  {
    title: 'Digital Marketing & Conversion',
    img: '/wp-content/uploads/2026/06/Digital-markting.webp',
    alt: 'Digital Marketing',
    to: '/web-design-development-services-chennai',
    bullets: [
      'High-performance target websites',
      'Conversion-focused landing pages',
      'Advanced UX/UI improvements',
      'Lead tracking & deep analytics',
    ],
  },
  {
    title: 'Search Engine Optimization',
    img: '/wp-content/uploads/2026/06/SEO.webp',
    alt: 'SEO',
    to: '/search-engine-optimization-services-seo',
    bullets: [
      'Keyword discovery & strategy',
      'Technical & on-page optimization',
      'Authority & link building',
      'Local & International SEO',
    ],
  },
  {
    title: 'Performance Campaigning',
    img: '/wp-content/uploads/2026/06/Performance-Campaigning.webp',
    alt: 'Performance Marketing',
    to: '/ppc-company-chennai',
    bullets: [
      'Google Search & Display Ads',
      'Meta & Instagram Ad Scaling',
      'Data-driven ad creatives',
      'Full Conversion tracking',
    ],
  },
  {
    title: 'Social Media Dominance',
    img: '/wp-content/uploads/2026/06/Adllins-Media-Social-Marketing-Platforms.webp',
    alt: 'Social Media',
    to: '/social-media-management-agency-chennai',
    bullets: [
      'Content strategy formulation',
      'Short-form video marketing',
      'Active community management',
      'Targeted brand collaborations',
    ],
  },
  {
    title: 'Content & AI Engineering',
    img: '/wp-content/uploads/2026/06/Content-AI-Engineering.webp',
    alt: 'Content Marketing',
    to: '/ai-agent-development-services',
    bullets: [
      'Deep SEO & editorial content',
      'AI automation workflows',
      'Marketing automation hubs',
      'Drip & Lead nurturing campaigns',
    ],
  },
  {
    title: 'Brand Strategy & Design',
    img: '/wp-content/uploads/2026/06/Brand-Strategy-Design-scaled-1.webp',
    alt: 'Branding',
    to: '/works',
    bullets: [
      'Brand identity definition',
      'World-class creative campaigns',
      'Bespoke Website UI/UX design',
      'Conversion-focused architecture',
    ],
  },
];

const WEB3_SPOTLIGHTS = [
  {
    title: 'NFT Marketing Optimization',
    img: '/wp-content/uploads/2026/06/nft.webp',
    alt: 'NFT Marketing',
    to: '/nft-marketing-services',
    reverse: false,
    items: [
      { icon: Coins, text: 'High-conversion NFT landing page optimization' },
      { icon: Users, text: 'Community-first UX for collectors' },
      { icon: BarChart3, text: 'Wallet & marketplace tracking analytics' },
    ],
  },
  {
    title: 'Crypto Marketing',
    img: '/wp-content/uploads/2026/06/crypto.webp',
    alt: 'Crypto',
    to: '/crypto-marketing-agency',
    reverse: true,
    items: [
      { icon: ShieldCheck, text: 'High-trust crypto websites & token platforms' },
      { icon: Target, text: 'Conversion-focused landing pages' },
      { icon: TrendingUp, text: 'UX/UI design for credibility & clarity' },
      { icon: BarChart3, text: 'Advanced funnel analytics & user behavior insights' },
    ],
  },
  {
    title: 'AI Marketing',
    img: '/wp-content/uploads/2026/06/ai.webp',
    alt: 'AI',
    to: '/ai-agent-development-services',
    reverse: false,
    items: [
      { icon: Brain, text: 'High-performance websites for AI products' },
      { icon: Users, text: 'Product-led landing page optimization' },
      { icon: Monitor, text: 'UX/UI that simplifies complex AI solutions' },
      { icon: BarChart3, text: 'Advanced analytics & conversion insights' },
    ],
  },
  {
    title: 'Website & Conversion Optimization',
    img: '/wp-content/uploads/2026/06/website.webp',
    alt: 'Website & Conversion Optimization',
    to: '/web-design-development-services-chennai',
    reverse: true,
    items: [
      { icon: Globe, text: 'High-performance websites' },
      { icon: TrendingUp, text: 'Landing page optimization' },
      { icon: Monitor, text: 'UX/UI improvements' },
      { icon: BarChart3, text: 'Lead tracking & analytics' },
    ],
  },
];

const WHY_CHOOSE_ITEMS = [
  { icon: ListChecks, text: 'Strategy first, execution second' },
  { icon: BarChart3, text: 'Transparent reporting & real metrics' },
  { icon: Palette, text: 'Creative meets performance marketing' },
  { icon: Brain, text: 'AI-driven insights for faster scaling' },
  { icon: BookOpen, text: 'Industry-specific marketing playbooks' },
];

const INDUSTRIES = [
  { name: 'Hospitality & Hotels', img: '/wp-content/uploads/2026/06/hospitality.webp', alt: 'Hospitality Icon' },
  { name: 'Healthcare', img: '/wp-content/uploads/2026/06/healthcare.webp', alt: 'Healthcare Icon' },
  { name: 'Real Estate', img: '/wp-content/uploads/2026/06/realestate.webp', alt: 'Real Estate Icon' },
  { name: 'Political Campaigns', img: '/wp-content/uploads/2026/06/political.webp', alt: 'Political Campaigns Icon' },
  { name: 'Ecommerce', img: '/wp-content/uploads/2026/06/ecommerce.webp', alt: 'Ecommerce Icon' },
  { name: 'SaaS & Tech Startups', img: '/wp-content/uploads/2026/06/saas.webp', alt: 'Tech Startups Icon' },
  { name: 'Education', img: '/wp-content/uploads/2026/06/education.webp', alt: 'Education Icon' },
];

const CLIENT_LOGOS = [
  { alt: 'VLCC Logo', src: '/wp-content/uploads/2026/06/vlcc.webp' },
  { alt: 'TVS Logo', src: '/wp-content/uploads/2026/06/tvs.webp' },
  { alt: 'Shell Logo', src: '/wp-content/uploads/2026/06/shell.webp' },
  { alt: 'Li & Fung Logo', src: '/wp-content/uploads/2026/06/lifung.webp' },
  { alt: 'NAC Logo', src: '/wp-content/uploads/2026/06/nac.webp' },
  { alt: 'MCC Logo', src: '/wp-content/uploads/2026/06/mcc.webp' },
  { alt: 'Apollo Logo', src: '/wp-content/uploads/2026/06/apollo.webp' },
  { alt: 'Chettinad Logo', src: '/wp-content/uploads/2026/06/chettinad.webp' },
  { alt: 'IBM Logo', src: '/wp-content/uploads/2026/06/ibm.webp' },
  { alt: 'KVB Logo', src: '/wp-content/uploads/2026/06/kvb.webp' },
  { alt: "McDonald's Logo", src: '/wp-content/uploads/2026/06/mcdelivery.webp' },
  { alt: 'Vels Logo', src: '/wp-content/uploads/2026/06/vels.webp' },
  { alt: 'Copper Chimney Logo', src: '/wp-content/uploads/2026/06/copperchimney.webp' },
  { alt: 'Poorvika Logo', src: '/wp-content/uploads/2026/06/poorvika.webp' },
  { alt: 'Ramraj Logo', src: '/wp-content/uploads/2026/06/ramraj.webp' },
];

const CASE_STUDIES = [
  {
    name: 'Poorvika Mobiles',
    stat: 'Reached 1.1 million people in one week',
    img: '/wp-content/uploads/2026/06/poorvik.webp',
    alt: 'Poorvika Mobiles Logo',
    to: '/case-study-poorvika',
  },
  {
    name: 'Cake Square Chennai',
    stat: 'Generated 10000+ Leads through online marketing',
    img: '/wp-content/uploads/2026/06/coko.webp',
    alt: 'Cake Square Chennai Logo',
    to: '/case-study-cake-square-chennai',
  },
  {
    name: 'Manju Groups',
    stat: 'More than 20% Conversion from online leads',
    img: '/wp-content/uploads/2026/06/manju.webp',
    alt: 'Manju Groups Logo',
    to: '/works#manju-groups',
  },
];

const TESTIMONIALS = [
  {
    name: 'Jullian Edisa',
    role: 'Client Partner',
    avatar: '/wp-content/uploads/2026/06/Jullian-Edisa.webp',
    quote:
      '"EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs."',
  },
  {
    name: 'Aaron P',
    role: 'Project Owner',
    avatar: '/wp-content/uploads/2026/06/testi_1.webp',
    quote:
      '"EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I\'ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service."',
  },
  {
    name: 'Shell',
    role: 'Enterprise Client',
    avatar: '/wp-content/uploads/2026/06/shell-1.webp',
    quote:
      '"Working with EON8 was a great experience. Their team perfectly understood our vision and delivered a website design that was both visually impressive and highly user-friendly. The final result exceeded our beyond expectations, and I\'d highly recommend them to anyone looking to grow their brand online or improve their digital presence super fast."',
  },
];

const FEATURED_LAB_POSTS = [
  {
    tag: 'Marketing',
    title: 'WhatsApp Marketing: Convert Conversations into Revenue',
    desc: 'With over 2 billion active users globally, WhatsApp has evolved into a powerful sales tool...',
    img: '/wp-content/uploads/2026/06/WhatsApp-Marketing-Strategies.webp',
    alt: 'WhatsApp Marketing Strategies',
    to: '/blog/whatsapp-marketing-services',
  },
  {
    tag: 'AI Engineering',
    title: 'AI Deleted Its Database Without Warning - Lessons Learned',
    desc: 'Understanding the risks of automation and how to build resilient AI infrastructures for your brand...',
    img: '/wp-content/uploads/2026/06/Data-Loss-AI-Lessons.webp',
    alt: 'Data Loss AI Lessons',
    to: '/blog/data-loss-by-ai-lessons-and-prevention',
  },
  {
    tag: 'Video AI',
    title: 'Revolutionizing Video Marketing for Brands using AI',
    desc: "In today's fast-paced digital world, product marketing is about building smart, data-driven strategies...",
    img: '/wp-content/uploads/2026/06/Product-Marketing-with-AI-Illustration.webp',
    alt: 'Product Marketing with AI Illustration',
    to: '/blog/product-marketing-agency-using-ai',
  },
];

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setContactModalOpen } = useAppStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.achievement-counter').forEach((el) => {
        const target = Number(el.getAttribute('data-target') || '0');
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.achievements-trigger',
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(counterObj.val));
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const target = document.getElementById('home-services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-background text-foreground font-body overflow-x-clip">
      <PageSeo
        title="Digital Marketing Agency | AI, SEO & Web3 Services | EON8"
        description="Partner with EON8 for AI-powered digital marketing, SEO, web development, performance marketing, branding, Web3 solutions, and business growth strategies."
        canonicalPath="/"
      />
      {/* 1. Fullscreen Video Hero */}
      <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/wp-content/uploads/2026/06/banner_vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center relative z-10 w-full mt-4 sm:mt-8">
          <div className="space-y-6 sm:space-y-8 flex flex-col items-center w-full">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FD5900] animate-pulse shadow-[0_0_10px_rgba(253,89,0,0.8)]" />
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-white">
                Next-Gen Digital Forge
              </span>
            </div>

            {/* Responsive H1 — never overflows 375px viewports */}
            <h1 className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-heading font-black text-white leading-[1.06] tracking-tight drop-shadow-2xl">
              We <span className="text-[#FD5900]">Build</span> Brands <br className="hidden sm:block" />
              That Win
            </h1>

            <p className="text-[16px] sm:text-[20px] md:text-[23px] leading-relaxed text-white/95 max-w-3xl font-medium drop-shadow-md">
              Dominating Attention, Traffic &amp; Revenue through high-fidelity digital execution. Experience growth like never before.
            </p>

            {/* 3 Hero Highlights */}
            <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-5 text-[14px] sm:text-[16px] text-white pt-2">
              {['360° Digital Marketing', 'ROI-Focused Campaigns', 'Creative Execution'].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/20 text-white font-medium shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 w-full sm:w-auto">
              <Button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="w-full sm:w-auto rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 sm:h-14 px-8 text-base shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={scrollToServices}
                className="w-full sm:w-auto rounded-xl bg-white/10 hover:bg-white hover:text-slate-900 border-white/35 text-white font-bold h-12 sm:h-14 px-8 text-base backdrop-blur-md cursor-pointer"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Powering Growth For Digital, AI & Web3 */}
      <section className="py-16 sm:py-24 bg-[#eff4fb] dark:bg-card/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-black tracking-tight leading-[1.15] text-foreground">
              Powering Growth For <span className="text-[#0053c6] dark:text-blue-400">Digital, AI &amp; Web3</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/85 font-medium leading-relaxed">
              EON8 is a 360-degree marketing agency providing end-to-end digital solutions that transform attention into measurable revenue.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our team blends creativity, data, and technology to drive consistent visibility and measurable growth for brands across digital, NFT, crypto, and AI ecosystems. From brand positioning to hyper-targeted lead generation, we manage every stage of your digital journey.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="rounded-xl bg-[#0053c6] hover:bg-[#0044a3] text-white font-bold h-11 px-6 text-sm cursor-pointer"
              >
                Partner With Us <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <img
              src="/wp-content/uploads/2026/06/modern_digital_globe.webp"
              alt="Powering Growth Globe"
              className="w-full max-w-md lg:max-w-lg rounded-3xl object-contain shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 3. A Distinctive Digital Marketing Company That Never Tires */}
      <section className="py-16 sm:py-24 bg-white dark:bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <img
              src="/wp-content/uploads/2026/06/Innovation-Handshake.webp"
              alt="Innovation Handshake"
              className="w-full max-w-md rounded-3xl object-contain shadow-xl"
            />
          </div>

          <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-black tracking-tight leading-tight text-foreground">
              A Distinctive Digital Marketing Company{' '}
              <span className="text-[#FD5900]">That Never Tires!</span>
            </h2>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0053c6] dark:text-blue-400">
              We are EON8. Not Just a Digital Marketing Agency — A Growth Partner
            </h3>
            <p className="italic text-foreground/85 border-l-4 border-[#FD5900] pl-4 text-sm sm:text-base">
              We just not talk. We believe, dive and strive to take your business marketing to infinity &amp; beyond.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              At EON8, we don&apos;t believe in random marketing tactics. We design custom digital growth systems that align branding, performance marketing, content, and technology to drive measurable business outcomes. From SEO and paid advertising to social media, AI-powered content, and Web3-ready marketing, we help brands stay relevant, visible, and profitable in a fast-moving digital world.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-5 rounded-2xl bg-[#eff4fb] dark:bg-card border border-border">
                <h4 className="font-heading font-bold text-foreground text-base mb-1">Strategy First</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Methodical execution based on deep data.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#eff4fb] dark:bg-card border border-border">
                <h4 className="font-heading font-bold text-foreground text-base mb-1">Real Metrics</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Transparent reporting and actual ROI tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Achievements */}
      <section className="py-16 sm:py-20 bg-[#f6f9ff] dark:bg-card/20 achievements-trigger">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#0053c6] dark:text-blue-400 tracking-tight">
              Our Achievements
            </h2>
            <h3 className="text-lg sm:text-2xl font-heading font-bold text-foreground">
              We Make The Best Digital Promoter For Brands
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ACHIEVEMENTS.map((card) => (
              <div
                key={card.id}
                className="relative bg-white dark:bg-card rounded-[20px] shadow-md border border-border overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 pt-10 hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#E2EFFF] dark:from-[#0053c6]/20 to-transparent opacity-80 pointer-events-none" />
                <img
                  src={card.icon}
                  alt={card.alt}
                  className="w-12 h-12 sm:w-14 sm:h-14 mb-5 relative z-10 object-contain drop-shadow-sm"
                />
                <div className="text-3xl sm:text-[42px] font-heading font-black text-foreground leading-none mb-2.5 relative z-10 flex items-center">
                  <span className="achievement-counter" data-target={card.target}>
                    {card.target}
                  </span>
                  <span>{card.suffix}</span>
                </div>
                <div className="text-xs sm:text-base text-muted-foreground font-medium text-center relative z-10">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Digital Marketing Services */}
      <section id="home-services" className="py-16 sm:py-24 bg-white dark:bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-foreground">
              Our Digital Marketing <span className="text-[#FD5900]">Services</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We create high-fidelity digital footprints that capture attention and compel conversion through our advanced 360-degree marketing frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((srv) => (
              <div
                key={srv.title}
                className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden rounded-2xl mb-5 border border-border/50 bg-[#eff4fb] dark:bg-slate-900">
                    <img
                      src={srv.img}
                      alt={srv.alt}
                      loading="lazy"
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-foreground mb-4">
                    {srv.title}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {srv.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FD5900] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                  <Link
                    to={srv.to}
                    className="text-xs sm:text-sm font-bold text-[#0053c6] dark:text-blue-400 hover:text-[#FD5900] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/digital-marketing-agency-in-chennai">
              <Button className="rounded-xl bg-[#0053c6] hover:bg-[#0044a3] text-white font-bold h-12 px-8 text-sm cursor-pointer shadow-md">
                Explore All Services <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Powering Web3 Adoption Through Smart Marketing */}
      <section className="py-16 sm:py-24 bg-[#eff4fb] dark:bg-card/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14 sm:space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-foreground leading-tight">
              Powering Web3 Adoption Through{' '}
              <span className="text-[#0053c6] dark:text-blue-400">Smart Marketing.</span>
            </h2>
          </div>

          <div className="space-y-14 sm:space-y-20">
            {WEB3_SPOTLIGHTS.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white dark:bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm"
              >
                <div
                  className={`lg:col-span-6 space-y-5 text-left ${
                    item.reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                    {item.title}
                  </h3>
                  <ul className="space-y-3">
                    {item.items.map((pt) => {
                      const IconComp = pt.icon;
                      return (
                        <li
                          key={pt.text}
                          className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                        >
                          <span className="w-8 h-8 rounded-lg bg-[#0053c6]/10 text-[#0053c6] dark:text-blue-400 flex items-center justify-center shrink-0">
                            <IconComp className="w-4 h-4" />
                          </span>
                          <span className="pt-1 font-medium text-foreground/90">{pt.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="pt-2">
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#FD5900] hover:text-[#e55000] transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 flex justify-center ${
                    item.reverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full max-w-md rounded-2xl object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Brands Choose EON8 */}
      <section className="py-16 sm:py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
              Why Brands Choose <span className="text-[#FD5900]">EON8</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We don&apos;t just run campaigns — we build growth engines tailored to your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <img
                src="/wp-content/uploads/2026/06/building.webp"
                alt="EON8 Office Building"
                loading="lazy"
                className="w-full rounded-3xl object-cover shadow-lg border border-border"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                Why Brands Choose EON8
              </h3>
              <ul className="space-y-3.5">
                {WHY_CHOOSE_ITEMS.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <li
                      key={item.text}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#f6f9ff] dark:bg-card border border-border"
                    >
                      <span className="w-10 h-10 rounded-xl bg-[#FD5900]/10 text-[#FD5900] flex items-center justify-center shrink-0">
                        <IconComp className="w-5 h-5" />
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-foreground">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 px-7 text-sm cursor-pointer shadow-md"
              >
                Partner With Us <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Industries We Serve */}
      <section className="py-16 sm:py-24 bg-[#eff4fb] dark:bg-card/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
              Industries We <span className="text-[#0053c6] dark:text-blue-400">Serve</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-5">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 shadow-sm hover:-translate-y-1 hover:border-[#0053c6]/40 transition-all"
              >
                <img
                  src={ind.img}
                  alt={ind.alt}
                  loading="lazy"
                  className="w-14 h-14 object-contain"
                />
                <h3 className="text-xs sm:text-sm font-heading font-bold text-foreground leading-snug">
                  {ind.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Our Prestigious Clients */}
      <section className="py-16 sm:py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
              Our Prestigious <span className="text-[#FD5900]">Clients</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="bg-[#f8fafc] dark:bg-slate-900 border border-border rounded-2xl p-5 flex items-center justify-center h-24 sm:h-28 hover:shadow-md transition-shadow"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Client Satisfaction Spotlight */}
      <section className="py-16 sm:py-24 bg-[#f6f9ff] dark:bg-card/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <img
              src="/wp-content/uploads/2026/06/satisfaction.webp"
              alt="Happy Clients Meeting"
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-lg border border-border"
            />
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-5 sm:right-5 bg-white dark:bg-slate-900 border border-border rounded-2xl px-6 py-4 shadow-xl inline-block">
              <div className="text-2xl sm:text-3xl font-heading font-black text-[#FD5900]">10k+</div>
              <p className="text-xs sm:text-sm font-semibold text-foreground">Leads Generated</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground leading-tight">
              Client Satisfaction is <span className="text-[#0053c6] dark:text-blue-400">Our Prime Goal</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Be it a small or large business, we make sure to provide the best dedicated service to uplift your business value and returns while not forgetting to meet your expectations.
            </p>

            <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-[#FD5900]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-foreground/90 italic leading-relaxed">
                &ldquo;EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, and eventually, our sales had gone high.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="/wp-content/uploads/2026/06/Jullian-Edisa.webp"
                  alt="Jullian Edisa"
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="text-sm font-heading font-bold text-foreground">Jullian Edisa</h4>
                  <p className="text-xs text-muted-foreground">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Featured Case Studies */}
      <section className="py-16 sm:py-24 bg-[#eff4fb] dark:bg-card/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
              Proven Growth <span className="text-[#FD5900]">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore how EON8 engineers measurable reach, qualified lead pipelines, and omnichannel revenue across retail, eCommerce, and enterprise brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.name}
                to={cs.to}
                className="bg-white dark:bg-card border border-border rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#FD5900]/40 transition-all group"
              >
                <div className="h-24 flex items-center justify-center mb-5">
                  <img
                    src={cs.img}
                    alt={cs.alt}
                    loading="lazy"
                    className="max-h-20 max-w-[180px] object-contain"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-[#0053c6] dark:group-hover:text-blue-400 transition-colors mb-2">
                  {cs.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cs.stat}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#FD5900]">
                  View Case Study <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Testimonials */}
      <section className="py-16 sm:py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground">
              Testimonial
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#FD5900]">What client says!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[#f8fafc] dark:bg-card border border-border rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#FD5900]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.quote}</p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-border/60">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border border-border bg-white"
                  />
                  <div>
                    <h5 className="text-sm font-heading font-bold text-foreground">{t.name}</h5>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Latest From the Lab (Blog) */}
      <section className="py-16 sm:py-24 bg-[#eff4fb] dark:bg-card/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground text-center mb-10 sm:mb-12">
            Blog
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-5">
            <div>
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-foreground leading-tight mb-3">
                Latest from <span className="text-[#0053c6] dark:text-blue-400">the Lab</span>
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Insights, guides, and updates from the cutting edge of digital marketing.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#0053c6] dark:text-blue-400 border-b-2 border-[#0053c6] pb-1 whitespace-nowrap hover:gap-3 transition-all"
            >
              <span>View All Posts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {FEATURED_LAB_POSTS.map((post) => (
              <article
                key={post.to}
                className="bg-white dark:bg-card rounded-[28px] overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"
              >
                <Link to={post.to} className="aspect-video overflow-hidden border-b border-border/50 block">
                  <img
                    src={post.img}
                    alt={post.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#FD5900] bg-[#FD5900]/10 px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold leading-snug my-4 text-foreground group-hover:text-[#0053c6] dark:group-hover:text-blue-400 transition-colors">
                    <Link to={post.to}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {post.desc}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={post.to}
                      className="font-bold text-sm text-foreground inline-flex items-center gap-2 hover:text-[#0053c6] dark:hover:text-blue-400 transition-colors"
                    >
                      <span>Read More</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Full-Bleed Blue Pre-Footer CTA Band */}
      <section className="py-12 sm:py-20 bg-white dark:bg-background">
        <div
          className="w-full py-14 sm:py-20 relative overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(90deg, #0053c6, #0041c2, #0053c6)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
            <div className="text-center lg:text-left text-white max-w-3xl">
              <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-heading font-black text-white leading-tight mb-4 tracking-tight">
                Don&apos;t get left behind in the race <br className="hidden lg:block" />
                to achieve business growth.
              </h2>
              <div className="flex flex-col md:flex-row items-center lg:items-start justify-center lg:justify-start gap-2 md:gap-3 text-sm text-white/90">
                <p>Get in touch with us to explore new possibilities.</p>
                <span className="hidden md:block w-1 h-1 rounded-full bg-white/50 mt-2" />
                <a href="mailto:info@eon8.com" className="hover:underline font-medium">
                  info@eon8.com
                </a>
                <span className="hidden md:block w-1 h-1 rounded-full bg-white/50 mt-2" />
                <p>Mumbai, Hyderabad, Bangalore, Chennai</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row shrink-0 gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/919042294007"
                target="_blank"
                rel="noreferrer"
                className="uppercase tracking-[0.14em] font-bold text-xs sm:text-[13px] py-4 px-7 border border-white/50 text-white hover:bg-white hover:text-[#0053c6] transition-all duration-300 text-center flex items-center justify-center gap-2 rounded-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT WITH US</span>
              </a>
              <a
                href="tel:+919042294007"
                className="uppercase tracking-[0.14em] font-bold text-xs sm:text-[13px] py-4 px-7 bg-white text-[#0053c6] shadow-xl hover:bg-slate-100 transition-all duration-300 text-center flex items-center justify-center gap-2 rounded-lg"
              >
                <Phone className="w-4 h-4" />
                <span>CALL NOW</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
