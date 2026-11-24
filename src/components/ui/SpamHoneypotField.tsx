interface SpamHoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

/**
 * Off-screen accessible honeypot field for bot deterrence across all public lead forms.
 * Human visitors and screen readers never interact with it; automated scrapers that populate
 * all inputs are silently discarded server-side.
 */
export function SpamHoneypotField({ value, onChange, id }: SpamHoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden opacity-0 pointer-events-none"
    >
      <label htmlFor={id || 'company-fax-field'}>Leave this field blank</label>
      <input
        id={id || 'company-fax-field'}
        name="companyFax"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
