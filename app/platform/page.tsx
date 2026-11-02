import type { Metadata } from "next";
import { CoverageMatrix } from "../components/CoverageMatrix";
import { EvidenceFlow } from "../components/EvidenceFlow";
import { PostureDash } from "../components/PostureDash";
import { PLATFORM_HERO, COVERAGE, WORKFLOW, DASHBOARDS, REPORTING, RESIDENCY } from "../content";

export const metadata: Metadata = {
  title: "GRC platform",
  description: PLATFORM_HERO.lede,
};

export default function PlatformPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="rule" aria-hidden="true" />
          <h1>{PLATFORM_HERO.h1}</h1>
          <p className="lede">{PLATFORM_HERO.lede}</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap spread">
          <header>
            <h2>{COVERAGE.heading}</h2>
            <p className="lede">{COVERAGE.lede}</p>
          </header>
          <div>
            <CoverageMatrix />
            <p className="dash-note">{COVERAGE.hint}</p>
          </div>
        </div>
      </section>

      <section className="invert section">
        <div className="wrap spread">
          <header>
            <h2>{WORKFLOW.heading}</h2>
            <p className="lede">{WORKFLOW.lede}</p>
          </header>
          <EvidenceFlow />
        </div>
      </section>

      <section className="section">
        <div className="wrap feature">
          <div>
            <h2 style={{ marginBottom: 20 }}>{DASHBOARDS.heading}</h2>
            <p className="lede">{DASHBOARDS.lede}</p>
            <ul>
              {DASHBOARDS.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <PostureDash />
        </div>
      </section>

      <section className="section">
        <div className="wrap spread">
          <header>
            <h2>{REPORTING.heading}</h2>
            <p className="lede">{REPORTING.lede}</p>
          </header>
          <div className="reports">
            {REPORTING.items.map((r) => (
              <div className="report" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="invert section">
        <div className="wrap residency">
          <div>
            <h2 style={{ marginBottom: 20 }}>{RESIDENCY.heading}</h2>
            <p className="lede">{RESIDENCY.lede}</p>
          </div>
          <div className="regions" aria-label="Regions served">
            {RESIDENCY.regions.map((r) => <span key={r}>{r}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
