# SDS Layout Components — Flex · Grid · Section

> Technical reference for the layout layer at `src/ui/layout/`. Companion to the
> interactive showcase in [`layout-components.html`](./layout-components.html)
> (open it in a browser and resize the window — every demo renders with the
> library's real CSS and tokens).

These three components are derived from Figma's **Simple Design System (SDS)**
([github.com/figma/sds](https://github.com/figma/sds)). They are the structural
backbone of the kit: everything in `compositions/`, `blocks/`, and `templates/`
is ultimately *these three, arranged*.

```
primitives → layout → compositions → blocks → templates
              ▲ you are here
```

---

## Design philosophy

All three share four properties that make them well-suited to **agentic /
generative tooling** (the kit's reason for existing):

| Principle | In the code |
|---|---|
| **Constrained, enumerated props** | Spacing is *only* the token scale `100 200 300 400 600 800 1200 1600` (Section adds `4000`). There is no `gap="13px"` to emit. |
| **Token indirection** | props → classnames → CSS custom properties → design tokens. Re-theme by swapping tokens, never component code. |
| **Polymorphic & transparent** | each spreads `ComponentPropsWithoutRef<"div">` (or `"section"/"header"/"footer"`), so `id`, `aria-*`, `data-*`, `onClick` pass straight to a real DOM node. |
| **Composable container/item pairs** | `Flex`/`FlexItem`, `Grid`/`GridItem` — container declares the system, item opts into a role. |

The payoff: an LLM emitting these components **cannot** produce off-grid
spacing or an undefined variant — the TypeScript unions plus the classname map
make malformed output unrepresentable.

---

## The spacing scale

The single vocabulary of spacing across all three components (from
`src/theme.css`):

| token | rem | px |
|---|---|---|
| `100` | 0.25 | 4 |
| `200` | 0.5 | 8 |
| `300` | 0.75 | 12 |
| `400` | 1 | 16 |
| `600` | 1.5 | 24 |
| `800` | 2 | 32 |
| `1200` | 3 | 48 |
| `1600` | 4 | 64 |
| `4000` | 10 | 160 (Section padding only) |

Container max-width (`container` prop on Flex/Grid): `--global-container-max-width = 75rem`.

---

## 1 · Flex

`src/ui/layout/Flex/{Flex.tsx,flex.css}` — a flexbox container with a
token-locked API **plus** a responsive fractional-column system.

### Props

| Prop | Type | Default | Maps to |
|---|---|---|---|
| `direction` | `row · row-reverse · column · column-reverse` | `row` | `flex-direction` (via `--flex-direction`) |
| `alignPrimary` | `start · end · center · stretch · space-between` | `start` | `justify-content` (main axis) |
| `alignSecondary` | `start · end · center · stretch · space-between` | `start` | `align-items` (cross axis) |
| `gap` | token scale | — | `gap` (via `--flex-gap`) |
| `wrap` | `boolean` | `false` | `flex-wrap: wrap` |
| `container` | `boolean` | `false` | centered, `max-width: 75rem` |
| `type` | `auto · half · third · quarter` | `auto` | selects the responsive column model |

`FlexItem` has exactly one prop: `size` = `full · major · minor · half · fill`.

### Naming insight — `alignPrimary` / `alignSecondary`

SDS deliberately avoids `justify`/`align` because those swap meaning when
`direction` flips between row and column. "Primary" always means *along the
direction you laid things out in*, which keeps mental model stable across
`row` and `column`.

### The ratio engine (the interesting part)

Setting `type` to `half`/`third`/`quarter` turns the Flex into a fractional
column grid whose **column counts change at breakpoints — with no
component-level media query and no JS**.

How it works:

1. `src/responsive.css` defines ratio tokens and **redefines them inside
   `@media` blocks** at `600px` and `1024px`:

   ```css
   :root { --sds-responsive-ratio-column-third-major: 3; --sds-responsive-ratio-column-third-minor: 3; }
   @media (min-width: 1024px) {
     :root { --sds-responsive-ratio-column-third-major: 2; --sds-responsive-ratio-column-third-minor: 1; }
   }
   ```

2. `flex.css` derives geometry from those tokens with pure `calc()`,
   subtracting the gap so columns stay flush:

   ```css
   --column-count: calc(1 / var(--column-ratio));
   --base-width: calc((100% / var(--column-count)) - (((var(--column-count) - 1) / var(--column-count)) * var(--flex-gap)));
   --column-span: calc(var(--column-ratio) * var(--column-count));
   flex-basis: calc(var(--column-span) * var(--base-width));
   max-width:  calc(var(--column-span) * var(--base-width));
   ```

3. Each child's role is set by `FlexItem size`. Untagged children in a ratio
   Flex default to the `minor` ratio.

**Net effect** (with `wrap`):

| `type` | <600 (mobile) | 600–1023 (tablet) | ≥1024 (desktop) |
|---|---|---|---|
| `half` | 1-up | 2-up | 2-up |
| `third` | 1-up | 1-up | 2:1 (major:minor) or 3-up |
| `quarter` | 1-up | 2-up | 3:1 (major:minor) |

`size="fill"` is orthogonal — it sets `flex-grow: 1` and works in any `type`
(including `auto`) to consume leftover space.

### Common shapes

```tsx
// 3-up card grid, 1-up on mobile (this is exactly PricingGrid's plan row)
<Flex wrap type="third" gap="1200">{cards}</Flex>

// content + sidebar, 3:1 on desktop, stacked on mobile
<Flex wrap type="quarter" gap="400">
  <FlexItem size="major">{main}</FlexItem>
  <FlexItem size="minor">{aside}</FlexItem>
</Flex>

// vertical stack, children full-width
<Flex direction="column" gap="600" alignSecondary="stretch">{rows}</Flex>

// toolbar: fixed ends, growing middle
<Flex gap="200" alignSecondary="center">
  {left}<FlexItem size="fill">{spacer}</FlexItem>{right}
</Flex>
```

---

## 2 · Grid

`src/ui/layout/Grid/{Grid.tsx,grid.css}` — the inverse of Flex's opinionation:
it exposes **raw CSS Grid templates** for full 2-D control, while keeping gaps
on the token scale.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `columns` / `rows` | `string` | `none` | any grid template, e.g. `"repeat(3, 1fr)"`, `"200px 1fr"` — applied as inline `grid-template-*` |
| `gap` / `columnGap` / `rowGap` | token scale | — | token-locked; axis-specific gaps override the shared one |
| `flow` | `row · column · row dense · column dense` | — | `grid-auto-flow` |
| `justifyItems` / `alignItems` | `start · end · center · stretch` | `stretch` | default placement of all cells |
| `container` | `boolean` | `false` | centered max-width wrapper (same as Flex) |

`GridItem`: `column`, `row`, `area` → `grid-column` / `grid-row` / `grid-area`
for explicit placement and spanning (e.g. `column="1 / -1"` for a full-width
header row).

> **Implementation note.** `Grid` applies templates and gaps as *inline styles*
> (computed from the props) in addition to classnames. The classname presets in
> `grid.css` (`.grid-template-columns-3`, etc.) exist but the component drives
> layout primarily through the inline `gridTemplateColumns`/`gap` values, which
> is why arbitrary template strings work.

### Flex `type` vs Grid — when to use which

- **Flex `type="half|third|quarter"`** — when you want the design system's
  *built-in* responsive reflow for free (cards, plan grids, content + sidebar).
  The breakpoints are already tuned in `responsive.css`.
- **Grid** — when you need explicit 2-D placement, named/spanning areas, or a
  template flex can't express (app shells, dashboards, galleries). You own the
  responsive breakpoints (typically by swapping the `columns` string via
  `useMediaQuery`).

---

## 3 · Section

`src/ui/layout/Section/{Section.tsx,section.css}` — the vertical-rhythm and
theming primitive. A page is a vertical stack of Sections.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `elementType` | `section · header · footer` | `section` | renders the matching semantic tag |
| `variant` | `subtle · neutral · brand · stroke · image` | `subtle` | `image` is a separate union arm |
| `padding` | `600 · 800 · 1200 · 1600 · 4000` | `600` | vertical (top + bottom) |
| `paddingTop` / `paddingBottom` | same scale | `= padding` | override one edge |
| `src` | `string` | — | **required iff** `variant="image"` (TS discriminated union) |

### Variants

- **subtle** — transparent, inherits page background.
- **neutral** — tertiary surface (`--sds-color-background-default-tertiary`).
- **brand** — brand background + on-brand text; also recolors child logo/icon
  SVGs via the descendant rules in `section.css`.
- **stroke** — hairline top/bottom borders that **auto-collapse between
  adjacent stroke sections** (`.section-variant-stroke + .section-variant-stroke
  { border-top: none }`) so stacked sections never show a double line.
- **image** — background `SdsImage` (`size="fill" aspectRatio="fill"`) behind a
  scrim `::before` for text contrast. The union *requires* `src`; the other
  variants forbid it.

### Type-level detail

`SectionProps` is a discriminated union: the `image` arm requires `src`, every
other variant has `src?: undefined`. This makes "image section without a source"
a compile error — the type encodes the runtime requirement.

```tsx
<Section variant="brand" padding="1200">…</Section>
<Section variant="image" src="/hero.jpg" padding="1600">…</Section>   // src required
<Section variant="stroke">…</Section><Section variant="stroke">…</Section> // shared border
<Section elementType="footer" variant="neutral" paddingTop="800" paddingBottom="1600">…</Section>
```

---

## 4 · Higher-level applications

Everything upstream is these three, arranged. Real examples from the codebase:

| Where | Layer | Built from |
|---|---|---|
| `compositions/Sections/Heroes.tsx` → `Hero` | composition (prop-only) | `Section padding="1600"` + centered `Flex container direction="column" gap="600"` |
| `blocks/sections/PricingGrid.tsx` | block (imports `usePricing`) | `Section variant="stroke"` + outer column `Flex` + inner `Flex wrap type="third"` for the 3-up plan grid |
| `blocks/sections/ProductGrid.tsx`, `FAQs.tsx`, `PanelSections.tsx` | blocks | `Section` + ratio `Flex` / `Grid` |
| `templates/AppTemplate*.tsx` | templates | `Grid`-based app shells (sidebar + header + main) |
| `compositions/Headers`, `Footers`, `Cards` | compositions | `Flex` for internal arrangement |

The layering payoff: the *same two primitives* (Section + Flex) serve a
marketing hero and a data-driven pricing table without modification — the
difference is only whether the wrapper imports runtime data (block) or stays
prop-only (composition).

---

## 5 · Performance & engineering characteristics

- **No runtime layout JS.** All sizing is CSS `calc()` over custom properties;
  React only toggles classnames + a couple of inline vars. Reflow is the
  browser compositor's job, never a JS resize listener.
- **Responsive without re-render.** The ratio engine reacts to `@media` in
  `responsive.css`; rotating/resizing reflows with zero React work. (Blocks
  like PricingGrid use `useMediaQuery` only for *content* choices such as card
  `size`, not for layout columns.)
- **Tiny static class sets.** `clsx` assembles a bounded, deterministic
  classname set — no CSS-in-JS runtime, no per-render style injection.
- **Zero runtime dependencies.** Only `clsx` (bundled). Enforced repo-wide by
  the `prebuild` guard; the layer ships as pure CSS + a thin React wrapper
  inside the single `dist/index.js`.
- **Tree-shakeable.** Named exports through the barrel; CSS marked
  `sideEffects` so styles survive shaking while unused JS drops.
- **Theme-swappable at runtime.** Everything reads tokens, so dark mode /
  re-branding is a `:root` custom-property swap — no re-render, no recompile.
- **Accessible & semantic.** Section emits real `<section>/<header>/<footer>`;
  the image variant carries a presentation role + scrim; all three forward
  `aria-*`/`role` via prop spread.

---

## Cheatsheet

```
Spacing: 100=4 200=8 300=12 400=16 600=24 800=32 1200=48 1600=64  (+4000=160 Section)

<Flex direction gap alignPrimary alignSecondary wrap container type />
   type: auto | half | third | quarter        // responsive columns
<FlexItem size="full|major|minor|half|fill" />

<Grid columns rows gap columnGap rowGap flow justifyItems alignItems container />
<GridItem column row area />

<Section elementType="section|header|footer"
         variant="subtle|neutral|brand|stroke|image"
         padding paddingTop paddingBottom  src(image only) />

Flex    → 1-D flow + free responsive reflow (cards, sidebars, toolbars)
Grid    → 2-D explicit placement (app shells, dashboards, galleries)
Section → page's horizontal bands; stack them to build a page
```
