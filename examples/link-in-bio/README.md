# monofly-link-in-bio

A complete creator **link-in-bio** page rendered from a single
[`monofly`](https://github.com/jeffersonkidd/monofly) block — `LinkInBio`.

## How it works

`monofly` ships **named React exports only** plus a single stylesheet, and this
app installs it **straight from GitHub**:

```jsonc
// package.json
"dependencies": {
  "monofly": "github:jeffersonkidd/monofly"
}
```

```jsx
// src/main.jsx
import "monofly/styles.css";          // one stylesheet, every token + component style

// src/App.jsx
import { AllProviders, LinkInBio } from "monofly";
```

`LinkInBio` is a self-contained block with sensible defaults — render it with
zero props for the demo persona, or pass `name` / `handle` / `bio` / `links` /
`socials` to make it your own. The `<AllProviders>` wrapper lets the theme
tokens resolve the way the block was designed.

React 19 is a real dependency here because monofly declares `react` /
`react-dom` as **peer dependencies** — the host app supplies them.

## Getting started

```bash
npm install      # installs monofly (from GitHub) + react + react-dom + vite
npm run dev      # Vite dev server (http://localhost:5176)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

> Installing from GitHub triggers monofly's `prepare` script, which builds the
> package's `dist/` on install — the repo only commits source, not build output.
