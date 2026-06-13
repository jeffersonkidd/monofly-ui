import { DashboardShell } from "blocks";
import { Modules } from "blocks";
import { AllProviders } from "data";
import { ThemeProvider } from "compositions";
// import { Demo, FAQs, PanelSections, PricingGrid, ProductDetails, ProductGrid, WelcomeHero} from "blocks";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AllProviders> 
        <DashboardShell>
          <Modules />
        </DashboardShell>
      </AllProviders>
    </ThemeProvider>
  );
}

export default App