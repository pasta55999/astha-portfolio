# Astha Chauhan — portfolio

Personal portfolio for Astha Chauhan, Generative AI Engineer, Dubai. Next.js 16 (App Router, cache components), TypeScript, Tailwind v4, Framer Motion, Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```

## Where the content lives

Everything visible is driven by data files — no copy is hard-coded in components.

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, headline, intro, about copy, "things I'm exploring", links (email / LinkedIn / resume / portrait), current-focus indicator |
| `src/data/projects.ts` | Every project: card copy, status, stack, links, full case study, and the "Inside My Thinking" stages. Add an entry and it appears in the showcase, the explorer, `/projects` and gets its own `/projects/[slug]` page |
| `src/data/experience.ts` | Timeline. Items render only when `verified: true` |
| `src/data/skills.ts` | Skill groups; each skill links to the project slug that demonstrates it |

### Things still to fill in (search for `TODO`)

- `profile.email`, `profile.linkedin`, `profile.twitter` — hidden until set
- `profile.resume` — drop a PDF in `public/` and set the path
- `profile.portrait` — drop an image in `public/` and set the path (a monogram card is shown otherwise)
- `profile.siteUrl` — used for Open Graph metadata
- `experience.ts` — company name, dates, university; the Guidr entry's event name / award once verified
- `projects.ts` — Guidr collaborators if it was a team entry; a public repo URL for the support-agent eval project

## Structure

```
src/app                 routes: /, /projects, /projects/[slug], not-found, icon, OG image
src/components          Hero + SystemCanvas, ProjectShowcase, ProjectVisual (per-project UI mockups),
                        ThinkingExplorer (signature feature), About, Experience (+Skills), Contact, Nav, Footer
src/data                all content
```

Design tokens are CSS variables in `src/app/globals.css` (ink / paper / lime / coral / cobalt / amber). Display type is Instrument Serif; body is Geist; mono is Geist Mono.

Reduced motion is honoured globally via `MotionConfig` and a CSS fallback; the hero canvas renders a static frame under reduced motion.
