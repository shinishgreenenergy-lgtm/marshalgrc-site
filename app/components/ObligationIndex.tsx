"use client";

import { useState } from "react";
import { HERO } from "../content";

/**
 * The hero figure: a control dial.
 *
 * The claim is "one control set, every framework", so the frameworks sit on a
 * ring around a single hub rather than in a list that implies eight separate
 * programmes. The ring is not decoration — it is divided into arcs by
 * governance domain, so the grouping in content.ts is the thing you see.
 *
 * Hover, focus or tap an obligation: its spoke and its domain arc light, and
 * the domain is named beside the dial. Every value comes from content.ts.
 */

const VIEW = 200;
const C = VIEW / 2;
const RING = 72;
const HUB = 38;
const STEP = 360 / HERO.frameworks.length;
const GAP = 5; // degrees trimmed off each end of a domain arc

/** Polar to cartesian, with 0° at the top of the dial. */
const pt = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};
const f2 = (n: number) => Number(n.toFixed(2));

const arc = (from: number, to: number, r: number) => {
  const [x1, y1] = pt(from, r);
  const [x2, y2] = pt(to, r);
  return `M${f2(x1)} ${f2(y1)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${f2(x2)} ${f2(y2)}`;
};

/** Consecutive frameworks sharing a domain become one arc of the ring. */
type Band = { reach: string; from: number; to: number };
const BANDS: Band[] = [];
HERO.frameworks.forEach((f, i) => {
  const end = i * STEP + STEP / 2 - GAP;
  const last = BANDS[BANDS.length - 1];
  if (last && last.reach === f.reach) last.to = end;
  else BANDS.push({ reach: f.reach, from: i * STEP - STEP / 2 + GAP, to: end });
});

const slug = (s: string) => s.replace(/\W+/g, "");

export function ObligationIndex() {
  // Hover and tap are separate: hovering a label then clicking it must not
  // cancel the selection the click just made.
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeName = pinned ?? hovered;
  const active = HERO.frameworks.find((f) => f.name === activeName) ?? null;

  return (
    <div className="index-grid">
      <div>
        <p className="index-claim">
          One control library, <em>every obligation</em>
        </p>
        <p className="index-note">
          {active ? `${active.name} sits under ${active.reach.toLowerCase()}.` : HERO.caption}
        </p>
      </div>

      <div className="orbit">
        <div className="stage">
          <div className="dial-box">
          <svg className="dial" viewBox={`0 0 ${VIEW} ${VIEW}`} aria-hidden="true">
            <circle className="dial-base" cx={C} cy={C} r={RING} />
            <circle className="dial-hub" cx={C} cy={C} r={HUB} />
            <circle className="dial-hub inner" cx={C} cy={C} r={HUB - 4} />

            {BANDS.map((b) => (
              <path
                key={b.reach}
                className={`dial-arc${active?.reach === b.reach ? " on" : ""}`}
                d={arc(b.from, b.to, RING)}
                pathLength={1}
              />
            ))}

            {BANDS.map((b) => {
              const [tx1, ty1] = pt(b.from - GAP, RING - 6);
              const [tx2, ty2] = pt(b.from - GAP, RING + 6);
              return <line key={`t${b.reach}`} className="dial-tick" x1={f2(tx1)} y1={f2(ty1)} x2={f2(tx2)} y2={f2(ty2)} />;
            })}

            {HERO.frameworks.map((f, i) => {
              const on = active?.name === f.name;
              const [x1, y1] = pt(i * STEP, HUB + 8);
              const [x2, y2] = pt(i * STEP, RING - 8);
              const [bx, by] = pt(i * STEP, RING);
              return (
                <g key={f.name} className={on ? "on" : undefined}>
                  <line className="dial-spoke" x1={f2(x1)} y1={f2(y1)} x2={f2(x2)} y2={f2(y2)} />
                  <circle className="dial-bead" cx={f2(bx)} cy={f2(by)} r={on ? 4.5 : 3} />
                </g>
              );
            })}
          </svg>

          <p className="hub-label">Control library</p>
          </div>

          <ul className="index-list">
            {HERO.frameworks.map((f, i) => {
              const a = ((i * STEP - 90) * Math.PI) / 180;
              return (
                <li
                  key={f.name}
                  style={{ "--x": f2(Math.cos(a)), "--y": f2(Math.sin(a)) } as React.CSSProperties}
                >
                  <button
                    type="button"
                    aria-pressed={pinned === f.name}
                    onPointerEnter={() => setHovered(f.name)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(f.name)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned((p) => (p === f.name ? null : f.name))}
                    className={active?.name === f.name ? "on" : undefined}
                    aria-describedby={`reach-${slug(f.name)}`}
                  >
                    <span>{f.name}</span>
                    <span className="reach" id={`reach-${slug(f.name)}`}>
                      {f.reach}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
