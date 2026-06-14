import figma from "@figma/code-connect";
import {
  SdsDialog,
  SdsDialogBody,
  SdsDialogClose,
  SdsDialogModal,
  SdsDialogTitle,
} from "primitives";

figma.connect(SdsDialog, "<FIGMA_DIALOG_DIALOG_BODY>", {
  props: {
    type: figma.enum("Type", { Card: "card", Sheet: "sheet" }),
    body: figma.string("Body"),
    heading: figma.string("Heading"),
    buttons: figma.children("Button Group"),
  },
  example: ({ heading, body, buttons, ...props }) => (
    <SdsDialog {...props}>
      <SdsDialogClose onPress={() => {}} />
      <SdsDialogTitle>{heading}</SdsDialogTitle>
      <SdsDialogBody>{body}</SdsDialogBody>
      {buttons}
    </SdsDialog>
  ),
});

figma.connect(SdsDialog, "<FIGMA_DIALOG_DIALOG>", {
  props: {
    children: figma.children("Dialog Body"),
  },
  example: ({ children }) => (
    <SdsDialogModal isDismissable isOpen={true} onOpenChange={() => {}}>
      {children}
    </SdsDialogModal>
  ),
});
