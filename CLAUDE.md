# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`monofly` is a React component library designed and distributed to compliment the agentic methodology of consistently modular generative tools (ie. **Figma Make Kits**). It is built with Vite in *library mode*: the published artifact is a single ESM bundle (`dist/index.js`) plus one stylesheet (`dist/styles.css`), with React kept external so the host (Figma Make, or any consuming app) supplies its own copy via the esm.sh CDN.

**Two styling systems coexist.** The original component layer is derived from Figma's Simple Design System (SDS) — styled via `--sds-*` CSS custom properties (see `src/theme.css`) with co-located `*.css` files, built on `react-aria-components`. A newer **Tailwind v4 + shadcn** layer was added on top (the full shadcn primitive registry vendored into `primitives/shadcn/` — accordion, dialog, input, select, sidebar, table, … — plus `templates/`, `blocks/sidebars/`, and `blocks/dashboards/`). These use Tailwind utility classes + Radix primitives (`radix-ui`, `lucide-react`, `class-variance-authority`) and the `cn()` helper in `src/ui/utils/utils.ts`. Tailwind is wired via `@tailwindcss/vite` (`src/tailwind.css`, imported from `index.css`). When adding a component, match the styling system of the layer you're editing — don't mix SDS tokens and Tailwind utilities in one file.

> **Lineage rule:** **every bare primitive name is shadcn; SDS is always `Sds*`.** `import { Button } from "primitives"` resolves to the **shadcn** Button; the SDS one is `SdsButton`. The whole SDS lineage is namespaced — `SdsDialog`, `SdsInput`, `SdsLabel`, `SdsIcon`, … (aliased in `primitives/sds/index.ts`; the source files keep bare names). Importing a bare SDS name where you meant the SDS component silently gives you the shadcn one (e.g. `onPress` no-ops on the shadcn Button). The lone deliberate exception is `mode-toggle.tsx`, which wants the shadcn `Button`.

## Commands

```bash
npm install          # install dev deps (React 19, Vite, react-aria-components)
npm run dev          # Vite dev server on http://localhost:8000 (runs src/main.tsx → App.tsx)
npm run build        # emit dist/index.js + dist/styles.css (library build) — THE real check (see below)
npm publish          # prepublishOnly runs the build automatically
npm pack --dry-run   # verify the published tarball — should list only package.json, README.md, dist/
```

There is **no test runner and no lint script.**

**`npm run build` runs a `prebuild` guard first** (`scripts/guard-no-runtime-deps.mjs`): it fails the build if `package.json` has any runtime `dependencies`. monofly bundles everything into `dist/` with only React external, so the package must ship **zero** runtime deps. `shadcn add` silently writes component libs (recharts, embla, cmdk, vaul, …) into `dependencies` — the guard catches that so they get demoted to `devDependencies` or the offending component gets cut. See the heavy-component list in `.box/.notes/Notes.md`.

**`tsc` does not work as a check here — use `npm run build` to verify types/imports.** `typescript` is `^6.0.0` and `tsconfig.json` uses `baseUrl`, which TS 6 treats as a hard error (TS5101) that **aborts before type-checking any files**. So `npx tsc --noEmit` reports only the `baseUrl` error and silently skips real ones (unresolved imports, bad props). The Vite/rolldown build (`npm run build`) is what actually surfaces missing exports and broken imports. (`tsconfig.json` has `noEmit` set; it exists for editor type-hints and strict-mode flags, not as a CI gate.)

## Architecture

Two distinct surfaces share one `src/` tree:

1. **The dev/preview app** — `src/main.tsx` mounts `src/App.tsx`, which renders a dashboard block inside `<AllProviders>`. This is what `npm run dev` serves and is *not* part of the published package.
2. **The library** — the Vite build entry is `src/index.js` (see `vite.config.js` `build.lib.entry`). This barrel imports `tailwind.css` then `index.css` (order matters — see the comment in `src/index.js`) and re-exports every `src/ui/*` layer (`blocks`, `primitives`, `layout`, `compositions`, `icons`, `images`, `hooks`, `templates`, `utils`) plus the `data/` layer. Consumers import from it (`import { Button } from 'monofly'`). When you add a new component folder or layer, export it through the relevant barrel up to `src/index.js` or it won't ship.

### Layered structure under `src/ui/`

- `primitives/` — leaf components, split by lineage into `sds/` (Button, Input, Dialog, … — own folder + co-located `*.css`, `react-aria-components` + `clsx`; every export namespaced `Sds*` in `sds/index.ts`) and `shadcn/` (the full shadcn registry — accordion, dialog, table, sidebar, … — flat files, Tailwind + Radix, owns the bare names). shadcn files import each other and helpers via bare aliases (`primitives/shadcn/<name>`, `utils`, `hooks/<name>`); `components.json` is configured to generate exactly these.
- `layout/` — Flex, Grid, Section.
- `compositions/` — reusable, **prop-only** assemblies of primitives (Cards, Headers, Footers, Forms, `mode-toggle`, and `Sections/` → `Hero`, `Panel`). See **Layer taxonomy** below.
- `blocks/` — **concrete instances**, organized by kind: `sections/` (filled section instances like WelcomeHero, PricingGrid, FAQs), `dashboards/` (DashboardShell, AppDashboard), `sidebars/` (sidebar-07 + AppSidebar07), `modules/`, `examples/` (full pages stacking sections).
- `templates/` — page-level shells: `AppTemplate` (slot-based dashboard shell), `AuthTemplate`, `BrandTemplate` (wires `<AllProviders>` + permanent Header/Footer). Tailwind/shadcn-based. (The `.figma/` folder here is vestigial — Code Connect actually lives in `src/figma/`, see below.)
- `icons/` — one component per icon (`IconArrowRight`, etc.), styled by `src/icons.css`.
- `utils/` — shared utilities: `AnchorOrButton` and the `cn()` class-merge helper (`clsx` + `tailwind-merge`).
- `hooks/`, `images/` — shared helpers (e.g. `useMediaQuery`).

### Layer taxonomy: composition vs block (the recurring "which layer?" question)

Layers depend only **downward**: `primitives → layout → compositions → blocks → templates`. The rule for placing a component:

> **Composition / template = reusable, prop-only.** No `from "data"` *value* imports, no hardcoded content — every concrete thing is a slot/prop.
> **Block = a concrete instance.** Two independent routes to block-hood: (1) it imports runtime **values** from `data` (`useAuth`, `sidebarConfig`); or (2) it bakes content in as literals with **zero props**.

- **Type-only** imports from `data` (e.g. `type SidebarNavItem`) are fine — erased at compile time, no runtime coupling. Only **value** imports count.
- Taking `children` does **not** make something a composition — the test is "does it make concrete, app-specific decisions?" Litmus: *could you drop it into a different app unchanged?*
- **Decisive override — dependency direction:** a component can live only as high as its lowest-tier import. A composition **cannot import a block** (upward dependency). So mounting `AppSidebar07` (a block — it defaults from `sidebarConfig`) forces the importer to block tier regardless of how prop-driven it is. This is why `DashboardShell`/`AppDashboard` are blocks even though they take `children`, and why `AppTemplate` (sidebar as a *slot*, depends only on primitives/layout) is the composition-grade abstraction they sit on.
- **Templates** are the one tier where wiring `<AllProviders>` / a `from "data"` value import is correct — they're the app-level wrapper.

Full worked reasoning is in `.box/.notes/Notes.md` ("Layer taxonomy").

### Data layer — `src/data/`

A self-contained context/provider/hook/service stack with **mock services** (no real backend):

- `types/` → domain models (`auth`, `pricing`, `products`, `sidebar`)
- `config/` → static config consumed as block defaults (e.g. `sidebar.ts` → `sidebarConfig`)
- `services/` → mock async APIs (simulated latency, hardcoded responses)
- `contexts/` + `providers/` → React context per domain. `providers/AllProviders.tsx` nests **Theme → Auth → Pricing → Products**. `ThemeProvider`/`useTheme` live here too (`providers/theme-provider.tsx`) — import `useTheme` from `"data"`, **not** `"compositions"`.
- `hooks/` → `useAuth`/`usePricing`/`useProducts`, each throws if used outside its provider

Wrap any app/tree consuming this data in `<AllProviders>` (or compose individual providers).

### Figma Code Connect — `src/figma/`

The repo uses **parser-based** Code Connect (`*.figma.tsx`): `import figma from "@figma/code-connect"` + `figma.connect(RealComponent, "<FIGMA_*>", { example })` with a real, type-checked JSX `example`. Config is `figma.config.json` (`parser: "react"`, `documentUrlSubstitutions` mapping `<FIGMA_*>` tokens → node URLs, and `paths`/`importPaths` that must point at real dirs — keep them in sync with `src/ui/`).

- **Do not add MCP-template `.figma.ts` files** (`import figma from "figma"`, `figma.selectedInstance`) for the same components — that's the other Code Connect flavor; it duplicates mappings and loses type-safety. The bundled `figma-code-connect` skill teaches the MCP-template flow, which does **not** match this repo.
- **Validate locally:** `npx figma connect parse` (CLI bin is `figma`). `npx figma connect publish --dry-run` builds + validates the full payload without uploading.
- **Publishing is plan-gated:** the authed Figma account is tier **pro**; Code Connect publish requires Org/Enterprise. Authoring + parse validation work on any plan.
- `figma.config.json` excludes `src/figma/icons/*`, so `Icons.figma.tsx` is neither parsed nor published.

### Path aliases (must stay in sync across two files)

Bare-specifier aliases (`primitives`, `compositions`, `data`, `hooks`, `icons`, `images`, `layout`, `blocks`, `templates`, `utils`) are defined in **both** `tsconfig.json` (`paths`) and `vite.config.js` (`resolve.alias`). When adding or renaming an alias, update **both** or builds/types diverge.

`primitives`, `hooks`, and `utils` also have **subpath** variants (`primitives/*`, `hooks/*`, `utils/*` in tsconfig `paths`; matching `/^…\/(.*)/` regex entries in vite) so deep imports like `primitives/shadcn/button` and `hooks/use-mobile` resolve. `components.json`'s `aliases` are set to these bare prefixes (`ui` → `primitives/shadcn`, `utils` → `utils`, `hooks` → `hooks`, `components` → `primitives`, `lib` → `utils`) so `npx shadcn add` writes imports that match the rest of the repo instead of `@/`-style or `baseUrl` literals. Keep `components.json`, the tsconfig subpaths, and the vite aliases in sync.

## Packaging invariants (from `.box/.notes/Notes.md` — read it before touching build/publish config)

These three must always agree or the package builds wrong or publishes the wrong files:
1. `vite.config.js` build entry + externals
2. `package.json` entry fields (`main`/`module`/`exports`)
3. The actual entry file on disk

Hard-won rules:
- **Target React 19.** Keep `react`/`react-dom` at `^19.0.0` in both `peerDependencies` (host supplies them) and `devDependencies` (local build/dev), and `@types/react`/`@types/react-dom` at `^19`. The shadcn layer is written in React-19 style (`ref` as a regular prop, no `forwardRef`) — on React 18 those refs are silently dropped, which breaks Radix `asChild` triggers (e.g. dropdown/popper anchoring positions menus off-screen at `translate(0,-200%)`). **Caveat:** the published kit runs against whatever React the host (Figma Make) injects via esm.sh; if the host is on React 18, ref-as-prop components re-break in production. This was switched from React 18 deliberately — verify the host's React version before publishing.
- **Keep React external** — `react`, `react-dom`, `react/jsx-runtime` are Rollup externals; never bundle a copy.
- **Entry fields point at `./dist/index.js`**, never at a source file.
- **`"files": ["dist"]`** restricts the published tarball to the build output only.
- **CSS + `sideEffects`:** the build emits `dist/styles.css`; `sideEffects: ["**/*.css"]` keeps styles from being tree-shaken. `exports["./styles.css"]` must point at the emitted file.
- **Tailwind entry must be JS-imported** (`import "./tailwind.css"` in `src/index.js`), never `@import url()`'d from a stylesheet, or `@theme`/`@apply` go uncompiled and shadcn utilities vanish. Global SDS resets (`button { all: unset }` etc.) must stay in `@layer base` or they clobber Tailwind utilities on shadcn components.
- **Don't hardcode the version in source** — `package.json` is the single source of truth.
- **Zero runtime `dependencies`** — everything except React is bundled into `dist/`, so the package must have no `dependencies` block. Enforced by the `prebuild` guard (see Commands). After any `npx shadcn add`, check `package.json` and move anything it added under `dependencies` into `devDependencies`.

## Release workflow

`npm version` requires a clean tree, so commit first. Convention: subject line, blank line, body; no trailing whitespace; single trailing newline. Full step-by-step (bump → tag → publish) is in `.box/.notes/Notes.md`.
