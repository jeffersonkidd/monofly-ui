// shadcn primitive lineage — Radix + Tailwind utilities, cn() helper.
// Every file in this folder belongs to the shadcn design language. Add new
// shadcn primitives here only; keep SDS primitives in ../sds.
//
// shadcn owns the bare names (Button, Avatar, Tooltip) — these match upstream
// shadcn copy-paste conventions. The SDS counterparts are exported as
// SdsButton / SdsAvatar / SdsTooltip from ../sds, so the root barrel can
// `export *` from both lineages with no name collision.

export * from "./accordion";
export * from "./alert";
export * from "./alert-dialog";
export * from "./aspect-ratio";
export * from "./avatar";
export * from "./badge";
export * from "./breadcrumb";
export * from "./button";
export * from "./button-group";
export * from "./card";
export * from "./checkbox";
export * from "./collapsible";
export * from "./context-menu";
export * from "./dialog";
export * from "./direction";
export * from "./dropdown-menu";
export * from "./empty";
export * from "./field";
export * from "./hover-card";
export * from "./input";
export * from "./input-group";
export * from "./item";
export * from "./kbd";
export * from "./label";
export * from "./menubar";
export * from "./native-select";
export * from "./navigation-menu";
export * from "./pagination";
export * from "./popover";
export * from "./progress";
export * from "./radio-group";
export * from "./scroll-area";
export * from "./select";
export * from "./separator";
export * from "./sheet";
export * from "./sidebar";
export * from "./skeleton";
export * from "./slider";
export * from "./spinner";
export * from "./switch";
export * from "./table";
export * from "./tabs";
export * from "./textarea";
export * from "./toggle";
export * from "./toggle-group";
export * from "./tooltip";