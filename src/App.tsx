import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { Demo } from "./ui/blocks/Demo";
import { FAQs } from "./ui/blocks/FAQs";
import { PanelSections } from "./ui/blocks/PanelSections";
import { PricingGrid } from "./ui/blocks/PricingGrid";
import { ProductDetails } from "./ui/blocks/ProductDetails";
import { ProductGrid } from "./ui/blocks/ProductGrid";
import { WelcomeHero } from "./ui/blocks/WelcomeHero";

function App() {
  return (
    <AllProviders>
      <Header />
      <Demo />
      <WelcomeHero />
      <PanelSections />
      <PricingGrid />
      <FAQs />
      <ProductDetails />
      <ProductGrid />
      <Footer />
    </AllProviders>
  );
}

export default App;
