import type { NftElementorPageData, NftElementorSlug } from '../../types';

export const NFT_ELEMENTOR_LOADERS: Record<NftElementorSlug, () => Promise<NftElementorPageData>> = {
  'reddit-community-marketing-agency': () => import('./reddit-community-marketing-agency').then((m) => m.redditCommunityMarketingAgencyData),
  'discord-community-building-services': () => import('./discord-community-building-services').then((m) => m.discordCommunityBuildingServicesData),
};
