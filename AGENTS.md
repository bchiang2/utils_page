**Code Style**

- TypeScript strict: explicit types, type-only imports with `verbatimModuleSyntax`.
- ESNext modules, React 19 auto-JSX runtime (no `import React`).
- Aliases: `@/*` for `src/*`.
- Functional components + hooks; small, focused files.
- Prefer composition: page `index.tsx` + local components/hooks.
- Debounce expensive work (e.g., persistence, validation).
- Minimal comments; readable names; PascalCase components, camelCase vars.
- UI imports from `@/components/ui/*` (cva variants), icons via `lucide-react`.

**Design Style**

- Utility-first Tailwind; rely on `cva` for variants.
- Full-bleed layouts; fill viewport below nav: `h-[calc(100vh-64px)]`.
- Editor areas use `flex-1 min-h-0 overflow-hidden` + Monaco `automaticLayout`.
- Sidebars as fixed-width flex columns with scroll (`flex-1 overflow-y-auto`).
- Clear affordances: buttons with icons, disabled states, status badges.
- Light, unobtrusive borders; muted neutrals; minimal chrome.

**Architecture**

- Feature folders under `src/pages/<Feature>` with `index.tsx` entry.
- Shared utilities in `src/lib/*` (e.g., `notes`, `json_utils`).
- Persistence via versioned `localStorage` schema; pure helpers for load/save.
- State hooks encapsulate business logic (`useNotes`) and debounce saves.

**Routing**

- React Router with `BrowserRouter` and `basename={import.meta.env.BASE_URL}`.
- Vite `base` set to `/utils_page/` on build, `/` in dev.
- Keep absolute app routes (e.g., `/json-utils`); basename prefixes on build.
- Works locally and on GitHub Pages subpath without code changes.

**Conventions**

- Exports: default for pages, named for components/utils.
- No fixed heights; prefer flex layout. Use constants sparingly (nav height).
- Build/lint/format via Vite, ESLint, Prettier; keep code warning-free.
