import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote, Calendar, Award, Sparkles, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { setContactModalOpen } = useAppStore();
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Check accessibility reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // GSAP Entrance & ScrollTrigger Animations
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal Animation
      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      heroTl.fromTo('.hero-title-main', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.2 }
      );
      heroTl.fromTo('.hero-desc-main', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        '-=0.8'
      );
      heroTl.fromTo('.hero-bullets li', 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 }, 
        '-=0.5'
      );
      heroTl.fromTo('.hero-cta-button', 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.6 }, 
        '-=0.4'
      );

      // 2. Staggered Service Cards Reveal
      gsap.fromTo('.service-card-reveal',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-grid-trigger',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 3. Staggered Achievements Card entrance
      gsap.fromTo('.achieve-card-reveal',
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.achievements-trigger',
            start: 'top 75%',
          }
        }
      );

      // 4. Counter Up Animators
      const counters = document.querySelectorAll('.achievement-counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const counterObj = { val: 0 };

        gsap.to(counterObj, {
          val: target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.achievements-trigger',
            start: 'top 75%',
          },
          onUpdate: () => {
            counter.textContent = Math.floor(counterObj.val).toString();
          }
        });
      });

      // 5. Alternate Web3 Rows reveals
      const rows = document.querySelectorAll('.web3-row-animate');
      rows.forEach((row, idx) => {
        const isEven = idx % 2 === 0;
        gsap.fromTo(row.querySelector('.row-content'),
          { opacity: 0, x: isEven ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            }
          }
        );
        gsap.fromTo(row.querySelector('.row-image'),
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Clients logos list
  const clients = [
    { name: 'VLCC', img: '/imgs/vlcc.png' },
    { name: 'TVS', img: '/imgs/tvs.png' },
    { name: 'Shell', img: '/imgs/shell.png' },
    { name: 'Li & Fung', img: '/imgs/lifung.png' },
    { name: 'NAC', img: '/imgs/nac.png' },
    { name: 'MCC', img: '/imgs/mcc.png' },
    { name: 'Apollo', img: '/imgs/apollo.png' },
    { name: 'Chettinad', img: '/imgs/chettinad.png' },
    { name: 'IBM', img: '/imgs/ibm.png' },
    { name: 'KVB', img: '/imgs/kvb.png' },
    { name: 'McDelivery', img: '/imgs/mcdelivery.png' },
    { name: 'Vels', img: '/imgs/vels.png' },
    { name: 'Copper Chimney', img: '/imgs/copperchimney.png' },
    { name: 'Poorvika', img: '/imgs/poorvika.png' },
    { name: 'Ramraj', img: '/imgs/ramraj.png' }
  ];

  // Cases Studies Data
  const cases = [
    {
      title: 'Poorvika Mobiles',
      img: '/imgs/poorvik.png',
      desc: 'Reached 1.1 million people in Chennai and South India in one week.'
    },
    {
      title: 'Cake Square Chennai',
      img: '/imgs/coko.png',
      desc: 'Generated 10,000+ targeted leads through performance advertising.'
    },
    {
      title: 'Manju Groups',
      img: '/imgs/manju.png',
      desc: 'Achieved more than 20% conversion rates from digital campaign traffic.'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Jullian Edisa',
      img: '/imgs/Jullian-Edisa.jpg',
      stars: 5,
      text: 'EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs.'
    },
    {
      name: 'Aaron P',
      img: '/imgs/testi_1.jpg',
      stars: 5,
      text: 'EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I’ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service.'
    },
    {
      name: 'Shell Representative',
      img: '/imgs/shell.png',
      stars: 5,
      text: 'Working with EON8 was a great experience. Their team perfectly understood our vision and delivered a website design that was both visually impressive and highly user-friendly. The final result exceeded our beyond expectations, and I’d highly recommend them to anyone looking to grow their brand online or improve their digital presence super fast.'
    }
  ];

  // Blogs list
  const blogs = [
    {
      title: 'WhatsApp Marketing Services by EON8 Convert Conversations into Revenue',
      desc: 'With over 2 billion active users globally, WhatsApp has rapidly evolved into more than just a messaging tool...',
      img: '/imgs/WhatsApp-Marketing-Agency.jpg',
      link: 'https://www.eon8.com/whatsapp-marketing-services/'
    },
    {
      title: 'AI Deleted Its Database Without Warning – What I Learned and How You Can Prevent It',
      desc: 'Introduction Artificial Intelligence (AI) has rapidly transformed the digital landscape, offering unmatched automation, scalability, and performance...',
      img: '/imgs/WhatsApp-Image-2025-08-04-at-1.17.08-PM.jpeg',
      link: 'https://www.eon8.com/data-loss-by-ai-lessons-and-prevention/'
    },
    {
      title: 'AI-Powered Product Marketing Agency: Revolutionizing Video Marketing for Brands',
      desc: 'In today’s fast-paced digital world, product marketing isn’t just about creating awareness it’s about building smart, data-driven strategies...',
      img: '/imgs/Product-marketing-agency-using-AI-.png',
      link: 'https://www.eon8.com/product-marketing-agency-using-ai/'
    }
  ];

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Cinematic Hero Banner */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Remote video background loop */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://www.eon8.com/wp-content/themes/eon8/assets/img/banner_vid.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Visual Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 z-10" />

        {/* Foreground Content */}
        <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
          
          {/* Left Text details */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left hero-title-main">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>360° Growth Agency</span>
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-black tracking-tight leading-none text-white">
              We <em className="text-orange-500 not-italic font-medium font-serif italic">Build</em> Brands <br />
              <span className="bg-gradient-to-r from-orange-500 to-blue-400 bg-clip-text text-transparent">That Win</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-semibold max-w-lg">
              Attention, Traffic & Revenue Optimization
            </p>
            
            <div className="hero-cta-button pt-4">
              <Button 
                onClick={() => setContactModalOpen(true)}
                size="lg"
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-8 text-base shadow-xl shadow-orange-500/20 hover:scale-102 transition-all cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right bullets box */}
          <div className="lg:col-span-5 flex items-center lg:justify-end hero-desc-main">
            <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-sm">
              <ul className="space-y-4 hero-bullets">
                {[
                  '360° Digital Marketing Experts',
                  'ROI-Focused Campaigns',
                  'Data-Driven + Creative Execution',
                  'Trusted by Startups & Global Brands'
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm md:text-base font-semibold">
                    <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Growth Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side illustration */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Decorative Dot Matrix BG */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(circle,#ff5a00_1.5px,transparent_1.5px)] bg-[size:12px_12px] opacity-30 -z-10" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(circle,#0066ff_1.5px,transparent_1.5px)] bg-[size:12px_12px] opacity-30 -z-10" />
          
          <img 
            src="/imgs/digital-globe.png" 
            alt="Digital globe structure" 
            className="w-full max-w-md rounded-3xl object-contain shadow-lg hover:rotate-2 transition-transform duration-500"
          />
        </div>

        {/* Right Side Text Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight">
            Powering Growth for Digital, <br />
            <span className="bg-gradient-to-r from-orange-500 to-primary bg-clip-text text-transparent">AI, and Web3 Brands</span>
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            EON8 is a 360-degree marketing agency providing end-to-end digital solutions for brands across digital, NFT, crypto, and AI ecosystems. We help businesses strengthen their online presence through strategy-driven marketing, performance campaigns, and conversion-focused experiences.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Our team blends creativity, data, and technology to drive consistent visibility and measurable growth. From brand positioning to lead generation, we manage every stage of the digital journey. Each solution is designed to scale, adapt, and deliver long-term results.
          </p>

          <Button 
            onClick={() => setContactModalOpen(true)}
            variant="outline" 
            className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <span>Partner with Us</span>
          </Button>
        </div>
      </section>

      {/* 3. Agency Value Section */}
      <section className="py-24 bg-muted/30 px-6 border-y border-border/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight leading-tight">
              A Distinctive Digital Marketing Company <br />
              <span className="text-orange-500 font-serif italic">That Never Tires!</span>
            </h2>
            <h4 className="text-lg font-semibold text-foreground/90">
              Not Just a Digital Marketing Agency — A Growth Partner
            </h4>
            <p className="italic text-muted-foreground border-l-2 border-orange-500 pl-4">
              We just not talk. We believe, dive and strive to take your business marketing to infinity & beyond.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              At EON8, we don’t believe in random marketing tactics. We design custom digital growth systems that align branding, performance marketing, content, and technology to drive measurable business outcomes.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From SEO and paid advertising to social media, AI-powered content, and Web3-ready marketing, we help brands stay relevant, visible, and profitable in a fast-moving digital world.
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <img 
              src="/imgs/growth-handshake.png" 
              alt="Growth handshake illustration" 
              className="w-full max-w-sm rounded-3xl object-contain shadow-2xl hover:scale-102 transition-transform duration-500"
            />
          </div>

        </div>
      </section>

      {/* 4. Achievements Section */}
      <section className="py-24 achievements-trigger bg-slate-950 dark:bg-slate-900 text-white px-6 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-6xl mx-auto text-center space-y-4 mb-20 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-orange-500">Our Achievements</h2>
          <p className="text-slate-400 font-semibold text-sm sm:text-base">We Make The Best Digital Promoter For Brands</p>
        </div>

        {/* Counter cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {[
            { label: 'Projects Completed', target: 1250, suffix: '', icon: '/imgs/Mask grou.png' },
            { label: 'Happy Clients', target: 548, suffix: '', icon: '/imgs/costume.png' },
            { label: 'Years of Experience', target: 12, suffix: '+', icon: '/imgs/calendar.png' },
            { label: 'Development Experts', target: 250, suffix: '+', icon: '/imgs/blueprin.png' }
          ].map((item, index) => (
            <div 
              key={index}
              className="achieve-card-reveal bg-white/5 dark:bg-slate-950/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-2 hover:border-orange-500/40 transition-all duration-300"
            >
              <img src={item.icon} alt={item.label} className="w-12 h-12 object-contain mb-4 filter brightness-110" />
              <h3 className="text-4xl sm:text-5xl font-heading font-black text-white mb-2 flex items-center justify-center">
                <span className="achievement-counter" data-target={item.target}>0</span>
                <span>{item.suffix}</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-medium leading-tight whitespace-pre-line">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 360 Services Section */}
      <section className="py-24 services-grid-trigger px-6 bg-slate-50 dark:bg-slate-900/50 border-b border-border/30">
        <div className="max-w-6xl mx-auto text-center space-y-4 mb-16">
          <p className="text-orange-500 font-bold uppercase tracking-wider text-xs">Full Suite Solutions</p>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight">
            Our Digital Marketing Services
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Digital Marketing & CRO',
              img: '/imgs/service1.png',
              list: [
                'High-performance marketing websites',
                'Landing pages built for lead generation',
                'UX/UI improvements for higher engagement',
                'Lead tracking, analytics & performance reporting'
              ]
            },
            {
              title: 'Search Engine Optimization (SEO)',
              img: '/imgs/service2.png',
              list: [
                'Keyword research & content strategy',
                'Technical SEO & on-page optimization',
                'High-authority link building',
                'Local & International SEO'
              ]
            },
            {
              title: 'Performance Marketing (Ads)',
              img: '/imgs/service3.png',
              list: [
                'Google Search & Display campaigns',
                'Meta & Instagram lead generation',
                'Funnel-based high-ROI ad creatives',
                'Advanced conversion tracking & analytics'
              ]
            },
            {
              title: 'Social Media Marketing',
              img: '/imgs/service4.png',
              list: [
                'Content strategy & graphic calendars',
                'Reels & short-form video marketing',
                'Active community & comments management',
                'Influencer & brand collaborations'
              ]
            },
            {
              title: 'Content & AI Marketing',
              img: '/imgs/service5.png',
              list: [
                'SEO content creation & blog writing',
                'AI-powered content marketing strategies',
                'Email workflows & marketing automation',
                'Lead nurturing campaigns & analytics'
              ]
            },
            {
              title: 'Brand Strategy & Design',
              img: '/imgs/service6.png',
              list: [
                'Brand identity guidelines & custom logo design',
                'Creative campaigns matching brand story',
                'Website custom UI/UX mockups',
                'Conversion-focused visual design templates'
              ]
            }
          ].map((srv, idx) => (
            <div 
              key={idx}
              className="service-card-reveal bg-white dark:bg-slate-950 border border-border/40 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <img src={srv.img} alt={srv.title} className="w-full h-44 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-heading font-extrabold text-foreground">{srv.title}</h3>
                <ul className="space-y-2 pl-4 list-disc text-muted-foreground text-sm text-left">
                  {srv.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6">
                <Button 
                  onClick={() => setContactModalOpen(true)}
                  variant="ghost" 
                  className="p-0 text-orange-500 hover:text-orange-600 hover:bg-transparent font-bold text-sm flex items-center gap-1 group cursor-pointer"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Web3 & AI Alternating Sections */}
      <section className="py-24 px-6 bg-slate-100 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-center text-orange-500 mb-16">
            Powering Web3 Adoption Through Smart Marketing
          </h2>

          {[
            {
              title: 'NFT Marketing Optimization',
              img: '/imgs/nft.png',
              list: [
                'NFT launch-ready websites & mint pages',
                'High-conversion NFT landing page optimization',
                'Community-first UX for collectors & investors',
                'Wallet, mint & marketplace tracking analytics'
              ],
              link: 'https://www.eon8.com/nft-marketing-services/'
            },
            {
              title: 'Crypto Marketing Optimization',
              img: '/imgs/crypto.png',
              list: [
                'High-trust crypto websites & token platforms',
                'Conversion-focused landing pages',
                'UX/UI design for credibility & clarity',
                'Advanced funnel analytics & user behavior insights'
              ],
              link: 'https://www.eon8.com/crypto-marketing-agency/'
            },
            {
              title: 'AI Marketing Optimization',
              img: '/imgs/ai.png',
              list: [
                'High-performance websites for AI products',
                'Product-led landing page optimization',
                'UX/UI that simplifies complex AI solutions',
                'Advanced analytics & conversion insights'
              ],
              link: 'https://www.eon8.com/ai-agent-development-services/'
            },
            {
              title: 'Website & Conversion Optimization',
              img: '/imgs/website.png',
              list: [
                'High-performance marketing websites',
                'Landing page optimization for higher signups',
                'UX/UI improvements that solve conversion bottlenecks',
                'Detailed lead tracking & analytics implementation'
              ],
              link: 'https://www.eon8.com/search-engine-optimization-services-seo/'
            }
          ].map((row, idx) => (
            <div 
              key={idx}
              className={`web3-row-animate grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 space-y-6 text-left row-content ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground">{row.title}</h3>
                <ul className="space-y-2.5 list-disc pl-5 text-muted-foreground text-sm md:text-base">
                  {row.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <a href={row.link}>
                    <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 shadow-md hover:shadow-lg transition-all">
                      Read More
                    </Button>
                  </a>
                </div>
              </div>

              <div className={`lg:col-span-6 flex justify-center row-image ${
                idx % 2 === 1 ? 'lg:order-1' : ''
              }`}>
                <img 
                  src={row.img} 
                  alt={row.title} 
                  className="w-full max-w-md object-contain" 
                />
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 7. Why EON8 Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side image */}
        <div className="lg:col-span-6 flex justify-center">
          <img 
            src="/imgs/building.png" 
            alt="Office building structure" 
            className="w-full max-w-md object-contain" 
          />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight">
            Why Brands Choose EON8
          </h2>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
          
          <ul className="space-y-4">
            {[
              'Strategy first, execution second',
              'Transparent reporting & real metrics',
              'Creative meets performance marketing',
              'AI-driven insights for faster scaling',
              'Industry-specific marketing playbooks'
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-semibold text-foreground/80">
                <CheckCircle className="w-5.5 h-5.5 text-orange-500 shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Industries We Serve */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto border border-orange-500/20 bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-44 h-44 bg-orange-500/10 rounded-full blur-2xl" />

          <h2 className="text-3xl sm:text-4xl font-heading font-black text-center mb-12">
            Industries We Serve
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { name: 'Hospitality & Hotels', icon: '/imgs/hospitality.png' },
              { name: 'Healthcare', icon: '/imgs/healthcare.png' },
              { name: 'Real Estate', icon: '/imgs/realestate.png' },
              { name: 'Political Campaigns', icon: '/imgs/political.png' },
              { name: 'Ecommerce', icon: '/imgs/ecommerce.png' },
              { name: 'SaaS & Tech Startups', icon: '/imgs/saas.png' },
              { name: 'Education', icon: '/imgs/education.png' }
            ].map((ind, idx) => (
              <div 
                key={idx} 
                className="w-32 sm:w-36 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-orange-500 hover:bg-orange-600 rounded-2xl flex items-center justify-center mb-3 transition-colors shadow-lg border border-orange-400/20 shrink-0">
                  <img src={ind.icon} alt={ind.name} className="w-8 h-8 object-contain filter brightness-200" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground/90 leading-tight">{ind.name}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Prestigious Clients Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-border/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-950 dark:text-white">
              Our Prestigious Clients
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {clients.map((c, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center bg-white border border-blue-500/30 hover:border-blue-500 rounded-2xl p-6 h-28 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <img 
                  src={c.img} 
                  alt={c.name} 
                  className="max-w-full max-h-16 object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Client Satisfaction */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Rating Image */}
          <div className="max-w-md lg:max-w-full mx-auto">
            <img 
              src="/imgs/satisfaction.png" 
              alt="Client Satisfaction rating slider" 
              className="w-full h-auto object-contain" 
            />
          </div>

          {/* Right: Text Details */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-950 dark:text-white leading-tight">
              Client Satisfaction Is <br />
              Our Prime Goal
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">
              Be it a small or large business, we make sure to provide the best dedicated service to uplift your business value and returns while not forgetting to meet your expectations.
            </p>
          </div>
        </div>
      </section>

      {/* 10b. Case Studies */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 border-t border-border/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-heading font-black">Our Success Stories</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We deliver passionate, tailor-made digital marketing services that generate increased sales & fetch outstanding business growth.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((c, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-950 border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-center"
              >
                <div className="flex flex-col items-center space-y-4">
                  <img src={c.img} alt={c.title} className="h-16 object-contain mb-2" />
                  <h3 className="text-xl font-heading font-extrabold text-foreground">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: c.desc }} />
                </div>
                
                <div className="pt-6">
                  <Button 
                    onClick={() => setContactModalOpen(true)}
                    variant="outline" 
                    className="w-full rounded-xl border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    View Results
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-orange-500">Testimonials</h2>
            <p className="text-muted-foreground font-semibold text-sm">What clients say about our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index}
                className="bg-slate-50 dark:bg-slate-950 border border-border/40 rounded-2xl flex flex-col justify-between overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6 md:p-8 space-y-4 relative">
                  <Quote className="w-10 h-10 text-orange-500/10 absolute top-4 right-4" />
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-orange-500">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed text-left">
                    "{test.text}"
                  </p>
                </div>

                <div className="bg-orange-500/90 p-4 px-6 flex items-center gap-4 text-white">
                  <img src={test.img} alt={test.name} className="w-11 h-11 rounded-full object-cover border border-white/20 shrink-0" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold font-heading">{test.name}</h4>
                    <span className="text-[10px] text-white/80">Eon8 Client Partner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. Recent Blog Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-border/30">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-orange-500">Blog</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <div 
                key={i}
                className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="overflow-hidden">
                    <img 
                      src={blog.img} 
                      alt={blog.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5 space-y-3 text-left">
                    <h4 className="text-base font-heading font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      <a href={blog.link}>{blog.title}</a>
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                      {blog.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-border/10 flex items-center justify-between text-xs">
                  <a href={blog.link} className="font-bold text-orange-500 hover:underline">
                    Read Article
                  </a>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>2026</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="https://www.eon8.com/blog/">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl px-8 h-12">
                <span>View More Articles</span>
              </Button>
            </a>
          </div>

        </div>
      </section>

      {/* 13. WhatsApp Contact CTA Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-heading font-black">Contact Us On WhatsApp</h2>
          
          <div className="bg-white dark:bg-slate-950 border border-orange-500/20 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden flex flex-col items-center gap-6">
            <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl" />
            <Award className="w-12 h-12 text-orange-500" />
            
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
              Don’t get left behind in the race to achieve business growth in the Digital Era. Get in Touch with us to explore new possibilities.
            </p>
            
            <a href="https://wa.me/919042294007" target="_blank" rel="noreferrer">
              <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600 text-white font-bold h-14 px-8 text-base shadow-xl shadow-green-500/10 gap-3">
                <img src="/imgs/whatsapp.png" alt="WhatsApp Icon" className="w-6 h-6 object-contain" />
                <span>+91 90422 94007</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
