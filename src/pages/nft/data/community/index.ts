import type { NftCommunityPageData, NftCommunitySlug } from '../../types';

export const NFT_COMMUNITY_LOADERS: Record<NftCommunitySlug, () => Promise<NftCommunityPageData>> = {
  'reddit-community-marketing-agency': () =>
    import('./reddit-community-marketing-agency').then((m) => m.redditCommunityMarketingAgencyData),
  'discord-community-building-services': () =>
    import('./discord-community-building-services').then((m) => m.discordCommunityBuildingServicesData),
};
