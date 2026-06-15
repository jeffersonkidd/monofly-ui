import { useState } from "react"
import { AllProviders } from "data"
import { BrutalistDashboard, LinkInBio, PasswordGate } from "blocks"
import { ModeToggle } from "compositions"
import { cn } from "utils"

// Dev preview of the two headline creator-OS demos. The published component
// viewer (viewer.html) browses every component; this is the at-a-glance
// showcase of the most important views. The dashboard sits behind a light
// password gate (default password: "monofly"); the link in bio is public.
const DEMOS = {
  dashboard: {
    label: "Dashboard",
    render: () => (
      <PasswordGate hint="Demo password: monofly">
        <BrutalistDashboard />
      </PasswordGate>
    ),
  },
  linkinbio: { label: "Link in bio", render: () => <LinkInBio /> },
} as const

export default function App() {
  const [demo, setDemo] = useState<keyof typeof DEMOS>("dashboard")
  return (
    <AllProviders>
      <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 border-2 border-foreground bg-background p-1 shadow-[4px_4px_0_0_var(--foreground)]">
        {(Object.keys(DEMOS) as (keyof typeof DEMOS)[]).map((key) => (
          <button
            key={key}
            onClick={() => setDemo(key)}
            className={cn(
              "px-3 py-1 font-mono text-xs uppercase tracking-[0.15em]",
              demo === key ? "bg-foreground text-background" : "hover:bg-muted",
            )}
          >
            {DEMOS[key].label}
          </button>
        ))}
        <ModeToggle />
      </div>
      {DEMOS[demo].render()}
    </AllProviders>
  )
}
