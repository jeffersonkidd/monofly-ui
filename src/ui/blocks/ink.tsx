import { cn } from "utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Shared "ink" brutalist style kit — comic-book modern brutalism in pure
 * black & white. It rides the design system's grayscale theme tokens
 * (`--foreground` / `--background`), so it inverts cleanly in dark mode and
 * stays neutral. Everything here is intentionally thin and overridable:
 * swap a constant or pass `className` to restyle a creator's whole OS.
 */
export const ink = {
  /** Thick ink border on a card surface. */
  panel: "border-2 border-foreground bg-card",
  /** Hard offset drop shadow (no blur) — the signature brutalist look. */
  shadow: "shadow-[6px_6px_0_0_var(--foreground)]",
  shadowSm: "shadow-[4px_4px_0_0_var(--foreground)]",
  /** Tactile "press into the page" interaction for buttons/links. */
  press:
    "transition-[transform,box-shadow] duration-100 ease-out " +
    "hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--foreground)] " +
    "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
  /** Monospace, wide-tracked uppercase — used for labels/eyebrows. */
  label: "font-mono text-xs uppercase tracking-[0.15em]",
  /** Heavy condensed display type for headings. */
  display: "font-bold uppercase tracking-tight",
};

export function InkPanel({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn(ink.panel, ink.shadow, className)} {...props}>
      {children}
    </div>
  );
}

/** Inverted chip (black fill / paper text) for "POW"-style emphasis tags. */
export function InkBadge({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        ink.label,
        "inline-block border-2 border-foreground bg-foreground px-2 py-0.5 text-background",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** A comic halftone dot field, sized to sit absolutely behind content. */
export function Halftone({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.07]",
        "[background-image:radial-gradient(var(--foreground)_1.3px,transparent_1.3px)] [background-size:9px_9px]",
        className,
      )}
    />
  );
}

/** Section eyebrow: a small label with a leading ink rule. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <span className="h-3 w-3 bg-foreground" />
      <span className={ink.label}>{children}</span>
    </div>
  );
}
