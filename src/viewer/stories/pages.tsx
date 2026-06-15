// Stories for the full-page brutalist demos (dashboard + link-in-bio). Like the
// layout stories, these are hand-authored and plug into the same control
// pipeline — a few key content props are exposed as live controls to show the
// pages are prop-driven and meant to be personalized. Best viewed with the
// resizable viewport to see responsive reflow.

import { BrutalistDashboard, LinkInBio, PasswordGate } from "blocks";
import figma, { type ConnectEntry } from "../code-connect-shim";

function story(
  s: Omit<ConnectEntry, "id" | "node" | "modulePath">,
): ConnectEntry {
  return { id: `local::${s.category}::${s.componentName}`, node: "", modulePath: "", ...s };
}

export const pageStories: ConnectEntry[] = [
  story({
    component: BrutalistDashboard,
    componentName: "BrutalistDashboard",
    category: "examples",
    sourceFile: "BrutalistDashboard",
    props: {
      brand: figma.string("Brand", { defaultValue: "MONOFLY" }),
      greeting: figma.string("Greeting", { defaultValue: "Creator dashboard" }),
    },
    example: (props: any) => <BrutalistDashboard {...props} />,
    snippet: `import { BrutalistDashboard } from "monofly";

// Ships with baked defaults; pass your own KPIs + modules to extend.
<BrutalistDashboard
  brand="MONOFLY"
  creator={{ name: "Kaya O. Black", handle: "@kobcosplay" }}
  stats={myStats}
  modules={myModules}
/>`,
  }),

  story({
    component: LinkInBio,
    componentName: "LinkInBio",
    category: "examples",
    sourceFile: "LinkInBio",
    props: {
      name: figma.string("Name", { defaultValue: "KOB" }),
      handle: figma.string("Handle", { defaultValue: "@kobcosplay" }),
      bio: figma.string("Bio", {
        defaultValue:
          "Cosplayer & character creator. Comic-accurate builds, behind-the-scenes, and a little chaos.",
      }),
    },
    example: (props: any) => <LinkInBio {...props} />,
    snippet: `import { LinkInBio } from "monofly";

<LinkInBio
  name="KOB"
  handle="@kobcosplay"
  links={myLinks}
  socials={mySocials}
/>`,
  }),

  story({
    component: PasswordGate,
    componentName: "PasswordGate",
    category: "examples",
    sourceFile: "PasswordGate",
    props: {
      title: figma.string("Title", { defaultValue: "Restricted" }),
      subtitle: figma.string("Subtitle", { defaultValue: "Dashboard access only" }),
    },
    example: (props: any) => (
      <PasswordGate {...props} hint="Demo password: monofly">
        <BrutalistDashboard />
      </PasswordGate>
    ),
    snippet: `import { PasswordGate, BrutalistDashboard } from "monofly";

// Soft client-side gate — keeps casual visitors out, NOT real security.
<PasswordGate password={import.meta.env.VITE_DASHBOARD_PASSWORD}>
  <BrutalistDashboard />
</PasswordGate>`,
  }),
];
