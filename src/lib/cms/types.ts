import type { ArticleBlock, BlogCategoryPair, BlogPostSummary } from '@/pages/blog/blogPostsData';

export type BlogPostStatus = 'published' | 'draft';

export interface BlogSeoMeta {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface CmsBlogPostRecord extends BlogPostSummary {
  status: BlogPostStatus;
  featured: boolean;
  seo?: BlogSeoMeta;
  originalSlug?: string;
  createdAt: string;
  updatedAt: string;
  blocks: ArticleBlock[];
}

export type CmsBlogSummaryRecord = Omit<CmsBlogPostRecord, 'blocks'>;

export interface ManagedBlogSummary extends BlogPostSummary {
  status: BlogPostStatus;
  featured: boolean;
  seo?: BlogSeoMeta;
  originalSlug?: string;
  updatedAt?: string;
  source: 'static' | 'cms' | 'edited-static';
}

export interface ManagedBlogPost extends ManagedBlogSummary {
  blocks: ArticleBlock[];
}

export interface CmsPublicStatePayload {
  version: number;
  upsertedSummaries: Record<string, CmsBlogSummaryRecord>;
  deletedPostIds: number[];
  deletedSlugs: string[];
  slugRedirects: Record<string, string>;
  customCategories: BlogCategoryPair[];
  deletedCategorySlugs: string[];
}

export interface CmsAdminStatePayload extends CmsPublicStatePayload {
  upsertedPosts?: Record<string, CmsBlogPostRecord>;
}

export interface CmsAdminSession {
  authenticated: boolean;
  mode: 'node-api' | 'browser-fallback' | 'supabase';
  admin?: {
    id?: number;
    email: string;
    name?: string;
    role?: AdminRole;
    /** True after an admin set a temporary password; the user must change it first. */
    mustChangePassword?: boolean;
    updatedAt: string;
  };
}

export type AdminRole = 'admin' | 'editor';

export interface CmsMediaItem {
  url: string;
  name: string;
  folder: 'uploaded' | 'site-library';
  size?: number;
  updatedAt?: string;
}

export interface BulkPostMutation {
  ids: Array<{ id: number; slug: string }>;
  action: 'publish' | 'draft' | 'feature' | 'unfeature' | 'delete';
}

export interface BlogCmsProvider {
  readonly mode: 'node-api' | 'browser-fallback' | 'supabase';
  fetchPublicState(): Promise<CmsPublicStatePayload>;
  fetchPublicPost(slug: string): Promise<CmsBlogPostRecord | null>;
  getSession(): Promise<CmsAdminSession>;
  login(email: string, password: string): Promise<CmsAdminSession>;
  logout(): Promise<void>;
  changeCredentials(params: {
    currentPassword: string;
    newEmail: string;
    newPassword: string;
  }): Promise<CmsAdminSession>;
  fetchAdminState(): Promise<CmsAdminStatePayload>;
  fetchAdminPost(id: number): Promise<CmsBlogPostRecord | null>;
  savePost(post: CmsBlogPostRecord): Promise<CmsBlogPostRecord>;
  deletePost(id: number, slug: string): Promise<void>;
  restoreDeletedStaticPost(id: number, slug: string): Promise<void>;
  bulkMutate(mutation: BulkPostMutation): Promise<void>;
  upsertCategory(name: string, slug?: string): Promise<BlogCategoryPair>;
  renameCategory(oldSlug: string, newName: string): Promise<BlogCategoryPair>;
  deleteCategory(slug: string): Promise<void>;
  listMedia(query?: string): Promise<CmsMediaItem[]>;
  uploadMedia(file: File): Promise<CmsMediaItem>;
  deleteMedia(url: string): Promise<void>;
}
