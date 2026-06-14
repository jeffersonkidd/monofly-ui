// Loads every `*.figma.tsx` Code Connect file so its `figma.connect(...)` calls
// register into the shim's registry, and resolves each `<FIGMA_*>` token to a
// real Figma URL using figma.config.json (the same source of truth the CLI uses).

import { registry, __setSource, type ConnectEntry } from "./code-connect-shim";
import figmaConfig from "../../figma.config.json";

// Eager:false -> we get loader functions and import them one at a time, setting
// the source label before each so registrations are attributed correctly.
const modules = import.meta.glob("../figma/**/*.figma.tsx");

const substitutions: Record<string, string> =
  (figmaConfig as any)?.codeConnect?.documentUrlSubstitutions ?? {};

/** Resolve a `<FIGMA_*>` token to its design URL, or null if unmapped. */
export function figmaUrl(node: string): string | null {
  return substitutions[node] ?? null;
}

function pretty(path: string): { file: string; category: string } {
  // ../figma/<category>/<Name>.figma.tsx
  const parts = path.split("/");
  const file = (parts.at(-1) ?? "").replace(/\.figma\.tsx$/, "");
  const category = parts.at(-2) ?? "misc";
  return { file, category };
}

let loaded: Promise<ConnectEntry[]> | null = null;

export function loadRegistry(): Promise<ConnectEntry[]> {
  if (loaded) return loaded;
  loaded = (async () => {
    for (const [path, loader] of Object.entries(modules)) {
      if (path.includes("/icons/")) continue; // excluded from Code Connect
      const { file, category } = pretty(path);
      __setSource(file, category);
      await loader();
    }
    registry.sort(
      (a, b) =>
        a.category.localeCompare(b.category) ||
        a.sourceFile.localeCompare(b.sourceFile) ||
        a.componentName.localeCompare(b.componentName),
    );
    return registry;
  })();
  return loaded;
}
