import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface ArticleSeoMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

interface PageSeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
  article?: ArticleSeoMeta;
}

const SITE_ORIGIN = 'https://www.eon8.com';
const DEFAULT_OG_IMAGE = '/wp-content/uploads/2022/07/banner-1.jpg';
const ORG_LOGO_IMAGE = '/wp-content/uploads/2026/03/Logo_bg-1.png';
const JSONLD_SCRIPT_ID = 'eon8-jsonld';

const EON8_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '9th Floor, Prestige Polygon, No 471, Anna Salai, Teynampet',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  postalCode: '600035',
  addressCountry: 'IN',
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
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

function upsertJsonLd(payload: Record<string, unknown>) {
  let script = document.getElementById(JSONLD_SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = JSONLD_SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
}

function resolveAbsoluteUrl(src: string): string {
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  return `${SITE_ORIGIN}${src.startsWith('/') ? '' : '/'}${src}`;
}

export function PageSeo({
  title,
  description,
  canonicalPath,
  ogImage,
  noIndex = false,
  article,
}: PageSeoProps) {
  const { pathname, hash } = useLocation();
  const articlePublished = article?.publishedTime;
  const articleModified = article?.modifiedTime;
  const articleAuthor = article?.author;
  const articleSection = article?.section;

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
    // Trailing slash, as on the old WordPress site and in sitemap.xml.
    const canonicalUrl = cleanPath ? `${SITE_ORIGIN}${cleanPath}/` : `${SITE_ORIGIN}/`;
    const resolvedImg = resolveAbsoluteUrl(ogImage?.trim() || DEFAULT_OG_IMAGE);
    const isArticle = Boolean(articlePublished || articleAuthor || articleSection);

    if (title) {
      document.title = title;
      upsertMeta('property', 'og:title', title);
      upsertMeta('name', 'twitter:title', title);
      upsertMeta('property', 'og:image:alt', title);
    }
    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertMeta(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow, noarchive'
        : 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
    );
    upsertMeta('property', 'og:locale', 'en_US');
    upsertMeta('property', 'og:site_name', 'Eon8');
    upsertMeta('property', 'og:image', resolvedImg);
    upsertMeta('property', 'og:image:secure_url', resolvedImg);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', isArticle ? 'article' : 'website');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', '@eon8digital');
    upsertMeta('name', 'twitter:creator', '@eon8digital');
    upsertMeta('name', 'twitter:image', resolvedImg);
    upsertCanonical(canonicalUrl);

    if (isArticle && articlePublished) {
      upsertMeta('property', 'article:published_time', articlePublished);
      upsertMeta('property', 'article:modified_time', articleModified || articlePublished);
      if (articleSection) upsertMeta('property', 'article:section', articleSection);
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
      removeMeta('property', 'article:section');
    }

    if (noIndex) {
      const existing = document.getElementById(JSONLD_SCRIPT_ID);
      if (existing) existing.remove();
      return;
    }

    const breadcrumbItems: Record<string, unknown>[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
    ];

    if (isArticle) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog/`,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: canonicalUrl,
      });
    } else if (cleanPath) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: canonicalUrl,
      });
    }

    const webPageType =
      cleanPath === '/about-us'
        ? 'AboutPage'
        : cleanPath === '/contact'
          ? 'ContactPage'
          : 'WebPage';

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Place',
        '@id': `${SITE_ORIGIN}/#place`,
        address: EON8_ADDRESS,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'Eon8',
        url: `${SITE_ORIGIN}/`,
        address: EON8_ADDRESS,
        location: { '@id': `${SITE_ORIGIN}/#place` },
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_ORIGIN}/#logo`,
          url: resolveAbsoluteUrl(ORG_LOGO_IMAGE),
          contentUrl: resolveAbsoluteUrl(ORG_LOGO_IMAGE),
          caption: 'Eon8',
          inLanguage: 'en-US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-90422-94007',
          contactType: 'sales',
          email: 'info@eon8.com',
          areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
        },
        sameAs: [
          'https://www.instagram.com/eon8_official/',
          'https://www.facebook.com/people/Eon8-The-Digital-Infinity/61588594388907/',
          'https://www.linkedin.com/company/eon-8/',
          'https://x.com/eon8digital',
          'https://www.youtube.com/@Eon8TheDigitalInfinity/videos',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: 'Eon8',
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_ORIGIN}/blog?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': webPageType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${SITE_ORIGIN}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: resolvedImg,
          inLanguage: 'en-US',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ];

    if (isArticle) {
      graph.push({
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: title,
        description,
        inLanguage: 'en-US',
        image: resolvedImg,
        datePublished: articlePublished || undefined,
        dateModified: articleModified || articlePublished || undefined,
        articleSection: articleSection || undefined,
        author: {
          '@type': 'Person',
          name: articleAuthor || 'EON8 Editorial Team',
        },
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
      });
    }

    upsertJsonLd({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [
    title,
    description,
    canonicalPath,
    pathname,
    ogImage,
    noIndex,
    articlePublished,
    articleModified,
    articleAuthor,
    articleSection,
  ]);

  return null;
}
