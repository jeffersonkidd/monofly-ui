# Consumer app templates

Each folder here is a **standalone consumer app** that uses
[`monofly`](https://github.com/jeffersonkidd/monofly) as an installed package —
the design system's tokens and components arrive entirely through the published
API, with no source-level coupling to this repo.

| Template | Surface | Headline monofly exports |
| --- | --- | --- |
| [`monofly-app`](./monofly-app) | Marketing / brand site | `BrandTemplate`, `WelcomeHero`, `PricingGrid`, `FAQs` |
| [`auth-app`](./auth-app) | Sign-in screen | `AuthTemplate`, `Card`, `Input`, `Button`, `ModeToggle` |
| [`dashboard-app`](./dashboard-app) | App shell / dashboard | `AppTemplate02`, sidebar primitives, `Grid`, `Card` |
| [`link-in-bio`](./link-in-bio) | Creator link page | `LinkInBio` |

## The contract every template follows

Two imports get you the whole design system:

```jsx
import "monofly/styles.css";                      // every token + component style, one file
import { /* named exports */ } from "monofly";    // components, templates, blocks, providers
```

- **Tokens** ship as CSS custom properties (`--sds-*` and the Tailwind/shadcn
  theme vars) inside the single `monofly/styles.css` — import it once.
- **Components** are named exports off the package barrel. Bare names are the
  shadcn lineage (`Button`); the SDS lineage is namespaced (`SdsButton`).
- **Theme/context** comes from `<AllProviders>` (or `BrandTemplate`, which wraps
  it for you). Templates that don't wire context — `AuthTemplate`,
  `AppTemplate02` — are wrapped in `<AllProviders>` by these apps.
- **React 19** is a real dependency in each app, satisfying monofly's
  `peerDependencies`.

## Installing monofly from GitHub

Every template pins the dependency to the repo, not the npm registry:

```jsonc
"dependencies": {
  "monofly": "github:jeffersonkidd/monofly"
}
```

monofly only commits **source** — `dist/` is gitignored. So the package defines
a `prepare` script (`npm run build`) that npm runs automatically when installing
from GitHub, producing `dist/index.js` + `dist/styles.css` on the consumer's
machine. Nothing extra to do: `npm install` just works.

To pin a specific branch or tag, suffix the spec — e.g.
`github:jeffersonkidd/monofly#v0.1.6`.

## Running any template

```bash
cd examples/<template>
npm install
npm run dev
```
