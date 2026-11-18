import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type VerticalTheme = 'brand' | 'ai' | 'crypto' | 'nft' | 'influencer';

export interface ThemePalette {
  heroBg: string;
  badgeBg: string;
  badgeText: string;
  accentText: string;
  primaryBtn: string;
  iconBg: string;
  iconText: string;
  ring: string;
  darkSectionBg: string;
  ctaGradient: string;
}

export const VERTICAL_THEMES: Record<VerticalTheme, ThemePalette> = {
  brand: {
    heroBg: 'bg-gradient-to-br from-[#06152d] via-[#0a2558] to-[#0053C6]',
    badgeBg: 'bg-orange-500/15 border-orange-400/30',
    badgeText: 'text-[#FD5900]',
    accentText: 'text-[#0053C6] dark:text-sky-400',
    primaryBtn: 'bg-[#FD5900] hover:bg-[#e55000] text-white shadow-orange-500/25',
    iconBg: 'bg-[#0053C6]/10 dark:bg-sky-500/15',
    iconText: 'text-[#0053C6] dark:text-sky-400',
    ring: 'focus-visible:ring-[#0053C6]',
    darkSectionBg: 'bg-gradient-to-br from-[#081226] via-[#0f1f3d] to-[#0b172e]',
    ctaGradient: 'bg-gradient-to-r from-[#003d99] via-[#0053C6] to-[#0264eb]',
  },
  ai: {
    heroBg: 'bg-gradient-to-br from-[#050d24] via-[#0b1e4d] to-[#1d4ed8]',
    badgeBg: 'bg-cyan-400/15 border-cyan-400/30',
    badgeText: 'text-cyan-300',
    accentText: 'text-indigo-600 dark:text-cyan-400',
    primaryBtn: 'bg-[#FD5900] hover:bg-[#e55000] text-white shadow-orange-500/25',
    iconBg: 'bg-indigo-600/10 dark:bg-cyan-500/15',
    iconText: 'text-indigo-600 dark:text-cyan-400',
    ring: 'focus-visible:ring-indigo-500',
    darkSectionBg: 'bg-gradient-to-br from-[#060d1f] via-[#0e1b38] to-[#131c3b]',
    ctaGradient: 'bg-gradient-to-r from-[#0b1e4d] via-[#1e3a8a] to-[#1d4ed8]',
  },
  crypto: {
    heroBg: 'bg-gradient-to-br from-[#0b0d13] via-[#171923] to-[#4a3700]',
    badgeBg: 'bg-amber-400/15 border-amber-400/35',
    badgeText: 'text-amber-400',
    accentText: 'text-amber-600 dark:text-amber-400',
    primaryBtn: 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25',
    iconBg: 'bg-amber-500/12 dark:bg-amber-400/15',
    iconText: 'text-amber-600 dark:text-amber-400',
    ring: 'focus-visible:ring-amber-500',
    darkSectionBg: 'bg-gradient-to-br from-[#0a0d14] via-[#121726] to-[#261e07]',
    ctaGradient: 'bg-gradient-to-r from-[#141720] via-[#2b2208] to-[#574100]',
  },
  nft: {
    heroBg: 'bg-gradient-to-br from-[#0d0821] via-[#24104f] to-[#6d1b7b]',
    badgeBg: 'bg-fuchsia-400/15 border-fuchsia-400/35',
    badgeText: 'text-fuchsia-300',
    accentText: 'text-purple-600 dark:text-fuchsia-400',
    primaryBtn: 'bg-[#FD5900] hover:bg-[#e55000] text-white shadow-orange-500/25',
    iconBg: 'bg-purple-600/10 dark:bg-fuchsia-500/15',
    iconText: 'text-purple-600 dark:text-fuchsia-400',
    ring: 'focus-visible:ring-purple-500',
    darkSectionBg: 'bg-gradient-to-br from-[#0f0a24] via-[#1f1147] to-[#3b0f4f]',
    ctaGradient: 'bg-gradient-to-r from-[#2e1065] via-[#6b21a8] to-[#be185d]',
  },
  influencer: {
    heroBg: 'bg-gradient-to-br from-[#2a0826] via-[#651249] to-[#a21caf]',
    badgeBg: 'bg-pink-400/15 border-pink-300/35',
    badgeText: 'text-pink-200',
    accentText: 'text-rose-600 dark:text-pink-400',
    primaryBtn: 'bg-[#FD5900] hover:bg-[#e55000] text-white shadow-orange-500/25',
    iconBg: 'bg-rose-600/10 dark:bg-pink-500/15',
    iconText: 'text-rose-600 dark:text-pink-400',
    ring: 'focus-visible:ring-rose-500',
    darkSectionBg: 'bg-gradient-to-br from-[#1f0821] via-[#3d0e36] to-[#591042]',
    ctaGradient: 'bg-gradient-to-r from-[#831843] via-[#9d174d] to-[#be123c]',
  },
};

export interface ActionItem {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline';
  opensModal?: boolean;
  external?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  iconSrc?: string;
  icon?: LucideIcon;
}

export interface FeatureCardItem {
  badge?: string;
  title: string;
  description?: ReactNode;
  bullets?: string[];
  bulletsLabel?: string;
  iconSrc?: string;
  iconAlt?: string;
  icon?: LucideIcon;
  href?: string;
  ctaLabel?: string;
}

export interface TabPanelItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  heading: string;
  description?: string;
  subItems?: { title: string; description: string }[];
  bullets?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export interface ProcessStepItem {
  step?: string;
  title: string;
  description: string;
  iconSrc?: string;
  icon?: LucideIcon;
}

export interface PricingRowItem {
  category?: string;
  feature: string;
  values: (boolean | string)[];
}

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

export interface TestimonialCardItem {
  name?: string;
  role?: string;
  quote: string;
  avatarSrc?: string;
  rating?: number;
  caseStudyHref?: string;
  caseStudyLabel?: string;
}
