"use client";

import { useState } from "react";
import { SERVICES } from "../content";

/**
 * The hero figure: an orrery of obligations.
 *
 * The claim is one control set, so the GRC control library is the sun and the
 * eight governance domains ride one shared plane around it. Each domain's
 * satellites are the standards it answers to, read straight off SERVICES — the
 * figure cannot claim a standard the services page does not already list.
 *
 * Nothing moves on a timer. The satellites revolve with the scroll and each
 * domain takes its turn in front as the section passes, which is the motion
 * idiom the rest of the site uses and keeps this clear of WCAG 2.2.2.
 */

/* The plane is drawn in a 1000x560 box, so an ellipse rather than a circle:
   a ring seen at an angle, which is what lets eight labels sit apart on a
   figure that is far wider than it is tall. */
const VW = 1000;
const VH = 560;
const CX = VW / 2;
const CY = VH / 2;
const RX = 390;
const RY = 190;

const STEP = 360 / SERVICES.length;
const r2 = (n: number) => Number(n.toFixed(3));

const WORLDS = SERVICES.map((s, i) => {
  // 90deg is the front of the plane, so the first domain leads at the bottom
  // and the ring reads anticlockwise from there.
  const t = ((i * STEP + 90) * Math.PI) / 180;
  const x = Math.cos(t);
  const y = Math.sin(t);
  return {
    id: s.id,
    name: s.short,
    title: s.title,
    /** The services page's own standards line, split — never retyped here. */
    moons: s.standards.split(",").map((m) => m.trim()).filter(Boolean),
    x: r2(x),
    y: r2(y),
    /** The bottom of the ellipse reads as nearest the viewer. */
    near: r2((y + 1) / 2),
    z: Math.round(((y + 1) / 2) * 10),
    sx: r2(CX + RX * x),
    sy: r2(CY + RY * y),
  };
});

/** Spokes start at the sun's edge, not its centre, so none of them crosses
 *  the label inside it. */
const SUN_R = 112;
const SPOKES = WORLDS.map((w) => {
  const dx = w.sx - CX;
  const dy = w.sy - CY;
  const k = (SUN_R + 8) / Math.hypot(dx, dy);
  return { id: w.id, x1: r2(CX + dx * k), y1: r2(CY + dy * k), x2: w.sx, y2: w.sy };
});

export function ControlOrrery() {
  // Hover and tap are separate: hovering a domain then clicking it must not
  // cancel the selection the click just made.
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = pinned ?? hovered;

  return (
    // data-mode stops the scroll sweep the moment a domain is held, so the
    // pointer always wins over the animation rather than fighting it.
    <div className="orrery" data-mode={active ? "held" : "sweep"}>
      <svg className="plane" viewBox={`0 0 ${VW} ${VH}`} aria-hidden="true">
        <ellipse className="plane-ring" cx={CX} cy={CY} rx={RX} ry={RY} pathLength={1} />
        {SPOKES.map((s) => (
          <line
            key={s.id}
            className={`plane-spoke${active === s.id ? " on" : ""}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
          />
        ))}
        <circle className="sun-disc" cx={CX} cy={CY} r={SUN_R} />
      </svg>

      <div className="sun">
        <svg className="sun-mark" viewBox="0 0 140 140" aria-hidden="true">
          {/* The Stellar Marshal shield: gold shackle over three bars. */}
          <g transform="translate(70 66) scale(.42)">
            <path className="mark-shield" d="M0 -52 L46 -36 V2 C46 27 26 45 0 53 C-26 45 -46 27 -46 2 V-36 Z" />
            <path className="mark-shackle" d="M-15 0 V-13 A15 15 0 0 1 15 -13 V0" />
            <path className="mark-bar" d="M-26 6 H26 M-26 20 H26 M-26 34 H26" />
          </g>
        </svg>
        <p className="sun-label">GRC control library</p>
      </div>

      <ul className="worlds">
        {WORLDS.map((w) => {
          const on = active === w.id;
          return (
            <li
              key={w.id}
              className={`world${on ? " on" : ""}`}
              data-domain={w.id}
              style={{ "--x": w.x, "--y": w.y, "--near": w.near, "--z": w.z } as React.CSSProperties}
            >
              <button
                type="button"
                aria-pressed={pinned === w.id}
                onPointerEnter={() => setHovered(w.id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(w.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((p) => (p === w.id ? null : w.id))}
              >
                <span className="world-body" aria-hidden="true" />
                <span className="world-name">{w.name}</span>
              </button>

              {/* Always in the document, so the standards are readable to a
                  screen reader whether or not the domain is the one lit. */}
              <ul className="moons">
                {w.moons.map((m, j) => (
                  <li
                    key={m}
                    className="moon"
                    style={{ "--m": r2(j / w.moons.length) } as React.CSSProperties}
                  >
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
