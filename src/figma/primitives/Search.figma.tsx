import figma from "@figma/code-connect";
import { SdsSearch } from "primitives";

figma.connect(SdsSearch, "<FIGMA_INPUTS_SEARCH>", {
  props: {
    value: figma.enum("Value Type", {
      Default: figma.string("Value"),
    }),
    placeholder: figma.enum("Value Type", {
      Default: "Placeholder here...",
      Placeholder: figma.string("Value"),
    }),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
  },
  example: ({ ...props }) => <SdsSearch {...props} />,
});
