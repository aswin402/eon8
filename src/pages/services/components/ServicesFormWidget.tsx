import { useState, type FormEvent } from 'react';
import type { ServiceFormNode } from '../types';

interface ServicesFormWidgetProps {
  node: ServiceFormNode;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Controlled React form component replacing all 36 legacy CF7 forms
 * across the 37 Our Services pages (proposal-5, callback-3, phone-callback).
 */
export function ServicesFormWidget({ node }: ServicesFormWidgetProps) {
  const {
    variant,
    innerId,
    heading,
    headingTag = 'h3',
    submitLabel,
    phonePlaceholder,
  } = node;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const HeadingTag = headingTag;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (variant === 'phone-callback') {
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 7) {
        setStatus({ type: 'error', text: 'Please enter a valid phone number.' });
        return;
      }
      setStatus({
        type: 'success',
        text: 'Thank you! Our specialist will call you back within 5 minutes.',
      });
      setPhone('');
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required contact fields.' });
      return;
    }

    if (!EMAIL_RE.test(email.trim())) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (variant === 'proposal-5' && !country.trim()) {
      setStatus({ type: 'error', text: 'Please enter your country.' });
      return;
    }

    setStatus({
      type: 'success',
      text: 'Thank you! Your enquiry has been received. Our digital growth team will reach out shortly.',
    });
    setName('');
    setEmail('');
    setCountry('');
    setPhone('');
    setMessage('');
  };

  if (variant === 'phone-callback') {
    return (
      <div className="wpcf7">
        <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-wrap items-center gap-3">
            <input
              className="wpcf7-form-control wpcf7-tel"
              type="tel"
              name="phone"
              placeholder={phonePlaceholder || 'Enter Phone Number'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone Number"
              required
            />
            <input
              className="wpcf7-form-control wpcf7-submit"
              type="submit"
              value={submitLabel || 'Send'}
            />
          </div>
          {status && (
            <div
              role="status"
              className={`services-form-feedback ${
                status.type === 'success' ? 'is-success' : 'is-error'
              }`}
            >
              {status.text}
            </div>
          )}
        </form>
      </div>
    );
  }

  const effectiveId = innerId || (variant === 'proposal-5' ? 'responsive-form' : 'nft-form');

  return (
    <div className="wpcf7">
      <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
        <div className="clearfix" id={effectiveId}>
          {heading && (
            <div>
              <HeadingTag className="text-2xl font-bold text-white mb-4 text-center">
                {heading}
              </HeadingTag>
            </div>
          )}
          <p>
            <input
              className="wpcf7-form-control wpcf7-text"
              type="text"
              name="fname"
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Name"
              required
            />
          </p>
          <p>
            <input
              className="wpcf7-form-control wpcf7-email"
              type="email"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              required
            />
          </p>
          {variant === 'proposal-5' && (
            <p>
              <input
                className="wpcf7-form-control wpcf7-text"
                type="text"
                name="country"
                placeholder="Country*"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-label="Country"
                required
              />
            </p>
          )}
          <p>
            <input
              className="wpcf7-form-control wpcf7-tel"
              type="tel"
              name="phone"
              placeholder={
                phonePlaceholder ||
                (variant === 'proposal-5' ? 'Mobile Number*' : 'Mobile Number')
              }
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone Number"
              required
            />
          </p>
          {variant === 'proposal-5' && (
            <p>
              <textarea
                className="wpcf7-form-control wpcf7-textarea"
                name="your-message"
                rows={4}
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="Message"
              />
            </p>
          )}
          <p className="text-center mb-0">
            <input
              className="wpcf7-form-control wpcf7-submit"
              type="submit"
              value={submitLabel || 'Submit'}
            />
          </p>
          {status && (
            <div
              role="status"
              className={`services-form-feedback ${
                status.type === 'success' ? 'is-success' : 'is-error'
              }`}
            >
              {status.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
