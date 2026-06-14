import figma from "@figma/code-connect";
import { SdsTextSmall, SdsTextStrong, SdsTooltip } from "primitives";

figma.connect(SdsTooltip, "<FIGMA_TOOLTIP_TOOLTIP>", {
  props: {
    body: figma.boolean("Has Body", {
      true: <SdsTextSmall>{figma.string("Body")}</SdsTextSmall>,
      false: undefined,
    }),
    title: figma.string("Title"),
    placement: figma.enum("Placement", {
      Bottom: "bottom",
      Top: "top",
      Right: "right",
      Left: "left",
    }),
  },
  example: ({ title, body, ...props }) => (
    <SdsTooltip {...props}>
      <SdsTextStrong>{title}</SdsTextStrong>
      {body}
    </SdsTooltip>
  ),
});
