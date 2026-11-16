export interface RichTextSegment {
  text?: string;
  strong?: boolean;
  em?: boolean;
  accent?: boolean;
  br?: boolean;
  href?: string;
  className?: string;
}

export type RichNode = string | RichTextSegment;

export interface CtaAction {
  label: string;
  href: string;
  kind?: 'modal' | 'scroll' | 'route' | 'external' | 'tel' | 'whatsapp';
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline' | 'dark' | 'gold' | 'sky';
  className?: string;
  icon?: 'whatsapp' | 'calendar' | 'phone' | 'arrow';
}

export interface ClientLogoItem {
  name: string;
  src: string;
}

export interface FaqEntry {
  question: string;
  paragraphs: RichNode[][];
  bullets: RichNode[][];
}

export interface CardItem {
  title: string;
  metricHeading?: string;
  paragraphs: RichNode[][];
  bullets: RichNode[][];
  iconImg?: string;
  iconImgWidth?: number;
  iconAlt?: string;
  svgViewBox?: string;
  svgPath?: string;
}

export type CryptoSectionBlock =
  | {
      type: 'viral';
      background: string;
      leftImages: string[];
      rightImages: string[];
      heading: string;
      paragraphs: RichNode[][];
      ctas: CtaAction[];
    }
  | {
      type: 'dark-intro-split';
      heading: string;
      paragraphs: RichNode[][];
      imageSrc: string;
      imageAlt: string;
      cta?: CtaAction;
    }
  | {
      type: 'gold-intro';
      headingLines: string[];
      paragraphs: RichNode[][];
      cta?: CtaAction;
    }
  | {
      type: 'card-grid';
      variantClass: string;
      containerClass: string;
      headerClass: string;
      gridClass: string;
      cardOuterClass?: string;
      cardClass: string;
      iconWrapClass?: string;
      headingLines: string[];
      subheading?: string;
      cards: CardItem[];
      footerNote?: string;
      footerCta?: CtaAction;
    }
  | {
      type: 'cta-band';
      variant: 'nft-cta' | 'nft-cta-2';
      headingLines: string[];
      subtext?: string;
      hasQuickForm?: boolean;
      formHeading?: string;
      formSubheading?: string;
      ctas: CtaAction[];
    }
  | {
      type: 'specialized-3col';
      headingLines: string[];
      columns: CardItem[];
    }
  | {
      type: 'service-4col';
      sectionClass?: string;
      headingLines: string[];
      introParagraphs: RichNode[][];
      useModernGrid?: boolean;
      items: CardItem[];
    }
  | {
      type: 'split-feature';
      sectionClass: string;
      containerClass: string;
      gridClass?: string;
      reverseCols?: boolean;
      headingLines: string[];
      paragraphs: RichNode[][];
      listHeading?: string;
      listItems: RichNode[][];
      listClass?: string;
      imageSrc: string;
      imageAlt: string;
      imageColClass?: string;
      contentColClass?: string;
      cta?: CtaAction;
    }
    | {
      type: 'kol-network';
      heading: string;
      subheading: string;
      groups: { title: string; items: RichNode[][] }[];
    }
  | {
      type: 'comparison-table';
      heading?: string;
      intro?: string;
      headers: string[];
      rows: string[][];
      closingNote?: string;
    }
  | {
      type: 'faq';
      variant: 'panel' | 'gold-faq' | 'modern-faq' | 'blue-faq';
      sectionClass: string;
      containerClass: string;
      heading: string;
      subheading?: string;
      items: FaqEntry[];
    }
  | {
      type: 'calendly';
      variant: 'light' | 'dark' | 'blue';
      heading: string;
      subheading: string;
    };

export interface HeroBannerConfig {
  headingLines: string[];
  paragraphs: RichNode[][];
  bullets: RichNode[][];
  ctas: CtaAction[];
  formHeading: string;
}

export interface BottomEnquiryConfig {
  headingLines: string[];
  paragraphs: RichNode[][];
  stats: { count: string; suffix?: string; label: string; iconSrc?: string }[];
  submitLabel: string;
}

export interface CryptoServicePageData {
  slug: string;
  title: string;
  metaDesc: string;
  hero: HeroBannerConfig;
  clientSliderHeading?: string;
  clientLogos: ClientLogoItem[];
  sections: CryptoSectionBlock[];
  enquiry: BottomEnquiryConfig;
  disclaimer: string;
}

export interface CryptoMarketingAgencyData {
  slug: string;
  title: string;
  metaDesc: string;
  hero: {
    heading: string;
    description: string;
    features: string[];
    ctas: CtaAction[];
    formHeading: string;
  };
  clientSlider: {
    heading: string;
    logos: ClientLogoItem[];
  };
  viralSection: {
    leftIcons: string[];
    rightIcons: string[];
    eyebrow?: string;
    heading: string;
    paragraphs: string[];
    ctas: CtaAction[];
  };
  overview: {
    heading: string;
    subheading: string;
    steps: { title: string; text: string }[];
  };
  valueSection: {
    heading: string;
    chips: { label: string; href: string }[];
    points: string[];
    imageSrc: string;
    imageAlt: string;
  };
  ctaSection: {
    heading: string;
    subtext: string;
    ctas: CtaAction[];
  };
  dataDrivenServices: {
    heading: string;
    intro: string;
    subtitle: string;
    cards: { title: string; text: string; iconSrc: string; iconAlt: string }[];
  };
  extensiveServices: {
    heading: string;
    cards: { title: string; text: string; iconSrc: string; iconAlt: string }[];
  };
  projectsSection: {
    heading: string;
    items: { title: string; text: string; iconSrc: string; iconAlt: string }[];
  };
  roadmapSection: {
    heading: string;
    steps: { title: string; text: string }[];
    ctaHeading: string;
    ctaSubtext: string;
    ctaButtons: CtaAction[];
  };
  partnerSection: {
    heading: string;
    description: string;
    features: string[];
    imageSrc: string;
    imageAlt: string;
  };
  faqSection: {
    heading: string;
    items: { question: string; answer: string }[];
  };
  calendlySection: {
    heading: string;
    subheading: string;
  };
}

export interface IeoListingData {
  slug: string;
  title: string;
  metaDesc: string;
  hero: {
    heading: string;
    paragraphs: string[];
    cta: CtaAction;
    formHeading: string;
  };
  whyIeoOverIco: {
    heading: string;
    introParagraphs: string[];
    bulletsHeading: string;
    bullets: string[];
    closingParagraph: string;
    imageSrc: string;
    imageAlt: string;
  };
  servicesSection: {
    headingPrefix: string;
    headingAccent: string;
    subtitle: string;
    cards: {
      number: string;
      title: string;
      text?: string;
      bullets?: string[];
    }[];
  };
  benefitsSection: {
    heading: string;
    paragraphs: string[];
    bullets: string[];
    closingParagraph: string;
    imageSrc: string;
    imageAlt: string;
  };
  whoShouldUse: {
    heading: string;
    intro: string;
    bullets: string[];
    closing: string;
    imageSrc: string;
    imageAlt: string;
  };
  processSection: {
    headingPrefix: string;
    headingAccent: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      text: string;
      align: 'left' | 'right';
    }[];
  };
  whyEon8Section: {
    heading: string;
    paragraphs: string[];
    bullets: string[];
    closing: string;
    imageSrc: string;
    imageAlt: string;
  };
  finalCta: {
    tag: string;
    headingPrefix: string;
    headingAccent: string;
    paragraphs: string[];
    smallText: string;
    primaryCta: CtaAction;
    secondaryCta: CtaAction;
  };
}
