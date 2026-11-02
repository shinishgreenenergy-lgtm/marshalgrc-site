import type { MetadataRoute } from "next";
import { SITE } from "./content";

export const dynamic = "force-static";

const routes = ["", "/platform", "/services", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE.origin}${r}/`.replace(/([^:]\/)\/+/g, "$1"),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
