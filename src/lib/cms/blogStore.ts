import { create } from 'zustand';
import {
  BLOG_CATEGORY_PAIRS,
  blogPostsIndex,
  blogPostsBySlug,
  loadBlogPost,
  type BlogCategoryPair,
  type BlogPostSummary,
} from '@/pages/blog/blogPostsData';
import { ALL_SERVICE_SLUGS } from '@/pages/services/types';
import { cmsProvider } from './provider';
import { formatDisplayDate, slugifyText, todayIsoDate } from './richTextCodec';
import type {
  BulkPostMutation,
  CmsAdminSession,
  CmsBlogPostRecord,
  CmsBlogSummaryRecord,
  CmsPublicStatePayload,
  ManagedBlogPost,
  ManagedBlogSummary,
} from './types';

export const ADMIN_DASHBOARD_PATH = (
  import.meta.env.VITE_ADMIN_PATH || '/admin-dashboard'
).replace(/\/+$/, '') || '/admin-dashboard';

const STATIC_IDS_SET = new Set<number>(blogPostsIndex.map((p) => p.id));

const RESERVED_NON_BLOG_SLUGS = new Set<string>([
  ...ALL_SERVICE_SLUGS,
  'about',
  'about-us',
  'contact',
  'thank-you',
  'blog',
  'digital-marketing-blog',
  'works',
  'ai-agent-development-services',
  'ai-video-creation',
  'ai-video-agency',
  'chatgpt-ads-agency',
  'crypto-marketing-agency',
  'influencer-marketing-agency',
  'nft-marketing-services',
  ADMIN_DASHBOARD_PATH.replace(/^\/+/, ''),
]);

function mergeCategories(
  customCategories: BlogCategoryPair[],
  deletedCategorySlugs: string[]
): BlogCategoryPair[] {
  const deleted = new Set(deletedCategorySlugs.map((s) => s.toLowerCase()));
  const bySlug = new Map<string, BlogCategoryPair>();

  for (const pair of BLOG_CATEGORY_PAIRS) {
    if (!deleted.has(pair.slug.toLowerCase())) {
      bySlug.set(pair.slug.toLowerCase(), pair);
    }
  }
  for (const pair of customCategories) {
    if (!deleted.has(pair.slug.toLowerCase())) {
      bySlug.set(pair.slug.toLowerCase(), pair);
    }
  }

  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function mergeCatalog(
  statePayload: CmsPublicStatePayload,
  includeDrafts: boolean
): ManagedBlogSummary[] {
  const deletedIds = new Set<number>(statePayload.deletedPostIds);
  const deletedSlugs = new Set<string>(statePayload.deletedSlugs);
  const upsertedById = statePayload.upsertedSummaries;
  const merged: ManagedBlogSummary[] = [];
  const handledStaticIds = new Set<number>();

  // 1. Add upserted records (both newly created CMS posts and edited static posts)
  for (const summary of Object.values(upsertedById)) {
    handledStaticIds.add(summary.id);
    if (deletedIds.has(summary.id)) continue;
    if (!includeDrafts && summary.status !== 'published') continue;

    merged.push({
      id: summary.id,
      slug: summary.slug,
      originalSlug: summary.originalSlug,
      title: summary.title,
      category: summary.category,
      categories: summary.categories?.length ? summary.categories : [summary.category],
      date: summary.date,
      dateIso: summary.dateIso,
      readTime: summary.readTime,
      author: summary.author,
      thumbnail: summary.thumbnail,
      excerpt: summary.excerpt,
      status: summary.status,
      featured: Boolean(summary.featured),
      seo: summary.seo,
      updatedAt: summary.updatedAt,
      source: STATIC_IDS_SET.has(summary.id) ? 'edited-static' : 'cms',
    });
  }

  // 2. Add unmodified static posts
  for (const post of blogPostsIndex) {
    if (handledStaticIds.has(post.id)) continue;
    if (deletedIds.has(post.id) || deletedSlugs.has(post.slug)) continue;

    merged.push({
      ...post,
      status: 'published',
      featured: false,
      source: 'static',
    });
  }

  // Sort featured/chronological cleanly by dateIso descending, then id descending
  merged.sort((a, b) => {
    const cmp = (b.dateIso || '').localeCompare(a.dateIso || '');
    if (cmp !== 0) return cmp;
    return b.id - a.id;
  });

  return merged;
}

interface BlogCmsStoreState {
  publicReady: boolean;
  adminReady: boolean;
  sessionChecked: boolean;
  session: CmsAdminSession;

  publishedPosts: ManagedBlogSummary[];
  publishedBySlug: Record<string, ManagedBlogSummary>;
  adminPosts: ManagedBlogSummary[];
  deletedStaticPosts: BlogPostSummary[];
  categories: BlogCategoryPair[];
  slugRedirects: Record<string, string>;

  initPublic: (force?: boolean) => Promise<void>;
  checkSession: () => Promise<CmsAdminSession>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changeCredentials: (params: {
    currentPassword: string;
    newEmail: string;
    newPassword: string;
  }) => Promise<void>;

  refreshAdmin: () => Promise<void>;
  loadPostForDisplay: (slug: string, allowDraftPreview?: boolean) => Promise<ManagedBlogPost | null>;
  loadPostForEditor: (summary: ManagedBlogSummary) => Promise<CmsBlogPostRecord>;
  createBlankPostDraft: () => CmsBlogPostRecord;
  checkSlugConflict: (candidateSlug: string, currentPostId: number) => string | null;

  savePost: (post: CmsBlogPostRecord) => Promise<CmsBlogPostRecord>;
  quickUpdatePostMeta: (
    summary: ManagedBlogSummary,
    patch: Partial<Pick<CmsBlogPostRecord, 'status' | 'featured'>>
  ) => Promise<void>;
  duplicatePost: (summary: ManagedBlogSummary) => Promise<CmsBlogPostRecord>;
  deletePost: (id: number, slug: string) => Promise<void>;
  restoreStaticPost: (id: number, slug: string) => Promise<void>;
  bulkMutate: (mutation: BulkPostMutation) => Promise<void>;

  createCategory: (name: string) => Promise<BlogCategoryPair>;
  renameCategory: (oldSlug: string, newName: string) => Promise<BlogCategoryPair>;
  deleteCategory: (slug: string) => Promise<void>;
}

const initialPublishedPosts: ManagedBlogSummary[] = blogPostsIndex.map((p) => ({
  ...p,
  status: 'published',
  featured: false,
  source: 'static',
}));

const initialPublishedBySlug: Record<string, ManagedBlogSummary> = Object.fromEntries(
  initialPublishedPosts.map((p) => [p.slug, p])
);

function buildSlugMap(posts: ManagedBlogSummary[]): Record<string, ManagedBlogSummary> {
  return Object.fromEntries(posts.map((p) => [p.slug, p]));
}

function computeDeletedStaticList(
  deletedIds: number[],
  deletedSlugs: string[],
  upsertedSummaries: Record<string, CmsBlogSummaryRecord>
): BlogPostSummary[] {
  const idSet = new Set(deletedIds);
  const slugSet = new Set(deletedSlugs);
  const activeUpsertIds = new Set(Object.values(upsertedSummaries).map((p) => p.id));

  return blogPostsIndex.filter(
    (p) => !activeUpsertIds.has(p.id) && (idSet.has(p.id) || slugSet.has(p.slug))
  );
}

let publicInitPromise: Promise<void> | null = null;

export const useBlogCmsStore = create<BlogCmsStoreState>((set, get) => ({
  publicReady: false,
  adminReady: false,
  sessionChecked: false,
  session: {
    authenticated: false,
    mode: 'node-api',
  },

  publishedPosts: initialPublishedPosts,
  publishedBySlug: initialPublishedBySlug,
  adminPosts: initialPublishedPosts,
  deletedStaticPosts: [],
  categories: BLOG_CATEGORY_PAIRS,
  slugRedirects: {},

  initPublic: async (force = false) => {
    if (get().publicReady && !force) return;
    if (publicInitPromise && !force) return publicInitPromise;

    publicInitPromise = (async () => {
      try {
        const pubState = await cmsProvider.fetchPublicState();
        const publishedPosts = mergeCatalog(pubState, false);
        const categories = mergeCategories(
          pubState.customCategories,
          pubState.deletedCategorySlugs
        );
        set({
          publicReady: true,
          publishedPosts,
          publishedBySlug: buildSlugMap(publishedPosts),
          categories,
          slugRedirects: pubState.slugRedirects,
        });
      } catch {
        set({ publicReady: true });
      } finally {
        publicInitPromise = null;
      }
    })();

    return publicInitPromise;
  },

  checkSession: async () => {
    try {
      const session = await cmsProvider.getSession();
      set({ session, sessionChecked: true });
      // A user with a temporary password must change it before loading admin data.
      if (session.authenticated && !session.admin?.mustChangePassword) {
        await get().refreshAdmin();
      }
      return session;
    } catch {
      const fallback: CmsAdminSession = { authenticated: false, mode: cmsProvider.mode };
      set({ session: fallback, sessionChecked: true });
      return fallback;
    }
  },

  login: async (email: string, password: string) => {
    const session = await cmsProvider.login(email, password);
    set({ session, sessionChecked: true });
    if (!session.admin?.mustChangePassword) {
      await get().refreshAdmin();
    }
  },

  logout: async () => {
    await cmsProvider.logout();
    set({
      session: { authenticated: false, mode: cmsProvider.mode },
      adminReady: false,
    });
  },

  changeCredentials: async (params) => {
    const session = await cmsProvider.changeCredentials(params);
    set({ session });
    if (session.authenticated && !session.admin?.mustChangePassword && !get().adminReady) {
      await get().refreshAdmin();
    }
  },

  refreshAdmin: async () => {
    const adminState = await cmsProvider.fetchAdminState();
    const adminPosts = mergeCatalog(adminState, true);

    // Also compute published list directly from adminState so public & admin stay 100% synced
    const pubOnlySummaries: Record<string, CmsBlogSummaryRecord> = {};
    for (const [k, v] of Object.entries(adminState.upsertedSummaries)) {
      if (v.status === 'published') pubOnlySummaries[k] = v;
    }
    const publishedPosts = mergeCatalog(
      { ...adminState, upsertedSummaries: pubOnlySummaries },
      false
    );
    const categories = mergeCategories(
      adminState.customCategories,
      adminState.deletedCategorySlugs
    );
    const deletedStaticPosts = computeDeletedStaticList(
      adminState.deletedPostIds,
      adminState.deletedSlugs,
      adminState.upsertedSummaries
    );

    set({
      adminReady: true,
      publicReady: true,
      adminPosts,
      publishedPosts,
      publishedBySlug: buildSlugMap(publishedPosts),
      deletedStaticPosts,
      categories,
      slugRedirects: adminState.slugRedirects,
    });
  },

  loadPostForDisplay: async (slug: string, allowDraftPreview = false) => {
    await get().initPublic();

    if (allowDraftPreview && get().session.authenticated) {
      if (!get().adminReady) {
        await get().refreshAdmin();
      }
      const adminMatch = get().adminPosts.find((p) => p.slug === slug);
      if (adminMatch) {
        if (adminMatch.source !== 'static') {
          const full = await cmsProvider.fetchAdminPost(adminMatch.id);
          if (full) {
            return { ...adminMatch, blocks: full.blocks };
          }
        }
        const staticLoaded = await loadBlogPost(adminMatch.originalSlug || adminMatch.slug);
        if (staticLoaded) {
          return { ...adminMatch, blocks: staticLoaded.blocks };
        }
      }
    }

    const summary = get().publishedBySlug[slug];
    if (!summary) return null;

    if (summary.source !== 'static') {
      const cmsPost = await cmsProvider.fetchPublicPost(slug);
      if (cmsPost) {
        return { ...summary, blocks: cmsPost.blocks };
      }
    }

    const lookupSlug = summary.originalSlug || summary.slug;
    const staticPost = await loadBlogPost(lookupSlug);
    if (!staticPost) return null;
    return {
      ...summary,
      blocks: staticPost.blocks,
    };
  },

  loadPostForEditor: async (summary: ManagedBlogSummary) => {
    if (summary.source !== 'static') {
      const saved = await cmsProvider.fetchAdminPost(summary.id);
      if (saved) return saved;
    }

    const lookupSlug = summary.originalSlug || summary.slug;
    const baseline = blogPostsBySlug[lookupSlug];
    const loaded = await loadBlogPost(lookupSlug);
    const nowIso = new Date().toISOString();

    return {
      id: summary.id,
      slug: summary.slug,
      originalSlug: baseline?.slug || summary.originalSlug || summary.slug,
      title: summary.title,
      status: summary.status,
      featured: summary.featured,
      category: summary.category,
      categories: summary.categories?.length ? summary.categories : [summary.category],
      date: summary.date,
      dateIso: summary.dateIso,
      readTime: summary.readTime,
      author: summary.author,
      thumbnail: summary.thumbnail,
      excerpt: summary.excerpt,
      seo: summary.seo ?? {
        metaTitle: summary.title,
        metaDescription: summary.excerpt,
        ogImage: summary.thumbnail,
      },
      createdAt: nowIso,
      updatedAt: summary.updatedAt || nowIso,
      blocks: loaded?.blocks ? structuredClone(loaded.blocks) : [],
    };
  },

  createBlankPostDraft: () => {
    const iso = todayIsoDate();
    const nowIso = new Date().toISOString();
    const defaultCategory = get().categories[0]?.name || 'Digital Marketing';
    return {
      id: Date.now(),
      slug: '',
      title: '',
      status: 'published',
      featured: false,
      category: defaultCategory,
      categories: [defaultCategory],
      date: formatDisplayDate(iso),
      dateIso: iso,
      readTime: '3 min read',
      author: 'Eon8 Editorial',
      thumbnail: '',
      excerpt: '',
      seo: {
        metaTitle: '',
        metaDescription: '',
        ogImage: '',
      },
      createdAt: nowIso,
      updatedAt: nowIso,
      blocks: [
        {
          type: 'heading',
          level: 2,
          text: 'Introduction',
        },
        {
          type: 'paragraph',
          content: ['Write your opening insights here...'],
        },
      ],
    };
  },

  checkSlugConflict: (candidateSlug: string, currentPostId: number) => {
    const clean = slugifyText(candidateSlug);
    if (!clean) return 'Slug cannot be empty.';
    if (RESERVED_NON_BLOG_SLUGS.has(clean)) {
      return `"/${clean}" is a reserved Eon8 page/service slug. Choose a slightly more specific blog slug.`;
    }
    const duplicate = get().adminPosts.find(
      (p) => p.slug === clean && p.id !== currentPostId
    );
    if (duplicate) {
      return `Already used by "${duplicate.title}".`;
    }
    return null;
  },

  savePost: async (post: CmsBlogPostRecord) => {
    const saved = await cmsProvider.savePost(post);
    await get().refreshAdmin();
    return saved;
  },

  quickUpdatePostMeta: async (summary, patch) => {
    const full = await get().loadPostForEditor(summary);
    await cmsProvider.savePost({
      ...full,
      ...patch,
    });
    await get().refreshAdmin();
  },

  duplicatePost: async (summary) => {
    const source = await get().loadPostForEditor(summary);
    const iso = todayIsoDate();
    const nowIso = new Date().toISOString();
    const baseSlug = slugifyText(`${source.slug}-copy`);
    let uniqueSlug = baseSlug;
    let counter = 2;
    while (get().adminPosts.some((p) => p.slug === uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const copyRecord: CmsBlogPostRecord = {
      ...source,
      id: Date.now(),
      slug: uniqueSlug,
      originalSlug: undefined,
      title: `${source.title} (Copy)`,
      status: 'draft',
      featured: false,
      dateIso: iso,
      date: formatDisplayDate(iso),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    const saved = await cmsProvider.savePost(copyRecord);
    await get().refreshAdmin();
    return saved;
  },

  deletePost: async (id: number, slug: string) => {
    await cmsProvider.deletePost(id, slug);
    await get().refreshAdmin();
  },

  restoreStaticPost: async (id: number, slug: string) => {
    await cmsProvider.restoreDeletedStaticPost(id, slug);
    await get().refreshAdmin();
  },

  bulkMutate: async (mutation: BulkPostMutation) => {
    await cmsProvider.bulkMutate(mutation);
    await get().refreshAdmin();
  },

  createCategory: async (name: string) => {
    const created = await cmsProvider.upsertCategory(name);
    await get().refreshAdmin();
    return created;
  },

  renameCategory: async (oldSlug: string, newName: string) => {
    const updated = await cmsProvider.renameCategory(oldSlug, newName);
    await get().refreshAdmin();
    return updated;
  },

  deleteCategory: async (slug: string) => {
    await cmsProvider.deleteCategory(slug);
    await get().refreshAdmin();
  },
}));

export function resolveCategorySlug(
  categoryName: string,
  categories: BlogCategoryPair[]
): string {
  const lower = categoryName.trim().toLowerCase();
  const match = categories.find((c) => c.name.toLowerCase() === lower);
  if (match) return match.slug;
  return slugifyText(categoryName);
}

export function resolveCategoryNameFromSlug(
  categorySlug: string,
  categories: BlogCategoryPair[]
): string | null {
  const clean = categorySlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  const match = categories.find((c) => c.slug.toLowerCase() === clean);
  return match?.name ?? null;
}
