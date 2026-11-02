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
      <div className="band page-hero">
        <div className="wrap">
          <h1>{PLATFORM_HERO.h1}</h1>
          <p className="lede">{PLATFORM_HERO.lede}</p>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{COVERAGE.heading}</h2>
            <p className="lede">{COVERAGE.lede}</p>
          </div>
          <CoverageMatrix />
          <p className="dash-note">{COVERAGE.hint}</p>
        </div>
      </div>

      <div className="section">
        <div className="wrap ruled">
          <div className="section-head">
            <h2>{WORKFLOW.heading}</h2>
            <p className="lede">{WORKFLOW.lede}</p>
          </div>
          <EvidenceFlow />
        </div>
      </div>

      <div className="section">
        <div className="wrap ruled feature">
          <div>
            <h2 style={{ marginBottom: 16 }}>{DASHBOARDS.heading}</h2>
            <p className="lede">{DASHBOARDS.lede}</p>
            <ul>
              {DASHBOARDS.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <PostureDash />
        </div>
      </div>

      <div className="section">
        <div className="wrap ruled">
          <div className="section-head">
            <h2>{REPORTING.heading}</h2>
            <p className="lede">{REPORTING.lede}</p>
          </div>
          <div className="reports">
            {REPORTING.items.map((r) => (
              <div className="report" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="band section">
        <div className="wrap residency">
          <div>
            <h2 style={{ marginBottom: 16 }}>{RESIDENCY.heading}</h2>
            <p className="lede">{RESIDENCY.lede}</p>
          </div>
          <div className="regions" aria-label="Regions served">
            {RESIDENCY.regions.map((r) => <span key={r}>{r}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}
