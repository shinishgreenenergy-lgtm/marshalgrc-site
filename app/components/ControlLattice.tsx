import { HERO } from "../content";

/**
 * The hero figure, and the one place the design spends its boldness: a single
 * control library at the centre with a spoke to every framework it satisfies,
 * and chords between frameworks that share controls.
 *
 * Geometry is computed at build time, so the whole figure is in the HTML and
 * ships no JavaScript. Motion is pure CSS and opts out under reduced motion.
 */
const C = 270;
const R = 200;

export function ControlLattice() {
  const labels = HERO.frameworks;
  const pts = labels.map((t, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / labels.length;
    return { t, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  });

  const chords = HERO.chords.map(([a, b], k) => {
    const len = Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);
    return { a: pts[a], b: pts[b], len, delay: 0.9 + k * 0.08, k };
  });

  // Evidence travelling inward along three spokes, staggered.
  const pulses = [0, 3, 5].map((i, n) => ({
    path: `path("M ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} L ${C} ${C}")`,
    delay: 1.6 + n * 1.1,
  }));

  return (
    <div>
      <svg
        className="lattice"
        viewBox="0 0 540 540"
        role="img"
        aria-label={`A single control library at the centre, linked to ${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}.`}
      >
        <circle className="ring" cx={C} cy={C} r={R} />
        <circle className="ring" cx={C} cy={C} r={R * 0.55} />

        {chords.map((c, i) => (
          <line
            key={`c${i}`} className="chord"
            x1={c.a.x} y1={c.a.y} x2={c.b.x} y2={c.b.y}
            style={{ "--len": c.len, "--d": `${c.delay}s` } as React.CSSProperties}
          />
        ))}

        {pts.map((p, i) => (
          <line
            key={`s${i}`} className="spoke"
            x1={C} y1={C} x2={p.x} y2={p.y}
            style={{ "--len": R, "--d": `${0.15 + i * 0.09}s` } as React.CSSProperties}
          />
        ))}

        <circle className="core-disc" cx={C} cy={C} r={58} />
        <circle className="core-ring" cx={C} cy={C} r={68} />
        <g transform={`translate(${C - 15},${C - 34})`}>
          <path
            d="M15 1.5 L28 6 V17 C28 25.5 22.5 31.5 15 34.5 C7.5 31.5 2 25.5 2 17 V6 Z"
            fill="none" stroke="var(--glow)" strokeWidth="2"
          />
          <rect x="8.5" y="12" width="13" height="3" rx="1.5" fill="var(--glow)" />
          <rect x="8.5" y="17" width="13" height="3" rx="1.5" fill="var(--glow)" opacity=".75" />
          <rect x="8.5" y="22" width="13" height="3" rx="1.5" fill="var(--glow)" opacity=".5" />
        </g>
        <text className="core-label" x={C} y={C + 25}>Control library</text>

        {pts.map((p, i) => {
          const w = p.t.length * 7.6 + 26;
          const h = 30;
          return (
            <g
              key={`p${i}`} className="pill"
              transform={`translate(${p.x - w / 2},${p.y - h / 2})`}
              style={{ "--d": `${0.55 + i * 0.09}s` } as React.CSSProperties}
            >
              <rect width={w} height={h} rx={15} />
              <text x={w / 2} y={19.5}>{p.t}</text>
            </g>
          );
        })}

        {pulses.map((p, i) => (
          <circle
            key={`u${i}`} className="pulse" r={4} cx={0} cy={0}
            style={{ "--path": p.path, "--d": `${p.delay}s` } as React.CSSProperties}
          />
        ))}
      </svg>
      <p className="lattice-caption">{HERO.caption}</p>
    </div>
  );
}
