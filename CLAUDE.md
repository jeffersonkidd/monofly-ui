# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`monofly` is a React component library distributed as a **Figma Make kit**. It is built with Vite in *library mode*: the published artifact is a single ESM bundle (`dist/index.js`) plus one stylesheet (`dist/styles.css`), with React kept external so the host (Figma Make, or any consuming app) supplies its own copy via the esm.sh CDN.

**Two styling systems coexist.** The original component layer is derived from Figma's Simple Design System (SDS) — styled via `--sds-*` CSS custom properties (see `src/theme.css`) with co-located `*.css` files, built on `react-aria-components`. A newer **Tailwind v4 + shadcn** layer was added on top (sidebar, breadcrumb, collapsible, separator, the `Sidebars` composition, and the `templates/`). These use Tailwind utility classes + Radix primitives (`radix-ui`, `lucide-react`, `class-variance-authority`) and the `cn()` helper in `src/ui/lib/utils.ts`. Tailwind is wired via `@tailwindcss/vite` (`src/tailwind.css`, imported from `index.css`). When adding a component, match the styling system of the layer you're editing — don't mix SDS tokens and Tailwind utilities in one file.

## Commands

```bash
npm install          # install dev deps (React 18, Vite, react-aria-components)
npm run dev          # Vite dev server on http://localhost:8000 (runs src/main.tsx → App.tsx)
npm run build        # emit dist/index.js + dist/styles.css (library build)
npm publish          # prepublishOnly runs the build automatically
npm pack --dry-run   # verify the published tarball — should list only package.json, README.md, dist/
```

There is **no test runner and no lint script**. Type safety comes from `tsconfig.json` (strict mode, `noUnusedLocals`/`noUnusedParameters`), but `noEmit` is set — the only type-check is whatever Vite/the editor surface; there is no standalone `tsc` check wired into a script.

## Architecture

Two distinct surfaces share one `src/` tree:

1. **The dev/preview app** — `src/main.tsx` mounts `src/App.tsx`, which composes the blocks in `src/ui/blocks/` inside `<AllProviders>`. This is what `npm run dev` serves and is *not* part of the published package.
2. **The library** — the Vite build entry is `src/index.js` (see `vite.config.js` `build.lib.entry`). This barrel re-exports every `src/ui/*` layer (`blocks`, `primitives`, `layout`, `compositions`, `icons`, `images`, `hooks`, `templates`, `lib`) plus the `data/` layer, and is what consumers import (`import { Button } from 'monofly'`). When you add a new component folder or layer, export it here or it won't ship.

### Layered structure under `src/ui/`

- `primitives/` — leaf components. SDS ones (Button, Input, Dialog, …) live in their own folder with a co-located `*.css`, built on `react-aria-components` + `clsx`. shadcn ones (`sidebar.tsx`, `breadcrumb.tsx`, `collapsible.tsx`, `separator.tsx`) are single flat files styled with Tailwind utilities + Radix.
- `layout/` — Flex, Grid, Section.
- `compositions/` — multi-primitive assemblies (Cards, Headers, Footers, Forms, Heroes, Panels, Sidebars).
- `templates/` — page-level shells (`AppTemplate`, `AuthTemplate`, `BrandTemplate`, `DashboardShell`). Tailwind/shadcn-based; `.figma/` holds Code Connect mappings.
- `blocks/` — page-level sections used by the preview app (PricingGrid, ProductGrid, FAQs, …).
- `icons/` — one component per icon (`IconArrowRight`, etc.), styled by `src/icons.css`.
- `lib/` — shared utilities: `AnchorOrButton` and the `cn()` class-merge helper (`clsx` + `tailwind-merge`). *Renamed from the former `utils/`; the alias is now `lib`.*
- `hooks/`, `images/` — shared helpers (e.g. `useMediaQuery`).

### Data layer — `src/data/`

A self-contained context/provider/hook/service stack with **mock services** (no real backend):

- `types/` → domain models (auth, pricing, products)
- `services/` → mock async APIs (simulated latency, hardcoded responses)
- `contexts/` + `providers/` → React context per domain; `providers/AllProviders.tsx` nests Auth → Pricing → Products
- `hooks/` → `useAuth`/`usePricing`/`useProducts`, each throws if used outside its provider

Wrap any app/tree consuming this data in `<AllProviders>` (or compose individual providers).

### Path aliases (must stay in sync across two files)

Bare-specifier aliases (`primitives`, `compositions`, `data`, `hooks`, `icons`, `layout`, `templates`, `lib`, etc.) are defined in **both** `tsconfig.json` (`paths`) and `vite.config.js` (`resolve.alias`). When adding or renaming an alias, update **both** or builds/types diverge. (The `utils` alias was renamed to `lib` — both files were updated together.)

## Packaging invariants (from `.notes/NOTES.md` — read it before touching build/publish config)

These three must always agree or the package builds wrong or publishes the wrong files:
1. `vite.config.js` build entry + externals
2. `package.json` entry fields (`main`/`module`/`exports`)
3. The actual entry file on disk

Hard-won rules:
- **Target React 18, not 19.** Figma Make requires React 18 + Vite. Keep `react`/`react-dom` at `^18.0.0` in both `peerDependencies` (host supplies them) and `devDependencies` (local build/dev).
- **Keep React external** — `react`, `react-dom`, `react/jsx-runtime` are Rollup externals; never bundle a copy.
- **Entry fields point at `./dist/index.js`**, never at a source file.
- **`"files": ["dist"]`** restricts the published tarball to the build output only.
- **CSS + `sideEffects`:** the build emits `dist/styles.css`; `sideEffects: ["**/*.css"]` keeps styles from being tree-shaken. `exports["./styles.css"]` must point at the emitted file.
- **Don't hardcode the version in source** — `package.json` is the single source of truth.

## Release workflow

`npm version` requires a clean tree, so commit first. Convention: subject line, blank line, body; no trailing whitespace; single trailing newline.
