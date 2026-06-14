import { useMediaQuery } from "hooks";
import { IconShoppingBag } from "icons";
import { Flex, FlexItem, Section } from "layout";
import {
  SdsAccordion,
  SdsAccordionItem,
  SdsButton as Button,
  SdsImage,
  SdsSelectField,
  SdsSelectItem,
  SdsTag,
  SdsText,
  SdsTextHeading,
  SdsTextPrice,
} from "primitives";

export function ProductDetails() {
  const { isMobile, isDesktop } = useMediaQuery();
  const flexGap = isMobile ? "600" : "1200";
  const sectionPadding = isMobile ? "600" : "1600";

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex container type="half" wrap gap={flexGap}>
        <SdsImage
          src="https://picsum.photos/seed/Modern office/1200/900"
          alt="Modern office chair in black"
          size="large"
          aspectRatio="4-3"
        />
        <FlexItem size="half">
          <Flex direction="column" gap="400" alignSecondary="stretch">
            <Flex alignSecondary="center" gap="200">
              <SdsTextHeading>Ergonomic Office Chair </SdsTextHeading>
              <SdsTag variant="secondary" scheme="positive" className="promo-tag">
                30% Off
              </SdsTag>
            </Flex>
            <FlexItem>
              <Flex direction="column" gap="200">
                <SdsTextPrice currency="$" price="129.99" />
              </Flex>
            </FlexItem>
            <SdsText>
              Experience all-day comfort with our Ergonomic Office Chair,
              featuring adjustable lumbar support, breathable mesh back, and
              smooth-rolling casters. Perfect for home or office use.
            </SdsText>
            <FlexItem>
              <Flex
                wrap
                gap="200"
                direction={isDesktop ? "row" : "column"}
                alignSecondary={isDesktop ? "end" : "stretch"}
              >
                <FlexItem size="fill">
                  <SdsSelectField
                    label="Color"
                    defaultSelectedKey="Black"
                    placeholder="Select color..."
                  >
                    <SdsSelectItem>Black</SdsSelectItem>
                    <SdsSelectItem>Gray</SdsSelectItem>
                    <SdsSelectItem>Blue</SdsSelectItem>
                    <SdsSelectItem>Red</SdsSelectItem>
                    <SdsSelectItem>White</SdsSelectItem>
                  </SdsSelectField>
                </FlexItem>
                <FlexItem size="fill">
                  <SdsSelectField
                    label="Quantity"
                    defaultSelectedKey="1"
                    placeholder="Select quantity..."
                  >
                    <SdsSelectItem>1</SdsSelectItem>
                    <SdsSelectItem>2</SdsSelectItem>
                    <SdsSelectItem>3</SdsSelectItem>
                    <SdsSelectItem>4</SdsSelectItem>
                    <SdsSelectItem>5</SdsSelectItem>
                  </SdsSelectField>
                </FlexItem>
                <Button onPress={() => {}} variant="primary">
                  Add
                  <IconShoppingBag />
                </Button>
              </Flex>
            </FlexItem>
            <SdsAccordion>
              <SdsAccordionItem title="Product Details">
                <>
                  <ul>
                    <li>Adjustable height and tilt</li>
                    <li>Breathable mesh backrest</li>
                    <li>360° swivel base</li>
                    <li>Weight capacity: 250 lbs</li>
                    <li>Easy assembly required</li>
                  </ul>
                </>
              </SdsAccordionItem>
            </SdsAccordion>
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  );
}
