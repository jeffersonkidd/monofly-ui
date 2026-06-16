# monofly-app

A minimal web app whose entire UI is composed from modules imported from the
[`monofly`](https://github.com/jeffersonkidd/monofly) npm package. There are no
local components and no bespoke styling — the app only assembles sanctioned
monofly exports.

## How it works

`monofly` ships **named React exports only** plus a single stylesheet. The whole
app is two imports:

```jsx
// src/main.jsx
import "monofly/styles.css";          // one stylesheet, every token + component style

// src/App.jsx
import { BrandTemplate, WelcomeHero, PricingGrid, FAQs } from "monofly";
```

`BrandTemplate` is a page shell that already wires up `<AllProviders>` (theme,
auth, pricing, products context) and a permanent Header/Footer, so `App` just
stacks section blocks inside it.

React 19 is a real dependency here because monofly declares `react` /
`react-dom` as **peer dependencies** — the host app supplies them.

## Getting started

```bash
npm install      # installs monofly + react + react-dom + vite
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Swap in other modules

Anything exported from the package barrel is fair game — templates
(`AppTemplate01`, `AuthTemplate`), dashboards/blocks (`BrutalistDashboard`,
`LinkInBio`, `PasswordGate`), primitives (`Button`, `SdsButton`, …), layout
(`Flex`, `Grid`, `Section`), and the data layer (`AllProviders`, `useAuth`).
Just import the name and drop it in.
