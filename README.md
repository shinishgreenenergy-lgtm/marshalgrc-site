# MarshalGRC website

Marketing site for **MarshalGRC**, the governance, risk and compliance platform
from **Stellar Global**.

Next 16 + React 19 + TypeScript, `output: "export"` — the whole site builds to
static HTML in `out/` and needs no server at runtime.

## Running it

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export into out/
npm run check     # build, then the Playwright suite against the export
```

`npm test` serves `out/` on port 3400 and runs the suite (44 tests, desktop and
Pixel 7), so the tests check the files that actually ship rather than a dev
server. `node scripts/shots.mjs` writes full-page JPGs of every route at both
widths and in both themes to `~/Desktop/marshalgrc-screenshots` — note that a
full-page shot renders scroll-timeline animations at their start state, so the
evidence-flow rail looks absent in them.

## How it is put together

- **`app/content.ts`** holds every word on the site. Pages render from it, so
  copy changes never touch markup and no fact can drift between two pages.
- **`app/globals.css`** holds the whole design system in CSS custom properties.
  A palette change is a change to the two token blocks at the top; nothing
  else references a colour directly.
- **`app/components/`** holds the seven components that carry the design:

  | Component | What it does |
  |---|---|
  | `ControlLattice` | The hero. Geometry is computed at build time, so the figure is in the HTML and ships no JavaScript. |
  | `CoverageMatrix` | Choosing a standard dims every domain it does not reach. Pointer and keyboard are separate states so hover-then-click does not cancel itself. |
  | `EvidenceFlow` | The control lifecycle. Its rail draws as the section scrolls into view. |
  | `PostureDash` | Illustrative posture figures, with a real likelihood × impact risk grid. |
  | `ServiceLedger` | The eight service domains as a ruled ledger. |
  | `ContactTabs` | Demo and enquiry forms. Deep-linked by `/contact/#demo` and `/contact/#enquiry`. |
  | `SiteHeader` / `SiteFooter` | Shell. The header closes its mobile menu on navigation. |

Motion is CSS only, gated behind `@supports (animation-timeline: view())` and
switched off entirely under `prefers-reduced-motion`.

## Things to know before changing it

- `trailingSlash` is on. **Every internal link needs the trailing form**
  (`/contact/#demo`, not `/contact#demo`) or the host issues a redirect and
  the hash handling turns flaky.
- A CSS `transform` in an animation **overrides an SVG `transform` attribute**.
  The lattice reveal animates opacity only for exactly this reason; there is a
  test that fails if the pills collapse onto the origin again.
- `.nav a` is more specific than `.btn-primary`, so the header CTA restates its
  colour at `.nav` scope. Without it the button fails contrast at 1.3:1.
- Do not serve the export with `serve -s`. The `--single` flag rewrites every
  path to `index.html`, which makes route tests pass against the home page.
- In dark mode the bands sit **above** `--bg`, not below it. Dropping them
  darker makes the hero, the CTA band and the lead panel vanish into the page.

## Before launch

1. **Set `NEXT_PUBLIC_SITE_ORIGIN`.** Until it is set, `SITE.origin` falls back
   to `https://example.invalid`, which forces `noindex` and a disallow-all
   `robots.txt`. Setting it is what turns indexing on.
2. **Fill the two flagged placeholders** on `/contact/` — the WhatsApp number
   and the US office address. They render highlighted on purpose.
3. **Legal review of `/privacy/` and `/terms/`.** Both name what is genuinely
   unknown (hosting provider, log retention, registered entity, governing law)
   rather than inventing it. The unknowns are marked in the same highlight.
4. **Confirm the logo.** The shield in `app/components/Logo.tsx` is the one from
   the source design. The `STELLAR_MARSHAL*` artwork in `~/Downloads` has not
   been used and needs a decision.
5. **Resolve "seven domains".** `OFFER` on the home page says services span
   "seven domains", but `/services/` lists eight. The inconsistency is in the
   source design and has been carried over verbatim rather than guessed at.
6. **Decide the form backend.** Submissions currently open the visitor's own
   mail client and nothing is stored. The privacy notice says exactly that, so
   it must be updated if that changes.
