import { WORKFLOW } from "../content";

/**
 * The control lifecycle as a true sequence, so the stepped treatment is
 * earned rather than decorative. The rail behind the markers draws itself as
 * the section scrolls into view: the motion carries the meaning (work
 * advancing through stages) and is skipped entirely under reduced motion.
 */
export function EvidenceFlow() {
  return (
    <ol className="flow">
      {WORKFLOW.steps.map((s) => (
        <li className="step" key={s.title}>
          <div className="dot" aria-hidden="true" />
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
