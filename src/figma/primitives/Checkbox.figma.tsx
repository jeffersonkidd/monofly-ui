import figma from "@figma/code-connect";
import { SdsCheckboxField, SdsCheckboxGroup } from "primitives";

figma.connect(SdsCheckboxField, "<FIGMA_INPUTS_CHECKBOX_FIELD>", {
  props: {
    label: figma.string("Label"),
    description: figma.boolean("Has Description", {
      true: figma.string("Description"),
      false: undefined,
    }),
    defaultSelected: figma.enum("Value Type", {
      Checked: true,
      Indeterminate: true,
    }),
    isIndeterminate: figma.enum("Value Type", {
      Indeterminate: true,
    }),
    isDisabled: figma.enum("State", {
      Disabled: true,
    }),
  },
  example: ({ ...props }) => <SdsCheckboxField {...props} />,
});

figma.connect(SdsCheckboxGroup, "<FIGMA_INPUTS_CHECKBOX_GROUP>", {
  props: { children: figma.children(["Checkbox Field"]) },
  example: ({ children }) => <SdsCheckboxGroup>{children}</SdsCheckboxGroup>,
});
