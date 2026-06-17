// Stories for the full-page brutalist demos (dashboard + link-in-bio). Like the
// layout stories, these are hand-authored and plug into the same control
// pipeline — a few key content props are exposed as live controls to show the
// pages are prop-driven and meant to be personalized. Best viewed with the
// resizable viewport to see responsive reflow.

import { Dashboard02, LinkInBio02, PasswordGate01 } from "blocks";
import figma, { type ConnectEntry } from "../code-connect-shim";

function story(
  s: Omit<ConnectEntry, "id" | "node" | "modulePath">,
): ConnectEntry {
  return { id: `local::${s.category}::${s.componentName}`, node: "", modulePath: "", ...s };
}

export const pageStories: ConnectEntry[] = [
  story({
    component: Dashboard02,
    componentName: "BrutalistDashboard",
    category: "examples",
    sourceFile: "dashboard-02",
    props: {
      brand: figma.string("Brand", { defaultValue: "MONOFLY" }),
      greeting: figma.string("Greeting", { defaultValue: "Creator dashboard" }),
    },
    example: (props: any) => <Dashboard02 {...props} />,
    snippet: `import { Dashboard } from "monofly";

// Ships with baked defaults; pass your own KPIs + modules to extend.
<BrutalistDashboard
  brand="MONOFLY"
  creator={{ name: "Kaya O. Black", handle: "@kobcosplay" }}
  stats={myStats}
  modules={myModules}
/>`,
  }),

  story({
    component: LinkInBio02,
    componentName: "LinkInBio02",
    category: "examples",
    sourceFile: "link-in-bio-02",
    props: {
      name: figma.string("Name", { defaultValue: "KOB" }),
      handle: figma.string("Handle", { defaultValue: "@kobcosplay" }),
      bio: figma.string("Bio", {
        defaultValue:
          "Cosplayer & character creator. Comic-accurate builds, behind-the-scenes, and a little chaos.",
      }),
    },
    example: (props: any) => <LinkInBio02 {...props} />,
    snippet: `import { LinkInBio } from "monofly";

<LinkInBio
  name="KOB"
  handle="@kobcosplay"
  links={myLinks}
  socials={mySocials}
/>`,
  }),

  story({
    component: Dashboard02,
    componentName: "Dashboard02",
    category: "examples",
    sourceFile: "dashboard-02",
    props: {
      brand: figma.string("Brand", { defaultValue: "monofly" }),
      title: figma.string("Title", { defaultValue: "Dashboard" }),
    },
    example: (props: any) => <Dashboard02 {...props} />,
    snippet: `import { Dashboard02 } from "monofly";

// Dashboard-01's layout, restyled with the brutalist ink kit.
<Dashboard02 brand="monofly" nav={["Dashboard", "Projects", "Settings"]} />`,
  }),

  story({
    component: LinkInBio02,
    componentName: "LinkInBio02",
    category: "examples",
    sourceFile: "link-in-bio-02",
    props: {
      name: figma.string("Name", { defaultValue: "Hi, I'm Molly Pillar" }),
    },
    example: (props: any) => <LinkInBio02 {...props} />,
    snippet: `import { LinkInBio02 } from "monofly";

// Link-01's link-in-bio design, restyled with the brutalist ink kit.
<LinkInBio02 name="Hi, I'm Molly Pillar" />`,
  }),

  story({
    component: PasswordGate01,
    componentName: "PasswordGate",
    category: "examples",
    sourceFile: "PasswordGate",
    props: {
      title: figma.string("Title", { defaultValue: "Restricted" }),
      subtitle: figma.string("Subtitle", { defaultValue: "Dashboard access only" }),
    },
    example: (props: any) => (
      <PasswordGate01 {...props} hint="Demo password: monofly">
        <Dashboard02 />
      </PasswordGate01 >
    ),
    snippet: `import { PasswordGate, BrutalistDashboard } from "monofly";

// Soft client-side gate — keeps casual visitors out, NOT real security.
<PasswordGate01 password={import.meta.env.VITE_DASHBOARD_PASSWORD}>
  <Dashboard02 />
</PasswordGate01 >`,
  }),
];
