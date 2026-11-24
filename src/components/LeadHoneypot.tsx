/**
 * Hidden spam-trap field for lead forms. People never see or fill it; many
 * bots fill every input. Put it inside each <form> that calls submitLeadEnquiry;
 * the value is picked up automatically and the server files such leads as spam.
 */
export function LeadHoneypot() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Leave this field empty
        <input type="text" name="hp" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
