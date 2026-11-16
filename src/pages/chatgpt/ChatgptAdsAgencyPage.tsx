import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/chatgpt-ads.css';

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
  tone: string;
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
    tone: '#fae5df',
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
    tone: '#e3efe6',
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
    tone: '#efe7fa',
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
    tone: '#dfeafa',
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
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [website, setWebsite] = useState('');
  const [market, setMarket] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<ServiceFocusKey>('visibility');
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ChatGPT Ads Agency in India | EON8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'EON8 is a ChatGPT Ads agency in India. We set up, run and optimise ChatGPT ads with AEO/GEO so your brand shows up in AI answers and ads.'
      );
    }
  }, []);

  useEffect(() => {
    if (!dialogMode) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDialogMode(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialogMode]);

  const currentCase = SHOWCASE_EXAMPLES[activeCaseIdx];

  const openServiceDialog = (focus: ServiceFocusKey) => {
    setSelectedFocus(focus);
    setAuditSubmitted(false);
    setDialogMode({ type: 'service', focus });
  };

  const openAuditDialog = (focus: ServiceFocusKey = 'visibility', isPackage = false) => {
    setSelectedFocus(focus);
    setAuditSubmitted(false);
    setDialogMode({ type: 'audit', focus, isPackage });
  };

  const handleAuditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!website.trim() || !market.trim()) return;
    setAuditSubmitted(true);
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
    return `mailto:info@eon8.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="chatgpt-ads-scope">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="shell nav">
        <Link className="brand" to="/" aria-label="EON8 home">
          <img
            src="/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png"
            alt="EON8"
            className="brand-img"
            height={38}
          />
        </Link>
        <nav aria-label="Main navigation">
          <a href="#examples">Examples</a>
          <a href="#local-business">Local business</a>
          <a href="#traffic">Traffic</a>
          <a href="#packages">Packages</a>
          <Link to="/chatgpt-ads-agency/blog">Blog</Link>
          <Link to="/chatgpt-ads-agency/education">Education</Link>
        </nav>
        <button
          type="button"
          className="btn primary"
          onClick={() => openAuditDialog('visibility', false)}
        >
          Request an audit <span aria-hidden="true">↗</span>
        </button>
      </header>

      <main id="main">
        <section className="shell hero">
          <div>
            <p className="eyebrow">AI Visibility Agency</p>
            <h1>
              Get found
              <br />
              on <span>ChatGPT.</span>
            </h1>
            <p className="intro">
              See what ChatGPT says about your business. Improve the information it can find and track the visits and enquiries it sends.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => openAuditDialog('visibility', false)}
              >
                Request a visibility audit <span aria-hidden="true">↗</span>
              </button>
              <a className="link" href="#examples">
                See search and ad examples ↓
              </a>
            </div>
            <p className="hero-note">
              See how a local business can appear in an AI answer, and where a paid ad can show up.
            </p>
          </div>

          <div className="visual" id="examples">
            <div className="panel">
              <div className="panel-head">
                <span>One search, two ways to be found</span>
                <span className="sample">Illustration</span>
              </div>
              <div className="case-switcher" aria-label="Choose a business example">
                {SHOWCASE_EXAMPLES.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={idx === activeCaseIdx}
                    onClick={() => setActiveCaseIdx(idx)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="conversation" aria-live="polite">
                <p className="demo-label">Customer asks</p>
                <p className="buyer-message" id="case-prompt">
                  “{currentCase.prompt}”
                </p>
                <div className="answer">
                  <p className="demo-label">
                    <span className="organic-dot" /> Example organic answer
                  </p>
                  <p id="case-answer">{currentCase.answer}</p>
                  {currentCase.sourceUrl ? (
                    <a
                      id="case-source"
                      className="source-chip"
                      href={currentCase.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source: {currentCase.source} ↗
                    </a>
                  ) : (
                    <span id="case-source" className="source-chip">
                      {currentCase.source}
                    </span>
                  )}
                </div>
                <div className="ad-example">
                  <div className="ad-caption">
                    <span>Sponsored</span>
                    <span>Below the answer · Mock ad</span>
                  </div>
                  <div className="ad-body">
                    <div>
                      <p className="advertiser" id="case-brand">
                        {currentCase.brand}
                      </p>
                      <h2 id="case-headline">{currentCase.headline}</h2>
                      <p id="case-copy">{currentCase.copy}</p>
                      {currentCase.url ? (
                        <a
                          id="case-cta"
                          href={currentCase.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {currentCase.cta} ↗
                        </a>
                      ) : (
                        <a id="case-cta">Example CTA: {currentCase.cta}</a>
                      )}
                    </div>
                    <span
                      className="ad-creative"
                      id="case-art"
                      aria-hidden="true"
                      style={{ backgroundColor: currentCase.tone }}
                    >
                      {activeCaseIdx === 0 ? (
                        <span className="cake-art" />
                      ) : (
                        <span className="industry-mark">
                          {getBrandInitials(currentCase.brand)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <p className="example-note">
                  Simulated answers and ads. Examples other than CakeSquare use fictional brands. Ads may appear below answers for eligible users.{' '}
                  <a
                    href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See OpenAI’s ad format ↗
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="strip">
          <div className="shell">
            <strong>10 years in business</strong>
            <span>Chennai · Bengaluru · Hyderabad · Mumbai</span>
            <a href="tel:+919042294007">Call +91 90422 94007</a>
          </div>
        </div>

        <section className="shell services" id="services">
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h2>From answers to action.</h2>
            </div>
            <p>
              Start with a baseline. Then improve the pages and business information buyers rely on.
            </p>
          </div>
          <div className="grid">
            <article className="service" id="visibility">
              <span className="icon" aria-hidden="true">
                ⌕
              </span>
              <h3>ChatGPT Visibility</h3>
              <p>
                Test real buyer questions, identify which sources are cited, and improve the pages that could answer those questions.
              </p>
              <button type="button" onClick={() => openServiceDialog('visibility')}>
                Explore visibility services ↗
              </button>
            </article>
            <article className="service" id="business">
              <span className="icon" aria-hidden="true">
                ⌂
              </span>
              <h3>ChatGPT Local Business</h3>
              <p>
                Check whether you can claim a Business Hub listing and improve the public information people find about your location.
              </p>
              <button type="button" onClick={() => openServiceDialog('business')}>
                Explore claiming and optimization ↗
              </button>
            </article>
            <article className="service" id="traffic">
              <span className="icon" aria-hidden="true">
                ↗
              </span>
              <h3>ChatGPT Traffic</h3>
              <p>
                Track identifiable ChatGPT referrals and measure the calls, WhatsApp clicks, and bookings your site generates.
              </p>
              <button type="button" onClick={() => openServiceDialog('traffic')}>
                Explore traffic measurement ↗
              </button>
            </article>
            <article className="service" id="ai-search">
              <span className="icon" aria-hidden="true">
                ◎
              </span>
              <h3>Multi-Platform AI Visibility</h3>
              <p>
                Compare how ChatGPT, Claude, Gemini, and Perplexity answer buyer questions and improve the content they can draw from.
              </p>
              <button type="button" onClick={() => openServiceDialog('premium')}>
                Explore multi-platform visibility ↗
              </button>
            </article>
          </div>
        </section>

        <section className="shell local-section" id="local-business">
          <div className="section-head">
            <div>
              <p className="eyebrow">ChatGPT local business</p>
              <h2>Claim and optimize your business</h2>
            </div>
            <p>
              We check your listing eligibility and improve the public information people use to find and choose your business.
            </p>
          </div>
          <div className="local-grid">
            <article>
              <h3>Business Hub claim assistance</h3>
              <ul>
                <li>Check for an existing listing and available verification options.</li>
                <li>Guide the owner or authorized representative through verification when eligible.</li>
                <li>Help update the supported business information once access is approved.</li>
              </ul>
            </article>
            <article>
              <h3>Local visibility optimization</h3>
              <ul>
                <li>
                  Check name, address, phone, hours, service areas, and links across your website and relevant listings.
                </li>
                <li>
                  Improve the location or service page with buyer FAQs and clear call, WhatsApp, or booking links.
                </li>
                <li>Test local buyer questions and report mentions, sources, and identifiable referrals.</li>
              </ul>
            </article>
          </div>
          <p className="eligibility">
            OpenAI currently allows local stores and restaurants to claim only an existing U.S. listing. For India-based shops, we focus on local visibility improvements and check eligibility separately for other business types.{' '}
            <a
              href="https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI eligibility guidance ↗
            </a>
          </p>
        </section>

        <section className="shell packages" id="packages">
          <div className="section-head">
            <div>
              <p className="eyebrow">AI visibility packages</p>
              <h2>Start with 90 days.</h2>
            </div>
            <p>
              Each package starts with a three-month engagement. See the monthly rate and full commitment before you enquire.
            </p>
          </div>
          <div className="package-grid">
            <article className="package">
              <h3>ChatGPT Visibility</h3>
              <p className="fit">For one business focused on one priority market.</p>
              <p className="fee">
                ₹9,900<small>per month · 3-month minimum</small>
              </p>
              <dl>
                <div>
                  <dt>3-month service fee</dt>
                  <dd>₹29,700</dd>
                </div>
              </dl>
              <ul>
                <li>Baseline and monthly checks across 10 to 15 buyer queries</li>
                <li>Local business audit and Business Hub eligibility check for one location</li>
                <li>One priority service or location page improvement per month</li>
                <li>Monthly report on mentions, referrals, and measurable enquiries</li>
              </ul>
              <details>
                <summary>See the work included</summary>
                <p>
                  <strong>Setup:</strong> Record the starting answers and sources for 10 to 15 ChatGPT buyer queries. Check one location’s public business details, website crawl access, and Business Hub eligibility. Guide the owner through claiming where eligible.
                </p>
                <p>
                  <strong>Each month:</strong> Improve one service or location page, correct agreed business details on properties you control, and rerun the query set.
                </p>
                <p>
                  <strong>Reporting:</strong> Share mentions, citations, identifiable referral traffic, and measured enquiries where tracking is available.
                </p>
              </details>
              <button
                type="button"
                className="btn primary"
                onClick={() => openAuditDialog('visibility', true)}
              >
                Request ChatGPT Visibility ↗
              </button>
            </article>

            <article className="package">
              <h3>AI Visibility Premium</h3>
              <p className="fit">For brands comparing how they appear across AI search platforms.</p>
              <p className="fee">
                ₹19,900<small>per month · 3-month minimum</small>
              </p>
              <dl>
                <div>
                  <dt>3-month service fee</dt>
                  <dd>₹59,700</dd>
                </div>
              </dl>
              <ul>
                <li>Includes the local business and Business Hub work in ChatGPT Visibility</li>
                <li>Benchmark ChatGPT, Claude, Gemini, and Perplexity where applicable</li>
                <li>Compare competitor mentions, cited sources, and inaccurate business details</li>
                <li>Improve up to two priority pages per month</li>
                <li>Monthly visibility and identifiable referral report by platform</li>
              </ul>
              <details>
                <summary>See the work included</summary>
                <p>
                  <strong>Setup:</strong> Run the ChatGPT Visibility setup, then benchmark priority questions across the relevant AI platforms. Map competitor mentions and the sources each platform uses.
                </p>
                <p>
                  <strong>Each month:</strong> Improve up to two priority pages in total, address inaccurate business details, and rerun the priority questions.
                </p>
                <p>
                  <strong>Reporting:</strong> Compare sampled mentions, citations, and identifiable referral traffic by platform, with next actions.
                </p>
              </details>
              <button
                type="button"
                className="btn outline"
                onClick={() => openAuditDialog('premium', true)}
              >
                Request AI Visibility Premium ↗
              </button>
            </article>

            <article className="package" id="chatgpt-ads">
              <h3>ChatGPT Ads Add-on</h3>
              <p className="fit">Optional 90-day paid lead-generation package for eligible businesses.</p>
              <p className="fee">
                ₹12,000<small>per month · management fee</small>
              </p>
              <dl>
                <div>
                  <dt>3-month management fee</dt>
                  <dd>₹36,000</dd>
                </div>
                <div>
                  <dt>90-day ad budget</dt>
                  <dd>₹65,250</dd>
                </div>
                <div>
                  <dt>Planned 90-day total</dt>
                  <dd>₹1,01,250</dd>
                </div>
              </dl>
              <ul>
                <li>Eligibility check and one campaign for one offer</li>
                <li>Two launch ad variations, landing-page review, and conversion tracking</li>
                <li>Cost-per-qualified-lead review with your team</li>
              </ul>
              <details>
                <summary>See the work included</summary>
                <p>
                  <strong>Setup:</strong> Confirm eligibility and agree on the offer, audience, budget, and one conversion goal. Review the landing page, prepare two ad variations, and test conversion tracking.
                </p>
                <p>
                  <strong>Over 90 days:</strong> Manage one campaign for one offer, review performance weekly, and adjust within the agreed budget.
                </p>
                <p>
                  <strong>Reporting:</strong> Report monthly on spend, clicks, tracked conversions, and cost per qualified lead where lead quality can be confirmed.
                </p>
              </details>
              <button
                type="button"
                className="btn outline"
                onClick={() => openAuditDialog('ads', true)}
              >
                Request ChatGPT Ads add-on ↗
              </button>
            </article>
          </div>
          <p className="package-note">
            Proposed pricing, before applicable taxes. The optional ads add-on has a separate management fee and media budget. The ChatGPT Ads budget uses the published INR minimum of ₹725 per day. Scope and eligibility are confirmed before launch.{' '}
            <a
              href="https://help.openai.com/en/articles/20001210-creating-campaigns-for-chatgpt-ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI budget guidance ↗
            </a>
          </p>
        </section>

        <section className="process" id="process">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="eyebrow">How we work</p>
                <h2>Your first 90 days</h2>
              </div>
            </div>
            <div className="steps">
              <article>
                <h3>Month 1: Establish the baseline</h3>
                <p>
                  Sample the questions your customers ask. Record mentions, cited sources, competitor visibility, and available referral data.
                </p>
              </article>
              <article>
                <h3>Month 2: Improve priority pages</h3>
                <p>
                  Correct business details and improve a priority service or location page with verified answers and a clear next step.
                </p>
              </article>
              <article>
                <h3>Month 3: Review what changed</h3>
                <p>
                  Repeat the prompt checks, compare identifiable referrals, and review lead quality with the team answering inquiries.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="shell learn-links" aria-label="Learn about AI visibility">
          <Link to="/chatgpt-ads-agency/blog">
            <h3>EON8 Blog</h3>
            <p>Articles on AI search, local discovery, and paid placements.</p>
            <strong>Read the blog →</strong>
          </Link>
          <Link to="/chatgpt-ads-agency/education">
            <h3>AI Visibility Education</h3>
            <p>A practical guide to checking how AI finds and describes your business.</p>
            <strong>Start learning →</strong>
          </Link>
        </section>

        <section className="shell faq" id="faq">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>What to expect</h2>
          </div>
          <div>
            <details>
              <summary>Can you guarantee a ChatGPT recommendation?</summary>
              <p>
                Search results vary by query and context. We commit to the agreed improvements and report observed mentions, citations, and referrals.
              </p>
            </details>
            <details>
              <summary>Do you work with other AI platforms?</summary>
              <p>
                The premium package benchmarks answers across ChatGPT, Claude, Gemini, and Perplexity where applicable. We improve your public content and business information based on what those checks reveal.
              </p>
            </details>
            <details>
              <summary>Can you claim my business in ChatGPT?</summary>
              <p>
                We check eligibility and guide the business owner through verification where supported. OpenAI currently limits local stores and restaurants to existing U.S. listings. Local visibility optimization is available for businesses in India.{' '}
                <a
                  href="https://openai.com/business/businesses-in-chatgpt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenAI Business Hub information
                </a>
              </p>
            </details>
            <details>
              <summary>Are ChatGPT Ads the same as organic visibility?</summary>
              <p>
                ChatGPT Ads are paid placements. Organic visibility work improves the information available to search. We report the two separately and confirm campaign eligibility before proposing a test.
              </p>
            </details>
            <details>
              <summary>What can you measure?</summary>
              <p>
                We track sampled mentions and citations, identifiable referral sessions, and actions such as WhatsApp clicks or booking submissions. We work with your team to confirm which inquiries became qualified leads and bookings.
              </p>
            </details>
          </div>
        </section>

        <section className="shell">
          <div className="banner">
            <div>
              <h2>What does ChatGPT find about you?</h2>
              <p>In your enquiry, include your business name, website, and target city or market.</p>
            </div>
            <div className="actions">
              <Link className="btn primary" to="/contact">
                Send an enquiry <span aria-hidden="true">↗</span>
              </Link>
              <a className="btn outline" href="tel:+919042294007">
                Call EON8
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <Link className="brand" to="/" aria-label="EON8 home">
          <img
            src="/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png"
            alt="EON8"
            className="brand-img"
            height={30}
            style={{ height: 30 }}
          />
        </Link>
        <span>Independent agency · ChatGPT is a product of OpenAI</span>
        <Link to="/chatgpt-ads-agency/blog">Blog</Link>
        <Link to="/chatgpt-ads-agency/education">Education</Link>
        <a href="mailto:info@eon8.com">info@eon8.com</a>
        <Link to="/contact">Contact EON8 ↗</Link>
      </footer>

      {dialogMode && (
        <div
          className="chatgpt-ads-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogMode(null);
          }}
        >
          <div className="chatgpt-ads-modal-card">
            <button
              className="close"
              type="button"
              aria-label="Close dialog"
              onClick={() => setDialogMode(null)}
            >
              ×
            </button>

            {dialogMode.type === 'service' ? (
              <div>
                <h2 id="dialog-title">{SERVICE_DETAILS[dialogMode.focus].title}</h2>
                <ul className="detail-list">
                  {SERVICE_DETAILS[dialogMode.focus].items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => openAuditDialog(dialogMode.focus, false)}
                >
                  Request an audit ↗
                </button>
              </div>
            ) : (
              <div>
                <h2 id="dialog-title">
                  {dialogMode.isPackage ? 'Request a package' : 'Request a visibility audit'}
                </h2>
                <p>This prepares an inquiry to EON8 for you to review and send.</p>
                <form onSubmit={handleAuditSubmit}>
                  <label>
                    Business website
                    <input
                      name="website"
                      required
                      maxLength={200}
                      placeholder="example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                  <label>
                    Target market
                    <input
                      name="market"
                      required
                      maxLength={160}
                      placeholder="Chennai, India"
                      value={market}
                      onChange={(e) => setMarket(e.target.value)}
                    />
                  </label>
                  <label>
                    What do you want to improve?
                    <select
                      name="focus"
                      value={selectedFocus}
                      onChange={(e) => setSelectedFocus(e.target.value as ServiceFocusKey)}
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
                  <div className="actions">
                    <button type="submit" className="btn primary">
                      Submit inquiry ↗
                    </button>
                    <Link
                      className="btn outline"
                      to="/contact"
                      onClick={() => setDialogMode(null)}
                    >
                      EON8 contact page
                    </Link>
                  </div>
                  <p className="help">
                    Or email directly via{' '}
                    <a
                      href={buildMailtoHref(dialogMode.isPackage)}
                      style={{ color: 'var(--blue)', textDecoration: 'underline' }}
                    >
                      info@eon8.com
                    </a>
                    .
                  </p>
                  {auditSubmitted && (
                    <div role="status" className="chatgpt-ads-success">
                      Thank you! Your AI visibility inquiry for <strong>{website}</strong> (
                      {FOCUS_TITLES[selectedFocus]}) has been recorded.
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
