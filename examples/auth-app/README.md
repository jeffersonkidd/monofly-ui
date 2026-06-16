# monofly-auth-app

A single sign-in screen whose entire UI comes from the
[`monofly`](https://github.com/jeffersonkidd/monofly) package — `AuthTemplate`
as the page shell, with `Card` / `Label` / `Input` / `Button` / `ModeToggle`
primitives composing the form.

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
import { AllProviders, AuthTemplate, Card, Input, Button, ModeToggle } from "monofly";
```

`AuthTemplate` is a prop-only shell (logo / form / footer slots) and does **not**
wire context itself, so the app wraps it in `<AllProviders>` to get the theme
tokens (dark-mode class) and the data providers the primitives expect.

React 19 is a real dependency here because monofly declares `react` /
`react-dom` as **peer dependencies** — the host app supplies them.

## Getting started

```bash
npm install      # installs monofly (from GitHub) + react + react-dom + vite
npm run dev      # Vite dev server (http://localhost:5174)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

> Installing from GitHub triggers monofly's `prepare` script, which builds the
> package's `dist/` on install — the repo only commits source, not build output.
