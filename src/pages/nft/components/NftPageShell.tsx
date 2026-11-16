import { useEffect, type ReactNode } from 'react';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/nft-pages.css';

interface NftPageShellProps {
  slug: string;
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Shared layout shell for all pure-React NFT, Discord & Community pages.
 * Applies document title/meta, resets scroll, and scopes CSS without style injection.
 */
export function NftPageShell({
  slug,
  title,
  description,
  children,
}: NftPageShellProps) {
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
    <div className="eon8-live-page nft-react-page" data-nft-slug={slug}>
      {children}
    </div>
  );
}
