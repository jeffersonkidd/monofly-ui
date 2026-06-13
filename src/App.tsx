import { DashboardShell } from "templates";
import { PanelSections } from "blocks";
import { AllProviders } from "data";

export default function App() {
  return (
    <AllProviders>
      <DashboardShell>
        <PanelSections />
      </DashboardShell>
    </AllProviders>
  );
}
