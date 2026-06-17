# MonoFly
---
> monofly

A React **Design System Package** for creators — a made-for-generative-tooling component kit, built to the spec of a **Figma Make Kit**. `monofly` exists so that the design system is the *only* material generative tools build with: the components and tokens shipped here are the same ones defined in the Figma design files, kept consistent and translatable in both directions. When a tool like Figma Make generates a screen, it composes sanctioned components and references real design tokens rather than inventing one-off markup or arbitrary values — so generated work stays on-system instead of drifting away from it.

Mechanically, it's a small React component library shipped as ESM with a single stylesheet, built with Vite in library mode so a host like Figma Make can pull it from npm via the esm.sh CDN. But the packaging is in service of the goal above, not the point of it.

## Why a Design System Package

Generative design tooling has one failure mode that matters more than all the others: **drift**. Ask an AI to "add a settings page" and, left to its own devices, it will happily invent a new button, a slightly different blue, a one-off card with 14px of padding because 14 felt right. Each generation is locally plausible and globally corrosive. A hundred screens later you don't have a design system — you have a hundred dialects of one.

A Figma Make Kit closes that loop. Instead of generating *from scratch*, Make generates *from the kit*: a fixed, versioned vocabulary of components and tokens that the AI is constrained to assemble rather than reinvent. `monofly` is that vocabulary, published as an npm package so Make can install it and build against it like any other dependency.

The result is three guarantees, in order of importance:

### 1. Design ↔ code parity

Every component and token in the kit is meant to map 1:1 to its counterpart in the Figma library. A `<Button variant="primary">` in generated code and the **Button / Primary** component in the design file are not lookalikes that happen to resemble each other — they are two representations of *the same definition*. This mapping is made explicit through **[Code Connect](https://www.figma.com/code-connect-docs/)**: the `*.figma.tsx` files under `src/figma/` tell Figma which code component, with which props, corresponds to which design component.

Parity is bidirectional and that matters in both directions:

- **Design → code.** A designer arranges real library components on a canvas; Make reads that file and emits code using the *exact same* components, props, and tokens — not an approximation it inferred from a screenshot.
- **Code → design.** When the kit gains a component, that component can be reflected back into the Figma library, so designers are always working with the same parts engineering ships.

(Today, Code Connect mappings live in `src/figma/` and cover the SDS `primitives/` and `compositions/` layers; extending coverage across the shadcn primitives and `blocks/` is ongoing. Where a mapping doesn't yet exist, the tool falls back to the component's source — still on-system, just not yet round-trip-verified.)

### 2. No drift

Because the AI builds *with* the kit's components and tokens rather than ad-hoc styling, output stays consistent as the surface area grows. Spacing comes from the spacing scale, color comes from named tokens (`--sds-*` in the SDS layer, Tailwind theme variables in the shadcn layer), and structure comes from real components. There's no "approximately the brand blue" — there's the token, or it's wrong. Two screens built six months apart by two different prompts still look like the same product.

This is also why the kit deliberately runs **two coherent styling systems** (the SDS `--sds-*` token layer and the Tailwind v4 + shadcn layer) rather than a free-for-all: each is internally consistent, and a component commits to one. Consistency within a system beats novelty across files.

### 3. One source of truth

The library is the contract. **If it isn't in the kit, it isn't part of the system.** That single sentence is what makes the whole arrangement work — it's what lets you trust generated output without auditing every pixel, and it's what keeps the design system from quietly forking into a code version and a design version that slowly disagree.

Adding to the system therefore means adding to the kit (a real component, exported from the barrel, with its tokens and ideally its Code Connect mapping), not patching a generated file after the fact. The kit grows on purpose; nothing sneaks in.

### 4. Less to maintain — only the strong survive

Building from a fixed vocabulary doesn't just keep things consistent, it keeps things *small*. Every screen reuses the same handful of components instead of spawning a new variant per prompt, so you end up with **fewer designs and far less code**. There's no graveyard of near-duplicate buttons, no dead one-off cards, no styling bloat accreting generation after generation.

What's left is the opposite of bloat: a lean set of component pieces that earned their place by being used again and again. The kit is survival of the fittest for UI — only the parts that prove genuinely reusable make it in and stay in, and everything you ship is built from those survivors. Less code, fewer designs, higher confidence in every piece that remains.

## What's inside

The package is organized as layers under `src/ui/`, each re-exported from the library barrel so consumers (and Make) import from one place:

- **`primitives/`** — leaf components, split by lineage into `sds/` (`Sds*` — react-aria + `--sds-*` tokens) and `shadcn/` (the bare names — Tailwind + Radix: button, dialog, table, sidebar …)
- **`layout/`** — Flex, Grid, Section
- **`compositions/`** — reusable, prop-only assemblies (Cards, Headers, Footers, Forms, `mode-toggle`, `Sections/`)
- **`blocks/`** — concrete instances (`sections/`, `dashboards/`, `sidebars/`, `examples/` …) — either data-wired or with content baked in
- **`templates/`** — page-level shells (`AppTemplate01`/`02`, `AuthTemplate`, `BrandTemplate`)
- **`icons/` · `images/` · `hooks/` · `utils/`** — supporting parts and the `cn()` helper (`utils/utils.ts`)
- **`data/`** — a self-contained mock context/provider/hook stack so generated screens have realistic data to render against

Code Connect mappings live separately under `src/figma/` (parser-based `*.figma.tsx`), not inside the layers above.

Tokens are the other half of the kit: the SDS layer is driven by `--sds-*` CSS custom properties (`src/theme.css`), and the shadcn layer by Tailwind v4 theme variables. These are the values Make is meant to reference — never raw hex or magic numbers.

## Installation

```bash
npm install monofly
```

## Usage

`monofly` ships named exports only (no default export) plus one stylesheet:

```js
import { Button, AppTemplate01 } from "monofly";
import "monofly/styles.css";
```

## Use in Figma Make

1. Add `monofly` to the project's `package.json` (or just ask Make to install it).
2. Import components and the stylesheet:

```jsx
import { Button } from 'monofly';
import 'monofly/styles.css';

export default function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Develop / publish

```bash
npm install        # install dev deps (React 19, Vite, react-aria-components)
npm run dev        # Vite dev server on http://localhost:8000
npm run build      # emit dist/index.js + dist/styles.css
npm publish        # prepublishOnly runs the build automatically
```

React and ReactDOM are `peerDependencies` — the host (e.g. Figma Make) supplies them, so they are never bundled. The package ships **zero runtime `dependencies`**: everything else is bundled into `dist/`, and a `prebuild` guard fails the build if any `dependencies` sneak in (e.g. via `npx shadcn add`).

## License

**Proprietary — All Rights Reserved.** Copyright © 2026 Jefferson Kidd, LLC. This software is not open source. No right to use, copy, modify, or distribute is granted except under a separate written agreement signed by Jefferson Kidd, LLC. See [LICENSE](./LICENSE) for the full terms.
