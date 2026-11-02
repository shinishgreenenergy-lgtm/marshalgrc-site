import type { MetadataRoute } from "next";
import { SITE } from "./content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // No confirmed domain yet, so crawling is disallowed outright rather than
  // relying on a noindex tag alone.
  if (!SITE.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.origin}/sitemap.xml`,
  };
}
