// Public entry point. Everything exported here is importable from
// `monofly` inside Figma Make (or any host app).
//
// Importing the global stylesheet here means a single
// `import 'monofly/styles.css'` in the host pulls in the SDS token
// foundation (theme/reset/responsive/icons) plus every component's
// co-located CSS, which Vite bundles into one dist/styles.css.

import "./index.css";

// UI layers
export * from "./ui/primitives/index.ts";
export * from "./ui/layout/index.ts";
export * from "./ui/compositions/index.ts";
export * from "./ui/icons/index.ts";
export * from "./ui/images/index.ts";
export * from "./ui/hooks/index.ts";
export * from "./ui/utils/index.ts";

// Data layer (mock services, providers, guarded hooks)
export * from "./data/index.ts";
