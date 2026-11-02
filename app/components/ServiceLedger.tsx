import { SERVICES } from "../content";

/** The eight domains as a ruled ledger. An accent rule draws across the top
 *  of a row on hover or keyboard focus, marking the entry being read. */
export function ServiceLedger() {
  return (
    <>
      <nav className="svc-index" aria-label="Service domains">
        {SERVICES.map((s) => (
          <a key={s.id} href={`#${s.id}`}>{s.short}</a>
        ))}
      </nav>

      {SERVICES.map((s) => (
        <section className="svc" id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
          <div>
            <h3 id={`${s.id}-h`}>{s.title}</h3>
            <p className="std">{s.standards}</p>
            {s.note ? <p className="std2">{s.note}</p> : null}
          </div>
          <ul className="svc-lines">
            {s.lines.map((l) => (
              <li key={l.title}>
                <strong>{l.title}</strong>
                <span>{l.body}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
