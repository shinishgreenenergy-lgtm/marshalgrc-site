import type { NextConfig } from "next";

// Set PAGES_BASE_PATH when serving from a subdirectory (e.g. GitHub Pages
// project sites). Left empty, the site is built for a domain root.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // No server features are used, so the whole site exports to static HTML.
  output: "export",
  // Emit <route>/index.html so directory resolution works on any static host.
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
