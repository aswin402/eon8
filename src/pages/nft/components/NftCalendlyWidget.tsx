import { useState, type FormEvent } from 'react';
import { Calendar, Clock, Globe, CheckCircle2 } from 'lucide-react';

interface NftCalendlyWidgetProps {
  callTitle?: string;
  callDescription?: string;
}

const AVAILABLE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const AVAILABLE_SLOTS = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

/**
 * Interactive consultation slot picker used inside all NFT Calendly containers.
 */
export function NftCalendlyWidget({
  callTitle = '30-Min NFT & Web3 Discovery Call',
  callDescription = 'Schedule a strategy session with our NFT, Discord & community marketing specialists.',
}: NftCalendlyWidgetProps) {
  const [selectedDay, setSelectedDay] = useState(AVAILABLE_DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState(AVAILABLE_SLOTS[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) {
      setError('Please enter your full name and a valid email address.');
      return;
    }
    setError('');
    setBooked(true);
  };

  return (
    <div className="crypto-calendly-widget">
      <div className="crypto-calendly-sidebar">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          EON8 Strategy Desk
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{callTitle}</h3>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed">{callDescription}</p>
        <div className="space-y-2.5 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
            <span>30 min video consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
            <span>UTC / IST / EST flexible hours</span>
          </div>
        </div>
      </div>

      <div className="crypto-calendly-slots">
        {booked ? (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-3" aria-hidden="true" />
            <h4 className="text-lg font-bold text-slate-900 mb-1">Consultation Confirmed</h4>
            <p className="text-sm text-slate-600 mb-4">
              Scheduled for <strong>{selectedDay}</strong> at <strong>{selectedSlot}</strong>. Invite sent to{' '}
              <strong>{email}</strong>.
            </p>
            <button
              type="button"
              className="crypto-calendly-chip is-active"
              onClick={() => {
                setBooked(false);
                setName('');
                setEmail('');
              }}
            >
              Book Another Slot
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} noValidate className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Preferred Day
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`crypto-calendly-chip ${selectedDay === day ? 'is-active' : ''}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Time Slot
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`crypto-calendly-chip ${selectedSlot === slot ? 'is-active' : ''}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <input
                type="text"
                placeholder="Your Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Work Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                required
              />
            </div>

            {error && (
              <div role="status" aria-live="polite" className="nft-form-feedback is-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#044db5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Confirm {selectedDay} • {selectedSlot} Slot
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
