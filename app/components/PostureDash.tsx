import { DASHBOARDS } from "../content";

const HEAT_COLOURS = [
  "rgba(94,155,255,.22)",
  "rgba(94,155,255,.55)",
  "rgba(233,178,89,.72)",
  "rgba(221,98,77,.85)",
];
const HEAT_NAMES = ["low", "moderate", "high", "severe"];

/** Illustrative posture view. Bars fill as the panel enters the viewport,
 *  which reads as measurement rather than ornament. */
export function PostureDash() {
  const counts = HEAT_NAMES.map(
    (n, i) => `${DASHBOARDS.heat.filter((l) => l === i).length} ${n}`,
  );

  return (
    <div>
      <div className="dash">
        <div className="dash-top">
          <strong>Compliance posture</strong>
          <span>Illustrative view</span>
        </div>
        <div className="dash-grid">
          <div className="tile wide meters">
            <h4>Controls passing, by framework</h4>
            {DASHBOARDS.bars.map((b) => (
              <div className="bar" key={b.label}>
                <span>{b.label}</span>
                <div className="track">
                  <div className="fill" style={{ width: `${b.pct}%` }} />
                </div>
                <span>{b.pct}%</span>
              </div>
            ))}
          </div>
          <div className="tile">
            <h4>Open issues</h4>
            <p className="big">
              {DASHBOARDS.openIssues.count}
              <small>{DASHBOARDS.openIssues.note}</small>
            </p>
          </div>
          <div className="tile">
            <h4>Residual risk</h4>
            <div className="heatwrap">
              <span className="heat-y" aria-hidden="true">Likelihood</span>
              <div
                className="heat"
                role="img"
                aria-label={`Residual risk across 25 register entries: ${counts.join(", ")}.`}
              >
                {DASHBOARDS.heat.map((level, i) => (
                  <i key={i} style={{ background: HEAT_COLOURS[level] }} />
                ))}
              </div>
              <span className="heat-x" aria-hidden="true">Impact</span>
            </div>
          </div>
        </div>
      </div>
      <p className="dash-note">{DASHBOARDS.note}</p>
    </div>
  );
}
