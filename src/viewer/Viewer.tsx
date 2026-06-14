import { useEffect, useMemo, useState } from "react";
import { ModeToggle } from "compositions";
import type { ConnectEntry } from "./code-connect-shim";
import { isDescriptor, type Descriptor } from "./code-connect-shim";
import { loadRegistry, figmaUrl } from "./registry";
import {
  collectNested,
  deepResolveTree,
  defaultValues,
  extractControls,
  resolveProps,
  type Control,
  type ControlValues,
} from "./resolve";
import { ErrorBoundary } from "./ErrorBoundary";

export default function Viewer() {
  const [entries, setEntries] = useState<ConnectEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Control values are kept per story so switching back and forth is sticky.
  const [valuesById, setValuesById] = useState<Record<string, ControlValues>>({});

  useEffect(() => {
    loadRegistry().then((reg) => {
      setEntries([...reg]);
      setSelectedId((id) => id ?? reg[0]?.id ?? null);
    });
  }, []);

  const grouped = useMemo(() => groupByCategory(entries), [entries]);
  const selected = entries.find((e) => e.id === selectedId) ?? null;

  const controls = useMemo<Control[]>(
    () => (selected ? extractControls(selected.props) : []),
    [selected],
  );

  // Lazily seed control defaults the first time a story is opened.
  const values = selected ? valuesById[selected.id] ?? defaultValues(controls) : {};
  const setValue = (path: string, value: string | boolean) => {
    if (!selected) return;
    setValuesById((prev) => ({
      ...prev,
      [selected.id]: { ...(prev[selected.id] ?? defaultValues(controls)), [path]: value },
    }));
  };
  const reset = () => {
    if (!selected) return;
    setValuesById((prev) => ({ ...prev, [selected.id]: defaultValues(controls) }));
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">monofly</p>
            <p className="text-xs text-muted-foreground">Component Viewer</p>
          </div>
          <ModeToggle />
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {grouped.map(([category, items]) => (
            <div key={category} className="mb-3">
              <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {category}
              </p>
              {items.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelectedId(entry.id)}
                  className={
                    "block w-full truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors " +
                    (entry.id === selectedId
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/80 hover:bg-muted")
                  }
                >
                  {entry.componentName}
                  <span className="ml-1 text-xs text-muted-foreground">{entry.sourceFile}</span>
                </button>
              ))}
            </div>
          ))}
          {entries.length === 0 && (
            <p className="px-2 py-4 text-sm text-muted-foreground">Loading stories…</p>
          )}
        </nav>
        <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          {entries.length} Code Connect snippets
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {selected ? (
          <Story
            key={selected.id}
            entry={selected}
            controls={controls}
            values={values}
            setValue={setValue}
            reset={reset}
          />
        ) : (
          <div className="grid flex-1 place-items-center text-muted-foreground">
            Select a component
          </div>
        )}
      </main>
    </div>
  );
}

function Story({
  entry,
  controls,
  values,
  setValue,
  reset,
}: {
  entry: ConnectEntry;
  controls: Control[];
  values: ControlValues;
  setValue: (path: string, value: string | boolean) => void;
  reset: () => void;
}) {
  const url = figmaUrl(entry.node);
  const nested = useMemo(() => collectNested(entry.props), [entry]);

  const preview = useMemo(() => {
    if (!entry.example) return null;
    const resolved = resolveProps(entry.props, values);
    return deepResolveTree(entry.example(resolved), values);
  }, [entry, values]);

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold">{entry.componentName}</h1>
          <p className="text-xs text-muted-foreground">
            {entry.category} / {entry.sourceFile}.figma.tsx
          </p>
        </div>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Open in Figma ↗
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">{entry.node}</span>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Preview canvas */}
        <section className="flex-1 overflow-auto p-8">
          <div className="grid min-h-full place-items-center rounded-lg border border-dashed border-border bg-muted/30 p-10">
            <ErrorBoundary resetKey={values}>
              {preview ?? <p className="text-sm text-muted-foreground">No example defined.</p>}
            </ErrorBoundary>
          </div>
        </section>

        {/* Inspector */}
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-border bg-card p-4">
          <Panel title="Controls">
            {controls.length === 0 ? (
              <Empty>No editable props.</Empty>
            ) : (
              <div className="space-y-3">
                {controls.map((c) => (
                  <ControlField
                    key={c.path}
                    control={c}
                    value={values[c.path]}
                    onChange={(v) => setValue(c.path, v)}
                  />
                ))}
                <button
                  onClick={reset}
                  className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                >
                  Reset to defaults
                </button>
              </div>
            )}
          </Panel>

          <Panel title="Properties">
            {Object.keys(entry.props).length === 0 ? (
              <Empty>This component takes no Code Connect props.</Empty>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="pb-1 font-medium">Prop</th>
                    <th className="pb-1 font-medium">Type</th>
                    <th className="pb-1 font-medium">Figma</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(entry.props).map(([key, d]) => (
                    <tr key={key} className="border-t border-border/60 align-top">
                      <td className="py-1 pr-2 font-mono">{key}</td>
                      <td className="py-1 pr-2 text-muted-foreground">{describe(d)}</td>
                      <td className="py-1 text-muted-foreground">{figmaLabel(d)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Panel>

          <Panel title="Nested components">
            {nested.length === 0 ? (
              <Empty>None.</Empty>
            ) : (
              <ul className="space-y-1 text-xs">
                {nested.map((n, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                      {n.type === "instance" ? "swap" : "slot"}
                    </span>
                    <span className="font-mono">{n.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </aside>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function ControlField({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: string | boolean;
  onChange: (v: string | boolean) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-foreground/80">{control.label}</span>
      {control.kind === "string" && (
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm"
        />
      )}
      {control.kind === "enum" && (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm"
        >
          {control.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {control.kind === "boolean" && (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 align-middle"
        />
      )}
    </label>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

function groupByCategory(entries: ConnectEntry[]): [string, ConnectEntry[]][] {
  const map = new Map<string, ConnectEntry[]>();
  for (const e of entries) {
    if (!map.has(e.category)) map.set(e.category, []);
    map.get(e.category)!.push(e);
  }
  return [...map.entries()];
}

function describe(d: unknown): string {
  if (!isDescriptor(d)) return "static";
  const cc = (d as Descriptor).__cc;
  if (cc === "enum") return `enum(${Object.keys((d as any).mapping).join(" | ")})`;
  if (cc === "nestedProps") return "nested";
  return cc;
}

function figmaLabel(d: unknown): string {
  if (!isDescriptor(d)) return "—";
  const desc = d as Descriptor;
  if (desc.__cc === "children") return Array.isArray(desc.layers) ? desc.layers.join(", ") : desc.layers;
  return (desc as { label?: string }).label ?? "—";
}
