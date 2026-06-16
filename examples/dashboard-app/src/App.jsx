// A dashboard app shell assembled entirely from monofly exports.
//
// `AppTemplate02` is the slot-based shell (sidebar header / nav / footer +
// top header + content). We fill its slots with monofly sidebar primitives and
// a grid of stat cards. It doesn't wire context itself, so we wrap it in
// `<AllProviders>` for the theme tokens the primitives expect.
import {
  AllProviders,
  AppTemplate02,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Grid,
  ModeToggle,
} from "monofly";

const NAV = ["Overview", "Projects", "Customers", "Settings"];

const STATS = [
  { label: "Revenue", value: "$48.2k", hint: "+12% from last month" },
  { label: "Active users", value: "2,318", hint: "+4% from last week" },
  { label: "Open tasks", value: "37", hint: "9 due today" },
];

export default function App() {
  return (
    <AllProviders>
      <AppTemplate02
        sidebarHeader={
          <span className="font-semibold tracking-tight">monofly</span>
        }
        nav={
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {NAV.map((label, i) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton isActive={i === 0}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        }
        sidebarFooter={<ModeToggle />}
        header={
          <div className="flex h-14 w-full items-center gap-3">
            <SidebarTrigger />
            <span className="font-medium">Overview</span>
          </div>
        }
        content={
          <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap="400">
            {STATS.map((stat) => (
              <Card key={stat.label}>
                <CardHeader>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {stat.hint}
                </CardContent>
              </Card>
            ))}
          </Grid>
        }
      />
    </AllProviders>
  );
}
