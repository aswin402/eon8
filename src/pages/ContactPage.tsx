import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactPage() {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Captcha State
  const [num1, setNum1] = useState(() => Math.floor(Math.random() * 12) + 2);
  const [num2, setNum2] = useState(() => Math.floor(Math.random() * 8) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  // Status
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Generate Captcha
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 12) + 2);
    setNum2(Math.floor(Math.random() * 8) + 1);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
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

    setSubmitted(true);
    setFormError('');
    console.log('Contact Page Form Submitted:', { name, email, phone, message });
  };

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  const presenceCities = [
    { name: 'Hyderabad', svg: 'https://www.eon8.com/wp-content/uploads/2022/11/hyderabad.svg' },
    { name: 'Bangalore', svg: 'https://www.eon8.com/wp-content/uploads/2022/11/bangalore.svg' },
    { name: 'Mumbai', svg: 'https://www.eon8.com/wp-content/uploads/2022/11/mumbai.svg' },
    { name: 'Chennai', svg: 'https://www.eon8.com/wp-content/uploads/2022/11/chennai.svg' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground py-20 px-6 overflow-hidden font-body">
      
      {/* Background ambient glowing details */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Title Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We’d love to hear from you. Let’s connect and boost your business growth!
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Locations */}
          <div className="bg-card/40 border border-border/40 p-8 rounded-3xl backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-4 hover:border-orange-500/30 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-extrabold">Our Locations</h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              Mumbai, Hyderabad,{"\n"} Bangalore, Chennai
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-card/40 border border-border/40 p-8 rounded-3xl backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-4 hover:border-primary/30 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-extrabold">Call Us</h3>
            <p className="text-muted-foreground text-sm font-semibold">
              <a href="tel:+919042294007" className="hover:text-primary transition-colors">+91 90422 94007</a>
            </p>
          </div>

          {/* Card 3: Email */}
          <div className="bg-card/40 border border-border/40 p-8 rounded-3xl backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-4 hover:border-blue-500/30 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-2xl flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-extrabold">Email Us</h3>
            <p className="text-muted-foreground text-sm font-mono font-semibold">
              <a href="mailto:info@eon8.com" className="hover:text-primary transition-colors">info@eon8.com</a>
            </p>
          </div>

        </div>

        {/* Presence Section */}
        <div className="space-y-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-center text-orange-500">Our Presence</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {presenceCities.map((city) => (
              <div
                key={city.name}
                className="bg-card/30 border border-border/40 p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 hover:bg-card/50 transition-colors"
              >
                <img
                  src={city.svg}
                  alt={city.name}
                  className="w-16 h-16 object-contain filter grayscale dark:invert dark:opacity-80 hover:grayscale-0 transition-all duration-300"
                />
                <h4 className="font-heading font-bold text-foreground/80">{city.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry form and Google Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">
          
          {/* Enquiry Form */}
          <div className="lg:col-span-6">
            <motion.div
              animate={{ x: shakeTrigger ? [0, -10, 10, -10, 10, 0] : 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card dark:bg-slate-900 border border-border/40 rounded-3xl p-8 shadow-xl text-left space-y-6"
            >
              <h3 className="text-2xl font-heading font-extrabold tracking-tight">Get Enquiry</h3>
              
              {formError && (
                <div className="text-xs font-semibold text-red-500 dark:text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
                  {formError}
                </div>
              )}

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (e.g. +91 98765 43210)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your request..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-muted/20 border border-border/30 rounded-xl p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  {/* Captcha */}
                  <div className="space-y-1.5 bg-muted/30 border border-border/10 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-semibold tracking-wide text-foreground/90 font-mono">
                        {num1} + {num2} = ?
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-1 hover:bg-muted/40 rounded-lg text-muted-foreground hover:text-foreground transition-all"
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
                      className={`w-24 h-9 text-center bg-background border ${
                        captchaError ? 'border-red-500 focus:ring-red-500/10' : 'border-border/30 focus:border-primary'
                      } rounded-lg text-sm font-bold focus:outline-none focus:ring-1 transition-all`}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-primary text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </Button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex p-4 bg-green-500/10 rounded-full border border-green-500/20 text-green-500">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-foreground">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Thank you, <span className="text-foreground font-semibold">{name}</span>. Your enquiry has been received and our team will get in touch with you shortly.
                  </p>
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
                    className="rounded-xl px-5"
                  >
                    Send Another message
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Google Map Box */}
          <div className="lg:col-span-6 h-[465px] rounded-3xl overflow-hidden border border-border/40 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15548.177756903395!2d80.2441769!3d13.0328421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913aa71c2be6fe75!2sEon8%20-%20Digital%20Marketing%20Agency%20in%20Chennai!5e0!3m2!1sen!2sin!4v1627393345427!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Eon8 Chennai Office Location Map"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
