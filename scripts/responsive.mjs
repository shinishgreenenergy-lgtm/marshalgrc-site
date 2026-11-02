// Sweeps every route across the breakpoints the CSS actually declares, plus
// the extremes, and reports overflow, clipping and undersized touch targets.
import { chromium } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://127.0.0.1:3400";
const ROUTES = ["/", "/platform/", "/services/", "/about/", "/contact/", "/privacy/"];
const WIDTHS = [320, 360, 390, 414, 620, 768, 860, 900, 980, 1024, 1280, 1440, 1920];

const b = await chromium.launch();
const problems = [];
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(120);
    const res = await page.evaluate(() => {
      const d = document.documentElement;
      const overflow = d.scrollWidth - d.clientWidth;
      // Which elements actually stick out past the viewport
      const wide = [...document.querySelectorAll("body *")]
        .filter((e) => {
          const b = e.getBoundingClientRect();
          return b.width > 0 && (b.right > d.clientWidth + 1 || b.left < -1);
        })
        .slice(0, 4)
        .map((e) => `${e.tagName.toLowerCase()}.${(e.className || "").toString().split(" ")[0]}`);
      // Tap targets below the 44px guideline
      const small = [...document.querySelectorAll("a,button,input,select,textarea")]
        .filter((e) => {
          const b = e.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && b.height < 44 &&
                 !e.closest(".site-foot") && !e.closest(".nav");
        })
        .slice(0, 3)
        .map((e) => `${e.tagName.toLowerCase()}.${(e.className || "").toString().split(" ")[0]}=${Math.round(e.getBoundingClientRect().height)}px`);
      return { overflow, wide, small };
    });
    if (res.overflow > 0) problems.push(`OVERFLOW ${w}px ${r} by ${res.overflow}px via ${res.wide.join(", ") || "?"}`);
    if (res.small.length) problems.push(`TAPTARGET ${w}px ${r} ${res.small.join(", ")}`);
  }
  await ctx.close();
}
await b.close();
console.log(problems.length ? problems.join("\n") : "clean across all widths");
