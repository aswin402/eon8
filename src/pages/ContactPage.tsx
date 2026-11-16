import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Clock, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export function ContactPage() {
  const { setContactModalOpen } = useAppStore();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [service, setService] = useState('All Services');
  const [budget, setBudget] = useState('Not specified');
  const [message, setMessage] = useState('');
  
  // Captcha State
  const [num1, setNum1] = useState(() => Math.floor(Math.random() * 10) + 3);
  const [num2, setNum2] = useState(() => Math.floor(Math.random() * 8) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  // Status
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate Captcha
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 3);
    setNum2(Math.floor(Math.random() * 8) + 1);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please fill out all required fields (*)');
      triggerShake();
      return;
    }

    const correctAnswer = num1 + num2;
    if (parseInt(captchaInput.trim(), 10) !== correctAnswer) {
      setCaptchaError(true);
      setFormError('Incorrect Captcha answer. Please try again.');
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Contact Page Form Submitted:', { 
        name, 
        email, 
        phone: `${countryCode} ${phone}`, 
        service, 
        budget, 
        message 
      });
    }, 600);
  };

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  const presenceCities = [
    { 
      name: 'Hyderabad', 
      svg: '/wp-content/uploads/2022/11/hyderabad.svg',
      desc: 'Tech & Digital Innovation Hub'
    },
    { 
      name: 'Bangalore', 
      svg: '/wp-content/uploads/2022/11/bangalore.svg',
      desc: 'Silicon Valley of India Office'
    },
    { 
      name: 'Mumbai', 
      svg: '/wp-content/uploads/2022/11/mumbai.svg',
      desc: 'Commercial & Media Headquarters'
    },
    { 
      name: 'Chennai', 
      svg: '/wp-content/uploads/2022/11/chennai.svg',
      desc: 'Registered Headquarters & Core Lab'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      
      {/* 1. Header Banner — Warm Cream (#fdf6ee) matching Live EON8 */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-16 bg-[#fdf6ee] dark:bg-slate-900 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">
            <Link to="/" className="hover:text-[#f97316] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#f97316] font-bold">Contact Us</span>
          </nav>
          <h1 className="text-3xl md:text-[42px] font-heading font-bold tracking-tight text-slate-900 dark:text-white">
            Contact EON8 Digital Marketing Agency
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
            We’d love to hear from you. Let’s connect!
          </p>
        </div>
      </section>

      {/* 2. Three Main Contact Cards with Authentic Live Hover Behavior */}
      <section className="py-16 md:py-20 bg-[#fff7ed]/60 dark:bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Locations */}
            <div className="group bg-card text-card-foreground border border-border/60 p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-2xl hover:bg-[#ff6a00] hover:text-white hover:-translate-y-2.5 transition-all duration-400 flex flex-col items-center justify-center text-center min-h-[260px]">
              <div className="w-16 h-16 rounded-2xl bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-400">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Locations</h3>
              <p className="text-muted-foreground group-hover:text-white/90 text-sm md:text-base leading-relaxed transition-colors duration-400">
                Mumbai, Hyderabad,<br /> Bangalore, Chennai
              </p>
            </div>

            {/* Card 2: Phone */}
            <div className="group bg-card text-card-foreground border border-border/60 p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-2xl hover:bg-[#ff6a00] hover:text-white hover:-translate-y-2.5 transition-all duration-400 flex flex-col items-center justify-center text-center min-h-[260px]">
              <div className="w-16 h-16 rounded-2xl bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-400">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Call Us</h3>
              <p className="text-muted-foreground group-hover:text-white/90 text-base md:text-lg font-semibold transition-colors duration-400">
                <a href="tel:+919042294007" className="hover:underline">+91 90422 94007</a>
              </p>
              <span className="text-xs text-muted-foreground group-hover:text-white/80 mt-2">Mon - Sat: 9:30 AM - 7:00 PM IST</span>
            </div>

            {/* Card 3: Email */}
            <div className="group bg-card text-card-foreground border border-border/60 p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-2xl hover:bg-[#ff6a00] hover:text-white hover:-translate-y-2.5 transition-all duration-400 flex flex-col items-center justify-center text-center min-h-[260px]">
              <div className="w-16 h-16 rounded-2xl bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-400">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Email Us</h3>
              <p className="text-muted-foreground group-hover:text-white/90 text-base md:text-lg font-semibold transition-colors duration-400">
                <a href="mailto:info@eon8.com" className="hover:underline">info@eon8.com</a>
              </p>
              <span className="text-xs text-muted-foreground group-hover:text-white/80 mt-2">sales@eonsofttech.in</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Presence Section (Exact live SVGs & Scale Hover) */}
      <section className="py-16 md:py-20 bg-background border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12">
            <span className="text-[#ff6a00] font-bold text-xs uppercase tracking-widest block mb-2">Nationwide Footprint</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight">Our Presence</h2>
            <div className="w-12 h-1 bg-[#ff6a00] mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {presenceCities.map((city) => (
              <div
                key={city.name}
                className="bg-card text-card-foreground border border-border/60 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center space-y-3 shadow-sm hover:scale-105 hover:border-[#ff6a00] hover:shadow-xl transition-all duration-300 min-h-[160px]"
              >
                <img
                  src={city.svg}
                  alt={city.name}
                  className="h-14 w-auto object-contain dark:invert dark:opacity-85 transition-transform duration-300"
                />
                <h4 className="font-heading font-bold text-lg">{city.name}</h4>
                <p className="text-xs text-muted-foreground hidden sm:block">{city.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Enquiry Section: Form & Map Box */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Enquiry Form Box */}
            <div className="lg:col-span-6">
              <motion.div
                animate={{ x: shakeTrigger ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card text-card-foreground border border-border/60 rounded-3xl p-6 md:p-10 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight">Get Enquiry</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Expect a response within 5 minutes during business hours.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Quick Response</span>
                  </div>
                </div>
                
                {formError && (
                  <div className="mb-6 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl">
                    {formError}
                  </div>
                )}

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Full Name <span className="text-[#ff6a00]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 bg-background border border-border/60 rounded-xl px-4 text-sm focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address <span className="text-[#ff6a00]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 bg-background border border-border/60 rounded-xl px-4 text-sm focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all"
                      />
                    </div>

                    {/* Phone with Country Code */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number <span className="text-[#ff6a00]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-12 w-28 bg-background border border-border/60 rounded-xl px-3 text-sm focus:outline-none focus:border-[#ff6a00] font-mono shrink-0"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full h-12 bg-background border border-border/60 rounded-xl px-4 text-sm focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Service & Budget Dual Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Service Needed
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full h-12 bg-background border border-border/60 rounded-xl px-3 text-sm focus:outline-none focus:border-[#ff6a00]"
                        >
                          <option value="All Services">All Services</option>
                          <option value="AI Agents & Automation">AI Agents & Automation</option>
                          <option value="Web3 & Blockchain Marketing">Web3 & Blockchain Marketing</option>
                          <option value="Search Engine Optimization (SEO)">SEO (Search Optimization)</option>
                          <option value="Performance PPC & Paid Media">Performance PPC & Google Ads</option>
                          <option value="Social Media & Influencers">Social Media & Influencer Marketing</option>
                          <option value="High-Impact Content Marketing">High-Impact Content Marketing</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Target Budget
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full h-12 bg-background border border-border/60 rounded-xl px-3 text-sm focus:outline-none focus:border-[#ff6a00]"
                        >
                          <option value="Not specified">Select budget range</option>
                          <option value="Under $2,000">Under $2,000 / month</option>
                          <option value="$2,000 - $5,000">$2,000 - $5,000 / month</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000 / month</option>
                          <option value="$10,000+">$10,000+ / Enterprise</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Project Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your goals, current challenges, and timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-background border border-border/60 rounded-xl p-4 text-sm focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all resize-none"
                      />
                    </div>

                    {/* Math Captcha Challenge */}
                    <div className="bg-muted/40 border border-border/60 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-wide text-foreground font-mono">
                          {num1} + {num2} = ?
                        </span>
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-all"
                          title="Refresh Captcha"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Answer"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className={`w-24 h-10 text-center bg-background border ${
                          captchaError ? 'border-red-500 focus:ring-red-500' : 'border-border/60 focus:border-[#ff6a00]'
                        } rounded-lg text-sm font-bold focus:outline-none transition-all`}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] text-white font-bold text-base shadow-md hover:shadow-lg transition-all gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <div className="inline-flex p-4 bg-green-500/10 rounded-full border border-green-500/20 text-green-500">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-foreground">Thank You!</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="text-foreground font-semibold">{name}</span>. Your enquiry has been received and our digital marketing strategists will connect with you within 5 minutes.
                    </p>
                    <div className="pt-2">
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setPhone('');
                          setMessage('');
                          generateCaptcha();
                        }}
                        variant="outline"
                        className="rounded-xl px-5 text-sm"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Map Box & Headquarters Details */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Google Map Box */}
              <div className="h-[360px] md:h-[420px] rounded-3xl overflow-hidden border border-border/60 shadow-lg bg-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15548.177756903395!2d80.2441769!3d13.0328421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913aa71c2be6fe75!2sEon8%20-%20Digital%20Marketing%20Agency%20in%20Chennai!5e0!3m2!1sen!2sin!4v1627393345427!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Eon8 - Digital Marketing Agency in Chennai"
                />
              </div>

              {/* Headquarters Details Card */}
              <div className="bg-card text-card-foreground border border-border/60 p-6 md:p-8 rounded-3xl shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg">Chennai Headquarters</h4>
                    <p className="text-xs text-muted-foreground">Prestige Polygon Tech Center</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground border-t border-border/40 pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
                    <span>
                      9th Floor, Prestige Polygon, No 471, Anna Salai, Teynampet, Chennai, Tamil Nadu 600035, India
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#ff6a00] shrink-0" />
                    <span>Monday - Saturday: 9:30 AM - 7:00 PM IST (Sunday Closed)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#ff6a00] shrink-0" />
                    <a href="tel:+919042294007" className="hover:text-foreground font-semibold text-foreground">
                      +91 90422 94007
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#ff6a00] shrink-0" />
                    <a href="mailto:info@eon8.com" className="hover:text-foreground font-semibold text-foreground">
                      info@eon8.com / sales@eonsofttech.in
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Bottom Consultation Banner */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] border border-[#ff6a00]/30 text-xs font-semibold uppercase tracking-wider">
            Ready to Accelerate Growth?
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight">
            Schedule a Strategy Session with Our Team
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Whether you want to deploy Autonomous AI Agents, launch a Web3 token campaign, or dominate Google search, our team has the proven playbooks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              onClick={() => setContactModalOpen(true)}
              className="bg-[#ff6a00] hover:bg-[#ea580c] text-white font-bold h-12 px-8 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all text-base gap-2"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href="tel:+919042294007"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all text-base"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us Directly</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
