import rawBlogIndex from '@/data/blogIndex.json';

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  category: string;
  categories: string[];
  date: string;
  dateIso: string;
  readTime: string;
  author: string;
  thumbnail: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string;
}

interface RawBlogIndex {
  categories: string[];
  posts: BlogPostSummary[];
}

const typedIndex = rawBlogIndex as RawBlogIndex;

export const blogCategories: string[] = ['All', ...typedIndex.categories];

export const blogPostsIndex: BlogPostSummary[] = typedIndex.posts;

export const blogPostsBySlug: Record<string, BlogPostSummary> = Object.fromEntries(
  typedIndex.posts.map((post) => [post.slug, post])
);

const postModules = import.meta.glob('../../data/blogPosts/*.json') as Record<
  string,
  () => Promise<{ default?: BlogPost } | BlogPost>
>;

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  const loader = postModules[`../../data/blogPosts/${slug}.json`];
  if (!loader) return null;
  const mod = await loader();
  if ('default' in mod && mod.default) {
    return mod.default;
  }
  return mod as BlogPost;
}
