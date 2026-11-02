/* eslint-disable @next/next/no-img-element */
import { path } from "../content";

/**
 * The live product's own mark, taken from the Stellar Marshal client portal:
 * a shield holding a gold padlock shackle over three blue bars. It is an
 * `img` rather than inlined SVG because the file is the brand asset itself —
 * swapping it should not mean editing a component.
 */
export function Logo({ short = false, className }: { short?: boolean; className?: string }) {
  return (
    <img
      src={path(short ? "/logo-short.svg" : "/logo.svg")}
      alt="Stellar Marshal"
      className={className}
      width={short ? 34 : 160}
      height={34}
    />
  );
}

/** A gold seal echoing the shackle in the mark. The site's only ornament:
 *  in this trade a seal means something was checked and passed. */
export function Seal() {
  return (
    <svg className="seal" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="60" r="48" strokeDasharray="2 5" />
      <path d="M44 66v-6a16 16 0 0 1 32 0v6" />
      <path d="M40 70h40M40 80h40M40 90h40" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
