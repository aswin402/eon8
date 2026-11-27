/** Kinds of article the editorial studio publishes. Each has its own list page and URL. */
export type PostType = 'post' | 'news' | 'newsletter';

export const POST_TYPES: Record<
  PostType,
  { label: string; plural: string; base: string; badge: string; heading: string; intro: string; seoTitle: string; seoDescription: string }
> = {
  post: {
    label: 'Blog post',
    plural: 'Articles',
    base: '/blog',
    badge: 'EON8 Knowledge Hub',
    heading: 'Insights, Playbooks & Growth Research',
    intro: 'in-depth articles covering SEO, AI Agents, Performance Marketing, Reputation Management, and Web3 growth.',
    seoTitle: 'Digital Marketing Blogs & Social Media Blogs Provider in Chennai',
    seoDescription:
      'Stay updated with the latest news, events, and other interesting information on Digital Marketing, AI Agents, SEO, Social Media, and Web3 from Eon8.',
  },
  news: {
    label: 'News',
    plural: 'News',
    base: '/news',
    badge: 'EON8 Newsroom',
    heading: 'News & Announcements',
    intro: 'updates from EON8: launches, partnerships, awards and company news.',
    seoTitle: 'News & Announcements | EON8',
    seoDescription: 'The latest EON8 news: launches, partnerships, awards and company announcements.',
  },
  newsletter: {
    label: 'Newsletter',
    plural: 'Newsletters',
    base: '/newsletter',
    badge: 'EON8 Newsletter',
    heading: 'The EON8 Newsletter',
    intro: 'newsletter issues with marketing trends, playbooks and EON8 updates.',
    seoTitle: 'Newsletter Archive | EON8',
    seoDescription: 'Read every issue of the EON8 newsletter: digital marketing trends, playbooks and agency updates.',
  },
};

export const postTypeOf = (p: { postType?: string | null } | null | undefined): PostType =>
  p?.postType === 'news' || p?.postType === 'newsletter' ? p.postType : 'post';

export const postUrl = (p: { slug: string; postType?: string | null }) => `${POST_TYPES[postTypeOf(p)].base}/${p.slug}`;
