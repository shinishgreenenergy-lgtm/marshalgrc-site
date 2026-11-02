// Renders the social card to a real PNG. next/og cannot generate at build time
// under `output: "export"`, and a committed asset is one less moving part.
// Re-run after any brand change: node scripts/og-image.mjs
import { chromium } from "@playwright/test";

// setContent does not pull in the site's fonts on its own, so the card has to
// request Poppins itself and wait for it — otherwise it renders in Helvetica
// and the one image everyone sees is off-brand.
const html = `<html><head>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=block" rel="stylesheet">
</head><body style="margin:0">
<div style="width:1200px;height:630px;box-sizing:border-box;background:#0F3054;color:#EAF0F8;
  padding:72px;display:flex;flex-direction:column;justify-content:space-between;
  font-family:Poppins,Geist,system-ui,sans-serif">
  <div style="display:flex;align-items:center;gap:20px">
    <div style="width:56px;height:6px;background:#9C7945"></div>
    <div style="font-size:30px;font-weight:600;letter-spacing:-.5px">MarshalGRC</div>
  </div>
  <div style="font-size:74px;font-weight:600;line-height:1.04;letter-spacing:-3px;max-width:1000px">
    One control set.<br>Every framework<br>you answer to.
  </div>
  <div style="font-size:26px;color:#A8BDD6">Governance, risk and compliance — platform and services</div>
</div></body></html>`;

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
await p.setContent(html, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
await p.screenshot({ path: "app/opengraph-image.png" });
await b.close();
console.log("wrote app/opengraph-image.png");
