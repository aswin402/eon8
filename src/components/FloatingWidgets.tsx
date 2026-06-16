import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingWidgets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email) return;
    setSubmitted(true);
    console.log('Sidebar Form Submitted:', { name, phone, email, message });
  };

  useEffect(() => {
    if (isDrawerOpen) {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }
  }, [isDrawerOpen]);

  return (
    <>
      {/* Floating Badges (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3.5">
        
        {/* WhatsApp widget */}
        <motion.a
          whileHover={{ scale: 1.1, rotate: 6 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/919042294007"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20 transition-all border border-green-400/20"
          title="Chat on WhatsApp"
        >
          <img src="/imgs/whatsapp.png" alt="WhatsApp Icon" className="w-6 h-6 object-contain" />
        </motion.a>

        {/* Call widget */}
        <motion.a
          whileHover={{ scale: 1.1, rotate: -6 }}
          whileTap={{ scale: 0.95 }}
          href="tel:9042294007"
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-all border border-blue-400/20"
          title="Call Us"
        >
          <PhoneCall className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Sliding Tab Trigger (Right Side - Desktop Only) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        {!isDrawerOpen && (
          <motion.button
            onClick={() => setIsDrawerOpen(true)}
            whileHover={{ x: -4 }}
            className="bg-red-600 text-white font-bold text-xs uppercase tracking-wider py-4 px-2 rounded-l-2xl shadow-xl flex flex-col items-center gap-2 border border-red-500/20 cursor-pointer"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <MessageCircle className="w-4 h-4 rotate-90 mb-1" />
            <span>Quick Contact</span>
          </motion.button>
        )}
      </div>

      {/* Slide out right panel */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-card border-l border-border/40 p-6 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/20 pb-4 mb-5">
                <div>
                  <h4 className="text-lg font-heading font-extrabold text-foreground">Quick Inquiry</h4>
                  <p className="text-[10px] text-muted-foreground">Submit details for a prompt reply</p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 hover:bg-muted/40 rounded-lg text-muted-foreground hover:text-foreground transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!submitted ? (
                // Form layout
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-foreground/80 uppercase">Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 bg-muted/20 border border-border/30 rounded-lg px-3 text-xs focus:outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-foreground/80 uppercase">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 bg-muted/20 border border-border/30 rounded-lg px-3 text-xs focus:outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-foreground/80 uppercase">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 bg-muted/20 border border-border/30 rounded-lg px-3 text-xs focus:outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-foreground/80 uppercase">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-muted/20 border border-border/30 rounded-lg p-3 text-xs focus:outline-none focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl mt-6 gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </Button>
                </form>
              ) : (
                // Success screen
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <h4 className="font-heading font-extrabold text-foreground">Thank You!</h4>
                  <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                    Our sales representative will get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setIsDrawerOpen(false)}
                    variant="outline"
                    className="mt-4 rounded-xl"
                  >
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
