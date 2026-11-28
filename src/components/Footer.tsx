import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { telHref, useSiteSettings } from '@/lib/siteSettings';

export function Footer() {
  const { contact, social, branding } = useSiteSettings();
  const socialLinks = [
    {
      name: 'Whatsapp',
      icon: '/wp-content/uploads/2026/03/Whatsapp-1.webp',
      href: contact.whatsapp ? `https://api.whatsapp.com/send?phone=${contact.whatsapp}` : '',
    },
    {
      name: 'Instagram',
      icon: '/wp-content/uploads/2026/03/Instagram-1.webp',
      href: social.instagram,
    },
    {
      name: 'Facebook',
      icon: '/wp-content/uploads/2026/03/Facebook-1.webp',
      href: social.facebook,
    },
    {
      name: 'LinkedIn',
      icon: '/wp-content/uploads/2026/03/Linkedin-1.webp',
      href: social.linkedin,
    },
    {
      name: 'Twitter',
      icon: '/wp-content/uploads/2026/03/twitter-1.webp',
      href: social.x,
    },
    {
      name: 'YouTube',
      icon: '/wp-content/uploads/2026/03/youtube.webp',
      href: social.youtube,
    },
  ].filter((link) => link.href);

  const servicesLinks = [
    { name: 'Digital Marketing', href: '/search-engine-optimization-services-seo' },
    { name: 'Social Media Marketing', href: '/social-media-management-agency-chennai' },
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
    { alt: 'Digital Marketing Agency Award', src: '/wp-content/uploads/2022/02/digi-mar-ag.webp' },
    { alt: 'Clutch Top Agency', src: '/wp-content/uploads/2022/02/clutch.webp' },
    {
      alt: 'Top Digital Marketing Agencies',
      src: '/wp-content/uploads/2022/07/top-digital-marketing-agencies.svg',
    },
    { alt: 'Google Partner', src: '/wp-content/uploads/2022/11/google-partner.webp' },
  ];

  return (
    <footer
      className="w-full text-white relative z-10 pt-[70px] mt-16 font-body"
      style={{ background: 'linear-gradient(135deg, #0b1220, #1e293b)' }}
    >
      {/* Floating Contact Bar */}
      <div className="w-[calc(100%-32px)] max-w-[900px] lg:min-w-[700px] lg:w-max mx-auto -mt-[115px] mb-6 bg-[#f8fafc] text-[#111111] rounded-[12px] px-4 sm:px-[35px] py-[15px] shadow-[0_15px_35px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row items-center justify-center gap-2.5 lg:gap-[50px]">
        <a
          href={telHref(contact.phone)}
          className="flex items-center gap-[10px] text-[#111111] hover:text-[#FD5900] transition-colors text-[16px] sm:text-[18px] whitespace-nowrap no-underline"
        >
          <Phone className="w-4 h-4 text-[#111111] shrink-0" />
          <span>{contact.phone}</span>
        </a>

        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-[10px] text-[#111111] hover:text-[#0053C6] transition-colors text-[16px] sm:text-[18px] whitespace-nowrap no-underline"
        >
          <Mail className="w-4 h-4 text-[#111111] shrink-0" />
          <span>{contact.email}</span>
        </a>

        <div className="flex items-center gap-[10px] text-[#111111] text-[15px] sm:text-[18px] text-center lg:text-left sm:whitespace-nowrap">
          <MapPin className="w-4 h-4 text-[#111111] shrink-0" />
          <span>{contact.address}</span>
        </div>
      </div>

      {/* Main Columns — aligned with max-w-7xl container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-[60px] text-center sm:text-left">
        {/* About */}
        <div>
          <h3 className="text-[22px] font-palanquin font-medium tracking-[0.3px] capitalize text-white mb-[15px] leading-[1.4]">
            Who We Are
          </h3>
          <p className="font-poppins font-medium text-[#cbd5e1] text-[14px] leading-[1.7] max-w-[320px] mx-auto sm:mx-0">
            Touted as one of the fastest-growing Digital marketing company, EON8 stands to be your
            one-stop destination for all digital marketing solutions. We deliver passionate,
            tailor-made and a full suite of digital services that generate increased sales &amp;
            fetch outstanding business growth online. Looking for a major feat? Let’s make it
            happen!
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[22px] font-palanquin font-medium tracking-[0.3px] capitalize text-white mb-[15px] leading-[1.4]">
            Our Services
          </h3>
          <ul className="list-none p-0 m-0 space-y-[10px]">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="font-poppins font-medium text-[#cbd5e1] hover:text-[#38bdf8] transition-colors duration-300 text-[14px] no-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links */}
        <div>
          <h3 className="text-[22px] font-palanquin font-medium tracking-[0.3px] capitalize text-white mb-[15px] leading-[1.4]">
            Other Links
          </h3>
          <ul className="list-none p-0 m-0 space-y-[10px]">
            {otherLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="font-poppins font-medium text-[#cbd5e1] hover:text-[#38bdf8] transition-colors duration-300 text-[14px] no-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-[22px] font-palanquin font-medium tracking-[0.3px] capitalize text-white mb-[15px] leading-[1.4]">
            Social Media
          </h3>
          <div className="flex flex-wrap justify-center sm:justify-start gap-[12px]">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                title={social.name}
                aria-label={social.name}
                className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-[52px] h-[52px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Logo */}
      <div className="max-w-7xl mx-auto mt-[40px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-[22px]">
            {certLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-[45px] w-auto object-contain"
              />
            ))}
          </div>

          <Link to="/" className="shrink-0 flex items-center">
            <img
              src={branding.footerLogo}
              alt="EON8 Logo"
              className="h-[62px] w-auto object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-[25px] p-[20px] text-center text-[#cbd5e1] text-[14px]">
        <p className="m-0">© 2026 EON8. All rights reserved.</p>
      </div>
    </footer>
  );
}
