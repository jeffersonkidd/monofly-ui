import figma from "@figma/code-connect";
import {
  SdsLabel,
  SdsTag,
  SdsTagToggle,
  SdsTagToggleGroup,
  SdsTagToggleList,
} from "primitives";

figma.connect(SdsTag, "<FIGMA_TAGS_TAG>", {
  props: {
    onRemove: figma.boolean("Removable", {
      true: () => {},
      false: undefined,
    }),
    label: figma.string("Label"),
    variant: figma.enum("Variant", {
      Secondary: "secondary",
    }),
    scheme: figma.enum("Scheme", {
      Danger: "danger",
      Positive: "positive",
      Warning: "warning",
      Neutral: "neutral",
    }),
  },
  example: ({ label, ...props }) => <SdsTag {...props}>{label}</SdsTag>,
});

figma.connect(SdsTagToggle, "<FIGMA_TAGS_TAG_TOGGLE>", {
  props: {
    label: figma.string("Label"),
    iconStart: figma.instance("Icon"),
  },
  example: ({ label, ...props }) => (
    <SdsTagToggle id={label} {...props}>
      {label}
    </SdsTagToggle>
  ),
});

figma.connect(SdsTagToggleGroup, "<FIGMA_TAGS_TAG_TOGGLE_GROUP>", {
  props: {
    children: figma.children("Tag Toggle"),
  },
  example: ({ children }) => (
    <SdsTagToggleGroup>
      <SdsLabel>Label this!</SdsLabel>
      <SdsTagToggleList>{children}</SdsTagToggleList>
    </SdsTagToggleGroup>
  ),
});
