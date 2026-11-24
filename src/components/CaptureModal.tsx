import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, RefreshCw, MessageCircle, Mail } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { submitLeadEnquiry, type LeadSubmissionResult } from '@/lib/leadSubmission';

export function CaptureModal() {
  const { isContactModalOpen, setContactModalOpen } = useAppStore();
  
  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  
  // Captcha State
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  // Form Submission Status
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResult | null>(null);
  const [generalError, setGeneralError] = useState('');

  // Reset form fields and captcha on modal open
  useEffect(() => {
    if (isContactModalOpen) {
      const timer = setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setCountry('');
        setMessage('');
        setSubmitted(false);
        setSubmissionResult(null);
        setGeneralError('');
        setNum1(Math.floor(Math.random() * 15) + 3);
        setNum2(Math.floor(Math.random() * 10) + 2);
        setCaptchaInput('');
        setCaptchaError(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isContactModalOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isContactModalOpen) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isContactModalOpen, setContactModalOpen]);

  // Generate new captcha question
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 15) + 3);
    setNum2(Math.floor(Math.random() * 10) + 2);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !phone) {
      setGeneralError('Please fill in all required fields (*)');
      triggerShake();
      return;
    }

    // Captcha validation
    const correctAnswer = num1 + num2;
    if (parseInt(captchaInput.trim(), 10) !== correctAnswer) {
      setCaptchaError(true);
      setGeneralError('Incorrect Captcha answer. Please try again.');
      triggerShake();
      return;
    }

    const result = await submitLeadEnquiry({
      source: 'Quick Consultation Modal',
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim() || undefined,
      message: message.trim() || undefined,
    });

    setSubmissionResult(result);
    setSubmitted(true);
    setGeneralError('');
  };

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="capture-modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModalOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: shakeTrigger ? [0, -10, 10, -10, 10, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ 
              duration: 0.25,
              x: { duration: 0.4, ease: 'easeInOut' }
            }}
            className="bg-card dark:bg-slate-900 border border-border/50 shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-lg relative z-10 overflow-hidden"
          >
            {/* Top Glowing gradient indicator */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-primary to-blue-500" />

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close consultation modal"
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-foreground/60 hover:text-foreground hover:bg-muted/40 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              // Form Layout
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center space-y-1 mb-2">
                  <h3 id="capture-modal-title" className="text-2xl font-heading font-extrabold tracking-tight">Quick Consultation</h3>
                  <p className="text-xs text-muted-foreground">Get a bespoke digital marketing proposal today</p>
                </div>

                {generalError && (
                  <div className="text-xs font-semibold text-red-500 dark:text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
                    {generalError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Country</label>
                    <input
                      type="text"
                      placeholder="Country Name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-11 bg-muted/20 border border-border/30 rounded-xl px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground/80">Your Message</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your marketing requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-muted/20 border border-border/30 rounded-xl p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                {/* Captcha challenge */}
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
                    placeholder="Enter answer"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className={`w-28 h-9 text-center bg-background border ${
                      captchaError ? 'border-red-500 focus:ring-red-500/10' : 'border-border/30 focus:border-primary'
                    } rounded-lg text-sm font-bold focus:outline-none focus:ring-1 transition-all`}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-primary text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </Button>
              </form>
            ) : (
              // Success Screen
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="inline-flex w-16 h-16 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-foreground">
                  {submissionResult?.deliveredToWebhook ? 'Proposal Request Sent!' : 'Proposal Details Ready!'}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  {submissionResult?.deliveredToWebhook
                    ? 'Thank you for contacting Eon8. One of our growth marketing consultants will contact you shortly.'
                    : 'Connect directly with our growth desk on WhatsApp or email with your pre-filled brief:'}
                </p>
                {submissionResult && (
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                    <a
                      href={submissionResult.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={submissionResult.mailtoHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold no-underline"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </a>
                  </div>
                )}
                <div className="pt-2">
                  <Button
                    onClick={() => setContactModalOpen(false)}
                    variant="outline"
                    className="rounded-xl px-6"
                  >
                    Close Window
                  </Button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
