# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`monofly` is a React component library distributed as a **Figma Make kit**. It is built with Vite in *library mode*: the published artifact is a single ESM bundle (`dist/index.js`) plus one stylesheet (`dist/styles.css`), with React kept external so the host (Figma Make, or any consuming app) supplies its own copy via the esm.sh CDN.

The component layer is derived from Figma's Simple Design System (SDS) — all styling is driven by `--sds-*` CSS custom properties (see `src/theme.css`), and primitives are built on `react-aria-components`.

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
2. **The library** — the Vite build entry is `src/index.js` (see `vite.config.js` `build.lib.entry`). This barrel is what consumers import (`import { Button } from 'monofly'`). **Note:** in the current working tree this entry file is mid-migration/missing — `vite build` requires it to exist, so re-creating the barrel that re-exports from `src/ui/*` is a prerequisite for any successful build or publish.

### Layered structure under `src/ui/`

- `primitives/` — leaf components (Button, Input, Dialog, …), each in its own folder with a co-located `*.css`. Built on `react-aria-components`, styled via `clsx` class composition + SDS tokens.
- `layout/` — Flex, Grid, Section.
- `compositions/` — multi-primitive assemblies (Cards, Headers, Footers, Forms, Heroes, Panels).
- `blocks/` — page-level sections used by the preview app (PricingGrid, ProductGrid, FAQs, …).
- `icons/` — one component per icon (`IconArrowRight`, etc.), styled by `src/icons.css`.
- `hooks/`, `utils/`, `images/` — shared helpers (e.g. `useMediaQuery`, `AnchorOrButton`).

### Data layer — `src/data/`

A self-contained context/provider/hook/service stack with **mock services** (no real backend):

- `types/` → domain models (auth, pricing, products)
- `services/` → mock async APIs (simulated latency, hardcoded responses)
- `contexts/` + `providers/` → React context per domain; `providers/AllProviders.tsx` nests Auth → Pricing → Products
- `hooks/` → `useAuth`/`usePricing`/`useProducts`, each throws if used outside its provider

Wrap any app/tree consuming this data in `<AllProviders>` (or compose individual providers).

### Path aliases (must stay in sync across two files)

Bare-specifier aliases (`primitives`, `compositions`, `data`, `hooks`, `icons`, `layout`, `utils`, etc.) are defined in **both** `tsconfig.json` (`paths`) and `vite.config.js` (`resolve.alias`). When adding or renaming an alias, update **both** or builds/types diverge.

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
