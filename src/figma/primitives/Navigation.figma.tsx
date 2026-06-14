import { figma } from "@figma/code-connect";
import { SdsNavigation, SdsNavigationButton, SdsNavigationPill } from "primitives";

figma.connect(SdsNavigation, "<FIGMA_NAVIGATION_NAVIGATION_PILL_LIST>", {
  props: {
    children: figma.children("Navigation Pill"),
    direction: figma.enum("Direction", {
      Row: "row",
      Column: "column",
    }),
  },
  example: ({ children, ...props }) => (
    <SdsNavigation {...props}>{children}</SdsNavigation>
  ),
});

figma.connect(SdsNavigationPill, "<FIGMA_NAVIGATION_NAVIGATION_PILL>", {
  props: {
    label: figma.string("Label"),
    isSelected: figma.enum("State", {
      Active: true,
      Default: undefined,
      Hover: undefined,
    }),
  },
  example: ({ label, ...props }) => (
    <SdsNavigationPill {...props}>{label}</SdsNavigationPill>
  ),
});

figma.connect(SdsNavigation, "<FIGMA_NAVIGATION_NAVIGATION_BUTTON_LIST>", {
  props: {
    children: figma.children("Navigation Button"),
    direction: figma.enum("Direction", {
      Row: "row",
      Column: "column",
    }),
  },
  example: ({ children, ...props }) => (
    <SdsNavigation {...props}>{children}</SdsNavigation>
  ),
});

figma.connect(SdsNavigationButton, "<FIGMA_NAVIGATION_NAVIGATION_BUTTON>", {
  props: {
    label: figma.string("Label"),
    icon: figma.boolean("Has Icon", {
      true: figma.instance("Icon"),
      false: undefined,
    }),
    isSelected: figma.enum("State", {
      Active: true,
      Default: undefined,
      Hover: undefined,
    }),
  },
  example: ({ label, ...props }) => (
    <SdsNavigationButton {...props}>{label}</SdsNavigationButton>
  ),
});
