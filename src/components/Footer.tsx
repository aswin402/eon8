import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Whatsapp', icon: '/imgs/Whatsapp-1.png', href: 'https://api.whatsapp.com/send?phone=919042294007' },
    { name: 'Instagram', icon: '/imgs/Instagram-1.png', href: 'https://www.instagram.com/eon8_official/' },
    { name: 'Facebook', icon: '/imgs/Facebook-1.png', href: 'https://www.facebook.com/people/Eon8-The-Digital-Infinity/61588594388907/' },
    { name: 'LinkedIn', icon: '/imgs/Linkedin-1.png', href: 'https://www.linkedin.com/company/eon-8/' },
    { name: 'Twitter', icon: '/imgs/twitter-1.png', href: 'https://x.com/eon8digital' },
    { name: 'YouTube', icon: '/imgs/youtube.png', href: 'https://www.youtube.com/@Eon8TheDigitalInfinity/videos' }
  ];

  const servicesLinks = [
    { name: 'Digital Marketing Services', href: 'https://www.eon8.com/search-engine-optimization-services-seo/' },
    { name: 'Search Engine Optimization (SEO)', href: 'https://www.eon8.com/search-engine-optimization-services-seo/' },
    { name: 'Social Media Management', href: 'https://www.eon8.com/social-media-management-agency-chennai/' },
    { name: 'Crypto Marketing Services', href: 'https://www.eon8.com/crptocurrency-marketing-agency/' },
    { name: 'NFT Marketing Agency', href: 'https://www.eon8.com/nft-marketing-services/' },
    { name: 'AI Agent Development', href: '/ai-agent-development-services' }
  ];

  const policyLinks = [
    { name: 'Blog', href: 'https://www.eon8.com/digital-marketing-blog/' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: 'https://www.eon8.com/privacy-policy-2/' },
    { name: 'Refund Policy', href: 'https://www.eon8.com/refund-policy/' },
    { name: 'Terms And Conditions', href: 'https://www.eon8.com/terms-and-conditions/' },
    { name: 'Delivery Policy', href: 'https://www.eon8.com/delivery-policy/' }
  ];

  const certLogos = [
    '/imgs/top-digital.svg',
    '/imgs/digi-mar-ag.png',
    '/imgs/clutch.png',
    '/imgs/top-digital-marketing-agencies.svg',
    '/imgs/google-partner.png'
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white relative z-10 pt-24 pb-8 px-6 mt-20 border-t border-blue-500/10">
      
      {/* Floating Contact Ribbon (Centered Panel) */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border border-border/40 shadow-xl rounded-2xl px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 w-[calc(100%-2rem)] max-w-4xl z-20">
        <div className="flex items-center gap-3 text-slate-800 dark:text-white font-medium text-sm md:text-base">
          <Phone className="w-5 h-5 text-orange-500 shrink-0" />
          <a href="tel:+919042294007" className="hover:text-primary transition-colors">+91 90422 94007</a>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800" />
        
        <div className="flex items-center gap-3 text-slate-800 dark:text-white font-medium text-sm md:text-base">
          <Mail className="w-5 h-5 text-primary shrink-0" />
          <a href="mailto:info@eon8.com" className="hover:text-primary transition-colors font-mono">info@eon8.com</a>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800" />
        
        <div className="flex items-center gap-3 text-slate-800 dark:text-white font-medium text-xs md:text-sm text-center md:text-left">
          <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
          <span>Mumbai, Hyderabad, Bangalore, Chennai</span>
        </div>
      </div>

      {/* Footer Grid Tree */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 pt-8 md:pt-4">
        
        {/* Profile Desc */}
        <div className="col-span-1 md:col-span-4 space-y-4">
          <h3 className="text-xl font-heading font-extrabold text-white tracking-wide border-l-4 border-orange-500 pl-3">Who We Are</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-body">
            Touted as one of the fastest-growing Digital marketing companies, EON8 stands to be your one-stop destination for all digital marketing solutions. We deliver passionate, tailor-made, and a full suite of digital services that generate increased sales & fetch outstanding business growth online. Looking for a major feat? Let’s make it happen!
          </p>
        </div>

        {/* Services Links */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <h3 className="text-xl font-heading font-extrabold text-white tracking-wide border-l-4 border-primary pl-3">Our Services</h3>
          <ul className="space-y-2.5 font-body text-sm">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/') ? (
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 opacity-55 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 group"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 opacity-55 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Policy Links */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h3 className="text-xl font-heading font-extrabold text-white tracking-wide border-l-4 border-blue-500 pl-3">Other Links</h3>
          <ul className="space-y-2.5 font-body text-sm">
            {policyLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/') ? (
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors block py-0.5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Badges Grid */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <h3 className="text-xl font-heading font-extrabold text-white tracking-wide border-l-4 border-orange-500 pl-3">Social Media</h3>
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 group"
                title={social.name}
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Certifications and Main logo wrapper */}
      <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 pb-4 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left: Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
          {certLogos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt="Certification Badge"
              className="h-10 object-contain filter grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
            />
          ))}
        </div>

        {/* Right: Large Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img
              src="/imgs/Logo_bg-1.png"
              alt="Eon8 Footer Logo"
              className="h-14 object-contain"
            />
          </Link>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-6xl mx-auto border-t border-white/5 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-xs text-slate-500 text-center">
        <p>© {currentYear} EON8. All rights reserved.</p>
        <p className="flex items-center gap-1 justify-center">
          Redesigned and modernized in React with <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" /> for high responsiveness.
        </p>
      </div>

    </footer>
  );
}
