// Loads every `*.figma.tsx` Code Connect file so its `figma.connect(...)` calls
// register into the shim's registry, and resolves each `<FIGMA_*>` token to a
// real Figma URL using figma.config.json (the same source of truth the CLI uses).

import { registry, __setSource, type ConnectEntry } from "./code-connect-shim";
import { extractConnectBlock } from "./source";
import { layoutStories } from "./stories/layout";
import figmaConfig from "../../figma.config.json";

// Eager:false -> we get loader functions and import them one at a time, setting
// the source label before each so registrations are attributed correctly.
const modules = import.meta.glob("../figma/**/*.figma.tsx");

// Raw text of the same files, so the viewer can show the snippet template.
const rawModules = import.meta.glob("../figma/**/*.figma.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const substitutions: Record<string, string> =
  (figmaConfig as any)?.codeConnect?.documentUrlSubstitutions ?? {};

/** Resolve a `<FIGMA_*>` token to its design URL, or null if unmapped. */
export function figmaUrl(node: string): string | null {
  return substitutions[node] ?? null;
}

/**
 * Build a Figma embed URL for an iframe. Note: this only renders if the design
 * file is publicly shared — otherwise the iframe shows a permission wall.
 */
export function figmaEmbedUrl(node: string): string | null {
  const url = figmaUrl(node);
  if (!url) return null;
  return `https://www.figma.com/embed?embed_host=monofly&url=${encodeURIComponent(url)}`;
}

/** The snippet for an entry: an inline one (local stories) or sliced from source. */
export function getSnippet(entry: ConnectEntry): string | null {
  if (entry.snippet) return entry.snippet;
  const raw = rawModules[entry.modulePath];
  if (!raw) return null;
  return extractConnectBlock(raw, entry.node);
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
      __setSource(file, category, path);
      await loader();
    }
    // Hand-authored stories for layers without Code Connect files (layout).
    registry.push(...layoutStories);
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
