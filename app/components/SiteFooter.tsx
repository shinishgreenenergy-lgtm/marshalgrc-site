import Link from "next/link";
import { SITE } from "../content";
import { Shield, Wordmark } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/" aria-label={`${SITE.name} home`}>
              <Shield color="var(--glow)" />
              <Wordmark />
            </Link>
            <p style={{ maxWidth: "36ch" }}>{SITE.tagline}</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/platform">GRC platform</Link></li>
              <li><Link href="/services">GRC services</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href="/contact/#demo">Request a demo</a></li>
              <li><a href="/contact/#enquiry">Send an enquiry</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>{SITE.copyright}</span>
          <span>
            <Link href="/privacy">Privacy</Link>{" · "}
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
