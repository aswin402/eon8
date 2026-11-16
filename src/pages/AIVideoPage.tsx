import { useState, useEffect, type FormEvent } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Film,
  FileText,
  Headphones,
  Lightbulb,
  Lock,
  Maximize2,
  Palette,
  Play,
  Pause,
  Send,
  Sliders,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHY_CHOOSE_VIDEO = [
  {
    title: 'Faster Video Production',
    desc: 'Produce professional video content within shorter timelines using AI-powered production workflows.',
  },
  {
    title: 'Cost-Effective Content Creation',
    desc: 'Create high-quality business videos while reducing the costs involved in traditional production.',
  },
  {
    title: 'Professional Visual Quality',
    desc: 'Use AI-powered visuals, animations, transitions, and storytelling to create engaging content.',
  },
  {
    title: 'Consistent Brand Messaging',
    desc: 'Maintain a unified visual style and message across your business video content.',
  },
  {
    title: 'Easy Content Updates',
    desc: 'Update business information and video content more efficiently when requirements change.',
  },
  {
    title: 'Improved Audience Engagement',
    desc: 'Communicate your message through engaging visual experiences designed to capture audience attention.',
  },
  {
    title: 'Better Marketing Performance',
    desc: 'Support marketing campaigns with compelling visual content that encourages engagement and conversions.',
  },
  {
    title: 'Scalable Video Production',
    desc: 'Produce multiple videos for different campaigns, audiences, and business requirements.',
  },
  {
    title: 'Multiple Business Goals',
    desc: 'Create video content for marketing, branding, training, promotions, social media, and business communication.',
  },
  {
    title: 'Quick Platform Adaptation',
    desc: 'Adapt video content for websites, social media, presentations, digital campaigns, and other platforms.',
  },
];

const VIDEO_SERVICES = [
  {
    title: 'AI Promotional Videos',
    desc: 'Promotional videos help businesses introduce products, services, offers, and campaigns in an engaging way. We create visually appealing AI-powered promotional videos that capture attention and encourage customer action.',
  },
  {
    title: 'AI Product Videos',
    desc: 'Present your products with attractive videos that highlight important features, benefits, and real-world applications, making it easier for potential customers to understand your offering.',
  },
  {
    title: 'AI Explainer Videos',
    desc: 'We create easy-to-understand AI videos that simplify complex ideas and clearly communicate your services, business processes, and unique value.',
  },
  {
    title: 'AI Social Media Videos',
    desc: 'Short-form AI-created videos designed to capture attention quickly while delivering your message in a creative and impactful way across digital platforms.',
  },
  {
    title: 'AI Corporate Videos',
    desc: 'From company introductions to internal communication and business presentations, we develop AI-powered videos that reflect professionalism and credibility.',
  },
  {
    title: 'AI Training Videos',
    desc: 'Engaging AI-powered training videos simplify learning and help organizations deliver consistent knowledge across teams.',
  },
  {
    title: 'AI Marketing Videos',
    desc: 'Compelling visual content designed to support lead generation, customer engagement, product awareness, and business growth.',
  },
];

const VIDEO_PROCESS = [
  {
    step: '01',
    title: 'Understanding Your Business',
    desc: 'We understand your business objectives, target audience, and marketing goals so the video aligns with your overall strategy.',
  },
  {
    step: '02',
    title: 'Content Planning',
    desc: 'We develop a clear content structure that communicates your message in an engaging and easy-to-understand format.',
  },
  {
    step: '03',
    title: 'Script Creation',
    desc: 'Our team prepares professional scripts that match your brand voice while delivering valuable information to your audience.',
  },
  {
    step: '04',
    title: 'AI Video Production',
    desc: 'We create visuals, animations, transitions, voiceovers, and engaging video sequences using AI-powered workflows.',
  },
  {
    step: '05',
    title: 'Quality Review',
    desc: 'Every video is reviewed for visual consistency, content accuracy, and professional quality before delivery.',
  },
  {
    step: '06',
    title: 'Final Delivery',
    desc: 'The completed video is optimized for websites, social media, presentations, digital campaigns, and other business platforms.',
  },
];

const EON8_ADVANTAGES = [
  { icon: Sliders, label: 'Customized video solutions' },
  { icon: Users, label: 'Experienced creative professionals' },
  { icon: Lightbulb, label: 'Business-focused storytelling' },
  { icon: Film, label: 'High-quality visual production' },
  { icon: FileText, label: 'Professional script development' },
  { icon: Zap, label: 'Quick turnaround time' },
  { icon: Palette, label: 'Consistent brand communication' },
  { icon: TrendingUp, label: 'Marketing-oriented content' },
  { icon: Maximize2, label: 'Scalable production capabilities' },
  { icon: Headphones, label: 'Dedicated project support' },
];

const VIDEO_BENEFITS = [
  {
    title: 'Increase Customer Engagement',
    desc: 'Video content captures attention more effectively than text or static images, helping businesses connect with their audience.',
  },
  {
    title: 'Improve Brand Awareness',
    desc: 'Professional AI videos strengthen your brand identity and create a memorable experience for viewers.',
  },
  {
    title: 'Faster Content Production',
    desc: 'Produce multiple business videos within shorter timelines without compromising professional quality.',
  },
  {
    title: 'Cost-Effective Solution',
    desc: 'AI-powered production helps reduce production costs while maintaining professional standards.',
  },
  {
    title: 'Better Marketing Results',
    desc: 'Videos can improve campaign performance by increasing engagement, customer interest, and conversions.',
  },
  {
    title: 'Consistent Brand Communication',
    desc: 'Maintain a unified visual style and messaging across all your business videos.',
  },
  {
    title: 'Easy Content Updates',
    desc: 'Business information changes over time. AI-generated videos can be updated more efficiently whenever new content is required.',
  },
];

const VIDEO_FAQS = [
  {
    q: 'What is AI Video Creation?',
    a: 'AI Video Creation is the process of using intelligent technology to assist in producing professional business videos more efficiently while maintaining creative quality.',
  },
  {
    q: 'What types of videos can EON8 create?',
    a: 'We create promotional videos, product videos, explainer videos, marketing videos, corporate videos, training videos, social media videos, and customized business videos.',
  },
  {
    q: 'Can AI videos match my brand identity?',
    a: 'Yes. Every video is customized according to your branding, messaging, style, and business objectives.',
  },
  {
    q: 'Are AI videos suitable for marketing campaigns?',
    a: 'Yes. AI-powered videos are highly effective for digital marketing, social media promotions, website content, product launches, and customer engagement campaigns.',
  },
  {
    q: 'Can videos be created for different industries?',
    a: 'Absolutely. We develop AI video solutions tailored to businesses across multiple industries and business models.',
  },
  {
    q: 'Why choose EON8?',
    a: 'EON8 combines creative expertise with AI-powered production to deliver professional, engaging, and business-focused videos that help brands communicate effectively.',
  },
];

function ShowcaseVideoCard({ index, title }: { index: number; title: string }) {
  const [playing, setPlaying] = useState(false);

  const togglePlay = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg group relative">
      <div className="aspect-video relative bg-black">
        <video
          id={`ai-work-vid-${index}`}
          playsInline
          preload="metadata"
          controls={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          src="/wp-content/uploads/2026/10/1-1.mp4#t=0.5"
          className="w-full h-full object-cover"
        />
        {!playing && (
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={() =>
              togglePlay(document.getElementById(`ai-work-vid-${index}`) as HTMLVideoElement | null)
            }
            className="absolute inset-0 bg-slate-950/35 hover:bg-slate-950/20 flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <span className="w-16 h-16 rounded-full bg-[#FD5900] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 fill-current ml-0.5" />
            </span>
          </button>
        )}
      </div>
      <div className="p-4 flex items-center justify-between text-white bg-slate-950/90">
        <span className="text-sm font-heading font-bold">{title}</span>
        <button
          type="button"
          onClick={() =>
            togglePlay(document.getElementById(`ai-work-vid-${index}`) as HTMLVideoElement | null)
          }
          className="text-xs text-[#FD5900] hover:text-orange-300 font-semibold flex items-center gap-1 cursor-pointer"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>
      </div>
    </div>
  );
}

export function AIVideoPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [heroPlaying, setHeroPlaying] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captchaN1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [captchaN2] = useState(() => Math.floor(Math.random() * 7) + 2);
  const [captchaAns, setCaptchaAns] = useState('');
  const [formErr, setFormErr] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'AI Video Creation Services | AI Video Production Company | EON8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Create engaging AI-powered videos for your business with EON8. We deliver high-quality AI video creation services for marketing, branding, training, and promotions.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormErr('Please complete all required fields.');
      return;
    }
    if (parseInt(captchaAns.trim(), 10) !== captchaN1 + captchaN2) {
      setFormErr('Incorrect security calculation. Please try again.');
      return;
    }
    setFormErr('');
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground font-body overflow-x-clip">
      {/* 1. Dark Navy Architectural Grid Hero (matching d_ai_video.png) */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#071630] text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(96,165,250,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.16) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              <span>AI Video Production</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              AI Video Creation Services
            </h1>

            <p className="text-lg sm:text-xl font-bold text-[#FD5900]">
              Transform Your Ideas into Engaging AI Videos
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Turn your ideas into professional AI-generated videos for marketing, promotions, training, and social media. Fast, creative, and customized by EON8.
            </p>

            <div className="pt-2">
              <a href="#consult-form">
                <Button className="rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 sm:h-14 px-7 text-sm sm:text-base shadow-lg cursor-pointer">
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#0d2247] border border-blue-400/25 rounded-3xl p-4 sm:p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-blue-200/80">
                  eon8-ai-video-studio.mp4
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                <video
                  id="ai-hero-preview-video"
                  playsInline
                  preload="metadata"
                  controls={heroPlaying}
                  onPlay={() => setHeroPlaying(true)}
                  onPause={() => setHeroPlaying(false)}
                  src="/wp-content/uploads/2026/10/1-1.mp4#t=0.5"
                  className="w-full h-full object-cover"
                />
                {!heroPlaying && (
                  <button
                    type="button"
                    aria-label="Play Studio Showreel"
                    onClick={() => {
                      const v = document.getElementById(
                        'ai-hero-preview-video'
                      ) as HTMLVideoElement | null;
                      v?.play().catch(() => {});
                    }}
                    className="absolute inset-0 bg-slate-950/35 hover:bg-slate-950/20 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer"
                  >
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FD5900] text-white flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/90 bg-black/50 px-3.5 py-1 rounded-full">
                      Watch AI Video Showreel
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose AI Video Creation? */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#eff4fb] dark:bg-card/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 text-left">
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
                Why Choose AI Video Creation?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Modern businesses need content that is fast, engaging, and adaptable across multiple platforms. AI-powered video creation helps organizations produce high-quality videos with greater speed while maintaining consistency and creativity.
              </p>
              <p className="text-sm font-semibold text-[#0053c6] dark:text-blue-400">
                AI Video Creation enables businesses to communicate their message more effectively while reducing the time involved in traditional video production.
              </p>
            </div>
            <div className="lg:col-span-6">
              <img
                src="/wp-content/uploads/2026/06/satisfaction.webp"
                alt="Marketing team reviewing AI-generated video content"
                loading="lazy"
                className="w-full rounded-3xl object-cover shadow-lg border border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {WHY_CHOOSE_VIDEO.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:border-[#0053c6]/40 transition-all text-left space-y-2"
              >
                <CheckCircle2 className="w-5 h-5 text-[#FD5900]" />
                <h3 className="text-sm sm:text-base font-heading font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our AI Video Creation Services */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
                Our AI Video Creation <span className="text-[#FD5900]">Services</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                From promotional campaigns to employee training, we create AI-powered videos tailored to your business objectives and audience.
              </p>
              <img
                src="/wp-content/uploads/2026/10/young-woman-with-white-wig-in-blue-light-2026-09-23-00-17-58-utc-scaled.jpg"
                alt="Video production setup with camera and lighting"
                loading="lazy"
                className="w-full rounded-3xl object-cover aspect-[4/3] shadow-lg border border-border"
              />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VIDEO_SERVICES.map((srv) => (
                <div
                  key={srv.title}
                  className="bg-[#f8fafc] dark:bg-card border border-border rounded-2xl p-6 space-y-2.5 hover:border-[#FD5900]/40 transition-colors"
                >
                  <h3 className="text-lg font-heading font-bold text-foreground">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Work */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#071630] text-white">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">Our Work</h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                A selection of AI-powered videos we have created for brands across industries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ShowcaseVideoCard index={1} title="AI Brand Promotional Campaign" />
            <ShowcaseVideoCard index={2} title="AI Product Launch Showcase" />
            <ShowcaseVideoCard index={3} title="AI Social Media Reel" />
          </div>
        </div>
      </section>

      {/* 5. Our AI Video Creation Process */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#eff4fb] dark:bg-card/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              Our AI Video Creation <span className="text-[#0053c6] dark:text-blue-400">Process</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              A structured production process helps us turn your business ideas into clear, engaging, and professional AI-powered videos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_PROCESS.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 shadow-sm"
              >
                <span className="inline-block px-3 py-1 rounded-lg bg-[#0053c6]/10 text-[#0053c6] dark:text-blue-400 text-xs font-extrabold">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-heading font-bold text-foreground">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#consult-form">
              <Button className="rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 px-8 text-sm cursor-pointer shadow-md">
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Why Choose EON8 */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <img
              src="/wp-content/uploads/2026/06/website.webp"
              alt="Creative team collaborating on a video project"
              loading="lazy"
              className="w-full rounded-3xl object-contain"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
                Why Choose EON8 for AI Video Creation?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                We combine creativity, technology, and strategic thinking to create videos that engage audiences and strengthen your brand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {EON8_ADVANTAGES.map((adv) => {
                const IconComp = adv.icon;
                return (
                  <div
                    key={adv.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#f6f9ff] dark:bg-card border border-border"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#FD5900]/10 text-[#FD5900] flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {adv.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Benefits */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#eff4fb] dark:bg-card/30">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              Benefits of AI Video Creation
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              AI-powered video production helps businesses create engaging content faster while maintaining consistency across campaigns and platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white dark:bg-card border border-border rounded-2xl p-6 space-y-2 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-heading font-bold text-foreground">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {VIDEO_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-border rounded-2xl overflow-hidden bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-foreground cursor-pointer hover:text-[#FD5900]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#FD5900] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Ready CTA & Request a Free Quote Form */}
      <section
        id="consult-form"
        className="py-16 sm:py-24 px-5 sm:px-8 bg-gradient-to-br from-[#071630] via-[#0b2754] to-[#0053c6] text-white scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Studio Ready</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black leading-tight text-white">
              Ready to Create High-Quality AI Videos?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              At EON8, we help businesses transform ideas into engaging AI-powered videos that inspire, educate, and convert.
            </p>
            <ul className="flex flex-wrap gap-3 text-xs sm:text-sm font-semibold">
              <li className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-[#FD5900]" />
                <span>Fast Production</span>
              </li>
              <li className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#FD5900]" />
                <span>Customized Content</span>
              </li>
              <li className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Lock className="w-4 h-4 text-[#FD5900]" />
                <span>Business-Focused</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 text-foreground rounded-3xl p-6 sm:p-8 shadow-2xl border border-border">
            <h3 className="text-xl sm:text-2xl font-heading font-black mb-2">
              Request a Free Quote
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5">
              Partner with EON8 to turn your ideas into engaging visual experiences.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-heading font-bold">Quote Request Sent!</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Our AI video production team will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formErr && (
                  <p className="text-xs font-semibold text-red-600 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    {formErr}
                  </p>
                )}
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900]"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900]"
                />
                <textarea
                  rows={3}
                  placeholder="Tell us about your AI video project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900] resize-none"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="text-xs font-bold text-muted-foreground shrink-0">
                    Security Check: {captchaN1} + {captchaN2} = ?
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Answer"
                    value={captchaAns}
                    onChange={(e) => setCaptchaAns(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900] w-full sm:w-32"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  <span>Submit Quote Request</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
