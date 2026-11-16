import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function WorksPage() {
  const { setContactModalOpen } = useAppStore();

  useEffect(() => {
    document.title = 'Our Works, Portfolio & Case Study - Eon8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Readout online marketing and branding case study for Poorvika, Cake Square, Ramraj, TVS, Chettinad Health City, NAC Jewelry.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-body overflow-x-clip">
      {/* Live EON8 Blue Graph Title Banner */}
      <header
        className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-center pt-20 pb-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11, 27, 63, 0.85), rgba(0, 83, 198, 0.65)), url('/wp-content/uploads/2019/08/page_title_bg.jpg')`,
        }}
      >
        <div className="max-w-[1170px] mx-auto w-full px-5 sm:px-8 relative z-10">
          <div className="relative inline-block pl-4 sm:pl-5 py-1">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-1 w-[56px] sm:w-[65px] h-[calc(100%+10px)] bg-[#f7821b] -z-10"
            />
            <h1 className="text-3xl sm:text-[41px] font-heading font-bold uppercase text-white m-0 tracking-wide">
              Works
            </h1>
          </div>
        </div>
      </header>

      {/* Featured Case Study 1: Poorvika (Burnt Orange Section matching d_works.png) */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#c75410] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src="/wp-content/themes/eon8/assets/img/case_study_poorvika.png"
              alt="Poorvika Case Study Showcase"
              className="w-full rounded-2xl object-contain drop-shadow-2xl"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-block bg-white rounded-xl px-4 py-2 shadow-md">
              <img
                src="/wp-content/uploads/2019/09/poorvika.png"
                alt="Poorvika Logo"
                className="h-10 sm:h-12 object-contain"
              />
            </div>

            <h3 className="text-3xl sm:text-4xl font-heading font-black tracking-wide text-white uppercase">
              POORVIKA
            </h3>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              Poorvika is a leading multi-brand retail chain that deals in mobile phones and connections, accessories, recharges and internet data cards.
            </p>

            <Link
              to="/case-study-poorvika"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-[#c75410] font-bold text-sm hover:bg-orange-50 transition-colors shadow-lg"
            >
              <span>Read More</span>
              <img
                src="/wp-content/themes/eon8/assets/svg/long-arrow.svg"
                alt=""
                className="w-5 h-5 object-contain"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Case Study 2: Cake Square Chennai (Cobalt Blue Section matching d_works.png) */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#084488] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            <div className="inline-block bg-white rounded-xl px-4 py-2 shadow-md">
              <img
                src="/wp-content/themes/eon8/assets/img/cake-square-logo.png"
                alt="Cake Square Logo"
                className="h-12 object-contain"
              />
            </div>

            <h3 className="text-3xl sm:text-4xl font-heading font-black tracking-wide text-white uppercase">
              CAKE SQUARE CHENNAI
            </h3>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-xl">
              Cake Square is a pioneer in the online cake shop model and provides home delivery services in Chennai for all occasions. Cake Square brings a rich culinary experience to the subtle art of baking and cake making.
            </p>

            <Link
              to="/case-study-cake-square-chennai"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#FD5900] text-white font-bold text-sm hover:bg-[#e55000] transition-colors shadow-lg"
            >
              <span>Read More</span>
              <img
                src="/wp-content/themes/eon8/assets/svg/long-arrow.svg"
                alt=""
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </Link>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <img
              src="/wp-content/themes/eon8/assets/img/cake_square_web.png"
              alt="Cake Square Chennai Website"
              className="w-full rounded-2xl object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Case Study 3: Hidden Secret NFT Case Study */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src="/wp-content/uploads/2022/11/truck-campaign-scaled.jpg"
              alt="Hidden Secret NYC Times Square Truck Stunt"
              loading="lazy"
              className="w-full rounded-2xl object-cover aspect-video shadow-2xl border border-white/10"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FD5900]/20 text-[#FD5900] border border-[#FD5900]/30 text-xs font-bold uppercase tracking-wider">
              Web3 &amp; NFT Case Study
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black text-white">
              HIDDEN SECRET — NYC TIMES SQUARE
            </h3>
            <p className="text-base text-slate-300 leading-relaxed">
              Showcased in NYC Times Square within 7 days via viral truck stunt campaign, 300+ press releases, and 100+ synchronized influencer pushes — generating 150% daily traffic lift and 90% mint-day conversion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/case-study-hidden-secret"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                Start Your Campaign
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
