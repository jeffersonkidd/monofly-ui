import figma from "@figma/code-connect";
import { SdsSelect, SdsSelectField, SdsSelectItem } from "primitives";

figma.connect(SdsSelect, "<FIGMA_INPUTS_SELECT_FIELD>", {
  variant: { "Has Label": false },
  props: {
    isDisabled: figma.enum("State", { Disabled: true }),
    value: figma.enum("Value Type", {
      Default: figma.string("Value"),
    }),
    placeholder: figma.enum("Value Type", {
      default: "I am a placeholder...",
      Placeholder: figma.string("Value"),
    }),
    defaultSelectedKey: figma.string("Value"),
  },
  example: ({ defaultSelectedKey, ...props }) => (
    <SdsSelect defaultSelectedKey={defaultSelectedKey} {...props}>
      <SdsSelectItem>{defaultSelectedKey}</SdsSelectItem>
      <SdsSelectItem>Option 2</SdsSelectItem>
      <SdsSelectItem>Option 3</SdsSelectItem>
      <SdsSelectItem>Option 4</SdsSelectItem>
      <SdsSelectItem>Option 5</SdsSelectItem>
    </SdsSelect>
  ),
});

figma.connect(SdsSelectField, "<FIGMA_INPUTS_SELECT_FIELD>", {
  variant: { "Has Label": true },
  props: {
    isDisabled: figma.enum("State", { Disabled: true }),
    errorMessage: figma.enum("State", { Error: figma.string("Error") }),
    label: figma.string("Label"),
    description: figma.boolean("Has Description", {
      true: figma.string("Description"),
      false: undefined,
    }),
    value: figma.enum("Value Type", {
      Default: figma.string("Value"),
    }),
    placeholder: figma.enum("Value Type", {
      Default: "I am a placeholder...",
      Placeholder: figma.string("Value"),
    }),
    defaultSelectedKey: figma.string("Value"),
  },
  example: ({ defaultSelectedKey, ...props }) => (
    <SdsSelectField defaultSelectedKey={defaultSelectedKey} {...props}>
      <SdsSelectItem>{defaultSelectedKey}</SdsSelectItem>
      <SdsSelectItem>Option 2</SdsSelectItem>
      <SdsSelectItem>Option 3</SdsSelectItem>
      <SdsSelectItem>Option 4</SdsSelectItem>
      <SdsSelectItem>Option 5</SdsSelectItem>
    </SdsSelectField>
  ),
});
