import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { CookieNotice } from "./components/CookieNotice";
import { NOTICE, SITE } from "./content";
import "./globals.css";

// Both faces are the ones the Stellar Marshal product already ships, so the
// site and the app read as one brand. Poppins is also the closest match to the
// geometric wordmark in the logo.
const display = Poppins({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display", display: "swap" });
const body = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} — Governance, risk and compliance platform and services`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
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

/** Only facts that are actually known go in the structured data. There is one
 *  office and one number now, so both are here; nothing else is claimed. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.description,
  url: SITE.origin,
  email: SITE.email,
  telephone: "+919989661572",
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

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.origin,
  publisher: { "@type": "Organization", name: SITE.parent },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [organization, website] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {/* "#top" needs no element of its own: with nothing matching, the
            browser scrolls to the top of the document, which is the whole
            behaviour wanted. No script, and it still works without one. */}
        <a className="to-top" href="#top">
          <span aria-hidden="true">↑</span> {NOTICE.toTop}
        </a>
        <CookieNotice />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
