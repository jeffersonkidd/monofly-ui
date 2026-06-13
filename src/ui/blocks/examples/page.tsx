import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { Demo, FAQs, PanelSections, PricingGrid, ProductDetails, ProductGrid, WelcomeHero} from "blocks";

function SdsDemo() {
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

export default SdsDemo;
