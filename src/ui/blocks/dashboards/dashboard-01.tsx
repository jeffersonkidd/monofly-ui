import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "primitives"
import { AppTemplate02 } from "templates"

export function Dash03() {
  return (
      <AppTemplate02
        sidebarHeader={<div className="font-semibold">monofly</div>}
        nav={
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {["Dashboard", "Projects", "Settings"].map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton>{label}</SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        }
        header={
          <div className="flex h-14 items-center font-medium">Dashboard</div>
        }
        content={
          <div className="text-sm text-muted-foreground">
            Main content area.
          </div>
        }
      />
  )
}
