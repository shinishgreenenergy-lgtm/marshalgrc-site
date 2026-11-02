import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { SITE } from "./content";
import "./globals.css";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} — Governance, risk and compliance platform and services`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  // Until a real origin is configured the site must not be indexed.
  robots: SITE.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Governance, risk and compliance platform and services`,
    description: SITE.description,
    url: SITE.origin,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
};

/** Only facts that are actually known go in the structured data: the
 *  unresolved US address and WhatsApp number are deliberately absent. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.description,
  url: SITE.origin,
  email: SITE.email,
  parentOrganization: { "@type": "Organization", name: SITE.parent },
  address: {
    "@type": "PostalAddress",
    streetAddress: "D No: 14-164/1/2, Parvati Nilayam, Chinamushidiwada",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530051",
    addressCountry: "IN",
  },
  areaServed: ["India", "United States", "Canada", "Europe", "Middle East", "East Asia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
