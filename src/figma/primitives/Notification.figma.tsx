import figma from "@figma/code-connect";
import { SdsNotification, SdsText, SdsTextStrong } from "primitives";

figma.connect(SdsNotification, "<FIGMA_NOTIFICATION_NOTIFICATION>", {
  props: {
    title: figma.string("Title"),
    icon: figma.boolean("Has Icon", {
      true: figma.instance("Icon"),
      false: undefined,
    }),
    isDismissible: figma.boolean("Dismissible"),
    button: figma.children("Button"),
    body: figma.string("Body"),
    variant: figma.enum("Variant", {
      Message: "message",
      Alert: "alert",
    }),
  },
  example: ({ button, body, title, ...props }) => (
    <SdsNotification {...props}>
      <SdsTextStrong>{title}</SdsTextStrong>
      <SdsText>{body}</SdsText>
      {button}
    </SdsNotification>
  ),
});
