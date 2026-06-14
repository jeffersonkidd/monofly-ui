import figma from "@figma/code-connect";
import { placeholder } from "images";
import { SdsAvatar, SdsAvatarBlock, SdsAvatarGroup } from "primitives";

figma.connect(SdsAvatarGroup, "<FIGMA_AVATARS_AVATAR_GROUP>", {
  props: {
    spacing: figma.enum("Spacing", {
      Overlap: "negative-200",
      Spaced: "100",
    }),
    children: figma.children("Avatar"),
  },
  example: ({ children, ...props }) => (
    <SdsAvatarGroup {...props} max={3}>
      {children}
    </SdsAvatarGroup>
  ),
});
figma.connect(SdsAvatar, "<FIGMA_AVATARS_AVATAR>", {
  props: {
    square: figma.enum("Shape", {
      Square: true,
    }),
    initials: figma.enum("Type", {
      Initial: figma.string("Initials"),
    }),
    size: figma.enum("Size", {
      Large: "large",
      Small: "small",
    }),
    src: figma.enum("Type", {
      Image: placeholder,
    }),
  },
  example: ({ ...props }) => <SdsAvatar {...props} />,
});

figma.connect(SdsAvatarBlock, "<FIGMA_AVATARS_AVATAR_BLOCK>", {
  props: {
    title: figma.string("Title"),
    description: figma.string("Description"),
    children: figma.children("Avatar"),
  },
  example: ({ children, ...props }) => (
    <SdsAvatarBlock {...props}>{children}</SdsAvatarBlock>
  ),
});
