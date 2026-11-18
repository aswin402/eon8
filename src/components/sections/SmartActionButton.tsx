import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { VERTICAL_THEMES, type ActionItem, type VerticalTheme } from './types';

interface SmartActionButtonProps {
  action: ActionItem;
  theme?: VerticalTheme;
  onCustomModal?: () => void;
  size?: 'md' | 'lg';
}

const LEAD_FORM_ANCHORS = new Set([
  'enquiry',
  'consult-form',
  'contact',
  'consultation',
  'bottom-lead-form',
  'nft-form',
  'responsive-form',
]);

function findTargetSection(rawId: string): HTMLElement | null {
  const direct = document.getElementById(rawId);
  if (direct) return direct;

  if (LEAD_FORM_ANCHORS.has(rawId)) {
    return (
      document.getElementById('consult-form') ||
      document.getElementById('enquiry') ||
      document.getElementById('bottom-lead-form') ||
      document.getElementById('hero-lead-form') ||
      document.getElementById('contact-enquiry-form')
    );
  }

  return null;
}

export function SmartActionButton({
  action,
  theme = 'brand',
  onCustomModal,
  size = 'lg',
}: SmartActionButtonProps) {
  const { setContactModalOpen } = useAppStore();
  const palette = VERTICAL_THEMES[theme];
  const variant = action.variant || 'primary';

  const sizeCls =
    size === 'lg'
      ? 'min-h-[48px] px-6 py-3 text-[15px]'
      : 'min-h-[42px] px-5 py-2.5 text-[14px]';

  let styleCls = `${palette.primaryBtn} shadow-lg`;
  if (variant === 'whatsapp') {
    styleCls = 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-lg shadow-emerald-600/25';
  } else if (variant === 'secondary') {
    styleCls =
      'bg-white/12 hover:bg-white hover:text-slate-900 text-white border border-white/30 backdrop-blur-md';
  } else if (variant === 'outline') {
    styleCls =
      'bg-transparent hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-foreground border border-border';
  }

  const baseCls = `inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 cursor-pointer no-underline ${sizeCls} ${styleCls}`;

  const isWhatsApp =
    variant === 'whatsapp' ||
    Boolean(action.href && /wa\.link|whatsapp\.com|wa\.me/i.test(action.href));
  const isTel = Boolean(action.href && action.href.startsWith('tel:'));

  const content = (
    <>
      {isWhatsApp && <MessageCircle className="w-4 h-4 shrink-0" />}
      {isTel && <Phone className="w-4 h-4 shrink-0" />}
      <span>{action.label}</span>
      {!isWhatsApp && !isTel && <ArrowRight className="w-4 h-4 shrink-0" />}
    </>
  );

  if (action.opensModal || action.href === '#' || action.href === '#myModal') {
    return (
      <button
        type="button"
        onClick={() => {
          if (onCustomModal) onCustomModal();
          else setContactModalOpen(true);
        }}
        className={baseCls}
      >
        {content}
      </button>
    );
  }

  const rawHref = (action.href || '/contact').trim();
  const href = rawHref === 'contact' ? '/contact' : rawHref;

  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const target = findTargetSection(href.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          } else if (onCustomModal) {
            onCustomModal();
          } else {
            setContactModalOpen(true);
          }
        }}
        className={baseCls}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith('/') && !action.external) {
    return (
      <Link to={href} className={baseCls}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={baseCls}
    >
      {content}
    </a>
  );
}
