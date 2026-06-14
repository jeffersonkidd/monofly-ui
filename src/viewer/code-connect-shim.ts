// Dev-only mock of `@figma/code-connect`.
//
// The real `@figma/code-connect` package is built for STATIC parsing by the
// `figma` CLI — at runtime in a browser its helpers don't produce anything we
// can introspect or render. For the component viewer we want the opposite: a
// runtime registry of every `figma.connect(...)` call plus introspectable
// descriptors for each prop so we can build live controls.
//
// `vite.config.js` aliases `@figma/code-connect` to this file *only when
// serving* (`command === "serve"`). The library build never imports the
// `.figma.tsx` files (they aren't in any barrel) and `npx figma connect parse`
// uses the real package via the CLI, so this shim is invisible to both.

import type { ComponentType, ReactNode } from "react";

/** A captured `figma.connect(...)` registration. */
export interface ConnectEntry {
  id: string;
  component: ComponentType<any> | string;
  componentName: string;
  /** The `<FIGMA_*>` token passed to `figma.connect` (resolved to a URL later). */
  node: string;
  props: Record<string, unknown>;
  example?: (props: any) => ReactNode;
  /** Pretty source name, e.g. "Button" / "Cards". */
  sourceFile: string;
  /** Parent folder, e.g. "primitives" / "compositions". */
  category: string;
}

export const registry: ConnectEntry[] = [];

// The glob loader in registry.ts sets these right before importing each module
// so every registration knows where it came from. Imports are awaited
// sequentially, so there is no interleaving.
let currentFile = "unknown";
let currentCategory = "misc";
export function __setSource(file: string, category: string) {
  currentFile = file;
  currentCategory = category;
}

// ---------------------------------------------------------------------------
// Prop descriptors. Each returns a tagged object the viewer can inspect.
// ---------------------------------------------------------------------------

export type Descriptor =
  | { __cc: "string"; label: string; def?: string }
  | { __cc: "boolean"; label: string; mapping?: { true: unknown; false: unknown } }
  | { __cc: "enum"; label: string; mapping: Record<string, unknown> }
  | { __cc: "instance"; label: string }
  | { __cc: "children"; layers: string | string[] }
  | { __cc: "nestedProps"; label: string; props: Record<string, unknown> };

export function isDescriptor(v: unknown): v is Descriptor {
  return typeof v === "object" && v !== null && "__cc" in v;
}

function string(label: string, opts?: { defaultValue?: string }): Descriptor {
  return { __cc: "string", label, def: opts?.defaultValue };
}

function boolean(label: string, mapping?: { true: unknown; false: unknown }): Descriptor {
  return { __cc: "boolean", label, mapping };
}

function enumFn(label: string, mapping: Record<string, unknown>): Descriptor {
  return { __cc: "enum", label, mapping };
}

function instance(label: string): Descriptor {
  return { __cc: "instance", label };
}

function children(layers: string | string[]): Descriptor {
  return { __cc: "children", layers };
}

// Generic type param in source (`figma.nestedProps<T>(...)`) is erased at runtime.
function nestedProps(label: string, props: Record<string, unknown>): Descriptor {
  return { __cc: "nestedProps", label, props };
}

function connect(
  component: ConnectEntry["component"],
  node: string,
  config?: { props?: Record<string, unknown>; example?: (props: any) => ReactNode },
) {
  const componentName =
    (typeof component === "function" &&
      ((component as any).displayName || component.name)) ||
    (typeof component === "string" ? component : "Component");

  registry.push({
    id: `${node}::${componentName}::${registry.length}`,
    component,
    componentName,
    node,
    props: config?.props ?? {},
    example: config?.example,
    sourceFile: currentFile,
    category: currentCategory,
  });
}

export const figma = {
  connect,
  string,
  boolean,
  enum: enumFn,
  instance,
  children,
  nestedProps,
};

export default figma;
