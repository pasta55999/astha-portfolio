<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Dev: `npm run dev`. Verify: `npm run lint && npx tsc --noEmit && npm run build`.
- All content is in `src/data/*.ts`; components should not hard-code copy. Never invent metrics, awards or links — leave a `TODO` and hide the item instead.
- Next 16 cache components: avoid `new Date()`/`Math.random()` in server components; `params` must be awaited inside a `<Suspense>` boundary (see `src/app/projects/[slug]/page.tsx`).
- Eyebrow text starting with `//` must be wrapped in a string expression (`{"// 01. About"}`) or ESLint flags it as a JSX comment.
- Section wrappers are `position: relative`, so compute scroll positions with `getBoundingClientRect().top + scrollY`, not `offsetTop`.
- `lucide-react` v1 has no brand icons; GitHub/LinkedIn live in `src/components/BrandIcons.tsx`.
- Reduced motion: `MotionConfig reducedMotion="user"` in `src/components/Providers.tsx` — don't gate `initial` props on `useReducedMotion()` (causes hydration mismatches).
