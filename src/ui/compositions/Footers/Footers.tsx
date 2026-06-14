import { useMediaQuery } from "hooks";
import { IconInstagram, IconLinkedin, IconTwitter, IconYoutube } from "icons";
import { Flex, FlexItem, Section, type SectionProps } from "layout";
import {
  SdsButtonGroup,
  SdsIconButton,
  SdsLogo,
  SdsTextLink,
  SdsTextLinkList,
  SdsTextListItem,
  SdsTextStrong,
} from "primitives";

export type FooterProps = Omit<SectionProps, "variant" | "padding" | "src">;
export function Footer({ className, ...props }: FooterProps) {
  const { isTabletDown } = useMediaQuery();
  const listDensity = isTabletDown ? "tight" : "default";
  return (
    <Section
      elementType="footer"
      variant="stroke"
      paddingTop="1600"
      paddingBottom="4000"
      style={{ marginTop: "auto" }}
      {...props}
    >
      <Flex wrap type="quarter" gap="600" container>
        <FlexItem size="minor">
          <Flex direction="column" gap="600" alignSecondary="start">
            <FlexItem>
              <SdsLogo className="footer-logo" />
            </FlexItem>
            <SdsTextLinkList density={listDensity}>
              <SdsTextListItem>
                <SdsTextLink href="https://www.figma.com">figma.com</SdsTextLink>
              </SdsTextListItem>
              <SdsTextListItem>
                <SdsTextLink href="https://www.x.com/figma">X</SdsTextLink>
              </SdsTextListItem>
              <SdsTextListItem>
                <SdsTextLink href="https://instagram.com/figma">
                  Instagram
                </SdsTextLink>
              </SdsTextListItem>
              <SdsTextListItem>
                <SdsTextLink href="https://www.youtube.com/@Figma">
                  YouTube
                </SdsTextLink>
              </SdsTextListItem>
              <SdsTextListItem>
                <SdsTextLink href="https://www.linkedin.com/company/figma/">
                  LinkedIn
                </SdsTextLink>
              </SdsTextListItem>
            </SdsTextLinkList>
          </Flex>
        </FlexItem>
        <SdsTextLinkList
          density={listDensity}
          title={<SdsTextStrong>Use cases</SdsTextStrong>}
        >
          <SdsTextListItem>
            <SdsTextLink href="#">UI design</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">UX design</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Wireframing</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Diagramming</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Brainstorming</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Online whiteboard</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Team collaboration</SdsTextLink>
          </SdsTextListItem>
        </SdsTextLinkList>
        <SdsTextLinkList
          density={listDensity}
          title={<SdsTextStrong>Explore</SdsTextStrong>}
        >
          <SdsTextListItem>
            <SdsTextLink href="#">Design</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Prototyping</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Development features</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Design systems</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Collaboration features</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Design process</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">FigJam</SdsTextLink>
          </SdsTextListItem>
        </SdsTextLinkList>
        <SdsTextLinkList
          density={listDensity}
          title={<SdsTextStrong>Resources</SdsTextStrong>}
        >
          <SdsTextListItem>
            <SdsTextLink href="#">Blog</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Best practices</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Colors</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Color wheel</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Support</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Developers</SdsTextLink>
          </SdsTextListItem>
          <SdsTextListItem>
            <SdsTextLink href="#">Resource library</SdsTextLink>
          </SdsTextListItem>
        </SdsTextLinkList>
      </Flex>
    </Section>
  );
}

export function SocialButtons() {
  return (
    <SdsButtonGroup>
      <SdsIconButton
        variant="subtle"
        aria-label="Twitter"
        href="https://www.twitter.com"
      >
        <IconTwitter />
      </SdsIconButton>
      <SdsIconButton
        variant="subtle"
        aria-label="Instagram"
        href="https://www.instagram.com"
      >
        <IconInstagram />
      </SdsIconButton>
      <SdsIconButton
        variant="subtle"
        aria-label="YouTube"
        href="https://www.youtube.com"
      >
        <IconYoutube />
      </SdsIconButton>
      <SdsIconButton
        variant="subtle"
        aria-label="LinkedIn"
        href="https://www.linkedin.com"
      >
        <IconLinkedin />
      </SdsIconButton>
    </SdsButtonGroup>
  );
}
