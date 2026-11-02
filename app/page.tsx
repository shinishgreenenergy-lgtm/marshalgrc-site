import Link from "next/link";
import { ControlLattice } from "./components/ControlLattice";
import { HERO, TRIAD, QUALITIES, PRESSURE, OFFER, ENGAGEMENT } from "./content";

export default function Home() {
  return (
    <>
      <div className="band hero">
        <div className="wrap hero-grid">
          <div>
            <h1>{HERO.h1}</h1>
            <p className="lede">{HERO.lede}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="/contact/#demo">Request a demo</a>
              <Link className="btn btn-ghost" href="/platform">See the platform</Link>
            </div>
          </div>
          <ControlLattice />
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{TRIAD.heading}</h2>
            <p className="lede">{TRIAD.lede}</p>
          </div>
          <div className="triad">
            {TRIAD.items.map((t) => (
              <div key={t.letter}>
                <div className="letter" aria-hidden="true">{t.letter}</div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <p className="triad-note">{TRIAD.note}</p>
        </div>
      </div>

      <div className="section">
        <div className="wrap ruled qualities">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2>{QUALITIES.heading}</h2>
            <p className="lede">{QUALITIES.lede}</p>
          </div>
          <ul className="qlist">
            {QUALITIES.items.map((q) => (
              <li key={q.title}>
                <svg className="tick" viewBox="0 0 22 22" aria-hidden="true">
                  <circle cx="11" cy="11" r="10" />
                  <path d="M6.5 11.3l3 3 6-6.5" />
                </svg>
                <div>
                  <h3>{q.title}</h3>
                  <p>{q.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section">
        <div className="wrap ruled">
          <div className="section-head">
            <h2>{PRESSURE.heading}</h2>
            <p className="lede">{PRESSURE.lede}</p>
          </div>
          <div className="notes">
            {PRESSURE.items.map((n) => (
              <div key={n.title}>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap ruled">
          <div className="section-head">
            <h2>{OFFER.heading}</h2>
            <p className="lede">{OFFER.lede}</p>
          </div>
          <div className="offer">
            {OFFER.items.map((o) => (
              <article key={o.title} className={o.lead ? "lead" : undefined}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                {o.href.startsWith("/contact") ? (
                  <a className="more" href={o.href}>{o.cta}</a>
                ) : (
                  <Link className="more" href={o.href}>{o.cta}</Link>
                )}
              </article>
            ))}
          </div>

          <h2 style={{ margin: "72px 0 10px", fontSize: "1.9rem" }}>{ENGAGEMENT.heading}</h2>
          <p style={{ color: "var(--ink-2)", marginBottom: 28, maxWidth: "62ch" }}>{ENGAGEMENT.lede}</p>
          <ol className="phases">
            {ENGAGEMENT.stages.map((s) => (
              <li key={s.num}>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="deliv">{s.deliverable}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="band cta-band">
        <div className="wrap">
          <h2>See how your controls would map before you commit.</h2>
          <a className="btn btn-primary" href="/contact/#demo">Request a demo</a>
        </div>
      </div>
    </>
  );
}
