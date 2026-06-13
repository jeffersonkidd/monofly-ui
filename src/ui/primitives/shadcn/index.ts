// shadcn primitive lineage — Radix + Tailwind utilities, cn() helper.
// Every file in this folder belongs to the shadcn design language. Add new
// shadcn primitives here only; keep SDS primitives in ../sds.
//
// `Avatar`, `Button`, and `Tooltip` collide with the SDS lineage, so they are
// re-exported under Shadcn-prefixed names instead of via `export *` (a wildcard
// would leak the bare name and make the root barrel's export ambiguous).
// Non-colliding sub-parts pass through unchanged. Internal consumers
// (sidebar.tsx, nav-user.tsx) deep-import the raw files and are unaffected.


export * from "./breadcrumb";
export * from "./collapsible";
export * from "./dropdown-menu";
export * from "./separator";
export * from "./sheet";
export * from "./skeleton";
export * from "./sidebar";

export { Button as ShadcnButton, buttonVariants } from "./button";

export {
  Avatar as ShadcnAvatar,
  AvatarImage,
  AvatarFallback,
} from "./avatar";

export {
  Tooltip as ShadcnTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
