import { useEffect, useState, type FormEvent } from 'react';

const BUDGET_OPTIONS = [
  'Budget',
  '$1,000 - $4,000',
  '$5,000 - $8,000',
  '$8,000 - $15,000',
  '$16,000 - $25,0000',
  '$26,000+',
];

const TIME_OPTIONS = [
  'Preferred Time*',
  '9:00am - 11:00am IST',
  '11:00am - 1:00pm IST',
  '2:00pm - 5:00pm IST',
  '5:00pm - 7:00pm IST',
  '8:00pm - 10:00pm IST',
];

interface NftConsultationFormFieldsProps {
  submitLabel: string;
}

/**
 * Shared 11-field EON8 NFT Consultation form reused across #myModal and consultation pages.
 */
export function NftConsultationFormFields({
  submitLabel,
}: NftConsultationFormFieldsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [companyweb, setCompanyweb] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(TIME_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [quiz, setQuiz] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !country.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required contact fields.' });
      return;
    }
    if (quiz.trim() !== '15') {
      setStatus({ type: 'error', text: 'Please enter the correct verification answer (12 + 3 = 15).' });
      return;
    }
    setStatus({
      type: 'success',
      text: 'Thank you! Your consultation request has been received. Our NFT strategist will confirm shortly.',
    });
    setName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setCompanyweb('');
    setBudget(BUDGET_OPTIONS[0]);
    setDate('');
    setTime(TIME_OPTIONS[0]);
    setMessage('');
    setQuiz('');
  };

  return (
    <form className="wpcf7-form" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            name="fname"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            name="country"
            placeholder="Country*"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            name="companyweb"
            placeholder="Company Website"
            value={companyweb}
            onChange={(e) => setCompanyweb(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <select name="Budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="date"
            name="Rdate"
            aria-label="Preferred Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <select name="time" value={time} onChange={(e) => setTime(e.target.value)}>
            {TIME_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 mb-3">
          <textarea
            name="your-message"
            rows={3}
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="col-12 mb-3">
          <label className="block text-sm font-medium mb-1">
            <span>12 + 3=?</span>
          </label>
          <input
            type="text"
            name="math-quiz"
            placeholder="Enter Answer*"
            value={quiz}
            onChange={(e) => setQuiz(e.target.value)}
            required
          />
        </div>
        <div className="col-12 text-center">
          <input className="wpcf7-submit" type="submit" value={submitLabel || 'Submit'} />
        </div>
      </div>

      {status && (
        <div className={`nft-form-feedback ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
          {status.text}
        </div>
      )}
    </form>
  );
}

interface NftConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'default' | 'blue';
  heading: string;
  submitLabel: string;
}

/**
 * Accessible consultation modal replacing legacy Bootstrap #myModal.
 */
export function NftConsultationModal({
  isOpen,
  onClose,
  variant,
  heading,
  submitLabel,
}: NftConsultationModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="myModal"
      className="modal nft-react-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nftModalHeading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog" role="document">
        <div className={`modal-content ${variant === 'blue' ? 'blue-modal-content' : ''}`}>
          <div className="modal-body p-6 bg-white">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h3 id="nftModalHeading" className="text-2xl font-bold text-slate-900 mb-4 pr-8">
              {heading}
            </h3>
            <div className="wpcf7">
              <NftConsultationFormFields submitLabel={submitLabel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
