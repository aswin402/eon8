import type { RichNode } from '../crypto/types';

export type { RichNode };

export interface ImageAsset {
  src: string;
  alt: string;
  className?: string;
}

export interface ClientLogo {
  src: string;
  alt: string;
}

export interface CounterItem {
  value: string;
  label: string;
  removePlus?: boolean;
  isRed?: boolean;
}

export interface ServiceCardItem {
  iconSrc: string;
  iconAlt: string;
  iconSpanClass: string;
  title: string;
  titleClass?: string;
  description: string;
}

export interface CategoryIconItem {
  iconSrc: string;
  iconAlt: string;
  label: string;
}

export interface AdvantageCardItem {
  title: string;
  description: string;
}

export interface TimelineStep {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  inverted: boolean;
}

export interface StoryCardItem {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export interface FaqPanelItem {
  id: string;
  question: string;
  answers: RichNode[][];
  bullets?: RichNode[][];
  defaultOpen?: boolean;
}

export interface InfluencerAgencyPageData {
  slug: 'influencer-marketing-agency';
  title: string;
  metaDesc: string;
  hero: {
    headingLines: string[];
    paragraphs: RichNode[][];
    bulletColumns: string[][];
    ctaLabel: string;
    ctaHref: string;
    image: ImageAsset;
  };
  introSection: {
    heading: string;
    paragraphs: RichNode[][];
  };
  counters: CounterItem[];
  clientSliderHeading: string;
  clientLogos: ClientLogo[];
  whyEssential: {
    heading: string;
    paragraphs: RichNode[][];
  };
  services: {
    heading: string;
    items: ServiceCardItem[];
  };
  categories: {
    heading: string;
    items: CategoryIconItem[];
  };
  advantages: {
    heading: string;
    items: AdvantageCardItem[];
  };
  roadmap: {
    heading: string;
    ctaLabel: string;
    ctaHref: string;
    steps: TimelineStep[];
  };
  influencerValue: {
    heading: string;
    desktopCards: StoryCardItem[];
    mobileCards: StoryCardItem[];
  };
  solutions: {
    headingLines: string[];
    paragraphs: RichNode[][];
    bulletColumns: string[][];
    image: ImageAsset;
  };
  faq: {
    heading: string;
    items: FaqPanelItem[];
  };
  enquiry: {
    image: ImageAsset;
    formHeading: string;
    submitLabel: string;
  };
}

export interface InstagramCampaignResult {
  brandLogo: ImageAsset;
  metrics: {
    iconSrc: string;
    iconAlt: string;
    strongText: string;
    label: string;
  }[];
  description: string;
}

export interface InstagramInfluencerPageData {
  slug: 'instagram-influencer-marketing-agency';
  title: string;
  metaDesc: string;
  hero: {
    headingLines: string[];
    paragraphs: RichNode[][];
    bulletColumns: string[][];
    brandsHeading: string;
    ctaLabel: string;
    ctaHref: string;
    image: ImageAsset;
  };
  journeyCounters: {
    heading: string;
    items: CounterItem[];
  };
  clientSliderHeading: string;
  clientLogos: ClientLogo[];
  reelsSection: {
    heading: string;
    paragraphs: RichNode[][];
    videoSrc: string;
    videoWidth: number;
  };
  whyPartner: {
    heading: string;
    paragraphs: RichNode[][];
  };
  campaignResults: {
    heading: string;
    items: InstagramCampaignResult[];
  };
  growSection: {
    heading: string;
    paragraphs: RichNode[][];
  };
  services: {
    heading: string;
    items: ServiceCardItem[];
  };
  fixedSchedule: {
    ctaLabel: string;
    ctaHref: string;
  };
  solutions: {
    headingLines: string[];
    paragraphs: RichNode[][];
    bulletColumns: string[][];
    image: ImageAsset;
  };
  enquiry: {
    image: ImageAsset;
    formHeading: string;
    submitLabel: string;
  };
}

export interface CreatorPlatformStatItem {
  number: number;
  suffix: string;
  label: string;
}

export interface CreatorAlternatingRow {
  layout: 'text-left' | 'image-left';
  heading: string;
  body: RichNode[];
  image: ImageAsset;
}

export interface CreatorServiceCard {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export interface CreatorApproachCard {
  iconSrc: string;
  iconAlt: string;
  title: string;
}

export interface CreatorPlatformPageData {
  slug: 'tiktok-influencer-marketing' | 'youtube-influencer-services';
  title: string;
  metaDesc: string;
  hero: {
    heading: string;
    leadParagraphs: RichNode[][];
    leftChecks: string[];
    rightChecks: string[];
  };
  statsSection: {
    heading: string;
    subheading: string;
    stats: CreatorPlatformStatItem[];
  };
  callbackBar: {
    heading: string;
    phonePlaceholder: string;
    submitLabel: string;
  };
  brandCarousel: {
    logos: ImageAsset[];
  };
  whyAlternating?: {
    heading: string;
    rows: CreatorAlternatingRow[];
  };
  servicesSection: {
    heading: string;
    rows: {
      cards: CreatorServiceCard[];
    }[];
  };
  centerEditorial: {
    heading: string;
    paragraphs: RichNode[][];
  };
  growthPartnerHeader: {
    heading: string;
  };
  growthPartnerFeatures: {
    items: {
      iconSrc: string;
      iconAlt: string;
      title: string;
      description: string;
    }[];
    illustration: ImageAsset;
  };
  approachGrid: {
    heading: string;
    rows: {
      cards: CreatorApproachCard[];
    }[];
  };
}

export interface TwitterInfluencerPageData {
  slug: 'twitter-influencer-marketing';
  title: string;
  metaDesc: string;
  hero: {
    headingLines: string[];
    subheading: string;
    bulletColumns: string[][];
    ctas: { label: string; href: string; isExternal?: boolean; iconClass?: string }[];
    formHeading: string;
    formSubmitLabel: string;
  };
  benefitsSection: {
    heading: string;
    items: { iconClass: string; title: string; description: string }[];
  };
  boostSplit: {
    headingLines: string[];
    intro: RichNode[];
    image: ImageAsset;
    bullets: { title: string; text: string }[];
  };
  specializedCards: {
    headingLines: string[];
    cards: { iconSrc: string; iconAlt: string; title: string; description: string }[];
  };
  calibratedFeatures: {
    headingLines: string[];
    subheading: string;
    items: { iconSrc: string; iconAlt: string; title: string; description: string }[];
  };
  ctaBanner: {
    headingText: string;
    subtext: string;
    buttonLabel: string;
    buttonHref: string;
  };
  processGrid: {
    headingLines: string[];
    items: {
      iconSrc: string;
      iconAlt: string;
      iconSpanClass: string;
      title: string;
      description: string;
    }[];
  };
  scaleSplit: {
    headingLines: string[];
    paragraphs: RichNode[][];
    image: ImageAsset;
  };
  faq: {
    heading: string;
    items: FaqPanelItem[];
  };
  calendly: {
    heading: string;
    subheading: string;
    callTitle: string;
    callDescription: string;
  };
  bottomEnquiry: {
    headingLines: string[];
    description: RichNode[];
    formHeading: string;
    formSubmitLabel: string;
    stats: { value: string; label: string }[];
  };
  disclaimer: string;
}
