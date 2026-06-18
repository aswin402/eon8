import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

interface SubItem {
  name: string;
  href: string;
}

interface MegaSubGroup {
  title: string;
  items: SubItem[];
}

interface MegaSection {
  title?: string;
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

// Navigation Data structure for mega-menus and dropdowns
const NAV_ITEMS: NavItem[] = [
  {
    label: 'AI-Agent',
    href: '#',
    submenu: [
      { name: 'AI Agent Development Services', href: '/ai-agent-development-services' }
    ]
  },
  {
    label: 'Crypto',
    href: '#',
    submenu: [
      { name: 'Crypto Marketing', href: 'https://www.eon8.com/crptocurrency-marketing-agency/' },
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
      { name: 'IEO Listing Services', href: '/ieo-listing-services' },
    ]
  },
  {
    label: 'Influencer',
    href: '#',
    submenu: [
      { name: 'Influencer Marketing Agency', href: '/influencer-marketing-agency' },
      { name: 'Insta Influencer Marketing Agency', href: '/instagram-influencer-marketing-agency' },
      { name: 'TikTok Influencer Marketing', href: '/tiktok-influencer-marketing' },
      { name: 'Youtube Influencer Services', href: '/youtube-influencer-services' },
      { name: 'Twitter Influencer Marketing', href: '/twitter-influencer-marketing' }
    ]
  },
  {
    label: 'NFT',
    href: '#',
    isMega: true,
    megaSections: [
      {
        title: 'NFT Marketing',
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
        ]
      },
      {
        title: 'Discord Marketing',
        items: [
          { name: 'Discord Marketing Agency', href: '/discord-marketing-agency' },
          { name: 'Discord Game Marketing Agency', href: '/discord-game-marketing-agency' },
          { name: 'Discord server marketing', href: '/discord-server-marketing' },
          { name: 'Discord Moderation Services', href: '/discord-moderation-services' },
        ]
      },
      {
        title: 'Community',
        items: [
          { name: 'Reddit Community Marketing Agency', href: '/reddit-community-marketing-agency' },
          { name: 'Discord Community Building Services', href: '/discord-community-building-services' },
          { name: 'NFT Game Reddit Marketing', href: '/nft-game-reddit-marketing' },
          { name: 'PR Marketing Agency', href: '/pr-marketing-agency' }
        ]
      }
    ]
  },
  {
    label: 'Our Services',
    href: '#',
    isMega: true,
    megaSections: [
      {
        title: 'Digital Marketing Agency',
        items: [
          { name: 'Search Engine Optimization SEO', href: '/search-engine-optimization-services-seo' },
          { name: 'Local SEO services', href: '/local-seo-agency' },
          { name: 'eCommerce SEO services', href: '/ecommerce-seo-services' },
          { name: 'Mobile SEO Service', href: '/mobile-seo-agency-eon8-seo-services' },
          { name: 'SEO for Small Business', href: '/small-business-seo-services' },
          { name: 'Link Building Service', href: '/link-building-services-for-high-rankings' },
          { name: 'Game Marketing Agency', href: '/game-marketing-agency-video-mobile-gaming' },
          { name: 'Ecommerce Development Services', href: '/ecommerce-website-development-services' },
          { name: 'Web Design & Development', href: '/web-design-development-services-chennai' }
        ]
      },
      {
        subGroups: [
          {
            title: 'Social Media Marketing',
            items: [
              { name: 'Social Media Brand Management Agency', href: '/social-media-brand-management-agency-chennai' },
              { name: 'Best Social Media Management Agency', href: '/social-media-management-agency-chennai' },
              { name: 'Facebook Marketing Agency', href: '/facebook-marketing-agency-in-chennai' },
              { name: 'Twitter Marketing Agency', href: '/twitter-marketing-agency-in-chennai-marketing' },
              { name: 'Instagram Marketing Agency Insta', href: '/instagram-marketing-agency-services-instagram' },
              { name: 'LinkedIn marketing agency', href: '/linkedin-marketing-agency-chennai-services' },
              { name: 'YouTube marketing company', href: '/youtube-marketing-company-chennai-eon8' }
            ]
          },
          {
            title: 'ORM Services',
            items: [
              { name: 'Reputation management services', href: '/reputation-management-services' },
              { name: 'Online Reputation Management', href: '/online-reputation-management-agency' },
              { name: 'Clean Negative search results', href: '/clean-negative-search-results' },
              { name: 'Google Complaint Removal', href: '/google-complaint-removal' },
              { name: 'Complaints board removal', href: '/complaints-board-removal' },
              { name: 'Consumer complaints removal', href: '/consumer-complaints-removal' }
            ]
          }
        ]
      },
      {
        subGroups: [
          {
            title: 'Pay-Per-Click',
            items: [
              { name: 'Search Advertising Company', href: '/search-advertising-company' },
              { name: 'Display Advertising Agency', href: '/display-advertising-agency' },
              { name: 'Remarketing and Retargeting Ads', href: '/best-remarketing-ad-agency' },
              { name: 'Product Listing Ads Agency', href: '/product-listing-ads-agency' }
            ]
          },
          {
            title: 'App Marketing',
            items: [
              { name: 'Android App Marketing Services', href: '/android-apps-marketing-services-marketing' },
              { name: 'Apple App Store Optimization', href: '/apple-app-store-optimization-services-ios' },
              { name: 'Android Game Marketing Services', href: '/android-game-marketing-services-eon8-marketing' }
            ]
          },
          {
            title: 'AR/VR Brand Innovation',
            items: [
              { name: 'Immersive Marketing with Augmented Reality', href: '/immersive-vr-marketing' },
              { name: 'End-to-End Augmented Reality Services', href: '/augmented-reality-agency' },
              { name: 'Social Media AR Campaigns', href: '/social-ar-solutions' },
              { name: 'Virtual Reality in Product Marketing', href: '/vr-product-marketing' }
            ]
          },
          {
            title: 'Metaverse Solutions',
            items: [
              { name: 'Strategic Branding in the Metaverse', href: '/metaverse' }
            ]
          }
        ]
      }
    ]
  }
];

const SIMPLE_LINKS = [
  { label: 'Blog', href: 'https://www.eon8.com/digital-marketing-blog/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  // Monitor Scroll state to change capsule layout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to render relative Router Link or absolute anchor tag
  const renderLink = (name: string, href: string, className: string) => {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={className} onClick={() => setIsMobileMenuOpen(false)}>
          {name}
        </Link>
      );
    }
    return (
      <a href={href} className={className} target={href !== '#' ? '_blank' : undefined} rel="noreferrer">
        {name}
      </a>
    );
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex items-center ${
          isScrolled
            ? 'top-0 w-full bg-white/95 dark:bg-slate-950/95 border-b border-border/40 shadow-md h-20 px-6 backdrop-blur-md'
            : 'top-4 max-w-[1250px] mx-auto w-[calc(100%-2rem)] bg-white dark:bg-slate-900 shadow-lg h-24 rounded-full px-8 lg:px-10'
        }`}
        style={!isScrolled ? {
          boxShadow: '0 8px 32px 0 rgba(0, 102, 255, 0.08)',
        } : {}}
      >
        {/* Animated Gradient Border Overlay for Floating Capsule */}
        {!isScrolled && (
          <div className="absolute inset-0 -z-10 rounded-full p-[2px] bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 pointer-events-none">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900" />
          </div>
        )}

        <div className="flex items-center justify-between lg:justify-center w-full h-full relative lg:gap-8 xl:gap-12">
          
          {/* Logo - Left Block in Flex Flow */}
          <div className="flex justify-start shrink-0 z-10 pl-6 lg:pl-0">
            <Link to="/" className="flex items-center hover:opacity-95 transition-opacity">
              <img
                src="/imgs/Logo-White-BG-removebg-preview.png"
                alt="Eon8 Logo"
                className={`object-contain transition-all duration-500 ${
                  isScrolled ? 'h-12' : 'h-14'
                } dark:invert`}
              />
            </Link>
          </div>

          {/* Desktop Nav Items - Centered relative to capsule container */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-xs lg:text-[13px] xl:text-[14px] font-semibold py-2 px-1.5 lg:px-2 xl:px-3 text-foreground/80 hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === item.label ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Box */}
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 ${
                        item.isMega ? 'w-[1000px] xl:w-[1150px]' : 'w-72'
                      }`}
                    >
                      <div className="bg-popover border border-border/50 rounded-2xl shadow-xl shadow-black/10 p-7 backdrop-blur-md">
                        {item.isMega ? (
                          // Mega Menu Content - Dynamic columns depending on count
                          <div className={`grid gap-8 ${
                            item.megaSections?.length === 3
                              ? 'grid-cols-1 md:grid-cols-3'
                              : 'grid-cols-1 md:grid-cols-2'
                          }`}>
                            {item.megaSections?.map((section, idx) => (
                              <div
                                key={idx}
                                className={`space-y-6 ${
                                  idx > 0 ? 'md:pl-6' : ''
                                }`}
                              >
                                {section.subGroups ? (
                                  section.subGroups.map((group) => (
                                    <div key={group.title} className="space-y-3">
                                      <h5 className="text-[14px] md:text-[15px] font-bold text-slate-900 dark:text-slate-100 tracking-normal normal-case mb-1">
                                        {group.title}
                                      </h5>
                                      <ul className="space-y-1.5">
                                        {group.items.map((subitem) => (
                                          <li key={subitem.name}>
                                            {renderLink(
                                              subitem.name,
                                              subitem.href,
                                              "text-[13px] md:text-[13.5px] font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all hover:translate-x-1 duration-200 block py-0.5"
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))
                                ) : (
                                  <div className="space-y-3">
                                    {section.title && (
                                      <h5 className="text-[14px] md:text-[15px] font-bold text-slate-900 dark:text-slate-100 tracking-normal normal-case mb-1">
                                        {section.title}
                                      </h5>
                                    )}
                                    <ul className="space-y-1.5">
                                      {section.items?.map((subitem) => (
                                        <li key={subitem.name}>
                                          {renderLink(
                                            subitem.name,
                                            subitem.href,
                                            "text-[13px] md:text-[13.5px] font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all hover:translate-x-1 duration-200 block py-0.5"
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
                          // Standard Dropdown List
                          <ul className="space-y-2">
                            {item.submenu?.map((subitem) => (
                              <li key={subitem.name}>
                                {renderLink(
                                  subitem.name,
                                  subitem.href,
                                  "text-[13px] md:text-[13.5px] font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all hover:translate-x-1 duration-200 block py-0.5"
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
            ))}

            {/* Simple static links */}
            {SIMPLE_LINKS.map((link) => (
              <span key={link.label}>
                {renderLink(link.label, link.href, "text-xs lg:text-[13px] xl:text-[14px] font-semibold py-2 px-1.5 lg:px-2 xl:px-3 text-foreground/80 hover:text-primary hover:underline transition-all whitespace-nowrap")}
              </span>
            ))}
          </nav>

          {/* Action Bar - Pinned Right */}
          <div className="flex items-center justify-end shrink-0 pr-6 lg:pr-0">
            {/* Desktop Theme Toggle (always visible near Contact Us) */}
            <div className="hidden lg:block">
              <ThemeToggleButton />
            </div>

            {/* Mobile/Tablet action buttons (always visible on smaller screens) */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggleButton />
            </div>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Offcanvas Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Drawer Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 bg-card border-l border-border/40 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/imgs/Logo-White-BG-removebg-preview.png" alt="Eon8 Logo" className="h-9 dark:invert" />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-foreground/70 hover:bg-muted/40 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav list */}
                <nav className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Navigations</div>
                  
                  {/* Dropdowns */}
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label} className="border-b border-border/10 pb-2">
                      <button
                        onClick={() => setActiveMobileSubmenu(
                          activeMobileSubmenu === item.label ? null : item.label
                        )}
                        className="flex items-center justify-between w-full text-base font-semibold py-2 text-foreground/80 hover:text-primary transition-all"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                          activeMobileSubmenu === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {/* Sub-menu drawer collapse */}
                      <AnimatePresence>
                        {activeMobileSubmenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 space-y-2 mt-1"
                          >
                            {item.isMega ? (
                              item.megaSections?.map((sect, sIdx) => (
                                <div key={sIdx} className="space-y-4 py-2 border-t border-border/5 first:border-t-0 first:pt-0">
                                  {sect.subGroups ? (
                                    sect.subGroups.map((group) => (
                                      <div key={group.title} className="space-y-1.5">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">{group.title}</div>
                                        {group.items.map((sub) => (
                                          <span key={sub.name} className="block py-1">
                                            {renderLink(sub.name, sub.href, "text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary block")}
                                          </span>
                                        ))}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="space-y-1.5">
                                      {sect.title && (
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">{sect.title}</div>
                                      )}
                                      {sect.items?.map((sub) => (
                                        <span key={sub.name} className="block py-1">
                                          {renderLink(sub.name, sub.href, "text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary block")}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              item.submenu?.map((sub) => (
                                <span key={sub.name} className="block py-1">
                                  {renderLink(sub.name, sub.href, "text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary block")}
                                </span>
                              ))
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Simple Links */}
                  {SIMPLE_LINKS.map((link) => (
                    <span key={link.label} className="block">
                      {renderLink(link.label, link.href, "block text-base font-semibold py-2 border-b border-border/10 text-foreground/80 hover:text-primary transition-all")}
                    </span>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer info */}
              <div className="border-t border-border/40 pt-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+919042294007" className="hover:text-primary">+91 90422 94007</a>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:info@eon8.com" className="hover:text-primary font-mono">info@eon8.com</a>
                </div>
                <div className="flex items-start gap-3 text-xs text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
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
