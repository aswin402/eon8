import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Whatsapp', icon: '/wp-content/uploads/2026/03/Whatsapp-1.png', href: 'https://api.whatsapp.com/send?phone=919042294007' },
    { name: 'Instagram', icon: '/wp-content/uploads/2026/03/Instagram-1.png', href: 'https://www.instagram.com/eon8_official/' },
    { name: 'Facebook', icon: '/wp-content/uploads/2026/03/Facebook-1.png', href: 'https://www.facebook.com/people/Eon8-The-Digital-Infinity/61588594388907/' },
    { name: 'LinkedIn', icon: '/wp-content/uploads/2026/03/Linkedin-1.png', href: 'https://www.linkedin.com/company/eon-8/' },
    { name: 'Twitter', icon: '/wp-content/uploads/2026/03/twitter-1.png', href: 'https://x.com/eon8digital' },
    { name: 'YouTube', icon: '/wp-content/uploads/2026/03/youtube.png', href: 'https://www.youtube.com/@Eon8TheDigitalInfinity/videos' },
  ];

  const servicesLinks = [
    { name: 'Digital Marketing', href: '/search-engine-optimization-services-seo' },
    { name: 'Social Media Marketing', href: '/social-media-management-agency-chennai' },
    { name: 'AI Agent Development', href: '/ai-agent-development-services' },
    { name: 'AI Video Creation', href: '/ai-video-creation' },
    { name: 'ERP & CRM Software', href: '/erp-software-development' },
    { name: 'Works & Case Studies', href: '/works' },
    { name: 'SEO Packages', href: '/seo-packages' },
  ];

  const otherLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy-2' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Terms And Conditions', href: '/terms-and-conditions' },
    { name: 'Delivery Policy', href: '/delivery-policy' },
  ];

  const certLogos = [
    { alt: 'Top Digital Agency', src: '/wp-content/uploads/2022/02/top-digital.svg' },
    { alt: 'Digital Marketing Agency Award', src: '/wp-content/uploads/2022/02/digi-mar-ag.png' },
    { alt: 'Clutch Top Agency', src: '/wp-content/uploads/2022/02/clutch.png' },
    { alt: 'Top Digital Marketing Agencies', src: '/wp-content/uploads/2022/07/top-digital-marketing-agencies.svg' },
    { alt: 'Google Partner', src: '/wp-content/uploads/2022/11/google-partner.png' },
  ];

  return (
    <footer
      className="w-full text-white relative z-10 pt-24 sm:pt-20 pb-6 px-4 sm:px-6 mt-16 font-body"
      style={{ background: 'linear-gradient(135deg, #0b1220, #1e293b)' }}
    >
      {/* Floating Contact Bar */}
      <div className="max-w-4xl mx-auto -mt-32 sm:-mt-28 mb-12 bg-[#f8fafc] text-slate-900 rounded-xl px-5 sm:px-9 py-4 sm:py-5 shadow-2xl flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10 border border-slate-200/80">
        <a
          href="tel:+919042294007"
          className="flex items-center gap-2.5 text-slate-900 hover:text-[#FD5900] transition-colors font-semibold text-base sm:text-lg whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-[#0b1220] shrink-0" />
          <span>+91 90422 94007</span>
        </a>

        <a
          href="mailto:info@eon8.com"
          className="flex items-center gap-2.5 text-slate-900 hover:text-[#0053C6] transition-colors font-semibold text-base sm:text-lg whitespace-nowrap"
        >
          <Mail className="w-4 h-4 text-[#0b1220] shrink-0" />
          <span>info@eon8.com</span>
        </a>

        <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-sm sm:text-base text-center md:text-left">
          <MapPin className="w-4 h-4 text-[#0b1220] shrink-0" />
          <span>Mumbai, Hyderabad, Bangalore, Chennai</span>
        </div>
      </div>

      {/* Main Columns */}
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-2">
        {/* About */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-[22px] font-heading font-bold text-white">Who We Are</h3>
          <p className="text-slate-300 text-sm leading-[1.7] max-w-sm">
            Touted as one of the fastest-growing Digital marketing company, EON8 stands to be your one-stop destination
            for all digital marketing solutions. We deliver passionate, tailor-made and a full suite of digital
            services that generate increased sales &amp; fetch outstanding business growth online. Looking for a major
            feat? Let’s make it happen!
          </p>
        </div>

        {/* Services */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[22px] font-heading font-bold text-white">Our Services</h3>
          <ul className="space-y-2.5 text-sm">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-slate-300 hover:text-sky-400 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[22px] font-heading font-bold text-white">Other Links</h3>
          <ul className="space-y-2.5 text-sm">
            {otherLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-slate-300 hover:text-sky-400 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-[22px] font-heading font-bold text-white">Social Media</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                title={social.name}
                aria-label={social.name}
                className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <img src={social.icon} alt={social.name} className="w-12 h-12 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Logo */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
          {certLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-11 w-auto object-contain"
            />
          ))}
        </div>

        <Link to="/" className="shrink-0">
          <img
            src="/wp-content/uploads/2026/03/Logo_bg-1.png"
            alt="EON8 Logo"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Bottom */}
      <div className="max-w-[1250px] mx-auto border-t border-white/10 mt-6 pt-5 text-center text-slate-300 text-sm">
        <p>© {currentYear} EON8. All rights reserved.</p>
      </div>
    </footer>
  );
}
