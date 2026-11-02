"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, SITE } from "../content";

type Tab = "demo" | "enquiry";

type FieldDef = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  autoComplete?: string;
  options?: readonly string[];
  full?: boolean;
  optional?: boolean;
};

const DEMO_FIELDS: FieldDef[] = [
  { id: "d-name", name: "Name", label: "Full name", required: true, autoComplete: "name" },
  { id: "d-email", name: "Email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "d-company", name: "Organisation", label: "Organisation", required: true, autoComplete: "organization" },
  { id: "d-country", name: "Country", label: "Country", autoComplete: "country-name" },
  { id: "d-focus", name: "Area of interest", label: "Main area of interest", type: "select", options: CONTACT.demo.interests, full: true },
  { id: "d-msg", name: "Notes", label: "Anything we should know", type: "textarea", full: true, optional: true },
];

const ENQUIRY_FIELDS: FieldDef[] = [
  { id: "e-name", name: "Name", label: "Full name", required: true, autoComplete: "name" },
  { id: "e-email", name: "Email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { id: "e-phone", name: "Phone", label: "Phone", type: "tel", autoComplete: "tel", optional: true },
  { id: "e-svc", name: "Service", label: "Service", type: "select", options: CONTACT.enquiry.services },
  { id: "e-msg", name: "Message", label: "Your message", type: "textarea", required: true, full: true },
];

/** Submissions open the visitor's own mail client. Nothing is posted to a
 *  server, so the static site stores no enquiry data at all. */
function EnquiryForm({ kind, fields, submitLabel }: { kind: string; fields: FieldDef[]; submitLabel: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Record<string, string> = {};

    for (const f of fields) {
      if (!f.required) continue;
      const el = form.elements.namedItem(f.name) as HTMLInputElement | null;
      const value = el?.value.trim() ?? "";
      if (!value) next[f.id] = `Enter your ${f.label.toLowerCase()}.`;
      else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        next[f.id] = "Enter an email address like name@company.com.";
    }

    setErrors(next);
    const firstBad = fields.find((f) => next[f.id]);
    if (firstBad) {
      setStatus("Check the highlighted fields and try again.");
      (form.elements.namedItem(firstBad.name) as HTMLElement | null)?.focus();
      return;
    }

    const lines = fields
      .map((f) => {
        const el = form.elements.namedItem(f.name) as HTMLInputElement | null;
        const v = el?.value.trim();
        return v ? `${f.name}: ${v}` : null;
      })
      .filter(Boolean);

    const href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(`${SITE.name} website: ${kind}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setStatus("Your email app should open with the request ready to send. If it does not, email " + SITE.email + " directly.");
  }

  return (
    <form noValidate onSubmit={onSubmit} ref={formRef}>
      <div className="fields">
        {fields.map((f) => (
          <div className={f.full ? "field full" : "field"} key={f.id}>
            <label htmlFor={f.id}>
              {f.label}
              {f.optional ? <span className="opt"> (optional)</span> : null}
            </label>

            {f.type === "select" ? (
              <select id={f.id} name={f.name} defaultValue={f.options?.[0]}>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                id={f.id} name={f.name}
                aria-invalid={errors[f.id] ? true : undefined}
                aria-describedby={errors[f.id] ? `${f.id}-err` : undefined}
              />
            ) : (
              <input
                id={f.id} name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete}
                aria-invalid={errors[f.id] ? true : undefined}
                aria-describedby={errors[f.id] ? `${f.id}-err` : undefined}
              />
            )}

            {errors[f.id] ? <span className="err" id={`${f.id}-err`}>{errors[f.id]}</span> : null}
          </div>
        ))}
      </div>
      <button className="btn btn-solid" type="submit">{submitLabel}</button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}

export function ContactTabs() {
  const [tab, setTab] = useState<Tab>("demo");
  const tabRefs = { demo: useRef<HTMLButtonElement>(null), enquiry: useRef<HTMLButtonElement>(null) };

  // /contact#demo and /contact#enquiry are real entry points, linked from the
  // header, the footer and every CTA on the site.
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "demo" || h === "enquiry") setTab(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next: Tab = tab === "demo" ? "enquiry" : "demo";
    setTab(next);
    tabRefs[next].current?.focus();
  }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Choose a form">
        {(["demo", "enquiry"] as const).map((t) => (
          <button
            key={t}
            ref={tabRefs[t]}
            role="tab"
            id={`tab-${t}`}
            aria-controls={`panel-${t}`}
            aria-selected={tab === t}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            onKeyDown={onKeyDown}
          >
            {t === "demo" ? CONTACT.demo.heading : CONTACT.enquiry.heading}
          </button>
        ))}
      </div>

      <div className="form-card" role="tabpanel" id="panel-demo" aria-labelledby="tab-demo" hidden={tab !== "demo"}>
        <h2>{CONTACT.demo.heading}</h2>
        <p>{CONTACT.demo.body}</p>
        <EnquiryForm kind="Demo request" fields={DEMO_FIELDS} submitLabel="Request a demo" />
      </div>

      <div className="form-card" role="tabpanel" id="panel-enquiry" aria-labelledby="tab-enquiry" hidden={tab !== "enquiry"}>
        <h2>{CONTACT.enquiry.heading}</h2>
        <p>{CONTACT.enquiry.body}</p>
        <EnquiryForm kind="Enquiry" fields={ENQUIRY_FIELDS} submitLabel="Send enquiry" />
      </div>
    </div>
  );
}
