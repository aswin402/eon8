import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageSeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SITE_ORIGIN = 'https://www.eon8.com';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function PageSeo({
  title,
  description,
  canonicalPath,
  ogImage,
  noIndex = false,
}: PageSeoProps) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const scrollTimer = window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 60);
      return () => window.clearTimeout(scrollTimer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);

  useEffect(() => {
    const cleanPath = (canonicalPath ?? pathname).replace(/\/+$/, '');
    const canonicalUrl = cleanPath ? `${SITE_ORIGIN}${cleanPath}` : `${SITE_ORIGIN}/`;

    if (title) {
      document.title = title;
      upsertMeta('property', 'og:title', title);
    }
    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
    }
    upsertMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow, noarchive' : 'index, follow'
    );
    if (ogImage) {
      const resolvedImg =
        ogImage.startsWith('http') || ogImage.startsWith('data:')
          ? ogImage
          : `${SITE_ORIGIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
      upsertMeta('property', 'og:image', resolvedImg);
    }
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', 'website');
    upsertCanonical(canonicalUrl);
  }, [title, description, canonicalPath, pathname, ogImage, noIndex]);

  return null;
}
