import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
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
  FaqAccordionSection,
  PageSeo,
  ProcessRoadmapSection,
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
  badgeBg: string;
}

const SHOWCASE_EXAMPLES: ShowcaseExample[] = [
  {
    label: 'Bakery',
    prompt: 'What’s the best cake shop in Chennai for a custom birthday cake?',
    brand: 'CakeSquare',
    answer:
      'CakeSquare is one option to compare. It offers custom birthday cakes in Chennai. Check the design, delivery area, and lead time before ordering.',
    source: 'CakeSquare FAQ',
    sourceUrl: 'https://cakesquare.com/faq/',
    headline: 'Custom Birthday Cakes in Chennai',
    copy: 'Explore themed cakes for kids and adults. Choose a design and check delivery for your area.',
    cta: 'Browse cake designs',
    url: 'https://cakesquare.com/order-customised-designer-cakes/',
    badgeBg: 'from-rose-500 to-orange-500',
  },
  {
    label: 'Interiors',
    prompt: 'Which Chennai interior design studios can plan a 3BHK renovation under ₹15 lakh?',
    brand: 'Line & Loom Interiors',
    answer:
      'Compare quotes for the same rooms, materials, and installation scope. Check recent 3BHK projects and ask which items are excluded.',
    source: 'Example source · 3BHK pricing and projects',
    headline: 'Plan Your Chennai 3BHK Interiors',
    copy: 'Share your floor plan to discuss room-by-room scope, finishes, and a budget range.',
    cta: 'Request a design consultation',
    badgeBg: 'from-emerald-500 to-teal-600',
  },
  {
    label: 'Wedding venue',
    prompt: 'What wedding venues near ECR can host 250 guests with an indoor backup?',
    brand: 'Tideglass Pavilion',
    answer:
      'Shortlist venues with a published 250-guest layout, a covered backup space, and clear catering and parking terms. Confirm availability for your date.',
    source: 'Example source · Venue capacity and FAQs',
    headline: 'Tour an ECR Wedding Venue',
    copy: 'See sample seating plans, explore the indoor backup, and ask about dates for your wedding.',
    cta: 'Book a venue tour',
    badgeBg: 'from-purple-500 to-indigo-600',
  },
  {
    label: 'B2B software',
    prompt: 'What payroll software should a 100-person company in India shortlist?',
    brand: 'Rosterlane Payroll',
    answer:
      'Compare products on payroll approvals, integrations, reporting, and the time needed to migrate your existing data. Ask for a demo using your headcount.',
    source: 'Example source · Product and integration pages',
    headline: 'Payroll for Growing India Teams',
    copy: 'See payroll approvals, employee self-service, and reporting in a product walkthrough.',
    cta: 'Book a payroll demo',
    badgeBg: 'from-sky-500 to-blue-600',
  },
];

type ServiceFocusKey = 'visibility' | 'business' | 'traffic' | 'premium' | 'ads';

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
    title: 'ChatGPT Traffic',
    items: [
      'Set up reporting for identifiable ChatGPT referral traffic',
      'Test call, WhatsApp, and booking events',
      'Review qualified inquiries and bookings with your team',
    ],
  },
  premium: {
    title: 'AI Visibility Premium',
    items: [
      'Benchmark priority questions across ChatGPT, Claude, Gemini, and Perplexity where applicable',
      'Review competitor mentions and cited sources',
      'Improve priority pages and measure identifiable AI referrals',
    ],
  },
  ads: {
    title: 'ChatGPT Ads Add-on',
    items: [
      'Check account, category, and market eligibility',
      'Plan one offer, landing page, and conversion goal',
      'Set a spend cap and report cost per qualified lead',
    ],
  },
};

const PACKAGE_TITLES: Record<'visibility' | 'premium' | 'ads', string> = {
  visibility: 'ChatGPT Visibility',
  premium: 'AI Visibility Premium',
  ads: 'ChatGPT Ads Add-on',
};

const FOCUS_TITLES: Record<ServiceFocusKey, string> = {
  visibility: SERVICE_DETAILS.visibility.title,
  business: SERVICE_DETAILS.business.title,
  traffic: SERVICE_DETAILS.traffic.title,
  premium: PACKAGE_TITLES.premium,
  ads: PACKAGE_TITLES.ads,
};

const CORE_SERVICES = [
  {
    id: 'visibility',
    focus: 'visibility' as ServiceFocusKey,
    icon: Search,
    title: 'ChatGPT Visibility',
    description:
      'Test real buyer questions, identify which sources are cited, and improve the pages that answer high-intent commercial queries.',
    cta: 'Explore visibility services',
  },
  {
    id: 'business',
    focus: 'business' as ServiceFocusKey,
    icon: Store,
    title: 'ChatGPT Local Business',
    description:
      'Check whether you can claim a Business Hub listing and improve the public information buyers find about your location.',
    cta: 'Explore claiming & optimization',
  },
  {
    id: 'traffic',
    focus: 'traffic' as ServiceFocusKey,
    icon: TrendingUp,
    title: 'ChatGPT Traffic',
    description:
      'Track identifiable ChatGPT referrals and measure the phone calls, WhatsApp clicks, and bookings your site generates.',
    cta: 'Explore traffic measurement',
  },
  {
    id: 'ai-search',
    focus: 'premium' as ServiceFocusKey,
    icon: Globe,
    title: 'Multi-Platform AI Visibility',
    description:
      'Compare how ChatGPT, Claude, Gemini, and Perplexity answer buyer questions and strengthen the content they cite.',
    cta: 'Explore multi-platform visibility',
  },
];

interface PackageCardItem {
  id: string;
  focus: 'visibility' | 'premium' | 'ads';
  title: string;
  badge?: string;
  highlighted?: boolean;
  fit: string;
  price: string;
  priceNote: string;
  summaryRows: { label: string; value: string }[];
  bullets: string[];
  workDetails: { label: string; text: string }[];
  ctaLabel: string;
}

const PACKAGES: PackageCardItem[] = [
  {
    id: 'pkg-visibility',
    focus: 'visibility',
    title: 'ChatGPT Visibility',
    fit: 'For one business focused on one priority market.',
    price: '₹9,900',
    priceNote: 'per month · 3-month minimum',
    summaryRows: [{ label: '3-month service fee', value: '₹29,700' }],
    bullets: [
      'Baseline and monthly checks across 10 to 15 buyer queries',
      'Local business audit and Business Hub eligibility check for one location',
      'One priority service or location page improvement per month',
      'Monthly report on mentions, referrals, and measurable enquiries',
    ],
    workDetails: [
      {
        label: 'Setup',
        text: 'Record starting answers and sources for 10 to 15 ChatGPT buyer queries. Check one location’s public business details, website crawl access, and Business Hub eligibility. Guide the owner through claiming where eligible.',
      },
      {
        label: 'Each month',
        text: 'Improve one service or location page, correct agreed business details on properties you control, and rerun the query set.',
      },
      {
        label: 'Reporting',
        text: 'Share mentions, citations, identifiable referral traffic, and measured enquiries where tracking is available.',
      },
    ],
    ctaLabel: 'Request ChatGPT Visibility',
  },
  {
    id: 'pkg-premium',
    focus: 'premium',
    title: 'AI Visibility Premium',
    badge: 'Most Popular',
    highlighted: true,
    fit: 'For brands comparing how they appear across AI search platforms.',
    price: '₹19,900',
    priceNote: 'per month · 3-month minimum',
    summaryRows: [{ label: '3-month service fee', value: '₹59,700' }],
    bullets: [
      'Includes all local business & Business Hub work in ChatGPT Visibility',
      'Benchmark ChatGPT, Claude, Gemini, and Perplexity where applicable',
      'Compare competitor mentions, cited sources, and inaccurate business details',
      'Improve up to two priority pages per month',
      'Monthly visibility and identifiable referral report by platform',
    ],
    workDetails: [
      {
        label: 'Setup',
        text: 'Run the ChatGPT Visibility setup, then benchmark priority questions across the relevant AI platforms. Map competitor mentions and the sources each platform uses.',
      },
      {
        label: 'Each month',
        text: 'Improve up to two priority pages in total, address inaccurate business details, and rerun the priority questions.',
      },
      {
        label: 'Reporting',
        text: 'Compare sampled mentions, citations, and identifiable referral traffic by platform, with clear next actions.',
      },
    ],
    ctaLabel: 'Request AI Visibility Premium',
  },
  {
    id: 'chatgpt-ads',
    focus: 'ads',
    title: 'ChatGPT Ads Add-on',
    badge: 'Paid Pilot',
    fit: 'Optional 90-day paid lead-generation package for eligible businesses.',
    price: '₹12,000',
    priceNote: 'per month · management fee',
    summaryRows: [
      { label: '3-month management fee', value: '₹36,000' },
      { label: '90-day ad budget', value: '₹65,250' },
      { label: 'Planned 90-day total', value: '₹1,01,250' },
    ],
    bullets: [
      'Eligibility check and one campaign for one priority offer',
      'Two launch ad variations, landing-page review, and conversion tracking',
      'Weekly pacing adjustments & cost-per-qualified-lead review with your team',
    ],
    workDetails: [
      {
        label: 'Setup',
        text: 'Confirm eligibility and agree on the offer, audience, budget, and one conversion goal. Review the landing page, prepare two ad variations, and test conversion tracking.',
      },
      {
        label: 'Over 90 days',
        text: 'Manage one campaign for one offer, review performance weekly, and adjust within the agreed budget.',
      },
      {
        label: 'Reporting',
        text: 'Report monthly on spend, clicks, tracked conversions, and cost per qualified lead where lead quality can be confirmed.',
      },
    ],
    ctaLabel: 'Request ChatGPT Ads Add-on',
  },
];

const FIRST_90_DAYS = [
  {
    step: '01',
    title: 'Month 1: Establish the Baseline',
    description:
      'Sample the exact questions your customers ask. Record brand mentions, cited sources, competitor visibility, and available referral data.',
  },
  {
    step: '02',
    title: 'Month 2: Improve Priority Pages',
    description:
      'Correct business details and strengthen your highest-value service or location pages with verified buyer answers and clear next steps.',
  },
  {
    step: '03',
    title: 'Month 3: Review What Changed',
    description:
      'Repeat the prompt checks across AI platforms, compare identifiable referral traffic, and review lead quality with your sales team.',
  },
];

type DialogMode =
  | { type: 'service'; focus: ServiceFocusKey }
  | { type: 'audit'; focus: ServiceFocusKey; isPackage: boolean }
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
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);
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

  const openAuditDialog = (focus: ServiceFocusKey = 'visibility', isPackage = false) => {
    setSelectedFocus(focus);
    setLeadResult(null);
    setHoneypot('');
    auditOpenedAtRef.current = Date.now();
    setDialogMode({ type: 'audit', focus, isPackage });
  };

  const handleAuditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!website.trim() || !market.trim()) return;
    setSubmittingAudit(true);
    try {
      const trimmedContact = contactDetail.trim();
      const isEmail = trimmedContact.includes('@');
      const focusLabel = FOCUS_TITLES[selectedFocus];
      const isPackage = dialogMode?.type === 'audit' && dialogMode.isPackage;

      const result = await submitLeadEnquiry({
        source: isPackage
          ? `ChatGPT Package — ${focusLabel}`
          : `ChatGPT Visibility Audit — ${focusLabel}`,
        email: isEmail ? trimmedContact : undefined,
        phone: !isEmail && trimmedContact ? trimmedContact : undefined,
        website: website.trim(),
        country: market.trim(),
        message: `Requested ${isPackage ? 'package' : 'visibility audit'} for ${focusLabel}.`,
        honeypot,
        formStartedAt: auditOpenedAtRef.current,
      });
      setLeadResult(result);
    } finally {
      setSubmittingAudit(false);
    }
  };

  const buildMailtoHref = (isPackage: boolean) => {
    const title = FOCUS_TITLES[selectedFocus];
    const subject = `${isPackage ? 'EON8 package inquiry: ' : 'EON8 audit inquiry: '}${title}`;
    const body = [
      'Hi EON8,',
      '',
      isPackage
        ? 'I would like to discuss an EON8 package.'
        : 'I would like to discuss an AI visibility audit.',
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

      {/* 1. Hero + Interactive ChatGPT Search & Sponsored Ad Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#040D21] via-[#0B1C42] to-[#0053C6] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#FD5900]/15 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-[#FD5900]" />
              <span>AI Visibility &amp; ChatGPT Ads Agency</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold leading-[1.08] tracking-tight text-white">
              Get Found on <span className="text-[#FD5900]">ChatGPT.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              See what ChatGPT says about your business. Improve the verified information it can
              cite, and track the visits, WhatsApp enquiries, and bookings AI search sends your way.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => openAuditDialog('visibility', false)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-[15px] shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                <span>Request a Visibility Audit</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="#examples"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-[15px] no-underline transition-all"
              >
                <span>See Examples</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-2 text-sm text-slate-300">
              <Link
                to="/chatgpt-ads-agency/blog"
                className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sky-300 hover:text-[#FD5900] font-semibold no-underline transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>AI Search Blog</span>
              </Link>
              <Link
                to="/chatgpt-ads-agency/education"
                className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sky-300 hover:text-[#FD5900] font-semibold no-underline transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>AI Visibility Guide</span>
              </Link>
              <a
                href="#packages"
                className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-slate-200 hover:text-[#FD5900] font-semibold no-underline transition-colors"
              >
                <span>View 90-Day Packages</span>
              </a>
            </div>
          </div>

          {/* Interactive ChatGPT Answer + Sponsored Mock Ad Panel */}
          <div className="lg:col-span-7 min-w-0" id="examples">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-5 shadow-2xl">
              <div className="rounded-2xl bg-card text-foreground border border-border overflow-hidden shadow-xl">
                {/* Panel Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3.5 border-b border-border bg-slate-50 dark:bg-slate-900/70">
                  <span className="text-sm font-heading font-extrabold text-foreground">
                    One search, two ways to be found
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0053C6]/10 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-300 text-xs font-bold">
                    Interactive Illustration
                  </span>
                </div>

                {/* Industry Switcher Pills */}
                <div
                  className="flex flex-wrap items-center gap-2 px-4 sm:px-6 py-3 border-b border-border bg-background"
                  role="group"
                  aria-label="Choose a business example"
                >
                  {SHOWCASE_EXAMPLES.map((item, idx) => {
                    const isSelected = idx === activeCaseIdx;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setActiveCaseIdx(idx)}
                        className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0053C6] text-white border-[#0053C6] shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800/80 text-foreground border-border hover:border-[#0053C6]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Conversation + Sponsored Card */}
                <div className="p-4 sm:p-6 space-y-4" aria-live="polite">
                  {/* Prompt */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Customer asks
                    </span>
                    <div className="rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-border px-4 py-3 text-sm sm:text-[15px] font-semibold text-foreground leading-snug">
                      “{currentCase.prompt}”
                    </div>
                  </div>

                  {/* Organic AI Answer */}
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] dark:bg-emerald-500/10 p-4 space-y-2.5">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>Example organic AI answer</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{currentCase.answer}</p>
                    <div>
                      {currentCase.sourceUrl ? (
                        <a
                          href={currentCase.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[32px] px-3 py-1.5 rounded-full bg-card border border-border text-xs font-bold text-[#0053C6] dark:text-sky-400 hover:border-[#FD5900] no-underline transition-colors"
                        >
                          <span>Source: {currentCase.source}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold text-muted-foreground">
                          {currentCase.source}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sponsored Card */}
                  <div className="rounded-xl border border-[#0053C6]/25 dark:border-sky-500/30 bg-[#0053C6]/[0.04] dark:bg-slate-900/80 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-muted-foreground border-b border-border/70 pb-2">
                      <span className="text-[#FD5900] uppercase tracking-wider">Sponsored</span>
                      <span>Below the answer · Mock ad</span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 min-w-0">
                        <p className="text-xs font-bold text-muted-foreground">
                          {currentCase.brand}
                        </p>
                        <h2 className="text-base sm:text-lg font-heading font-extrabold text-foreground leading-snug">
                          {currentCase.headline}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {currentCase.copy}
                        </p>
                        <div className="pt-1">
                          {currentCase.url ? (
                            <a
                              href={currentCase.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 min-h-[36px] py-1.5 text-xs sm:text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
                            >
                              <span>{currentCase.cta}</span>
                              <ArrowUpRight className="w-4 h-4 shrink-0" />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0053C6] dark:text-sky-400">
                              <span>Example CTA: {currentCase.cta}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        aria-hidden="true"
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${currentCase.badgeBg} text-white font-heading font-black text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-md`}
                      >
                        {getBrandInitials(currentCase.brand)}
                      </div>
                    </div>
                  </div>

                  {/* OpenAI Attribution Footnote */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Simulated answers and ads. Examples other than CakeSquare use fictional brands.
                    Ads may appear below answers for eligible users.{' '}
                    <a
                      href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[28px] py-1 font-semibold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] underline"
                    >
                      See OpenAI’s ad format ↗
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Agency Presence Trust Strip */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 border-y border-border bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 text-sm font-semibold text-foreground">
          <div className="inline-flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#FD5900] shrink-0" />
            <strong className="font-heading font-extrabold">12+ Years in Digital Growth</strong>
          </div>
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-[#0053C6] dark:text-sky-400 shrink-0" />
            <span>Chennai · Bengaluru · Hyderabad · Mumbai</span>
          </div>
          <a
            href={telHref(contact.phone)}
            className="inline-flex items-center gap-2 min-h-[36px] py-1.5 text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] font-bold no-underline transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>Call {contact.phone}</span>
          </a>
        </div>
      </section>

      {/* 3. Services — From Answers to Action */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#0053C6] dark:text-sky-400">
              Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              From AI Answers to Measurable Action
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Start with an honest baseline. Then strengthen the pages, citations, and business
              information buyers rely on across ChatGPT and major AI engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <article
                  key={svc.id}
                  id={svc.id}
                  className="group rounded-2xl bg-card border border-border p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-[#0053C6] dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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

      {/* 4. ChatGPT Local Business Section (Dark AI Navy Surface) */}
      <section
        id="local-business"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#061229] via-[#0B224B] to-[#0F2D66] text-white"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <article className="rounded-2xl bg-white/[0.06] border border-white/15 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FD5900]/20 text-[#FD5900] flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Business Hub Claim Assistance
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Check for an existing listing and available verification options.',
                  'Guide the owner or authorized representative through verification when eligible.',
                  'Help update all supported business information once access is approved.',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl bg-white/[0.06] border border-white/15 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Local Visibility Optimization
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Audit name, address, phone, hours, service areas, and links across your website and key listings.',
                  'Improve priority location or service pages with verified buyer FAQs and direct call, WhatsApp, or booking CTAs.',
                  'Test local buyer prompts monthly and report mentions, cited sources, and identifiable referrals.',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="rounded-2xl bg-white/[0.08] border border-white/15 p-5 sm:p-6 text-sm text-slate-200 leading-relaxed max-w-4xl mx-auto text-center">
            OpenAI currently allows local stores and restaurants to claim only an existing U.S.
            listing. For India-based shops, we focus on local visibility optimization and check
            eligibility separately for other business categories.{' '}
            <a
              href="https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[28px] py-1 font-bold text-sky-300 hover:text-[#FD5900] underline"
            >
              OpenAI eligibility guidance ↗
            </a>
          </div>
        </div>
      </section>

      {/* 5. 90-Day AI Visibility Packages */}
      <section id="packages" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#0053C6] dark:text-sky-400">
              AI Visibility Packages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              Start With 90 Days.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Each package starts with a structured three-month engagement. Review the monthly fee
              and full 90-day commitment transparently before you enquire.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {PACKAGES.map((pkg) => {
              const isExpanded = expandedPkg === pkg.id;
              return (
                <article
                  key={pkg.id}
                  id={pkg.id === 'chatgpt-ads' ? 'chatgpt-ads' : undefined}
                  className={`rounded-2xl bg-card border p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all ${
                    pkg.highlighted
                      ? 'border-[#0053C6] dark:border-sky-500 shadow-xl ring-2 ring-[#0053C6]/15'
                      : 'border-border shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{pkg.fit}</p>
                      </div>
                      {pkg.badge && (
                        <span
                          className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                            pkg.highlighted
                              ? 'bg-[#FD5900] text-white'
                              : 'bg-sky-500/10 text-[#0053C6] dark:text-sky-400'
                          }`}
                        >
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-foreground">
                        {pkg.price}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                        {pkg.priceNote}
                      </p>
                    </div>

                    <dl className="rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-border p-4 space-y-2 text-sm">
                      {pkg.summaryRows.map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-3">
                          <dt className="text-muted-foreground">{row.label}</dt>
                          <dd className="font-heading font-extrabold text-foreground">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="space-y-2.5">
                      {pkg.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Work Scope */}
                    <div className="rounded-xl border border-border bg-background overflow-hidden">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setExpandedPkg(isExpanded ? null : pkg.id)}
                        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-xs sm:text-sm font-bold text-foreground hover:text-[#FD5900] transition-colors cursor-pointer"
                      >
                        <span>See the work included</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#FD5900]' : ''
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-2.5 border-t border-border pt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {pkg.workDetails.map((d) => (
                            <p key={d.label}>
                              <strong className="text-foreground">{d.label}:</strong> {d.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openAuditDialog(pkg.focus, true)}
                    className={`w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer ${
                      pkg.highlighted
                        ? 'bg-[#FD5900] hover:bg-[#e55000] text-white shadow-md shadow-orange-500/25'
                        : 'bg-[#0053C6] hover:bg-[#0044a3] text-white shadow-sm'
                    }`}
                  >
                    <span>{pkg.ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>
                </article>
              );
            })}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
            Proposed pricing, before applicable taxes. The optional ads add-on has a separate
            management fee and media budget. The ChatGPT Ads budget uses the published INR minimum
            of ₹725 per day. Scope and eligibility are confirmed before launch.{' '}
            <a
              href="https://help.openai.com/en/articles/20001210-creating-campaigns-for-chatgpt-ads"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[28px] py-1 font-semibold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] underline"
            >
              OpenAI budget guidance ↗
            </a>
          </p>
        </div>
      </section>

      {/* 6. 90-Day Process Roadmap */}
      <ProcessRoadmapSection
        id="process"
        theme="ai"
        surface="dark"
        badge="How We Work"
        heading="Your First 90 Days With EON8"
        subheading="A structured, transparent operating cadence from initial prompt benchmarking to measurable lead attribution."
        steps={FIRST_90_DAYS}
      />

      {/* 7. Learn About AI Visibility */}
      <section
        aria-label="Learn about AI visibility"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/chatgpt-ads-agency/blog"
            className="group rounded-2xl bg-card border border-border p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#0053C6] transition-all flex items-start gap-5 no-underline"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-[#0053C6] dark:text-sky-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-extrabold text-foreground group-hover:text-[#FD5900] transition-colors">
                EON8 AI Search Blog
              </h3>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                Practical articles on AI search visibility, local discovery, citations, and paid
                ChatGPT placements.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 group-hover:text-[#FD5900] pt-1">
                <span>Read the blog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          <Link
            to="/chatgpt-ads-agency/education"
            className="group rounded-2xl bg-card border border-border p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#FD5900] transition-all flex items-start gap-5 no-underline"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FD5900]/10 text-[#FD5900] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-extrabold text-foreground group-hover:text-[#FD5900] transition-colors">
                AI Visibility Education
              </h3>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                A step-by-step playbook to benchmark how ChatGPT and AI assistants find and describe
                your business.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 group-hover:text-[#FD5900] pt-1">
                <span>Start learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <FaqAccordionSection
        id="faq"
        theme="ai"
        surface="light"
        badge="FAQ"
        heading="What to Expect"
        faqs={[
          {
            question: 'Can you guarantee a ChatGPT recommendation?',
            answer:
              'Search results vary by query and context. We commit to the agreed technical and content improvements and transparently report observed mentions, citations, and identifiable referrals.',
          },
          {
            question: 'Do you work with other AI platforms?',
            answer:
              'Yes. The AI Visibility Premium package benchmarks buyer questions across ChatGPT, Claude, Gemini, and Perplexity where applicable, and prioritizes improvements based on what those checks reveal.',
          },
          {
            question: 'Can you claim my business in ChatGPT?',
            answer: (
              <span>
                We check eligibility and guide the business owner through verification where
                supported. OpenAI currently limits local stores and restaurants to existing U.S.
                listings. Local visibility optimization is available for businesses in India.{' '}
                <a
                  href="https://openai.com/business/businesses-in-chatgpt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] underline"
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
        ]}
      />

      {/* 9. Bottom Consultation Banner */}
      <BottomCtaBanner
        theme="ai"
        heading="What Does ChatGPT Find About Your Business?"
        description="Share your business website and target city or market — our AI visibility specialists will run an initial baseline and walk you through your quick wins."
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
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-card text-foreground border border-border p-6 sm:p-8 shadow-2xl">
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
                  onClick={() => openAuditDialog(dialogMode.focus, false)}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-[15px] transition-all cursor-pointer"
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
                    {dialogMode.isPackage ? 'Request a Package' : 'Request a Visibility Audit'}
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
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
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
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
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
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
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
                      className="w-full rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
                    >
                      {Object.entries(dialogMode.isPackage ? PACKAGE_TITLES : FOCUS_TITLES).map(
                        ([key, title]) => (
                          <option key={key} value={key}>
                            {title}
                          </option>
                        )
                      )}
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
                      className="inline-flex items-center justify-center min-h-[46px] px-4 py-2.5 rounded-xl border border-border bg-background hover:border-[#0053C6] text-foreground font-bold text-sm no-underline transition-colors"
                    >
                      Contact Page
                    </Link>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Or email directly via{' '}
                    <a
                      href={buildMailtoHref(dialogMode.isPackage)}
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
