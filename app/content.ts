/**
 * Every word on the site. Pages render from this file, so copy changes never
 * require touching markup, and the same facts cannot drift between pages.
 */

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "");

export const SITE = {
  /** Until a real domain is confirmed this stays invalid, which forces
   *  noindex + a disallow-all robots.txt. Set NEXT_PUBLIC_SITE_ORIGIN to go live. */
  origin: origin || "https://example.invalid",
  indexable: Boolean(origin),
  name: "MarshalGRC",
  parent: "Stellar Global",
  tagline: "A governance, risk and compliance platform with the advisory team to run it.",
  description:
    "MarshalGRC is a GRC platform with an in-house advisory team covering cybersecurity, data privacy, AI governance, business continuity, ITSM, EHS and quality management.",
  email: "contact@marshalgrc.com",
  copyright: "© 2026 Stellar Global. MarshalGRC is a Stellar Global product.",
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "GRC platform" },
  { href: "/services", label: "GRC services" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
] as const;

/* ── Home ──────────────────────────────────────────────────────────────── */

export const HERO = {
  h1: "One control set. Every framework you answer to.",
  lede: "MarshalGRC is a governance, risk and compliance platform with an in-house advisory team behind it. Map your controls once, collect evidence once, and report against ISO, SOC 2, NIST, privacy laws and AI standards from the same place.",
  /** The headline obligations. Each `reach` is the governance domain that
   *  framework sits under in COVERAGE below — no framework is claimed here
   *  that the platform page does not already list. */
  frameworks: [
    { name: "ISO 27001", reach: "Cybersecurity" },
    { name: "SOC 2", reach: "Cybersecurity" },
    { name: "NIST CSF", reach: "Cybersecurity" },
    { name: "ISO 42001", reach: "AI governance" },
    { name: "DPDP Act", reach: "Data privacy and protection" },
    { name: "GDPR", reach: "Data privacy and protection" },
    { name: "HIPAA", reach: "Data privacy and protection" },
    { name: "ISO 22301", reach: "Business continuity and disaster recovery" },
  ],
  caption: "Each requirement links back to one shared control.",
};

export const TRIAD = {
  heading: "The essence of GRC",
  lede: "Governance, risk and compliance are three views of the same question: is the organisation doing what it should, and can it prove it?",
  items: [
    { letter: "G", title: "Governance", body: "How direction is set and kept. Policies, standards, decision rights and the people accountable for each control." },
    { letter: "R", title: "Risk", body: "What could go wrong, how likely it is and how much it would hurt, so effort goes where exposure is highest." },
    { letter: "C", title: "Compliance", body: "Meeting the laws, standards and contracts you have signed up to, and showing evidence that you do." },
  ],
  note: "Run separately, these become three teams testing the same controls, chasing the same owners for the same evidence. Run together, one piece of work answers all three.",
};

export const QUALITIES = {
  heading: "What an effective GRC program looks like",
  lede: "Most programs fail quietly, through spreadsheets nobody owns and evidence gathered in a rush before each audit. Effective ones share a few habits.",
  items: [
    { title: "Every control has a named owner", body: "Accountability is explicit, with review dates that are tracked, not remembered." },
    { title: "One control library, mapped to every obligation", body: "A control is written and tested once, then linked to each framework and regulation it satisfies." },
    { title: "Priorities follow risk", body: "Testing depth and remediation urgency are set by a consistent risk-scoring method, not by who asks loudest." },
    { title: "Evidence is captured as work happens", body: "Audit readiness is a standing state, not a project that starts six weeks before the auditor arrives." },
    { title: "Leadership sees a picture it can act on", body: "Board and management reporting shows posture, trends and overdue issues, not a list of every test performed." },
  ],
};

export const PRESSURE = {
  heading: "Why governance can't wait for the next audit",
  lede: "Every new product, market or data partner adds a regulatory regime on top of the last. Regulatory exposure grows as fast as the business does, and most organisations expand faster than they build the governance to match.",
  items: [
    { title: "Procurement checks for assurance", body: "Government and enterprise buyers increasingly expect SOC 2 or ISO 27001 and completed DPIAs before a contract is signed." },
    { title: "Every data partner is a new risk", body: "Each hospital, school, research lab or vendor that shares data with you needs its own risk assessment and data-sharing agreement." },
    { title: "AI governance is now certifiable", body: "ISO/IEC 42001 turns published Responsible AI principles into an auditable management system, not just a statement." },
    { title: "Diligence is getting deeper", body: "Investors and institutional partners now look for evidence that controls work, not assurances that they exist." },
  ],
};

export const OFFER = {
  heading: "How MarshalGRC can help",
  lede: "A platform to run the program on, and practitioners who know how to build one. Use both, or either on its own.",
  items: [
    { title: "The GRC platform", body: "Control library, risk register, workflows, dashboards and compliance reporting in one place, with hosting that respects local data-residency rules.", cta: "Explore the platform", href: "/platform", lead: true },
    { title: "Advisory and audit services", body: "Program design, assessments, internal audit and certification readiness across seven domains, on our platform, yours or none.", cta: "View services", href: "/services", lead: false },
    { title: "Managed GRC operations", body: "Skilled resources on a time-and-materials or contract basis to keep the program current from one quarter to the next.", cta: "Talk to us", href: "/contact/#enquiry", lead: false },
  ],
};

export const ENGAGEMENT = {
  heading: "How an engagement runs",
  lede: "We assess where you stand, build what is missing, then keep it current. Each stage ends with something you can use, and you can start at whichever stage fits.",
  stages: [
    { num: "Stage 1", title: "Assess", body: "Gap assessment of security, privacy and AI governance against the frameworks that apply to you. Data flows are mapped and third-party data-sharing arrangements inventoried.", deliverable: "You receive a gap report, a risk register and a list of quick wins." },
    { num: "Stage 2", title: "Build", body: "Policies and governance structure, an ISO 42001 AI management system, a third-party risk program with data-processing agreements, SOC 2 or ISO 27001 pre-audit readiness, and the MarshalGRC platform configured to your needs.", deliverable: "You receive a policy set, an AI risk register, an audit-ready evidence library and working dashboards." },
    { num: "Stage 3", title: "Sustain", body: "Managed resources for day-to-day upkeep, an independent internal-audit cadence, certification assistance, and continuous monitoring as you launch new products or enter new markets.", deliverable: "You receive quarterly assurance reports, board and investor reporting, and ongoing advisory support." },
  ],
};

/* ── Platform ──────────────────────────────────────────────────────────── */

export const PLATFORM_HERO = {
  h1: "The MarshalGRC platform",
  lede: "Where your control library, risk register, evidence and reporting live together, so each audit draws on work you have already done.",
};

export const COVERAGE = {
  heading: "Governance domains and standards covered",
  lede: "Controls are mapped across frameworks, so one tested control can show compliance with several obligations at once.",
  hint: "Select a standard to see every domain it reaches.",
  rows: [
    { domain: "Cybersecurity", sub: "Security controls and assurance", frameworks: ["ISO/IEC 27001", "SOC 2", "NIST CSF", "SANS", "Regional frameworks"] },
    { domain: "Data privacy and protection", sub: "Personal and sensitive data", frameworks: ["India DPDP Act", "GDPR", "HIPAA", "PIPEDA", "PDPL", "GLBA", "FERPA"] },
    { domain: "AI governance", sub: "Responsible development and use of AI", frameworks: ["ISO/IEC 42001"] },
    { domain: "Business continuity and disaster recovery", sub: "Resilience and recovery", frameworks: ["ISO 22301", "NIST BCM", "DRI framework"] },
  ],
};

export const WORKFLOW = {
  heading: "Automated workflows",
  lede: "The platform moves each control through its cycle, assigning work, sending reminders and escalating what is overdue, so nobody has to chase it by email.",
  steps: [
    { title: "Assign", body: "Controls go to named owners with due dates." },
    { title: "Collect evidence", body: "Owners upload evidence against the control, once." },
    { title: "Review", body: "Reviewers accept the evidence or send it back with comments." },
    { title: "Raise issues", body: "Failed tests become tracked issues with a risk rating." },
    { title: "Remediate", body: "Action plans and reminders until the fix is in place." },
    { title: "Validate and close", body: "The fix is retested before the issue closes." },
  ],
};

export const DASHBOARDS = {
  heading: "Automated dashboards",
  lede: "Dashboards build themselves from the work done in the platform. No one assembles slides at quarter end.",
  points: [
    "Control status by framework and by business unit",
    "Open issues by severity and age, with overdue items flagged",
    "Risk heat map from the enterprise risk register",
    "Third-party risk status across your vendors",
  ],
  /** Illustrative figures only; labelled as such in the UI. */
  bars: [
    { label: "ISO 27001", pct: 86 },
    { label: "SOC 2", pct: 78 },
    { label: "DPDP Act", pct: 64 },
    { label: "ISO 42001", pct: 52 },
  ],
  openIssues: { count: "23", note: "4 past due" },
  /** 5x5 residual-risk grid, read bottom-left (low) to top-right (severe). */
  heat: [0, 0, 1, 1, 2, 0, 1, 1, 2, 2, 1, 1, 2, 2, 3, 1, 2, 2, 3, 3, 2, 2, 3, 3, 3],
  note: "Sample figures, for illustration only.",
};

export const REPORTING = {
  heading: "Integrated compliance reporting",
  lede: "Because every requirement points back to the same controls, each report is a different view of one data set rather than a separate exercise.",
  items: [
    { title: "Framework compliance reports", body: "Status against a single standard or regulation, such as ISO 27001 or the DPDP Act, with the supporting evidence attached." },
    { title: "Cross-framework coverage", body: "Where one control satisfies several obligations, and where a gap affects more than one." },
    { title: "Audit evidence packs", body: "Evidence organised the way internal and external auditors and certification bodies ask for it." },
    { title: "Management and board reporting", body: "Risk posture, trends and overdue remediation in a format leadership can act on." },
  ],
};

export const RESIDENCY = {
  heading: "Data residency, handled to local mandates",
  lede: "Compliance data is often sensitive in its own right. MarshalGRC lets you keep it in the jurisdiction your regulators expect, with the hosting region agreed at onboarding.",
  regions: ["India", "United States", "Canada", "Europe", "Middle East", "East Asia"],
};

/* ── Services ──────────────────────────────────────────────────────────── */

export const SERVICES_HERO = {
  h1: "GRC services from an in-house expert team",
  lede: "We work on whichever GRC platform you choose, on MarshalGRC, or with no platform at all. The advice is the same either way.",
};

export const AGNOSTIC = [
  { title: "On MarshalGRC", body: "Program design and build delivered straight onto the platform, ready to run." },
  { title: "On your existing platform", body: "We configure and operate the program in the GRC tool you already license." },
  { title: "Without a platform", body: "Assessments, audits and advisory delivered as documents and working files you own." },
];

export type Service = {
  id: string;
  short: string;
  title: string;
  standards: string;
  note?: string;
  lines: { title: string; body: string }[];
};

export const SERVICES: Service[] = [
  {
    id: "cybersecurity", short: "Cybersecurity", title: "Cybersecurity",
    standards: "ISO/IEC 27001, SOC 2, NIST CSF, SANS",
    lines: [
      { title: "Internal control structure advisory", body: "Design of the security control set and ownership model." },
      { title: "VAPT", body: "Vulnerability assessment and penetration testing." },
      { title: "Internal audit", body: "Independent testing of control design and operation." },
      { title: "Risk assessments", body: "Identification and scoring of cyber risk across your environment." },
      { title: "Maturity assessments", body: "Where your program stands today and what the next level requires." },
    ],
  },
  {
    id: "business-continuity", short: "BC-DR", title: "Business continuity and disaster recovery",
    standards: "ISO 22301, NIST BCM, DRI framework",
    lines: [
      { title: "Internal control structure advisory", body: "Continuity governance, roles and control design." },
      { title: "Business impact analysis", body: "Critical processes, dependencies and recovery objectives." },
      { title: "BCP and DR design", body: "Continuity and recovery plans that match your BIA." },
      { title: "DR exercises", body: "Planning, running and reporting on recovery tests and tabletops." },
      { title: "Internal audit", body: "Independent review of the continuity program." },
      { title: "Maturity assessments", body: "Program maturity measured against the standard." },
    ],
  },
  {
    id: "data-privacy", short: "Data privacy", title: "Data privacy",
    standards: "India DPDP Act, GDPR, HIPAA, PIPEDA, PDPL",
    lines: [
      { title: "Privacy program advisory", body: "Governance, policies and accountability for personal data." },
      { title: "Data-flow mapping", body: "Where personal data is collected, stored and shared." },
      { title: "Data protection impact assessments (DPIAs)", body: "Risk review of new processing, products and data-sharing partners." },
      { title: "Consent and notice controls", body: "Including sensitive categories such as health and minors' data." },
      { title: "Regulatory readiness and gap assessment", body: "Against the laws that apply to your markets." },
      { title: "Internal audit", body: "Independent testing of privacy controls." },
    ],
  },
  {
    id: "ai-governance", short: "AI governance", title: "AI governance",
    standards: "ISO/IEC 42001, NIST AI RMF",
    note: "We give your Responsible AI principles a control framework, an evidence trail and independent assurance behind them.",
    lines: [
      { title: "AI management system design", body: "An ISO 42001-aligned governance structure for how AI is built and used." },
      { title: "AI inventory and AI risk register", body: "Which AI systems you run, the risks each one carries, and who owns them." },
      { title: "Policy and oversight", body: "AI policies, working groups and review checkpoints." },
      { title: "Internal audit of AI systems", body: "Independent testing of AI controls and oversight." },
      { title: "Certification readiness", body: "Preparation for an ISO 42001 certification audit." },
    ],
  },
  {
    id: "third-party-risk", short: "Third-party risk", title: "Third-party risk management",
    standards: "ISO 27001, SOC 2, FFIEC guidance, DPDP Act, GDPR",
    lines: [
      { title: "Due diligence and onboarding", body: "Security and privacy review of new vendors and data-sharing partners." },
      { title: "Risk tiering", body: "Partners classified by the data they hold and how critical they are." },
      { title: "Contracts and data-processing agreements", body: "Security terms, DPAs and data-sharing agreements reviewed or drafted." },
      { title: "Assurance report review", body: "Critical reading of vendors' SOC 2 reports and ISO 27001 certificates." },
      { title: "Periodic reassessment", body: "Reviews scheduled by risk tier, not left to contract renewal." },
      { title: "Offboarding", body: "Data return, deletion and access removal confirmed at exit." },
    ],
  },
  {
    id: "itsm", short: "ITSM", title: "IT service management",
    standards: "ITIL, ISO/IEC 20000",
    lines: [
      { title: "Internal control structure advisory", body: "Controls over change, incident, problem and access management." },
      { title: "Process assessment", body: "ITSM processes reviewed against good practice." },
      { title: "Internal audit", body: "Independent testing of IT general controls." },
      { title: "Maturity assessments", body: "Service management maturity and a roadmap to improve it." },
    ],
  },
  {
    id: "ehs", short: "EHS and industrial safety", title: "EHS and industrial safety",
    standards: "ISO 45001, ISO 14001",
    lines: [
      { title: "Internal control structure advisory", body: "Safety and environmental management controls." },
      { title: "Risk assessments", body: "Hazard identification and risk scoring." },
      { title: "Internal audit", body: "Compliance audits against standards and local regulation." },
      { title: "Maturity assessments", body: "Program maturity and certification readiness." },
    ],
  },
  {
    id: "qms", short: "QMS", title: "Quality management systems",
    standards: "ISO 9001",
    lines: [
      { title: "QMS design and documentation", body: "Processes, procedures and records for a working quality system." },
      { title: "Internal audit", body: "Independent audits of the quality system." },
      { title: "Maturity assessments", body: "Gaps against the standard and a plan to close them." },
      { title: "Certification readiness", body: "Preparation for the certification body's audit." },
    ],
  },
];

export const SECTORS = {
  heading: "Sectors we serve",
  lede: "Different data carries different obligations. We start from what your data is, whose it is and who you share it with.",
  rows: [
    { sector: "Healthcare and life sciences", data: "Clinical and patient data shared across hospital networks", obligations: "DPDP Act, HIPAA, PIPEDA, clinical-trial governance (GCP)" },
    { sector: "Education and edtech", data: "Students' behavioural and digital data, including minors'", obligations: "Child-data consent, DPDP Act provisions for minors, FERPA" },
    { sector: "Financial services", data: "Customer financial and behavioural data", obligations: "GLBA, SOX, FFIEC and OCC guidance, NY DFS Part 500" },
    { sector: "Mining and industrial", data: "Workforce fatigue, readiness and occupational-safety data", obligations: "Occupational-safety reporting and liability, ISO 45001" },
    { sector: "Government and public sector", data: "Population-scale data shared across agencies", obligations: "SOC 2, ISO 27001 and DPIAs as procurement requirements" },
  ],
};

/* ── About ─────────────────────────────────────────────────────────────── */

export const ABOUT_HERO = {
  h1: "Built by people who have run audit and compliance programs",
  lede: "MarshalGRC comes from practitioners who have sat on both sides of the audit table, in regulated industries where examiners and auditors expect evidence, not assurances.",
};

export const ABOUT = {
  blocks: [
    { title: "Expert consultant team", body: ["Our consultants are working practitioners in IT audit, cybersecurity, privacy and risk. They have led internal audit functions, managed regulator relationships and taken organisations through certification."], tags: ["CISA", "CISM", "CDPSE", "ISO 27001 Lead Auditor", "ISO 42001 Lead AI Auditor"] },
    { title: "Technical expertise", body: ["We assess controls at the level where they operate, not only on paper."], tags: ["Cloud security (Microsoft Azure)", "Identity and access management", "Data protection", "Security operations", "AI and ML systems", "IT general controls", "Third-party risk"] },
    { title: "Exposure to compliance mandates", body: ["Experience across financial services, healthcare, manufacturing and technology, with the mandates that come with them."], tags: ["SOX", "SOC 1 / SOC 2", "FFIEC and OCC guidance", "NY DFS Part 500", "GLBA", "GDPR", "DPDP Act", "HIPAA", "ISO 27001", "ISO 42001", "ISO 22301"] },
    { title: "Independent consulting", body: ["You do not need to license our platform to work with us. Our advice is the same whether you run MarshalGRC, another GRC tool or none.", "Where we audit, we keep audit work separate from the team that designed or built the controls under review."], tags: [] },
  ],
  geoHeading: "Supporting clients across six regions",
  regions: ["United States", "Canada", "Europe", "India", "Middle East", "East Asia"],
};

/* ── Contact ───────────────────────────────────────────────────────────── */

export const CONTACT_HERO = {
  h1: "Contact us",
  lede: "Book a walkthrough of the platform, or ask us about a service. We reply within two working days.",
};

export const CONTACT = {
  demo: {
    heading: "Request a demo",
    body: "Tell us a little about your organisation and we will set up a walkthrough built around the frameworks you need.",
    interests: ["Cybersecurity", "Data privacy", "AI governance", "Business continuity and DR", "Several domains"],
  },
  enquiry: {
    heading: "Send an enquiry",
    body: "Questions about services, pricing or how we work. A consultant will reply.",
    services: ["Cybersecurity", "Business continuity and DR", "Data privacy", "AI governance", "IT service management", "EHS and industrial safety", "Quality management", "Managed GRC resources", "Something else"],
  },
  /** Items in square brackets are unresolved and render as flagged placeholders. */
  reach: {
    whatsapp: "[WhatsApp number]",
    india: ["Stellar Global", "D No: 14-164/1/2, Parvati Nilayam", "Chinamushidiwada, Visakhapatnam", "Andhra Pradesh 530051, India"],
    us: "[US office address]",
  },
  next: {
    heading: "What happens after you get in touch",
    steps: [
      { num: "Step 1", title: "A 30-minute discovery call", body: "We confirm where your governance stands today, which certifications you hold and which deadlines are coming." },
      { num: "Step 2", title: "A scoped first-phase proposal", body: "Sized to your current stage, not an enterprise-scale engagement you do not need yet." },
      { num: "Step 3", title: "Agree where to start", body: "Usually the area with the nearest deadline: a customer's procurement review, a certification or a regulator." },
    ],
  },
};
