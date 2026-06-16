# monofly-dashboard-app

A dashboard **app shell** whose entire UI comes from the
[`monofly`](https://github.com/jeffersonkidd/monofly) package — `AppTemplate02`
as the slot-based shell (sidebar + header + content), filled with monofly
sidebar primitives, a `Grid` of stat `Card`s, and the `ModeToggle`.

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
import { AllProviders, AppTemplate02, SidebarMenu, Card, Grid } from "monofly";
```

`AppTemplate02` exposes `sidebarHeader` / `nav` / `sidebarFooter` / `header` /
`content` slots and provides the `SidebarProvider` internally (so `SidebarTrigger`
works), but it does **not** wire app context — hence the `<AllProviders>` wrapper
for theme tokens.

React 19 is a real dependency here because monofly declares `react` /
`react-dom` as **peer dependencies** — the host app supplies them.

## Getting started

```bash
npm install      # installs monofly (from GitHub) + react + react-dom + vite
npm run dev      # Vite dev server (http://localhost:5175)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

> Installing from GitHub triggers monofly's `prepare` script, which builds the
> package's `dist/` on install — the repo only commits source, not build output.
