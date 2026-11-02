// Full-page screenshots of every route, light and dark, for design review.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = process.env.SHOT_DIR || `${process.env.HOME}/Desktop/marshalgrc-screenshots`;
const BASE = process.env.BASE_URL || "http://127.0.0.1:3400";
const ROUTES = ["/", "/platform/", "/services/", "/about/", "/contact/", "/privacy/"];
const WIDTHS = { desktop: 1440, mobile: 390 };

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const [size, width] of Object.entries(WIDTHS)) {
  {
    const ctx = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const r of ROUTES) {
      await page.goto(BASE + r, { waitUntil: "networkidle" });
      await page.waitForTimeout(2600); // let the lattice finish its sequence
      const name = `${r === "/" ? "home" : r.replaceAll("/", "")}-${size}`;
      // Note: a full-page shot renders scroll-timeline animations at their
      // start state, so the evidence-flow rail looks absent here.
      await page.screenshot({ path: `${OUT}/${name}.jpg`, fullPage: true, quality: 72, type: "jpeg" });
      console.log(name);
    }
    await ctx.close();
  }
}
await browser.close();
