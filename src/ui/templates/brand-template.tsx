import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Flex } from "layout";
import { Header, Footer } from "compositions";
import { cn } from "lib";

export type BrandTemplateProps = ComponentPropsWithoutRef<"div"> & {
  /** Page header. Defaults to `<Header />`; pass a configured Header instance to override (e.g. `currentPath`, `logoSrc`). */
  header?: ReactNode;
  /** Page body. */
  children: ReactNode;
  /** Page footer. Defaults to `<Footer />`; pass `null` to omit. */
  footer?: ReactNode;
  /** Render the gold blur backdrop. Default: true. */
  showBackdrop?: boolean;
  /** Render the navy side gradient gutters. Default: true. */
  showGutters?: boolean;
};

export function BrandTemplate({
  header = <Header />,
  footer = <Footer />,
  children,
  showBackdrop = true,
  showGutters = true,
  className,
  ...props
}: BrandTemplateProps) {
  return (
    <div
      className={cn("w-full relative overflow-hidden", className)}
      {...props}
    >
      {showBackdrop && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-20 h-96 w-96 rounded-full bg-gradient-to-br from-secondary/30 to-transparent blur-3xl" />
          <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-secondary/30 to-transparent blur-3xl" />
        </div>
      )}

      {header}

      <main className="relative">
        {showGutters && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-120 bg-gradient-to-r from-black/15 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-120 bg-gradient-to-l from-primary/100 to-transparent"
            />
          </>
        )}
        <Flex direction="column" className="relative min-w-0">
          {children}
        </Flex>
      </main>

      {footer}
    </div>
  );
}
BrandTemplate.displayName = "BrandTemplate";
