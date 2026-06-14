import figma from "@figma/code-connect";
import {
  SdsPagination,
  SdsPaginationGap,
  SdsPaginationList,
  SdsPaginationNext,
  SdsPaginationPage,
  SdsPaginationPrevious,
} from "primitives";

figma.connect(SdsPaginationPage, "<FIGMA_PAGINATION_PAGINATION_PAGE>", {
  props: {
    number: figma.string("Number"),
    current: figma.enum("State", {
      Current: true,
      "Current Hover": true,
    }),
    href: figma.string("Number"),
  },
  example: ({ number, ...props }) => (
    <SdsPaginationPage {...props}>{number}</SdsPaginationPage>
  ),
});

figma.connect(SdsPaginationGap, "<FIGMA_PAGINATION_PAGINATION_GAP>");

figma.connect(SdsPaginationPrevious, "<FIGMA_PAGINATION_PAGINATION_PREVIOUS>", {
  props: {
    href: figma.enum("State", { Default: "?previous", Hover: "?previous" }),
  },
  example: ({ ...props }) => <SdsPaginationPrevious {...props} />,
});

figma.connect(SdsPaginationNext, "<FIGMA_PAGINATION_PAGINATION_NEXT>", {
  props: {
    href: figma.enum("State", { Default: "?next", Hover: "?next" }),
  },
  example: ({ ...props }) => <SdsPaginationNext {...props} />,
});

figma.connect(SdsPaginationList, "<FIGMA_PAGINATION_PAGINATION_LIST>", {
  props: {
    children: figma.children(["Pagination Page", "Pagination Gap"]),
  },
  example: ({ children }) => <SdsPaginationList>{children}</SdsPaginationList>,
});

figma.connect(SdsPagination, "<FIGMA_PAGINATION_PAGINATION>", {
  props: {
    children: figma.children([
      "Pagination Previous",
      "Pagination List",
      "Pagination Next",
    ]),
  },
  example: ({ children }) => <SdsPagination>{children}</SdsPagination>,
});
