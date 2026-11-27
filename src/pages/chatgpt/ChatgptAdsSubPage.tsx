import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import { BottomCtaBanner, PageSeo, ServiceHeroSection } from '@/components/sections';

interface ChatgptAdsSubPageProps {
  mode: 'blog' | 'education';
}

export function ChatgptAdsSubPage({ mode }: ChatgptAdsSubPageProps) {
  const isBlog = mode === 'blog';

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title={
          isBlog
            ? 'ChatGPT & AI Search Visibility Blog | EON8'
            : 'AI Visibility Education | EON8'
        }
        description={
          isBlog
            ? 'Practical articles on AI search, ChatGPT visibility, local discovery, and paid placements by EON8.'
            : 'A practical guide to checking how ChatGPT and AI search engines find and describe your business.'
        }
        canonicalPath={isBlog ? '/chatgpt-ads-agency/blog' : '/chatgpt-ads-agency/education'}
      />

      <ServiceHeroSection
        theme="ai"
        layout="centered"
        badge={isBlog ? 'EON8 AI Search Blog' : 'EON8 AI Visibility Education'}
        heading={isBlog ? 'AI Visibility for Business' : 'Learn How AI Finds Your Business'}
        paragraphs={[
          isBlog
            ? 'Practical articles for local businesses, retail brands, and B2B teams navigating ChatGPT answers, citations, and ads.'
            : 'A practical guide for founders and marketing teams — start with real buyer questions and work all the way through to measured enquiries.',
        ]}
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

      {/* Quick Anchor Bar */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 border-b border-border bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/chatgpt-ads-agency"
            className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ChatGPT Ads Hub</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {(isBlog
              ? [
                  { href: '#buyer-questions', label: 'Buyer Questions' },
                  { href: '#local-discovery', label: 'Local Discovery' },
                  { href: '#organic-and-paid', label: 'Organic & Paid' },
                ]
              : [
                  { href: '#audit', label: '1. Run an Audit' },
                  { href: '#improve', label: '2. Improve a Page' },
                  { href: '#measure', label: '3. Measure Leads' },
                ]
            ).map((anchor) => (
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

      {/* Main Content */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {isBlog ? (
            <>
              <article
                id="buyer-questions"
                className="rounded-2xl bg-card border border-border p-6 sm:p-9 shadow-sm space-y-4"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>AI Search</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  What do customers ask ChatGPT before they buy?
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Start with a real buying decision. A bakery customer might ask for a custom
                  birthday cake in Chennai. Someone renovating a flat may ask for a 3BHK designer
                  within a budget. A payroll buyer might ask which providers support a 100-person
                  team.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Write down the question, the market, the brands mentioned, and the sources cited.
                  Repeat the same questions after you update your pages. That gives you a clear
                  baseline you can compare over time.
                </p>
                <div className="pt-2">
                  <Link
                    to="/chatgpt-ads-agency#examples"
                    className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
                  >
                    <span>See four worked examples</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>

              <article
                id="local-discovery"
                className="rounded-2xl bg-card border border-border p-6 sm:p-9 shadow-sm space-y-4"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Local Business</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  Make it easier to verify what your business offers
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Put your locations, hours, service areas, and booking details where customers can
                  find them. Use one dedicated page to answer the questions that matter for a
                  specific purchase, such as delivery area, lead time, or indicative pricing for
                  common requests.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Check that those details agree across your website and the listings you control.
                  If you’re eligible to claim your business in ChatGPT, your owner can complete the
                  verification steps.
                </p>
                <div className="pt-2">
                  <Link
                    to="/chatgpt-ads-agency#local-business"
                    className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
                  >
                    <span>See EON8’s local business service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>

              <article
                id="organic-and-paid"
                className="rounded-2xl bg-card border border-border p-6 sm:p-9 shadow-sm space-y-4"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ChatGPT Ads</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  What is the difference between a citation and a sponsored card?
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A citation links to a source used in an organic AI answer. A sponsored card is a
                  paid placement that can appear below the answer. If you run a campaign, measure
                  its spend and tracked enquiries separately from organic mentions and referrals.
                </p>
                <div className="pt-2">
                  <a
                    href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
                  >
                    <span>Read OpenAI’s ad-format guide</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            </>
          ) : (
            <>
              <article
                id="audit"
                className="rounded-2xl bg-card border border-border p-6 sm:p-9 shadow-sm space-y-4"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                  <GraduationCap className="w-4 h-4" />
                  <span>Lesson 1</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  Run a baseline audit
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-base text-muted-foreground leading-relaxed">
                  <li>Pick one core offer and one target market.</li>
                  <li>Write five questions a buyer would ask before choosing a provider.</li>
                  <li>
                    Run each question and record the date, brands mentioned, cited sources, and any
                    inaccurate details.
                  </li>
                </ol>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-border p-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Try it:</strong> Ask “Which after-school maths
                  tutoring centres in Bengaluru offer a trial class?” Record which providers appear
                  and whether their pages clearly explain grades, locations, and booking.
                </div>
              </article>

              <article
                id="improve"
                className="rounded-2xl bg-card border border-border p-6 sm:p-9 shadow-sm space-y-4"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                  <GraduationCap className="w-4 h-4" />
                  <span>Lesson 2</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  Improve one page that answers a buyer’s question
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Choose a page linked to a specific buying decision. Add the confirmed facts a
                  buyer needs, such as service area, who the offer is for, indicative pricing where
                  appropriate, and how to enquire.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Keep the details consistent on listings you control. Check Business Hub
                  eligibility if claiming is relevant to your business.
                </p>
                <div className="pt-2">
                  <Link
                    to="/chatgpt-ads-agency#local-business"
                    className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
                  >
                    <span>Explore claiming and local optimization</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>

              <article
                id="measure"
                className="rounded-2xl bg-card border border-border p-6 sm:p-9 shadow-sm space-y-4"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                  <GraduationCap className="w-4 h-4" />
                  <span>Lesson 3</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  Track enquiries as well as mentions
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Repeat your original questions after making changes. Track sampled mentions and
                  citations, identifiable referrals, and enquiries separately. Ask your sales team
                  which enquiries became qualified leads or bookings.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  If you run a paid pilot, define one conversion goal and compare qualified-lead
                  cost separately from organic traffic.
                </p>
                <div className="pt-2">
                  <Link
                    to="/chatgpt-ads-agency#examples"
                    className="inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] no-underline"
                  >
                    <span>See where a sponsored ChatGPT ad can appear</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </>
          )}
        </div>
      </section>

      <BottomCtaBanner
        theme="ai"
        heading={
          isBlog
            ? 'Want to Run Your First AI Visibility Check?'
            : 'Get Help With Your First AI Visibility Audit'
        }
        description="Share your business website, the customers you serve, and your target market — our specialists will prepare a tailored ChatGPT visibility baseline."
        formHeading="Request Free AI Audit"
        submitLabel="Get My AI Visibility Audit"
      />
    </div>
  );
}

export default ChatgptAdsSubPage;
