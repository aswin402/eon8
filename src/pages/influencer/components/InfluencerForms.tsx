import { useState, type FormEvent } from 'react';

interface FeedbackState {
  ok: boolean;
  text: string;
}

function FormFeedbackBanner({ feedback }: { feedback: FeedbackState | null }) {
  if (!feedback) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`influencer-form-feedback ${feedback.ok ? 'is-success' : 'is-error'}`}
    >
      {feedback.text}
    </div>
  );
}

interface InfluencerQuoteFormProps {
  heading: string;
  submitLabel?: string;
}

/**
 * Full quote request card (#responsive-form) used on Agency & Instagram pages.
 */
export function InfluencerQuoteForm({
  heading,
  submitLabel = 'Submit',
}: InfluencerQuoteFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@') || !country.trim()) {
      setFeedback({
        ok: false,
        text: 'Please enter your name, a valid email address, and your country.',
      });
      return;
    }
    setFeedback({
      ok: true,
      text: 'Thank you! Our influencer marketing team will contact you within 24 hours.',
    });
    setName('');
    setEmail('');
    setCountry('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="wpcf7">
      <form className="wpcf7-form init" onSubmit={handleSubmit} noValidate>
        <div className="clearfix" id="responsive-form">
          <div>
            <h4>{heading}</h4>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="column-full">
                <p>
                  <span className="wpcf7-form-control-wrap" data-name="fname">
                    <input
                      aria-required="true"
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
            <div className="col-md-12">
              <div className="column-full">
                <p>
                  <span className="wpcf7-form-control-wrap" data-name="email">
                    <input
                      aria-required="true"
                      className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
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
            <div className="col-md-12">
              <div className="column-full">
                <p>
                  <span className="wpcf7-form-control-wrap" data-name="country">
                    <input
                      aria-required="true"
                      className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                      name="country"
                      placeholder="Country*"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="column-full">
              <p>
                <span className="wpcf7-form-control-wrap" data-name="phone">
                  <input
                    className="wpcf7-form-control wpcf7-intl_tel wpcf7-intl-tel"
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

          <div className="form-row">
            <div className="column-full">
              <p>
                <span className="wpcf7-form-control-wrap" data-name="your-message">
                  <textarea
                    className="wpcf7-form-control wpcf7-textarea"
                    cols={10}
                    rows={5}
                    name="your-message"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </span>
              </p>
            </div>
          </div>

          <div className="form-row">
            <div className="column-full">
              <p>
                <input
                  className="wpcf7-form-control wpcf7-submit has-spinner"
                  type="submit"
                  value={submitLabel}
                />
              </p>
            </div>
          </div>

          <FormFeedbackBanner feedback={feedback} />
        </div>
      </form>
    </div>
  );
}

/**
 * Elementor hero funnel form (#seo-funnel-form) used on TikTok & YouTube pages.
 */
export function ElementorFunnelForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setFeedback({
        ok: false,
        text: 'Please provide your name and a valid email address.',
      });
      return;
    }
    setFeedback({
      ok: true,
      text: 'Proposal request received! Our influencer strategists will connect shortly.',
    });
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
  };

  return (
    <div
      className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c4d1551"
      data-element_type="column"
      data-id="c4d1551"
      id="seo-funnel-form"
    >
      <div className="elementor-widget-wrap elementor-element-populated">
        <div
          className="elementor-element elementor-element-d51d0ca elementor-widget elementor-widget-html"
          data-element_type="widget"
          data-id="d51d0ca"
          data-widget_type="html.default"
        >
          <div className="elementor-widget-container">
            <div className="wpcf7">
              <form className="wpcf7-form init" onSubmit={handleSubmit} noValidate>
                <div className="clearfix" id="responsive-form">
                  <div className="form-row">
                    <div className="column-full">
                      <p>
                        <span className="wpcf7-form-control-wrap" data-name="fname">
                          <input
                            aria-required="true"
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                            name="fname"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="column-full">
                      <p>
                        <span className="wpcf7-form-control-wrap" data-name="email">
                          <input
                            aria-required="true"
                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="column-full">
                      <p>
                        <span className="wpcf7-form-control-wrap" data-name="phone">
                          <input
                            className="wpcf7-form-control wpcf7-tel wpcf7-text wpcf7-validates-as-tel"
                            name="phone"
                            placeholder="Phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="column-full">
                      <p>
                        <span className="wpcf7-form-control-wrap" data-name="your-message">
                          <textarea
                            className="wpcf7-form-control wpcf7-textarea"
                            cols={40}
                            rows={10}
                            name="your-message"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="column-full">
                      <p>
                        <input
                          className="wpcf7-form-control wpcf7-submit has-spinner"
                          type="submit"
                          value="Submit"
                        />
                      </p>
                    </div>
                  </div>
                  <FormFeedbackBanner feedback={feedback} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ElementorCallbackFormProps {
  placeholder: string;
  submitLabel: string;
}

/**
 * Horizontal callback capture form used inside the "5 Minutes Call Back" bar.
 */
export function ElementorCallbackForm({
  placeholder,
  submitLabel,
}: ElementorCallbackFormProps) {
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) {
      setFeedback({
        ok: false,
        text: 'Please enter a valid phone number (at least 7 digits).',
      });
      return;
    }
    setFeedback({
      ok: true,
      text: 'Callback scheduled! Expect a call from an EON8 strategist within 5 minutes.',
    });
    setPhone('');
  };

  return (
    <div className="wpcf7">
      <form className="wpcf7-form init" onSubmit={handleSubmit} noValidate>
        <p>
          <label>
            <span className="wpcf7-form-control-wrap phone">
              <input
                aria-label="Phone number for callback"
                aria-required="true"
                className="wpcf7-form-control wpcf7-intl_tel wpcf7-validates-as-required wpcf7-intl-tel"
                name="phone"
                placeholder={placeholder}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </span>
          </label>
        </p>
        <div className="call-back-btn">
          <p>
            <input
              className="wpcf7-form-control wpcf7-submit has-spinner"
              type="submit"
              value={submitLabel}
            />
          </p>
        </div>
      </form>
      <FormFeedbackBanner feedback={feedback} />
    </div>
  );
}

interface TwitterLeadFormProps {
  heading: string;
  submitLabel?: string;
  id?: string;
}

/**
 * Compact lead form card (#nft-form) used on the Twitter Influencer page.
 */
export function TwitterLeadForm({
  heading,
  submitLabel = 'Submit',
  id,
}: TwitterLeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setFeedback({
        ok: false,
        text: 'Please enter a valid name and email address.',
      });
      return;
    }
    setFeedback({
      ok: true,
      text: 'Thank you! Our Twitter influencer team will contact you within 24 hours.',
    });
    setName('');
    setEmail('');
    setPhone('');
  };

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
                    <span className="wpcf7-form-control-wrap" data-name="phone">
                      <input
                        className="wpcf7-form-control wpcf7-intl_tel wpcf7-intl-tel"
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
              <div className="col-12">
                <p>
                  <input
                    className="wpcf7-form-control wpcf7-submit has-spinner"
                    type="submit"
                    value={submitLabel}
                  />
                </p>
              </div>
            </div>
            <FormFeedbackBanner feedback={feedback} />
          </div>
        </form>
      </div>
    </div>
  );
}
