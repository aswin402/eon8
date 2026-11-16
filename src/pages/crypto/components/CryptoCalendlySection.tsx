import { useState } from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface CryptoCalendlySectionProps {
  variant: 'light' | 'dark' | 'blue' | 'gold-agency';
  heading: string;
  subheading?: string;
  callTitle?: string;
  callDescription?: string;
}

const DAYS = ['Mon, May 18', 'Tue, May 19', 'Wed, May 20', 'Thu, May 21', 'Fri, May 22'];
const SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'];

export function CryptoCalendlySection({
  variant,
  heading,
  subheading,
  callTitle = '30-Min Crypto Discovery Call',
  callDescription = 'Schedule a consultation with our Web3 & crypto marketing strategists.',
}: CryptoCalendlySectionProps) {
  const setContactModalOpen = useAppStore((s) => s.setContactModalOpen);
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const sectionClass =
    variant === 'gold-agency'
      ? 'calendly-section'
      : variant === 'dark'
      ? 'dark-calendly-section'
      : variant === 'blue'
      ? 'blue-calendly-section'
      : 'light-calendly-section';

  const containerClass =
    variant === 'gold-agency'
      ? 'calendly-container'
      : variant === 'dark'
      ? 'dark-container'
      : variant === 'blue'
      ? 'blue-container'
      : 'light-container';

  const headerClass =
    variant === 'dark'
      ? 'dark-calendly-header text-center'
      : variant === 'blue'
      ? 'blue-calendly-header text-center'
      : 'light-calendly-header text-center';

  const boxClass =
    variant === 'gold-agency'
      ? 'calendly-wrapper'
      : variant === 'dark'
      ? 'dark-calendly-box'
      : variant === 'blue'
      ? 'blue-calendly-box'
      : 'light-calendly-box';

  return (
    <section className={sectionClass}>
      <div className={containerClass}>
        {variant === 'gold-agency' ? (
          <h2>{heading}</h2>
        ) : (
          <div className={headerClass}>
            <h2 className="reveal reveal-up">
              <span className="to">{heading}</span>
            </h2>
            {subheading && <p className="reveal">{subheading}</p>}
          </div>
        )}

        <div className={boxClass}>
          <div className="crypto-calendly-widget">
            <div className="crypto-calendly-sidebar">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-2">
                EON8 Strategy Team
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {callTitle}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {subheading || callDescription}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-700 mb-2">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>30 min session (IST / UTC)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 mb-6">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>{selectedDay}</span>
              </div>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg border border-blue-700 text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Or Send Quick Inquiry
              </button>
            </div>

            <div className="crypto-calendly-slots">
              <h4 className="text-base font-bold text-slate-900 mb-3">Select a Date</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {DAYS.map((day) => (
                  <button
                    type="button"
                    key={day}
                    className={`crypto-calendly-chip ${selectedDay === day ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedDay(day);
                      setConfirmed(false);
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-3">
                Available Time Slots ({selectedDay})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`crypto-calendly-chip ${selectedSlot === slot ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setConfirmed(false);
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              {selectedSlot && !confirmed && (
                <button
                  type="button"
                  onClick={() => setConfirmed(true)}
                  className="w-full py-3 px-5 rounded-lg bg-[#044db5] text-white font-semibold text-sm hover:bg-[#033d91] transition-colors cursor-pointer"
                >
                  Confirm Consultation ({selectedDay} at {selectedSlot})
                </button>
              )}

              {confirmed && selectedSlot && (
                <div className="crypto-form-feedback is-success flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Slot reserved for {selectedDay} at {selectedSlot}. We look forward to speaking
                    with you!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
