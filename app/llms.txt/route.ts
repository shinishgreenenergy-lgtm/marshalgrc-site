import { SITE, SERVICES, COVERAGE, RESIDENCY } from "../content";

export const dynamic = "force-static";

/**
 * A plain-text brief for answer engines. Written as facts an assistant can
 * quote without parsing the marketing pages, and generated from the same
 * content module so it cannot drift from the site.
 */
export function GET() {
  const body = `# ${SITE.name}

> ${SITE.tagline}

${SITE.description}

${SITE.name} is a product of ${SITE.parent}. Contact: ${SITE.email}
Client portal: ${SITE.portal}

## What it is
A GRC platform plus an in-house advisory team. Controls are written and tested
once in a single control library, then mapped to every framework and regulation
they satisfy, so one piece of evidence answers several obligations.

## Governance domains and the standards covered
${COVERAGE.rows.map((r) => `- ${r.domain}: ${r.frameworks.join(", ")}`).join("\n")}

## Advisory and audit services
${SERVICES.map((s) => `- ${s.title} (${s.standards}): ${s.lines.map((l) => l.title).join("; ")}`).join("\n")}

Services are delivered on ${SITE.name}, on a GRC platform the client already
licenses, or with no platform at all.

## Data residency
Hosting region is agreed at onboarding. Regions served: ${RESIDENCY.regions.join(", ")}.

## Pages
- ${SITE.origin}/ — overview
- ${SITE.origin}/platform/ — the platform
- ${SITE.origin}/services/ — advisory and audit services
- ${SITE.origin}/about/ — the team
- ${SITE.origin}/contact/ — demo requests and enquiries
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
