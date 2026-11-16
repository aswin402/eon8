import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, Minus, Quote } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const ACCORDION_ITEMS = [
  {
    id: 'history',
    title: 'Our History',
    content: 'Started in 2012 and scaled to 1000+ projects.',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    content: 'Deliver strategies that drive business growth.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    content: 'Become global leaders in Web3 marketing.',
  },
];

const OPERATE_STEPS = [
  {
    step: '01',
    title: 'Learn',
    desc: 'We analyze your project thoroughly down to the last molecule to understand your unique requirement.',
    icon: '/wp-content/themes/eon8/assets/svg/social-media-3.svg',
  },
  {
    step: '02',
    title: 'Strategize',
    desc: 'Based on the inputs from our analysis, our Web 3.0 team will create the most relevant and effective marketing strategy.',
    icon: '/wp-content/themes/eon8/assets/svg/presentation.svg',
  },
  {
    step: '03',
    title: 'Align',
    desc: 'A fundamental exo-framework will be developed to implement the created strategy with disruptive efficiency.',
    icon: '/wp-content/themes/eon8/assets/svg/content.svg',
  },
  {
    step: '04',
    title: 'Deploy',
    desc: 'The team rapidly jumps into execution without wasting a microsecond and manages the project impressively.',
    icon: '/wp-content/themes/eon8/assets/svg/amazon.svg',
  },
  {
    step: '05',
    title: 'Iterate',
    desc: 'We learn from every output gained from the campaign and quickly apply an upgraded solution to maximize the impact.',
    icon: '/wp-content/themes/eon8/assets/svg/technology.svg',
  },
];

const TESTIMONIALS = [
  {
    name: 'Jullian Edisa',
    role: 'Supervisor',
    img: '/wp-content/themes/eon8/assets/img/Jullian-Edisa.jpg',
    quote:
      'EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs.',
  },
  {
    name: 'Aaron P',
    role: 'Supervisor',
    img: '/wp-content/themes/eon8/assets/img/testi_1.jpg',
    quote:
      'EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I’ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service.',
  },
];

export function AboutPage() {
  const { setContactModalOpen } = useAppStore();
  const [activeAccordion, setActiveAccordion] = useState<string>('history');

  useEffect(() => {
    document.title = 'About Us | Eon8 Digital Marketing Agency';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'At Eon8 you can get 360-degree Digital Marketing solution and online marketing services for brands and businesses to establish digital dominance.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-body overflow-x-clip">
      {/* 1. Header Banner — Exact Live Eon8 Gradient (#ff6a00 -> #ff8c42) */}
      <header
        className="pt-28 pb-14 sm:pt-36 sm:pb-20 text-center text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ff6a00, #ff8c42)' }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-6 space-y-3 relative z-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/85">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <span>About Us</span>
          </div>
          <h1 className="text-3xl sm:text-[42px] font-heading font-bold tracking-wide text-white m-0">
            About Us
          </h1>
        </div>
      </header>

      {/* 2. Why Do We Dominate The Web 3.0 Space? */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-black text-foreground tracking-tight leading-tight">
              Why Do We Dominate <span className="text-[#ff6a00]">The Web 3.0 Space?</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed">
              EON8 leads the transition from Web 2.0 to Web 3.0 by building the strategic foundation that positions brands at the top.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We challenge marketing norms and create new growth opportunities.
            </p>

            {/* Interactive Accordion Deck */}
            <div className="space-y-3 pt-2">
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-border rounded-xl overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveAccordion(isOpen ? '' : item.id)}
                      className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base transition-colors cursor-pointer ${
                        isOpen
                          ? 'bg-[#fff3e6] dark:bg-card text-[#ff6a00]'
                          : 'bg-card text-foreground hover:text-[#ff6a00]'
                      }`}
                    >
                      <span>{item.title}</span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#ff6a00] shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 sm:p-5 text-sm text-muted-foreground bg-card border-t border-border/60 border-l-4 border-l-[#ff6a00] leading-relaxed">
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

          <div className="lg:col-span-5 flex justify-center">
            <img
              src="/wp-content/themes/eon8/assets/img/eon-softtech_2.jpg"
              alt="EON8 Office Building"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover border border-border"
            />
          </div>
        </div>
      </section>

      {/* 3. How Do We Operate? */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-[#eff4fb] dark:bg-card/40 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              How Do We Operate?
            </h2>
            <h4 className="text-base sm:text-lg font-medium text-muted-foreground leading-relaxed">
              EON8 has over <strong className="text-[#ff6a00]">18 years of experience</strong> in preparing Web 3.0 brands for unprecedented success, while ensuring <strong className="text-[#0053c6] dark:text-blue-400">57% ROMI</strong>.
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {OPERATE_STEPS.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 flex flex-col items-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#fff3e6] dark:bg-[#ff6a00]/10 flex items-center justify-center p-3">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6a00]">
                  Step {item.step}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What Our Clients Say */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-white dark:bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[#f8fafc] dark:bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-sm"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-border shrink-0"
                />
                <div className="space-y-3 text-left">
                  <Quote className="w-6 h-6 text-[#ff6a00]/60" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.quote}</p>
                  <div>
                    <h3 className="text-base font-heading font-bold text-foreground">{t.name}</h3>
                    <h5 className="text-xs font-medium text-[#ff6a00]">{t.role}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section
        className="py-16 sm:py-20 px-5 sm:px-6 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #0053c6, #021b79)' }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-4xl font-heading font-black leading-tight text-white">
            Let&rsquo;s Make Your Brand <br className="hidden sm:block" /> The Next Big Web 3.0 Phenomenon!
          </h3>
          <div>
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>Talk with our Experts</span>
              <img
                src="/wp-content/themes/eon8/assets/svg/long-arrow.svg"
                alt=""
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
