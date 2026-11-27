import type { ServicePageData } from '../types';

export const adsAmazonMarketingAgencyData: ServicePageData = {
  slug: 'ads-amazon-marketing-agency',
  theme: 'brand',
  title: 'Amazon Ads & Marketplace Marketing Agency | Lower ACoS & Scale Sales – Eon8',
  metaDesc:
    'Scale your Amazon Seller & Vendor Central revenue with EON8’s data-driven Amazon PPC Ads, Sponsored Brands, DSP retargeting, and A+ listing conversion optimization.',
  noIndex: true,
  hero: {
    badge: 'The Legendary — Amazon Advertising Agency',
    heading: 'The Legendary Amazon Advertising Agency — Strategize, Advertise, Optimize And Target',
    subheading: 'Full-Funnel Amazon Sponsored Products, Sponsored Brands, Video Ads & Storefront CRO',
    paragraphs: [
      [
        'Winning on Amazon requires tight alignment between paid ad velocity and organic Best Seller Rank (BSR). As a dedicated Amazon Advertising Agency, EON8 engineers granular keyword bidding, negative-match hygiene, and high-converting A+ listings that lower ACoS while growing TACoS profitability.',
      ],
      [
        'Whether you operate on Amazon Seller Central or Vendor Central, our marketplace strategists help you Strategize, Advertise, Optimize And Target every stage of the buyer journey so your catalog dominates Page-1 search results.',
      ],
    ],
    bullets: [
      'Sponsored Products, Brands & Video Ads',
      'Amazon Product Listing Ads & A+ CRO',
      'Amazon DSP Programmatic Retargeting',
      'ACoS, TACoS & SKU-Level Margin Tracking',
    ],
    actions: [
      {
        label: 'HIRE US!',
        href: '#consult-form',
        opensModal: false,
        external: false,
        variant: 'primary',
      },
      {
        label: 'Get Free Amazon Account Audit',
        href: '/contact',
        opensModal: true,
        external: false,
        variant: 'secondary',
      },
    ],
    layout: 'split-form',
    formHeading: 'Request Free Amazon PPC & Listing Audit',
    formSubmitLabel: 'Claim Free Audit',
  },
  sections: [
    {
      type: 'feature-grid',
      heading: 'How We Obtain Results',
      subheading:
        'Our proven three-pillar methodology turns wasted ad spend into predictable, compounding Amazon marketplace revenue.',
      columns: 3,
      cards: [
        {
          badge: 'Pillar 01',
          title: 'Strong Strategy',
          description:
            'Deep ASIN profitability modeling, competitor keyword harvesting, search-term isolation, and category share-of-voice mapping tailored to your exact product margins.',
          iconSrc: '/wp-content/uploads/2022/09/paid-ads-funnel.svg',
          iconAlt: 'Strong Strategy',
        },
        {
          badge: 'Pillar 02',
          title: 'Smart Technology',
          description:
            'Automated bid-rule monitoring, hourly dayparting adjustments, Buy-Box alerts, and live search-term bleed suppression to eliminate non-converting spend in real time.',
          iconSrc: '/wp-content/uploads/2022/09/marketing-funnel.svg',
          iconAlt: 'Smart Technology',
        },
        {
          badge: 'Pillar 03',
          title: 'Substantial Sales & Growth',
          description:
            'Paid click velocity that lifts organic Best Seller Rank (BSR), lowers blended TACoS, and builds durable multi-marketplace revenue growth quarter after quarter.',
          iconSrc: '/wp-content/uploads/2022/09/ecommerce-funnel.svg',
          iconAlt: 'Substantial Sales & Growth',
        },
      ],
    },
    {
      type: 'stats',
      heading: 'Our Experience — Globally',
      subheading:
        'Scaling D2C, private-label, and enterprise brands across Amazon India, North America, UK, EU, UAE, and APAC marketplaces.',
      stats: [
        { value: '3.8×', label: 'Average Return on Ad Spend' },
        { value: '-32%', label: 'Average Wasted ACoS Reduction' },
        { value: '1250+', label: 'Campaigns Delivered Globally' },
        { value: '24/7', label: 'Bid & Buy-Box Monitoring' },
      ],
    },
    {
      type: 'feature-grid',
      heading: 'Our Amazon Advertising Services',
      subheading:
        'Every lever needed to capture high-intent shoppers on Amazon and defend your brand against competitors.',
      columns: 3,
      cards: [
        {
          title: 'Amazon Product Listing Ads',
          description:
            'High-intent Sponsored Products and single-keyword exact campaigns engineered to place your ASINs at the top of search and on competitor product detail pages.',
          iconSrc: '/wp-content/uploads/2022/09/paid-ads-funnel.svg',
          iconAlt: 'Amazon Product Listing Ads',
        },
        {
          title: 'Sponsored Brands & Video Ads',
          description:
            'Thumb-stopping Sponsored Brand Video ads and headline search banners routing shoppers straight to your custom Amazon Brand Store.',
          iconSrc: '/wp-content/uploads/2022/09/marketing-funnel.svg',
          iconAlt: 'Sponsored Brands',
        },
        {
          title: 'Sponsored Display & Amazon DSP',
          description:
            'On- and off-Amazon retargeting to re-engage product-detail viewers, cross-sell complementary SKUs, and boost repeat purchase LTV.',
          iconSrc: '/wp-content/uploads/2022/09/ecommerce-funnel.svg',
          iconAlt: 'Amazon DSP',
        },
        {
          title: 'Listing SEO & Backend Search Terms',
          description:
            'High-converting titles, benefit-driven bullet points, and complete backend byte indexing so paid clicks lift organic rankings.',
          iconSrc: '/wp-content/uploads/2022/09/sro-funnel.svg',
          iconAlt: 'Amazon Listing SEO',
        },
        {
          title: 'A+ / Premium A+ Content & Brand Store',
          description:
            'Visual comparison charts, lifestyle infographics, and multi-page Amazon Brand Flagship Stores engineered to lift unit session percentage.',
          iconSrc: '/wp-content/uploads/2022/09/content-funnel.svg',
          iconAlt: 'A+ Content',
        },
        {
          title: 'Review Velocity, Buy-Box & Inventory Sync',
          description:
            'Stock-aware bid rules so you never waste budget on low-inventory SKUs, paired with compliant review generation workflows.',
          iconSrc: '/wp-content/uploads/2022/09/Expert-Insight.svg',
          iconAlt: 'Inventory & Buy-Box Sync',
        },
      ],
    },
    {
      type: 'pricing-matrix',
      heading: 'Amazon Advertising Services Pricing Plans',
      subheading:
        'Transparent monthly retainers aligned with your SKU count, ad spend tier, and international marketplace growth goals.',
      tiers: [
        {
          name: 'Starter Growth',
          price: '$750 / mo',
          subtitle: 'Up to 15 Active ASINs',
          ctaLabel: 'HIRE US!',
        },
        {
          name: 'Scale Accelerator',
          price: '$1,450 / mo',
          subtitle: 'Up to 50 Active ASINs',
          highlighted: true,
          ctaLabel: 'HIRE US!',
        },
        {
          name: 'Enterprise Global',
          price: 'Custom',
          subtitle: '50+ ASINs & Multi-Region',
          ctaLabel: 'Request Custom Quote',
        },
      ],
      rows: [
        {
          category: 'Campaign Management',
          feature: 'Sponsored Products & Keyword Harvesting',
          values: [true, true, true],
        },
        {
          feature: 'Sponsored Brands & Video Campaigns',
          values: [false, true, true],
        },
        {
          feature: 'Sponsored Display & Competitor ASIN Defense',
          values: [false, true, true],
        },
        {
          feature: 'Amazon DSP Programmatic Retargeting',
          values: [false, false, true],
        },
        {
          category: 'Listing & Conversion Optimization',
          feature: 'Search Term Negative Hygiene & Bid Rules',
          values: ['Weekly', '3× Weekly', 'Daily'],
        },
        {
          feature: 'Listing SEO & Backend Keyword Optimization',
          values: ['Up to 5 ASINs', 'Up to 20 ASINs', 'Unlimited'],
        },
        {
          feature: 'A+ Content & Brand Storefront Optimization',
          values: [false, true, true],
        },
        {
          category: 'Reporting & Support',
          feature: 'ACoS, TACoS & SKU Margin Dashboard',
          values: ['Monthly', 'Bi-Weekly', 'Weekly Live'],
        },
        {
          feature: 'Dedicated Amazon Ads Account Strategist',
          values: [true, true, true],
        },
      ],
      footnote:
        'All pricing plans exclude direct Amazon ad spend paid to Seller/Vendor Central. Custom INR billing is available for Amazon.in brands.',
    },
    {
      type: 'process',
      heading: 'How We Audit, Restructure & Scale Your Amazon Ad Account',
      steps: [
        {
          step: '01',
          title: 'Wasted Spend & Listing Readiness Audit',
          description:
            'We audit search-term bleed, campaign overlap, Buy-Box health, and product page conversion rates before scaling spend.',
        },
        {
          step: '02',
          title: 'Granular Campaign Restructuring',
          description:
            'Separating branded vs. non-branded, research vs. exact winners, and competitor ASIN defense/offense campaigns.',
        },
        {
          step: '03',
          title: 'Dayparting & Bid Optimization',
          description:
            'Placement multipliers and hourly bid adjustments focused on peak purchase windows and target ACoS/TACoS.',
        },
        {
          step: '04',
          title: 'Organic Flywheel & International Expansion',
          description:
            'Reinvesting ad velocity into organic keyword rank growth across Amazon India, US, UK, UAE, and EU marketplaces.',
        },
      ],
    },
    {
      type: 'testimonials',
      heading: 'Client Testimonials',
      subheading:
        'Hear from global Amazon sellers and brand founders who partnered with EON8 to cut wasted ad spend and accelerate profitable growth.',
      items: [
        {
          name: 'Carl Freedman',
          role: 'Founder, Home & Kitchen Private Label',
          quote:
            'EON8 restructured our bloated Amazon PPC account in three weeks, cut our ACoS from 44% down to 23%, and unlocked profitable scaling across our top twelve SKUs.',
        },
        {
          name: 'Armando R. Lundquist',
          role: 'Director of E-Commerce, Consumer Electronics',
          quote:
            'Their keyword harvesting and Sponsored Brand Video campaigns lifted our category share of voice dramatically. Best Amazon Advertising Agency decision we made this year.',
        },
        {
          name: 'Walter Hurd',
          role: 'VP Growth, Health & Wellness Brand',
          quote:
            'Unlike agencies that set automated campaigns and disappear, the EON8 team monitors search terms, Buy-Box shifts, and TACoS margins every single week.',
        },
        {
          name: 'Carmen Leblanc',
          role: 'Co-Founder, Beauty & Personal Care',
          quote:
            'Combining A+ Content optimization with granular Amazon Product Listing Ads doubled our conversion rate and turned our seasonal launches into consistent bestsellers.',
        },
        {
          name: 'Sharon Morley',
          role: 'Head of Marketplace Sales, Apparel Brand',
          quote:
            'Transparent reporting, proactive bid strategy, and measurable revenue growth across both Amazon US and UK. EON8 feels like an extension of our internal growth team.',
        },
      ],
    },
    {
      type: 'faq',
      heading: 'Amazon Ads Agency FAQs',
      faqs: [
        {
          question: 'Do you manage both Amazon Seller Central and Vendor Central accounts?',
          answerParagraphs: [
            [
              'Yes — our marketplace specialists manage Sponsored Ads, DSP, A+ Content, and catalog operations across both 3P Seller Central and 1P Vendor Central.',
            ],
          ],
        },
        {
          question: 'How do you lower ACoS without hurting total sales volume?',
          answerParagraphs: [
            [
              'We eliminate non-converting search terms via strict negative keyword rules, isolate high-ROAS exact keywords into dedicated top-of-search budgets, and improve listing conversion rates with A+ visuals so every click converts higher.',
            ],
          ],
        },
        {
          question: 'What marketplaces do you support?',
          answerParagraphs: [
            [
              'We run campaigns across Amazon.in, Amazon.com (North America), Amazon UK/EU, Amazon UAE/KSA, and Flipkart/Quick-Commerce platforms.',
            ],
          ],
        },
      ],
    },
  ],
  bottomCta: {
    heading: 'HIRE US! — Scale Your Amazon Revenue With EON8',
    description:
      'Stop losing margin to unmanaged bids and broad-match bleed. Partner with our Amazon advertising specialists for a free account audit and 90-day profitability roadmap.',
    formHeading: 'HIRE US! Request Your Free Audit',
    submitLabel: 'Claim Free Amazon Audit',
  },
};
