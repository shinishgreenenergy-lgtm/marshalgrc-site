"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE, path } from "../content";
import { Logo } from "./Logo";

const strip = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

export function SiteHeader() {
  const pathname = strip(usePathname() || "/");
  const [open, setOpen] = useState(false);

  // The header persists across routes, so the mobile menu has to be closed
  // explicitly on navigation or it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-head">
      <div className="wrap head-row">
        <Link className="brand" href="/" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={open ? "nav open" : "nav"} id="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a className="portal-link" href={SITE.portal} rel="noopener">Client login</a>
          {/* A plain anchor: this targets a tab on the contact page, and a full
              load guarantees the right tab opens even from /contact itself. */}
          <a className="btn btn-primary" href={path("/contact/#demo")}>Request a demo</a>
        </nav>
      </div>
    </header>
  );
}
