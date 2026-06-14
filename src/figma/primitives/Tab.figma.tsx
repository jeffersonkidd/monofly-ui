import figma from "@figma/code-connect";
import { SdsTab, SdsTabList, SdsTabPanel, SdsTabs } from "primitives";

figma.connect(SdsTab, "<FIGMA_TABS_TAB>", {
  props: {
    label: figma.string("Label"),
  },
  example: ({ label }) => <SdsTab id={label}>{label}</SdsTab>,
});

figma.connect(SdsTabs, "<FIGMA_TABS_TABS>", {
  props: {
    children: figma.children("Tab"),
  },
  example: ({ children }) => (
    <SdsTabs>
      <SdsTabList>{children}</SdsTabList>
      <SdsTabPanel id="match-each-tab">Some stuff</SdsTabPanel>
    </SdsTabs>
  ),
});
