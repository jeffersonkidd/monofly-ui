// Public entry point. Everything exported here is importable from
// `monofly` inside Figma Make (or any host app).
//
// Importing the global stylesheet here means a single
// `import 'monofly/styles.css'` in the host pulls in the SDS token
// foundation (theme/reset/responsive/icons) plus every component's
// co-located CSS, which Vite bundles into one dist/styles.css.

// Tailwind entry imported directly from JS (not via `@import url()` in a
// stylesheet) so the @tailwindcss/vite plugin actually compiles it. It must
// come first so Tailwind's `@layer theme,base,components,utilities` order
// statement is established before the SDS `@layer base` rules in index.css.
// Both land in the single dist/styles.css.
import "./tailwind.css";
import "./index.css";

// UI layers
export * from "./ui/blocks/index.ts";
export * from "./ui/primitives/index.ts";
export * from "./ui/layout/index.ts";
export * from "./ui/compositions/index.ts";
export * from "./ui/icons/index.ts";
export * from "./ui/images/index.ts";
export * from "./ui/hooks/index.ts";
export * from "./ui/templates/index.ts";
export * from "./ui/utils/index.ts";

export * from "./ui/blocks/password-gate-01.tsx";
export * from "./ui/blocks/password-gate-02.tsx";

// Data layer (mock services, providers, guarded hooks)
export * from "./data/index.ts";
