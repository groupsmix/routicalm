import { useEffect } from "react";

// Tell TypeScript about the MailerLite global injected by the universal script
declare global {
  interface Window {
    ml?: (...args: unknown[]) => void;
  }
}

// MailerLite embed
// The universal script is injected programmatically AFTER React mounts the div,
// so MailerLite's DOM scanner finds the ml-embedded element correctly.
const ML_ACCOUNT = "2344723";

function MailerLiteForm() {
  useEffect(() => {
    if (document.querySelector("script[data-mailerlite]")) {
      // Script already injected — just re-trigger account init to re-scan
      if (typeof window.ml === "function") {
        window.ml("account", ML_ACCOUNT);
      }
      return;
    }
    const s = document.createElement("script");
    s.setAttribute("data-mailerlite", "1");
    s.textContent = [
      "(function(w,d,e,u,f,l,n){",
      "w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},",
      "l=d.createElement(e),l.async=1,l.src=u,",
      "n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);",
      "})(window,document,'script',",
      "'https://assets.mailerlite.com/js/universal.js','ml');",
      `ml('account','${ML_ACCOUNT}');`,
    ].join("");
    document.head.appendChild(s);
  }, []);

  return <div className="ml-embedded" data-form="toSft6" />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { title: "Bathroom Organization", desc: "Simple storage and counter-clearing ideas for a cleaner space." },
  { title: "Beauty Routine Finds",  desc: "Tools and essentials that make getting ready feel easier." },
  { title: "Cozy Bedroom Finds",    desc: "Soft, useful pieces for a calmer, more restful room." },
  { title: "Kitchen & Cleaning",    desc: "Practical products that make everyday chores smoother." },
  { title: "Self-Care Gifts",       desc: "Easy gift ideas for calm, cozy, and thoughtful routines." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      {/* HEADER */}
      <header className="cr-header">
        <span className="cr-wordmark">CalmRoutine</span>
        <a href="#signup" className="cr-nav-link">Join the list</a>
      </header>

      <main>

        {/* HERO */}
        <section className="cr-section cr-hero" data-testid="section-hero">
          <p className="cr-label">Weekly finds for calmer daily life</p>
          <h1 className="cr-headline">
            Simple finds for a cleaner,<br />
            <em>calmer</em> daily routine.
          </h1>
          <p className="cr-subhead">
            A weekly edit of home, beauty, self-care, and organization finds
            made to help your everyday routines feel easier and more put together.
          </p>
          <div id="signup" className="cr-form-wrap">
            <MailerLiteForm />
            <p className="cr-trust">
              <span className="cr-social-proof">500+ readers already on the list.</span>
              {" "}No spam. Just simple finds, routine ideas, and useful product picks.
            </p>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="cr-section cr-section--alt" data-testid="section-categories">
          <p className="cr-label">What CalmRoutine covers</p>
          <h2 className="cr-title">Five everyday categories.</h2>
          <div className="cr-cards">
            {categories.map((cat, i) => (
              <div key={i} className="cr-card" data-testid={`card-category-${i}`}>
                <h3 className="cr-card-title">{cat.title}</h3>
                <p className="cr-card-desc">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section className="cr-section" data-testid="section-benefits">
          <p className="cr-label">Why join</p>
          <h2 className="cr-title">A calmer way to discover useful finds.</h2>
          <ul className="cr-benefits">
            <li>Weekly product finds worth saving</li>
            <li>Simple routine ideas for home, beauty, and self-care</li>
            <li>Organized shopping edits without the overwhelm</li>
          </ul>
        </section>

        {/* COMING SOON */}
        <section className="cr-section cr-soon" data-testid="section-coming-soon">
          <p className="cr-label cr-label--light">Coming soon</p>
          <h2 className="cr-soon-title">Product guides are on the way.</h2>
          <p className="cr-soon-body">
            Shopping pages for bathroom organization, beauty routines, cozy bedrooms,
            kitchen finds, and self-care gifts — join the list to get first access.
          </p>
          <MailerLiteForm />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="cr-footer" data-testid="section-footer">
        <div className="cr-footer-inner">
          <div>
            <p className="cr-wordmark">CalmRoutine</p>
            <p className="cr-footer-tag">Simple finds for a cleaner, calmer daily routine.</p>
          </div>
          <p className="cr-disclosure">
            {/* Affiliate disclosure — required for FTC compliance */}
            This site may contain affiliate links. I may earn a small commission at no extra cost to you.
            <br />&copy; {new Date().getFullYear()} CalmRoutine
          </p>
        </div>
      </footer>
    </>
  );
}
