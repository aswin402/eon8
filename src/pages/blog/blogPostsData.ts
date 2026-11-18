import type { RichNode } from '@/pages/crypto/types';
import {
  BLOG_CATEGORIES_LIST,
  BLOG_CATEGORY_PAIRS,
  BLOG_POSTS_SUMMARIES,
  type BlogCategoryPair,
  type BlogPostSummary,
} from './blogIndexData';
import { BLOG_POST_LOADERS } from './posts';

export type { BlogPostSummary, BlogCategoryPair };
export { BLOG_CATEGORY_PAIRS };

export type ArticleBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; content: RichNode[] }
  | { type: 'list'; ordered: boolean; items: RichNode[][] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'blockquote'; content: RichNode[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cta'; label: string; href: string };

export interface BlogPost extends BlogPostSummary {
  blocks: ArticleBlock[];
}

export const blogCategories: string[] = ['All', ...BLOG_CATEGORIES_LIST];

export const blogPostsIndex: BlogPostSummary[] = BLOG_POSTS_SUMMARIES;

export const blogPostsBySlug: Record<string, BlogPostSummary> = Object.fromEntries(
  BLOG_POSTS_SUMMARIES.map((post) => [post.slug, post])
);

const slugByCategoryName: Record<string, string> = Object.fromEntries(
  BLOG_CATEGORY_PAIRS.map((pair) => [pair.name.toLowerCase(), pair.slug])
);

const categoryNameBySlug: Record<string, string> = Object.fromEntries(
  BLOG_CATEGORY_PAIRS.map((pair) => [pair.slug.toLowerCase(), pair.name])
);

export function getSlugForCategory(categoryName: string): string {
  const mapped = slugByCategoryName[categoryName.trim().toLowerCase()];
  if (mapped) return mapped;
  return categoryName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCategoryNameBySlug(categorySlug: string): string | null {
  const clean = categorySlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  return categoryNameBySlug[clean] ?? null;
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  const loader = BLOG_POST_LOADERS[slug];
  if (!loader) return null;
  return loader();
}
