# Astha Chauhan — portfolio

Personal portfolio for Astha Chauhan, Generative AI Engineer, Dubai. Next.js 16 (App Router, cache components), TypeScript, Tailwind v4, Framer Motion, Lucide.

Visual language follows the reference portfolio (deep violet-black `#05010f`, violet/indigo gradient accents, glass cards, Sora + Inter + Caveat). Background videos in the reference are replaced here with CSS nebula glows and a canvas starfield.

## Deploying (GitHub Pages)

Pushing to `main` runs `.github/workflows/pages.yml`, which builds a static export (`output: "export"`) with `NEXT_PUBLIC_BASE_PATH=/<repo>` and publishes it to `https://pasta55999.github.io/<repo>/`. Leave `NEXT_PUBLIC_BASE_PATH` unset for local dev or a custom domain (then also set `NEXT_PUBLIC_SITE_URL`).

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

Design tokens are CSS variables in `src/app/globals.css`. Display type is Sora; body is Inter; handwritten accents are Caveat; mono is Geist Mono.

Reduced motion is honoured via CSS (`.reveal`, keyframes) and `MotionConfig`; the starfield renders a static frame under reduced motion.
