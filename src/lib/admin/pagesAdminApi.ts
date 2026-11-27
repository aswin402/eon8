import { adminFetch, jsonBody } from './adminApi';

/** Client for /api/admin/pages (server/pagesApi.ts). */

export interface AdminPageRow {
  key: string;
  path: string;
  kind: 'override' | 'custom';
  template: string;
  title: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  data?: Record<string, unknown>;
}

export interface PageRevision {
  id: number;
  title: string;
  status: string;
  savedAt: string;
  savedBy: string | null;
}

export const pagesAdminApi = {
  list: () => adminFetch<{ items: AdminPageRow[] }>('/api/admin/pages').then((r) => r.items),
  get: (key: string) =>
    adminFetch<{ item: AdminPageRow | null }>(`/api/admin/pages/item?key=${encodeURIComponent(key)}`).then((r) => r.item),
  save: (page: {
    key: string;
    path?: string;
    kind: 'override' | 'custom';
    title: string;
    status: 'published' | 'draft';
    data: Record<string, unknown>;
  }) => adminFetch<{ item: AdminPageRow }>('/api/admin/pages/item', { method: 'PUT', body: jsonBody(page) }).then((r) => r.item),
  remove: (key: string) => adminFetch<{ ok: true; kind: string }>(`/api/admin/pages/item?key=${encodeURIComponent(key)}`, { method: 'DELETE' }),
  revisions: (key: string) =>
    adminFetch<{ items: PageRevision[] }>(`/api/admin/pages/revisions?key=${encodeURIComponent(key)}`).then((r) => r.items),
  revision: (id: number) =>
    adminFetch<{ revision: { key: string; title: string; status: string; data: Record<string, unknown> } }>(
      '/api/admin/pages/revisions/restore',
      { method: 'POST', body: jsonBody({ id }) }
    ).then((r) => r.revision),
};
