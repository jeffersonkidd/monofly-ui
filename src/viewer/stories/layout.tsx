// Hand-authored stories for the `layout` layer (Flex, Grid, Section and their
// items). These components have no `.figma.tsx` Code Connect files, so instead
// of being captured from a snippet they're declared here and plugged into the
// exact same control/resolve pipeline used for Code Connect entries — props are
// described with the shim's descriptor factories so enums/booleans become live
// controls.

import { Flex, FlexItem, Grid, GridItem, Section } from "layout";
import figma, { type ConnectEntry } from "../code-connect-shim";

const GAPS = { "100": "100", "200": "200", "400": "400", "600": "600", "800": "800", "1200": "1200" };

/** A labelled placeholder so flex/grid behaviour is visible. */
function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-w-24 place-items-center rounded-md border border-primary/30 bg-primary/10 px-6 py-5 text-xs font-medium text-foreground">
      {children}
    </div>
  );
}

function boxes(n: number) {
  return Array.from({ length: n }, (_, i) => <Box key={i}>{i + 1}</Box>);
}

function story(s: Omit<ConnectEntry, "id" | "node" | "modulePath" | "componentName"> & {
  componentName: string;
}): ConnectEntry {
  return { id: `local::${s.category}::${s.componentName}`, node: "", modulePath: "", ...s };
}

export const layoutStories: ConnectEntry[] = [
  story({
    component: Flex,
    componentName: "Flex",
    category: "layout",
    sourceFile: "Flex",
    props: {
      direction: figma.enum("Direction", {
        row: "row",
        column: "column",
        "row-reverse": "row-reverse",
        "column-reverse": "column-reverse",
      }),
      gap: figma.enum("Gap", GAPS),
      alignPrimary: figma.enum("Align primary", {
        start: "start",
        center: "center",
        end: "end",
        "space-between": "space-between",
        stretch: "stretch",
      }),
      alignSecondary: figma.enum("Align secondary", {
        start: "start",
        center: "center",
        end: "end",
        stretch: "stretch",
      }),
      wrap: figma.boolean("Wrap"),
      container: figma.boolean("Container (max-width)"),
      count: figma.enum("Items", { "4": "4", "8": "8", "16": "16" }),
    },
    example: ({ count, ...props }: any) => (
      <Flex {...props} style={{ width: "100%", minHeight: 140 }}>
        {boxes(Number(count))}
      </Flex>
    ),
    snippet: `<Flex direction="row" gap="400" alignPrimary="start" wrap>
  <div>…</div>
  <div>…</div>
</Flex>`,
  }),

  story({
    component: FlexItem,
    componentName: "FlexItem",
    category: "layout",
    sourceFile: "Flex",
    props: {
      direction: figma.enum("Direction", { row: "row", column: "column" }),
      gap: figma.enum("Gap", GAPS),
    },
    example: ({ direction, gap }: any) => (
      <Flex direction={direction} gap={gap} style={{ width: "100%" }}>
        {(["full", "major", "minor", "half", "fill"] as const).map((size) => (
          <FlexItem key={size} size={size}>
            <Box>{size}</Box>
          </FlexItem>
        ))}
      </Flex>
    ),
    snippet: `<Flex gap="400">
  <FlexItem size="major">…</FlexItem>
  <FlexItem size="minor">…</FlexItem>
</Flex>`,
  }),

  story({
    component: Grid,
    componentName: "Grid",
    category: "layout",
    sourceFile: "Grid",
    props: {
      columns: figma.enum("Columns", {
        "repeat(auto-fill, minmax(120px, 1fr))": "repeat(auto-fill, minmax(120px, 1fr))",
        "repeat(2, 1fr)": "repeat(2, 1fr)",
        "repeat(3, 1fr)": "repeat(3, 1fr)",
        "repeat(4, 1fr)": "repeat(4, 1fr)",
        "1fr 2fr": "1fr 2fr",
      }),
      gap: figma.enum("Gap", GAPS),
      justifyItems: figma.enum("Justify items", {
        stretch: "stretch",
        start: "start",
        center: "center",
        end: "end",
      }),
      alignItems: figma.enum("Align items", {
        stretch: "stretch",
        start: "start",
        center: "center",
        end: "end",
      }),
      container: figma.boolean("Container (max-width)"),
      count: figma.enum("Items", { "6": "6", "9": "9", "12": "12" }),
    },
    example: ({ count, ...props }: any) => (
      <Grid {...props} style={{ width: "100%" }}>
        {boxes(Number(count))}
      </Grid>
    ),
    snippet: `<Grid columns="repeat(auto-fill, minmax(120px, 1fr))" gap="400">
  <div>…</div>
  <div>…</div>
</Grid>`,
  }),

  story({
    component: GridItem,
    componentName: "GridItem",
    category: "layout",
    sourceFile: "Grid",
    props: {
      gap: figma.enum("Gap", GAPS),
    },
    example: ({ gap }: any) => (
      <Grid columns="repeat(4, 1fr)" gap={gap} style={{ width: "100%" }}>
        <GridItem column="span 2">
          <Box>span 2</Box>
        </GridItem>
        <GridItem column="span 2">
          <Box>span 2</Box>
        </GridItem>
        <GridItem column="span 4">
          <Box>span 4</Box>
        </GridItem>
        <GridItem column="2 / 4">
          <Box>2 / 4</Box>
        </GridItem>
      </Grid>
    ),
    snippet: `<Grid columns="repeat(4, 1fr)" gap="400">
  <GridItem column="span 2">…</GridItem>
  <GridItem column="2 / 4">…</GridItem>
</Grid>`,
  }),

  story({
    component: Section,
    componentName: "Section",
    category: "layout",
    sourceFile: "Section",
    props: {
      variant: figma.enum("Variant", {
        subtle: "subtle",
        neutral: "neutral",
        brand: "brand",
        stroke: "stroke",
      }),
      padding: figma.enum("Padding", { "600": "600", "800": "800", "1200": "1200", "1600": "1600" }),
      elementType: figma.enum("Element", { section: "section", header: "header", footer: "footer" }),
    },
    example: (props: any) => (
      <Section {...props} style={{ width: "100%" }}>
        <Flex direction="column" gap="200" alignPrimary="center">
          <Box>Section content</Box>
        </Flex>
      </Section>
    ),
    snippet: `<Section variant="brand" padding="1200">
  …
</Section>`,
  }),
];
