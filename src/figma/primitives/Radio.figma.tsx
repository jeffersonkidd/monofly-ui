import figma from "@figma/code-connect";
import { SdsRadioField, SdsRadioGroup } from "primitives";

figma.connect(SdsRadioField, "<FIGMA_INPUTS_RADIO_FIELD>", {
  props: {
    label: figma.string("Label"),
    description: figma.boolean("Has Description", {
      true: figma.string("Description"),
      false: undefined,
    }),
    isDisabled: figma.enum("State", { Disabled: true }),
  },
  example: ({ ...props }) => <SdsRadioField value="Initial value" {...props} />,
});

figma.connect(SdsRadioGroup, "<FIGMA_INPUTS_RADIO_GROUP>", {
  props: { children: figma.children(["Radio Field"]) },
  example: ({ children }) => <SdsRadioGroup>{children}</SdsRadioGroup>,
});
