import figma from "@figma/code-connect";
import {
  SdsMenu,
  SdsMenuDescription,
  SdsMenuHeader,
  SdsMenuHeading,
  SdsMenuItem,
  SdsMenuLabel,
  SdsMenuSeparator,
  SdsMenuShortcut,
} from "primitives";

figma.connect(SdsMenu, "<FIGMA_MENU_MENU>", {
  props: {
    children: figma.children([
      "Menu Header",
      "Menu Separator",
      "Menu Section",
      "Menu Item",
    ]),
  },
  example: ({ children }) => <SdsMenu>{children}</SdsMenu>,
});

figma.connect(SdsMenuHeading, "<FIGMA_MENU_MENU_HEADING>", {
  props: { heading: figma.children("Text Strong") },
  example: ({ heading }) => <SdsMenuHeading>{heading}</SdsMenuHeading>,
});

figma.connect(SdsMenuShortcut, "<FIGMA_MENU_MENU_SHORTCUT>", {
  props: { shortcut: figma.string("Shortcut") },
  example: ({ shortcut }) => <SdsMenuShortcut>{shortcut}</SdsMenuShortcut>,
});

figma.connect(SdsMenuItem, "<FIGMA_MENU_MENU_ITEM>", {
  props: {
    icon: figma.boolean("Has Icon", {
      true: figma.instance("Icon"),
      false: undefined,
    }),
    description: figma.boolean("Has Description", {
      true: <SdsMenuDescription>{figma.string("Description")}</SdsMenuDescription>,
      false: undefined,
    }),
    shortcut: figma.boolean("Has Shortcut", {
      true: figma.children("Menu Shortcut"),
      false: undefined,
    }),
    label: figma.string("Label"),
  },
  example: ({ icon, label, description, shortcut }) => (
    <SdsMenuItem>
      {icon}
      <SdsMenuLabel>{label}</SdsMenuLabel>
      {shortcut}
      {description}
    </SdsMenuItem>
  ),
});

figma.connect(SdsMenuHeader, "<FIGMA_MENU_MENU_HEADER>", {
  props: {
    header: figma.children("Text Strong"),
    subhead: figma.children("Text Small"),
  },
  example: ({ header, subhead }) => (
    <SdsMenuHeader>
      {subhead}
      {header}
    </SdsMenuHeader>
  ),
});

figma.connect(SdsMenuSeparator, "<FIGMA_MENU_MENU_SEPARATOR>");
