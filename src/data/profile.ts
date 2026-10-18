/**
 * Personal details. Everything here is editable.
 * Items marked TODO are placeholders that still need to be supplied — they are
 * hidden in the UI until filled in, never invented.
 */
export const profile = {
  name: "Astha Chauhan",
  firstName: "Astha",
  role: "Generative AI Engineer",
  location: "Dubai, UAE",
  timezone: "Asia/Dubai",
  timezoneLabel: "GST",
  /** Typed character by character in the hero. */
  typed: "// HELLO, I'M",
  headline: ["I build intelligent", "products for", "what's next."],
  intro:
    "Hey, I'm Astha — a Generative AI Engineer who enjoys building intelligent products, experimenting with emerging technologies, and turning ideas into working software.",
  /** Floating card in the hero. */
  mindset: ["Build", "Validate", "Learn", "Repeat"],
  /** Status indicator next to the social icons. Set to null to hide. */
  status: "Open to opportunities" as string | null,
  siteUrl: "https://astha.dev", // TODO: replace with the deployed URL
  github: { handle: "pasta55999", url: "https://github.com/pasta55999" },
  /** TODO: supply real values. Empty strings are hidden in the UI. */
  email: "",
  linkedin: "",
  twitter: "",
  /** Put a file at /public/resume.pdf and set this to "/resume.pdf". */
  resume: "",
  /** Put a portrait at /public/portrait.jpg and set this to "/portrait.jpg". */
  portrait: "",

  about: {
    heading: ["More than", "just an", "engineer."],
    paragraphs: [
      "I'm a Computer Science Engineer working in Generative AI, with about two years of startup experience and a particular interest in what happens when new technology meets a real-world problem.",
      "Working in startups made me curious about more than the engineering: why a product needs to exist, who it's for, how it should behave, and what it takes to get it into people's hands. I grew up in Dubai, and most of what I build starts with a specific person here — a finance assistant learning a new tool, an investor reading a seller's numbers.",
      "Outside of work you'll find me at hackathons, exploring new technologies, building prototypes, or meeting people in the startup ecosystem.",
    ],
    facts: [
      { icon: "cpu", title: "Generative AI Engineer", sub: "~2 years in a startup environment" },
      { icon: "map", title: "Dubai, UAE", sub: "Based in · grew up here" },
      { icon: "graduation", title: "Computer Science Engineer", sub: "Engineering degree · GenAI focus" }, // TODO: add university name to `sub` once confirmed
    ],
    quote: "Curious by nature. Built to make things happen.",
    enjoy: [
      { icon: "brain", label: "Generative AI & LLMs" },
      { icon: "bot", label: "Agentic systems & NLP" },
      { icon: "mic", label: "Voice-first interfaces" },
      { icon: "flask", label: "Hackathons & rapid prototyping" },
      { icon: "rocket", label: "Startups & product thinking" },
      { icon: "compass", label: "Emerging tech rabbit holes" },
    ],
  },

  /** Verified counts — update as the data files change. */
  stats: [
    { value: "7", label: "Projects built" },
    { value: "3", label: "Hackathon builds" },
    { value: "~2 yrs", label: "GenAI in startups" },
    { value: "Always", label: "Curious" },
  ],

  exploring: [
    { topic: "Quantitative finance", note: "Backtesting simple signals on public data to learn the vocabulary before building anything." },
    { topic: "Quantum computing", note: "Working through the basics — no project yet, just curiosity." },
    { topic: "Wearable AI", note: "What Guidr's talk-you-through-it loop looks like off the screen." },
    { topic: "Evaluation for agents", note: "Generalising the support-agent eval loop into something reusable." },
  ],
};

export type Profile = typeof profile;
