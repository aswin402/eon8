import { Mail, MapPin, Phone } from 'lucide-react';
import { LeadCaptureCard, PageSeo, ServiceHeroSection } from '@/components/sections';
import { telHref, useSiteSettings } from '@/lib/siteSettings';

const PRESENCE_CITIES = [
  { name: 'Hyderabad', img: '/wp-content/uploads/2022/11/hyderabad.svg' },
  { name: 'Bangalore', img: '/wp-content/uploads/2022/11/bangalore.svg' },
  { name: 'Mumbai', img: '/wp-content/uploads/2022/11/mumbai.svg' },
  { name: 'Chennai', img: '/wp-content/uploads/2022/11/chennai.svg' },
];

export function ContactPage() {
  const { contact } = useSiteSettings();

  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="Contact Us | Let's Build Your Brand - Eon8"
        description="At Eon8, we take your business to the next level with digital marketing and branding. Contact us & Get a Free Quote NOW."
      />

      {/* 1. Hero Header */}
      <ServiceHeroSection
        theme="brand"
        layout="centered"
        badge="Get In Touch"
        heading="Contact EON8 Digital Marketing Agency"
        paragraphs={["We'd love to hear from you. Let's connect and build your next growth milestone!"]}
      />

      {/* 2. Contact Channels */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-card border border-border p-7 text-center shadow-xs hover:shadow-lg transition-shadow space-y-3">
            <div className="w-13 h-13 mx-auto rounded-2xl bg-[#FD5900]/12 text-[#FD5900] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-heading font-bold text-foreground">Our Locations</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {contact.address}
            </p>
          </div>

          <div className="rounded-2xl bg-card border border-border p-7 text-center shadow-xs hover:shadow-lg transition-shadow space-y-3">
            <div className="w-13 h-13 mx-auto rounded-2xl bg-[#0053C6]/12 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-heading font-bold text-foreground">Call Us</h2>
            <p className="text-sm sm:text-base">
              <a
                href={telHref(contact.phone)}
                className="inline-flex items-center justify-center min-h-[36px] py-1.5 font-semibold text-foreground hover:text-[#FD5900] transition-colors no-underline"
              >
                {contact.phone}
              </a>
            </p>
          </div>

          <div className="rounded-2xl bg-card border border-border p-7 text-center shadow-xs hover:shadow-lg transition-shadow space-y-3">
            <div className="w-13 h-13 mx-auto rounded-2xl bg-[#0053C6]/12 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-heading font-bold text-foreground">Email Us</h2>
            <p className="text-sm sm:text-base">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center min-h-[36px] py-1.5 font-semibold text-foreground hover:text-[#FD5900] transition-colors no-underline"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Presence Landmarks */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
              Regional Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
              Our Presence
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PRESENCE_CITIES.map((city) => (
              <div
                key={city.name}
                className="rounded-2xl bg-card border border-border p-6 flex flex-col items-center justify-center gap-4 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-2xs">
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <p className="text-base font-heading font-bold text-foreground">{city.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Enquiry Form + Office Map */}
      <section className="py-16 sm:py-20 pb-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <LeadCaptureCard
              id="contact-enquiry-form"
              heading="Get Enquiry"
              subheading="Fill out the form below and our team will respond within 24 hours."
              submitLabel="Send Message"
              showMathChallenge
            />
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-border shadow-xl bg-card h-[320px] sm:h-[420px] lg:h-[540px]">
            <iframe
              title="Eon8 Chennai Office Map"
              allowFullScreen
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15548.177756903395!2d80.2441769!3d13.0328421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913aa71c2be6fe75!2sEon8%20-%20Digital%20Marketing%20Agency%20in%20Chennai!5e0!3m2!1sen!2sin!4v1627393345427!5m2!1sen!2sin"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
