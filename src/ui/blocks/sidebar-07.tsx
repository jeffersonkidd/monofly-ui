"use client"

import * as React from "react"

import { NavMain } from "./components/nav-main"
import { NavProjects } from "./components/nav-projects"
import { NavUser } from "./components/nav-user"
import { TeamSwitcher } from "./components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "primitives"
import {
  sidebarConfig,
  type SidebarTeam,
  type SidebarNavItem,
  type SidebarProject,
} from "data"

/**
 * The user shown in the sidebar footer. Supplied by the caller, typically
 * mapped from AuthContext (`useAuth().user`) at render time — not stored here.
 */
export interface AppSidebarUser {
  name: string
  email: string
  avatar: string    
}
//
export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: AppSidebarUser
  /** Defaults to the static sidebarConfig; override to customize. */
  teams?: SidebarTeam[]
  navMain?: SidebarNavItem[]
  projects?: SidebarProject[]
}

export function AppSidebar07({
  user,
  teams = sidebarConfig.teams,
  navMain = sidebarConfig.navMain,
  projects = sidebarConfig.projects,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}