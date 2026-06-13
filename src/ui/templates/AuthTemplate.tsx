import { type ComponentPropsWithRef, type ReactNode } from "react"
import { Flex } from "layout"
import { cn } from "utils"

const maxWidthMap = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
} as const

export interface AuthTemplateProps extends ComponentPropsWithRef<"div"> {
  /** Logo or brand mark displayed above the form */
  logo?: ReactNode
  /** Auth form — login, register, reset, verify, etc. */
  children: ReactNode
  /** Footer content — legal links, copyright */
  footer?: ReactNode
  /** Max-width of the form card */
  maxWidth?: keyof typeof maxWidthMap
  /** Optional decorative background layer (gradient, pattern, illustration) */
  background?: ReactNode
}

export function AuthTemplate({
  logo,
  children,
  footer,
  maxWidth = "md",
  background,
  className,
  ref,
  ...props
}: AuthTemplateProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      {/* ── Decorative background ───────────────────────────── */}
      {background && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {background}
        </div>
      )}

      {/* ── Header (logo) ───────────────────────────────────── */}
      {logo && (
        <div className="relative z-10 flex h-20 items-end justify-center px-6 pt-6">
          {logo}
        </div>
      )}

      {/* ── Form content ────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        <div className={cn("w-full", maxWidthMap[maxWidth])}>
          <Flex direction="column" gap="400" alignSecondary="stretch">
            {children}
          </Flex>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      {footer && (
        <div className="relative z-10 px-6 pb-8 pt-4 text-center text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}
AuthTemplate.displayName = "AuthTemplate"