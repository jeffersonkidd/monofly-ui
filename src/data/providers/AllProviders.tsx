import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { PricingProvider } from "./PricingProvider";
import { ProductsProvider } from "./ProductsProvider";
import { ThemeProvider } from "./theme-provider";

/**
 * Combined provider that wraps all SDS providers in the correct order
 * Use this at the root of your application to enable all SDS features
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <AllProviders>
 *       <YourApp />
 *     </AllProviders>
 *   );
 * }
 * ```
 */
export function AllProviders({ children }: { children?: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <PricingProvider>
          <ProductsProvider>{children}</ProductsProvider>
        </PricingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

/**
 * Alternative provider composition for apps that only need specific features
 *
 * @example
 * ```tsx
 * // E-commerce app with auth and products
 * function EcommerceApp() {
 *   return (
 *     <AuthProvider>
 *       <ProductsProvider>
 *         <ShoppingApp />
 *       </ProductsProvider>
 *     </AuthProvider>
 *   );
 * }
 *
 * // SaaS app with auth and pricing
 * function SaaSApp() {
 *   return (
 *     <AuthProvider>
 *       <PricingProvider>
 *         <SubscriptionApp />
 *       </PricingProvider>
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
