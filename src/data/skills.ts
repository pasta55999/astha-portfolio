/**
 * Skills, grouped and tied to the project that demonstrates each one.
 * `evidence` is a project slug (rendered as a link) — keep every skill backed
 * by something real. No ratings, no percentages.
 */
export type Skill = { name: string; evidence?: string; note?: string };
export type SkillGroup = { title: string; blurb: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & LLM systems",
    blurb: "Designing systems where the model has a narrow, well-defined job.",
    skills: [
      { name: "Tool-using agents", evidence: "guidr", note: "Four narrow tools; deterministic code owns state" },
      { name: "Multi-agent orchestration", evidence: "trace", note: "Specialists behind a typed tool broker and state machine" },
      { name: "RAG & hybrid retrieval", evidence: "support-agent-rag-eval", note: "BM25 + dense, RRF, cross-encoder rerank" },
      { name: "LLM evaluation", evidence: "support-agent-rag-eval", note: "Gold sets, judges, calibration, regression gates" },
      { name: "Prompt & schema design", evidence: "wish", note: "Strict JSON plans validated twice" },
      { name: "Voice interfaces (STT/TTS)", evidence: "guidr", note: "Code-switched Arabic–English, barge-in, fallbacks" },
      { name: "Structured extraction", evidence: "brandorbit", note: "Deterministic baseline vs LLM, labelled set" },
    ],
  },
  {
    title: "Backend & data",
    blurb: "Enough backend to ship the whole thing, and enough care to keep it honest.",
    skills: [
      { name: "Python", evidence: "trace", note: "FastAPI, pandas, pytest, mypy" },
      { name: "TypeScript / JavaScript", evidence: "guidr", note: "React 19, Vite, MV3 extensions, Node" },
      { name: "Convex", evidence: "guidr", note: "Schema, mutations, server-side secrets" },
      { name: "SQLite / Postgres", evidence: "tell", note: "Migrations, stable keys, Drizzle" },
      { name: "Vector stores & reranking", evidence: "support-agent-rag-eval", note: "Chroma, bge-small, cross-encoders" },
      { name: "API design", evidence: "reelcall", note: "OpenAPI spec → generated clients and Zod types" },
    ],
  },
  {
    title: "Product engineering",
    blurb: "Going from a specific person's problem to something they can click.",
    skills: [
      { name: "Rapid prototyping", evidence: "reelcall", note: "Spec → live demo in a hackathon window" },
      { name: "Problem framing & personas", evidence: "guidr", note: "Layla, finance assistant, Dubai" },
      { name: "Safety-by-design", evidence: "wish", note: "Allowlists, review steps, no model-generated code" },
      { name: "Honest scoping", evidence: "trace", note: "Synthetic data labelled; ‘unknown’ never rounded to ‘low’" },
      { name: "UI systems in constrained tools", evidence: "tell", note: "Design tokens and semantic colour in Streamlit" },
    ],
  },
  {
    title: "Tools & platforms",
    blurb: "Things I've actually used in anger.",
    skills: [
      { name: "OpenRouter", evidence: "guidr" },
      { name: "Munsit", evidence: "guidr" },
      { name: "Context.dev", evidence: "guidr" },
      { name: "Exa", evidence: "wish" },
      { name: "Ollama", evidence: "support-agent-rag-eval" },
      { name: "Streamlit", evidence: "tell" },
      { name: "Replit + Replit Agent", evidence: "reelcall" },
      { name: "Devin", note: "Agentic coding workflows" },
      { name: "MCP", evidence: "reelcall" },
      { name: "Git & CI", evidence: "support-agent-rag-eval" },
    ],
  },
];
