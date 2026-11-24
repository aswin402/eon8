import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useBlogCmsStore } from '@/lib/cms/blogStore';
import { BlogPostPage } from './BlogPostPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function DynamicSlugRoute() {
  const { slug } = useParams();
  const publicReady = useBlogCmsStore((s) => s.publicReady);
  const publishedBySlug = useBlogCmsStore((s) => s.publishedBySlug);
  const slugRedirects = useBlogCmsStore((s) => s.slugRedirects);
  const initPublic = useBlogCmsStore((s) => s.initPublic);

  useEffect(() => {
    void initPublic();
  }, [initPublic]);

  if (slug && slugRedirects[slug]) {
    return <Navigate to={`/blog/${slugRedirects[slug]}`} replace />;
  }
  if (slug && publishedBySlug[slug]) {
    return <BlogPostPage slug={slug} />;
  }
  if (!publicReady) {
    return null;
  }
  return <NotFoundPage />;
}

export default DynamicSlugRoute;
