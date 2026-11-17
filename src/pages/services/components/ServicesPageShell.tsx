import { useEffect, type ReactNode } from 'react';
import type { OurServiceSlug } from '../types';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/services-pages.css';
import '@/styles/core-packages-works-pages.css';

interface ServicesPageShellProps {
  slug: OurServiceSlug;
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Shared layout shell for pure React Our Services pages.
 * Manages SEO metadata, scroll-to-top, and slug-isolated CSS scoping.
 */
export function ServicesPageShell({
  slug,
  title,
  description,
  children,
}: ServicesPageShellProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (title) {
      document.title = title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }
  }, [slug, title, description]);

  return (
    <div
      className="eon8-live-page services-react-page"
      data-service-slug={slug}
    >
      {children}
    </div>
  );
}
