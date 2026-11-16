import { useState, type FormEvent } from 'react';
import { RichText } from '@/pages/crypto/components/RichText';
import type { NftBottomEnquiryData } from '../types';
import { NftConsultationFormFields } from './NftConsultationModal';

interface NftProposalFormProps {
  mode: 'callback-4' | 'proposal-6';
  heading?: string;
  submitLabel?: string;
}

/**
 * Shared CF7 proposal/callback form used in NFT hero forms and bottom enquiry sections.
 */
export function NftProposalForm({
  mode,
  heading,
  submitLabel = 'Submit',
}: NftProposalFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || (mode === 'proposal-6' && !country.trim())) {
      setStatus({ type: 'error', text: 'Please fill in all required contact fields.' });
      return;
    }
    setStatus({
      type: 'success',
      text: 'Thank you! Our NFT marketing specialists have received your inquiry and will respond shortly.',
    });
    setName('');
    setEmail('');
    setCountry('');
    setPhone('');
    setMessage('');
  };

  const formId = mode === 'proposal-6' ? 'responsive-form' : 'nft-form';
  const HeadingTag = mode === 'proposal-6' ? 'h4' : 'h3';

  return (
    <div className="banner_form">
      <div className="wpcf7">
        <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
          <div className="clearfix" id={formId}>
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
                required
              />
            </p>
            {mode === 'proposal-6' && (
              <p>
                <input
                  className="wpcf7-form-control wpcf7-text"
                  type="text"
                  name="country"
                  placeholder="Country*"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </p>
            )}
            <p>
              <input
                className="wpcf7-form-control wpcf7-tel"
                type="tel"
                name="phone"
                placeholder={mode === 'proposal-6' ? 'Mobile Number*' : 'Mobile Number'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </p>
            {mode === 'proposal-6' && (
              <p>
                <textarea
                  className="wpcf7-form-control wpcf7-textarea"
                  name="your-message"
                  rows={4}
                  placeholder="Type your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </p>
            )}
            <p className="text-center mb-0">
              <input
                className="wpcf7-form-control wpcf7-submit"
                type="submit"
                value={submitLabel}
              />
            </p>
            {status && (
              <div className={`nft-form-feedback ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                {status.text}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

interface NftBottomEnquirySectionProps {
  data: NftBottomEnquiryData;
  onOpenModal?: () => void;
}

/**
 * Shared bottom #enquiry section supporting gradient-nft stats/checklists and contact-nft image split.
 */
export function NftBottomEnquirySection({
  data,
  onOpenModal,
}: NftBottomEnquirySectionProps) {
  const HeadingTag = data.headingTag;

  return (
    <section className={data.sectionClass} id="enquiry">
      <div className="container">
        <div className="row">
          {data.leftImage ? (
            <div className="col-md-6 col-sm-12 text-center">
              <div className="monkey-nft">
                <img
                  src={data.leftImage.src}
                  alt={data.leftImage.alt}
                  className={data.leftImage.className || 'img-fluid'}
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="col-md-6 col-sm-12">
              <HeadingTag className="text-white">{data.heading}</HeadingTag>
              {data.paragraphs.map((nodes, idx) => (
                <p className="text-white" key={`p-${idx}`}>
                  <RichText nodes={nodes} />
                </p>
              ))}
              {data.subheading && <h4 className="text-white">{data.subheading}</h4>}
              {data.bullets.length > 0 && (
                <ul>
                  {data.bullets.map((bullet, idx) => (
                    <li className="text-white" key={`b-${idx}`}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {data.trailingParagraphs.map((nodes, idx) => (
                <p className="text-white" key={`tp-${idx}`}>
                  <RichText nodes={nodes} />
                </p>
              ))}
              {data.stats.length > 0 && (
                <div className="footer-number text-white">
                  {data.stats.map((st, idx) => (
                    <div className="footer-number-inner" key={`st-${idx}`}>
                      <h2>{st.value}</h2>
                      <p>{st.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {onOpenModal && data.formMode !== 'consultation-11' && (
                <div className="mt-4">
                  <button
                    type="button"
                    className="nft-eon-btn"
                    onClick={onOpenModal}
                  >
                    Schedule Consultation
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="col-lg-6 col-md-6 col-sm-12">
            {data.mode === 'contact-nft' && (
              <div className="section-title get-sec mb-4">
                <h2 className="title iq-fw-8 white-color text-center">{data.heading}</h2>
              </div>
            )}
            {data.formMode === 'consultation-11' ? (
              <div className="banner_form bg-white p-6 rounded-xl shadow-lg">
                <NftConsultationFormFields submitLabel={data.formSubmitLabel} />
              </div>
            ) : (
              <NftProposalForm
                mode={data.formMode}
                heading={data.formHeading}
                submitLabel={data.formSubmitLabel}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
