import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

interface ServicesSmartLinkProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  role?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

function normalizeInternalPath(rawHref: string): string | null {
  const trimmed = rawHref.trim();
  if (!trimmed) return null;

  if (/^https?:\/\/(?:www\.)?eon8\.com(\/.*)?$/i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      const cleanPath = parsed.pathname.replace(/\/+$/, '') || '/';
      return `${cleanPath}${parsed.hash || ''}`;
    } catch {
      return null;
    }
  }

  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.startsWith('/wp-content/')) {
    const [pathPart, hashPart] = trimmed.split('#');
    const cleanPath = pathPart.replace(/\/+$/, '') || '/';
    return hashPart ? `${cleanPath}#${hashPart}` : cleanPath;
  }

  return null;
}

/**
 * Pure React smart link component handling internal SPA navigation,
 * in-page anchor scrolling, and consultation modal triggers.
 */
export function ServicesSmartLink({
  id,
  className,
  style,
  href = '#',
  target,
  rel,
  title,
  role,
  ariaLabel,
  children,
}: ServicesSmartLinkProps) {
  const { setContactModalOpen } = useAppStore();
  const raw = href.trim();

  // Check if text specifically points to SEO Packages
  const internalPath = normalizeInternalPath(raw);
  if (internalPath && !internalPath.includes('#')) {
    return (
      <Link
        id={id}
        className={className}
        style={style}
        to={internalPath}
        title={title}
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  const handleSpecialClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!raw || raw === '#' || raw.startsWith('javascript:')) {
      e.preventDefault();
      // Scroll to in-page form if present, otherwise open global contact modal
      const formTarget = document.querySelector<HTMLElement>(
        '.services-react-page #responsive-form, .services-react-page #nft-form, .services-react-page #enquiry'
      );
      if (formTarget) {
        formTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setContactModalOpen(true);
      }
      return;
    }

    if (raw.startsWith('#')) {
      e.preventDefault();
      const targetId = raw.slice(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const fallbackForm = document.querySelector<HTMLElement>(
        '.services-react-page #nft-form, .services-react-page #responsive-form'
      );
      if (fallbackForm) {
        fallbackForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setContactModalOpen(true);
      }
    }
  };

  const isExternalHttp = /^https?:\/\//i.test(raw);
  const effectiveTarget = target || (isExternalHttp ? '_blank' : undefined);
  const effectiveRel = rel || (effectiveTarget === '_blank' ? 'noopener noreferrer' : undefined);

  return (
    <a
      id={id}
      className={className}
      style={style}
      href={internalPath || raw || '#'}
      target={effectiveTarget}
      rel={effectiveRel}
      title={title}
      role={role}
      aria-label={ariaLabel}
      onClick={handleSpecialClick}
    >
      {children}
    </a>
  );
}
