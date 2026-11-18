import { Link } from 'react-router-dom';
import { PageSeo } from '@/components/sections';
import '@/styles/chatgpt-ads.css';

interface ChatgptAdsSubPageProps {
  mode: 'blog' | 'education';
}

export function ChatgptAdsSubPage({ mode }: ChatgptAdsSubPageProps) {
  return (
    <div className="chatgpt-sub-scope">
      <PageSeo
        title={mode === 'blog' ? 'ChatGPT & AI Search Visibility Blog | EON8' : 'AI Visibility Education | EON8'}
        description={
          mode === 'blog'
            ? 'Practical articles on AI search, ChatGPT visibility, local discovery, and paid placements by EON8.'
            : 'A practical guide to checking how ChatGPT and AI search engines find and describe your business.'
        }
        canonicalPath={
          mode === 'blog' ? '/chatgpt-ads-agency/blog' : '/chatgpt-ads-agency/education'
        }
      />
      <header className="shell nav">
        <Link className="logo" to="/" aria-label="EON8 home">
          <img
            src="/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png"
            alt="EON8"
            className="logo-img"
            height={36}
          />
        </Link>
        <nav aria-label="Main navigation">
          <Link to="/">← Main Site</Link>
          <Link to="/chatgpt-ads-agency">ChatGPT Hub</Link>
          <Link to="/chatgpt-ads-agency#packages">Packages</Link>
          <Link
            to="/chatgpt-ads-agency/blog"
            aria-current={mode === 'blog' ? 'page' : undefined}
          >
            Blog
          </Link>
          <Link
            to="/chatgpt-ads-agency/education"
            aria-current={mode === 'education' ? 'page' : undefined}
          >
            Education
          </Link>
        </nav>
      </header>

      {mode === 'blog' ? (
        <main className="shell">
          <p className="eyebrow">EON8 Blog</p>
          <h1>AI visibility for business</h1>
          <p className="intro">
            Practical articles for local businesses, retail brands, and B2B teams.
          </p>
          <div className="index" aria-label="Articles">
            <a href="#buyer-questions">Buyer questions</a>
            <a href="#local-discovery">Local discovery</a>
            <a href="#organic-and-paid">Organic and paid</a>
          </div>
          <article id="buyer-questions">
            <p className="eyebrow">AI Search</p>
            <h2>What do customers ask ChatGPT before they buy?</h2>
            <p>
              Start with a buying decision. A bakery customer might ask for a custom birthday cake in Chennai. Someone renovating a flat may ask for a 3BHK designer within a budget. A payroll buyer might ask which providers support a 100-person team.
            </p>
            <p>
              Write down the question, the market, the brands mentioned, and the sources cited. Repeat the same questions after you update your pages. That gives you a baseline you can compare over time.
            </p>
            <p>
              <Link to="/chatgpt-ads-agency#examples">See four worked examples →</Link>
            </p>
          </article>
          <article id="local-discovery">
            <p className="eyebrow">Local Business</p>
            <h2>Make it easier to verify what your business offers</h2>
            <p>
              Put your locations, hours, service areas, and booking details where customers can find them. Use one page to answer the questions that matter for a specific purchase, such as delivery area, lead time, or the price range for common requests.
            </p>
            <p>
              Check that the details agree across your website and the listings you control. If you’re eligible to claim your business in ChatGPT, your owner can complete the verification steps.
            </p>
            <p>
              <Link to="/chatgpt-ads-agency#local-business">See EON8’s local business service →</Link>
            </p>
          </article>
          <article id="organic-and-paid">
            <p className="eyebrow">ChatGPT Ads</p>
            <h2>What is the difference between a citation and a sponsored card?</h2>
            <p>
              A citation links to a source used in an answer. A sponsored card is a paid placement that can appear below the answer. If you run a campaign, measure its spend and tracked enquiries separately from organic mentions and referrals.
            </p>
            <p>
              <a
                href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read OpenAI’s ad-format guide ↗
              </a>
            </p>
          </article>
          <div className="cta">
            <h2>Want to run your first visibility check?</h2>
            <p>Use the step-by-step guide to build a baseline for your own business.</p>
            <Link className="button" to="/chatgpt-ads-agency/education">
              Open Education
            </Link>
          </div>
        </main>
      ) : (
        <main className="shell">
          <p className="eyebrow">EON8 Education</p>
          <h1>Learn how AI finds your business</h1>
          <p className="intro">
            A short guide for owners and marketing teams. Start with customer questions and work through to enquiries.
          </p>
          <div className="index" aria-label="Lessons">
            <a href="#audit">Run an audit</a>
            <a href="#improve">Improve a page</a>
            <a href="#measure">Measure leads</a>
          </div>
          <article id="audit">
            <p className="eyebrow">Lesson 1</p>
            <h2>Run a baseline audit</h2>
            <ol>
              <li>Pick one offer and one target market.</li>
              <li>Write five questions someone would ask before choosing a provider.</li>
              <li>
                Run each question and record the date, brands mentioned, cited sources, and any inaccurate details.
              </li>
            </ol>
            <p>
              <strong>Try it:</strong> Ask “Which after-school maths tutoring centres in Bengaluru offer a trial class?” Record which providers appear and whether their pages clearly explain grades, locations, and booking.
            </p>
          </article>
          <article id="improve">
            <p className="eyebrow">Lesson 2</p>
            <h2>Improve one page that answers a buyer’s question</h2>
            <p>
              Choose a page linked to a specific buying decision. Add the confirmed facts a buyer needs, such as service area, who the offer is for, indicative pricing where appropriate, and how to enquire.
            </p>
            <p>
              Keep the details consistent on listings you control. Check Business Hub eligibility if claiming is relevant to your business.
            </p>
            <p>
              <Link to="/chatgpt-ads-agency#local-business">
                Explore claiming and local optimization →
              </Link>
            </p>
          </article>
          <article id="measure">
            <p className="eyebrow">Lesson 3</p>
            <h2>Track enquiries as well as mentions</h2>
            <p>
              Repeat your original questions after making changes. Track sampled mentions and citations, identifiable referrals, and enquiries separately. Ask your sales team which enquiries became qualified leads or bookings.
            </p>
            <p>
              If you run a paid pilot, define one conversion goal and compare qualified-lead cost separately from organic traffic.
            </p>
            <p>
              <Link to="/chatgpt-ads-agency#examples">
                See where a sponsored ChatGPT ad can appear →
              </Link>
            </p>
          </article>
          <div className="cta">
            <h2>Get help with your first audit</h2>
            <p>
              Share your website or business listing, the customers you serve, and your target market.
            </p>
            <Link className="button" to="/contact">
              Request a visibility audit
            </Link>
          </div>
        </main>
      )}

      <footer className="shell">EON8 · Independent AI visibility agency</footer>
    </div>
  );
}

export default ChatgptAdsSubPage;
