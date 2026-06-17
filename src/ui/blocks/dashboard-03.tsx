import {
  ArrowUpRight,
  Bell,
  Bot,
  CalendarDays,
  LayoutGrid,
  Search,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "utils";
import { Eyebrow, ink, InkBadge, InkPanel } from "./ink";

/**
 * The creator's backend dashboard — the "operating system" control room.
 * Modeled on the Monofly feature map (analytics, fan CRM, content calendar,
 * AI automation, design-system viewer). Concrete by design but fully
 * prop-driven, so a creator can pipe in their own KPIs and modules and
 * restyle via the shared `ink` kit. Ships with sensible defaults baked in.
 */

export interface DashboardStat {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
}

export interface DashboardModule {
  title: string;
  icon: LucideIcon;
  tag?: string;
  items: string[];
  wide?: boolean;
}

export interface BrutalistDashboardProps {
  brand?: string;
  creator?: { name: string; handle: string };
  greeting?: string;
  stats?: DashboardStat[];
  modules?: DashboardModule[];
  className?: string;
}

const DEFAULT_STATS: DashboardStat[] = [
  { label: "Subscribers", value: "12,480", delta: "+4.2%", trend: "up" },
  { label: "MRR", value: "$38.6k", delta: "+9.1%", trend: "up" },
  { label: "PPV revenue", value: "$11.2k", delta: "+1.8%", trend: "up" },
  { label: "Renew risk", value: "3.4%", delta: "-0.6%", trend: "down" },
];

const DEFAULT_MODULES: DashboardModule[] = [
  {
    title: "Analytics & revenue",
    icon: TrendingUp,
    tag: "Live",
    items: [
      "Subscriber growth & churn curves",
      "PPV breakdown by content type",
      "Revenue per character / franchise",
      "Renew risk score per fan",
    ],
  },
  {
    title: "Fan CRM",
    icon: Users,
    tag: "2.1k new",
    items: [
      "Fan profiles: spend tier, fave characters",
      "Interaction history & DM sentiment",
      "Segment by loyalty, spend, recency",
      "Cosplay request tracking per fan",
    ],
  },
  {
    title: "Content calendar",
    icon: CalendarDays,
    tag: "7 queued",
    items: [
      "Shoot planner tied to conventions",
      "Character drop scheduling",
      "Media release hype window alignment",
      "Cross-post queue to socials",
    ],
  },
  {
    title: "AI chat & automation",
    icon: Bot,
    tag: "Beta",
    items: [
      "In-character DM tone matching",
      "PPV upsell suggestions by fan tier",
      "Caption & promo copy generator",
      "Welcome flows per character persona",
    ],
  },
  {
    title: "Design system viewer",
    icon: LayoutGrid,
    tag: "Monofly UI",
    wide: true,
    items: [
      "Component browser: all available primitives & composites",
      "Token explorer: color, spacing, typography, shadow — live preview",
      "Block library: pre-assembled UI patterns for rapid page building",
      "Figma sync status — which tokens are in or out of sync",
    ],
  },
];

export function Dashboard03({
  brand = "MONOFLY",
  creator = { name: "Kaya O. Black", handle: "@kobcosplay" },
  greeting = "Creator dashboard",
  stats = DEFAULT_STATS,
  modules = DEFAULT_MODULES,
  className,
}: BrutalistDashboardProps) {
  return (
    <div className={cn("min-h-full bg-background text-foreground", className)}>
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b-2 border-foreground bg-background">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <span className={cn(ink.display, "text-xl")}>{brand}</span>
          <span className="hidden h-5 w-px bg-foreground/30 sm:block" />
          <label className="hidden flex-1 items-center gap-2 border-2 border-foreground bg-card px-3 py-1.5 sm:flex">
            <Search className="h-4 w-4" />
            <input
              placeholder="Search fans, content, modules…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="ml-auto flex items-center gap-3">
            <button
              className={cn("grid h-9 w-9 place-items-center border-2 border-foreground bg-card", ink.shadowSm, ink.press)}
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center border-2 border-foreground bg-foreground text-xs font-bold text-background">
                {initials(creator.name)}
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold">{creator.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{creator.handle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* Page heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <Eyebrow>OS / backend</Eyebrow>
            <h1 className={cn(ink.display, "text-3xl sm:text-4xl")}>{greeting}</h1>
          </div>
          <InkBadge>All systems nominal</InkBadge>
        </div>

        {/* KPI row */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <InkPanel key={s.label} className="p-4">
              <p className={cn(ink.label, "text-muted-foreground")}>{s.label}</p>
              <p className={cn(ink.display, "mt-2 text-2xl sm:text-3xl")}>{s.value}</p>
              {s.delta && (
                <p
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 font-mono text-xs",
                    s.trend === "down" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  <TrendingUp className={cn("h-3 w-3", s.trend === "down" && "rotate-180")} />
                  {s.delta}
                </p>
              )}
            </InkPanel>
          ))}
        </section>

        {/* Module grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {modules.map((m) => (
            <ModuleCard key={m.title} module={m} />
          ))}
        </section>
      </main>
    </div>
  );
}

function ModuleCard({ module }: { module: DashboardModule }) {
  const Icon = module.icon;
  return (
    <InkPanel className={cn("flex flex-col p-5", module.wide && "md:col-span-2")}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-foreground bg-foreground text-background">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className={cn(ink.display, "text-lg")}>{module.title}</h2>
        {module.tag && <InkBadge className="ml-auto">{module.tag}</InkBadge>}
      </div>
      <ul className="space-y-2">
        {module.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-foreground" />
            {item}
          </li>
        ))}
      </ul>
      <ModuleFooter />
    </InkPanel>
  );
}

function ModuleFooter(): ReactNode {
  return (
    <button
      className={cn(
        ink.label,
        "mt-5 inline-flex w-fit items-center gap-1 border-b-2 border-foreground pb-0.5 hover:gap-2 transition-[gap]",
      )}
    >
      Open module <ArrowUpRight className="h-3.5 w-3.5" />
    </button>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default Dashboard03;
