import { useEffect, type ReactNode } from 'react';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/influencer-pages.css';

interface InfluencerPageShellProps {
  slug: string;
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Shared layout shell for native React influencer pages.
 * Sets document metadata, resets scroll position, and scopes page CSS.
 */
export function InfluencerPageShell({
  slug,
  title,
  description,
  children,
}: InfluencerPageShellProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = title;
    }
    const metaEl = document.querySelector('meta[name="description"]');
    if (metaEl && description) {
      metaEl.setAttribute('content', description);
    }
  }, [title, description]);

  return (
    <div
      className="eon8-live-page influencer-react-page"
      data-influencer-slug={slug}
    >
      {children}
    </div>
  );
}
