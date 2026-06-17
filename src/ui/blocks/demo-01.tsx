import { BrandTemplate } from "templates";
import { Demo, FAQs, PanelSections, PricingGrid, ProductDetails, ProductGrid, WelcomeHero} from "blocks";

function Demo01() {
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

export default Demo01;
