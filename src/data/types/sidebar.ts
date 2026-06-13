import type { LucideIcon } from "lucide-react";

/**
 * A switchable team/workspace shown in the sidebar header.
 */
export interface SidebarTeam {
  name: string;
  logo: LucideIcon;
  plan: string;
}

/**
 * A leaf link under a collapsible nav group.
 */
export interface SidebarNavSubItem {
  title: string;
  url: string;
}

/**
 * A top-level nav entry. May expand into sub-items.
 */
export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarNavSubItem[];
}

/**
 * A project shortcut shown in the sidebar body.
 */
export interface SidebarProject {
  name: string;
  url: string;
  icon: LucideIcon;
}

/**
 * Static sidebar navigation configuration.
 *
 * Note: the signed-in user is intentionally NOT part of this type — it is
 * sourced from AuthContext at render time, not stored as config.
 */
export interface SidebarConfig {
  teams: SidebarTeam[];
  navMain: SidebarNavItem[];
  projects: SidebarProject[];
}
