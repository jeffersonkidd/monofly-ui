// A complete creator link-in-bio page from a single monofly block.
//
// `LinkInBio` is a self-contained block with sensible defaults — drop it in
// with zero props for the demo persona, or pass `name` / `handle` / `bio` /
// `links` / `socials` to make it yours. We wrap it in `<AllProviders>` so the
// theme tokens resolve the way the block was designed.
import { AllProviders, LinkInBio } from "monofly";

export default function App() {
  return (
    <AllProviders>
      <LinkInBio
        name="ATLAS"
        handle="@atlasmakes"
        bio="Generative artist & toolmaker. Daily drops, open-source kits, and the occasional livestream."
        tags={["ART", "TOOLS", "OPEN SOURCE"]}
        links={[
          { title: "New release — Kit v3", subtitle: "Fresh components, out now", tag: "New" },
          { title: "Join the workshop", subtitle: "Weekly build-alongs + source" },
          { title: "Commission a piece", subtitle: "Pitch a concept, get a quote" },
          { title: "Read the newsletter", subtitle: "Process notes every Friday" },
        ]}
      />
    </AllProviders>
  );
}
