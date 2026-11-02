// Pings IndexNow (Bing, Yandex, Naver, Seznam) with every URL in the sitemap.
// Google does not use IndexNow. Inert until a real domain is configured.
//   NEXT_PUBLIC_SITE_ORIGIN=https://marshalgrc.com node scripts/indexnow.mjs
const KEY = "635466e016617bef5a1febe2afce5e58";
const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "");
if (!origin) {
  console.log("No NEXT_PUBLIC_SITE_ORIGIN set — nothing to submit yet.");
  process.exit(0);
}
const routes = ["", "/platform", "/services", "/about", "/contact", "/privacy", "/terms"];
const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    host: new URL(origin).host,
    key: KEY,
    keyLocation: `${origin}/${KEY}.txt`,
    urlList: routes.map((r) => `${origin}${r}/`.replace(/([^:]\/)\/+/g, "$1")),
  }),
});
console.log("IndexNow:", res.status, res.statusText);
