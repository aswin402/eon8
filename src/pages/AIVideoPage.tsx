import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  Crosshair,
  FileText,
  Headphones,
  Lightbulb,
  ListChecks,
  Maximize2,
  MonitorSmartphone,
  Palette,
  PiggyBank,
  Play,
  Share2,
  SlidersHorizontal,
  Sparkles,
  SquarePen,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  type FaqItem,
  type FeatureCardItem,
  type ProcessStepItem,
} from '@/components/sections';

const WHY_FEATURES: FeatureCardItem[] = [
  {
    icon: Zap,
    title: 'Faster Video Production',
    description:
      'Produce professional video content within shorter timelines using AI-powered production workflows.',
  },
  {
    icon: PiggyBank,
    title: 'Cost-Effective Content Creation',
    description:
      'Create high-quality business videos while reducing the costs involved in traditional production.',
  },
  {
    icon: Sparkles,
    title: 'Professional Visual Quality',
    description:
      'Use AI-powered visuals, animations, transitions, and storytelling to create engaging content.',
  },
  {
    icon: Palette,
    title: 'Consistent Brand Messaging',
    description: 'Maintain a unified visual style and message across your business video content.',
  },
  {
    icon: SquarePen,
    title: 'Easy Content Updates',
    description:
      'Update business information and video content more efficiently when requirements change.',
  },
  {
    icon: Users,
    title: 'Improved Audience Engagement',
    description:
      'Communicate your message through engaging visual experiences designed to capture audience attention.',
  },
  {
    icon: TrendingUp,
    title: 'Better Marketing Performance',
    description:
      'Support marketing campaigns with compelling visual content that encourages engagement and conversions.',
  },
  {
    icon: Maximize2,
    title: 'Scalable Video Production',
    description:
      'Produce multiple videos for different campaigns, audiences, and business requirements.',
  },
  {
    icon: Crosshair,
    title: 'Multiple Business Goals',
    description:
      'Create video content for marketing, branding, training, promotions, social media, and business communication.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Quick Platform Adaptation',
    description:
      'Adapt video content for websites, social media, presentations, digital campaigns, and other platforms.',
  },
];

const VIDEO_SERVICES: FeatureCardItem[] = [
  {
    icon: Sparkles,
    title: 'AI Promotional Videos',
    description:
      'Promotional videos help businesses introduce products, services, offers, and campaigns in an engaging way. We create visually appealing AI-powered promotional videos that capture attention and encourage customer action.',
  },
  {
    icon: Clapperboard,
    title: 'AI Product Videos',
    description:
      'Present your products with attractive videos that highlight important features, benefits, and real-world applications, making it easier for potential customers to understand your offering.',
  },
  {
    icon: Lightbulb,
    title: 'AI Explainer Videos',
    description:
      'We create easy-to-understand AI videos that simplify complex ideas and clearly communicate your services, business processes, and unique value.',
  },
  {
    icon: Share2,
    title: 'AI Social Media Videos',
    description:
      'Short-form AI-created videos designed to capture attention quickly while delivering your message in a creative and impactful way across digital platforms.',
  },
  {
    icon: Users,
    title: 'AI Corporate Videos',
    description:
      'From company introductions to internal communication and business presentations, we develop AI-powered videos that reflect professionalism and credibility.',
  },
  {
    icon: FileText,
    title: 'AI Training Videos',
    description:
      'Engaging AI-powered training videos simplify learning and help organizations deliver consistent knowledge across teams.',
  },
  {
    icon: TrendingUp,
    title: 'AI Marketing Videos',
    description:
      'Compelling visual content designed to support lead generation, customer engagement, product awareness, and business growth.',
  },
];

const VIDEO_SLIDES = [
  {
    src: '/wp-content/uploads/2026/10/1-1.mp4#t=0.5',
    label: 'Brand Storytelling Showreel',
  },
  {
    src: '/wp-content/uploads/2022/10/reels-marketing.mp4',
    label: 'Social Performance Ad Reel',
  },
  {
    src: '/wp-content/uploads/2022/06/Comp-1_2.mp4',
    label: 'Product Launch Motion Promo',
  },
];

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    step: '01',
    icon: Crosshair,
    title: 'Understanding Your Business',
    description:
      'We understand your business objectives, target audience, and marketing goals so the video aligns with your overall strategy.',
  },
  {
    step: '02',
    icon: ListChecks,
    title: 'Content Planning',
    description:
      'We develop a clear content structure that communicates your message in an engaging and easy-to-understand format.',
  },
  {
    step: '03',
    icon: FileText,
    title: 'Script Creation',
    description:
      'Our team prepares professional scripts that match your brand voice while delivering valuable information to your audience.',
  },
  {
    step: '04',
    icon: Clapperboard,
    title: 'AI Video Production',
    description:
      'We create visuals, animations, transitions, voiceovers, and engaging video sequences using AI-powered workflows.',
  },
  {
    step: '05',
    icon: CheckCircle2,
    title: 'Quality Review',
    description:
      'Every video is reviewed for visual consistency, content accuracy, and professional quality before delivery.',
  },
  {
    step: '06',
    icon: Share2,
    title: 'Final Delivery',
    description:
      'The completed video is optimized for websites, social media, presentations, digital campaigns, and other business platforms.',
  },
];

const WHY_EON8_CHIPS: { icon: LucideIcon; label: string }[] = [
  { icon: SlidersHorizontal, label: 'Customized video solutions' },
  { icon: Users, label: 'Experienced creative professionals' },
  { icon: Lightbulb, label: 'Business-focused storytelling' },
  { icon: Clapperboard, label: 'High-quality visual production' },
  { icon: FileText, label: 'Professional script development' },
  { icon: Zap, label: 'Quick turnaround time' },
  { icon: Palette, label: 'Consistent brand communication' },
  { icon: TrendingUp, label: 'Marketing-oriented content' },
  { icon: Maximize2, label: 'Scalable production capabilities' },
  { icon: Headphones, label: 'Dedicated project support' },
];

const BENEFIT_CARDS: FeatureCardItem[] = [
  {
    icon: CheckCircle2,
    title: 'Increase Customer Engagement',
    description:
      'Video content captures attention more effectively than text or static images, helping businesses connect with their audience.',
  },
  {
    icon: CheckCircle2,
    title: 'Improve Brand Awareness',
    description:
      'Professional AI videos strengthen your brand identity and create a memorable experience for viewers.',
  },
  {
    icon: CheckCircle2,
    title: 'Faster Content Production',
    description:
      'Produce multiple business videos within shorter timelines without compromising professional quality.',
  },
  {
    icon: CheckCircle2,
    title: 'Cost-Effective Solution',
    description:
      'AI-powered production helps reduce production costs while maintaining professional standards.',
  },
  {
    icon: CheckCircle2,
    title: 'Better Marketing Results',
    description:
      'Videos can improve campaign performance by increasing engagement, customer interest, and conversions.',
  },
  {
    icon: CheckCircle2,
    title: 'Consistent Brand Communication',
    description: 'Maintain a unified visual style and messaging across all your business videos.',
  },
  {
    icon: CheckCircle2,
    title: 'Easy Content Updates',
    description:
      'Business information changes over time. AI-generated videos can be updated more efficiently whenever new content is required.',
  },
];

const AV_FAQS: FaqItem[] = [
  {
    question: 'What is AI Video Creation?',
    answer:
      'AI Video Creation is the process of using intelligent technology to assist in producing professional business videos more efficiently while maintaining creative quality.',
  },
  {
    question: 'What types of videos can EON8 create?',
    answer:
      'We create promotional videos, product videos, explainer videos, marketing videos, corporate videos, training videos, social media videos, and customized business videos.',
  },
  {
    question: 'Can AI videos match my brand identity?',
    answer:
      'Yes. Every video is customized according to your branding, messaging, style, and business objectives.',
  },
  {
    question: 'Are AI videos suitable for marketing campaigns?',
    answer:
      'Yes. AI-powered videos are highly effective for digital marketing, social media promotions, website content, product launches, and customer engagement campaigns.',
  },
  {
    question: 'Can videos be created for different industries?',
    answer:
      'Absolutely. We develop AI video solutions tailored to businesses across multiple industries and business models.',
  },
  {
    question: 'Why choose EON8?',
    answer:
      'EON8 combines creative expertise with AI-powered production to deliver professional, engaging, and business-focused videos that help brands communicate effectively.',
  },
];

const EQUALIZER_BARS = [34, 58, 42, 76, 50, 88, 62, 40, 70, 94, 54, 38, 66, 82, 46, 60];

export function AIVideoPage() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  const selectSlide = (nextIdx: number) => {
    const bounded = Math.max(0, Math.min(VIDEO_SLIDES.length - 1, nextIdx));
    setActiveSlide(bounded);
    cardRefs.current[bounded]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const handlePlay = (idx: number) => {
    setActiveSlide(idx);
    videoRefs.current.forEach((v, i) => {
      if (v && i !== idx && !v.paused) v.pause();
    });
    const el = videoRefs.current[idx];
    if (el) {
      setPlayingIdx(idx);
      el.controls = true;
      el.play().catch(() => {});
    }
  };

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="AI Video Creation Services | AI Video Production Company | EON8"
        description="Create engaging AI-powered videos for your business with EON8. We deliver high-quality AI video creation services for marketing, promotions, training, and social media."
      />

      {/* 1. Studio Hero */}
      <ServiceHeroSection
        theme="ai"
        layout="split-media"
        badge="AI Video Studio"
        heading="AI Video Creation Services"
        subheading="Transform Your Ideas into Engaging AI Videos"
        paragraphs={[
          'Turn your ideas into professional AI-generated videos for marketing, promotions, training, and social media. Fast, creative, and customized by EON8.',
        ]}
        actions={[
          { label: 'Request a Free Quote', href: '#consult-form', variant: 'primary' },
          { label: 'View Our Work', href: '#our-work', variant: 'secondary' },
        ]}
        customRightSlot={
          <div className="rounded-3xl border border-white/15 bg-slate-950/75 backdrop-blur-md p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                AI Render Engine • 4K
              </span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
              <img
                src="/wp-content/uploads/2026/06/Product-Marketing-with-AI-Illustration.webp"
                alt="AI Video Production Preview"
                className="w-full h-full object-cover opacity-85"
              />
              <a
                href="#our-work"
                aria-label="Jump to video showreel"
                className="absolute inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FD5900] text-white shadow-xl hover:scale-105 transition-transform"
              >
                <Play className="w-7 h-7 fill-white ml-0.5" />
              </a>
            </div>

            <div className="flex items-end justify-between gap-1.5 h-10 px-2" aria-hidden="true">
              {EQUALIZER_BARS.map((h, idx) => (
                <span
                  key={idx}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-full bg-gradient-to-t from-cyan-500 to-indigo-400 opacity-80"
                />
              ))}
            </div>
          </div>
        }
      />

      {/* 2. Why Choose AI Video Creation */}
      <AlternatingSplitSection
        theme="ai"
        badge="Next-Gen Production"
        heading="Why Choose AI Video Creation?"
        paragraphs={[
          'Modern businesses need content that is fast, engaging, and adaptable across multiple platforms. AI-powered video creation helps organizations produce high-quality videos with greater speed while maintaining consistency and creativity.',
          'AI Video Creation enables businesses to communicate their message more effectively while reducing the time involved in traditional video production.',
        ]}
        imageSrc="/wp-content/uploads/2026/06/satisfaction.webp"
        imageAlt="Marketing team reviewing AI-generated video content"
      />

      <FeatureGridSection
        theme="ai"
        surface="muted"
        badge="Key Advantages"
        heading="Built for Speed, Consistency & Scale"
        cards={WHY_FEATURES}
        columns={3}
      />

      {/* 3. AI Video Creation Services */}
      <AlternatingSplitSection
        theme="ai"
        reverse
        badge="Full-Spectrum Formats"
        heading="Our AI Video Creation Services"
        paragraphs={[
          'From promotional campaigns to employee training, we create AI-powered videos tailored to your business objectives and audience.',
        ]}
        imageSrc="/wp-content/uploads/2026/06/ai.webp"
        imageAlt="AI Video Creation Formats"
      />

      <FeatureGridSection
        theme="ai"
        surface="light"
        heading="Tailored Video Formats for Every Funnel Stage"
        cards={VIDEO_SERVICES}
        columns={3}
      />

      {/* 4. Interactive Video Showreel */}
      <section
        id="our-work"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
                Showreel
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                Our Work
              </h2>
              <p className="text-base text-muted-foreground">
                A selection of AI-powered videos we have created for brands across industries.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous video"
                onClick={() => selectSlide(activeSlide - 1)}
                disabled={activeSlide === 0}
                className="w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center disabled:opacity-40 hover:border-[#FD5900] cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next video"
                onClick={() => selectSlide(activeSlide + 1)}
                disabled={activeSlide >= VIDEO_SLIDES.length - 1}
                className="w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center disabled:opacity-40 hover:border-[#FD5900] cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_SLIDES.map((slide, idx) => (
              <div
                key={slide.label}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`rounded-2xl overflow-hidden border bg-card shadow-md transition-all ${
                  activeSlide === idx ? 'border-[#FD5900] ring-2 ring-[#FD5900]/30' : 'border-border'
                }`}
              >
                <div className="relative aspect-video bg-slate-950">
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={slide.src}
                    playsInline
                    preload="metadata"
                    onEnded={() => setPlayingIdx(null)}
                    className="w-full h-full object-cover"
                  />
                  {playingIdx !== idx && (
                    <button
                      type="button"
                      aria-label={`Play ${slide.label}`}
                      onClick={() => handlePlay(idx)}
                      className="absolute inset-0 bg-black/35 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="w-14 h-14 rounded-full bg-[#FD5900] text-white flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </span>
                    </button>
                  )}
                </div>
                <div className="p-4 text-sm font-heading font-bold text-foreground">
                  {slide.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Production Process */}
      <ProcessRoadmapSection
        theme="ai"
        surface="dark"
        badge="Workflow"
        heading="Our AI Video Creation Process"
        subheading="A structured production process helps us turn your business ideas into clear, engaging, and professional AI-powered videos."
        steps={PROCESS_STEPS}
        bottomActions={[{ label: 'Request a Free Quote', href: '#consult-form', variant: 'primary' }]}
      />

      {/* 6. Why Choose EON8 */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-400">
              Creative + AI Precision
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              Why Choose EON8 for AI Video Creation?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We combine creativity, technology, and strategic thinking to create videos that engage audiences and strengthen your brand.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border bg-slate-100 dark:bg-slate-800 p-3 shadow-md">
              <img
                src="/wp-content/uploads/2026/06/website.webp"
                alt="Creative team collaborating on an AI video project"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_EON8_CHIPS.map((chip) => {
              const Icon = chip.icon;
              return (
                <div
                  key={chip.label}
                  className="flex items-center gap-3.5 rounded-2xl bg-card border border-border p-4.5 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-cyan-500/15 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-heading font-bold text-foreground">
                    {chip.label}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Benefits */}
      <FeatureGridSection
        theme="ai"
        surface="muted"
        badge="Measurable ROI"
        heading="Benefits of AI Video Creation"
        subheading="AI-powered video production helps businesses create engaging content faster while maintaining consistency across campaigns and platforms."
        cards={BENEFIT_CARDS}
        columns={3}
      />

      {/* 8. FAQ */}
      <FaqAccordionSection theme="ai" surface="dark" faqs={AV_FAQS} />

      {/* 9. Strategy Call */}
      <DiscoveryCallSection
        theme="ai"
        badge="Free Quote"
        heading="Ready to Create High-Quality AI Videos?"
        subheading="At EON8, we help businesses transform ideas into engaging AI-powered videos that inspire, educate, and convert."
        callTitle="30-Min AI Video Production Strategy Call"
        callDescription="Discuss your campaign goals, scripts, visual style, and turnaround timeline with our AI video directors."
      />

      {/* 10. Bottom Enquiry + Disclaimer */}
      <BottomCtaBanner
        theme="ai"
        heading="Request a Free Quote"
        description={
          <>
            Ready to create professional AI-powered videos for your business? Partner with{' '}
            <Link to="/" className="text-[#FD5900] font-bold underline">
              EON8
            </Link>{' '}
            to turn your ideas into engaging visual experiences that elevate your brand, engage your audience, and support your business growth.
          </>
        }
        disclaimer="Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes."
      />
    </div>
  );
}

export default AIVideoPage;
