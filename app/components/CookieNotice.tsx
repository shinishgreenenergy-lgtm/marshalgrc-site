"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NOTICE, path } from "../content";

/**
 * The cookie notice.
 *
 * It starts hidden and is only shown once the browser has been asked whether a
 * choice is already stored, so the exported HTML ships without it: no flash for
 * someone who agreed last week, and nothing to shift the page on first paint.
 *
 * Agree writes one key. Decline writes nothing — which is the honest reading of
 * the word, and means the notice returns next visit. Saying so in the copy is
 * cheaper than a second banner explaining a preference centre.
 */
const KEY = "marshalgrc.notice";

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      // Private mode, or storage refused at the browser level. A notice about
      // storage is not worth an error, so it simply stays shut.
    }
  }, []);

  if (!open) return null;

  return (
    <aside className="notice" aria-label={NOTICE.heading}>
      <div>
        {/* Not a heading element: the notice is appended at the end of the
            document, so an <h2> here lands after the footer's <h3>s and breaks
            heading order. The aria-label on the <aside> already names it. */}
        <p className="notice-head">{NOTICE.heading}</p>
        <p>
          {NOTICE.body} <Link href={path("/privacy/")}>{NOTICE.more}</Link>
        </p>
      </div>
      <div className="notice-acts">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "agreed");
            } catch {}
            setOpen(false);
          }}
        >
          {NOTICE.agree}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
          {NOTICE.decline}
        </button>
      </div>
    </aside>
  );
}
