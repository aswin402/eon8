import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useAppStore } from '@/store/useAppStore';
import { telHref, useSiteSettings } from '@/lib/siteSettings';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

interface SubItem {
  name: string;
  href: string;
}

interface MegaSubGroup {
  title: string;
  href?: string;
  items: SubItem[];
}

interface MegaSection {
  title?: string;
  href?: string;
  items?: SubItem[];
  subGroups?: MegaSubGroup[];
}

interface NavItem {
  label: string;
  href: string;
  submenu?: SubItem[];
  isMega?: boolean;
  megaSections?: MegaSection[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'AI-Agent',
    href: '/ai-agent-development-services',
    submenu: [
      { name: 'AI Agent Development Services', href: '/ai-agent-development-services' },
      { name: 'AI Video Creation Services', href: '/ai-video-creation' },
      { name: 'ChatGPT Ads Agency', href: '/chatgpt-ads-agency' },
    ],
  },
  {
    label: 'Crypto',
    href: '/crypto-marketing-agency',
    submenu: [
      { name: 'Crypto Marketing', href: '/crypto-marketing-agency' },
      { name: 'Crypto PR Services', href: '/crypto-pr-services' },
      { name: 'Crypto Influencer Marketing', href: '/crypto-influencer-marketing' },
      { name: 'Crypto Telegram Marketing', href: '/crypto-telegram-marketing' },
      { name: 'Crypto Community Marketing', href: '/crypto-community-marketing' },
      { name: 'Crypto Video Creation & Marketing', href: '/crypto-video-creation-marketing' },
      { name: 'Crypto Twitter Influencer Marketing', href: '/crypto-twitter-influencer-marketing' },
      { name: 'ICO Marketing Agency', href: '/ico-marketing-agency' },
      { name: 'IDO Marketing Agency', href: '/ido-marketing-agency' },
      { name: 'IEO Marketing Agency', href: '/ieo-marketing-agency' },
      { name: 'Crypto KOL Agency', href: '/crypto-kol-agency' },
      { name: 'STO Marketing Agency', href: '/sto-marketing-agency' },
      { name: 'ICO Listing Services', href: '/ico-listing-services' },
      { name: 'Launch Your Token with Strategic IEO Listing Services', href: '/ieo-listing-services' },
    ],
  },
  {
    label: 'Influencer',
    href: '/influencer-marketing-agency',
    submenu: [
      { name: 'Influencer Marketing Agency', href: '/influencer-marketing-agency' },
      { name: 'Insta Influencer Marketing Agency', href: '/instagram-influencer-marketing-agency' },
      { name: 'TikTok Influencer Marketing', href: '/tiktok-influencer-marketing' },
      { name: 'Youtube Influencer Services', href: '/youtube-influencer-services' },
      { name: 'Twitter Influencer Marketing', href: '/twitter-influencer-marketing' },
    ],
  },
  {
    label: 'NFT',
    href: '/nft-marketing-services',
    isMega: true,
    megaSections: [
      {
        title: 'NFT Marketing',
        href: '/nft-marketing-services',
        items: [
          { name: 'NFT Marketing Services', href: '/nft-marketing-services' },
          { name: 'NFT Art Agency', href: '/nft-art-agency' },
          { name: 'NFT Collection Marketing', href: '/nft-collection-marketing' },
          { name: 'NFT Community Marketing', href: '/nft-community-marketing' },
          { name: 'NFT Game Marketing Services', href: '/nft-game-marketing-services' },
          { name: 'NFT Social Media Marketing', href: '/nft-social-media-marketing' },
          { name: 'NFT PR Services', href: '/nft-pr-services' },
          { name: 'NFT Telegram Marketing', href: '/nft-telegram-marketing' },
          { name: 'NFT Twitter Marketing', href: '/nft-twitter-marketing' },
          { name: 'NFT Youtube Marketing', href: '/nft-youtube-marketing' },
          { name: 'NFT Reddit Marketing', href: '/nft-reddit-marketing' },
          { name: 'NFT Game Discord Marketing', href: '/nft-game-discord-marketing' },
        ],
      },
      {
        title: 'Discord Marketing',
        href: '/discord-marketing-agency',
        items: [
          { name: 'Discord Marketing Agency', href: '/discord-marketing-agency' },
          { name: 'Discord Game Marketing Agency', href: '/discord-game-marketing-agency' },
          { name: 'Discord server marketing', href: '/discord-server-marketing' },
          { name: 'Discord Moderation Services', href: '/discord-moderation-services' },
        ],
      },
      {
        title: 'Community',
        href: '/reddit-community-marketing-agency',
        items: [
          { name: 'Reddit Community Marketing Agency', href: '/reddit-community-marketing-agency' },
          { name: 'Discord Community Building Services', href: '/discord-community-building-services' },
          { name: 'NFT Game Reddit Marketing', href: '/nft-game-reddit-marketing' },
          { name: 'PR Marketing Agency', href: '/pr-marketing-agency' },
          { name: 'Free NFT Consultation', href: '/nft-free-consultation' },
        ],
      },
    ],
  },
  {
    label: 'Our Services',
    href: '/digital-marketing-agency-in-chennai',
    isMega: true,
    megaSections: [
      {
        title: 'Digital Marketing Agency',
        href: '/digital-marketing-agency-in-chennai',
        items: [
          { name: 'Search Engine Optimization SEO', href: '/search-engine-optimization-services-seo' },
          { name: 'Local SEO services', href: '/local-seo-agency' },
          { name: 'eCommerce SEO services', href: '/ecommerce-seo-services' },
          { name: 'Mobile SEO Service', href: '/mobile-seo-agency-eon8-seo-services' },
          { name: 'SEO for Small Business', href: '/small-business-seo-services' },
          { name: 'Link Building Service', href: '/link-building-services-for-high-rankings' },
          { name: 'Game Marketing Agency', href: '/game-marketing-agency-video-mobile-gaming' },
          { name: 'Build High-Performing eCommerce Stores That Convert', href: '/ecommerce-website-development-services' },
          { name: 'Web Design & Development', href: '/web-design-development-services-chennai' },
          { name: 'ERP Software Development', href: '/erp-software-development' },
          { name: 'CRM Software Development', href: '/crm-software-development' },
        ],
      },
      {
        subGroups: [
          {
            title: 'Social Media Marketing',
            href: '/social-media-marketing-company-chennai',
            items: [
              { name: 'Social Media Brand Management Agency', href: '/social-media-brand-management-agency-chennai' },
              { name: 'Best Social Media Management Agency', href: '/social-media-management-agency-chennai' },
              { name: 'Facebook Marketing Agency in Chennai', href: '/facebook-marketing-agency-in-chennai' },
              { name: 'Twitter Marketing Agency', href: '/twitter-marketing-agency-in-chennai-marketing' },
              { name: 'Instagram Marketing Agency Insta', href: '/instagram-marketing-agency-services-instagram' },
              { name: 'LinkedIn marketing agency', href: '/linkedin-marketing-agency-chennai-services' },
              { name: 'YouTube marketing company', href: '/youtube-marketing-company-chennai-eon8' },
            ],
          },
          {
            title: 'ORM Services',
            items: [
              { name: 'Reputation management services', href: '/reputation-management-services' },
              { name: 'Online Reputation Management', href: '/online-reputation-management-agency' },
              { name: 'Clean Negative search results', href: '/clean-negative-search-results' },
              { name: 'Google Complaint Removal', href: '/google-complaint-removal' },
              { name: 'Complaints board removal', href: '/complaints-board-removal' },
              { name: 'Consumer complaints removal', href: '/consumer-complaints-removal' },
            ],
          },
        ],
      },
      {
        subGroups: [
          {
            title: 'Pay-Per-Click',
            href: '/ppc-company-chennai',
            items: [
              { name: 'Search Advertising Company', href: '/search-advertising-company' },
              { name: 'Display Advertising Agency', href: '/display-advertising-agency' },
              { name: 'Remarketing and Retargeting Ads', href: '/best-remarketing-ad-agency' },
              { name: 'Product Listing Ads Agency', href: '/product-listing-ads-agency' },
            ],
          },
          {
            title: 'App Marketing',
            items: [
              { name: 'Android App Marketing Services', href: '/android-apps-marketing-services-marketing' },
              { name: 'Apple App Store Optimization', href: '/apple-app-store-optimization-services-ios' },
              { name: 'Android Game Marketing Services', href: '/android-game-marketing-services-eon8-marketing' },
            ],
          },
          {
            title: 'AR/VR Brand Innovation',
            items: [
              { name: 'Immersive Marketing with Augmented Reality', href: '/immersive-vr-marketing' },
              { name: 'End-to-End Augmented Reality Services', href: '/augmented-reality-agency' },
              { name: 'Social Media AR Campaigns', href: '/social-ar-solutions' },
              { name: 'Virtual Reality in Product Marketing', href: '/vr-product-marketing' },
            ],
          },
          {
            title: 'Metaverse Solutions',
            items: [
              { name: 'Strategic Branding in the Metaverse', href: '/metaverse' },
            ],
          },
        ],
      },
    ],
  },
];

const SIMPLE_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const { contact } = useSiteSettings();
  const { setContactModalOpen } = useAppStore();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavItemActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.submenu?.some((s) => s.href === pathname)) return true;
    if (
      item.megaSections?.some(
        (m) =>
          m.href === pathname ||
          m.items?.some((s) => s.href === pathname) ||
          m.subGroups?.some((g) => g.href === pathname || g.items.some((s) => s.href === pathname))
      )
    ) {
      return true;
    }
    return false;
  };

  const renderLink = (name: string, href: string, className: string) => {
    if (href.startsWith('/')) {
      return (
        <Link
          to={href}
          className={className}
          onClick={() => {
            setIsMobileMenuOpen(false);
            setActiveDropdown(null);
          }}
        >
          {name}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={className}
        target={href !== '#' ? '_blank' : undefined}
        rel="noreferrer"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {name}
      </a>
    );
  };

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-black/8 dark:border-white/10 ${
          isScrolled ? 'shadow-md' : 'shadow-xs'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 h-[74px] sm:h-[82px] flex items-center justify-between gap-2 xl:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 hover:opacity-95 transition-opacity">
            <img
              src="/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png"
              alt="Eon8 Logo"
              className="h-9 sm:h-10 lg:h-9 xl:h-11 w-auto max-w-[132px] xl:max-w-[170px] object-contain dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center justify-center gap-0 xl:gap-1 min-w-0"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item);
              return (
                <div
                  key={item.label}
                  className={item.isMega ? 'static' : 'relative'}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 text-[13px] xl:text-[14.5px] font-semibold py-2.5 px-2 xl:px-3 rounded-lg transition-colors whitespace-nowrap ${
                      active
                        ? 'text-[#FD5900]'
                        : 'text-[#171c21] dark:text-slate-100 hover:text-[#FD5900]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180 text-[#FD5900]' : 'opacity-70'
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className={`absolute top-full pt-2 z-50 ${
                          item.isMega
                            ? 'left-4 right-4 xl:left-8 xl:right-8 mx-auto max-w-[1060px]'
                            : 'left-0 w-72'
                        }`}
                      >
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl rounded-2xl p-6 text-left">
                          {item.isMega && item.megaSections ? (
                            <div className="grid grid-cols-3 gap-6">
                              {item.megaSections.map((section, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="space-y-4 border-r border-slate-100 dark:border-slate-800 last:border-r-0 pr-3 last:pr-0"
                                >
                                  {section.subGroups ? (
                                    section.subGroups.map((group) => (
                                      <div key={group.title} className="space-y-2 pb-2">
                                        {group.href ? (
                                          <Link
                                            to={group.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="text-[14px] font-bold text-slate-900 dark:text-slate-100 hover:text-[#FD5900] transition-colors inline-flex items-center gap-1 group/title"
                                          >
                                            <span>{group.title}</span>
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#FD5900]" />
                                          </Link>
                                        ) : (
                                          <h5 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">
                                            {group.title}
                                          </h5>
                                        )}
                                        <ul className="space-y-1">
                                          {group.items.map((subitem) => (
                                            <li key={subitem.name}>
                                              {renderLink(
                                                subitem.name,
                                                subitem.href,
                                                'text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-[#0053C6] dark:hover:text-blue-400 transition-colors block py-0.5 leading-snug'
                                              )}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="space-y-2">
                                      {section.href ? (
                                        <Link
                                          to={section.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="text-[14px] font-bold text-slate-900 dark:text-slate-100 hover:text-[#FD5900] transition-colors inline-flex items-center gap-1 group/title"
                                        >
                                          <span>{section.title}</span>
                                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#FD5900]" />
                                        </Link>
                                      ) : (
                                        section.title && (
                                          <h5 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">
                                            {section.title}
                                          </h5>
                                        )
                                      )}
                                      <ul className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                                        {section.items?.map((subitem) => (
                                          <li key={subitem.name}>
                                            {renderLink(
                                              subitem.name,
                                              subitem.href,
                                              'text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-[#0053C6] dark:hover:text-blue-400 transition-colors block py-0.5 leading-snug'
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-1.5 max-h-[65vh] overflow-y-auto custom-scrollbar">
                              {item.submenu?.map((subitem) => (
                                <li key={subitem.name}>
                                  {renderLink(
                                    subitem.name,
                                    subitem.href,
                                    'text-[13.5px] font-medium text-slate-600 dark:text-slate-300 hover:text-[#0053C6] dark:hover:text-blue-400 transition-colors block py-1 leading-snug'
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {SIMPLE_LINKS.map((link) => {
              const active = pathname === link.href || (link.href === '/blog' && pathname === '/digital-marketing-blog');
              return (
                <span key={link.label}>
                  {renderLink(
                    link.label,
                    link.href,
                    `text-[13px] xl:text-[14.5px] font-semibold py-2.5 px-2 xl:px-3 rounded-lg transition-colors whitespace-nowrap ${
                      active ? 'text-[#FD5900]' : 'text-[#171c21] dark:text-slate-100 hover:text-[#FD5900]'
                    }`
                  )}
                </span>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <ThemeToggleButton className="relative inline-flex h-10 w-10 xl:h-11 xl:w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0" />

            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="hidden lg:inline-flex items-center justify-center bg-[#FD5900] hover:bg-[#e55000] text-white font-semibold text-[13px] xl:text-[15px] px-3.5 xl:px-5 py-2 xl:py-2.5 min-h-[40px] xl:min-h-[44px] rounded-[7px] transition-colors shadow-sm whitespace-nowrap cursor-pointer shrink-0"
            >
              Get Started
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[74px] sm:h-[82px]" aria-hidden="true" />

      {/* Mobile Offcanvas Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[min(90vw,24rem)] bg-white dark:bg-slate-950 border-l border-border z-50 p-5 sm:p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div className="flex flex-col min-h-0 flex-1">
                <div className="flex items-center justify-between mb-6 shrink-0">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <img
                      src="/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png"
                      alt="Eon8 Logo"
                      className="h-9 w-auto dark:invert"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-11 w-11 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2 overflow-y-auto pr-1 custom-scrollbar flex-1">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label} className="border-b border-border/50 pb-2">
                      <div className="flex items-center justify-between w-full">
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 text-[15px] font-semibold py-2.5 text-slate-800 dark:text-slate-100 hover:text-[#FD5900]"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMobileSubmenu(activeMobileSubmenu === item.label ? null : item.label)
                          }
                          className="h-11 w-11 inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#FD5900]"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeMobileSubmenu === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {activeMobileSubmenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-3 space-y-2 pb-2"
                          >
                            {item.isMega
                              ? item.megaSections?.map((sect, sIdx) => (
                                  <div key={sIdx} className="space-y-2.5 pt-2 border-t border-border/40 first:border-t-0 first:pt-0">
                                    {sect.subGroups
                                      ? sect.subGroups.map((group) => (
                                          <div key={group.title} className="space-y-1">
                                            {group.href ? (
                                              <Link
                                                to={group.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#FD5900]"
                                              >
                                                {group.title}
                                              </Link>
                                            ) : (
                                              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                                                {group.title}
                                              </div>
                                            )}
                                            {group.items.map((sub) => (
                                              <span key={sub.name} className="block">
                                                {renderLink(
                                                  sub.name,
                                                  sub.href,
                                                  'text-[13.5px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#0053C6] block py-1.5'
                                                )}
                                              </span>
                                            ))}
                                          </div>
                                        ))
                                      : (
                                        <div className="space-y-1">
                                          {sect.title && (
                                            sect.href ? (
                                              <Link
                                                to={sect.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#FD5900]"
                                              >
                                                {sect.title}
                                              </Link>
                                            ) : (
                                              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                                                {sect.title}
                                              </div>
                                            )
                                          )}
                                          {sect.items?.map((sub) => (
                                            <span key={sub.name} className="block">
                                              {renderLink(
                                                sub.name,
                                                sub.href,
                                                'text-[13.5px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#0053C6] block py-1.5'
                                              )}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                  </div>
                                ))
                              : item.submenu?.map((sub) => (
                                  <span key={sub.name} className="block">
                                    {renderLink(
                                      sub.name,
                                      sub.href,
                                      'text-[13.5px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#0053C6] block py-1.5'
                                    )}
                                  </span>
                                ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {SIMPLE_LINKS.map((link) => (
                    <span key={link.label} className="block border-b border-border/50">
                      {renderLink(
                        link.label,
                        link.href,
                        'block text-[15px] font-semibold py-3 text-slate-800 dark:text-slate-100 hover:text-[#FD5900]'
                      )}
                    </span>
                  ))}

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setContactModalOpen(true);
                      }}
                      className="w-full py-3 px-4 rounded-lg bg-[#FD5900] hover:bg-[#e55000] text-white font-semibold text-sm text-center"
                    >
                      Get Started
                    </button>
                  </div>
                </nav>
              </div>

              <div className="border-t border-border pt-4 mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-400 shrink-0">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FD5900]" />
                  <a href={telHref(contact.phone)} className="hover:text-[#0053C6] font-medium">{contact.phone}</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#0053C6]" />
                  <a href={`mailto:${contact.email}`} className="hover:text-[#0053C6] font-medium">{contact.email}</a>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0053C6] shrink-0 mt-0.5" />
                  <span>Mumbai, Hyderabad, Bangalore, Chennai</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
