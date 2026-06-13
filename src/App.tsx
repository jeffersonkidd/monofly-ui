import { DashboardShell } from "blocks";
import { Modules } from "blocks";
import { AllProviders } from "data";
// import { Demo, FAQs, PanelSections, PricingGrid, ProductDetails, ProductGrid, WelcomeHero} from "blocks";

function App() {
  return (
      <AllProviders> 
        <DashboardShell>
          <Modules />
        </DashboardShell>
      </AllProviders>
  );
}

export default App