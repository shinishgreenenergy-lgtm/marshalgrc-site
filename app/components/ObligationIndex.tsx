"use client";

import { useState } from "react";
import { HERO } from "../content";

/**
 * Replaces the hero diagram. The claim "one control set, every framework" is
 * easier to believe as a register you can run your eye down than as a glowing
 * node graph — and a register is what an auditor actually reads.
 *
 * Hovering or focusing an obligation rules a gold line across to the claim and
 * names the domain it sits under. Every value comes from content.ts.
 */
export function ObligationIndex() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="index-grid">
      <div>
        <p className="index-claim">
          One control library, <em>every obligation</em>
        </p>
        <p className="index-note">{HERO.caption}</p>
      </div>

      <ul className="index-list">
        {HERO.frameworks.map((f) => (
          <li key={f.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(f.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(f.name)}
              onBlur={() => setActive(null)}
              aria-describedby={`reach-${f.name.replace(/\W+/g, "")}`}
            >
              <span>{f.name}</span>
              <span className="reach" id={`reach-${f.name.replace(/\W+/g, "")}`}>
                {f.reach}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <span hidden>{active}</span>
    </div>
  );
}
