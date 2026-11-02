import type { Metadata } from "next";
import { ContactTabs } from "../components/ContactTabs";
import { CONTACT_HERO, CONTACT, SITE } from "../content";

export const metadata: Metadata = {
  title: "Contact us",
  description: CONTACT_HERO.lede,
};

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="rule" aria-hidden="true" />
          <h1>{CONTACT_HERO.h1}</h1>
          <p className="lede">{CONTACT_HERO.lede}</p>
        </div>
      </div>

      <div className="section">
        <div className="wrap contact-grid">
          <ContactTabs />

          <aside className="reach-list" aria-label="Other ways to reach us">
            <div className="block">
              <h3>Email</h3>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </div>
            <div className="block">
              <h3>WhatsApp</h3>
              <p><span className="todo">{CONTACT.reach.whatsapp}</span></p>
            </div>
            <div className="block">
              <h3>India office</h3>
              <address>
                {CONTACT.reach.india.map((l, i) => (
                  <span key={l}>{l}{i < CONTACT.reach.india.length - 1 ? <br /> : null}</span>
                ))}
              </address>
            </div>
            <div className="block">
              <h3>US office</h3>
              <address><span className="todo">{CONTACT.reach.us}</span></address>
            </div>
          </aside>
        </div>
      </div>

      <div className="section invert">
        <div className="wrap spread">
          <header>
            <h2>{CONTACT.next.heading}</h2>
          </header>
          <ol className="phases">
            {CONTACT.next.steps.map((s, i) => (
              <li key={s.num}>
                <span className="num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
