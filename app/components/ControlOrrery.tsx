"use client";

import { useState } from "react";
import { SERVICES } from "../content";

/**
 * The hero figure: an orrery of obligations.
 *
 * The claim is one control set, so the GRC control library is the sun and each
 * governance domain holds its own orbit around it. The standards a domain
 * answers to are its moons, read straight off SERVICES — the figure cannot
 * claim a standard the services page does not already list.
 *
 * Everything travels clockwise. Nothing moves on a timer: the whole system is
 * driven by the section's own passage through the viewport, so it is still
 * whenever the reader is, which is what keeps a domain clickable and keeps
 * this clear of WCAG 2.2.2.
 */

/* Drawn in a 1000x560 box, so every orbit is an ellipse rather than a circle:
   a plane seen at an angle. Eight concentric rings only separate at that
   proportion — on a circle the outer ones would crowd the top and bottom. */
const VW = 1000;
const VH = 560;
const CX = VW / 2;
const CY = VH / 2;
/** The sun's disc. Orbits start clear of it, not inside it. */
const SUN_R = 82;
/** Innermost and outermost orbit, in viewBox units across. */
const R0 = 148;
const R1 = 452;
/** Every orbit keeps the plane's own squash, so they read as one system. */
const TILT = 0.487;

const r2 = (n: number) => Number(n.toFixed(3));
const N = SERVICES.length;

const WORLDS = SERVICES.map((s, i) => {
  /** Semi-major axis of this domain's orbit, in viewBox units across. */
  const a = R0 + ((R1 - R0) * i) / (N - 1);
  /* Eccentricity falls away outward, so the innermost domain is the one with
     the Mercury-like path: a ring visibly off to one side, tight against the
     sun at perihelion and long away from it at aphelion. Circles all sharing
     a centre are a dartboard; this is a solar system. */
  const e = 0.24 - (0.2 * i) / (N - 1);
  /** Semi-minor follows from the eccentricity, then takes the plane's tilt. */
  const rx = a;
  const ry = a * Math.sqrt(1 - e * e) * TILT;
  /* The sun sits at a focus, not at the centre, so the orbit's own centre is
     displaced by a*e away from perihelion. Each orbit points its perihelion
     somewhere different, which is what stops eight rings nesting tidily. */
  const peri = (i * 47 * Math.PI) / 180;
  const ox = -a * e * Math.cos(peri);
  const oy = -a * e * Math.sin(peri) * TILT;
  /** The standards line off the services page, split — never retyped here. */
  const moons = s.standards.split(",").map((m) => m.trim()).filter(Boolean);
  const body = r2(17 + moons.length * 2.4);
  return {
    id: s.id,
    name: s.short,
    title: s.title,
    moons,
    rx: r2(rx),
    ry: r2(ry),
    ox: r2(ox),
    oy: r2(oy),
    /** As a share of the figure, because the figure is fluid and the box is not. */
    rxp: r2((rx / VW) * 100),
    ryp: r2((ry / VH) * 100),
    oxp: r2((ox / VW) * 100),
    oyp: r2((oy / VH) * 100),
    /* Spread evenly round the dial and offset off the horizontal, so the
       static frame — reduced motion, and any browser without view() — has its
       eight labels apart rather than stacked along one axis. */
    base: r2(i * (360 / N) + 22),
    /** A bigger world for a domain answering to more standards. */
    body,
    /** How close to the sun, 1 to 0 — the inner worlds run hot, the outer cold. */
    heat: r2(1 - i / (N - 1)),
    /** Moons ride clear of their own world, which is now a real sphere. */
    mr: r2(body / 2 + 24 + moons.length * 2.2),
  };
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
        <defs>
          {/* The corona does the work of making this read as a sun rather than
              a very large planet: the disc itself has to stay dark enough for
              the mark and the label to sit on it. */}
          <radialGradient id="corona">
            <stop offset="34%" stopColor="rgba(156,121,69,.55)" />
            <stop offset="58%" stopColor="rgba(156,121,69,.22)" />
            <stop offset="100%" stopColor="rgba(156,121,69,0)" />
          </radialGradient>
        </defs>
        {WORLDS.map((w) => (
          <ellipse
            key={w.id}
            className={`orbit${active === w.id ? " on" : ""}`}
            cx={CX}
            cy={CY}
            rx={w.rx}
            ry={w.ry}
          />
        ))}
        <circle className="corona" cx={CX} cy={CY} r={SUN_R * 3.1} fill="url(#corona)" />
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
              style={
                {
                  "--base": `${w.base}deg`,
                  "--rx": `${w.rxp}%`,
                  "--ry": `${w.ryp}%`,
                  "--body": `${w.body}px`,
                  "--mr": `${w.mr}px`,
                } as React.CSSProperties
              }
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
                  screen reader whether or not the domain is the one lit. The
                  moon itself is always drawn; only its name waits to be asked
                  for, because twenty-four names at once is not a diagram. */}
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
