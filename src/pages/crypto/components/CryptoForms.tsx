import { useState, type FormEvent } from 'react';
import type { BottomEnquiryConfig } from '../types';
import { HeadingLines, RichText } from './RichText';

interface LeadFormProps {
  heading: string;
  submitLabel?: string;
  id?: string;
  cardVariant?: 'nft-form' | 'ieo-navy' | 'agency-card';
}

export function CryptoServiceLeadForm({
  heading,
  submitLabel = 'Submit',
  id,
  cardVariant = 'nft-form',
}: LeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setFeedback({ ok: false, text: 'Please enter a valid name and email address.' });
      return;
    }
    setFeedback({
      ok: true,
      text: 'Thank you! Our crypto growth team will contact you within 24 hours.',
    });
    setName('');
    setEmail('');
    setPhone('');
  };

  if (cardVariant === 'ieo-navy') {
    return (
      <div className="ieo-hero-form-card" id={id}>
        <h3>{heading}</h3>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="fname"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="ieo-hero-submit-btn">
            {submitLabel}
          </button>
          {feedback && (
            <div className={`crypto-form-feedback ${feedback.ok ? 'is-success' : 'is-error'}`}>
              {feedback.text}
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="banner_form" id={id}>
      <div className="wpcf7">
        <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
          <div className="clearfix" id="nft-form">
            <h3>{heading}</h3>
            <div className="form-row">
              <div className="col-12">
                <div className="column-full">
                  <p>
                    <span className="wpcf7-form-control-wrap" data-name="fname">
                      <input
                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                        name="fname"
                        placeholder="Name*"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="column-full">
                  <p>
                    <span className="wpcf7-form-control-wrap" data-name="email">
                      <input
                        className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                        name="email"
                        placeholder="Email*"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="column-full">
                  <p>
                    <span className="wpcf7-form-control-wrap phone">
                      <input
                        className="wpcf7-form-control wpcf7-intl-tel"
                        name="phone"
                        placeholder="Mobile Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-12 quiz_cap">
                <p>
                  <input
                    className="wpcf7-form-control wpcf7-submit has-spinner"
                    type="submit"
                    value={submitLabel}
                  />
                </p>
              </div>
            </div>
            {feedback && (
              <div className={`crypto-form-feedback ${feedback.ok ? 'is-success' : 'is-error'}`}>
                {feedback.text}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export function CryptoAgencyHeroForm({ heading }: { heading: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setFeedback({ ok: false, text: 'Please provide your name and a valid email address.' });
      return;
    }
    setFeedback({
      ok: true,
      text: 'Request submitted! A strategist from EON8 will connect with you shortly.',
    });
    setName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setMessage('');
  };

  return (
    <div className="form-card">
      <h3>{heading}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid">
          <input
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <textarea
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
        {feedback && (
          <div className={`crypto-form-feedback ${feedback.ok ? 'is-success' : 'is-error'}`}>
            {feedback.text}
          </div>
        )}
      </form>
    </div>
  );
}

export function CryptoBottomEnquirySection({
  enquiry,
  formHeading,
}: {
  enquiry: BottomEnquiryConfig;
  formHeading: string;
}) {
  return (
    <section className="pb-70 gradient-nft" id="enquiry">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h2 className="reveal reveal-up" style={{ color: '#fff' }}>
              <HeadingLines lines={enquiry.headingLines} />
            </h2>
            {enquiry.paragraphs.map((nodes, idx) => (
              <p className="text-white reveal" key={idx}>
                <RichText nodes={nodes} />
              </p>
            ))}
            {enquiry.stats.length > 0 && (
              <div className="footer-number text-white">
                {enquiry.stats.map((stat, idx) => (
                  <div className="footer-number-inner" key={idx}>
                    {stat.iconSrc && <img src={stat.iconSrc} alt={stat.label} loading="lazy" />}
                    <h2 className="count">
                      {stat.count}
                      {stat.suffix || ''}
                    </h2>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-6 col-sm-12">
            <CryptoServiceLeadForm
              id="enquiry_form"
              heading={formHeading}
              submitLabel={enquiry.submitLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
