import { Demo, FAQs, PanelSections, PricingGrid, ProductDetails, ProductGrid, WelcomeHero } from "blocks";
import { AllProviders } from "data";

export default function SdsDemo() {
  return (
    <AllProviders>
      <Demo />
      <WelcomeHero />
      <FAQs />
      <PanelSections />
      <PricingGrid />
      <ProductDetails />
      <ProductGrid />
    </AllProviders>
  );
}
