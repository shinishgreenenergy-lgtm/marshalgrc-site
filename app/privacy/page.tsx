import type { Metadata } from "next";
import { SITE } from "../content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this website collects, what it does not, and who to contact. Items still to be confirmed before launch are marked.",
};

/**
 * Written from what is actually true of this build. Anything not yet known —
 * the hosting provider, its log retention, the governing law — is flagged
 * rather than invented. A GRC vendor should not ship a guessed privacy notice.
 */
export default function PrivacyPage() {
  return (
    <>
      <div className="band page-hero">
        <div className="wrap">
          <h1>Privacy</h1>
          <p className="lede">
            What this website collects, what it does not, and who to contact about it.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="wrap prose">
          <p>
            This notice covers the {SITE.name} website only. It does not cover the
            {" "}{SITE.name} platform itself, which is governed by the agreement in place
            with each customer.
          </p>

          <h2>What this site collects</h2>
          <p>
            Nothing is collected by the site. These pages are static files. There is no
            account system, no analytics, no advertising or tracking scripts, and no
            cookies are set. Fonts are served from this site rather than a third-party
            font service, so viewing a page makes no request to another company.
          </p>

          <h2>The demo and enquiry forms</h2>
          <p>
            Both forms are handled entirely in your browser. When you submit one, your
            own email application opens with the details filled in, addressed to{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Nothing is transmitted to
            this website and nothing is stored here. You choose whether to send the
            message.
          </p>
          <p>
            Once you send it, the content of that email is held in {SITE.parent}&apos;s mail
            system and used to answer your enquiry.
          </p>

          <h2>Hosting and server logs</h2>
          <p>
            <span className="todo">[Hosting provider to be confirmed]</span> serves these
            pages. Like most web servers it records requests, which typically includes IP
            addresses. The retention period for those logs is{" "}
            <span className="todo">[to be confirmed with the hosting provider]</span>.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have rights over personal data held about
            you, including access, correction and erasure. To exercise them, or to ask any
            question about this notice, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
          <p>
            The data controller for enquiries sent to that address is {SITE.parent},
            Visakhapatnam, India. The registered entity details and the supervisory
            authority that applies are{" "}
            <span className="todo">[to be confirmed before launch]</span>.
          </p>

          <h2>Changes</h2>
          <p>
            Any change to this notice replaces the version on this page. This page has not
            yet been reviewed by a legal adviser; the flagged items above are the ones that
            need confirming first.
          </p>
        </div>
      </div>
    </>
  );
}
