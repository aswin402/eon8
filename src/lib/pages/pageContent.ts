import { useEffect, useState } from 'react';

/**
 * Pages edited or created in the admin (Admin > Pages). The site ships every
 * page's original content in code; when an edited version is published, the
 * page shows that instead. Keys are '<template>:<slug>', e.g. 'service:seo-packages'.
 */

export interface PublishedPageRef {
  key: string;
  path: string;
  kind: 'override' | 'custom';
  template: string;
  updatedAt: string;
}

let indexPromise: Promise<Map<string, PublishedPageRef>> | null = null;
let indexValue: Map<string, PublishedPageRef> | null = null;

/** Loads the list of published edited/custom pages once per visit. Never throws. */
export function loadPagesIndex(): Promise<Map<string, PublishedPageRef>> {
  indexPromise ??= fetch('/api/pages/index', { cache: 'no-cache', credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : { pages: [] }))
    .then((body: { pages?: PublishedPageRef[] }) => new Map((body.pages ?? []).map((p) => [p.key, p])))
    .catch(() => new Map<string, PublishedPageRef>())
    .then((map) => {
      indexValue = map;
      return map;
    });
  return indexPromise;
}

/** Published custom page for a URL like /my-page/ (null when there is none). */
export async function findCustomPage(pathname: string): Promise<PublishedPageRef | null> {
  const want = `/${pathname.replace(/^\/+|\/+$/g, '').toLowerCase()}/`;
  const index = await loadPagesIndex();
  for (const ref of index.values()) {
    if (ref.kind === 'custom' && ref.path.toLowerCase() === want) return ref;
  }
  return null;
}

const contentCache = new Map<string, Promise<unknown | null>>();

async function fetchPublished(key: string): Promise<unknown | null> {
  let p = contentCache.get(key);
  if (!p) {
    p = fetch(`/api/pages/content?key=${encodeURIComponent(key)}`, { cache: 'no-cache', credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((body: { data?: unknown } | null) => body?.data ?? null)
      .catch(() => null);
    contentCache.set(key, p);
  }
  return p;
}

/** The published edited content for this page, or the built-in content. */
export async function loadPageContent<T>(key: string, builtin: () => Promise<T>): Promise<T> {
  const index = await loadPagesIndex();
  if (index.has(key)) {
    const data = await fetchPublished(key);
    if (data) return data as T;
  }
  return builtin();
}

/** Content of a page created in the admin. */
export async function loadCustomPage(key: string): Promise<unknown | null> {
  return fetchPublished(key);
}

/**
 * For pages whose built-in content is already loaded: returns it straight away
 * when the page has no edit, or the edited content once fetched. Returns null
 * only while finding out.
 */
export function usePageContent<T>(key: string, builtin: T): T | null {
  const known = indexValue && !indexValue.has(key);
  const [state, setState] = useState<{ key: string; data: T } | null>(null);

  useEffect(() => {
    if (indexValue && !indexValue.has(key)) return undefined;
    let cancelled = false;
    void loadPageContent(key, () => Promise.resolve(builtin)).then((data) => {
      if (!cancelled) setState({ key, data });
    });
    return () => {
      cancelled = true;
    };
  }, [key, builtin]);

  if (known) return builtin;
  return state?.key === key ? state.data : null;
}
