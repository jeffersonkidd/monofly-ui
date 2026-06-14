import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import { SdsButton, SdsForm, SdsInput, SdsTextContentTitle } from "primitives";

export function WelcomeHero() {
  const { isMobile } = useMediaQuery();
  const sectionPadding = isMobile ? "600" : "1600";
  const flexGap = isMobile ? "600" : "1200";

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex
        container
        wrap
        gap={flexGap}
        direction="column"
        alignPrimary="center"
        alignSecondary="center"
        type="third"
      >
        <SdsTextContentTitle
          align="center"
          title="Welcome Home"
          subtitle={<>We're happy to have&nbsp;you.</>}
        />
        <SdsForm singleLine>
          <SdsInput aria-label="Email address" placeholder="you@example.com" />
          <SdsButton onPress={() => {}} variant="neutral">
            Get updates
          </SdsButton>
        </SdsForm>
      </Flex>
    </Section>
  );
}
