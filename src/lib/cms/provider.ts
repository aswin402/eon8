import {
  blogPostsBySlug,
  loadBlogPost,
  type BlogCategoryPair,
} from '@/pages/blog/blogPostsData';
import { slugifyText } from './richTextCodec';
import type {
  BlogCmsProvider,
  BulkPostMutation,
  CmsAdminSession,
  CmsAdminStatePayload,
  CmsBlogPostRecord,
  CmsBlogSummaryRecord,
  CmsMediaItem,
  CmsPublicStatePayload,
} from './types';

const TOKEN_STORAGE_KEY = 'eon8_cms_bearer_token';
const FALLBACK_CONTENT_KEY = 'eon8_cms_fallback_content_v1';
const FALLBACK_AUTH_KEY = 'eon8_cms_fallback_auth_v1';
const FALLBACK_SESSION_KEY = 'eon8_cms_fallback_session_v1';

function getStoredToken(): string | null {
  try {
    return window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredToken(token: string | null): void {
  try {
    if (token) {
      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

async function apiJsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...init,
    credentials: 'include',
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new CmsApiUnavailableError('CMS API endpoint returned non-JSON response');
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
    const res = await apiJsonFetch<CmsAdminSession & { token?: string }>(
      '/api/cms/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  }

  async logout(): Promise<void> {
    setStoredToken(null);
    await apiJsonFetch('/api/cms/auth/logout', { method: 'POST' });
  }

  async changeCredentials(params: {
    currentPassword: string;
    newEmail: string;
    newPassword: string;
  }): Promise<CmsAdminSession> {
    const res = await apiJsonFetch<CmsAdminSession & { token?: string }>(
      '/api/cms/auth/change-password',
      {
        method: 'POST',
        body: JSON.stringify(params),
      }
    );
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
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

// Browser Fallback Provider (activates automatically on static preview CDNs before Supabase is attached)
interface FallbackStoredContent {
  version: number;
  upsertedPosts: Record<string, CmsBlogPostRecord>;
  deletedPostIds: number[];
  deletedSlugs: string[];
  slugRedirects: Record<string, string>;
  customCategories: BlogCategoryPair[];
  deletedCategorySlugs: string[];
  media: CmsMediaItem[];
}

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

class BrowserFallbackCmsProvider implements BlogCmsProvider {
  readonly mode = 'browser-fallback' as const;

  private readContent(): FallbackStoredContent {
    try {
      const raw = window.localStorage.getItem(FALLBACK_CONTENT_KEY);
      if (raw) {
        return JSON.parse(raw) as FallbackStoredContent;
      }
    } catch {
      // Ignore
    }
    return {
      version: 1,
      upsertedPosts: {},
      deletedPostIds: [],
      deletedSlugs: [],
      slugRedirects: {},
      customCategories: [],
      deletedCategorySlugs: [],
      media: [],
    };
  }

  private writeContent(state: FallbackStoredContent): void {
    state.version += 1;
    window.localStorage.setItem(FALLBACK_CONTENT_KEY, JSON.stringify(state));
  }

  private async ensureAuth(): Promise<{
    email: string;
    passwordHash: string;
    updatedAt: string;
  }> {
    try {
      const raw = window.localStorage.getItem(FALLBACK_AUTH_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // Ignore
    }
    const defaultEmail = 'admin@eon8.com';
    const passwordHash = await sha256Hex('Eon8Admin@2026');
    const seeded = {
      email: defaultEmail,
      passwordHash,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(FALLBACK_AUTH_KEY, JSON.stringify(seeded));
    return seeded;
  }

  async fetchPublicState(): Promise<CmsPublicStatePayload> {
    const state = this.readContent();
    const upsertedSummaries: Record<string, CmsBlogSummaryRecord> = {};
    for (const [id, post] of Object.entries(state.upsertedPosts)) {
      if (post.status === 'published') {
        const { blocks: _b, ...summary } = post;
        void _b;
        upsertedSummaries[id] = summary;
      }
    }
    return {
      version: state.version,
      upsertedSummaries,
      deletedPostIds: state.deletedPostIds,
      deletedSlugs: state.deletedSlugs,
      slugRedirects: state.slugRedirects,
      customCategories: state.customCategories,
      deletedCategorySlugs: state.deletedCategorySlugs,
    };
  }

  async fetchPublicPost(slug: string): Promise<CmsBlogPostRecord | null> {
    const state = this.readContent();
    return (
      Object.values(state.upsertedPosts).find(
        (p) => p.slug === slug && p.status === 'published'
      ) ?? null
    );
  }

  async getSession(): Promise<CmsAdminSession> {
    const auth = await this.ensureAuth();
    const active = window.sessionStorage.getItem(FALLBACK_SESSION_KEY) === auth.email;
    return {
      authenticated: active,
      mode: 'browser-fallback',
      admin: active ? { email: auth.email, updatedAt: auth.updatedAt } : undefined,
    };
  }

  async login(email: string, password: string): Promise<CmsAdminSession> {
    const auth = await this.ensureAuth();
    const hash = await sha256Hex(password);
    if (email.trim().toLowerCase() !== auth.email || hash !== auth.passwordHash) {
      throw new Error('Invalid email address or password.');
    }
    window.sessionStorage.setItem(FALLBACK_SESSION_KEY, auth.email);
    return {
      authenticated: true,
      mode: 'browser-fallback',
      admin: { email: auth.email, updatedAt: auth.updatedAt },
    };
  }

  async logout(): Promise<void> {
    window.sessionStorage.removeItem(FALLBACK_SESSION_KEY);
  }

  async changeCredentials(params: {
    currentPassword: string;
    newEmail: string;
    newPassword: string;
  }): Promise<CmsAdminSession> {
    const auth = await this.ensureAuth();
    const currentHash = await sha256Hex(params.currentPassword);
    if (currentHash !== auth.passwordHash) {
      throw new Error('Current password is incorrect.');
    }
    if (params.newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long.');
    }
    const nextEmail = params.newEmail.trim().toLowerCase() || auth.email;
    const updated = {
      email: nextEmail,
      passwordHash: await sha256Hex(params.newPassword),
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(FALLBACK_AUTH_KEY, JSON.stringify(updated));
    window.sessionStorage.setItem(FALLBACK_SESSION_KEY, updated.email);
    return {
      authenticated: true,
      mode: 'browser-fallback',
      admin: { email: updated.email, updatedAt: updated.updatedAt },
    };
  }

  async fetchAdminState(): Promise<CmsAdminStatePayload> {
    const state = this.readContent();
    const upsertedSummaries: Record<string, CmsBlogSummaryRecord> = {};
    for (const [id, post] of Object.entries(state.upsertedPosts)) {
      const { blocks: _b, ...summary } = post;
      void _b;
      upsertedSummaries[id] = summary;
    }
    return {
      version: state.version,
      upsertedSummaries,
      deletedPostIds: state.deletedPostIds,
      deletedSlugs: state.deletedSlugs,
      slugRedirects: state.slugRedirects,
      customCategories: state.customCategories,
      deletedCategorySlugs: state.deletedCategorySlugs,
    };
  }

  async fetchAdminPost(id: number): Promise<CmsBlogPostRecord | null> {
    const state = this.readContent();
    return state.upsertedPosts[String(id)] ?? null;
  }

  async savePost(post: CmsBlogPostRecord): Promise<CmsBlogPostRecord> {
    const state = this.readContent();
    const cleanSlug = slugifyText(post.slug || post.title);
    const id = post.id > 0 ? post.id : Date.now();
    const idKey = String(id);
    const existing = state.upsertedPosts[idKey];
    const nowIso = new Date().toISOString();
    const prevSlug = existing?.slug || post.originalSlug;
    if (prevSlug && prevSlug !== cleanSlug) {
      state.slugRedirects[prevSlug] = cleanSlug;
      if (!state.deletedSlugs.includes(prevSlug)) {
        state.deletedSlugs.push(prevSlug);
      }
    }
    delete state.slugRedirects[cleanSlug];
    state.deletedSlugs = state.deletedSlugs.filter((s) => s !== cleanSlug);
    state.deletedPostIds = state.deletedPostIds.filter((x) => x !== id);

    const saved: CmsBlogPostRecord = {
      ...post,
      id,
      slug: cleanSlug,
      createdAt: existing?.createdAt || post.createdAt || nowIso,
      updatedAt: nowIso,
    };
    state.upsertedPosts[idKey] = saved;
    this.writeContent(state);
    return saved;
  }

  async deletePost(id: number, slug: string): Promise<void> {
    const state = this.readContent();
    const existing = state.upsertedPosts[String(id)];
    delete state.upsertedPosts[String(id)];
    if (!state.deletedPostIds.includes(id)) state.deletedPostIds.push(id);
    for (const s of [slug, existing?.slug, existing?.originalSlug]) {
      if (s && !state.deletedSlugs.includes(s)) state.deletedSlugs.push(s);
    }
    this.writeContent(state);
  }

  async restoreDeletedStaticPost(id: number, slug: string): Promise<void> {
    const state = this.readContent();
    state.deletedPostIds = state.deletedPostIds.filter((x) => x !== id);
    state.deletedSlugs = state.deletedSlugs.filter((s) => s !== slug);
    this.writeContent(state);
  }

  async bulkMutate(mutation: BulkPostMutation): Promise<void> {
    for (const { id, slug } of mutation.ids) {
      if (mutation.action === 'delete') {
        await this.deletePost(id, slug);
      } else {
        const current =
          (await this.fetchAdminPost(id)) || (await buildSeedPostFromStatic(id, slug));
        if (!current) continue;
        await this.savePost({
          ...current,
          status:
            mutation.action === 'publish'
              ? 'published'
              : mutation.action === 'draft'
                ? 'draft'
                : current.status,
          featured:
            mutation.action === 'feature'
              ? true
              : mutation.action === 'unfeature'
                ? false
                : current.featured,
        });
      }
    }
  }

  async upsertCategory(name: string, slug?: string): Promise<BlogCategoryPair> {
    const state = this.readContent();
    const pair = { name: name.trim(), slug: slugifyText(slug || name) };
    state.customCategories = state.customCategories.filter((c) => c.slug !== pair.slug);
    state.customCategories.push(pair);
    state.deletedCategorySlugs = state.deletedCategorySlugs.filter((s) => s !== pair.slug);
    this.writeContent(state);
    return pair;
  }

  async renameCategory(oldSlug: string, newName: string): Promise<BlogCategoryPair> {
    const state = this.readContent();
    const pair = { name: newName.trim(), slug: slugifyText(newName) };
    if (oldSlug !== pair.slug && !state.deletedCategorySlugs.includes(oldSlug)) {
      state.deletedCategorySlugs.push(oldSlug);
    }
    state.customCategories = state.customCategories.filter(
      (c) => c.slug !== oldSlug && c.slug !== pair.slug
    );
    state.customCategories.push(pair);
    this.writeContent(state);
    return pair;
  }

  async deleteCategory(slug: string): Promise<void> {
    const state = this.readContent();
    state.customCategories = state.customCategories.filter((c) => c.slug !== slug);
    if (!state.deletedCategorySlugs.includes(slug)) state.deletedCategorySlugs.push(slug);
    this.writeContent(state);
  }

  async listMedia(): Promise<CmsMediaItem[]> {
    return this.readContent().media;
  }

  async uploadMedia(file: File): Promise<CmsMediaItem> {
    const dataUrl = await fileToBase64(file);
    const state = this.readContent();
    const item: CmsMediaItem = {
      url: dataUrl,
      name: file.name,
      folder: 'uploaded',
      size: file.size,
      updatedAt: new Date().toISOString(),
    };
    state.media.unshift(item);
    this.writeContent(state);
    return item;
  }

  async deleteMedia(url: string): Promise<void> {
    const state = this.readContent();
    state.media = state.media.filter((m) => m.url !== url);
    this.writeContent(state);
  }
}

class SmartResilientCmsProvider implements BlogCmsProvider {
  private api = new ApiBlogCmsProvider();
  private fallback = new BrowserFallbackCmsProvider();
  private useFallback = false;

  get mode(): 'node-api' | 'browser-fallback' | 'supabase' {
    return this.useFallback ? 'browser-fallback' : 'node-api';
  }

  private async run<T>(
    apiFn: (p: ApiBlogCmsProvider) => Promise<T>,
    fbFn: (p: BrowserFallbackCmsProvider) => Promise<T>
  ): Promise<T> {
    if (this.useFallback) return fbFn(this.fallback);
    try {
      return await apiFn(this.api);
    } catch (err) {
      if (err instanceof CmsApiUnavailableError || err instanceof TypeError) {
        this.useFallback = true;
        return fbFn(this.fallback);
      }
      throw err;
    }
  }

  fetchPublicState() {
    return this.run(
      (p) => p.fetchPublicState(),
      (p) => p.fetchPublicState()
    );
  }
  fetchPublicPost(slug: string) {
    return this.run(
      (p) => p.fetchPublicPost(slug),
      (p) => p.fetchPublicPost(slug)
    );
  }
  getSession() {
    return this.run(
      (p) => p.getSession(),
      (p) => p.getSession()
    );
  }
  login(email: string, password: string) {
    return this.run(
      (p) => p.login(email, password),
      (p) => p.login(email, password)
    );
  }
  logout() {
    return this.run(
      (p) => p.logout(),
      (p) => p.logout()
    );
  }
  changeCredentials(params: {
    currentPassword: string;
    newEmail: string;
    newPassword: string;
  }) {
    return this.run(
      (p) => p.changeCredentials(params),
      (p) => p.changeCredentials(params)
    );
  }
  fetchAdminState() {
    return this.run(
      (p) => p.fetchAdminState(),
      (p) => p.fetchAdminState()
    );
  }
  fetchAdminPost(id: number) {
    return this.run(
      (p) => p.fetchAdminPost(id),
      (p) => p.fetchAdminPost(id)
    );
  }
  savePost(post: CmsBlogPostRecord) {
    return this.run(
      (p) => p.savePost(post),
      (p) => p.savePost(post)
    );
  }
  deletePost(id: number, slug: string) {
    return this.run(
      (p) => p.deletePost(id, slug),
      (p) => p.deletePost(id, slug)
    );
  }
  restoreDeletedStaticPost(id: number, slug: string) {
    return this.run(
      (p) => p.restoreDeletedStaticPost(id, slug),
      (p) => p.restoreDeletedStaticPost(id, slug)
    );
  }
  bulkMutate(mutation: BulkPostMutation) {
    return this.run(
      (p) => p.bulkMutate(mutation),
      (p) => p.bulkMutate(mutation)
    );
  }
  upsertCategory(name: string, slug?: string) {
    return this.run(
      (p) => p.upsertCategory(name, slug),
      (p) => p.upsertCategory(name, slug)
    );
  }
  renameCategory(oldSlug: string, newName: string) {
    return this.run(
      (p) => p.renameCategory(oldSlug, newName),
      (p) => p.renameCategory(oldSlug, newName)
    );
  }
  deleteCategory(slug: string) {
    return this.run(
      (p) => p.deleteCategory(slug),
      (p) => p.deleteCategory(slug)
    );
  }
  listMedia(query?: string) {
    return this.run(
      (p) => p.listMedia(query),
      (p) => p.listMedia()
    );
  }
  uploadMedia(file: File) {
    return this.run(
      (p) => p.uploadMedia(file),
      (p) => p.uploadMedia(file)
    );
  }
  deleteMedia(url: string) {
    return this.run(
      (p) => p.deleteMedia(url),
      (p) => p.deleteMedia(url)
    );
  }
}

export const cmsProvider: BlogCmsProvider = new SmartResilientCmsProvider();
