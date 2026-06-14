// Tripwire: monofly ships a single ESM bundle with only React externalized, so
// every bundled library must be a devDependency — the package must have NO
// runtime `dependencies`. `shadcn add` silently writes component libs into
// `dependencies` (recharts, embla, cmdk, vaul, …); this guard fails the build
// the moment that happens so the offenders get demoted to devDeps or the
// component that pulled them gets cut. Runs as `prebuild` (before every build
// and therefore before `prepublishOnly`). See .box/.notes/Notes.md.
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
const deps = Object.keys(pkg.dependencies ?? {});

if (deps.length) {
  console.error(
    "\n✗ package.json has a `dependencies` block — monofly must have none.\n" +
      "  This package bundles everything into dist/ with only React external,\n" +
      "  so a consumer never installs these; they belong in devDependencies.\n" +
      "  Offenders (almost certainly added by `shadcn add`):\n" +
      deps.map((d) => `      - ${d}`).join("\n") +
      "\n\n  Fix: move each to devDependencies, or delete the shadcn component\n" +
      "  that imports it (see the heavy-component list in Notes.md).\n",
  );
  process.exit(1);
}

console.log("✓ guard: no runtime dependencies");
