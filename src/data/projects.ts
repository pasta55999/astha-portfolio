/**
 * Project content. Every case study below was written against the actual
 * repositories (github.com/pasta55999) — READMEs, source trees and commit
 * history — on 2026-10-18. Keep claims verifiable; prefer "not yet" over hype.
 *
 * To add a project: append an entry, pick an `accent` and a `visual`, and it
 * will appear in the showcase, the Inside My Thinking explorer and get its own
 * /projects/[slug] page automatically.
 */

export type Accent = "violet" | "indigo" | "emerald" | "amber";
export type Status = "idea" | "concept" | "prototype" | "working-demo" | "deployed";
export type Visual = "guidr" | "trace" | "reelcall" | "wish" | "tell" | "brandorbit" | "rag";

export type Decision = { title: string; body: string };
export type CodeExcerpt = { title: string; lang: string; code: string; note?: string };

export type Thinking = {
  problem: string;
  insight: string;
  design: string;
  prototype: string;
  next: string;
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  category: string[];
  accent: Accent;
  visual: Visual;
  status: Status;
  statusNote: string;
  year: string;
  featured: boolean;
  team: string;
  summary: string;
  stack: string[];
  links: { repo?: string; demo?: string; video?: string; docs?: string };
  caseStudy: {
    problem: string[];
    insight: string[];
    solution: string[];
    contribution: string[];
    implementation: string[];
    flow: string[];
    decisions: Decision[];
    challenges: string[];
    next: string[];
    code?: CodeExcerpt;
  };
  thinking: Thinking;
};

export const statusLabel: Record<Status, string> = {
  idea: "Idea",
  concept: "Concept",
  prototype: "Prototype",
  "working-demo": "Working demo",
  deployed: "Deployed",
};

export const accentVar: Record<Accent, string> = {
  violet: "var(--violet-400)",
  indigo: "var(--indigo-400)",
  emerald: "var(--emerald-400)",
  amber: "var(--amber-300)",
};

export const projects: Project[] = [
  {
    slug: "guidr",
    featured: true,
    number: "01",
    name: "Guidr",
    tagline: "A bilingual voice tutor that talks you through real software, one step at a time.",
    category: ["Agentic AI", "Voice Interfaces", "Browser Automation"],
    accent: "violet",
    visual: "guidr",
    status: "working-demo",
    statusNote:
      "Working local prototype with one complete lesson (creating a supplier invoice in a simulated accounts-payable app). Not deployed; no auth or multi-user support.",
    year: "2026",
    // TODO: if Guidr was a team submission, credit collaborators here. All commits in the public repo are Astha's.
    team: "Hackathon build · repository authored by me",
    summary:
      "Click the mic, speak in English, Arabic or a mix of both, and Guidr explains the next step, points at the exact control on screen, and waits for you to actually do it. The model can explain and point — but plain deterministic code decides whether a step is complete.",
    stack: ["React 19", "TypeScript", "Vite", "Convex", "Claude via OpenRouter", "Munsit STT/TTS", "Context.dev", "Web Audio API"],
    links: {
      repo: "https://github.com/pasta55999/Guidr",
      video: "https://github.com/pasta55999/Guidr/raw/main/docs/guidr-demo.mp4",
    },
    caseStudy: {
      problem: [
        "Learning a new internal tool at work usually means a PDF of screenshots, a recorded video, or asking the person sitting next to you. None of those adapt to you, none can answer a question halfway through, and none speak the way people in the UAE actually speak — Arabic and English woven into the same sentence.",
        "Chatbots don't fix this. They can't see your screen, they can't point at anything, and they'll happily say “great, you've done it” when you haven't done anything at all.",
      ],
      insight: [
        "The failure mode that mattered most wasn't language or latency — it was trust. A tutor that can declare success on its own will eventually hallucinate it. So the system was designed around one asymmetry: the model may explain and point, but it has no tool that can advance the lesson. Progress is decided by deterministic code checking real clicks against the expected element.",
        "The second insight was about the audience. The persona is Layla, a finance assistant in Dubai working in accounts payable — someone who would rather be talked through a task than read about it, and who code-switches mid-sentence.",
      ],
      solution: [
        "Guidr sits on top of a simulated accounts-payable dashboard (“Nexus Finance”). You click the mic and speak. Munsit's code-switched Arabic–English model transcribes it; Claude (through OpenRouter) decides what to say and which control to highlight; the browser animates a cursor and ring to that element by its semantic id; and the reply is spoken back — in an Emirati-dialect voice if it contains Arabic, the browser voice if it's pure English.",
        "Every click on a tagged control is sent to a Convex function that compares it to the current step. If it matches, the step advances and the tutor is told via a system note. If it doesn't, the wrong click is logged and the tutor is told that too. Progress persists, so a refresh resumes rather than restarts.",
        "When you ask about VAT, TRNs or what belongs on a tax invoice, the tutor searches a cached copy of the UAE Federal Tax Authority's tax-invoice guide, ingested once through Context.dev. Nothing external is fetched mid-conversation.",
      ],
      contribution: [
        "Designed the architecture and the “model can't advance the lesson” contract, wrote the Convex schema, session/progress logic, tutor prompt and tool definitions.",
        "Built the voice loop: raw audio capture via Web Audio, volume-based end-of-utterance detection, in-browser WAV encoding, Munsit proxying, barge-in handling and graceful fallback to the browser's speech APIs.",
        "Built the simulated Nexus Finance app, the element registry shared between prompt and UI, the highlight overlay, and the one-time documentation ingest and keyword search.",
        "Re-architected mid-hackathon from OpenAI Realtime to Claude + Munsit when the original path couldn't handle Arabic well enough (visible in the commit history).",
      ],
      implementation: [
        "Two halves: a React app in the browser and a Convex backend running as an anonymous local deployment. The browser owns the microphone, conversation history, tool execution and visual overlay. Convex owns everything durable — lesson steps, session state, the event log and cached documentation — plus the server-side functions that call Munsit, OpenRouter and Context.dev, so API keys never reach the client.",
        "A single turn: speech → WAV → Convex → Munsit → text → Convex → Claude Haiku 4.5 with four tools (highlight element, clear highlight, read lesson state, look up documentation) → up to six tool rounds executed in the browser → final text → Faseeh voice or Web Speech.",
        "The list of controls the model is allowed to point at, with English and Arabic labels, is generated from the same registry the browser uses — so the prompt and tool schema cannot drift apart. The tutor never produces coordinates, and no tool accepts a number that could be one.",
        "Documentation search is deliberately simple: chunks of roughly 1,200 characters split on heading boundaries, tagged with keywords, scored by keyword overlap with a bonus for exact substring matches. No embeddings, no vector index — one document didn't justify it.",
      ],
      flow: ["Speak (EN/AR/mixed)", "Munsit STT", "Claude + 4 tools", "Highlight by element id", "User clicks", "Convex verifies step", "LESSON_STATE note → tutor"],
      decisions: [
        {
          title: "Deterministic code owns truth; the model owns language",
          body: "The tutor can read LESSON_STATE notes but has no way to write one. This single asymmetry is what stops it from ever declaring success on its own, and it made the rest of the prompt much easier to write honestly (“you cannot see the screen; do not claim to have observed a click”).",
        },
        {
          title: "Point by name, not by pixel",
          body: "Highlighting works on semantic element ids rather than coordinates. It's robust to layout changes, it keeps the model out of geometry it can't reason about, and it made the shared registry the single source of truth for both prompt and UI.",
        },
        {
          title: "WAV in the browser",
          body: "Encoding raw samples as WAV avoided codec negotiation with Munsit and gave a free level meter from the same buffer. The cost is a deprecated Web Audio API path, accepted to avoid shipping a separate worklet in a prototype.",
        },
        {
          title: "Tool runner that can never fail to return",
          body: "OpenRouter rejects a conversation with an unanswered tool call. Unknown tools, broken arguments, thrown errors and timeouts all produce an error result rather than a missing one, and barge-ins mark in-flight responses stale while still writing pending tool results.",
        },
      ],
      challenges: [
        "Arabic quality: the first voice stack (OpenAI Realtime) was replaced with Claude + Munsit specifically for code-switched Arabic–English recognition and an Emirati-dialect voice.",
        "Language mirroring: each utterance is classified as English, Arabic or mixed by script detection and the tutor is told explicitly which to use on every turn — the fix for the model drifting back to English.",
        "Interruptions: handling barge-in without corrupting the conversation required the stale-response + pending-tool-result discipline described above.",
        "Latency: every turn is a serial round trip through transcription, the model and speech synthesis with no streaming. Noticeable, and the first thing to fix.",
      ],
      next: [
        "Turn lessons into data — a new task becomes database rows and a list of tagged elements rather than new code.",
        "Move to an AudioWorklet and stream transcription and speech to cut latency.",
        "Swap keyword search for embeddings once there's more than one document.",
        "Add tests for progress logic, the chunker, the language detector and the tool runner — all already written as plain functions.",
        "Use recorded wrong clicks and hint counts to adapt how much the tutor explains.",
      ],
      code: {
        title: "The contract in one sentence",
        lang: "ts",
        note: "The browser can only report what happened; only Convex decides whether the step advanced.",
        code: `// convex/sessions.ts — the tutor has no tool that can call this.
export const reportAction = mutation({
  args: { sessionId: v.id("sessions"), elementId: v.string(), kind: v.string() },
  handler: async (ctx, { sessionId, elementId, kind }) => {
    const session = await ctx.db.get(sessionId);
    const step = lesson.steps[session.stepIndex];
    const correct = step.expects.elementId === elementId && step.expects.kind === kind;
    await ctx.db.insert("events", { sessionId, elementId, kind, correct, at: Date.now() });
    if (correct) await ctx.db.patch(sessionId, { stepIndex: session.stepIndex + 1 });
    return { correct, note: buildLessonStateNote(session, step, correct) };
  },
});`,
      },
    },
    thinking: {
      problem: "People learning workplace software in the UAE get PDFs and videos that can't adapt, can't answer mid-task, and don't speak mixed Arabic–English. Chatbots can't see the screen and will claim you've finished when you haven't.",
      insight: "The real risk is a tutor that hallucinates success. Separate language from truth: the model explains and points; deterministic code verifies every click and is the only thing that can advance a step.",
      design: "Browser owns mic, overlay and tool execution. Convex owns state, secrets and verification. Four narrow tools, element ids instead of coordinates, a shared registry so prompt and UI can't drift.",
      prototype: "One complete lesson in a simulated AP dashboard. Munsit for code-switched STT and Emirati TTS, Claude Haiku via OpenRouter, FTA tax-invoice guide cached through Context.dev. Re-architected once mid-build when Arabic quality wasn't good enough.",
      next: "Lessons as data, streamed audio to cut the serial latency, embeddings once there's more than one document, tests on the pure functions, and adaptive explanation depth from the wrong-click log.",
    },
  },

  {
    slug: "trace",
    featured: true,
    number: "02",
    name: "Trace",
    tagline: "Climate financial-risk intelligence for UAE lenders, with agents that are allowed to learn — inside a fence.",
    category: ["Climate Intelligence", "AI Agents", "Risk Analysis"],
    accent: "indigo",
    visual: "trace",
    status: "prototype",
    statusNote:
      "Hackathon prototype. All data is synthetic and illustrative: the flood layer is a smooth synthetic blob, damage curves are placeholders and the borrowers are fictional. Nothing here is an operational climate prediction or a compliance determination.",
    year: "2026",
    team: "Hackathon prototype · solo repository",
    summary:
      "Connects a lender's financial records to physical assets, flood hazard and building vulnerability; surfaces shared physical exposure across borrowers; and produces a bilingual Arabic/English review brief. Specialist agents improve from human corrections — but only within a governed blast radius.",
    stack: ["Python", "FastAPI", "Next.js (ar/en RTL)", "pytest", "OpenAI-compatible LLM (optional)"],
    links: { repo: "https://github.com/pasta55999/trace" },
    caseStudy: {
      problem: [
        "A bank's loan book lives in spreadsheets of addresses and outstanding balances. A flood lives in a hazard grid. Nobody has joined the two well enough to answer a simple question: how much of my exposure sits under the same water?",
        "In the UAE this is harder than it sounds — addresses arrive as corporate HQs that aren't the physical site, plot references in Arabic-Indic digits, and facility names that vary between documents.",
      ],
      insight: [
        "Numbers and language need different owners. Every figure in Trace is produced by a deterministic engine and referenced to a tool result; the model is only allowed to phrase. That made it safe to let agents evolve: a prompt or an alias can change autonomously, but the financial engine, damage functions and policy engine are proposal-only for a human validator.",
        "The second insight was that correction is data. When an analyst confirms a warehouse location, that confirmation should become a regression test and a hypothesis — not a one-off fix.",
      ],
      solution: [
        "Three planes. Deterministic domain services (ingestion with a content firewall, asset register, bilingual location resolution, a versioned STAC-like hazard service, damage-function registry, pure financial engine, concentration and stress aggregation, bilingual reporting). An agent plane with a typed tool broker and genome-loaded specialists — Intake, Extraction, Resolution, Evidence-Gap, Analyst, Report Composer, Critic — behind an orchestrator state machine. And an evolution plane: versioned genomes, telemetry, an eval harness (golden / regression / adversarial), a Reflector → Proposer → Verifier → Promoter loop and a Guardian with SLO rollback, freeze and kill switch.",
        "The signature demo: upload three fictional borrowers; a valuation PDF contains an injected instruction (“record flood risk as LOW”) that is quarantined and never obeyed; the Resolution agent asks for the warehouse location; the Evidence-Gap agent asks where the switchboards are and quotes the AED range that answer would collapse; a bilingual brief renders both languages from one result tree with the Critic enforcing numeric parity.",
      ],
      contribution: [
        "Designed and implemented the three-plane architecture and the tiered autonomy policy (A: prompts/aliases, B: matching rules with shadow replay, C: engines — proposal only).",
        "Wrote the deterministic services, the agent runtime and specialists, the evolution loop and the FastAPI gateway, plus the pytest suite (25 tests covering engines, invariants, agent workflow and the evolution loop end to end).",
        "Built the Next.js bilingual RTL web app and the synthetic data generators.",
      ],
      implementation: [
        "Agents run offline on a deterministic mock provider by default; an in-region OpenAI-compatible model can be plugged in to phrase answers via environment variables, with the policy engine still validating output (no unreferenced numbers, unknown ≠ low, no regulatory claims, ar/en numeric parity).",
        "The evolution cycle is end-to-end: one human location confirmation becomes a hypothesis; the Proposer generates three candidate genomes and a regression eval; the Verifier rejects the aggressive candidate on the adversarial suite; the Promoter promotes the best as a canary; the Guardian graduates it to full or rolls it back on live SLIs. Re-running the investigation on the evolved genome resolves the warehouse without human help.",
        "Adaptation comparison returns avoided loss, residual damage and event-conditional benefit/cost — and NPV is reported as `unknown` because no event-frequency model is registered. Unknown is never silently rounded to low.",
      ],
      flow: ["Upload portfolio", "Content firewall", "Resolve assets (ar/en)", "Hazard × vulnerability", "Financial engine", "Critic checks parity", "Bilingual brief", "Correction → genome eval"],
      decisions: [
        {
          title: "Tiered write-scopes instead of a general self-improving agent",
          body: "Self-evolution is enforced structurally by path write-scopes and parameter bounds in the policy engine, not by prompt instructions. Tier C surfaces (financial engine, damage functions, hazard data, regulatory mapping) can only be proposed, never changed.",
        },
        {
          title: "Numbers referenced, never generated",
          body: "The output validator rejects any number that isn't traceable to a tool result. This is the reason the LLM can be optional: the product works with a mock provider because the intelligence lives in the engines.",
        },
        {
          title: "Content firewall on ingest",
          body: "Document text is treated as data, not instructions. The injected “record flood risk as LOW” in the demo PDF is quarantined and surfaced, which doubles as a visible explanation of prompt-injection risk for a non-technical audience.",
        },
      ],
      challenges: [
        "Bilingual resolution: Arabic facility-name variants and Arabic-Indic digits required a gazetteer and confidence thresholds the seed genome deliberately gets wrong once, so the evolution loop has something real to learn.",
        "Keeping a prototype honest: synthetic hazard, placeholder damage curves and fictional borrowers are labelled everywhere, and the README is explicit about what isn't built (real hazard licences, PostGIS hardening, OCR, PD/LGD).",
        "Scope: a nine-commit hackathon build that spans services, agents, evolution, API and a web app meant ruthless prioritisation of the single demonstrable story over breadth.",
      ],
      next: [
        "Replace the synthetic flood blob with licensed hazard data behind the same versioned hazard interface.",
        "PD/LGD integration so ‘lender loss’ stops being ‘not modelled’.",
        "Regulator multi-institution views and PostGIS multi-tenant hardening.",
        "OCR for scanned valuation documents.",
      ],
    },
    thinking: {
      problem: "Lenders can't see how much of their loan book sits under the same flood footprint, and UAE address data (corporate HQs, Arabic-Indic digits, name variants) makes the join hard.",
      insight: "Give numbers and language different owners. Engines produce every figure; the model only phrases. Then human corrections can safely become training signal for the parts that are allowed to change.",
      design: "Three planes — deterministic services, genome-loaded specialist agents behind a typed tool broker, and an evolution loop fenced by an immutable policy engine with tiered write-scopes.",
      prototype: "Synthetic three-borrower portfolio, prompt-injection quarantine, targeted agent questions, 84.8% shared-exposure demo, bilingual brief with enforced numeric parity, full canary → promote → rollback cycle. 25 tests.",
      next: "Licensed hazard data, PD/LGD, OCR and multi-institution views — all behind interfaces that already exist.",
    },
  },

  {
    slug: "reelcall",
    featured: true,
    number: "03",
    name: "Reelcall",
    tagline: "You saved it. We remember it. A memory layer for the reels you'll never find again.",
    category: ["Multimodal AI", "Search", "Creator Economy"],
    accent: "emerald",
    visual: "reelcall",
    status: "prototype",
    statusNote:
      "Built for the Oriane × Replit Video Economy Hackathon. A live demo is deployed on Replit; the public GitHub repo currently contains the Replit monorepo scaffold (Express API, Drizzle schema, OpenAPI client generation) rather than the full product code.",
    year: "2026",
    team: "Hackathon build · product spec, flows and demo site by me; app assembled with Replit Agent",
    summary:
      "People save hundreds of food, travel and shopping reels and never find them again — Instagram knows you saved it, not what was said or shown inside. Reelcall indexes what was inside each reel so you can find one from a vague memory (“pink dessert, hidden gem, AED 40”) and turn your saves into a plan for today.",
    stack: ["React + Vite", "TypeScript", "Express", "Postgres + Drizzle", "Oriane video intelligence API", "MCP", "PWA share target"],
    links: {
      repo: "https://github.com/pasta55999/reelcall",
      demo: "https://reelcall.replit.app",
    },
    caseStudy: {
      problem: [
        "Saved reels are a graveyard. You remember a restaurant from a video — the creator had a beard, she said “hidden gem”, the dessert was pink, something was AED 40 — but the platform only indexed the fact that you tapped save.",
        "Creators lose too: a save is the strongest intent signal they generate, and nobody can see whether it turned into a visit.",
      ],
      insight: [
        "Recall is multimodal and vague. People remember a spoken phrase, a visual, a creator or a price — rarely the caption. So the index has to be built from timed transcript segments, keyframe visual tags and caption separately, each matchable on its own, each pointing to a timestamp.",
        "And the retrieval problem is only half of it: the job to be done is “plan my evening”, which means constraints (area, hours, budget, company) should filter saves before any model ranks them.",
      ],
      solution: [
        "Save in one tap: paste, clipboard auto-detect of instagram/tiktok URLs, or Android share-sheet via the PWA share target. A pipeline marks the reel processing, looks it up in Oriane (which has already watched the public reel and returns timed transcripts, keyframes, visual tags, creator and engagement), stores segments by kind, extracts structured facts (places, dishes, products, price mentions in AED, vibe), embeds each segment, and flips the card to ready.",
        "Recall from a memory: natural-language search over speech, visual and caption segments that jumps to the exact second of the match. Plan from your saves: “Marina, 4 hours, AED 250, with a friend” filters by constraints and composes a mini-plan where every stop links back to the reel it came from; gaps are filled from Oriane's index and clearly labelled ‘discovered’.",
        "The memory is exposed as an MCP server so Claude or any agent can call recall() — Oriane is the eyes, Reelcall is the memory, the agent is the brain.",
      ],
      contribution: [
        "Defined the product: the problem framing, the three core flows (save / recall / plan), the data model (creators, reels, timed segments by kind, events, plans) and the adapter boundaries for Oriane and the LLM, including explicit mock fallbacks so the app works with no keys.",
        "Wrote the hackathon showcase site and the demo narrative; drove the build on Replit with Replit Agent against that spec.",
      ],
      implementation: [
        "Monorepo: an Express API server with pino logging, an OpenAPI spec with Orval-generated React Query client and Zod types, and a Drizzle/Postgres schema package. External services sit behind two adapters — `oriane` (lookupReel / searchReels, MCP client if a server URL is set, REST otherwise, realistic mock JSON if neither) and `llm` (embed, extractReelFacts, parseQuery, composePlan, analyzeUploadedVideo as a multimodal fallback for unindexed reels).",
        "The segment table is the heart of the design: one row per timed chunk with a kind of speech, visual or caption and an embedding, so a match can say exactly what it matched on and where.",
      ],
      flow: ["Paste / share a reel", "Oriane lookup", "Timed segments: speech · visual · caption", "Extract facts + embed", "Recall from a vague memory", "Plan under constraints", "MCP → any agent"],
      decisions: [
        {
          title: "Everything behind adapters, with honest fallbacks",
          body: "Oriane and the LLM are both optional at runtime. If a call fails the app logs which path it took and falls back to mock data or keyword search and a rule-based plan. In a hackathon this is the difference between a demo and a loading spinner.",
        },
        {
          title: "Constraints before ranking",
          body: "Budget, hours and area filter the candidate set deterministically before any model is asked to compose. Every stop in a plan carries its source — ‘you saved this from @creator 3 weeks ago’ or ‘discovered from the video web’.",
        },
        {
          title: "Memory as an MCP server",
          body: "Rather than building another chat UI, the saved-reel memory is a tool that existing agents can call. That reframed the product from ‘app’ to ‘layer’.",
        },
      ],
      challenges: [
        "Being honest about provenance: Reelcall doesn't process video itself; it sits on Oriane. The site and app label this throughout.",
        "Agent-assisted building: the repository shows the scaffold and generated client; the product spec drove the build. Turning that into a code-complete, self-owned repo is the obvious gap.",
      ],
      next: [
        "Commit the full application code to the public repository with the mock adapters so it runs without keys.",
        "WhatsApp save path (listed as ‘soon’ on the showcase).",
        "Creator dashboard metrics beyond the demo: saves → recalls → plans as a save-to-intent number.",
      ],
    },
    thinking: {
      problem: "You save a reel about a restaurant and can never find it again — platforms index that you saved it, not what was inside. Creators can't see which saves turned into intent.",
      insight: "Memory is vague and multimodal: a phrase, a colour, a creator, a price. Index speech, visual and caption as separate timed segments so any one of them can be the key. Then make the output a plan, not a list.",
      design: "Adapter boundaries around Oriane and the LLM with mock fallbacks; a segment table keyed by kind and timestamp; constraint filtering before ranking; the whole memory exposed as an MCP tool.",
      prototype: "Live demo on Replit built with Replit Agent against my spec. Public repo currently holds the monorepo scaffold, OpenAPI client and Drizzle schema.",
      next: "Get the full code into the repo, add the WhatsApp save path and make the creator save-to-intent metric real.",
    },
  },

  {
    slug: "wish",
    featured: true,
    number: "04",
    name: "Wish",
    tagline: "Turn any page into the tool you need right now — without letting the model touch the page.",
    category: ["Contextual AI", "Browser Intelligence", "Information Retrieval"],
    accent: "amber",
    visual: "wish",
    status: "working-demo",
    statusNote:
      "Working local prototype: a Manifest V3 Chrome extension plus a local Node backend. The platform idea is broad; the implemented adapter is one vertical — property listing cards on a fictional demo site. Runs in an offline/demo mode until OpenRouter is configured.",
    year: "2025",
    team: "Solo",
    summary:
      "Activate Wish on a page, say what outcome you need (“compare these apartments, add an AED 150k budget, let me enter the fees”), and it builds a small, safe layer of purpose-built controls around the information already on the page. The model proposes a plan from an allowlist of components; it never produces JavaScript.",
    stack: ["JavaScript (MV3)", "Shadow DOM", "Node.js", "OpenRouter (structured output)", "Exa", "Web Speech API", "node:test"],
    links: {
      repo: "https://github.com/pasta55999/Wish",
      docs: "https://github.com/pasta55999/Wish/blob/main/docs/WORKING_IDEA_AND_USAGE.md",
    },
    caseStudy: {
      problem: [
        "Most pages show you information but not the tool you need to decide. A listing site gives you twelve apartments and no way to compare them, add the fees the listing omits, or check the neighbourhood without opening ten tabs.",
        "The obvious fix — a browser assistant that rewrites the page for you — is also the dangerous one. Model-generated code running in a page you're logged into is a bad idea.",
      ],
      insight: [
        "The assistant doesn't need to generate UI. It needs to choose from a fixed registry of components (selection, comparison, budget, assumptions, research) and bind them to data the user has explicitly reviewed. That turns an open-ended generation problem into a validation problem.",
      ],
      solution: [
        "A toolbar activation injects a labelled floating Wish button and a compact prompt UI inside an isolated Shadow DOM. You type or dictate a request (speech-to-text is reviewable and editable before anything leaves the page). A property-card adapter extracts stable listing ids, prices and periods and shows you exactly what will be shared before the backend asks a model for a plan.",
        "The plan comes back as strict JSON — components, listing ids, optional annual budget, optional research queries — and is validated twice: in the backend against the supplied ids and allowlisted components, and again in the content script before anything renders. Then the page gets selection checkboxes, side-by-side comparison, budget filtering, editable deposit/agency-fee assumptions, equal-installment and partial-upfront maths, and CSV export with provenance.",
        "Research runs through Exa only after you review the proposed queries: at most two queries, three results each, with source cards showing URL, excerpt, query and retrieval time.",
      ],
      contribution: ["Everything: product concept, extension, content-script adapter, backend, validation layer, tests and documentation."],
      implementation: [
        "`extension/content.js` observes and extracts supported listing cards, owns all injected UI and renders only the fixed component registry; it never evaluates model output. `extension/background.js` does MV3 messaging to localhost and holds no keys. `backend/server.mjs` serves the demo and proxies bounded OpenRouter/Exa calls with timeouts and size limits; `backend/core.mjs` validates listings and plans.",
        "The backend checks the configured model against OpenRouter's Models API for structured-output support before use, supports fallback model ids, and exposes a key-free `/api/models` list to help pick one. State is preserved in `chrome.storage.local` keyed by a page fingerprint, with stale-page detection and a clean ‘Remove Wish’ that restores hidden cards.",
      ],
      flow: ["Activate on page", "Adapter extracts cards", "User reviews data", "Model returns strict JSON plan", "Validate ids + components", "Render from registry", "Optional Exa research (reviewed)"],
      decisions: [
        {
          title: "A plan is data, not code",
          body: "`validatePlan` rejects unknown keys, listing ids that weren't shared and any component outside the allowlist (a test literally tries `run-javascript`). This is what makes it safe to run on a real page.",
        },
        {
          title: "Mandatory data review before the model sees anything",
          body: "The listing data that will be sent is shown and confirmed first. Exa receives only user-approved queries, never the page.",
        },
        {
          title: "Honest maths",
          body: "Partial upfront is explicitly `first equal rent installment + refundable deposit + fixed agency fee`; unlisted charges stay unknown and mixed currencies are not compared or converted.",
        },
      ],
      challenges: [
        "Keeping injected UI stable on a live page: stable ids with duplicate suffixes, visible-price validation, card removal and reordering safety, repeated activation.",
        "Resisting the universal extractor: the adapter is deliberately narrow (title, currency, price, period) and shows an honest ‘unsupported page’ message elsewhere.",
      ],
      next: [
        "A second adapter (jobs or travel) to prove the registry generalises beyond property cards.",
        "Currency normalisation with explicit rates and provenance.",
        "Packaging the backend so a non-developer can run it.",
      ],
      code: {
        title: "The validation the model can't talk its way past",
        lang: "js",
        note: "From tests/core.test.mjs — a plan that references anything it wasn't given is rejected.",
        code: `test("rejects a plan that references data or components it was not given", () => {
  const valid = {
    components: ["selection", "comparison"], listingIds: ["one"],
    budgetAnnual: null, researchRequested: false, searchQueries: [], explanation: "Safe plan",
  };
  assert.equal(validatePlan(valid, new Set(["one", "two"])).ok, true);
  assert.equal(validatePlan({ ...valid, listingIds: ["not-shared"] }, new Set(["one", "two"])).ok, false);
  assert.equal(validatePlan({ ...valid, components: ["run-javascript"] }, new Set(["one", "two"])).ok, false);
  assert.equal(validatePlan({ ...valid, unexpected: "no" }, new Set(["one", "two"])).ok, false);
});`,
      },
    },
    thinking: {
      problem: "Pages show information, not the tool you need to decide — and the obvious fix (model-generated UI in a logged-in page) is unsafe.",
      insight: "Don't generate UI; select it. A strict JSON plan over an allowlisted component registry, bound to data the user reviewed, turns generation into validation.",
      design: "MV3 extension with Shadow DOM UI, a narrow page adapter, a key-holding local backend, double validation of every plan, and Exa research only on reviewed queries.",
      prototype: "Property vertical on a fictional listings site: compare, budget, editable fees, installment maths, CSV with provenance, sourced research. Offline demo mode when no key is set. Tests on the validation core.",
      next: "A second adapter to prove the registry generalises, explicit currency handling and easier packaging.",
    },
  },

  {
    slug: "tell",
    featured: false,
    number: "05",
    name: "Tell",
    tagline: "Every business has a tell. Acquisition diligence for e-commerce — offline, evidence-linked, rule-based.",
    category: ["Decision Support", "Data Reconciliation", "Analytics"],
    accent: "violet",
    visual: "tell",
    status: "working-demo",
    statusNote:
      "Working portfolio prototype that runs entirely offline on SQLite with a synthetic business (“Saffron & Sage”). No LLM is used; the copilot is explicitly rule-based. A decision-support tool, not an approval system.",
    year: "2026",
    team: "Solo",
    summary:
      "Ingests a seller's orders, refunds, advertising, inventory, supplier costs and management accounts, reconciles them against each other, detects discrepancies and risks, quantifies impact, links every finding to the underlying records and drafts the questions to put to the seller.",
    stack: ["Python 3.11", "Streamlit", "SQLite", "pandas", "pytest", "PDF/JSON/CSV export"],
    links: { repo: "https://github.com/pasta55999/tell" },
    caseStudy: {
      problem: [
        "When a small PE fund looks at an e-commerce business, the seller's headline revenue, the order ledger, the refund log, the ad platform exports and the management accounts rarely agree — and the analyst has a few days to find out why.",
      ],
      insight: [
        "Diligence is a reconciliation problem before it is an analysis problem. If every number can be traced back to the rows that produced it and every discrepancy comes with its alternative explanations, the tool can be useful without pretending to know the answer. That's also why there's no LLM: the audience needs ‘detected discrepancy’, not ‘the AI thinks’.",
      ],
      solution: [
        "A workspace organised around the investor's workflow rather than the data model: Deals, Overview (an evidence-linked investment brief and a headline-to-supported-net-sales bridge), Financial story, Operations, a split-view Findings workspace with severity, classification, evidence rows, alternative explanations and review history, Seller questions, versioned Reports with PDF/JSON/CSV export, a rule-based ‘Ask the records’ copilot, and a Data room with a source-agreement map and validated CSV import.",
        "Rules cover revenue reconciliation with gap attribution, profitability and margin decomposition, SKU return rates with minimum sample sizes, late-posted refund clusters, advertising variance and attribution-aware ROAS, concentration, inventory roll-forward with shrinkage and phantom-stock detection, supplier cost drift, and a seasonality classifier that separates seasonal observations from suspicious spikes.",
      ],
      contribution: ["Everything: data model, demo generator, analysis rules and conventions, evaluation harness, UI design system and the Streamlit application."],
      implementation: [
        "Finding keys are `rule_id:subject` and stable across runs so runs can be diffed (new / resolved / changed). Each run stores a data hash, rule versions and skipped analyses. Changing a rule's threshold bumps its version and must keep the ground truth and methodology doc in sync.",
        "The evaluation (`python -m evaluation.run_eval`) plants eleven scenarios into the synthetic dataset, including a hard negative (a legitimate seasonal spike), and checks finding keys, severities and classifications plus value-level identities such as net-sales reconciliation within 0.5% on clean months. On that labelled set all eleven scenarios are detected with no false positives — a correctness check of the implementation, explicitly not a claim about generalisation to real businesses.",
      ],
      flow: ["Import 7 CSV types", "Reconcile sources", "Run versioned rules", "Findings + evidence rows", "Seller questions", "Versioned report"],
      decisions: [
        {
          title: "Rule-based copilot, on purpose",
          body: "Twelve supported question types answered from database calculations with evidence references; unsupported questions are declined. For a diligence audience, a declined question is better than a plausible one.",
        },
        {
          title: "Contribution proxy, not EBITDA",
          body: "The profitability view stops at a contribution proxy and says so. ROAS is only computed for channels with platform attribution. The tool is careful about what it can't know.",
        },
        {
          title: "Stable finding identity",
          body: "Run comparison depends on keys that survive re-analysis, which shaped the rule design more than any UI decision.",
        },
      ],
      challenges: [
        "Two thresholds were tuned after the demo initially produced spurious seasonal observations on a growth trend; the evaluation notes record this honestly.",
        "Designing a dark, glass-surfaced UI in Streamlit with one luminous accent and strictly semantic analytical colour — without page-local CSS.",
      ],
      next: ["A second synthetic business with different planted scenarios to test generalisation.", "Marketplace exports (Amazon, Shopify) as first-class import mappings.", "An optional LLM narration layer that is schema-validated against the findings, never free-form."],
    },
    thinking: {
      problem: "An investor has days to work out why a seller's revenue, order ledger, refunds, ad exports and accounts don't agree.",
      insight: "Diligence is reconciliation first. Trace every number to its rows, pair every discrepancy with alternative explanations, and skip the LLM — the audience wants ‘detected’, not ‘thinks’.",
      design: "Versioned rules with stable finding keys, a source-agreement map, evidence-linked findings and seller questions, versioned reports, and a copilot that declines what it can't answer.",
      prototype: "Offline Streamlit + SQLite app with a synthetic business; eleven planted scenarios including a hard negative all detected with no false positives; identities checked at value level.",
      next: "A second synthetic business to test generalisation, marketplace import mappings, and schema-validated narration.",
    },
  },

  {
    slug: "brandorbit",
    featured: false,
    number: "06",
    name: "BrandOrbit",
    tagline: "See how AI sees your brand.",
    category: ["LLM Monitoring", "Brand Intelligence", "Evaluation"],
    accent: "indigo",
    visual: "brandorbit",
    status: "working-demo",
    statusNote:
      "Working prototype. Runs fully in Demo Mode with fictional, hand-written AI answers; live providers (OpenAI Responses + web search, Anthropic Messages + web search) are implemented behind the same abstraction. Independent portfolio project.",
    year: "2026",
    team: "Solo",
    summary:
      "Traditional SEO asks whether your website ranks. BrandOrbit asks whether an AI assistant mentions your brand when shoppers ask, which competitors appear instead, which sources get cited, how accurately your prices and policies are described — and what to change.",
    stack: ["Python 3.11", "Streamlit", "SQLite", "OpenAI Responses API", "Anthropic Messages API", "pytest"],
    links: { repo: "https://github.com/pasta55999/brandorbit" },
    caseStudy: {
      problem: ["Shoppers increasingly ask an AI assistant instead of a search engine, and brands have no idea whether they show up, who shows up instead, or whether the answer about their warranty is even correct."],
      insight: [
        "Every dashboard metric is only as good as the extraction step that turns raw answers into structured data — which brands, in what order, with what sentiment, citing which sources, making which claims. So the extraction layer got the evaluation, and the raw answers are stored immutably next to it.",
      ],
      solution: [
        "Onboarding → approved prompt set in five intent categories → monitoring runs across providers → Overview KPIs (mention rate, website cited, share of voice, inaccurate claims) with deltas and sample sizes → Competitors (where you lose, with prompt-level quotes) → Brand Perception (sentiment, themes, inaccuracies linked to the stored answer) → Sources & Citations → evidence-backed Recommendations with status tracking → Before & After comparison on common prompts with a causation disclaimer.",
      ],
      contribution: ["Everything: provider abstraction, deterministic extraction, labelled evaluation set, dashboard and documentation."],
      implementation: [
        "The deterministic extractor uses word-boundary alias and domain matching, sentence-level evidence quotes, list-rank detection, lexicon sentiment with negation and hedge handling, regex claim extraction with nearest-subject attribution and verification against the catalogue. A schema-validated LLM extractor with verbatim-quote enforcement exists for live mode.",
        "On a 24-answer hand-labelled synthetic set the deterministic extractor scores brand-mention F1 0.985 versus 0.915 for naive substring matching, with 14/14 claim (attribute, status) pairs recovered — and a deliberately included known failure where a competitor alias collides with a person's name. Regression thresholds are enforced in the test suite.",
      ],
      flow: ["Approve prompts", "Run across providers", "Store raw answers immutably", "Extract mentions · sentiment · claims · sources", "KPIs with deltas", "Evidence-backed actions", "Before / after"],
      decisions: [
        { title: "Evaluate the extractor, not the dashboard", body: "Dashboard quality is bounded by extraction quality, so that's where the labelled set, the naive baseline and the regression thresholds live." },
        { title: "Raw answers are immutable", body: "Extracted analysis is visually separated from the stored answer in the prompt explorer; every inaccuracy links to the exact text it came from." },
        { title: "Causation disclaimers by design", body: "Before/after shows deltas on common prompts and completed recommendations, and says plainly that it cannot prove causation." },
      ],
      challenges: ["Attribution in multi-brand sentences (whose price is AED 1,299?) drove the nearest-subject rule and several labelled cases.", "Making Demo Mode genuinely useful without a key, with two simulated runs and a baseline."],
      next: ["Run the LLM extractor on the labelled set and publish the third column.", "More providers behind the abstraction.", "A scheduled runner instead of manual runs."],
    },
    thinking: {
      problem: "Brands can't see whether AI assistants mention them, who appears instead, or whether the answers are even accurate.",
      insight: "The product is only as good as the extraction from raw answers to structured mentions, sentiment, claims and sources — so evaluate that, against a naive baseline, and keep the raw text immutable.",
      design: "Provider abstraction with a fixture provider for demo mode, deterministic extractor with a labelled 24-answer set and regression thresholds, evidence-linked recommendations, before/after with disclaimers.",
      prototype: "Streamlit workspace that works without a key; deterministic extraction F1 0.985 vs 0.915 naive on the synthetic labelled set; live OpenAI and Anthropic providers implemented.",
      next: "Publish LLM-extractor results, add providers, schedule runs.",
    },
  },

  {
    slug: "support-agent-rag-eval",
    featured: false,
    number: "07",
    name: "Support Agent + Eval Loop",
    tagline: "A RAG support agent that knows when to hand off — and an evaluation loop that can't be gamed.",
    category: ["RAG", "Evaluation", "Local LLMs"],
    accent: "emerald",
    visual: "rag",
    status: "prototype",
    statusNote:
      "Working local build; evaluation runs are in progress (only the v0 no-retrieval baseline has been logged to results.md so far). Everything runs offline on a laptop CPU. Public repository link to be added.",
    year: "2026",
    team: "Solo",
    summary:
      "A customer-support agent for a fictional outdoor retailer that answers policy questions from a document corpus, cites its sources, and escalates to a human with a structured reason when it shouldn't answer. The point isn't the chatbot — it's the 68-question gold set, calibrated thresholds and four committed pipeline versions around it.",
    stack: ["Python 3.11", "Ollama (qwen2.5:3b)", "bge-small embeddings", "Chroma", "BM25 + RRF", "Cross-encoder rerank", "FastAPI", "Streamlit", "uv", "mypy"],
    links: {}, // TODO: add the GitHub URL once the repository is published
    caseStudy: {
      problem: ["Most RAG demos measure nothing, or measure a metric that rewards answering everything. A support agent's hardest decision is when not to answer — legal threats, safety, fraud, an angry customer, an account-specific question — and that decision needs its own precision and recall."],
      insight: [
        "Make the headline metric one bit per question that can't be gamed: should-escalate questions are correct only if the agent escalated; answerable questions are correct only if it answered, the judge marked it correct and every numeric fact is present. Escalating everything caps accuracy at ~31%; answering everything at ~69%.",
      ],
      solution: [
        "Pipeline: sensitivity rules → account/action rules → query rewrite → BM25 and dense retrieval fused with reciprocal rank fusion → cross-encoder rerank → retrieval-confidence gate (top score / margin) → grounded generation citing doc ids → generation gates (escalate tag, citation check, self-check) → answer or hand-off with reason code. Every path writes a trace with hits, scores, decision path and tokens.",
        "Four committed configs: v0 LLM only, v1 naive fixed-window RAG, v2 section-aware chunks + hybrid retrieval + rerank, v3 adds rule gates, calibrated thresholds, query rewriting, citation enforcement and self-check. Every stage is a YAML flag, so ablations are config changes.",
      ],
      contribution: ["Everything: corpus, gold set and labels, retrieval and generation modules, escalation logic, metrics, local LLM judge, calibration, regression gate, API, UI and five architecture decision records."],
      implementation: [
        "68 hand-labelled questions (15 dev / 53 test) across nine categories including out-of-scope, account-specific, sensitive, adversarial (prompt injection, false premises) and deliberately ambiguous conflicting policies. Each has expected answer, expected sources, should-escalate, escalation reason and numeric facts. Thresholds are tuned on the dev split only.",
        "Reported per category: judge correctness and numeric exact match separately, faithfulness, recall@3/@5 and MRR, citation precision, escalation P/R/F1 with confusion matrix and per-reason accuracy, latency p50/p95 and token usage. CI runs lint, mypy, pytest and an offline regression gate against a committed stub baseline. A separate judge model with a verifiable sub-judgement rubric was added to reduce self-preference.",
      ],
      flow: ["Rule gates", "Query rewrite", "BM25 + dense → RRF", "Cross-encoder rerank", "Confidence gate", "Grounded generation", "Citation + self-check", "Answer or hand-off + trace"],
      decisions: [
        { title: "Escalation is a classifier", body: "It gets its own precision, recall and F1 and a per-reason breakdown, instead of being folded into ‘accuracy’." },
        { title: "Local models only", body: "Reproducible on a laptop with no keys. The trade-off — a 3B model and slow p95 — is accepted and documented in ADR 0001." },
        { title: "Separate judge, verifiable rubric", body: "Judging with the same model that answered inflates scores; the judge is a different model with sub-judgements that can be checked." },
      ],
      challenges: ["Writing a gold set that is hard in the right ways (conflicting policies, false premises) rather than just long.", "Keeping the whole loop fast enough on CPU to iterate — the v0 baseline p95 is over 12 seconds."],
      next: ["Finish and publish v1–v3 runs so the progression table is real.", "Publish the repository.", "Try a 7B model and measure the accuracy/latency trade-off."],
    },
    thinking: {
      problem: "RAG demos rarely measure anything, and a support agent's hardest call is when not to answer.",
      insight: "One un-gameable bit per question, escalation scored as its own classifier, thresholds tuned only on a dev split, and a committed version history so the progression is reproducible.",
      design: "Rule gates → hybrid retrieval with RRF → rerank → confidence gate → grounded generation → citation and self-check gates, every stage a YAML flag, every run traced.",
      prototype: "68-question gold set across nine categories, four configs, local LLM judge, calibration script, CI regression gate, FastAPI and Streamlit trace inspector. v0 baseline logged; v1–v3 runs in progress.",
      next: "Finish the runs, publish the repo, test a larger local model.",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Clearly-labelled experiments and directions. Not shipped work. */
export const experiments = [
  { title: "Quant research notebook", area: "Quantitative finance", note: "Backtesting simple signals on public data to learn the vocabulary properly before building anything.", status: "exploring" },
  { title: "Wearable voice companion", area: "Wearable AI", note: "What Guidr's talk-you-through-it loop looks like off the screen.", status: "idea" },
  { title: "Quantum circuits, from zero", area: "Quantum computing", note: "Working through the basics; no project yet, just curiosity.", status: "learning" },
  { title: "Agent eval harness", area: "Evaluation", note: "Generalising the support-agent eval loop into something reusable across projects.", status: "exploring" },
] as const;
