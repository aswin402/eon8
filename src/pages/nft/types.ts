import type { ClientLogoItem, FaqEntry, RichNode } from '../crypto/types';

export type { ClientLogoItem, FaqEntry, RichNode };

export type NftWpSlug =
  | 'nft-marketing-services'
  | 'nft-art-agency'
  | 'nft-collection-marketing'
  | 'nft-community-marketing'
  | 'nft-game-marketing-services'
  | 'nft-game-marketing-agency'
  | 'nft-social-media-marketing'
  | 'nft-pr-services'
  | 'nft-telegram-marketing'
  | 'nft-twitter-marketing'
  | 'nft-youtube-marketing'
  | 'nft-reddit-marketing'
  | 'nft-game-discord-marketing'
  | 'discord-marketing-agency'
  | 'discord-game-marketing-agency'
  | 'discord-server-marketing'
  | 'discord-moderation-services'
  | 'nft-game-reddit-marketing'
  | 'pr-marketing-agency'
  | 'nft-free-consultation';

export type NftCommunitySlug =
  | 'reddit-community-marketing-agency'
  | 'discord-community-building-services';

export type NftSlug = NftWpSlug | NftCommunitySlug;

export interface NftImageAsset {
  src: string;
  alt: string;
  className?: string;
}

export interface NftCtaButton {
  label: string;
  href: string;
  className?: string;
  opensModal?: boolean;
  isExternal?: boolean;
  iconClass?: string;
  imgSrc?: string;
}

export interface NftHeroSection {
  sectionId?: string;
  sectionClass: string;
  headingLines: string[];
  paragraphs: RichNode[][];
  bulletColumns: string[][];
  ctas: NftCtaButton[];
  image?: NftImageAsset;
  heroForm?: {
    wrapperClass: string;
    heading?: string;
    submitLabel: string;
    extraButtons?: NftCtaButton[];
  };
}

export interface NftThemedCard {
  colClass?: string;
  topBarClass?: string;
  iconWrapClass?: string;
  iconClass?: string;
  iconImg?: NftImageAsset;
  emoji?: string;
  tag?: string;
  title: string;
  paragraphs: RichNode[][];
  button?: NftCtaButton;
}

export interface NftServiceCardItem {
  colClass?: string;
  cardClass: string;
  iconSpanClass?: string;
  iconImg?: NftImageAsset;
  title: string;
  headingTag?: 'h3' | 'h5';
  paragraphs: RichNode[][];
}

export interface NftTestimonialCard {
  id?: string;
  avatarSrc: string;
  avatarAlt: string;
  stars: number;
  name: string;
  quote: string;
  button?: NftCtaButton;
}

export interface NftPackageRow {
  isHeader?: boolean;
  isSubHeader?: boolean;
  isNote?: boolean;
  cells: {
    tag?: 'th' | 'td';
    text?: string;
    icon?: 'check' | 'times';
    className?: string;
    rowSpan?: number;
    colSpan?: number;
  }[];
}

export type NftSectionBlock =
  | {
      kind: 'intro-centered';
      headingTag: 'h1' | 'h2';
      heading: string;
      paragraphs: RichNode[][];
      buttons?: NftCtaButton[];
    }
  | {
      kind: 'viral-hero';
      sectionClass: string;
      containerClass: string;
      layout: 'two-col-split' | 'floating-center';
      badge?: string;
      subtitle?: string;
      heading: string;
      headingBrLines?: string[];
      paragraphs: RichNode[][];
      buttons?: NftCtaButton[];
      image?: NftImageAsset;
      sideLeftImages?: NftImageAsset[];
      sideRightImages?: NftImageAsset[];
      contentColClass?: string;
      imageColClass?: string;
    }
  | {
      kind: 'strategy-split';
      sectionId?: string;
      sectionClass: string;
      containerClass: string;
      wrapperClass: string;
      leftClass: string;
      rightClass: string;
      itemClass: string;
      contentClass: string;
      headingLines: string[];
      subheading: string;
      items: { title: string; description: string }[];
    }
  | {
      kind: 'themed-card-grid';
      sectionClass: string;
      containerClass: string;
      headingWrapClass?: string;
      badge?: string;
      heading: string;
      headingHighlight?: string;
      subheading?: string;
      gridClass: string;
      cardClass: string;
      isSplitProcess?: boolean;
      cards: NftThemedCard[];
    }
  | {
      kind: 'nft-overview';
      sectionClass: string;
      heading: string;
      subheading?: string;
      items: {
        iconSrc: string;
        iconAlt: string;
        useTargetSvg?: boolean;
        title: string;
        description: string;
      }[];
    }
  | {
      kind: 'nova-steps';
      sectionClass: string;
      heading: string;
      subheading: string;
      steps: { number: string; title: string; description: string }[];
    }
  | {
      kind: 'timeline-roadmap';
      sectionClass: string;
      heading: string;
      subheading?: string;
      steps: {
        iconSrc: string;
        iconAlt: string;
        title: string;
        description: string;
        inverted: boolean;
      }[];
      buttons?: NftCtaButton[];
    }
  | {
      kind: 'evolution-cards';
      sectionClass: string;
      heading: string;
      cards: { iconSrc: string; iconAlt: string; title: string; description: string }[];
    }
  | {
      kind: 'pr-white-editorial';
      variant: 'pr-white' | 'global-white';
      sectionClass: string;
      image?: NftImageAsset;
      headingPrefix: string;
      headingAccent: string;
      subheading: string;
      paragraphs: RichNode[][];
    }
  | {
      kind: 'spectacular-split';
      sectionClass: string;
      image?: NftImageAsset;
      imageOnRight?: boolean;
      heading: string;
      paragraphs: RichNode[][];
      subheadings?: string[];
      checklistColumns?: string[][];
      bullets?: RichNode[][];
      buttons?: NftCtaButton[];
    }
  | {
      kind: 'service-cards';
      sectionClass: string;
      rowWrapClass?: string;
      heading: string;
      subheading?: string;
      paragraphs?: RichNode[][];
      cards: NftServiceCardItem[];
      buttons?: NftCtaButton[];
    }
  | {
      kind: 'editorial-copy';
      sectionClass: string;
      heading: string;
      subheading?: string;
      paragraphs: RichNode[][];
      checklistColumns?: string[][];
      image?: NftImageAsset;
      buttons?: NftCtaButton[];
    }
  | {
      kind: 'cta-band';
      variant: 'nft-cta' | 'nft-cta-2' | 'blue-cta' | 'subPerposal' | 'cta1';
      sectionClass: string;
      heading: string;
      headingAccent?: string;
      subtext?: string;
      image?: NftImageAsset;
      buttons: NftCtaButton[];
    }
  | {
      kind: 'testimonials-slider';
      heading: string;
      subheading?: string;
      cards: NftTestimonialCard[];
      videoFeature?: {
        sectionClass: string;
        heading: string;
        description: string;
        videoSrc: string;
        videoTitle: string;
      };
      ctaButtons: NftCtaButton[];
    }
  | {
      kind: 'video-feature';
      sectionClass: string;
      heading: string;
      description: string;
      videoSrc: string;
      videoTitle: string;
    }
  | {
      kind: 'image-banner';
      sectionClass: string;
      containerClass: string;
      heading: string;
      image: NftImageAsset;
    }
  | {
      kind: 'discord-cards';
      sectionId: string;
      sectionClass: string;
      heading: string;
      cards: {
        headerClass: string;
        iconImg: NftImageAsset;
        title: string;
        description: string;
      }[];
    }
  | {
      kind: 'package-table';
      sectionId?: string;
      sectionClass: string;
      heading: string;
      mainRows: NftPackageRow[];
      noteText?: string;
    }
  | {
      kind: 'extra-slider';
      heading?: string;
      logos: ClientLogoItem[];
    }
  | {
      kind: 'faq';
      variant: 'accordion' | 'white-faq';
      sectionClass: string;
      heading: string;
      subheading?: string;
      items: FaqEntry[];
    }
  | {
      kind: 'calendly';
      sectionClass: string;
      heading: string;
      subheading?: string;
      callTitle?: string;
      callDescription?: string;
      variant: 'light' | 'blue' | 'dark';
    };

export interface NftBottomEnquiryData {
  sectionClass: string;
  mode: 'gradient-nft' | 'contact-nft';
  headingTag: 'h1' | 'h2';
  heading: string;
  subheading?: string;
  paragraphs: RichNode[][];
  bullets: string[];
  trailingParagraphs: RichNode[][];
  stats: { value: string; label: string }[];
  leftImage?: NftImageAsset;
  formMode: 'callback-4' | 'proposal-6' | 'consultation-11';
  formHeading?: string;
  formSubmitLabel: string;
}

export interface NftServicePageData {
  slug: NftWpSlug;
  title: string;
  metaDesc: string;
  stickyOffer?: NftImageAsset;
  hero?: NftHeroSection;
  clientSlider?: {
    heading: string;
    logos: ClientLogoItem[];
  };
  sections: NftSectionBlock[];
  hasConsultationModal: boolean;
  modalVariant: 'default' | 'blue';
  modalHeading: string;
  modalSubmitLabel: string;
  bottomEnquiry?: NftBottomEnquiryData;
  disclaimer?: {
    sectionClass: string;
    text: string;
  };
}

export interface NftCommunityStatItem {
  number: string;
  suffix: string;
  label: string;
  isRed?: boolean;
}

export interface NftCommunityProcessCard {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export interface NftCommunityGrowthFeature {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export interface NftCommunityApproachCard {
  iconSrc: string;
  iconAlt: string;
  title: string;
}

export interface NftCommunityPageData {
  slug: NftCommunitySlug;
  title: string;
  metaDesc: string;
  hero: {
    heading: string;
    paragraphs: RichNode[][];
    bulletColumns: string[][];
    formSubmitLabel: string;
  };
  statsSection: {
    heading: string;
    subheading: string;
    stats: NftCommunityStatItem[];
  };
  callbackBar: {
    heading: string;
    submitLabel: string;
  };
  brandCarousel: {
    logos: NftImageAsset[];
  };
  whyAlternating: {
    heading: string;
    subheading: string;
    rows: {
      cards: NftCommunityProcessCard[];
    }[];
  };
  servicesSection: {
    heading: string;
    paragraphs: RichNode[][];
  };
  growthPartnerHeader: {
    heading: string;
  };
  growthPartnerFeatures: {
    items: NftCommunityGrowthFeature[];
    illustration: NftImageAsset;
  };
  approachGrid: {
    heading: string;
    rows: {
      cards: NftCommunityApproachCard[];
    }[];
  };
  calendlySection: {
    heading: string;
    callTitle: string;
    callDescription: string;
  };
}
