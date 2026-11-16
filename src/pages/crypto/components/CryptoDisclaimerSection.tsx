interface CryptoDisclaimerSectionProps {
  text?: string;
}

const DEFAULT_DISCLAIMER =
  'Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes.';

export function CryptoDisclaimerSection({ text }: CryptoDisclaimerSectionProps) {
  const copy = text?.trim() || DEFAULT_DISCLAIMER;
  if (!copy) return null;

  return (
    <section className="testi_sec">
      <div className="container">
        <div className="row disc-head">
          <div className="col-md-12">
            <div className="claim-box text-center">
              <p>{copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
