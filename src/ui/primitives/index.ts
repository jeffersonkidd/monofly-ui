// Root primitive barrel — composes the two design-language sub-barrels.
//
// primitives/sds/    — SDS lineage (react-aria, co-located *.css, --sds-* tokens)
// primitives/shadcn/ — shadcn lineage (Radix + Tailwind utilities, cn())
//
// Each lineage lives in its own folder with its own barrel, so a same-named
// primitive can never silently override across languages. The two real
// collisions (Avatar, Tooltip) are resolved in ./shadcn by aliasing the shadcn
// versions to ShadcnAvatar / ShadcnTooltip; SDS keeps the bare names.
//
// This flat re-export keeps every existing `from "primitives"` import working.
// For lineage-scoped imports, pull from "primitives/sds" or "primitives/shadcn".

export * from "./sds";
export * from "./shadcn";