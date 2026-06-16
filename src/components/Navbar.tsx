import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Navigation Data structure for mega-menus and dropdowns
const NAV_ITEMS = [
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
      { name: 'Crypto PR Services', href: 'https://www.eon8.com/crypto-pr-services/' },
      { name: 'Crypto Influencer Marketing', href: 'https://www.eon8.com/crypto-influencer-marketing/' },
      { name: 'Crypto Telegram Marketing', href: 'https://www.eon8.com/crypto-telegram-marketing/' },
      { name: 'Crypto Community Marketing', href: 'https://www.eon8.com/crypto-community-marketing/' },
      { name: 'Crypto Video Creation & Marketing', href: 'https://www.eon8.com/crypto-video-creation-marketing/' },
      { name: 'Crypto Twitter Influencer Marketing', href: 'https://www.eon8.com/crypto-twitter-influencer-marketing/' },
      { name: 'ICO Marketing Agency', href: 'https://www.eon8.com/ico-marketing-agency/' },
      { name: 'IDO Marketing Agency', href: 'https://www.eon8.com/ido-marketing-agency/' },
      { name: 'IEO Marketing Agency', href: 'https://www.eon8.com/ieo-marketing-agency/' },
      { name: 'Crypto KOL Agency', href: 'https://www.eon8.com/crypto-kol-agency/' },
      { name: 'STO Marketing Agency', href: 'https://www.eon8.com/sto-marketing-agency/' },
      { name: 'ICO Listing Services', href: 'https://www.eon8.com/ico-listing-services/' },
      { name: 'IEO Listing Services', href: 'https://www.eon8.com/ieo-listing-services/' },
    ]
  },
  {
    label: 'Influencer',
    href: '#',
    submenu: [
      { name: 'Influencer Marketing Agency', href: 'https://www.eon8.com/influencer-marketing-agency/' },
      { name: 'Insta Influencer Marketing Agency', href: 'https://www.eon8.com/instagram-influencer-marketing-agency/' },
      { name: 'TikTok Influencer Marketing', href: 'https://www.eon8.com/tiktok-influencer-marketing/' },
      { name: 'Youtube Influencer Services', href: 'https://www.eon8.com/youtube-influencer-services/' },
      { name: 'Twitter Influencer Marketing', href: 'https://www.eon8.com/twitter-influencer-marketing/' }
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
          { name: 'NFT Marketing Services', href: 'https://www.eon8.com/nft-marketing-services/' },
          { name: 'NFT Art Agency', href: 'https://www.eon8.com/nft-art-agency/' },
          { name: 'NFT Collection Marketing', href: 'https://www.eon8.com/nft-collection-marketing/' },
          { name: 'NFT Community Marketing', href: 'https://www.eon8.com/nft-community-marketing/' },
          { name: 'NFT Game Marketing Services', href: 'https://www.eon8.com/nft-game-marketing-services/' },
          { name: 'NFT Social Media Marketing', href: 'https://www.eon8.com/nft-social-media-marketing/' },
          { name: 'NFT PR Services', href: 'https://www.eon8.com/nft-pr-services/' },
          { name: 'NFT Telegram Marketing', href: 'https://www.eon8.com/nft-telegram-marketing/' },
          { name: 'NFT Twitter Marketing', href: 'https://www.eon8.com/nft-twitter-marketing/' },
        ]
      },
      {
        title: 'Discord & Community',
        items: [
          { name: 'Discord Marketing Agency', href: 'https://www.eon8.com/discord-marketing-agency/' },
          { name: 'Discord Game Marketing Agency', href: 'https://www.eon8.com/discord-game-marketing-agency/' },
          { name: 'Discord Server Marketing', href: 'https://www.eon8.com/discord-server-marketing/' },
          { name: 'Discord Moderation Services', href: 'https://www.eon8.com/discord-moderation-services/' },
          { name: 'Reddit Community Marketing', href: 'https://www.eon8.com/reddit-community-marketing-agency/' },
          { name: 'Discord Community Building', href: 'https://www.eon8.com/discord-community-building-services/' },
          { name: 'NFT Game Reddit Marketing', href: 'https://www.eon8.com/nft-game-reddit-marketing/' },
          { name: 'PR Marketing Agency', href: 'https://www.eon8.com/pr-marketing-agency/' }
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
        title: 'Digital & SEO',
        items: [
          { name: 'Search Engine Optimization (SEO)', href: 'https://www.eon8.com/search-engine-optimization-services-seo/' },
          { name: 'Local SEO Services', href: 'https://www.eon8.com/local-seo-agency/' },
          { name: 'eCommerce SEO Services', href: 'https://www.eon8.com/ecommerce-seo-services/' },
          { name: 'Mobile SEO Service', href: 'https://www.eon8.com/mobile-seo-agency-eon8-seo-services/' },
          { name: 'SEO for Small Business', href: 'https://www.eon8.com/small-business-seo-services/' },
          { name: 'Link Building Service', href: 'https://www.eon8.com/link-building-services-for-high-rankings/' },
          { name: 'Game Marketing Agency', href: 'https://www.eon8.com/game-marketing-agency-video-mobile-gaming/' },
          { name: 'Ecommerce Development', href: 'https://www.eon8.com/ecommerce-website-development-services/' },
          { name: 'Web Design & Development', href: 'https://www.eon8.com/web-design-development-services-chennai/' }
        ]
      },
      {
        title: 'Social & Paid Ads',
        items: [
          { name: 'Social Media Brand Management', href: 'https://www.eon8.com/social-media-brand-management-agency-chennai/' },
          { name: 'Best Social Media Management', href: 'https://www.eon8.com/social-media-management-agency-chennai/' },
          { name: 'Facebook Marketing Agency', href: 'https://www.eon8.com/facebook-marketing-agency-in-chennai/' },
          { name: 'Twitter Marketing Agency', href: 'https://www.eon8.com/twitter-marketing-agency-in-chennai-marketing/' },
          { name: 'Instagram Marketing Agency', href: 'https://www.eon8.com/instagram-marketing-agency-services-instagram/' },
          { name: 'LinkedIn Marketing Agency', href: 'https://www.eon8.com/linkedin-marketing-agency-chennai-services/' },
          { name: 'YouTube Marketing Company', href: 'https://www.eon8.com/youtube-marketing-company-chennai-eon8/' },
          { name: 'Search Advertising (PPC)', href: 'https://www.eon8.com/search-advertising-company/' },
          { name: 'Display Advertising Agency', href: 'https://www.eon8.com/display-advertising-agency/' }
        ]
      },
      {
        title: 'App & ORM & Innovation',
        items: [
          { name: 'Android App Marketing Services', href: 'https://www.eon8.com/android-apps-marketing-services-marketing/' },
          { name: 'Apple App Store Optimization', href: 'https://www.eon8.com/apple-app-store-optimization-services-ios/' },
          { name: 'Reputation Management Services', href: 'https://www.eon8.com/reputation-management-services/' },
          { name: 'Online Reputation Management', href: 'https://www.eon8.com/online-reputation-management-agency/' },
          { name: 'Immersive AR Marketing', href: 'https://www.eon8.com/immersive-vr-marketing/' },
          { name: 'Augmented Reality Agency', href: 'https://www.eon8.com/augmented-reality-agency/' },
          { name: 'Strategic Metaverse Branding', href: 'https://www.eon8.com/metaverse/' }
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
            ? 'top-0 w-full bg-background/95 dark:bg-slate-950/95 border-b border-border/40 shadow-md h-16 px-6 backdrop-blur-md'
            : 'top-4 max-w-6xl mx-auto w-[calc(100%-2rem)] bg-white/80 dark:bg-slate-900/80 border border-border/40 shadow-lg h-20 rounded-full px-8 backdrop-blur-md'
        }`}
        style={!isScrolled ? {
          boxShadow: '0 8px 32px 0 rgba(0, 102, 255, 0.08)',
          background: 'linear-gradient(to right, rgba(var(--glass-bg), 0.8), rgba(var(--glass-bg), 0.85))'
        } : {}}
      >
        {/* Animated Gradient Border Overlay for Floating Capsule */}
        {!isScrolled && (
          <div className="absolute inset-0 -z-10 rounded-full p-[1.5px] bg-gradient-to-r from-orange-500 via-primary to-blue-500 opacity-60 pointer-events-none" />
        )}

        <div className="flex items-center justify-between w-full relative">
          
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-95 transition-opacity shrink-0">
            <img
              src="/imgs/Logo-White-BG-removebg-preview.png"
              alt="Eon8 Logo"
              className={`object-contain transition-all duration-500 ${
                isScrolled ? 'h-10' : 'h-12'
              } dark:invert`}
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-semibold py-2 px-3 text-foreground/80 hover:text-primary transition-colors cursor-pointer"
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
                        item.isMega ? 'w-[580px] xl:w-[700px]' : 'w-72'
                      }`}
                    >
                      <div className="bg-popover border border-border/50 rounded-2xl shadow-xl shadow-black/10 p-5 backdrop-blur-md grid gap-6 grid-cols-1 md:grid-cols-12">
                        {item.isMega ? (
                          // Mega Menu Content
                          item.megaSections?.map((section) => (
                            <div key={section.title} className="md:col-span-6 last:md:col-span-12 last:md:grid last:md:grid-cols-2 last:md:gap-x-4 border-l border-border/10 pl-4 first:border-l-0 first:pl-0">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{section.title}</h5>
                              <ul className="space-y-2">
                                {section.items.map((subitem) => (
                                  <li key={subitem.name}>
                                    {renderLink(subitem.name, subitem.href, "text-xs font-medium text-foreground/70 hover:text-primary hover:underline transition-all block py-1")}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          // Standard Dropdown List
                          <ul className="md:col-span-12 space-y-2.5">
                            {item.submenu?.map((subitem) => (
                              <li key={subitem.name}>
                                {renderLink(subitem.name, subitem.href, "text-xs font-medium text-foreground/70 hover:text-primary hover:underline transition-all block py-1")}
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
                {renderLink(link.label, link.href, "text-sm font-semibold py-2 px-3 text-foreground/80 hover:text-primary hover:underline transition-all")}
              </span>
            ))}
          </nav>

          {/* Action Bar */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggleButton />
            
            <Link to="/contact" className="hidden md:inline-flex">
              <Button className="rounded-full bg-gradient-to-r from-orange-500 to-primary text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
                Get Consultation
              </Button>
            </Link>

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
                              item.megaSections?.map((sect) => (
                                <div key={sect.title} className="space-y-1.5 py-1">
                                  <div className="text-[10px] font-bold text-muted-foreground uppercase">{sect.title}</div>
                                  {sect.items.map((sub) => (
                                    <span key={sub.name} className="block py-1">
                                      {renderLink(sub.name, sub.href, "text-sm font-medium text-foreground/60 hover:text-primary hover:underline block")}
                                    </span>
                                  ))}
                                </div>
                              ))
                            ) : (
                              item.submenu?.map((sub) => (
                                <span key={sub.name} className="block py-1">
                                  {renderLink(sub.name, sub.href, "text-sm font-medium text-foreground/60 hover:text-primary hover:underline block")}
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
