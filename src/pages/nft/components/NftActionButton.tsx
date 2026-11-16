import { Link } from 'react-router-dom';
import type { NftCtaButton } from '../types';

interface NftActionButtonProps {
  button: NftCtaButton;
  onOpenModal?: () => void;
}

/**
 * Renders an interactive button/link for NFT CTAs (modal triggers, internal routes, hash scrolls, external links).
 */
export function NftActionButton({ button, onOpenModal }: NftActionButtonProps) {
  const { label, href, className, opensModal, isExternal, iconClass, imgSrc } = button;

  const content = (
    <>
      {label}
      {iconClass && (
        <>
          {' '}
          <i className={iconClass} aria-hidden="true" />
        </>
      )}
      {imgSrc && <img src={imgSrc} alt="" className="ml-2 inline-block align-middle" />}
    </>
  );

  if (opensModal && onOpenModal) {
    return (
      <button
        type="button"
        className={className || 'nft-eon-btn'}
        onClick={onOpenModal}
      >
        {content}
      </button>
    );
  }

  if (href === '#') {
    return (
      <a
        href="#enquiry"
        className={className || 'nft-eon-btn'}
        onClick={(e) => {
          const target = document.getElementById('enquiry');
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (onOpenModal) {
            e.preventDefault();
            onOpenModal();
          }
        }}
      >
        {content}
      </a>
    );
  }

  if (isExternal || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={className || 'nft-eon-btn'}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className || 'nft-eon-btn'}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={className || 'nft-eon-btn'}>
      {content}
    </Link>
  );
}
