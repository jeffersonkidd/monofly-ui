import { BrandTemplate } from "templates";
import { Demo, FAQs, PanelSections, PricingGrid, ProductDetails, ProductGrid, WelcomeHero} from "blocks";

function SdsDemo() {
  return (
    <BrandTemplate>
      <Demo />
      <WelcomeHero />
      <PanelSections />
      <PricingGrid />
      <FAQs />
      <ProductDetails />
      <ProductGrid />
    </BrandTemplate>
  );
}

export default SdsDemo;
