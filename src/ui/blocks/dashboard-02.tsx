import type { ReactNode } from "react";
import { cn } from "utils";
import { InkPanel, ink } from "./ink";

/**
 * Dashboard-02 — the same skeletal sidebar+header+content design as
 * Dashboard-01 (`Dash03`), restyled with the brutalist ink kit instead of the
 * shadcn `AppTemplate02` shell. Thick ink borders, hard offset shadows, mono
 * uppercase nav. Prop-driven with the same defaults as the original so it's a
 * drop-in, restyled alternative that creators can extend.
 */
export interface Dashboard02Props {
  brand?: string;
  navLabel?: string;
  nav?: string[];
  activeIndex?: number;
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function Dashboard02({
  brand = "monofly",
  navLabel = "Platform",
  nav = ["Dashboard", "Projects", "Settings"],
  activeIndex = 0,
  title = "Dashboard02",
  children,
  className,
}: Dashboard02Props) {
  return (
    <div className={cn("flex min-h-screen bg-background text-foreground", className)}>
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r-2 border-foreground bg-card">
        <div className="border-b-2 border-foreground p-4">
          <span className={cn(ink.display, "text-xl")}>{brand}</span>
        </div>
        <nav className="p-3">
          <p className={cn(ink.label, "px-2 py-2 text-muted-foreground")}>{navLabel}</p>
          <ul className="space-y-2">
            {nav.map((label, i) => (
              <li key={label}>
                <button
                  className={cn(
                    "w-full border-2 border-foreground px-3 py-2 text-left font-mono text-sm uppercase tracking-wide",
                    ink.shadowSm,
                    ink.press,
                    i === activeIndex ? "bg-foreground text-background" : "bg-card",
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b-2 border-foreground px-6">
          <span className={cn(ink.display, "text-lg")}>{title}</span>
        </header>
        <main className="flex-1 p-6">
          <InkPanel className="p-6">
            {children ?? <p className="text-sm text-muted-foreground">Main content area.</p>}
          </InkPanel>
        </main>
      </div>
    </div>
  );
}

export default Dashboard02;
