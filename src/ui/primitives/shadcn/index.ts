// shadcn primitive lineage — Radix + Tailwind utilities, cn() helper.
// Every file in this folder belongs to the shadcn design language. Add new
// shadcn primitives here only; keep SDS primitives in ../sds.
//
// shadcn owns the bare names (Button, Avatar, Tooltip) — these match upstream
// shadcn copy-paste conventions. The SDS counterparts are exported as
// SdsButton / SdsAvatar / SdsTooltip from ../sds, so the root barrel can
// `export *` from both lineages with no name collision.

export * from "./breadcrumb";
export * from "./collapsible";
export * from "./dropdown-menu";
export * from "./separator";
export * from "./sheet";
export * from "./skeleton";
export * from "./sidebar";
export * from "./button";
export * from "./avatar";
export * from "./tooltip";