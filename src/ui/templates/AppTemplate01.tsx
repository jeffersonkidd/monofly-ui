"use client"

import { type ComponentPropsWithRef, type ReactNode } from "react"
import { SidebarInset, SidebarProvider } from "primitives"
import { Flex } from "layout"
import { cn } from "utils"

export interface AppTemplateProps01
  extends Omit<ComponentPropsWithRef<"div">, "content"> {
  /** The entire sidebar — a generic `<Sidebar>` tree or a block like `<AppSidebar07 />`. */
  sidebar: ReactNode
  /** Top header bar — breadcrumbs, trigger, search, user menu. */
  header?: ReactNode
  /** Main page content. */
  content: ReactNode
  /** Optional bottom panel — status bar, quick actions. */
  panel?: ReactNode
  /** Whether the sidebar starts open. */
  defaultOpen?: boolean
}

export function AppTemplate01({
  sidebar,
  header,
  content,
  panel,
  defaultOpen = true,
  className,
  // Pulled out so it isn't spread onto SidebarProvider (a non-forwardRef fn component).
  ref: _ref,
  ...props
}: AppTemplateProps01) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className={cn("h-svh bg-background", className)}
      {...props}
    >
      {sidebar}

      <SidebarInset>
        {/* ── Header ────────────────────────────────────────── */}
        {header && (
          <header className="sticky top-0 z-30 shrink-0 border-b border-sidebar-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <Flex alignPrimary="stretch" alignSecondary="stretch" className="sm:px-6">
              {header}
            </Flex>
          </header>
        )}

        {/* ── Main content ──────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{content}</main>

        {/* ── Bottom panel ──────────────────────────────────── */}
        {panel && (
          <div className="shrink-0 border-t border-sidebar-border bg-muted/20 px-4 py-3 sm:px-6">
            {panel}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
AppTemplate01.displayName = "AppTemplate01"
