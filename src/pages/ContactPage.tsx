import { useState, useEffect, type FormEvent } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/ai-core-blog-pages.css';

const PRESENCE_CITIES = [
  { name: 'Hyderabad', img: '/wp-content/uploads/2022/11/hyderabad.svg' },
  { name: 'Bangalore', img: '/wp-content/uploads/2022/11/bangalore.svg' },
  { name: 'Mumbai', img: '/wp-content/uploads/2022/11/mumbai.svg' },
  { name: 'Chennai', img: '/wp-content/uploads/2022/11/chennai.svg' },
];

const DIAL_CODES = [
  { label: '🇮🇳 +91', value: '+91' },
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇦🇪 +971', value: '+971' },
  { label: '🇸🇬 +65', value: '+65' },
  { label: '🇦🇺 +61', value: '+61' },
];

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dialCode, setDialCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [mathQuiz, setMathQuiz] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | Let's Build Your Brand - Eon8";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'At Eon8, we take your business to the next level with digital marketing and branding. Contact EON8 in Chennai, Bangalore, Hyderabad, and Mumbai.'
      );
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || phone.trim().length < 5) {
      setStatus({
        type: 'error',
        text: 'Please fill out your Name, valid Email, and Phone number.',
      });
      return;
    }
    if (mathQuiz.trim() !== '16') {
      setStatus({
        type: 'error',
        text: 'Please enter the correct security answer (12 + 4 = 16).',
      });
      return;
    }
    setStatus({
      type: 'success',
      text: 'Thank you for contacting EON8! Our team will respond within 24 hours.',
    });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setMathQuiz('');
  };

  return (
    <div className="eon8-live-page contact-page-scope">
      <div id="site-content">
        <section className="contact-section">
          <div className="container">
            <div className="row text-center" style={{ marginBottom: 40 }}>
              <div className="col-md-12">
                <h1 className="contact-title reveal active">
                  <span className="to">Contact EON8 Digital Marketing Agency</span>
                </h1>
                <p className="contact-subtitle reveal active">
                  We’d love to hear from you. Let’s connect!
                </p>
              </div>
            </div>

            <div className="row reveal active">
              <div className="col-md-4" style={{ marginBottom: 20 }}>
                <div className="contact-card">
                  <MapPin className="w-8 h-8 contact-card-icon" aria-hidden="true" />
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                    Our Locations
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Mumbai, Hyderabad,
                    <br />
                    Bangalore, Chennai
                  </p>
                </div>
              </div>

              <div className="col-md-4" style={{ marginBottom: 20 }}>
                <div className="contact-card">
                  <Phone className="w-8 h-8 contact-card-icon" aria-hidden="true" />
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Call Us</h4>
                  <p style={{ margin: 0 }}>
                    <a href="tel:+919042294007">+91 90422 94007</a>
                  </p>
                </div>
              </div>

              <div className="col-md-4" style={{ marginBottom: 20 }}>
                <div className="contact-card">
                  <Mail className="w-8 h-8 contact-card-icon" aria-hidden="true" />
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Email Us</h4>
                  <p style={{ margin: 0 }}>
                    <a href="mailto:info@eon8.com">info@eon8.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="location-section">
          <div className="container">
            <h3
              className="text-center reveal active"
              style={{ fontSize: 28, marginBottom: 36 }}
            >
              <span className="to">Our Presence</span>
            </h3>
            <div className="row reveal active">
              {PRESENCE_CITIES.map((city) => (
                <div
                  key={city.name}
                  className="col-md-3 col-sm-6 col-xs-6"
                  style={{ marginBottom: 20 }}
                >
                  <div className="location-card">
                    <img alt={city.name} src={city.img} />
                    <p style={{ margin: 0 }}>{city.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="enquiry-section">
          <div className="container">
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="col-md-6 col-sm-12" style={{ marginBottom: 24 }}>
                <div className="form-box">
                  <h3>Get Enquiry</h3>
                  <div className="wpcf7">
                    <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
                      <label>
                        Name
                        <input
                          name="your-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </label>

                      <label>
                        Email
                        <input
                          name="your-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </label>

                      <label>
                        Phone
                        <span className="contact-phone-row">
                          <select
                            aria-label="Country code"
                            value={dialCode}
                            onChange={(e) => setDialCode(e.target.value)}
                          >
                            {DIAL_CODES.map((c) => (
                              <option key={c.value} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </span>
                      </label>

                      <label>
                        Message
                        <textarea
                          name="your-message"
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </label>

                      <div className="q_cnt_frm">
                        <label>
                          <span className="wpcf7-quiz-label">12 + 4=?</span>
                          <input
                            name="math-quiz"
                            type="text"
                            autoComplete="off"
                            value={mathQuiz}
                            onChange={(e) => setMathQuiz(e.target.value)}
                            required
                          />
                        </label>
                      </div>

                      <div className="text-center" style={{ marginTop: 12 }}>
                        <input
                          className="wpcf7-form-control wpcf7-submit"
                          type="submit"
                          value="Send"
                        />
                      </div>

                      {status && (
                        <div
                          role="status"
                          className={`ai-form-feedback ${
                            status.type === 'success' ? 'is-success' : 'is-error'
                          }`}
                        >
                          {status.text}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="map-box">
                  <iframe
                    title="Eon8 Chennai Office Map"
                    allowFullScreen
                    height="450"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15548.177756903395!2d80.2441769!3d13.0328421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913aa71c2be6fe75!2sEon8%20-%20Digital%20Marketing%20Agency%20in%20Chennai!5e0!3m2!1sen!2sin!4v1627393345427!5m2!1sen!2sin"
                    style={{ border: 0, width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
