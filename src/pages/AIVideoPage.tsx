import { useState, useEffect, useRef, type CSSProperties, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  Clock,
  Crosshair,
  FileText,
  Headphones,
  Lightbulb,
  ListChecks,
  Lock,
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
import { NftCalendlyWidget } from '@/pages/nft/components/NftCalendlyWidget';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/ai-core-blog-pages.css';

const AV_ICON_MAP: Record<string, LucideIcon> = {
  arrow_forward: ArrowRight,
  arrow_back: ArrowLeft,
  arrow_outward: ArrowUpRight,
  auto_awesome: Sparkles,
  movie: Clapperboard,
  play_arrow: Play,
  bolt: Zap,
  savings: PiggyBank,
  palette: Palette,
  edit_square: SquarePen,
  groups: Users,
  group: Users,
  trending_up: TrendingUp,
  open_in_full: Maximize2,
  target: Crosshair,
  devices: MonitorSmartphone,
  checklist: ListChecks,
  description: FileText,
  task_alt: CheckCircle2,
  share: Share2,
  tune: SlidersHorizontal,
  lightbulb: Lightbulb,
  support_agent: Headphones,
  check_circle: CheckCircle2,
  expand_more: ChevronDown,
  schedule: Clock,
  lock: Lock,
};

function AvIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = AV_ICON_MAP[name] || Sparkles;
  return (
    <span aria-hidden="true" className="ms" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}

const EQUALIZER_HEIGHTS = [
  '34%', '58%', '42%', '76%', '50%', '88%', '62%', '40%', '70%', '96%',
  '54%', '36%', '66%', '82%', '46%', '60%', '32%', '72%', '52%', '44%',
];

const WHY_FEATURES = [
  {
    icon: 'bolt',
    title: 'Faster Video Production',
    desc: 'Produce professional video content within shorter timelines using AI-powered production workflows.',
  },
  {
    icon: 'savings',
    title: 'Cost-Effective Content Creation',
    desc: 'Create high-quality business videos while reducing the costs involved in traditional production.',
  },
  {
    icon: 'auto_awesome',
    title: 'Professional Visual Quality',
    desc: 'Use AI-powered visuals, animations, transitions, and storytelling to create engaging content.',
  },
  {
    icon: 'palette',
    title: 'Consistent Brand Messaging',
    desc: 'Maintain a unified visual style and message across your business video content.',
  },
  {
    icon: 'edit_square',
    title: 'Easy Content Updates',
    desc: 'Update business information and video content more efficiently when requirements change.',
  },
  {
    icon: 'groups',
    title: 'Improved Audience Engagement',
    desc: 'Communicate your message through engaging visual experiences designed to capture audience attention.',
  },
  {
    icon: 'trending_up',
    title: 'Better Marketing Performance',
    desc: 'Support marketing campaigns with compelling visual content that encourages engagement and conversions.',
  },
  {
    icon: 'open_in_full',
    title: 'Scalable Video Production',
    desc: 'Produce multiple videos for different campaigns, audiences, and business requirements.',
  },
  {
    icon: 'target',
    title: 'Multiple Business Goals',
    desc: 'Create video content for marketing, branding, training, promotions, social media, and business communication.',
  },
  {
    icon: 'devices',
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

const VIDEO_SLIDES = [
  '/wp-content/uploads/2026/10/1-1.mp4#t=0.5',
  '/wp-content/uploads/2026/10/1-1.mp4#t=0.5',
  '/wp-content/uploads/2026/10/1-1.mp4#t=0.5',
];

const PROCESS_STEPS = [
  {
    icon: 'target',
    title: 'Understanding Your Business',
    desc: 'We understand your business objectives, target audience, and marketing goals so the video aligns with your overall strategy.',
  },
  {
    icon: 'checklist',
    title: 'Content Planning',
    desc: 'We develop a clear content structure that communicates your message in an engaging and easy-to-understand format.',
  },
  {
    icon: 'description',
    title: 'Script Creation',
    desc: 'Our team prepares professional scripts that match your brand voice while delivering valuable information to your audience.',
  },
  {
    icon: 'movie',
    title: 'AI Video Production',
    desc: 'We create visuals, animations, transitions, voiceovers, and engaging video sequences using AI-powered workflows.',
  },
  {
    icon: 'task_alt',
    title: 'Quality Review',
    desc: 'Every video is reviewed for visual consistency, content accuracy, and professional quality before delivery.',
  },
  {
    icon: 'share',
    title: 'Final Delivery',
    desc: 'The completed video is optimized for websites, social media, presentations, digital campaigns, and other business platforms.',
  },
];

const WHY_EON8_CHIPS = [
  { icon: 'tune', label: 'Customized video solutions' },
  { icon: 'group', label: 'Experienced creative professionals' },
  { icon: 'lightbulb', label: 'Business-focused storytelling' },
  { icon: 'movie', label: 'High-quality visual production' },
  { icon: 'description', label: 'Professional script development' },
  { icon: 'bolt', label: 'Quick turnaround time' },
  { icon: 'palette', label: 'Consistent brand communication' },
  { icon: 'trending_up', label: 'Marketing-oriented content' },
  { icon: 'open_in_full', label: 'Scalable production capabilities' },
  { icon: 'support_agent', label: 'Dedicated project support' },
];

const BENEFIT_CARDS = [
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

const AV_FAQS = [
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

export function AIVideoPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'AI Video Creation Services | AI Video Production Company | EON8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Create engaging AI-powered videos for your business with EON8. We deliver high-quality AI video creation services for marketing, promotions, training, and social media.'
      );
    }
  }, []);

  const scrollToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(VIDEO_SLIDES.length - 1, index));
    setActiveSlide(clamped);
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const gap = parseFloat(window.getComputedStyle(track).columnGap || '0') || 24;
    const step = (track.children[0] as HTMLElement).getBoundingClientRect().width + gap;
    track.scrollTo({ left: clamped * step, behavior: 'smooth' });
  };

  const handlePlaySlide = (idx: number) => {
    videoRefs.current.forEach((vid, i) => {
      if (vid && i !== idx && !vid.paused) {
        vid.pause();
      }
    });
    const target = videoRefs.current[idx];
    if (target) {
      setPlayingIdx(idx);
      target.controls = true;
      target.play().catch(() => {});
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || phone.trim().length < 5) {
      setStatus({ type: 'error', text: 'Please enter your name, valid email, and mobile number.' });
      return;
    }
    setStatus({
      type: 'success',
      text: 'Thank you! Our AI Video production team will get back to you shortly.',
    });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="eon8-live-page ai-video-page-scope">
      <div id="site-content">
        <main className="av">
          {/* HERO */}
          <section className="av-sec av-dark av-hero" id="enquiry-top">
            <div className="av-wrap">
              <div className="av-hero-grid">
                <div className="av-hero-copy">
                  <h1>AI Video Creation Services</h1>
                  <p className="lead">Transform Your Ideas into Engaging AI Videos</p>
                  <p className="sub">
                    Turn your ideas into professional AI-generated videos for marketing, promotions, training, and social media. Fast, creative, and customized by EON8.
                  </p>
                  <a className="av-btn" href="#consult-form">
                    Request a Free Quote
                    <AvIcon name="arrow_forward" size={18} />
                  </a>
                </div>
                <div aria-hidden="true" className="av-visual">
                  <div className="av-vbar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="av-chip c1">
                    <AvIcon name="auto_awesome" size={22} />
                  </div>
                  <div className="av-chip c2">
                    <AvIcon name="movie" size={22} />
                  </div>
                  <div className="av-play">
                    <AvIcon name="play_arrow" size={34} />
                  </div>
                  <div className="av-tl">
                    {EQUALIZER_HEIGHTS.map((h, i) => (
                      <span
                        key={i}
                        style={{ '--h': h, '--i': i } as CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHY AI VIDEO */}
          <section className="av-sec av-light">
            <div className="av-wrap">
              <div className="av-split">
                <div className="av-head">
                  <h2>Why Choose AI Video Creation?</h2>
                  <p>
                    Modern businesses need content that is fast, engaging, and adaptable across multiple platforms. AI-powered video creation helps organizations produce high-quality videos with greater speed while maintaining consistency and creativity.
                  </p>
                </div>
                <div className="av-media av-media-why">
                  <img
                    alt="Marketing team reviewing AI-generated video content"
                    className="av-mimg"
                    decoding="async"
                    loading="lazy"
                    src="/wp-content/uploads/2026/06/satisfaction.webp"
                  />
                </div>
              </div>
              <div className="av-feats">
                {WHY_FEATURES.map((feat) => (
                  <div key={feat.title} className="av-feat">
                    <div className="av-ico">
                      <AvIcon name={feat.icon} size={22} />
                    </div>
                    <div>
                      <h3>{feat.title}</h3>
                      <p>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="av-callout">
                AI Video Creation enables businesses to communicate their message more effectively while reducing the time involved in traditional video production.
              </p>
            </div>
          </section>

          {/* SERVICES */}
          <section className="av-sec av-white">
            <div className="av-wrap">
              <div className="av-svc">
                <div className="av-svc-left">
                  <div className="av-head">
                    <h2>Our AI Video Creation Services</h2>
                    <p>
                      From promotional campaigns to employee training, we create AI-powered videos tailored to your business objectives and audience.
                    </p>
                  </div>
                  <div className="av-media av-media-services">
                    <img
                      alt="Video production setup with camera and lighting"
                      className="av-mimg"
                      decoding="async"
                      loading="lazy"
                      src="/wp-content/uploads/2026/10/young-woman-with-white-wig-in-blue-light-2026-09-23-00-17-58-utc-scaled.jpg"
                    />
                  </div>
                </div>
                <div className="av-index">
                  {VIDEO_SERVICES.map((svc) => (
                    <div key={svc.title} className="av-row">
                      <h3>{svc.title}</h3>
                      <p>{svc.desc}</p>
                      <span className="av-arrow">
                        <AvIcon name="arrow_outward" size={20} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* OUR WORK (VIDEO SLIDER) */}
          <section aria-label="Our Work" className="av-sec av-light av-work" id="our-work">
            <div className="av-wrap">
              <div className="av-work-top">
                <div className="av-head">
                  <h2>Our Work</h2>
                  <p>
                    A selection of AI-powered videos we have created for brands across industries.
                  </p>
                </div>
                <div className="av-snav">
                  <button
                    aria-label="Previous video"
                    disabled={activeSlide === 0}
                    type="button"
                    onClick={() => scrollToSlide(activeSlide - 1)}
                  >
                    <AvIcon name="arrow_back" size={20} />
                  </button>
                  <button
                    aria-label="Next video"
                    disabled={activeSlide >= VIDEO_SLIDES.length - 1}
                    type="button"
                    onClick={() => scrollToSlide(activeSlide + 1)}
                  >
                    <AvIcon name="arrow_forward" size={20} />
                  </button>
                </div>
              </div>

              <div>
                <div
                  ref={trackRef}
                  className="av-track"
                  style={{ '--ratio': '16/9' } as CSSProperties}
                >
                  {VIDEO_SLIDES.map((src, idx) => (
                    <div key={idx} className="av-slide">
                      <div className={`av-vid ${playingIdx === idx ? 'playing' : ''}`}>
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          playsInline
                          preload="metadata"
                          src={src}
                          onEnded={() => setPlayingIdx(null)}
                        />
                        <button
                          aria-label={`Play video ${idx + 1}`}
                          className="av-vplay"
                          type="button"
                          onClick={() => handlePlaySlide(idx)}
                        >
                          <span className="ring">
                            <AvIcon name="play_arrow" size={28} />
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div aria-label="Choose video" className="av-dots" role="group">
                  {VIDEO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      aria-current={activeSlide === idx ? 'true' : 'false'}
                      aria-label={`Go to video ${idx + 1}`}
                      className={activeSlide === idx ? 'on' : ''}
                      type="button"
                      onClick={() => scrollToSlide(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="av-sec av-dark">
            <div className="av-wrap">
              <div className="av-head center">
                <h2>Our AI Video Creation Process</h2>
                <p>
                  A structured production process helps us turn your business ideas into clear, engaging, and professional AI-powered videos.
                </p>
              </div>
              <div className="av-steps">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.title} className="av-step">
                    <div className="av-ico">
                      <AvIcon name={step.icon} size={22} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="av-center-cta">
                <a className="av-btn" href="#consult-form">
                  Request a Free Quote
                  <AvIcon name="arrow_forward" size={18} />
                </a>
              </div>
            </div>
          </section>

          {/* WHY EON8 */}
          <section className="av-sec av-light" id="choose-eon8">
            <div className="av-wrap">
              <div className="av-choose">
                <div className="av-choose-left">
                  <div className="av-head">
                    <h2>Why Choose EON8 for AI Video Creation?</h2>
                    <p>
                      We combine creativity, technology, and strategic thinking to create videos that engage audiences and strengthen your brand.
                    </p>
                  </div>
                  <div className="av-media av-media-choose">
                    <img
                      alt="Creative team collaborating on a video project"
                      className="av-mimg"
                      decoding="async"
                      loading="lazy"
                      src="/wp-content/uploads/2026/06/website.webp"
                    />
                  </div>
                </div>
                <ul className="av-chips">
                  {WHY_EON8_CHIPS.map((chip) => (
                    <li key={chip.label}>
                      <AvIcon name={chip.icon} size={20} />
                      <h3>{chip.label}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="av-sec av-white">
            <div className="av-wrap">
              <div className="av-head center">
                <h2>Benefits of AI Video Creation</h2>
                <p>
                  AI-powered video production helps businesses create engaging content faster while maintaining consistency across campaigns and platforms.
                </p>
              </div>
              <div className="av-cards">
                {BENEFIT_CARDS.map((card) => (
                  <div key={card.title} className="av-card">
                    <AvIcon name="check_circle" size={24} />
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section aria-label="FAQ Section" className="av-sec av-dark">
            <div className="av-wrap">
              <div className="av-head center">
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="av-faq">
                {AV_FAQS.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  const qId = `av-q${idx + 1}`;
                  const aId = `av-a${idx + 1}`;
                  return (
                    <div key={item.q} className="av-faq-item">
                      <h3>
                        <button
                          type="button"
                          aria-controls={aId}
                          aria-expanded={isOpen}
                          className="av-faq-q"
                          id={qId}
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        >
                          <span>{item.q}</span>
                          <AvIcon name="expand_more" size={22} />
                        </button>
                      </h3>
                      <div
                        aria-labelledby={qId}
                        className={`av-faq-a ${isOpen ? 'open' : ''}`}
                        id={aId}
                        role="region"
                      >
                        <div>
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CONSULT / CALENDAR */}
          <section className="av-sec av-light">
            <div className="av-wrap">
              <div className="av-consult-head">
                <span className="av-badge">FREE QUOTE</span>
                <h2>
                  Ready to Create <span className="hl">High-Quality AI Videos?</span>
                </h2>
                <p>
                  At EON8, we help businesses transform ideas into engaging AI-powered videos that inspire, educate, and convert.
                </p>
                <ul className="av-trust">
                  <li>
                    <AvIcon name="schedule" size={16} />
                    Fast Production
                  </li>
                  <li>
                    <AvIcon name="check_circle" size={16} />
                    Customized Content
                  </li>
                  <li>
                    <AvIcon name="lock" size={16} />
                    Business-Focused
                  </li>
                </ul>
              </div>
              <div className="av-cal">
                <NftCalendlyWidget
                  callTitle="30-Min AI Video Production Strategy Call"
                  callDescription="Discuss your campaign goals, scripts, visual style, and turnaround timeline with our AI video directors."
                />
              </div>
            </div>
          </section>

          {/* ENQUIRY */}
          <section className="av-sec av-enq" id="enquiry">
            <div className="av-wrap">
              <div className="av-enq-grid">
                <div>
                  <h2>Request a Free Quote</h2>
                  <p className="intro">
                    Ready to create professional AI-powered videos for your business? Partner with{' '}
                    <Link to="/">EON8</Link> to turn your ideas into engaging visual experiences that elevate your brand, engage your audience, and support your business growth.
                  </p>
                  <div className="av-stats">
                    <div className="av-stat">
                      <strong>1250+</strong>
                      <span>Projects Completed</span>
                    </div>
                    <div className="av-stat">
                      <strong>548+</strong>
                      <span>Happy Clients</span>
                    </div>
                    <div className="av-stat">
                      <strong>12+</strong>
                      <span>Years of Experience</span>
                    </div>
                    <div className="av-stat">
                      <strong>250+</strong>
                      <span>Development Experts</span>
                    </div>
                  </div>
                </div>

                <div className="av-form" id="consult-form">
                  <div className="wpcf7">
                    <form className="wpcf7-form" onSubmit={handleFormSubmit} noValidate>
                      <div className="clearfix" id="nft-form">
                        <h3>Reach Out To Us</h3>
                        <div className="form-row">
                          <div className="col-12">
                            <input
                              className="wpcf7-form-control wpcf7-text"
                              name="fname"
                              placeholder="Name*"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="wpcf7-form-control wpcf7-email"
                              name="email"
                              placeholder="Email*"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="wpcf7-form-control wpcf7-tel"
                              name="phone"
                              placeholder="Mobile Number"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12 quiz_cap">
                            <input
                              className="wpcf7-form-control wpcf7-submit"
                              type="submit"
                              value="Submit"
                            />
                          </div>
                        </div>
                        {status && (
                          <div
                            role="status"
                            className={`ai-form-feedback ${
                              status.type === 'success' ? 'is-success' : 'is-error'
                            }`}
                          >
                            {status.text}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DISCLAIMER */}
          <section className="av-disc">
            <div className="av-wrap">
              <p>
                Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AIVideoPage;
