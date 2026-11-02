import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="band page-hero" style={{ minHeight: "52vh" }}>
      <div className="wrap">
        <h1>That page is not here</h1>
        <p className="lede">
          The address may be out of date. The platform, the services and the contact
          form are all one click away.
        </p>
        <div className="cta-row" style={{ marginTop: 28 }}>
          <Link className="btn btn-primary" href="/">Back to the home page</Link>
          <Link className="btn btn-ghost" href="/services">See the services</Link>
        </div>
      </div>
    </div>
  );
}
