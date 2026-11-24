import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, MessageCircle, X, Send, CheckCircle2, ArrowUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpamHoneypotField } from '@/components/ui/SpamHoneypotField';
import { submitLeadEnquiry, type LeadSubmissionResult } from '@/lib/leadSubmission';

export function FloatingWidgets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const drawerOpenedAtRef = useRef<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResult | null>(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email) return;
    const result = await submitLeadEnquiry({
      source: 'Floating Quick Contact Drawer',
      name: name.trim() || undefined,
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim() || undefined,
      honeypot,
      formStartedAt: drawerOpenedAtRef.current,
    });
    setSubmissionResult(result);
    setSubmitted(true);
  };

  const handleOpenDrawer = () => {
    setSubmitted(false);
    setSubmissionResult(null);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setHoneypot('');
    drawerOpenedAtRef.current = Date.now();
    setIsDrawerOpen(true);
  };

  return (
    <>
      {/* Fixed Bottom-Left WhatsApp & Call Badges */}
      <div className="fixed bottom-4 left-3 sm:bottom-8 sm:left-5 z-30 flex flex-col gap-2.5">
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/919042294007"
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 bg-[#28d347] hover:bg-[#f16f00] rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <img src="/imgs/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain" />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="tel:+919042294007"
          className="w-11 h-11 bg-[#28d347] hover:bg-[#f16f00] rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
          title="Call Us"
          aria-label="Call Us"
        >
          <PhoneCall className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Vertical Contact Us Tab (Desktop & Tablet Right Edge) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        {!isDrawerOpen && (
          <motion.button
            type="button"
            onClick={handleOpenDrawer}
            whileHover={{ x: -3 }}
            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs tracking-wider py-4 px-2.5 rounded-l-xl shadow-xl flex flex-col items-center gap-2 cursor-pointer transition-colors"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <MessageCircle className="w-4 h-4 rotate-90 mb-1" />
            <span>Contact Us</span>
          </motion.button>
        )}
      </div>

      {/* Back to Top Button (Bottom Right) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-5 right-4 sm:bottom-7 sm:right-6 z-30 w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-[#0053C6] dark:text-blue-400 border border-slate-200 dark:border-slate-700 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide Out Quick Contact Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-card border-l border-border p-6 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                <div>
                  <h4 className="text-lg font-heading font-extrabold text-foreground">Contact Us</h4>
                  <p className="text-xs text-muted-foreground">Submit details for a prompt reply</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close contact drawer"
                  className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative flex-1 flex flex-col justify-between">
                  <SpamHoneypotField id="floating-drawer-fax" value={honeypot} onChange={setHoneypot} />
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/80 uppercase">Name</label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 bg-muted/30 border border-border rounded-lg px-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/80 uppercase">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 bg-muted/30 border border-border rounded-lg px-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/80 uppercase">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 bg-muted/30 border border-border rounded-lg px-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/80 uppercase">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-muted/30 border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl mt-6 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <h4 className="font-heading font-extrabold text-foreground">Thank You!</h4>
                  <p className="text-sm text-muted-foreground max-w-[230px] leading-relaxed">
                    {submissionResult?.deliveredToWebhook
                      ? 'Our sales representative will get back to you shortly.'
                      : 'Send your pre-filled enquiry directly via WhatsApp or Email:'}
                  </p>
                  {submissionResult && (
                    <div className="flex flex-col w-full gap-2 pt-1">
                      <a
                        href={submissionResult.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send on WhatsApp</span>
                      </a>
                      <a
                        href={submissionResult.mailtoHref}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold no-underline"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send via Email</span>
                      </a>
                    </div>
                  )}
                  <Button onClick={() => setIsDrawerOpen(false)} variant="outline" className="mt-2 rounded-xl">
                    Close
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
