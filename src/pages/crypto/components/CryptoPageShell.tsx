import { useEffect, type ReactNode } from 'react';
import '@/styles/legacy-eon8.css';
import '@/styles/crypto-pages.css';
import '@/styles/legacy-responsive-fixes.css';

interface CryptoPageShellProps {
  slug: string;
  title: string;
  metaDesc: string;
  children: ReactNode;
}

/** Scoped React shell managing metadata, scroll restoration, and Crypto theme stylesheets. */
export function CryptoPageShell({ slug, title, metaDesc, children }: CryptoPageShellProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = title;
    }
    const metaEl = document.querySelector('meta[name="description"]');
    if (metaEl && metaDesc) {
      metaEl.setAttribute('content', metaDesc);
    }
  }, [slug, title, metaDesc]);

  return (
    <div className="eon8-live-page crypto-react-page" data-crypto-slug={slug}>
      {children}
    </div>
  );
}
