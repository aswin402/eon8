import type { ServiceNode } from '@/pages/services/types';
import {
  BLOG_CATEGORIES_LIST,
  BLOG_POSTS_SUMMARIES,
  type BlogPostSummary,
} from './blogIndexData';
import { BLOG_POST_LOADERS } from './posts';

export type { BlogPostSummary };

export interface BlogPost extends BlogPostSummary {
  contentNodes: ServiceNode[];
}

export const blogCategories: string[] = ['All', ...BLOG_CATEGORIES_LIST];

export const blogPostsIndex: BlogPostSummary[] = BLOG_POSTS_SUMMARIES;

export const blogPostsBySlug: Record<string, BlogPostSummary> = Object.fromEntries(
  BLOG_POSTS_SUMMARIES.map((post) => [post.slug, post])
);

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  const loader = BLOG_POST_LOADERS[slug];
  if (!loader) return null;
  return loader();
}
