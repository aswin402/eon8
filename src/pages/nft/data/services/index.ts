import type { NftServicePageData, NftWpSlug } from '../../types';

export const NFT_SERVICE_LOADERS: Record<NftWpSlug, () => Promise<NftServicePageData>> = {
  'nft-marketing-services': () => import('./nft-marketing-services').then((m) => m.nftMarketingServicesData),
  'nft-art-agency': () => import('./nft-art-agency').then((m) => m.nftArtAgencyData),
  'nft-collection-marketing': () => import('./nft-collection-marketing').then((m) => m.nftCollectionMarketingData),
  'nft-community-marketing': () => import('./nft-community-marketing').then((m) => m.nftCommunityMarketingData),
  'nft-game-marketing-services': () => import('./nft-game-marketing-services').then((m) => m.nftGameMarketingServicesData),
  'nft-game-marketing-agency': () => import('./nft-game-marketing-services').then((m) => m.nftGameMarketingServicesData),
  'nft-social-media-marketing': () => import('./nft-social-media-marketing').then((m) => m.nftSocialMediaMarketingData),
  'nft-pr-services': () => import('./nft-pr-services').then((m) => m.nftPrServicesData),
  'nft-telegram-marketing': () => import('./nft-telegram-marketing').then((m) => m.nftTelegramMarketingData),
  'nft-twitter-marketing': () => import('./nft-twitter-marketing').then((m) => m.nftTwitterMarketingData),
  'nft-youtube-marketing': () => import('./nft-youtube-marketing').then((m) => m.nftYoutubeMarketingData),
  'nft-reddit-marketing': () => import('./nft-reddit-marketing').then((m) => m.nftRedditMarketingData),
  'nft-game-discord-marketing': () => import('./nft-game-discord-marketing').then((m) => m.nftGameDiscordMarketingData),
  'discord-marketing-agency': () => import('./discord-marketing-agency').then((m) => m.discordMarketingAgencyData),
  'discord-game-marketing-agency': () => import('./discord-game-marketing-agency').then((m) => m.discordGameMarketingAgencyData),
  'discord-server-marketing': () => import('./discord-server-marketing').then((m) => m.discordServerMarketingData),
  'discord-moderation-services': () => import('./discord-moderation-services').then((m) => m.discordModerationServicesData),
  'nft-game-reddit-marketing': () => import('./nft-game-reddit-marketing').then((m) => m.nftGameRedditMarketingData),
  'pr-marketing-agency': () => import('./pr-marketing-agency').then((m) => m.prMarketingAgencyData),
  'nft-free-consultation': () => import('./nft-free-consultation').then((m) => m.nftFreeConsultationData),
};
