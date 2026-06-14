import figma from "@figma/code-connect";
import { SdsIconButton } from "primitives";

const sharedProps = {
  icon: figma.instance("Icon"),
  isDisabled: figma.enum("State", {
    Disabled: true,
  }),
  size: figma.enum("Size", {
    Small: "small",
  }),
};

figma.connect(SdsIconButton, "<FIGMA_BUTTONS_ICON_BUTTON>", {
  props: {
    ...sharedProps,
    variant: figma.enum("Variant", {
      Primary: "primary",
      Neutral: "neutral",
      Subtle: "subtle",
    }),
  },
  example: ({ icon, ...props }) => (
    <SdsIconButton
      aria-label="Write a nice description of the action."
      onPress={() => {}}
      {...props}
    >
      {icon}
    </SdsIconButton>
  ),
});
