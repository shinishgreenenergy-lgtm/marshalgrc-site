import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** Each route with the h1 that proves the right page was served. Without the
 *  per-route heading these assertions pass against any page the host returns. */
const PAGES = [
  { route: "/", h1: "One control set. Every framework you answer to." },
  { route: "/platform/", h1: "The MarshalGRC platform" },
  { route: "/services/", h1: "GRC services from an in-house expert team" },
  { route: "/about/", h1: "Built by people who have run audit and compliance programs" },
  { route: "/contact/", h1: "Contact us" },
  { route: "/privacy/", h1: "Privacy" },
  { route: "/terms/", h1: "Terms" },
];
const ROUTES = PAGES.map((p) => p.route);

test.describe("every page renders and is reachable", () => {
  for (const { route, h1 } of PAGES) {
    test(`${route} serves its own page, titled and described`, async ({ page }) => {
      await page.goto(route);
      // Catches both a blank render and a host that serves the wrong file.
      await expect(page.getByRole("heading", { level: 1, name: h1 })).toBeVisible();
      await expect(page).toHaveTitle(/MarshalGRC/);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThan(50);
    });
  }
});

test("no internal link is dead", async ({ page, baseURL }) => {
  const seen = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).getAttribute("href") || ""),
    );
    for (const h of hrefs) {
      if (!h.startsWith("/") || h.startsWith("//")) continue;
      const path = h.split("#")[0] || "/";
      expect(path, `${h} on ${route} must use the trailing-slash form`).toMatch(/\/$/);
      seen.add(path);
    }
  }
  for (const path of seen) {
    const res = await page.request.get(new URL(path, baseURL).toString());
    expect(res.status(), `${path} should resolve`).toBeLessThan(400);
  }
});

test("every satellite comes from the services page", async ({ page }) => {
  // The figure must not be able to claim a standard the services page does
  // not list, so the two are read and compared rather than both trusted.
  await page.goto("/services/");
  const onServices = await page.locator(".svc").evaluateAll((els) =>
    Object.fromEntries(els.map((e) => [e.id, e.querySelector(".std")!.textContent!.trim()])),
  );
  await page.goto("/");
  const inOrrery = await page.locator(".world").evaluateAll((els) =>
    Object.fromEntries(
      els.map((e) => [
        e.getAttribute("data-domain"),
        [...e.querySelectorAll(".moon")].map((m) => m.textContent!.trim()).join(", "),
      ]),
    ),
  );
  expect(Object.keys(inOrrery)).toHaveLength(8);
  expect(inOrrery).toEqual(onServices);
  expect(inOrrery["cybersecurity"]).toBe("ISO/IEC 27001, SOC 2, NIST CSF, SANS");
});

test("the removed claim and caption are gone from the home page", async ({ page }) => {
  await page.goto("/");
  const body = (await page.locator("body").textContent()) ?? "";
  // The exact strings, not "One control library" alone: the qualities list
  // still says "One control library, mapped to every obligation", which is a
  // different section and was never asked for.
  expect(body).not.toContain("One control library, every obligation");
  expect(body).not.toContain("Each requirement links back to one shared control");
  await expect(page.locator(".index-claim, .index-note, .dial, .index-list")).toHaveCount(0);
  await expect(page.locator(".sun-label")).toHaveText("Marshal Control Library");
});

test("every domain rides its own eccentric orbit, library at a focus", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "below 860px the plane folds into a register");
  await page.goto("/");
  const stage = (await page.locator(".orrery").boundingBox())!;
  const cx = stage.x + stage.width / 2;
  const cy = stage.y + stage.height / 2;
  const worlds = page.locator(".world");
  await expect(worlds).toHaveCount(8);
  // Eight orbits with semi-major axes from 160 to 452 across a 1000x560 box,
  // every one squashed by 0.487 -- a circular plane seen from just under 30
  // degrees above. The library sits at a FOCUS, not at the centre, so each
  // orbit's own centre is displaced by a*e away from its perihelion, and
  // every perihelion points the same way (270deg) so the rings nest instead
  // of cutting through one another. That displacement is the Mercury-like
  // hang to one side; without it the figure is a dartboard, so both halves
  // of this are asserted.
  const err: number[] = [];
  const offs: number[] = [];
  for (let i = 0; i < 8; i++) {
    const a = 160 + (292 * i) / 7;
    const e = 0.26 - (0.2 * i) / 7;
    const peri = (270 * Math.PI) / 180;
    const rx = stage.width * (a / 1000);
    const ry = stage.height * ((a * Math.sqrt(1 - e * e) * 0.487) / 560);
    const ox = stage.width * ((-a * e * Math.cos(peri)) / 1000);
    const oy = stage.height * ((-a * e * Math.sin(peri) * 0.487) / 560);
    const b = (await worlds.nth(i).boundingBox())!;
    const dx = (b.x + b.width / 2 - (cx + ox)) / rx;
    const dy = (b.y + b.height / 2 - (cy + oy)) / ry;
    err.push(Math.abs(Math.hypot(dx, dy) - 1));
    offs.push(Math.hypot(ox, oy));
  }
  expect(Math.max(...err), "every domain must sit on its own orbit").toBeLessThan(0.05);
  expect(Math.max(...offs), "orbits must be off-centre, not concentric").toBeGreaterThan(20);
});

test("no orbit crosses another orbit's path", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "below 860px the plane folds into a register");
  await page.goto("/");
  // Every orbit shares a focus AND a perihelion direction, which is what lets
  // them stay eccentric and still nest. Read the ellipses the component
  // actually rendered, then check ring i lies wholly inside ring i+1: sample
  // its path and require every point strictly inside the next ellipse.
  const rings = await page.evaluate(() =>
    [...document.querySelectorAll(".world")].map((w) => {
      const s = getComputedStyle(w);
      const n = (v: string) => parseFloat(s.getPropertyValue(v));
      return { rx: n("--rx"), ry: n("--ry"), ox: n("--ox"), oy: n("--oy") };
    }),
  );
  expect(rings).toHaveLength(8);
  // --rx/--ox are percentages of the figure's width and --ry/--oy of its
  // height, so compare in those units -- the containment test is affine and
  // does not care, as long as x and y are each self-consistent.
  let worst = 0;
  for (let i = 0; i < rings.length - 1; i++) {
    const a = rings[i];
    const b = rings[i + 1];
    for (let d = 0; d < 720; d++) {
      const t = (d * Math.PI) / 360;
      const x = a.ox + a.rx * Math.cos(t);
      const y = a.oy + a.ry * Math.sin(t);
      worst = Math.max(worst, ((x - b.ox) / b.rx) ** 2 + ((y - b.oy) / b.ry) ** 2);
    }
  }
  expect(worst, "each orbit must lie wholly inside the next one out").toBeLessThan(1);
});

test("the figure never paints over the nav bar", async ({ page }) => {
  await page.goto("/");
  // The figure stacks internally up to 170 to get its depth right. Those
  // numbers must stay inside it: .site-head is z-index 50, and a planet or a
  // standard pill scrolling over the navigation is the failure this catches.
  await page.evaluate(() => window.scrollTo(0, 260));
  await page.waitForTimeout(400);
  const head = page.locator(".site-head");
  await expect(head).toBeVisible();
  const covered = await page.evaluate(() => {
    const h = document.querySelector(".site-head")!.getBoundingClientRect();
    const hits: string[] = [];
    for (let x = 8; x < window.innerWidth; x += 24) {
      for (let y = 4; y < h.bottom; y += 8) {
        const el = document.elementFromPoint(x, y);
        if (el && el.closest(".orrery")) hits.push(`${x},${y}:${el.className}`);
      }
    }
    return hits.slice(0, 5);
  });
  expect(covered, "nothing from the orrery may sit on top of the header").toEqual([]);
});

test("each orbit crosses in front of the library and vanishes behind it", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "below 860px the plane folds into a register");
  await page.goto("/");
  // The whole ring is drawn under the sun; its near half is drawn AGAIN over
  // the sun, clipped to the sun's own disc. That occlusion is the only depth
  // cue the figure has -- lose it and eight ellipses read as flat rings.
  await expect(page.locator(".plane-front path.orbit.over")).toHaveCount(8);
  const layer = await page.evaluate(() => {
    const f = getComputedStyle(document.querySelector(".plane-front")!);
    const s = getComputedStyle(document.querySelector(".sun")!);
    return {
      front: Number(f.zIndex),
      sun: Number(s.zIndex),
      pointer: f.pointerEvents,
      clip: document.querySelector(".plane-front g")!.getAttribute("clip-path"),
    };
  });
  expect(layer.front).toBeGreaterThan(layer.sun);
  // It covers the whole figure, so it must never swallow a hover meant for a
  // planet underneath it.
  expect(layer.pointer).toBe("none");
  expect(layer.clip).toBe("url(#sun-disc)");
});

test("holding a domain lights its satellites where they already sit", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "below 860px the plane folds into a register");
  await page.goto("/");
  // The figure is scroll-driven, so moving the pointer to a planet scrolls the
  // page and travels the planet out from under it. Freeze the system first.
  await page.addStyleTag({ content: ".orrery,.orrery *{animation:none !important}" });
  const bead = () =>
    page.evaluate(() => {
      const css = getComputedStyle(
        document.querySelector('.world[data-domain="cybersecurity"] .moon')!,
        "::before",
      );
      return { size: parseFloat(css.width), glow: css.boxShadow };
    });
  // The beads must not travel. A domain answering by throwing its standards
  // away from itself was the thing this figure was asked to stop doing, and
  // it is the label, not the moon, that is allowed to move out to the ring.
  const seats = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('.world[data-domain="cybersecurity"] .moon')].map((m) => {
        const css = getComputedStyle(m);
        return `${css.left}/${css.top}`;
      }),
    );
  const rest = await bead();
  const restSeats = await seats();
  await page.locator('.world[data-domain="cybersecurity"] button').hover();
  // The bead has a 0.3s transition on its size, so reading it once right after
  // the pointer lands measures the animation, not the held state.
  await expect
    .poll(async () => (await bead()).size, {
      message: "satellites must grow when their domain is held",
    })
    .toBeGreaterThan(rest.size);
  expect((await bead()).glow, "and must light up, not just move").not.toBe(rest.glow);
  expect(await seats(), "satellites must light up WITHOUT leaving their world").toEqual(restSeats);
});

test("the system turns clockwise, and only while the page moves", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "the plane only turns above 860px");
  await page.goto("/");
  const spin = () =>
    page.evaluate(() =>
      parseFloat(getComputedStyle(document.querySelector(".orrery")!).getPropertyValue("--spin")),
    );
  const angle = () =>
    page.evaluate(() => {
      const o = document.querySelector(".orrery")!.getBoundingClientRect();
      const w = document.querySelector(".world")!.getBoundingClientRect();
      // Screen y points down, so a rising atan2 here is a clockwise sweep.
      return Math.atan2(
        w.y + w.height / 2 - (o.y + o.height / 2),
        w.x + w.width / 2 - (o.x + o.width / 2),
      );
    });

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const settle = () =>
    page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

  const seen: number[] = [];
  for (const f of [0.1, 0.2, 0.3, 0.4]) {
    await page.evaluate((y) => window.scrollTo(0, y), height * f);
    await settle();
    seen.push(await spin());
  }
  // Scroll is the clock: the angle has to advance as the section passes.
  expect(Math.max(...seen) - Math.min(...seen), "the orrery must turn on scroll").toBeGreaterThan(5);
  expect(seen.every((v, i) => i === 0 || v >= seen[i - 1]), "it must only ever turn one way").toBe(true);

  // ...and nothing but scroll. Two reads a second apart, standing still.
  const before = await angle();
  await page.waitForTimeout(1000);
  expect(await angle(), "nothing may move on a timer").toBeCloseTo(before, 4);
});

test("the orrery never pushes the page sideways as it turns", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "the plane only turns above 860px");
  // The satellites swing out past their own domain as they revolve, and the
  // lit one is the widest thing on the page. One scroll position cannot see
  // that, so step down the page at each width.
  // 901px is left out on purpose: the page there already overflows by 10px
  // before anything scrolls, on live as well as locally, and that is a
  // separate pre-existing bug -- not something this figure should assert.
  for (const width of [960, 1024, 1120, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let i = 0; i <= 12; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), (height * i) / 12);
      const over = await page.evaluate(async () => {
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const d = document.documentElement;
        return d.scrollWidth - d.clientWidth;
      });
      expect(over, `${width}px wide, ${i}/12 down the page`).toBeLessThanOrEqual(0);
    }
  }
});

test("the hero headline is readable with motion switched off", async ({ browser }) => {
  // The juror test: kill the motion and the static frame must still hold.
  // toBeVisible() passes on a stuck reveal, so assert the settled position.
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const lines = page.locator(".hero h1 .ln > span");
  await expect(lines).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    const box = await lines.nth(i).boundingBox();
    const mask = await lines.nth(i).locator("xpath=..").boundingBox();
    expect(Math.abs((box?.y ?? 0) - (mask?.y ?? 0)), "line must sit inside its mask").toBeLessThan(2);
  }
  await ctx.close();
});

test("the marquee never moves on its own", async ({ page }) => {
  await page.goto("/");
  const track = page.locator(".marquee-track");
  const before = await track.evaluate((e) => getComputedStyle(e).transform);
  await page.waitForTimeout(1200);
  const after = await track.evaluate((e) => getComputedStyle(e).transform);
  // Driven by scroll position, so it is not "moving content" under WCAG 2.2.2
  // and needs no pause control.
  expect(after).toBe(before);
});

test("the services index jumps to the matching domain", async ({ page }) => {
  await page.goto("/services/");
  await page.getByRole("link", { name: "AI governance" }).click();
  await expect(page.locator("#ai-governance")).toBeInViewport();
});

test("a CTA opens the enquiry tab, not the demo tab", async ({ page }) => {
  await page.goto("/services/");
  await page.locator(".cta-band").getByRole("link", { name: "Send an enquiry" }).click();
  await expect(page).toHaveURL(/#enquiry/);
  await expect(page.getByRole("tab", { name: "Send an enquiry" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByLabel("Your message")).toBeVisible();
});

test("switching tabs from the footer works while already on the contact page", async ({ page }) => {
  // The riskiest link on the site: a hash-only change on the current route.
  await page.goto("/contact/#demo");
  await expect(page.getByRole("tab", { name: "Request a demo" })).toHaveAttribute("aria-selected", "true");
  await page.locator(".site-foot").getByRole("link", { name: "Send an enquiry" }).click();
  await expect(page.getByRole("tab", { name: "Send an enquiry" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByLabel("Your message")).toBeVisible();
});

test("an empty form reports its errors instead of submitting", async ({ page }) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Request a demo", exact: true }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await expect(page.getByText("Check the highlighted fields and try again.")).toBeVisible();
});

test("selecting a standard dims the domains it does not reach", async ({ page }) => {
  await page.goto("/platform/");
  const matrix = page.locator(".matrix");
  await matrix.getByRole("button", { name: "GDPR", exact: true }).click();
  await expect(matrix).toHaveAttribute("data-dim", "true");
  await expect(matrix.locator('.matrix-row[data-match="false"]')).toHaveCount(3);
});

test("the mobile menu opens and closes on navigation", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile layout only");
  await page.goto("/");
  const nav = page.locator("#nav");
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "About us" }).click();
  await expect(page).toHaveURL(/\/about\//);
  await expect(nav).toBeHidden();
});

test("every internal path carries the base path", async ({ page, baseURL }) => {
  // GitHub Pages serves a project site from /<repo>. next/link prefixes that
  // automatically but a plain <a> or <img> does not, so a missed one 404s
  // only after deploy. The export is checked for raw paths that skipped it.
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base) test.skip(true, "only meaningful for a prefixed build");
  for (const route of ROUTES) {
    await page.goto(route);
    const bad = await page.evaluate((b) => {
      const urls = [
        ...[...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")!),
        ...[...document.querySelectorAll("img[src^='/']")].map((i) => i.getAttribute("src")!),
      ];
      return urls.filter((u) => !u.startsWith(b + "/") && u !== b);
    }, base);
    expect(bad, `${route} has unprefixed paths`).toEqual([]);
  }
});

test("no page scrolls sideways on a phone", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile layout only");
  for (const route of ROUTES) {
    await page.goto(route);
    const overflow = await page.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth - d.clientWidth;
    });
    expect(overflow, `${route} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
  }
});

test("the client portal link points at the live portal", async ({ page }) => {
  await page.goto("/");
  // Read the attribute off the DOM: on a phone the nav is collapsed, so a
  // role-based locator would not see it.
  const hrefs = await page.locator('a:text-is("Client login")').evaluateAll((as) =>
    as.map((a) => a.getAttribute("href")),
  );
  expect(hrefs.length).toBeGreaterThanOrEqual(2); // header and footer
  expect(new Set(hrefs)).toEqual(new Set(["https://client.kryilinfotech.com/login"]));
});

test("a completed form is addressed to the forms inbox", async ({ page }) => {
  // The forms go to a different address from the one shown publicly, and the
  // privacy notice has to name the same one.
  await page.goto("/contact/");
  const demo = page.locator("#panel-demo");
  await demo.getByLabel("Full name").fill("Test Person");
  await demo.getByLabel("Work email").fill("test@example.com");
  await demo.getByLabel("Organisation").fill("Example Ltd");
  await demo.getByRole("button", { name: "Request a demo" }).click();
  await expect(page.locator("#panel-demo .form-status")).toContainText("victor.m@marshalgrc.com");

  await page.goto("/privacy/");
  await expect(page.getByRole("link", { name: "victor.m@marshalgrc.com" })).toBeVisible();
});

test("the header never wraps to a second line", async ({ page }) => {
  // Wrapping, unlike overflow, leaves scrollWidth untouched, so the sweep for
  // horizontal scroll cannot see it. Measure the row height instead.
  for (const w of [1121, 1200, 1280, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto("/");
    const h = await page.locator(".head-row").evaluate((e) => e.getBoundingClientRect().height);
    expect(h, `header grew to ${h}px at ${w}px wide`).toBeLessThan(90);
  }
});

test.describe("accessibility", () => {
  for (const route of ROUTES) {
    test(`${route} has no axe violations`, async ({ page }) => {
      await page.goto(route);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }
});
