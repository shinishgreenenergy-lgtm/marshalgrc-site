"use client";

import { useState } from "react";
import { COVERAGE } from "../content";

/**
 * The platform's central claim is that one tested control answers several
 * obligations. Rather than assert that in prose, this makes it operable:
 * choosing a standard dims every domain it does not reach, so a visitor can
 * see the overlap for themselves.
 *
 * Pointer and keyboard are deliberately kept as separate states. Hovering
 * previews a standard; clicking pins it so the comparison survives the
 * pointer moving away. Sharing one state makes a hover-then-click sequence
 * cancel itself, which is what a mouse user does every time.
 */
export function CoverageMatrix() {
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = pinned ?? hovered;

  return (
    <div className="matrix" data-dim={active ? "true" : "false"}>
      {COVERAGE.rows.map((row) => {
        const match = !active || row.frameworks.includes(active);
        return (
          <div className="matrix-row" key={row.domain} data-match={String(match)}>
            <div>
              <h3>{row.domain}</h3>
              <p className="sub">{row.sub}</p>
            </div>
            <div className="chips">
              {row.frameworks.map((f) => (
                <button
                  type="button"
                  className="chip"
                  key={f}
                  data-on={String(active === f)}
                  aria-pressed={pinned === f}
                  onClick={() => setPinned(pinned === f ? null : f)}
                  onMouseEnter={() => setHovered(f)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(f)}
                  onBlur={() => setHovered(null)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
