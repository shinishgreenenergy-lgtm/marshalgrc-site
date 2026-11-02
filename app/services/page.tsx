import type { Metadata } from "next";
import { ServiceLedger } from "../components/ServiceLedger";
import { SERVICES_HERO, AGNOSTIC, SECTORS } from "../content";

export const metadata: Metadata = {
  title: "GRC services",
  description: SERVICES_HERO.lede,
};

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="rule" aria-hidden="true" />
          <h1>{SERVICES_HERO.h1}</h1>
          <p className="lede">{SERVICES_HERO.lede}</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "clamp(32px,4vw,56px)" }}>
        <div className="wrap">
          <div className="agnostic">
            {AGNOSTIC.map((a) => (
              <div key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ServiceLedger />
        </div>
      </section>

      <section className="section">
        <div className="wrap spread">
          <header>
            <h2>{SECTORS.heading}</h2>
            <p className="lede">{SECTORS.lede}</p>
          </header>
          <div className="sectors">
            {SECTORS.rows.map((s) => (
              <div className="sector-row" key={s.sector}>
                <h3>{s.sector}</h3>
                <p><span className="k">Data at stake</span>{s.data}</p>
                <p><span className="k">Typical obligations</span>{s.obligations}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band invert on-field">
        <div className="wrap">
          <h2>Tell us which domain you need help with.</h2>
          <a className="btn btn-primary" href="/contact/#enquiry">Send an enquiry</a>
        </div>
      </section>
    </>
  );
}
