import figma from "@figma/code-connect";
import {
  SdsText,
  SdsTextCode,
  SdsTextContentHeading,
  SdsTextContentTitle,
  SdsTextEmphasis,
  SdsTextHeading,
  SdsTextLink,
  SdsTextLinkList,
  SdsTextList,
  SdsTextListItem,
  SdsTextPrice,
  SdsTextSmall,
  SdsTextStrong,
  SdsTextSubheading,
  SdsTextSubtitle,
  SdsTextTitleHero,
  SdsTextTitlePage,
} from "primitives";

figma.connect(SdsTextTitleHero, "<FIGMA_TEXT_TEXT_TITLE_HERO>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextTitleHero>{text}</SdsTextTitleHero>,
});
figma.connect(SdsTextTitlePage, "<FIGMA_TEXT_TEXT_TITLE_PAGE>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextTitlePage>{text}</SdsTextTitlePage>,
});
figma.connect(SdsTextSubtitle, "<FIGMA_TEXT_TEXT_SUBTITLE>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextSubtitle>{text}</SdsTextSubtitle>,
});
figma.connect(SdsTextHeading, "<FIGMA_TEXT_TEXT_HEADING>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextHeading>{text}</SdsTextHeading>,
});
figma.connect(SdsTextSubheading, "<FIGMA_TEXT_TEXT_SUBHEADING>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextSubheading>{text}</SdsTextSubheading>,
});
figma.connect(SdsText, "<FIGMA_TEXT_TEXT>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsText>{text}</SdsText>,
});
figma.connect(SdsTextEmphasis, "<FIGMA_TEXT_TEXT_EMPHASIS>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextEmphasis>{text}</SdsTextEmphasis>,
});
figma.connect(SdsTextLink, "<FIGMA_TEXT_TEXT_LINK>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextLink href="#">{text}</SdsTextLink>,
});
figma.connect(SdsTextStrong, "<FIGMA_TEXT_TEXT_STRONG>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextStrong>{text}</SdsTextStrong>,
});
figma.connect(SdsTextSmall, "<FIGMA_TEXT_TEXT_SMALL>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextSmall>{text}</SdsTextSmall>,
});
figma.connect(SdsTextCode, "<FIGMA_TEXT_TEXT_CODE>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextCode>{text}</SdsTextCode>,
});
figma.connect(SdsTextList, "<FIGMA_TEXT_TEXT_LIST>", {
  props: {
    children: figma.children("Text List Item"),
    title: figma.boolean("Has Title", {
      true: figma.children("Text Strong"),
      false: undefined,
    }),
    density: figma.enum("Density", { Default: "default", Tight: "tight" }),
  },
  example: ({ children, ...props }) => (
    <SdsTextList {...props}>{children}</SdsTextList>
  ),
});
figma.connect(SdsTextLinkList, "<FIGMA_TEXT_TEXT_LINK_LIST>", {
  props: {
    children: figma.children("Text Link List Item"),
    title: figma.boolean("Has Title", {
      true: figma.children("Text Strong"),
      false: undefined,
    }),
    density: figma.enum("Density", { Default: "default", Tight: "tight" }),
  },
  example: ({ children, ...props }) => (
    <SdsTextLinkList {...props}>{children}</SdsTextLinkList>
  ),
});
figma.connect(SdsTextListItem, "<FIGMA_TEXT_TEXT_LIST_ITEM>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => <SdsTextListItem>{text}</SdsTextListItem>,
});

figma.connect(SdsTextListItem, "<FIGMA_TEXT_TEXT_LINK_LIST_ITEM>", {
  props: { text: figma.string("Text") },
  example: ({ text }) => (
    <SdsTextListItem>
      <SdsTextLink href="#">{text}</SdsTextLink>
    </SdsTextListItem>
  ),
});

figma.connect(SdsTextPrice, "<FIGMA_TEXT_TEXT_PRICE>", {
  props: {
    label: figma.string("Label"),
    size: figma.enum("Size", {
      Small: "small",
    }),
    currency: figma.string("Currency"),
    price: figma.string("Price"),
  },
  example: ({ ...props }) => <SdsTextPrice {...props} />,
});

figma.connect(SdsTextContentHeading, "<FIGMA_TEXT_TEXT_CONTENT_HEADING>", {
  props: {
    align: figma.enum("Align", { Center: "center" }),
    heading: figma.string("Heading"),
    subheading: figma.string("Subheading"),
  },
  example: ({ ...props }) => <SdsTextContentHeading {...props} />,
});

figma.connect(SdsTextContentTitle, "<FIGMA_TEXT_TEXT_CONTENT_TITLE>", {
  props: {
    align: figma.enum("Align", { Center: "center" }),
    title: figma.string("Title"),
    subtitle: figma.string("Subtitle"),
  },
  example: ({ ...props }) => <SdsTextContentTitle {...props} />,
});
