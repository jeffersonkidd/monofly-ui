import figma from "@figma/code-connect";
import { SdsAccordion, SdsAccordionItem } from "primitives";

figma.connect(SdsAccordion, "<FIGMA_ACCORDION_ACCORDION>", {
  props: {
    children: figma.children("Accordion Item"),
  },
  example: ({ children }) => <SdsAccordion>{children}</SdsAccordion>,
});

figma.connect(SdsAccordionItem, "<FIGMA_ACCORDION_ACCORDION_ITEM>", {
  props: {
    dataSelected: figma.enum("State", {
      Open: "true",
    }),
    title: figma.string("Title"),
    children: figma.string("Content"),
  },
  example: ({ dataSelected, ...props }) => <SdsAccordionItem {...props} />,
});
