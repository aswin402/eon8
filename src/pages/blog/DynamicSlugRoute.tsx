import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useBlogCmsStore } from '@/lib/cms/blogStore';
import { findCustomPage, type PublishedPageRef } from '@/lib/pages/pageContent';
import { CustomPage } from '@/pages/CustomPage';
import { BlogPostPage } from './BlogPostPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/** /<slug>/: a page created in Admin > Pages, an old root-level blog post URL, or 404. */
export function DynamicSlugRoute() {
  const { slug } = useParams();
  const publicReady = useBlogCmsStore((s) => s.publicReady);
  const publishedBySlug = useBlogCmsStore((s) => s.publishedBySlug);
  const slugRedirects = useBlogCmsStore((s) => s.slugRedirects);
  const initPublic = useBlogCmsStore((s) => s.initPublic);
  const [custom, setCustom] = useState<{ slug: string; page: PublishedPageRef | null } | null>(null);

  useEffect(() => {
    void initPublic();
  }, [initPublic]);

  useEffect(() => {
    if (!slug) return undefined;
    let cancelled = false;
    void findCustomPage(slug).then((page) => {
      if (!cancelled) setCustom({ slug, page });
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const customKnown = custom?.slug === slug;
  if (customKnown && custom?.page) {
    return <CustomPage page={custom.page} />;
  }
  if (slug && slugRedirects[slug]) {
    return <Navigate to={`/blog/${slugRedirects[slug]}`} replace />;
  }
  if (slug && publishedBySlug[slug]) {
    return <BlogPostPage slug={slug} />;
  }
  if (!publicReady || !customKnown) {
    return null;
  }
  return <NotFoundPage />;
}

export default DynamicSlugRoute;
