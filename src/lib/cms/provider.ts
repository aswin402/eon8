import {
  blogPostsBySlug,
  loadBlogPost,
  type BlogCategoryPair,
} from '@/pages/blog/blogPostsData';
import type {
  BlogCmsProvider,
  BulkPostMutation,
  CmsAdminSession,
  CmsAdminStatePayload,
  CmsBlogPostRecord,
  CmsMediaItem,
  CmsPublicStatePayload,
} from './types';

async function apiJsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, {
    ...init,
    credentials: 'include',
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new CmsApiUnavailableError(
      'The admin server is not reachable. Start the site with `npm run dev` or `npm start`.'
    );
  }

  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

class CmsApiUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CmsApiUnavailableError';
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

async function buildSeedPostFromStatic(
  id: number,
  slug: string
): Promise<CmsBlogPostRecord | undefined> {
  const summary = blogPostsBySlug[slug];
  if (!summary) return undefined;
  const loaded = await loadBlogPost(slug);
  const nowIso = new Date().toISOString();
  return {
    ...summary,
    id: summary.id || id,
    originalSlug: summary.slug,
    status: 'published',
    featured: false,
    createdAt: nowIso,
    updatedAt: nowIso,
    blocks: loaded?.blocks ?? [],
  };
}

/** Talks to the Node backend (server/api.ts). Sessions use an HttpOnly cookie. */
class ApiBlogCmsProvider implements BlogCmsProvider {
  readonly mode = 'node-api' as const;

  async fetchPublicState(): Promise<CmsPublicStatePayload> {
    return apiJsonFetch<CmsPublicStatePayload>('/api/cms/public-state');
  }

  async fetchPublicPost(slug: string): Promise<CmsBlogPostRecord | null> {
    const res = await apiJsonFetch<{ post: CmsBlogPostRecord | null }>(
      `/api/cms/public-post/${encodeURIComponent(slug)}`
    );
    return res.post;
  }

  async getSession(): Promise<CmsAdminSession> {
    return apiJsonFetch<CmsAdminSession>('/api/cms/auth/session');
  }

  async login(email: string, password: string): Promise<CmsAdminSession> {
    return apiJsonFetch<CmsAdminSession>('/api/cms/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<void> {
    await apiJsonFetch('/api/cms/auth/logout', { method: 'POST' });
  }

  async changeCredentials(params: {
    currentPassword: string;
    newEmail: string;
    newPassword: string;
  }): Promise<CmsAdminSession> {
    return apiJsonFetch<CmsAdminSession>('/api/cms/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async fetchAdminState(): Promise<CmsAdminStatePayload> {
    return apiJsonFetch<CmsAdminStatePayload>('/api/cms/admin/state');
  }

  async fetchAdminPost(id: number): Promise<CmsBlogPostRecord | null> {
    const res = await apiJsonFetch<{ post: CmsBlogPostRecord | null }>(
      `/api/cms/admin/post/${encodeURIComponent(String(id))}`
    );
    return res.post;
  }

  async savePost(post: CmsBlogPostRecord): Promise<CmsBlogPostRecord> {
    const res = await apiJsonFetch<{ post: CmsBlogPostRecord }>('/api/cms/admin/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
    return res.post;
  }

  async deletePost(id: number, slug: string): Promise<void> {
    await apiJsonFetch(
      `/api/cms/admin/posts/${encodeURIComponent(String(id))}?slug=${encodeURIComponent(slug)}`,
      { method: 'DELETE' }
    );
  }

  async restoreDeletedStaticPost(id: number, slug: string): Promise<void> {
    await apiJsonFetch('/api/cms/admin/posts/restore', {
      method: 'POST',
      body: JSON.stringify({ id, slug }),
    });
  }

  async bulkMutate(mutation: BulkPostMutation): Promise<void> {
    const items = await Promise.all(
      mutation.ids.map(async ({ id, slug }) => {
        if (mutation.action === 'delete') {
          return { id, slug };
        }
        const existing = await this.fetchAdminPost(id);
        if (existing) {
          return { id, slug };
        }
        const seedPost = await buildSeedPostFromStatic(id, slug);
        return { id, slug, seedPost };
      })
    );

    await apiJsonFetch('/api/cms/admin/posts/bulk', {
      method: 'POST',
      body: JSON.stringify({ action: mutation.action, items }),
    });
  }

  async upsertCategory(name: string, slug?: string): Promise<BlogCategoryPair> {
    const res = await apiJsonFetch<{ category: BlogCategoryPair }>(
      '/api/cms/admin/categories',
      {
        method: 'POST',
        body: JSON.stringify({ name, slug }),
      }
    );
    return res.category;
  }

  async renameCategory(
    oldSlug: string,
    newName: string,
    oldName?: string
  ): Promise<BlogCategoryPair> {
    const res = await apiJsonFetch<{ category: BlogCategoryPair }>(
      `/api/cms/admin/categories/${encodeURIComponent(oldSlug)}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ newName, oldName }),
      }
    );
    return res.category;
  }

  async deleteCategory(slug: string): Promise<void> {
    await apiJsonFetch(`/api/cms/admin/categories/${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
  }

  async listMedia(query?: string): Promise<CmsMediaItem[]> {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    const res = await apiJsonFetch<{ items: CmsMediaItem[] }>(`/api/cms/admin/media${q}`);
    return res.items;
  }

  async uploadMedia(file: File): Promise<CmsMediaItem> {
    const base64Data = await fileToBase64(file);
    const res = await apiJsonFetch<{ item: CmsMediaItem }>('/api/cms/admin/media/upload', {
      method: 'POST',
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type,
        base64Data,
      }),
    });
    return res.item;
  }

  async deleteMedia(url: string): Promise<void> {
    await apiJsonFetch(`/api/cms/admin/media?url=${encodeURIComponent(url)}`, {
      method: 'DELETE',
    });
  }
}

export const cmsProvider: BlogCmsProvider = new ApiBlogCmsProvider();
