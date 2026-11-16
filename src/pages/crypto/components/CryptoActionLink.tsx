import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import type { CtaAction } from '../types';

interface CryptoActionLinkProps {
  action: CtaAction;
  className?: string;
}

function renderActionIcon(icon?: CtaAction['icon']) {
  if (!icon) return null;
  switch (icon) {
    case 'whatsapp':
      return <i className="fab fa-whatsapp" aria-hidden="true" />;
    case 'calendar':
      return <i className="fa-regular fa-calendar-check" aria-hidden="true" />;
    case 'phone':
      return <i className="fa fa-phone" aria-hidden="true" />;
    case 'arrow':
      return <i className="fa-solid fa-arrow-right" aria-hidden="true" />;
    default:
      return null;
  }
}

export function CryptoActionLink({ action, className }: CryptoActionLinkProps) {
  const setContactModalOpen = useAppStore((s) => s.setContactModalOpen);
  const resolvedClass = className || action.className || 'cta-btn primary-btn';

  const handleHashOrModal = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (action.kind === 'modal') {
      e.preventDefault();
      setContactModalOpen(true);
      return;
    }

    if (action.href.startsWith('#')) {
      e.preventDefault();
      const targetId = action.href.slice(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setContactModalOpen(true);
      }
    }
  };

  if (action.kind === 'modal') {
    return (
      <button type="button" onClick={handleHashOrModal} className={resolvedClass}>
        {action.label} {renderActionIcon(action.icon)}
      </button>
    );
  }

  if (action.kind === 'route' && action.href.startsWith('/')) {
    return (
      <Link to={action.href} className={resolvedClass}>
        {action.label} {renderActionIcon(action.icon)}
      </Link>
    );
  }

  const isExternal = action.href.startsWith('http://') || action.href.startsWith('https://');
  return (
    <a
      href={action.href}
      className={resolvedClass}
      onClick={action.href.startsWith('#') ? handleHashOrModal : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {action.label} {renderActionIcon(action.icon)}
    </a>
  );
}
