import type { Metadata } from "next";
import { SITE } from "../content";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that apply to this website. Items still to be confirmed before launch are marked.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="rule" aria-hidden="true" />
          <h1>Terms</h1>
          <p className="lede">The terms that apply to the use of this website.</p>
        </div>
      </div>

      <div className="section">
        <div className="wrap prose">
          <h2>Who operates this site</h2>
          <p>
            This website is operated by {SITE.parent}, Visakhapatnam, India.{" "}
            {SITE.name} is a {SITE.parent} product.
          </p>

          <h2>What the content is for</h2>
          <p>
            The pages here describe the {SITE.name} platform and the advisory services
            offered alongside it. They are written to help you decide whether to talk to
            us. They are not legal, regulatory or audit advice, and no reader should act
            on them as a substitute for advice on their own circumstances.
          </p>
          <p>
            Standards, laws and frameworks are named to show what our work covers. Naming
            a standard is not a claim of certification or endorsement by the body that
            publishes it.
          </p>

          <h2>Illustrative figures</h2>
          <p>
            Dashboard figures, percentages and risk ratings shown on the platform page are
            samples used to show the layout of a report. They are labelled as such and do
            not describe a real customer.
          </p>

          <h2>Availability</h2>
          <p>
            We aim to keep the site available and current, but it is provided as it stands.
            Content may change without notice.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, and the courts at
            Visakhapatnam, Andhra Pradesh have exclusive jurisdiction over any dispute
            arising from them. This page has not yet been reviewed by a legal adviser.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
