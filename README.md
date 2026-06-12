# MonoFly

> monofly

A small React component library packaged as a **Figma Make kit**. Components are shipped as ESM with a single stylesheet, built with Vite in library mode so Figma Make can pull them from npm via the esm.sh CDN.

## Installation

```bash
npm install monofly
```

## Usage

```js
import monofly from "monofly";
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
npm install        # install dev deps (react, vite)
npm run build      # emit dist/index.js + dist/style.css
npm publish        # prepublishOnly runs the build automatically
```

React and ReactDOM are `peerDependencies` — the host (Figma Make) supplies them, so they are never bundled.

## License

MIT © [jeffersonkidd](https://github.com/jeffersonkidd)
