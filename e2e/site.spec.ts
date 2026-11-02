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

test("the obligation index lists every framework with its domain", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator(".index-list button");
  await expect(rows).toHaveCount(8);
  await expect(rows.first()).toContainText("ISO 27001");
  await expect(rows.first()).toContainText("Cybersecurity");
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
