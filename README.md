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
  A palette change is a change to the token block at the top; nothing else
  references a colour directly. One light treatment only — no dark variant,
  because the brand logo carries a white outline and is built for light.
- **`app/components/`** holds the seven components that carry the design:

  | Component | What it does |
  |---|---|
  | `ObligationIndex` | The hero figure, as a register rather than a diagram. Hovering an obligation rules a gold line across and names its domain. |
  | `Marquee` | The obligations ticker. Driven by page scroll, never a timer. |
  | `CoverageMatrix` | Choosing a standard dims every domain it does not reach. Pointer and keyboard are separate states so hover-then-click does not cancel itself. |
  | `EvidenceFlow` | The control lifecycle. Its rail draws as the section scrolls into view. |
  | `PostureDash` | Illustrative posture figures, with a real likelihood × impact risk grid. |
  | `ServiceLedger` | The eight service domains as a ruled ledger. |
  | `ContactTabs` | Demo and enquiry forms. Deep-linked by `/contact/#demo` and `/contact/#enquiry`. |
  | `SiteHeader` / `SiteFooter` | Shell. The header closes its mobile menu on navigation. |

Motion is CSS only, gated behind `@supports (animation-timeline: view())` and
switched off entirely under `prefers-reduced-motion`. Nothing moves on a timer,
so WCAG 2.2.2 needs no pause control. A test asserts the hero headline still
sits in place with motion disabled.

## Brand

Colours and the logo come from the live product at `client.kryilinfotech.com`,
not from an interpretation: deep blue `#0F3054`, mid blue `#3B8DCB`, gold
`#9C7945` → `#FAF3AA` are that app's own gradient stops, and `public/logo.svg`
is its asset. Typefaces (Poppins, Geist) are the ones the app already ships.

Gold is reserved for assurance moments — a seal, a stage rule, a passed tick.
It is never used for body text: `#9C7945` only reaches 3.8:1 on the paper, so
`--gold-ink` exists for the rare case gold has to carry words.

## Things to know before changing it

- `trailingSlash` is on. **Every internal link needs the trailing form**
  (`/contact/#demo`, not `/contact#demo`) or the host issues a redirect and
  the hash handling turns flaky.
- A CSS `transform` in an animation **overrides an SVG `transform` attribute**.
  The lattice reveal animates opacity only for exactly this reason; there is a
  test that fails if the pills collapse onto the origin again.
- `.nav a` is more specific than `.btn-primary`, so the header CTA restates its
  colour at `.nav` scope. Without it the button fails contrast. This one has
  now been reintroduced twice by rewrites — check it after any CSS rewrite.
- The inverted deep-blue section is `.invert`, **not** `.field`. The contact
  form already uses `.field` for its field wrappers, and the collision gave
  every input a deep-blue background.
- Never dim text with `opacity`. It lowers contrast invisibly — `.68` on the
  index labels took them to 4.05:1. Dim with a colour token instead.
- Do not serve the export with `serve -s`. The `--single` flag rewrites every
  path to `index.html`, which makes route tests pass against the home page.
- The footer sits the logo on a white plate. The wordmark's "STELLAR" is solid
  black, so the lockup dies on the deep blue; the plate is the brand-correct
  fix, not recolouring someone else's logo.

## Before launch

1. **Set `NEXT_PUBLIC_SITE_ORIGIN`.** Until it is set, `SITE.origin` falls back
   to `https://example.invalid`, which forces `noindex` and a disallow-all
   `robots.txt`. Setting it is what turns indexing on.
2. **Fill the two flagged placeholders** on `/contact/` — the WhatsApp number
   and the US office address. They render highlighted on purpose.
3. **Legal review of `/privacy/` and `/terms/`.** Both name what is genuinely
   unknown (hosting provider, log retention, registered entity, governing law)
   rather than inventing it. The unknowns are marked in the same highlight.
4. **Settle the name.** The product app brands itself **Stellar Marshal**; this
   site says **MarshalGRC**, and the footer says it is a Stellar Global product.
   The header logo now reads "Stellar Marshal" while the copy says MarshalGRC.
   One of the two has to give.
5. **Resolve "seven domains".** `OFFER` on the home page says services span
   "seven domains", but `/services/` lists eight. The inconsistency is in the
   source design and has been carried over verbatim rather than guessed at.
6. **Decide the form backend.** Submissions currently open the visitor's own
   mail client and nothing is stored. The privacy notice says exactly that, so
   it must be updated if that changes.
