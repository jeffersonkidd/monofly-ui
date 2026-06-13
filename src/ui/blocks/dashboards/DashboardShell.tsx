"use client"

import { AppTemplate } from "templates"
import { useAuth } from "data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from "primitives"
import { AppSidebar07, type AppSidebarUser } from "../sidebars/sidebar-07"

/** Auth-wired dashboard: pulls the current user and renders route content in the app shell. */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const sidebarUser: AppSidebarUser = {
    name: user?.name ?? "Guest",
    email: user?.email ?? "",
    avatar: user?.avatar ?? "",
  }
  return (
    <AppTemplate
      sidebar={<AppSidebar07 user={sidebarUser} />}
      header={
        <div className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      }
      content={children}
    />
  )
}
DashboardShell.displayName = "DashboardShell"
