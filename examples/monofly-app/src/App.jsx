// Every UI module on this page is imported from the published `monofly`
// package — no local components, no bespoke markup, no one-off styling.
//
// `BrandTemplate` is the page shell: it already wires up `<AllProviders>`
// (theme/auth/pricing/products context) plus a permanent Header and Footer,
// so the app body is just a stack of monofly section blocks.
import { BrandTemplate, WelcomeHero, PricingGrid, FAQs } from "monofly";

export default function App() {
  return (
    <BrandTemplate>
      <WelcomeHero />
      <PricingGrid />
      <FAQs />
    </BrandTemplate>
  );
}
