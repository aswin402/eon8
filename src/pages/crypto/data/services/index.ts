import type { CryptoServicePageData } from '../../types';

export const CRYPTO_SERVICE_LOADERS: Record<string, () => Promise<CryptoServicePageData>> = {
  'crypto-pr-services': () => import('./crypto-pr-services').then((m) => m.cryptoPrServicesData),
  'crypto-influencer-marketing': () => import('./crypto-influencer-marketing').then((m) => m.cryptoInfluencerMarketingData),
  'crypto-telegram-marketing': () => import('./crypto-telegram-marketing').then((m) => m.cryptoTelegramMarketingData),
  'crypto-community-marketing': () => import('./crypto-community-marketing').then((m) => m.cryptoCommunityMarketingData),
  'crypto-video-creation-marketing': () => import('./crypto-video-creation-marketing').then((m) => m.cryptoVideoCreationMarketingData),
  'crypto-twitter-influencer-marketing': () => import('./crypto-twitter-influencer-marketing').then((m) => m.cryptoTwitterInfluencerMarketingData),
  'ico-marketing-agency': () => import('./ico-marketing-agency').then((m) => m.icoMarketingAgencyData),
  'ido-marketing-agency': () => import('./ido-marketing-agency').then((m) => m.idoMarketingAgencyData),
  'ieo-marketing-agency': () => import('./ieo-marketing-agency').then((m) => m.ieoMarketingAgencyData),
  'crypto-kol-agency': () => import('./crypto-kol-agency').then((m) => m.cryptoKolAgencyData),
  'sto-marketing-agency': () => import('./sto-marketing-agency').then((m) => m.stoMarketingAgencyData),
  'ico-listing-services': () => import('./ico-listing-services').then((m) => m.icoListingServicesData),
};
