"use client"

import { AppTemplate } from "templates"
import { SidebarTrigger } from "primitives"
import { AppSidebar07, type AppSidebarUser } from "../sidebars/sidebar-07"

/** Static demo dashboard — the same app shell as DashboardShell, with a fixed user (no auth wiring). */
const demoUser: AppSidebarUser = {
  name: "Acme Inc",
  email: "team@acme.com",
  avatar: "",
}

export function AppDashboard({ children }: { children: React.ReactNode }) {
  return (
    <AppTemplate
      sidebar={<AppSidebar07 user={demoUser} />}
      header={
        <div className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium">Dashboard</span>
        </div>
      }
      content={children}
    />
  )
}
AppDashboard.displayName = "AppDashboard"
