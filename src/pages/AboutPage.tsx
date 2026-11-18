import { useState } from 'react';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PageSeo, ServiceHeroSection } from '@/components/sections';

const ACCORDION_PANELS = [
  {
    id: 'history',
    title: 'Our History',
    content: 'Started in 2012 and scaled to 1000+ projects across global Web 2.0, Web 3.0, and AI-first brands.',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    content: 'Deliver measurable, data-backed digital strategies that drive sustainable business growth and market authority.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    content: 'Become global leaders in AI-engineered digital transformation and Web3 brand ecosystems.',
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

const CLIENT_TESTIMONIALS = [
  {
    name: 'Jullian Edisa',
    role: 'Supervisor',
    avatar: '/wp-content/themes/eon8/assets/img/Jullian-Edisa.jpg',
    quote:
      'EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs.',
  },
  {
    name: 'Aaron P',
    role: 'Supervisor',
    avatar: '/wp-content/themes/eon8/assets/img/testi_1.jpg',
    quote:
      'EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I’ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service.',
  },
];

export function AboutPage() {
  const { setContactModalOpen } = useAppStore();
  const [openId, setOpenId] = useState<string | null>('history');

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="About Eon8 Digital Marketing Agency"
        description="At Eon8 you can get 360-degree Digital Marketing solution and online marketing services for Web 2.0, Web 3.0, and AI brands."
      />

      {/* 1. Hero Header */}
      <ServiceHeroSection
        theme="brand"
        layout="centered"
        badge="About EON8"
        heading="About Us"
        paragraphs={[
          'At EON8, we bridge Web 2.0 performance excellence with Web 3.0 and AI innovation — helping ambitious brands capture attention, trust, and measurable revenue.',
        ]}
      />

      {/* 2. Why Do We Dominate + Accordion */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
              Our Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              Why Do We Dominate The Web 3.0 Space?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              EON8 leads the transition from Web 2.0 to Web 3.0 by building the strategic foundation that positions brands at the top.
            </p>
            <p className="text-base font-semibold text-foreground">
              We challenge marketing norms and create new growth opportunities.
            </p>

            <div className="space-y-3 pt-2">
              {ACCORDION_PANELS.map((panel) => {
                const isOpen = openId === panel.id;
                return (
                  <div
                    key={panel.id}
                    className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : panel.id)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-heading font-bold text-foreground">
                        {panel.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FD5900]' : 'opacity-65'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm sm:text-[15.5px] text-muted-foreground leading-relaxed">
                        {panel.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-border shadow-2xl bg-card p-3">
              <img
                src="/wp-content/themes/eon8/assets/img/eon-softtech_2.jpg"
                alt="EON8 Headquarters"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. How Do We Operate */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#0053C6] dark:text-sky-400">
              Execution Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              How Do We Operate?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              EON8 has over 18 years of experience in preparing Web 3.0 brands for unprecedented success, while ensuring 57% ROMI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATE_STEPS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card border border-border p-7 shadow-xs hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 p-3 flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Client Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2.5">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              What Our Clients Say
            </h2>
          </div>

          <div className="space-y-6">
            {CLIENT_TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-center rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-sm"
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-36 h-36 sm:w-full sm:h-44 rounded-2xl object-cover mx-auto"
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-foreground">{item.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#0053C6] dark:text-sky-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Ribbon */}
      <section className="py-16 sm:py-20 pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#06152d] via-[#0a2558] to-[#0053C6] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            Let&apos;s Make Your Brand The Next Big Web 3.0 Phenomenon!
          </h2>
          <button
            type="button"
            onClick={() => setContactModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 py-3.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-base shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            <span>Talk with our Experts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
