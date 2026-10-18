/**
 * Experience and achievements — sourced from Astha's CV (AsthaaCV.pdf) and the
 * public repositories. Only `verified: true` items are rendered.
 */
export type ExperienceItem = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "hackathon" | "community" | "education";
  summary: string;
  bullets?: string[];
  award?: string;
  verified: boolean;
};

export const experience: ExperienceItem[] = [
  {
    period: "Oct 2025 — present",
    title: "Business Development Executive",
    org: "SusoTech",
    kind: "work",
    summary: "Turning financial and operational data into usable business insight — and building the backend that makes it reliable.",
    bullets: [
      "Built data pipelines that turn financial and operational data into clear, usable business insight.",
      "Developed backend APIs and processing components for data-heavy platforms, with a focus on reliability.",
      "Created a working blockchain prototype with a secure, end-to-end transaction lifecycle.",
    ],
    verified: true,
  },
  {
    period: "Jul 2025 — Sep 2025",
    title: "Executive Assistant to the CEO",
    org: "Be Wise",
    kind: "work",
    summary: "Supported the CEO across investor, client and strategic priorities in a fast-moving environment.",
    bullets: [
      "Researched markets and competitors to help shape positioning and revenue-growth decisions.",
      "Analysed platform performance data to spot inefficiencies and turned findings into practical recommendations.",
    ],
    verified: true,
  },
  {
    period: "Jan 2025 — Jun 2025",
    title: "Generative AI Engineer",
    org: "Promptus AI",
    kind: "work",
    summary: "Built and tested generative AI workflows end to end, linking model behaviour to real product and business needs.",
    bullets: [
      "Hands-on prompt experimentation that improved output consistency and automated repetitive work.",
      "Developed AI-driven engagement tools tied to product and business goals.",
      "Took generative work into NFT creation, connecting AI-generated content with blockchain-based ownership.",
    ],
    verified: true,
  },
  {
    period: "Mar 2024 — Oct 2024",
    title: "Machine Learning Engineer",
    org: "Lion Charge",
    kind: "work",
    summary: "Designed and deployed predictive models for market forecasting, turning data patterns into signals the team could plan around.",
    bullets: [
      "Analysed complex datasets to connect model outputs with business and operational decisions.",
      "Improved model performance through repeated rounds of feature engineering, testing and optimisation.",
    ],
    verified: true,
  },
  {
    period: "Jul 2022 — Dec 2022",
    title: "Research Intern",
    org: "Manipal University",
    kind: "work",
    summary: "Machine learning on the NASA Defect Dataset to improve defect prediction and software-reliability analysis.",
    bullets: ["Built evaluation frameworks to benchmark algorithms and support evidence-based model selection."],
    verified: true,
  },
  {
    period: "2021 — 2023",
    title: "Earlier roles",
    org: "Hope Digital · iCodejr · Property Exchange",
    kind: "work",
    summary: "Web developer at two startups (responsive apps, agile delivery, cross-functional teams) and a broker associate studying pricing trends and building lead-reporting workflows.",
    verified: true,
  },

  {
    period: "2026",
    title: "Guidr — bilingual voice tutor",
    org: "Devin Hackathon",
    kind: "hackathon",
    award: "Winner",
    summary: "Built a working voice-first tutor for Arabic/English code-switching users with deterministic step verification. Re-architected the voice stack mid-build when Arabic quality wasn't good enough.",
    verified: true,
  },
  {
    period: "2026",
    title: "Trace — climate & ESG intelligence",
    org: "DEWA Clean Tech Hackathon · Red Bull Basement 2026",
    kind: "hackathon",
    award: "National Finalist (UAE), Red Bull Basement 2026",
    summary: "AI-enabled climate-risk and ESG reporting platform: self-evolving agents fenced by a policy engine, bilingual Arabic/English briefs with enforced numeric parity.",
    verified: true,
  },
  {
    period: "2026",
    title: "Reelcall — memory layer for saved reels",
    org: "Oriane × Replit Video Economy Hackathon",
    kind: "hackathon",
    summary: "Specced and shipped a live demo that turns saved reels into searchable, plannable memory on top of Oriane's video intelligence, exposed as an MCP server.",
    verified: true,
  },
  {
    period: "2025",
    title: "RAHI — AI mobility platform",
    org: "Expo 2020 Incubator",
    kind: "hackathon",
    summary: "Quantum-inspired, AI-powered mobility platform with real-time route optimisation, adaptive heat-zone detection, intelligent ride matching and a gamified trust layer with carbon-credit incentives.",
    verified: true,
  },
  {
    period: "2025",
    title: "Caliber.ai — personalised learning pathways",
    org: "Sheraa Incubator",
    kind: "hackathon",
    summary: "Shaped a scalable product concept by translating user needs into clear product and engineering requirements.",
    verified: true,
  },
  {
    period: "2024",
    title: "AI-quantum-inspired water optimisation",
    org: "NYUAD Quantum Hackathon",
    kind: "hackathon",
    summary: "Computational model to improve water-allocation efficiency and support better resource planning.",
    verified: true,
  },
  {
    period: "2024",
    title: "Verdex — circular economy for battery reuse",
    org: "Sevan Startup Summit",
    kind: "hackathon",
    summary: "Led the team: a circular-economy model tying battery lifecycle optimisation to sustainability and long-term infrastructure value.",
    verified: true,
  },

  {
    period: "Ongoing",
    title: "Google Developer Student Clubs lead",
    org: "GDSC · Dubai startup community",
    kind: "community",
    summary: "Led student-driven technical initiatives and developer community engagement; a regular at Dubai hackathons, meetups and builder circles.",
    verified: true,
  },
  {
    period: "2024",
    title: "Bachelor's in Computer Science",
    org: "Manipal Academy of Higher Education",
    kind: "education",
    summary: "Focused on AI, machine learning, data structures, blockchain and data analytics — applied through research internships, hackathons and startup incubation.",
    verified: true,
  },
];
