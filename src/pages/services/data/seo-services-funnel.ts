import type { ServicePageData } from '../types';

export const seoServicesFunnelData: ServicePageData = {
  slug: 'seo-services-funnel',
  theme: 'brand',
  title: 'SEO Services Funnel - Eon8',
  metaDesc:
    'Dominate Page-1 Google rankings and convert high-intent organic searchers into qualified pipeline with EON8’s full-funnel SEO services.',
  noIndex: true,
  hero: {
    badge: 'Full-Funnel Organic Search Engine',
    heading: 'Search Engine Optimization For | High-Intent Revenue & Page-1 Growth',
    subheading: 'Turn High-Intent Google Searches Into Predictable Pipeline With Full-Funnel Technical SEO & CRO',
    paragraphs: [
      [
        'Rankings without conversions are vanity metrics. EON8’s SEO Services Funnel aligns technical crawlability, commercial-intent keyword clusters, authoritative link acquisition, and conversion-focused landing pages to drive compounding organic ROI.',
      ],
    ],
    bullets: [
      'Technical Core Web Vitals & Crawl Architecture',
      'Local SEO Services & Google Maps 3-Pack',
      'Ecommerce SEO Service & Product Schema',
      'Small Business SEO Company Packages from 10,000 INR',
    ],
    actions: [
      {
        label: 'Get Consultation From Experts',
        href: '#consult-form',
        opensModal: false,
        external: false,
        variant: 'primary',
      },
      {
        label: 'View Our SEO Packages',
        href: '#package',
        opensModal: false,
        external: false,
        variant: 'secondary',
      },
    ],
    layout: 'split-form',
    formHeading: 'Get Your Free Website & Keyword Audit',
    formSubmitLabel: 'Request Free Audit',
  },
  sections: [
    {
      type: 'callback-banner',
      heading: '5 Minutes Call Back — Speak With an EON8 Lead SEO Architect',
      submitLabel: 'Send',
    },
    {
      type: 'feature-grid',
      heading: 'Before & After Partnering With EON8 SEO',
      subheading:
        'See how our full-funnel SEO framework transforms underperforming websites into reliable inbound acquisition engines.',
      columns: 2,
      cards: [
        {
          badge: 'Challenge',
          title: 'Before',
          description:
            'Buried on Page 3–5 for buyer keywords, leaking crawl budget on slow technical architecture, and relying heavily on expensive paid ads for every single enquiry.',
          bullets: [
            'Stagnant non-branded organic impressions and low click-through rates',
            'Missing local map-pack visibility and inconsistent business citations',
            'Unstructured blog content that attracts irrelevant traffic instead of buyers',
            'Zero revenue attribution tying SEO work to qualified leads',
          ],
        },
        {
          badge: 'EON8 Result',
          title: 'After',
          description:
            'Top-3 Google rankings on commercial keywords, fast Core Web Vitals, authoritative backlinks, and a compounding stream of inbound leads every month.',
          bullets: [
            '3.4× average lift in qualified organic pipeline within 4–6 months',
            'Dominant Local 3-Pack and high-intent commercial landing page coverage',
            'Clean JSON-LD structured data ready for Google AI Overviews and GEO',
            'Transparent GA4 + Search Console dashboards tied to revenue',
          ],
        },
      ],
    },
    {
      type: 'stats',
      heading: 'Proven Organic Search Impact',
      stats: [
        { value: '500+', label: 'SEO Projects Delivered' },
        { value: '95%', label: 'Page-1 Keyword Retention' },
        { value: '12+', label: 'Years of Search Expertise' },
        { value: '3.4×', label: 'Average Organic Pipeline Lift' },
      ],
    },
    {
      type: 'feature-grid',
      heading: 'Some Of Our SEO Services',
      subheading:
        'From problem-aware informational queries to high-intent transactional comparisons, we own the entire search journey.',
      columns: 3,
      cards: [
        {
          title: 'Local SEO Services',
          description:
            'Four out of five buyers search locally — we dominate Google Maps 3-Pack rankings, Google Business Profile optimization, local citations, and city landing pages.',
          iconSrc: '/wp-content/uploads/2022/09/local-seo-funnel.svg',
          iconAlt: 'Local SEO Services',
        },
        {
          title: 'Ecommerce SEO Service',
          description:
            'Category architecture, faceted navigation control, high-converting product pages, and rich product schema for Shopify, WooCommerce, Magento, and custom stores.',
          iconSrc: '/wp-content/uploads/2022/09/ecommerce-funnel.svg',
          iconAlt: 'Ecommerce SEO Service',
        },
        {
          title: 'Small Business SEO Company',
          description:
            'ROI-focused monthly search growth tailored for startups and SMBs — capturing high-intent local and national buyers without enterprise overhead.',
          iconSrc: '/wp-content/uploads/2022/09/sro-funnel.svg',
          iconAlt: 'Small Business SEO Company',
        },
        {
          title: 'Technical SEO & Core Web Vitals',
          description:
            'Site speed optimization, crawl budget engineering, clean indexation, canonical governance, and rich JSON-LD schema.',
          iconSrc: '/wp-content/uploads/2022/09/content-funnel.svg',
          iconAlt: 'Technical SEO',
        },
        {
          title: 'Conversion Rate Optimization (CRO)',
          description:
            'Heatmap diagnostics, CTA restructuring, and lead-capture experiments so organic traffic converts at maximum efficiency.',
          iconSrc: '/wp-content/uploads/2022/09/message-funnel.svg',
          iconAlt: 'CRO',
        },
        {
          title: 'Authority Link Building & ORM',
          description:
            'White-hat editorial backlinks and positive SERP reputation management to strengthen domain trust.',
          iconSrc: '/wp-content/uploads/2022/09/orm-funnel.svg',
          iconAlt: 'Authority & ORM',
        },
      ],
    },
    {
      type: 'pricing-matrix',
      heading: 'Our SEO Packages',
      subheading:
        'Flexible, transparent monthly SEO plans engineered for local businesses, growing brands, and competitive national markets.',
      tiers: [
        {
          name: 'Starter Plan',
          price: '10000 INR / Monthly',
          subtitle: 'Ideal for Local & Small Businesses',
          ctaLabel: 'Choose Starter',
        },
        {
          name: 'Growth Plan',
          price: '20000 INR / Monthly',
          subtitle: 'Best for Regional & Scaling Brands',
          highlighted: true,
          ctaLabel: 'Choose Growth',
        },
        {
          name: 'Enterprise Plan',
          price: '30000 INR / Monthly',
          subtitle: 'Competitive National & eCommerce SEO',
          ctaLabel: 'Choose Enterprise',
        },
      ],
      rows: [
        {
          category: 'Keyword & On-Page Optimization',
          feature: 'Target Keywords Tracked & Optimized',
          values: ['Up to 15 Keywords', 'Up to 35 Keywords', 'Up to 75 Keywords'],
        },
        {
          feature: 'Technical SEO Audit & Core Web Vitals Fixes',
          values: [true, true, true],
        },
        {
          feature: 'Meta Tags, Headings & Internal Link Architecture',
          values: ['Up to 10 Pages', 'Up to 25 Pages', 'Up to 60 Pages'],
        },
        {
          feature: 'Schema Markup (Organization, FAQ, Product/Local)',
          values: [true, true, true],
        },
        {
          category: 'Content & Authority Building',
          feature: 'SEO-Optimized Editorial Blog Articles / Month',
          values: ['2 Articles', '4 Articles', '8 Articles'],
        },
        {
          feature: 'Google Business Profile & Local Citations',
          values: [true, true, true],
        },
        {
          feature: 'High-Authority White-Hat Backlink Outreach',
          values: ['Standard', 'Accelerated', 'High-DR Digital PR'],
        },
        {
          category: 'Reporting & Support',
          feature: 'GA4, Search Console & Keyword Rank Report',
          values: ['Monthly', 'Bi-Weekly', 'Weekly + Strategy Call'],
        },
        {
          feature: 'Dedicated SEO Account Strategist',
          values: [true, true, true],
        },
      ],
      footnote:
        'All plans include zero lock-in contracts and full ownership of content and analytics dashboards. Need custom enterprise or international SEO? Request a tailored proposal.',
    },
    {
      type: 'process',
      heading: 'Our 4-Stage SEO Funnel Execution Roadmap',
      steps: [
        {
          step: '01',
          title: 'Deep Technical & Competitor Gap Audit',
          description:
            '200-point technical crawl, Core Web Vitals benchmark, and competitor keyword/backlink gap analysis.',
        },
        {
          step: '02',
          title: 'Intent-Mapped Keyword & On-Page Architecture',
          description:
            'Structuring TOFU, MOFU, and BOFU landing pages with optimized metadata, internal linking, and schema.',
        },
        {
          step: '03',
          title: 'Editorial Content & High-Authority Link Velocity',
          description:
            'Publishing expert content clusters paired with contextual placements on authoritative industry publications.',
        },
        {
          step: '04',
          title: 'Rank, Traffic & Revenue Attribution',
          description:
            'Transparent GA4 + Search Console monthly reporting tracking keyword movement, qualified leads, and ROI.',
        },
      ],
    },
    {
      type: 'faq',
      heading: 'SEO Funnel Frequently Asked Questions',
      faqs: [
        {
          question: 'How quickly does full-funnel SEO generate qualified leads?',
          answerParagraphs: [
            [
              'Technical fixes and bottom-of-funnel commercial page optimizations typically lift impressions and early conversions within 45–60 days, with compounding Page-1 dominance across months 3–6.',
            ],
          ],
        },
        {
          question: 'Do you optimize for AI search engines (ChatGPT, Gemini, Google AI Overviews)?',
          answerParagraphs: [
            [
              'Yes — every EON8 SEO funnel incorporates entity structured data, direct-answer formatting, and brand citation authority for Generative Engine Optimization (GEO).',
            ],
          ],
        },
        {
          question: 'Are there any long-term lock-in contracts?',
          answerParagraphs: [
            [
              'No lock-in contracts. You receive a dedicated SEO manager, weekly/monthly transparent reporting, and clear milestone deliverables every cycle.',
            ],
          ],
        },
      ],
    },
  ],
  bottomCta: {
    heading: 'Get Consultation From Experts',
    description:
      'Talk directly with our senior SEO architects for a complimentary technical crawl, competitor keyword gap review, and custom monthly roadmap.',
    formHeading: 'Get Consultation From Experts',
    submitLabel: 'Request Free SEO Consultation',
  },
};
