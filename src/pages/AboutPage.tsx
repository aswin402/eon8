import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { ChevronRight, Award, Flame, Eye, Plus, Minus, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  title: string;
  percent: number;
}

const SKILLS: SkillItem[] = [
  { title: 'Web Analytics', percent: 98 },
  { title: 'Pay-Per-Click', percent: 95 },
  { title: 'SEO Services', percent: 93 },
  { title: 'Link Building', percent: 90 },
];

const ACCORDION_ITEMS = [
  {
    id: 'history',
    title: 'Our History',
    icon: Award,
    content: 'Started in 2012 and scaled to 1000+ projects globally. Over the last decade, EON8 has grown into an industry-dominating digital agency delivering high-velocity marketing architectures.',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    icon: Flame,
    content: 'Deliver strategies that drive business growth. We challenge marketing norms and create new growth opportunities that empower brands to dominate search and social algorithms.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    icon: Eye,
    content: 'Become global leaders in Web3 marketing. Combining data-driven organic ranking power, decentralized community expansion, and autonomous marketing frameworks.',
  },
];

const OPERATE_STEPS = [
  {
    step: '01',
    title: 'Learn',
    desc: 'We analyze your project thoroughly down to the last molecule to understand your unique requirement.',
    icon: '/imgs/social-media-3.svg',
  },
  {
    step: '02',
    title: 'Strategize',
    desc: 'Based on the inputs from our analysis, our Web 3.0 team will create the most relevant and effective marketing strategy.',
    icon: '/imgs/presentation.svg',
  },
  {
    step: '03',
    title: 'Align',
    desc: 'A fundamental exo-framework will be developed to implement the created strategy with disruptive efficiency.',
    icon: '/imgs/content.svg',
  },
  {
    step: '04',
    title: 'Deploy',
    desc: 'The team rapidly jumps into execution without wasting a microsecond and manages the project impressively.',
    icon: '/imgs/amazon.svg',
  },
  {
    step: '05',
    title: 'Iterate',
    desc: 'We learn from every output gained from the campaign and quickly apply an upgraded solution to maximize the impact.',
    icon: '/imgs/technology.svg',
  },
];

const TESTIMONIALS = [
  {
    name: 'Jullian Edisa',
    role: 'Supervisor',
    img: '/imgs/Jullian-Edisa.jpg',
    text: 'EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs.',
  },
  {
    name: 'Aaron P',
    role: 'Supervisor',
    img: '/imgs/testi_1.jpg',
    text: 'EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I’ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service.',
  },
];

export function AboutPage() {
  const { setContactModalOpen } = useAppStore();
  const [activeAccordion, setActiveAccordion] = useState<string>('history');
  const [skillsVisible, setSkillsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Set page meta on mount
  useEffect(() => {
    document.title = 'About Eon8 Digital Marketing Agency | Eon8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'At Eon8 you can get 360-degree Digital Marketing solution and online marketing services for brands and businesses to maintain digital presents.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  // GSAP animations & ScrollTrigger for skills
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trigger skills animation
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: 'top 80%',
        onEnter: () => setSkillsVisible(true),
      });

      // Staggered reveal for operation cards
      gsap.fromTo(
        '.operate-card-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.operate-section-trigger',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body pt-24 lg:pt-28">
      {/* 1. Header Banner - Exact Eon8 Gradient */}
      <header className="custom-page-header bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] py-16 md:py-20 text-center text-white relative shadow-inner">
        <div className="max-w-5xl mx-auto px-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/80">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="text-white font-bold">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white drop-shadow-xs">
            About Us
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Discover the powerhouse driving high-velocity digital marketing and Web 3.0 transformations.
          </p>
        </div>
      </header>

      {/* 2. Section 1: Why Do We Dominate The Web 3.0 Space? */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Interactive Accordion */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                Pioneering Growth
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Why Do We Dominate{' '}
                <span className="text-[#ff6a00]">The Web 3.0 Space?</span>
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              EON8 leads the transition from Web 2.0 to Web 3.0 by building the strategic foundation that positions
              brands at the top.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We challenge marketing norms and create new growth opportunities with disruptive campaign precision.
            </p>

            {/* Accordion Deck */}
            <div className="space-y-3 pt-3">
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = activeAccordion === item.id;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="border border-border/40 rounded-xl overflow-hidden transition-all duration-200 shadow-xs"
                  >
                    <button
                      onClick={() => setActiveAccordion(isOpen ? '' : item.id)}
                      className={`w-full p-4.5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm md:text-base transition-colors cursor-pointer ${
                        isOpen
                          ? 'bg-[#fff3e6] dark:bg-slate-900 text-[#ff6a00]'
                          : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 hover:text-[#ff6a00]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isOpen ? 'bg-[#ff6a00] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.title}</span>
                      </div>
                      <div className="text-slate-400">
                        {isOpen ? <Minus className="w-4 h-4 text-[#ff6a00]" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 border-l-4 border-[#ff6a00] leading-relaxed">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff6a00]/20 to-purple-600/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <img
                src="/imgs/eon-softtech_2.jpg"
                alt="Eon8 Team Web3 Leadership"
                className="relative rounded-2xl shadow-xl w-full max-w-md object-cover border border-border/40 group-hover:scale-101 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Our Skills & Scale Your Business */}
      <section ref={skillsRef} className="py-20 md:py-28 bg-slate-50/70 dark:bg-slate-900/40 border-y border-border/30 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ff6a00]">Our Skills</h4>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight">
              Looking to Scale your Business on Digital Platform? <br />
              <span className="text-[#ff6a00]">We are the transformative agency partner you can trust upon!</span>
            </h2>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image Graphic */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative">
                <img
                  src="/imgs/eon_abt_1.png"
                  alt="Eon8 Strategy and Skills"
                  className="w-full max-w-lg object-contain drop-shadow-xl hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Skills Progress Bars */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-6">
                {SKILLS.map((skill) => (
                  <div key={skill.title} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-heading font-bold text-slate-800 dark:text-slate-200">
                      <span>{skill.title}</span>
                      <span className="text-[#ff6a00] font-mono text-base">{skill.percent}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-border/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: skillsVisible ? `${skill.percent}%` : 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff9042] shadow-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#ff6a00] hover:bg-[#e55e00] text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-orange-500/20 hover:scale-102 transition-all cursor-pointer text-sm"
                >
                  <span>Request Full Capabilities Deck</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 3: How Do We Operate? */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto operate-section-trigger">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white">
            How Do We Operate?
          </h2>
          <h4 className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            EON8 has over 18 years of experience in preparing Web 3.0 brands for unprecedented success, while ensuring
            57% ROMI.
          </h4>
          <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
        </div>

        {/* 5 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {OPERATE_STEPS.map((step) => (
            <div
              key={step.title}
              className="operate-card-reveal bg-white dark:bg-slate-950 border border-border/50 hover:border-[#ff6a00]/40 p-8 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-center group"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-full h-full object-contain filter group-hover:brightness-110"
                  />
                </div>
                <div className="text-xs font-mono font-bold text-[#ff6a00] tracking-widest">{step.step}</div>
                <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Section 4: What Our Clients Say (Testimonials) */}
      <section className="py-20 md:py-28 bg-[#fffaf5] dark:bg-slate-900/50 border-t border-border/30 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white">
              What Our Clients Say
            </h2>
            <div className="w-16 h-1 bg-[#ff6a00] mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-10">
            {TESTIMONIALS.map((testi, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={testi.name}
                  className={`bg-white dark:bg-slate-950 border border-border/50 p-8 sm:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-8 ${
                    !isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#ff6a00]/20 shrink-0 shadow-md">
                    <img src={testi.img} alt={testi.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-3 text-left flex-1">
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">{testi.name}</h3>
                    <h5 className="text-xs font-bold text-[#ff6a00] uppercase tracking-wider">{testi.role}</h5>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      "{testi.text}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Section 5: High Impact CTA Banner */}
      <section className="get_traffic bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight drop-shadow-xs">
            Let’s Make Your Brand <br /> The Next Big Web 3.0 Phenomenon!
          </h3>

          <div className="flex justify-center">
            <button
              onClick={() => setContactModalOpen(true)}
              className="dt-eon-btn inline-flex items-center gap-3 bg-white text-[#ff6a00] font-heading font-extrabold text-sm sm:text-base py-4 px-9 rounded-full shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Talk with our Experts</span>
              <img src="/imgs/long-arrow.svg" alt="Arrow" className="w-5 h-5 object-contain" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
