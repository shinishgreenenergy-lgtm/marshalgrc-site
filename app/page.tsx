import Link from "next/link";
import { Seal } from "./components/Logo";
import { Marquee } from "./components/Marquee";
import { ObligationIndex } from "./components/ObligationIndex";
import { path, TRIAD, QUALITIES, PRESSURE, OFFER, ENGAGEMENT } from "./content";

/** The headline, broken where it should break. Each line is masked and rises
 *  on load — one orchestrated moment, and the only motion above the fold. */
const HEADLINE = ["One control set.", "Every framework", "you answer to."];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Seal />
        <div className="wrap">
          <h1>
            {HEADLINE.map((line, i) => (
              <span className="ln" key={line}>
                <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero-foot">
            <p className="lede">
              A governance, risk and compliance platform with an in-house advisory team
              behind it. Map your controls once, collect evidence once, and report
              against ISO, SOC 2, NIST, privacy laws and AI standards from the same place.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href={path("/contact/#demo")}>Request a demo</a>
              <Link className="btn btn-ghost" href="/platform">See the platform</Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="invert section">
        <div className="wrap">
          <ObligationIndex />
        </div>
      </section>

      <section className="section">
        <div className="wrap spread">
          <header>
            <h2>{TRIAD.heading}</h2>
            <p className="lede">{TRIAD.lede}</p>
          </header>
          <div>
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
      </section>

      <section className="section">
        <div className="wrap spread">
          <header>
            <h2>{QUALITIES.heading}</h2>
            <p className="lede">{QUALITIES.lede}</p>
          </header>
          <ul className="qlist">
            {QUALITIES.items.map((q) => (
              <li key={q.title}>
                <svg className="tick" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M3 10.5l4.5 4.5L17 4.5" />
                </svg>
                <div>
                  <h3>{q.title}</h3>
                  <p>{q.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap spread">
          <header>
            <h2>{PRESSURE.heading}</h2>
            <p className="lede">{PRESSURE.lede}</p>
          </header>
          <div className="notes">
            {PRESSURE.items.map((n) => (
              <div key={n.title}>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="spread" style={{ marginBottom: "clamp(32px,5vw,56px)" }}>
            <header>
              <h2>{OFFER.heading}</h2>
              <p className="lede">{OFFER.lede}</p>
            </header>
            <div className="offer">
              {OFFER.items.map((o) => (
                <article key={o.title} className={o.lead ? "lead" : undefined}>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                  {o.href.startsWith("/contact") ? (
                    <a className="more" href={path(o.href)}>{o.cta}</a>
                  ) : (
                    <Link className="more" href={o.href}>{o.cta}</Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="invert section">
        <div className="wrap spread">
          <header>
            <h2>{ENGAGEMENT.heading}</h2>
            <p className="lede">{ENGAGEMENT.lede}</p>
          </header>
          <ol className="phases">
            {ENGAGEMENT.stages.map((s, i) => (
              <li key={s.num}>
                <span className="num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="deliv">{s.deliverable}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>See how your controls would map before you commit.</h2>
          <a className="btn btn-primary" href={path("/contact/#demo")}>Request a demo</a>
        </div>
      </section>
    </>
  );
}
