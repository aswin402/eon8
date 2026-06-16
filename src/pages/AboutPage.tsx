import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { 
  Award, Eye, Flame, Compass, 
  ArrowRight, Quote 
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const { setContactModalOpen } = useAppStore();
  const [activeAccordion, setActiveAccordion] = useState<string | null>('history');
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Title entrance
      gsap.fromTo('.abt-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
      );

      // Staggered operate cards reveal
      gsap.fromTo('.abt-operate-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.abt-operate-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const accordionItems = [
    {
      id: 'history',
      title: 'Our History',
      icon: Award,
      content: 'Established in 2012, EON8 has grown from a boutique digital promotion setup into a major growth agency, having completed over 1,250 projects globally. We have spent the last decade scaling operations and positioning brands at the forefront of digital revolutions.'
    },
    {
      id: 'mission',
      title: 'Our Mission',
      icon: Flame,
      content: 'Our mission is to challenge standard marketing norms and design high-impact growth frameworks that deliver consistent business scaling, Web3 adoption, and automation efficiencies.'
    },
    {
      id: 'vision',
      title: 'Our Vision',
      icon: Eye,
      content: 'Our vision is to become the leading global partner for next-generation digital branding, combining data-driven performance campaigns with custom AI agent architectures and Web3 marketing systems.'
    }
  ];

  const workflowSteps = [
    {
      title: 'Learn',
      desc: 'We analyze your project thoroughly down to the last molecule to understand your unique operational and market requirements.',
      icon: '/imgs/social-media-3.svg'
    },
    {
      title: 'Strategize',
      desc: 'Based on the inputs from our deep analysis, our specialized Web 3.0 team will create the most relevant and high-ROI marketing strategy.',
      icon: '/imgs/presentation.svg'
    },
    {
      title: 'Align',
      desc: 'A fundamental exo-framework will be developed to implement the created strategy with disruptive campaign efficiency.',
      icon: '/imgs/content.svg'
    },
    {
      title: 'Deploy',
      desc: 'The execution team rapidly launches campaigns and automation tools without wasting a microsecond, managing integrations seamlessly.',
      icon: '/imgs/amazon.svg'
    },
    {
      title: 'Iterate',
      desc: 'We study every conversion log gained from campaigns and quickly deploy upgraded iterations to maximize overall brand impact.',
      icon: '/imgs/technology.svg'
    }
  ];

  const testimonials = [
    {
      name: 'Jullian Edisa',
      role: 'Supervisor',
      text: 'EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs.',
      img: '/imgs/Jullian-Edisa.jpg'
    },
    {
      name: 'Aaron P',
      role: 'Supervisor',
      text: 'EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I’ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service.',
      img: '/imgs/testi_1.jpg'
    }
  ];

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Page Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-b border-blue-500/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-5 relative z-10 abt-hero-content">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Growth Agency Pioneers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight leading-tight">
            About Us
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Challenging marketing norms and building the strategic foundation that positions brands at the top.
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
        </div>
      </section>

      {/* 2. Why Do We Dominate the Web 3.0 Space */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text & Accordion */}
        <div className="lg:col-span-7 text-left space-y-6">
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight">
            Why Do We Dominate <br />
            <span className="bg-gradient-to-r from-orange-500 to-primary bg-clip-text text-transparent">
              The Web 3.0 Space?
            </span>
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            EON8 leads the transition from Web 2.0 to Web 3.0 by building the strategic foundation that positions brands at the top. We challenge marketing norms and create new growth opportunities.
          </p>

          {/* Accordion panel */}
          <div className="space-y-4 pt-4">
            {accordionItems.map((item) => {
              const Icon = item.icon;
              const isOpen = activeAccordion === item.id;
              return (
                <div 
                  key={item.id}
                  className="border border-border/40 rounded-2xl bg-card/40 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : item.id)}
                    className={`w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold transition-colors cursor-pointer ${
                      isOpen ? 'bg-orange-500/10 text-orange-500' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    <span className="text-xl font-bold">{isOpen ? '−' : '＋'}</span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-5 pt-3 text-muted-foreground text-xs sm:text-sm leading-relaxed border-t border-border/10">
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Graphic Image */}
        <div className="lg:col-span-5 flex justify-center">
          <img 
            src="/imgs/eon-softtech_2.jpg" 
            alt="Web3 Space dominators"
            className="w-full max-w-sm rounded-3xl object-contain shadow-2xl hover:scale-102 transition-transform duration-500"
          />
        </div>

      </section>

      {/* 3. How Do We Operate section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-border/30 px-6 abt-operate-trigger">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-heading font-black">How Do We Operate?</h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              EON8 has over 18 years of experience in preparing Web 3.0 brands for unprecedented success, while ensuring 57% ROMI.
            </p>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          {/* Workflow Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx}
                className="abt-operate-card w-full sm:w-[280px] bg-white dark:bg-slate-950 border border-border/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center space-y-3"
              >
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center p-2 mb-2">
                  <img 
                    src={step.icon} 
                    alt={step.title} 
                    className="w-full h-full object-contain filter grayscale dark:invert dark:opacity-80 group-hover:grayscale-0" 
                  />
                </div>
                <h3 className="text-lg font-heading font-extrabold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-[240px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What Our Clients Say (Testimonials detail) */}
      <section className="py-24 px-6 max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-heading font-black">What Our Clients Say</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="space-y-12">
          {testimonials.map((test, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 bg-card/30 border border-border/40 p-8 rounded-3xl backdrop-blur-sm shadow-md ${
                  !isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-orange-500/20 shrink-0">
                  <img src={test.img} alt={test.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left space-y-3 flex-1">
                  <Quote className="w-10 h-10 text-orange-500/10" />
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic">
                    "{test.text}"
                  </p>
                  <div>
                    <h4 className="text-sm font-bold font-heading">{test.name}</h4>
                    <span className="text-xs text-muted-foreground">{test.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-slate-950 dark:bg-slate-900 text-white px-6 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white max-w-2xl mx-auto leading-tight">
            Let’s Make Your Brand <br /> The Next Big Web 3.0 Phenomenon!
          </h2>

          <div className="flex justify-center">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-gradient-to-r from-orange-500 to-primary text-white font-bold h-14 px-8 text-base shadow-xl shadow-orange-500/20 hover:scale-102 transition-transform cursor-pointer gap-2"
            >
              <span>Talk with our Experts</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
