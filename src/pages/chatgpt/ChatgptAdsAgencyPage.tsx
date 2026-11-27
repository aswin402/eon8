import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Store,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  BottomCtaBanner,
  DiscoveryCallSection,
  FaqAccordionSection,
  PageSeo,
  ProcessRoadmapSection,
  type FaqItem,
  type ProcessStepItem,
} from '@/components/sections';
import { SpamHoneypotField } from '@/components/ui/SpamHoneypotField';
import { submitLeadEnquiry, type LeadSubmissionResult } from '@/lib/leadSubmission';
import { telHref, useSiteSettings } from '@/lib/siteSettings';
import { useFocusTrap } from '@/lib/useFocusTrap';

interface ShowcaseExample {
  label: string;
  prompt: string;
  brand: string;
  answer: string;
  source: string;
  sourceUrl?: string;
  headline: string;
  copy: string;
  cta: string;
  url?: string;
}

const SHOWCASE_EXAMPLES: ShowcaseExample[] = [
  {
    label: 'Bakery',
    prompt: 'Best cake shop in Chennai for a custom birthday cake?',
    brand: 'CakeSquare',
    answer:
      'CakeSquare offers custom birthday cakes in Chennai. Compare designs, delivery coverage, and lead times before ordering.',
    source: 'CakeSquare FAQ',
    sourceUrl: 'https://cakesquare.com/faq/',
    headline: 'Custom Birthday Cakes in Chennai',
    copy: 'Explore themed designs and check delivery for your area.',
    cta: 'Browse designs',
    url: 'https://cakesquare.com/order-customised-designer-cakes/',
  },
  {
    label: 'Interiors',
    prompt: 'Chennai interior studios for a 3BHK renovation under ₹15L?',
    brand: 'Line & Loom Interiors',
    answer:
      'Compare quotes across rooms, materials, and installation scope. Review recent 3BHK handovers and exclusions.',
    source: '3BHK pricing & projects',
    headline: 'Plan Your Chennai 3BHK Interiors',
    copy: 'Share your floor plan for room-by-room scope and estimates.',
    cta: 'Book consultation',
  },
  {
    label: 'Wedding',
    prompt: 'Wedding venues near ECR for 250 guests with indoor backup?',
    brand: 'Tideglass Pavilion',
    answer:
      'Shortlist venues with a published 250-guest layout, covered backup hall, and clear catering and parking terms.',
    source: 'Venue capacity & FAQs',
    headline: 'Tour an ECR Wedding Venue',
    copy: 'Review seating layouts, indoor backup spaces, and date availability.',
    cta: 'Book a tour',
  },
  {
    label: 'B2B SaaS',
    prompt: 'Payroll software for a 100-person company in India?',
    brand: 'Rosterlane Payroll',
    answer:
      'Compare products on payroll approvals, compliance filings, integrations, and migration effort for your headcount.',
    source: 'Product & integrations',
    headline: 'Payroll for Growing India Teams',
    copy: 'Walk through approvals, employee self-service, and reporting.',
    cta: 'Book a demo',
  },
];

type ServiceFocusKey = 'visibility' | 'business' | 'traffic' | 'multi-platform' | 'ads';

interface ServiceDetail {
  title: string;
  items: string[];
}

const SERVICE_DETAILS: Record<ServiceFocusKey, ServiceDetail> = {
  visibility: {
    title: 'ChatGPT Visibility',
    items: [
      'Baseline for 10 to 15 real buyer queries',
      'Competitor and citation review',
      'Search crawler access and priority page review',
      'Repeat checks after agreed content improvements',
    ],
  },
  business: {
    title: 'ChatGPT Local Business',
    items: [
      'Check Business Hub listing eligibility and guide authorized owners where supported',
      'Review business details across the website and relevant listings',
      'Improve a priority location or service page and track local buyer queries',
    ],
  },
  traffic: {
    title: 'ChatGPT Traffic & Attribution',
    items: [
      'Set up reporting for identifiable ChatGPT referral traffic',
      'Test call, WhatsApp, and booking events',
      'Review qualified inquiries and bookings with your team',
    ],
  },
  'multi-platform': {
    title: 'Multi-Platform AI Visibility',
    items: [
      'Benchmark priority questions across ChatGPT, Claude, Gemini, and Perplexity where applicable',
      'Review competitor mentions and cited sources',
      'Improve priority pages and measure identifiable AI referrals',
    ],
  },
  ads: {
    title: 'ChatGPT Ads Campaigns',
    items: [
      'Check account, category, and market eligibility',
      'Plan one priority offer, landing page, and conversion goal',
      'Set a spend cap and report cost per qualified lead',
    ],
  },
};

const FOCUS_TITLES: Record<ServiceFocusKey, string> = {
  visibility: SERVICE_DETAILS.visibility.title,
  business: SERVICE_DETAILS.business.title,
  traffic: SERVICE_DETAILS.traffic.title,
  'multi-platform': SERVICE_DETAILS['multi-platform'].title,
  ads: SERVICE_DETAILS.ads.title,
};

const CORE_SERVICES = [
  {
    id: 'visibility',
    focus: 'visibility' as ServiceFocusKey,
    icon: Search,
    badge: 'AEO / GEO',
    title: 'ChatGPT Visibility',
    description:
      'Test real buyer questions, identify which sources are cited, and improve the pages that answer high-intent commercial queries.',
    cta: 'Explore visibility services',
  },
  {
    id: 'business',
    focus: 'business' as ServiceFocusKey,
    icon: Store,
    badge: 'Local AI',
    title: 'ChatGPT Local Business',
    description:
      'Check whether you can claim a Business Hub listing and improve the public information buyers find about your location.',
    cta: 'Explore claiming & optimization',
  },
  {
    id: 'traffic',
    focus: 'traffic' as ServiceFocusKey,
    icon: TrendingUp,
    badge: 'Attribution',
    title: 'ChatGPT Traffic',
    description:
      'Track identifiable ChatGPT referrals and measure the phone calls, WhatsApp clicks, and bookings your site generates.',
    cta: 'Explore traffic measurement',
  },
  {
    id: 'ai-search',
    focus: 'multi-platform' as ServiceFocusKey,
    icon: Globe,
    badge: 'Multi-Engine',
    title: 'Multi-Platform AI Visibility',
    description:
      'Compare how ChatGPT, Claude, Gemini, and Perplexity answer buyer questions and strengthen the content they cite.',
    cta: 'Explore multi-platform visibility',
  },
];

const FIRST_90_DAYS: ProcessStepItem[] = [
  {
    step: '01',
    icon: Search,
    title: 'Month 1: Establish the Baseline',
    description:
      'Sample the exact questions your customers ask. Record brand mentions, cited sources, competitor visibility, and available referral data.',
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'Month 2: Improve Priority Pages',
    description:
      'Correct business details and strengthen your highest-value service or location pages with verified buyer answers and clear next steps.',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'Month 3: Review What Changed',
    description:
      'Repeat the prompt checks across AI platforms, compare identifiable referral traffic, and review lead quality with your sales team.',
  },
];

const CHATGPT_FAQS: FaqItem[] = [
  {
    question: 'Can you guarantee a ChatGPT recommendation?',
    answer:
      'Search results vary by query and context. We commit to the agreed technical and content improvements and transparently report observed mentions, citations, and identifiable referrals.',
  },
  {
    question: 'Do you work with other AI platforms?',
    answer:
      'Yes. Our multi-platform AI visibility programs benchmark buyer questions across ChatGPT, Claude, Gemini, and Perplexity where applicable, and prioritize improvements based on what those checks reveal.',
  },
  {
    question: 'Can you claim my business in ChatGPT?',
    answer: (
      <span>
        We check eligibility and guide the business owner through verification where supported.
        OpenAI currently limits local stores and restaurants to existing U.S. listings. Local
        visibility optimization is available for businesses in India.{' '}
        <a
          href="https://openai.com/business/businesses-in-chatgpt/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cyan-300 hover:text-[#FD5900] underline"
        >
          OpenAI Business Hub information ↗
        </a>
      </span>
    ),
  },
  {
    question: 'Are ChatGPT Ads the same as organic visibility?',
    answer:
      'ChatGPT Ads are paid placements below AI answers. Organic visibility work improves the public information AI search can retrieve and cite. We measure the two separately and confirm campaign eligibility before proposing a paid test.',
  },
  {
    question: 'What can you measure?',
    answer:
      'We track sampled mentions and citations, identifiable referral sessions, and conversion actions such as phone calls, WhatsApp clicks, or booking submissions — then reconcile qualified leads with your sales team.',
  },
];

type DialogMode =
  | { type: 'service'; focus: ServiceFocusKey }
  | { type: 'audit'; focus: ServiceFocusKey }
  | null;

function getBrandInitials(brand: string): string {
  return brand
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .filter((char) => char && char !== '&')
    .join('');
}

export function ChatgptAdsAgencyPage() {
  const { contact } = useSiteSettings();
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [contactDetail, setContactDetail] = useState('');
  const [website, setWebsite] = useState('');
  const [market, setMarket] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<ServiceFocusKey>('visibility');
  const [honeypot, setHoneypot] = useState('');
  const auditOpenedAtRef = useRef<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(Boolean(dialogMode), dialogRef);
  const [submittingAudit, setSubmittingAudit] = useState(false);
  const [leadResult, setLeadResult] = useState<LeadSubmissionResult | null>(null);

  useEffect(() => {
    if (!dialogMode) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDialogMode(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialogMode]);

  const currentCase = SHOWCASE_EXAMPLES[activeCaseIdx];

  const openServiceDialog = (focus: ServiceFocusKey) => {
    setSelectedFocus(focus);
    setLeadResult(null);
    setDialogMode({ type: 'service', focus });
  };

  const openAuditDialog = (focus: ServiceFocusKey = 'visibility') => {
    setSelectedFocus(focus);
    setLeadResult(null);
    setHoneypot('');
    auditOpenedAtRef.current = Date.now();
    setDialogMode({ type: 'audit', focus });
  };

  const handleAuditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!website.trim() || !market.trim()) return;
    setSubmittingAudit(true);
    try {
      const trimmedContact = contactDetail.trim();
      const isEmail = trimmedContact.includes('@');
      const focusLabel = FOCUS_TITLES[selectedFocus];

      const result = await submitLeadEnquiry({
        source: `ChatGPT Visibility Audit — ${focusLabel}`,
        email: isEmail ? trimmedContact : undefined,
        phone: !isEmail && trimmedContact ? trimmedContact : undefined,
        website: website.trim(),
        country: market.trim(),
        message: `Requested visibility audit for ${focusLabel}.`,
        honeypot,
        formStartedAt: auditOpenedAtRef.current,
      });
      setLeadResult(result);
    } finally {
      setSubmittingAudit(false);
    }
  };

  const buildMailtoHref = () => {
    const title = FOCUS_TITLES[selectedFocus];
    const subject = `EON8 AI visibility audit inquiry: ${title}`;
    const body = [
      'Hi EON8,',
      '',
      'I would like to discuss an AI visibility & ChatGPT Ads audit.',
      `Business website: ${website}`,
      `Target market: ${market}`,
      `Focus: ${title}`,
    ].join('\n');
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="ChatGPT Ads Agency in India | EON8"
        description="EON8 is a ChatGPT Ads agency in India. We set up, run and optimise ChatGPT ads with AEO/GEO so your brand shows up in AI answers and ads."
        canonicalPath="/chatgpt-ads-agency"
      />

      {/* 1. Clean Editorial EON8 Hero + Compact Interactive ChatGPT Preview */}
      <section className="bg-gradient-to-br from-[#071124] via-[#0b1933] to-[#0f2247] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              ChatGPT Ads &amp; AI Search Agency
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold leading-[1.08] tracking-tight text-white">
              Get Found on ChatGPT<span className="text-[#FD5900]">.</span>
            </h1>

            <p className="text-[15.5px] sm:text-base text-slate-300 leading-relaxed max-w-xl">
              See what ChatGPT says about your business today. Strengthen the verified pages it
              cites, and turn high-intent AI search into measurable calls, WhatsApp enquiries, and
              bookings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openAuditDialog('visibility')}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-[15px] transition-colors cursor-pointer"
              >
                <span>Request a Visibility Audit</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-semibold text-sm sm:text-[15px] no-underline transition-colors"
              >
                <span>How It Works</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-5 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-sm font-heading font-bold text-white">AEO &amp; GEO</p>
                <p className="text-xs text-slate-400 mt-0.5">Organic AI citations</p>
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-white">Local Discovery</p>
                <p className="text-xs text-slate-400 mt-0.5">Verified business facts</p>
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-white">ChatGPT Ads</p>
                <p className="text-xs text-slate-400 mt-0.5">Tracked enquiries</p>
              </div>
            </div>
          </div>

          {/* Right Compact Monochrome Preview Card */}
          <div className="lg:col-span-6 min-w-0" id="examples">
            <div className="rounded-2xl bg-card text-foreground border border-white/15 dark:border-border shadow-2xl overflow-hidden">
              {/* Compact Segmented Switcher Bar */}
              <div
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-border bg-slate-50 dark:bg-slate-900/70"
                role="group"
                aria-label="Choose a business example"
              >
                <div className="flex flex-wrap items-center gap-1">
                  {SHOWCASE_EXAMPLES.map((item, idx) => {
                    const isSelected = idx === activeCaseIdx;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setActiveCaseIdx(idx)}
                        className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                            : 'text-muted-foreground hover:text-foreground hover:bg-slate-200/60 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground hidden sm:inline">
                  Simulated preview
                </span>
              </div>

              {/* Compact Conversation + Sponsored Placement */}
              <div className="p-4 space-y-3" aria-live="polite">
                {/* Query Strip */}
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-border/80 px-3.5 py-2.5">
                  <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-[13px] font-semibold text-foreground leading-snug">
                    “{currentCase.prompt}”
                  </p>
                </div>

                {/* Organic Citation Block (Neutral Surface) */}
                <div className="rounded-xl border border-border/80 bg-background px-3.5 py-3 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Organic Answer
                    </span>
                    {currentCase.sourceUrl ? (
                      <a
                        href={currentCase.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 min-h-[28px] py-0.5 text-[11.5px] font-semibold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline transition-colors"
                      >
                        <span>{currentCase.source}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-[11.5px] font-medium text-muted-foreground">
                        {currentCase.source}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {currentCase.answer}
                  </p>
                </div>

                {/* Sponsored Placement Block (Neutral + Single Accent) */}
                <div className="rounded-xl border border-border bg-slate-50/75 dark:bg-slate-900/50 px-3.5 py-3">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground mb-2">
                    <span className="font-semibold uppercase tracking-wider text-foreground/80">
                      Sponsored
                    </span>
                    <span>Below the answer</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        aria-hidden="true"
                        className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0"
                      >
                        {getBrandInitials(currentCase.brand)}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-[13.5px] font-heading font-bold text-foreground leading-snug sm:truncate">
                          {currentCase.headline}
                        </h2>
                        <p className="text-xs text-muted-foreground leading-snug line-clamp-1">
                          {currentCase.copy}
                        </p>
                      </div>
                    </div>

                    {currentCase.url ? (
                      <a
                        href={currentCase.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 min-h-[36px] px-3 py-1.5 rounded-lg border border-border bg-card hover:border-[#FD5900] text-xs font-semibold text-foreground hover:text-[#FD5900] no-underline shrink-0 self-start sm:self-auto transition-colors"
                      >
                        <span>{currentCase.cta}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground shrink-0 self-start sm:self-auto">
                        {currentCase.cta}
                      </span>
                    )}
                  </div>
                </div>

                {/* Minimal 1-Line Attribution */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11.5px] text-muted-foreground">
                  <span>Simulated example · Fictional brands except CakeSquare</span>
                  <a
                    href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[28px] py-0.5 font-medium text-foreground/80 hover:text-[#FD5900] underline"
                  >
                    OpenAI ad format ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Agency Presence & Quick Resources Strip */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 border-y border-border bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-x-6 gap-y-2 text-sm font-semibold text-foreground">
          <div className="inline-flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#FD5900] shrink-0" />
            <strong className="font-heading font-extrabold">12+ Years in Digital Growth</strong>
          </div>

          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-[#0053C6] dark:text-sky-400 shrink-0" />
            <span>{contact.address}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <Link
              to="/chatgpt-ads-agency/blog"
              className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] font-bold no-underline transition-colors"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>AI Search Blog</span>
            </Link>
            <Link
              to="/chatgpt-ads-agency/education"
              className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] font-bold no-underline transition-colors"
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>AI Visibility Guide</span>
            </Link>
            <a
              href={telHref(contact.phone)}
              className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-foreground hover:text-[#FD5900] font-bold no-underline transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FD5900] shrink-0" />
              <span>Call {contact.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Core Services — EON8 Feature Grid Language */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#0053C6] dark:text-sky-400">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              From AI Answers to Measurable Action
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Start with an honest baseline. Then strengthen the pages, citations, and business
              information buyers rely on across ChatGPT and major AI engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {CORE_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <article
                  key={svc.id}
                  id={svc.id}
                  className="group rounded-2xl bg-card border border-border p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0053C6]/10 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {svc.badge}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <button
                      type="button"
                      onClick={() => openServiceDialog(svc.focus)}
                      className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 group-hover:text-[#FD5900] transition-colors cursor-pointer"
                    >
                      <span>{svc.cta}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ChatGPT Local Business Section (EON8 Dark AI Surface) */}
      <section
        id="local-business"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#060d1f] via-[#0e1b38] to-[#131c3b] text-white"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
              ChatGPT Local Business
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              Claim &amp; Optimize Your Business Presence
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We verify listing eligibility and align the public business facts buyers and AI
              assistants use to evaluate your company.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            <article className="rounded-2xl bg-white/[0.06] border border-white/12 hover:border-white/25 transition-colors p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#FD5900]/20 text-[#FD5900] flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                  Business Hub Claim Assistance
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Check for an existing listing and available verification options.',
                  'Guide the owner or authorized representative through verification when eligible.',
                  'Help update all supported business information once access is approved.',
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-200 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl bg-white/[0.06] border border-white/12 hover:border-white/25 transition-colors p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                  Local Visibility Optimization
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Audit name, address, phone, hours, service areas, and links across your website and key listings.',
                  'Improve priority location or service pages with verified buyer FAQs and direct call, WhatsApp, or booking CTAs.',
                  'Test local buyer prompts monthly and report mentions, cited sources, and identifiable referrals.',
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-200 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-5 sm:p-6 text-sm text-slate-200 leading-relaxed max-w-4xl mx-auto text-center">
            OpenAI currently allows local stores and restaurants to claim only an existing U.S.
            listing. For India-based shops, we focus on local visibility optimization and check
            eligibility separately for other business categories.{' '}
            <a
              href="https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[28px] py-1 font-bold text-cyan-300 hover:text-[#FD5900] underline"
            >
              OpenAI eligibility guidance ↗
            </a>
          </div>
        </div>
      </section>

      {/* 5. 90-Day Process Roadmap (EON8 Shared Section) */}
      <ProcessRoadmapSection
        id="process"
        theme="ai"
        surface="muted"
        badge="How We Work"
        heading="Your First 90 Days With EON8"
        subheading="A structured, transparent operating cadence from initial prompt benchmarking to measurable lead attribution."
        steps={FIRST_90_DAYS}
        bottomActions={[
          { label: 'Request a Visibility Audit', opensModal: true, variant: 'primary' },
        ]}
        onCustomModal={() => openAuditDialog('visibility')}
      />

      {/* 6. Learn About AI Visibility (EON8 Knowledge Hub) */}
      <section
        aria-label="Learn about AI visibility"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#0053C6] dark:text-sky-400">
              Resources &amp; Playbooks
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              Learn How AI Search Finds Your Business
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Explore practical guides written by EON8 strategists on citations, local discovery,
              and paid ChatGPT placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            <Link
              to="/chatgpt-ads-agency/blog"
              className="group rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#0053C6]/50 dark:hover:border-sky-400/50 hover:-translate-y-1 transition-all flex items-start gap-5 no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0053C6]/10 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2.5">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#FD5900]">
                  Articles &amp; Briefings
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-foreground group-hover:text-[#FD5900] transition-colors">
                  EON8 AI Search Blog
                </h3>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  Practical articles on AI search visibility, local discovery, citations, and paid
                  ChatGPT placements.
                </p>
                <span className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 group-hover:text-[#FD5900]">
                  <span>Read the blog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link
              to="/chatgpt-ads-agency/education"
              className="group rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#FD5900]/50 hover:-translate-y-1 transition-all flex items-start gap-5 no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FD5900]/10 text-[#FD5900] flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-2.5">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#0053C6] dark:text-sky-400">
                  Step-by-Step Guide
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-foreground group-hover:text-[#FD5900] transition-colors">
                  AI Visibility Education
                </h3>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  A step-by-step playbook to benchmark how ChatGPT and AI assistants find and
                  describe your business.
                </p>
                <span className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 group-hover:text-[#FD5900]">
                  <span>Start learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion (EON8 Dark AI Surface) */}
      <FaqAccordionSection
        id="faq"
        theme="ai"
        surface="dark"
        badge="FAQ"
        heading="What to Expect"
        faqs={CHATGPT_FAQS}
      />

      {/* 8. Strategy Call Booking (matches AIAgentPage & AIVideoPage) */}
      <DiscoveryCallSection
        theme="ai"
        badge="Free Strategy Session"
        heading="Book a Free ChatGPT Visibility Consultation"
        subheading="Pick a preferred day and time slot to review how AI engines cite your brand and map your next steps."
        callTitle="30-Min ChatGPT Ads & AI Visibility Call"
        callDescription="One-on-one session covering buyer query benchmarks, citation gaps, local eligibility, and custom campaign strategy."
      />

      {/* 9. Bottom Consultation Banner (EON8 Shared Section) */}
      <BottomCtaBanner
        theme="ai"
        heading="What Does ChatGPT Find About Your Business?"
        description={
          <>
            Share your business website and target city or market — partner with{' '}
            <Link to="/" className="text-[#FD5900] font-bold underline">
              EON8
            </Link>{' '}
            for an initial AI visibility baseline and actionable roadmap to capture qualified leads.
          </>
        }
        formHeading="Request AI Visibility Audit"
        submitLabel="Request Free Audit"
        disclaimer="Independent agency · ChatGPT is a product of OpenAI. EON8 is not affiliated with or endorsed by OpenAI."
      />

      {/* 10. Accessible Service & Audit Modal Dialog */}
      {dialogMode && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatgpt-dialog-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogMode(null);
          }}
        >
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl bg-card text-foreground border border-border p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setDialogMode(null)}
              className="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {dialogMode.type === 'service' ? (
              <div className="space-y-5">
                <div className="space-y-1.5 pr-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                    Service Scope
                  </span>
                  <h2
                    id="chatgpt-dialog-title"
                    className="text-2xl font-heading font-extrabold text-foreground"
                  >
                    {SERVICE_DETAILS[dialogMode.focus].title}
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {SERVICE_DETAILS[dialogMode.focus].items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm sm:text-[15px] text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openAuditDialog(dialogMode.focus)}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-[15px] shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <span>Request an Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1 pr-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                    AI Visibility Desk
                  </span>
                  <h2
                    id="chatgpt-dialog-title"
                    className="text-2xl font-heading font-extrabold text-foreground"
                  >
                    Request a Visibility Audit
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Share your website and target market — we’ll prepare your baseline brief.
                  </p>
                </div>

                <form onSubmit={(e) => void handleAuditSubmit(e)} className="relative space-y-4">
                  <SpamHoneypotField id="chatgpt-audit-fax" value={honeypot} onChange={setHoneypot} />
                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Your Email or WhatsApp Number *
                    </span>
                    <input
                      name="contact"
                      required
                      maxLength={160}
                      placeholder="you@company.com or +91 98765 43210"
                      value={contactDetail}
                      onChange={(e) => setContactDetail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6] dark:focus:ring-sky-400"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Business Website *
                    </span>
                    <input
                      name="website"
                      required
                      maxLength={200}
                      placeholder="example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6] dark:focus:ring-sky-400"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Target Market *
                    </span>
                    <input
                      name="market"
                      required
                      maxLength={160}
                      placeholder="Chennai, India"
                      value={market}
                      onChange={(e) => setMarket(e.target.value)}
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6] dark:focus:ring-sky-400"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      What Do You Want to Improve?
                    </span>
                    <select
                      name="focus"
                      value={selectedFocus}
                      onChange={(e) => setSelectedFocus(e.target.value as ServiceFocusKey)}
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6] dark:focus:ring-sky-400"
                    >
                      {Object.entries(FOCUS_TITLES).map(([key, title]) => (
                        <option key={key} value={key}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={submittingAudit}
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm transition-all cursor-pointer disabled:opacity-60"
                    >
                      <span>{submittingAudit ? 'Submitting…' : 'Submit Inquiry'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <Link
                      to="/contact"
                      onClick={() => setDialogMode(null)}
                      className="inline-flex items-center justify-center min-h-[46px] px-4 py-2.5 rounded-xl border border-border bg-background hover:border-[#0053C6] dark:hover:border-sky-400 text-foreground font-bold text-sm no-underline transition-colors"
                    >
                      Contact Page
                    </Link>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Or email directly via{' '}
                    <a
                      href={buildMailtoHref()}
                      className="inline-flex items-center min-h-[28px] py-1 font-semibold text-[#0053C6] dark:text-sky-400 underline"
                    >
                      {contact.email}
                    </a>
                    .
                  </p>

                  {leadResult && (
                    <div
                      role="status"
                      className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3 text-sm"
                    >
                      <p className="font-medium text-foreground">
                        {leadResult.deliveredToWebhook
                          ? `Thank you! Your AI visibility inquiry for ${website} (${FOCUS_TITLES[selectedFocus]}) has been delivered to EON8.`
                          : `Inquiry prepared for ${website} (${FOCUS_TITLES[selectedFocus]}). Connect instantly via WhatsApp or Email below:`}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={leadResult.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Send on WhatsApp</span>
                        </a>
                        <a
                          href={leadResult.mailtoHref}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold no-underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send via Email</span>
                        </a>
                        <Link
                          to="/thank-you"
                          onClick={() => setDialogMode(null)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-card text-foreground text-xs font-bold no-underline"
                        >
                          <span>Confirmation Page</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatgptAdsAgencyPage;
