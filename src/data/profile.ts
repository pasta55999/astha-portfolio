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
  eyebrow: "Generative AI Engineer · Dubai, UAE",
  headline: ["Curious by nature.", "Built to make things happen."],
  intro:
    "I'm Astha — a GenAI engineer who enjoys turning ambitious ideas into working products, exploring what's next, and getting from “what if?” to “what works.”",
  /** Shown in the hero. Keep it accurate; set to null to hide. */
  currentFocus: {
    label: "Currently",
    text: "Building voice-first and agentic prototypes · open to conversations",
  } as { label: string; text: string } | null,
  siteUrl: "https://astha.dev", // TODO: replace with the deployed URL
  github: {
    handle: "pasta55999",
    url: "https://github.com/pasta55999",
  },
  /** TODO: supply real values. Empty strings are hidden in the UI. */
  email: "",
  linkedin: "",
  twitter: "",
  /** Put a file at /public/resume.pdf and set this to "/resume.pdf". */
  resume: "",
  /** Put a portrait at /public/portrait.jpg and set this to "/portrait.jpg". */
  portrait: "",
  about: [
    "I'm a computer science engineer working in generative AI, with a particular interest in what happens when new technology meets a real-world problem.",
    "Roughly two years in startups has made me curious about more than the engineering. I like understanding why a product needs to exist, who it's for, how it should behave, and what it actually takes to put it in someone's hands. Most of what I build starts as a question about a specific person's day — a finance assistant learning a new tool, an investor reading a seller's numbers — and the model is usually the easy part.",
    "Outside of work you'll find me at hackathons, somewhere in the Dubai startup ecosystem, or deep in a rabbit hole about something I've never built before.",
  ],
  exploring: [
    { topic: "Voice-first interfaces for code-switched Arabic/English", note: "Started with Guidr; still the most interesting UX problem I've touched." },
    { topic: "Evaluation loops for LLM systems", note: "Gold sets, calibrated thresholds and regression gates instead of vibes." },
    { topic: "Agents that can't lie about state", note: "Deterministic code owns truth; the model owns language." },
    { topic: "Climate & financial risk modelling", note: "How physical hazard becomes a number on a balance sheet." },
    { topic: "Quantitative finance", note: "Reading, prototyping, nothing shipped yet." },
    { topic: "Quantum computing & wearable AI", note: "Early curiosity — on the experiments list." },
  ],
};

export type Profile = typeof profile;
