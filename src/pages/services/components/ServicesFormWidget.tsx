import { useState, type FormEvent } from 'react';
import type { ServiceFormNode } from '../types';

interface ServicesFormWidgetProps {
  node: ServiceFormNode;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const YOU_ARE_OPTIONS = ['Brand / Business', 'Agency', 'NFT / Web3 Project', 'Creator'];
const BUDGET_OPTIONS = ['Under $2,000', '$2,000 - $5,000', '$5,000 - $15,000', '$15,000+'];

/**
 * Controlled React form component replacing all legacy CF7 forms across all 71 service & landing pages
 * (proposal-5, proposal-4, callback-3, phone-callback, influencer-8).
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
  const [youAre, setYouAre] = useState(YOU_ARE_OPTIONS[0]);
  const [brandName, setBrandName] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [quiz, setQuiz] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const HeadingTag = headingTag;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (variant === 'phone-callback') {
      const trimmed = phone.trim();
      if (trimmed.length < 5) {
        setStatus({ type: 'error', text: 'Please enter a valid phone number or website.' });
        return;
      }
      setStatus({
        type: 'success',
        text: 'Thank you! Our specialist will reach out to you shortly.',
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

    if (variant === 'influencer-8' && quiz.trim() !== '15') {
      setStatus({
        type: 'error',
        text: 'Please enter the correct verification answer (12 + 3 = 15).',
      });
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
    setBrandName('');
    setQuiz('');
    setMessage('');
  };

  if (variant === 'phone-callback') {
    return (
      <div className="wpcf7">
        <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-wrap items-center gap-3">
            <input
              className="wpcf7-form-control wpcf7-tel"
              type="text"
              name="phone"
              placeholder={phonePlaceholder || 'Enter Phone Number'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label={phonePlaceholder || 'Phone Number'}
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

  const effectiveId =
    innerId ||
    (variant === 'influencer-8'
      ? 'influencer-form'
      : variant === 'callback-3'
        ? 'nft-form'
        : 'responsive-form');

  const hasMessageField =
    variant === 'proposal-5' || variant === 'proposal-4' || variant === 'influencer-8';

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
                (variant === 'callback-3' ? 'Mobile Number' : 'Mobile Number*')
              }
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone Number"
              required
            />
          </p>
          {variant === 'influencer-8' && (
            <>
              <p>
                <select
                  className="wpcf7-form-control"
                  name="Youare"
                  value={youAre}
                  onChange={(e) => setYouAre(e.target.value)}
                  aria-label="You are"
                >
                  {YOU_ARE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <input
                  className="wpcf7-form-control wpcf7-text"
                  type="text"
                  name="BrandName"
                  placeholder="Brand / Project Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  aria-label="Brand Name"
                />
              </p>
              <p>
                <select
                  className="wpcf7-form-control"
                  name="BudgetOption"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  aria-label="Budget"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </p>
            </>
          )}
          {hasMessageField && (
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
          {variant === 'influencer-8' && (
            <p>
              <label className="block text-sm font-semibold text-slate-800 px-2 pt-1 mb-1">
                12 + 3 = ?
              </label>
              <input
                className="wpcf7-form-control wpcf7-text"
                type="text"
                name="math-quiz"
                placeholder="Enter Answer*"
                value={quiz}
                onChange={(e) => setQuiz(e.target.value)}
                aria-label="Math Verification"
                required
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
