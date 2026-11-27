import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Search,
  Sparkles,
  Store,
  TrendingUp,
} from 'lucide-react';
import {
  BottomCtaBanner,
  DiscoveryCallSection,
  LeadCaptureCard,
  PageSeo,
  ServiceHeroSection,
} from '@/components/sections';

interface ChatgptAdsSubPageProps {
  mode: 'blog' | 'education';
}

const AI_HUB_LINKS = [
  { label: 'ChatGPT Ads Agency Hub', to: '/chatgpt-ads-agency' },
  { label: 'AI Search Visibility Blog', to: '/chatgpt-ads-agency/blog' },
  { label: 'AI Visibility Education Guide', to: '/chatgpt-ads-agency/education' },
  { label: 'AI Agent Development Services', to: '/ai-agent-development-services' },
  { label: 'AI Video Creation Services', to: '/ai-video-creation' },
];

export function ChatgptAdsSubPage({ mode }: ChatgptAdsSubPageProps) {
  const isBlog = mode === 'blog';
  const currentPath = isBlog ? '/chatgpt-ads-agency/blog' : '/chatgpt-ads-agency/education';

  const anchorItems = isBlog
    ? [
        { href: '#buyer-questions', label: '01. Buyer Questions' },
        { href: '#local-discovery', label: '02. Local Discovery' },
        { href: '#organic-and-paid', label: '03. Organic & Paid' },
      ]
    : [
        { href: '#audit', label: 'Lesson 1: Audit' },
        { href: '#improve', label: 'Lesson 2: Improve' },
        { href: '#measure', label: 'Lesson 3: Measure' },
      ];

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title={isBlog ? 'Blog | EON8' : 'AI Visibility Education | EON8'}
        description={
          isBlog
            ? 'Articles on ChatGPT visibility, local business discovery, and ads.'
            : 'Practical lessons on auditing and improving AI visibility.'
        }
        canonicalPath={currentPath}
      />

      {/* 1. EON8 AI Hero */}
      <ServiceHeroSection
        theme="ai"
        layout="centered"
        badge={isBlog ? 'EON8 AI Search Blog' : 'EON8 AI Visibility Education'}
        heading={isBlog ? 'AI Visibility for Business' : 'Learn How AI Finds Your Business'}
        subheading={
          isBlog
            ? 'Citations, Local Discovery & ChatGPT Ads Briefings'
            : 'Step-by-Step Playbook for Founders & Marketing Teams'
        }
        paragraphs={[
          isBlog
            ? 'Practical articles for local businesses, retail brands, and B2B teams navigating ChatGPT answers, citations, and paid placements.'
            : 'A practical guide for founders and marketing teams — start with real buyer questions and work all the way through to measured enquiries.',
        ]}
        bullets={
          isBlog
            ? ['Buyer-Intent Prompts', 'Verified Business Facts', 'Organic vs. Sponsored']
            : ['Baseline Query Audit', 'High-Intent Page Updates', 'Lead Attribution']
        }
        actions={[
          {
            label: 'Back to ChatGPT Ads Hub',
            href: '/chatgpt-ads-agency',
            variant: 'secondary',
          },
          {
            label: isBlog ? 'Open Education Guide' : 'Read AI Search Blog',
            href: isBlog ? '/chatgpt-ads-agency/education' : '/chatgpt-ads-agency/blog',
            variant: 'primary',
          },
        ]}
      />

      {/* 2. Quick Section Navigation Bar */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/chatgpt-ads-agency"
            className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-[#FD5900] no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>ChatGPT Ads Hub</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {anchorItems.map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="inline-flex items-center min-h-[36px] px-3.5 py-1.5 rounded-full bg-card border border-border text-xs sm:text-sm font-bold text-foreground hover:border-[#FD5900] hover:text-[#FD5900] no-underline transition-colors"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EON8 12-Column Editorial Content + Sticky Sidebar (matches BlogPostPage) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Articles / Lessons */}
          <div className="lg:col-span-8 space-y-7">
            {isBlog ? (
              <>
                <article
                  id="buyer-questions"
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-400">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600/10 dark:bg-cyan-500/15 flex items-center justify-center">
                        <Search className="w-4 h-4" />
                      </span>
                      <span>AI Search</span>
                    </span>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      01
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight">
                    What do customers ask ChatGPT before they buy?
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    Start with a real buying decision. A bakery customer might ask for a custom
                    birthday cake in Chennai. Someone renovating a flat may ask for a 3BHK designer
                    within a budget. A payroll buyer might ask which providers support a 100-person
                    team.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Write down the question, the market, the brands mentioned, and the sources
                    cited. Repeat the same questions after you update your pages. That gives you a
                    clear baseline you can compare over time.
                  </p>

                  <div className="pt-4 border-t border-border/60">
                    <Link
                      to="/chatgpt-ads-agency#examples"
                      className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-[#FD5900] no-underline transition-colors"
                    >
                      <span>See four worked examples</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </article>

                <article
                  id="local-discovery"
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FD5900]">
                      <span className="w-8 h-8 rounded-lg bg-[#FD5900]/10 flex items-center justify-center">
                        <Store className="w-4 h-4" />
                      </span>
                      <span>Local Business</span>
                    </span>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      02
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight">
                    Make it easier to verify what your business offers
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    Put your locations, hours, service areas, and booking details where customers
                    can find them. Use one dedicated page to answer the questions that matter for a
                    specific purchase, such as delivery area, lead time, or indicative pricing for
                    common requests.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Check that those details agree across your website and the listings you control.
                    If you’re eligible to claim your business in ChatGPT, your owner can complete
                    the verification steps.
                  </p>

                  <div className="pt-4 border-t border-border/60">
                    <Link
                      to="/chatgpt-ads-agency#local-business"
                      className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-[#FD5900] no-underline transition-colors"
                    >
                      <span>See EON8’s local business service</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </article>

                <article
                  id="organic-and-paid"
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-400">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600/10 dark:bg-cyan-500/15 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <span>ChatGPT Ads</span>
                    </span>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      03
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight">
                    What is the difference between a citation and a sponsored card?
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    A citation links to a source used in an organic AI answer. A sponsored card is a
                    paid placement that can appear below the answer. If you run a campaign, measure
                    its spend and tracked enquiries separately from organic mentions and referrals.
                  </p>

                  <div className="rounded-xl border border-indigo-500/20 dark:border-cyan-500/25 bg-indigo-500/[0.04] dark:bg-cyan-500/10 p-4 text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Key takeaway:</strong> Pair strong,
                    fact-checked service pages (organic citations) with dedicated conversion-ready
                    landing pages when testing paid placements.
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <a
                      href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-[#FD5900] no-underline transition-colors"
                    >
                      <span>Read OpenAI’s ad-format guide</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </article>
              </>
            ) : (
              <>
                <article
                  id="audit"
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FD5900]">
                      <span className="w-8 h-8 rounded-lg bg-[#FD5900]/10 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4" />
                      </span>
                      <span>Lesson 1</span>
                    </span>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      01
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight">
                    Run a baseline audit
                  </h2>

                  <ul className="space-y-2.5 text-base text-muted-foreground leading-relaxed">
                    {[
                      'Pick one core offer and one target market.',
                      'Write five questions a buyer would ask before choosing a provider.',
                      'Run each question and record the date, brands mentioned, cited sources, and any inaccurate details.',
                    ].map((step) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl border border-indigo-500/20 dark:border-cyan-500/25 bg-indigo-500/[0.04] dark:bg-cyan-500/10 p-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Try it:</strong> Ask “Which after-school
                    maths tutoring centres in Bengaluru offer a trial class?” Record which providers
                    appear and whether their pages clearly explain grades, locations, and booking.
                  </div>
                </article>

                <article
                  id="improve"
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-400">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600/10 dark:bg-cyan-500/15 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <span>Lesson 2</span>
                    </span>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      02
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight">
                    Improve one page that answers a buyer’s question
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    Choose a page linked to a specific buying decision. Add the confirmed facts a
                    buyer needs, such as service area, who the offer is for, indicative pricing
                    where appropriate, and how to enquire.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Keep the details consistent on listings you control. Check Business Hub
                    eligibility if claiming is relevant to your business.
                  </p>

                  <div className="pt-4 border-t border-border/60">
                    <Link
                      to="/chatgpt-ads-agency#local-business"
                      className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-[#FD5900] no-underline transition-colors"
                    >
                      <span>Explore claiming and local optimization</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </article>

                <article
                  id="measure"
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FD5900]">
                      <span className="w-8 h-8 rounded-lg bg-[#FD5900]/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </span>
                      <span>Lesson 3</span>
                    </span>
                    <span className="text-2xl font-heading font-black text-slate-200 dark:text-slate-800">
                      03
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight">
                    Track enquiries as well as mentions
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    Repeat your original questions after making changes. Track sampled mentions and
                    citations, identifiable referrals, and enquiries separately. Ask your sales team
                    which enquiries became qualified leads or bookings.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    If you run a paid test, define one conversion goal and compare qualified-lead
                    cost separately from organic traffic.
                  </p>

                  <div className="pt-4 border-t border-border/60">
                    <Link
                      to="/chatgpt-ads-agency#examples"
                      className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-[#FD5900] no-underline transition-colors"
                    >
                      <span>See where a sponsored ChatGPT ad can appear</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </article>
              </>
            )}
          </div>

          {/* Sticky Sidebar (matches EON8 BlogPostPage rhythm) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <LeadCaptureCard
              id="chatgpt-subpage-audit-form"
              theme="ai"
              compact
              showWebsite
              heading="Free AI Visibility Check"
              subheading="Find out how ChatGPT describes and cites your brand today."
              submitLabel="Request My Audit"
            />

            <div className="rounded-2xl bg-card border border-border p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-border">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/10 dark:bg-cyan-500/15 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-heading font-extrabold text-foreground">
                  Explore EON8 AI Services
                </h3>
              </div>

              <ul className="space-y-1">
                {AI_HUB_LINKS.map((item) => {
                  const active = item.to === currentPath;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex items-center justify-between gap-2 min-h-[38px] px-3 py-2 rounded-xl text-sm font-semibold no-underline transition-colors ${
                          active
                            ? 'bg-indigo-600/10 dark:bg-cyan-500/15 text-indigo-600 dark:text-cyan-400 font-bold'
                            : 'text-muted-foreground hover:text-[#FD5900] hover:bg-slate-50 dark:hover:bg-slate-800/70'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. Strategy Call Booking */}
      <DiscoveryCallSection
        theme="ai"
        badge="Free Strategy Session"
        heading="Discuss Your AI Search Visibility Roadmap"
        subheading="Book a 30-minute consultation with our AI visibility specialists to audit your priority buyer queries."
        callTitle="30-Min ChatGPT Visibility Consultation"
        callDescription="Review your current AI mentions, competitor citations, and priority landing-page upgrades with EON8."
      />

      {/* 5. Bottom Consultation Banner */}
      <BottomCtaBanner
        theme="ai"
        heading={
          isBlog
            ? 'Want to Run Your First AI Visibility Check?'
            : 'Get Help With Your First AI Visibility Audit'
        }
        description={
          <>
            Share your business website, the customers you serve, and your target market — partner
            with{' '}
            <Link to="/" className="text-[#FD5900] font-bold underline">
              EON8
            </Link>{' '}
            to prepare a tailored ChatGPT visibility baseline.
          </>
        }
        formHeading="Request Free AI Audit"
        submitLabel="Get My AI Visibility Audit"
        disclaimer="Independent agency · ChatGPT is a product of OpenAI. EON8 is not affiliated with or endorsed by OpenAI."
      />
    </div>
  );
}

export default ChatgptAdsSubPage;
