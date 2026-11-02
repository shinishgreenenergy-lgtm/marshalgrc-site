import Link from "next/link";
import { SITE, path } from "../content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/" aria-label={`${SITE.name} home`}>
              <Logo />
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
              <li><a href={path("/contact/#demo")}>Request a demo</a></li>
              <li><a href={path("/contact/#enquiry")}>Send an enquiry</a></li>
              <li><a href={SITE.portal} rel="noopener">Client login</a></li>
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
