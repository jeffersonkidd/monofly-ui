// Turns the introspectable descriptors from the shim into (a) interactive
// control specs, (b) concrete prop values for a live render, and (c) a list of
// nested components. Kept separate from the shim so the shim has no React/JSX
// dependency.

import React from "react";
import { isDescriptor, type Descriptor } from "./code-connect-shim";

// ---------------------------------------------------------------------------
// Placeholders for things the viewer can't materialise from a real Figma file
// (an instance swap, or a set of child layers). They render as labelled chips.
// ---------------------------------------------------------------------------

export function InstanceChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-border bg-muted px-1.5 py-0.5 align-middle text-[11px] text-muted-foreground">
      <span className="opacity-60">◇</span>
      {label}
    </span>
  );
}

export function ChildrenChip({ layers }: { layers: string | string[] }) {
  const text = Array.isArray(layers) ? layers.join(" · ") : layers;
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-border bg-muted px-1.5 py-0.5 align-middle text-[11px] text-muted-foreground">
      <span className="opacity-60">▤</span>
      {text}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Controls
// ---------------------------------------------------------------------------

export interface Control {
  /** Dotted path into the props object, e.g. "variant" or "textPrice.size". */
  path: string;
  label: string;
  kind: "string" | "enum" | "boolean";
  options?: string[];
  default: string | boolean;
}

/** Build the editable controls for a story from its top-level + nested props. */
export function extractControls(props: Record<string, unknown>): Control[] {
  const out: Control[] = [];

  const addLeaf = (path: string, label: string, d: Descriptor) => {
    if (d.__cc === "string") {
      out.push({ path, label, kind: "string", default: d.def ?? d.label });
    } else if (d.__cc === "enum") {
      const options = Object.keys(d.mapping);
      out.push({ path, label, kind: "enum", options, default: options[0] ?? "" });
    } else if (d.__cc === "boolean") {
      out.push({ path, label, kind: "boolean", default: false });
    }
  };

  for (const [key, d] of Object.entries(props)) {
    if (!isDescriptor(d)) continue;
    if (d.__cc === "nestedProps") {
      for (const [sk, sd] of Object.entries(d.props)) {
        if (isDescriptor(sd)) addLeaf(`${key}.${sk}`, `${d.label} › ${sd.label}`, sd);
      }
    } else {
      addLeaf(key, d.label, d);
    }
  }
  return out;
}

export type ControlValues = Record<string, string | boolean>;

export function defaultValues(controls: Control[]): ControlValues {
  const v: ControlValues = {};
  for (const c of controls) v[c.path] = c.default;
  return v;
}

// ---------------------------------------------------------------------------
// Resolution: descriptors -> concrete values, honouring current control state.
// ---------------------------------------------------------------------------

function resolveAt(value: unknown, path: string, values: ControlValues): unknown {
  if (!isDescriptor(value)) {
    // A literal (string, JSX, etc.) that may still contain embedded descriptors.
    return deepResolveTree(value, values);
  }
  switch (value.__cc) {
    case "string":
      return values[path] ?? value.def ?? value.label;
    case "enum": {
      const key = (values[path] as string) ?? Object.keys(value.mapping)[0];
      return resolveAt(value.mapping[key], path, values);
    }
    case "boolean": {
      const on = Boolean(values[path]);
      if (!value.mapping) return on;
      return resolveAt(on ? value.mapping.true : value.mapping.false, path, values);
    }
    case "instance":
      return <InstanceChip label={value.label} />;
    case "children":
      return <ChildrenChip layers={value.layers} />;
    case "nestedProps": {
      const obj: Record<string, unknown> = {};
      for (const [sk, sd] of Object.entries(value.props)) {
        obj[sk] = resolveAt(sd, `${path}.${sk}`, values);
      }
      return obj;
    }
  }
}

/** Resolve a story's full props config into concrete values for `example()`. */
export function resolveProps(
  props: Record<string, unknown>,
  values: ControlValues,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, d] of Object.entries(props)) out[key] = resolveAt(d, key, values);
  return out;
}

/**
 * Some examples embed descriptors directly inside JSX (e.g. a Menu item's
 * `<SdsMenuDescription>{figma.string("Description")}</SdsMenuDescription>`).
 * Those end up as element children that React can't render, so we walk the
 * produced tree and resolve any leftover descriptors to their defaults.
 */
export function deepResolveTree(node: unknown, values: ControlValues): React.ReactNode {
  if (isDescriptor(node)) return resolveLoose(node, values) as React.ReactNode;
  if (Array.isArray(node)) return node.map((n) => deepResolveTree(n, values));
  if (React.isValidElement(node)) {
    const children = (node.props as { children?: unknown }).children;
    if (children === undefined) return node;
    return React.cloneElement(node, undefined, deepResolveTree(children, values));
  }
  return node as React.ReactNode;
}

/** Resolve a descriptor that has no control path (embedded in JSX) to a default. */
function resolveLoose(d: Descriptor, values: ControlValues): unknown {
  switch (d.__cc) {
    case "string":
      return d.def ?? d.label;
    case "enum":
      return resolveLoose(d.mapping[Object.keys(d.mapping)[0]] as Descriptor, values);
    case "boolean":
      return d.mapping ? deepResolveTree(d.mapping.false, values) : false;
    case "instance":
      return <InstanceChip label={d.label} />;
    case "children":
      return <ChildrenChip layers={d.layers} />;
    case "nestedProps": {
      const obj: Record<string, unknown> = {};
      for (const [sk, sd] of Object.entries(d.props)) obj[sk] = resolveLoose(sd as Descriptor, values);
      return obj;
    }
  }
}

// ---------------------------------------------------------------------------
// Nested-component collection (instances + child layers, anywhere in props).
// ---------------------------------------------------------------------------

export interface NestedRef {
  type: "instance" | "children";
  label: string;
}

export function collectNested(props: Record<string, unknown>): NestedRef[] {
  const out: NestedRef[] = [];
  const seen = new Set<string>();

  const push = (ref: NestedRef) => {
    const key = `${ref.type}:${ref.label}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(ref);
    }
  };

  const walk = (v: unknown) => {
    if (isDescriptor(v)) {
      if (v.__cc === "instance") push({ type: "instance", label: v.label });
      else if (v.__cc === "children")
        push({ type: "children", label: Array.isArray(v.layers) ? v.layers.join(", ") : v.layers });
      else if (v.__cc === "enum") Object.values(v.mapping).forEach(walk);
      else if (v.__cc === "boolean" && v.mapping) {
        walk(v.mapping.true);
        walk(v.mapping.false);
      } else if (v.__cc === "nestedProps") Object.values(v.props).forEach(walk);
      return;
    }
    if (Array.isArray(v)) return v.forEach(walk);
    if (React.isValidElement(v)) return walk((v.props as { children?: unknown }).children);
    if (v && typeof v === "object") Object.values(v).forEach(walk);
  };

  Object.values(props).forEach(walk);
  return out;
}
