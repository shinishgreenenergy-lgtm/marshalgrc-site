import { HERO } from "../content";

/**
 * A running list of the obligations the platform answers to. It is driven by
 * the page's own scroll position rather than a timer, so nothing moves on its
 * own and WCAG 2.2.2 needs no pause control. Under reduced motion it simply
 * sits still.
 */
export function Marquee() {
  const names = HERO.frameworks.map((f) => f.name);
  const track = [...names, ...names];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((n, i) => (
          // The second pass exists only to make the loop seamless.
          <span key={`${n}-${i}`} aria-hidden={i >= names.length || undefined}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
