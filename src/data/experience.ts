/**
 * Experience and achievements. Only verified items are rendered.
 * Fill in the TODO fields (company names, dates, event names, awards) and
 * flip `verified` to true to show them. Unverified items are hidden.
 */
export type ExperienceItem = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "hackathon" | "community" | "education";
  summary: string;
  bullets?: string[];
  verified: boolean;
};

export const experience: ExperienceItem[] = [
  {
    period: "2024 — present", // TODO: confirm dates
    title: "Generative AI Engineer",
    org: "Startup, Dubai", // TODO: company name
    kind: "work",
    summary:
      "Roughly two years building LLM-powered features in a startup environment — from prompt and tool design to the product decisions around them.",
    bullets: [
      "Shipping GenAI features end to end: prompting, tool use, evaluation, integration and iteration with users.",
      "Working across engineering and product: scoping what to build, validating it quickly, and deciding what not to build.",
    ],
    verified: true,
  },
  {
    period: "2026",
    title: "Guidr — bilingual voice tutor",
    org: "Hackathon build", // TODO: event name and any award, e.g. "Winner · <Event>"
    kind: "hackathon",
    summary:
      "Built a working voice-first tutor for Arabic/English code-switching users, with deterministic step verification, in a hackathon sprint. Re-architected the voice stack mid-build when Arabic quality wasn't good enough.",
    verified: true,
  },
  {
    period: "2026",
    title: "Reelcall — memory layer for saved reels",
    org: "Oriane × Replit Video Economy Hackathon",
    kind: "hackathon",
    summary:
      "Specced and shipped a live demo that turns saved reels into searchable, plannable memory on top of Oriane's video intelligence, exposed as an MCP server.",
    verified: true,
  },
  {
    period: "2026",
    title: "Trace — climate financial-risk intelligence",
    org: "Hackathon prototype",
    kind: "hackathon",
    summary:
      "Designed a three-plane architecture with self-evolving agents fenced by an immutable policy engine; bilingual Arabic/English output with enforced numeric parity.",
    verified: true,
  },
  {
    period: "Ongoing",
    title: "Dubai startup & AI community",
    org: "Hackathons, meetups, builder circles",
    kind: "community",
    summary:
      "Regular hackathon participant and an active face in the Dubai startup ecosystem — meeting founders, testing ideas early and learning what people actually need.",
    verified: true,
  },
  {
    period: "", // TODO
    title: "B.Eng./B.Sc. Computer Science Engineering",
    org: "", // TODO: university
    kind: "education",
    summary: "",
    verified: false,
  },
];
