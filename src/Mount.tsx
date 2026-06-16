import { useState, type ReactNode } from "react"
import { AllProviders } from "data"
import { ModeToggle } from "compositions"
import { cn } from "utils"

// A light, flexible dev mount for eyeballing blocks side by side.
//
// Register any view in `VIEWS` below (label + render fn). The floating toolbar
// switches the active view; the "Split" toggle drops into a two-pane compare
// where each pane has its own picker, so you can hold any two views up against
// each other. Everything renders inside <AllProviders>, so theme + data hooks
// work and the ModeToggle flips light/dark for both panes at once.
//
// This is dev-only scaffolding — it is not exported from the library barrel.

export interface MountView {
  label: string
  render: () => ReactNode
}

// ── Registry — add/remove entries here ────────────────────────────────────
import {
  BrutalistDashboard,
  Dash03,
  Link01,
  LinkInBio,
  PasswordGate,
} from "blocks"

const VIEWS = {
  "dashboard-01": { label: "dashboard-01", render: () => <Dash03 /> },
  "link-01": { label: "link-01", render: () => <Link01 /> },
  brutalist: { label: "brutalist", render: () => <BrutalistDashboard /> },
  gated: {
    label: "gated",
    render: () => (
      <PasswordGate hint="Demo password: monofly">
        <BrutalistDashboard />
      </PasswordGate>
    ),
  },
  "link-in-bio": { label: "link-in-bio", render: () => <LinkInBio /> },
} satisfies Record<string, MountView>

type ViewKey = keyof typeof VIEWS
const KEYS = Object.keys(VIEWS) as ViewKey[]

function Picker({
  value,
  onChange,
}: {
  value: ViewKey
  onChange: (k: ViewKey) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {KEYS.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "px-3 py-1 font-mono text-xs uppercase tracking-[0.15em]",
            value === key ? "bg-foreground text-background" : "hover:bg-muted",
          )}
        >
          {VIEWS[key].label}
        </button>
      ))}
    </div>
  )
}

export default function Mount() {
  const [split, setSplit] = useState(true)
  const [left, setLeft] = useState<ViewKey>(KEYS[0])
  const [right, setRight] = useState<ViewKey>(KEYS[1] ?? KEYS[0])

  return (
    <AllProviders>
      {/* Floating toolbar */}
      <div className="fixed left-1/2 top-220 z-50 flex max-w-[95vw] -translate-x-1/2 flex-wrap items-center justify-center gap-2 border-2 border-foreground bg-background p-1 shadow-[4px_4px_0_0_var(--foreground)]">
        <Picker value={left} onChange={setLeft} />
        {split && (
          <>
            <span className="h-5 w-px bg-foreground/30" />
            <Picker value={right} onChange={setRight} />
          </>
        )}
        <span className="h-5 w-px bg-foreground/30" />
        <button
          onClick={() => setSplit((s) => !s)}
          className={cn(
            "px-3 py-1 font-mono text-xs uppercase tracking-[0.15em]",
            split ? "bg-foreground text-background" : "hover:bg-muted",
          )}
        >
          Split
        </button>
        <ModeToggle />
      </div>

      {split ? (
        <div className="flex h-screen w-screen divide-x-2 divide-foreground">
          <div className="h-screen flex-1 overflow-auto">{VIEWS[left].render()}</div>
          <div className="h-screen flex-1 overflow-auto">{VIEWS[right].render()}</div>
        </div>
      ) : (
        VIEWS[left].render()
      )}
    </AllProviders>
  )
}
