import { cn } from "utils";
import { Halftone, ink } from "./ink";
import { svgPaths } from "./link-in-bio-01";

/**
 * Link-02 — the same link-in-bio design as Link-01 (avatar + heading +
 * subtitle, a row of social icon buttons, and a stack of big link rows),
 * restyled with the brutalist ink kit. Square ink panels with hard offset
 * shadows replace the soft rounded/blurred treatment; a comic halftone field
 * and sparkles replace the colored blobs. The exact same `svgPaths` glyphs are
 * reused from Link-01 so the iconography matches precisely.
 */
export interface Link02Props {
  name?: string;
  bio?: string;
  className?: string;
}

const SOCIALS: { path?: string; paths?: { d: string }[] }[] = [
  { path: svgPaths.p18abc380 },
  { paths: [{ d: svgPaths.p15fdbe00 }, { d: svgPaths.p29f765f0 }, { d: "M29.1667 10.8333H29.1833" }] },
  { path: svgPaths.p16d2aa00 },
  { path: svgPaths.p2f732a0 },
  { paths: [{ d: svgPaths.p34f19280 }] },
];

const LINKS: { label: string; primary?: boolean; arrow: string }[] = [
  { label: "Semper Feugiat", primary: true, arrow: svgPaths.p324d0480 },
  { label: "Pulvinar Amet Etiam", arrow: svgPaths.p324d0480 },
  { label: "Tincidunt Eget", arrow: svgPaths.p324d0480 },
  { label: "Pretium Nibh Lorem", arrow: svgPaths.p324d0480 },
  { label: "Platea Quisque", arrow: svgPaths.p34f64980 },
];

const STARS = [
  "left-[10%] top-[10%] rotate-[-15deg] h-6 w-6",
  "right-[15%] top-[40%] rotate-[15deg] h-4 w-4",
  "left-[20%] bottom-[20%] rotate-[45deg] h-5 w-5",
];

export function LinkInBio02({
  name = "Hi, I'm Molly Pillar",
  bio = "Sapien nec sagittis aliquam bibendum arcu feugiat pretium nibh ipsum lorem sed consequat.",
  className,
}: Link02Props) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 text-foreground",
        className,
      )}
    >
      <Halftone />

      {/* Decorative sparkles */}
      {STARS.map((pos, i) => (
        <div key={i} className={cn("pointer-events-none absolute text-foreground/25", pos)}>
          <svg className="h-full w-full" fill="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2ae0b200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </div>
      ))}

      <div className="relative z-10 flex w-full max-w-[672px] flex-col items-center gap-10 py-12">
        {/* Profile */}
        <div className="flex w-full flex-col items-center gap-8 px-2">
          <div className={cn("grid h-48 w-48 shrink-0 place-items-center border-2 border-foreground bg-foreground text-background", ink.shadow)}>
            <svg className="h-28 w-28" fill="none" viewBox="0 0 128 128">
              <path d={svgPaths.p29aedc90} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
              <path d={svgPaths.pb6001f0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
            </svg>
          </div>

          <div className="flex w-full flex-col items-center gap-5 text-center">
            <h2 className={cn(ink.display, "text-5xl sm:text-6xl")}>{name}</h2>
            <p className="max-w-[600px] text-xl text-muted-foreground">{bio}</p>
          </div>
        </div>

        {/* Social links */}
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {SOCIALS.map((social, idx) => (
            <a
              key={idx}
              href="#"
              className={cn("grid h-20 w-20 shrink-0 place-items-center border-2 border-foreground bg-card text-foreground", ink.shadowSm, ink.press)}
            >
              <svg className="h-9 w-9" viewBox="0 0 40 40" fill="none">
                {social.path ? (
                  <path d={social.path} fill="currentColor" />
                ) : (
                  social.paths?.map((p, i) => (
                    <path key={i} d={p.d} stroke="currentColor" strokeWidth="2.33333" fill="none" />
                  ))
                )}
              </svg>
            </a>
          ))}
        </div>

        {/* Main links */}
        <div className="flex w-full flex-col items-center gap-4">
          {LINKS.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className={cn(
                "group flex w-full items-center justify-between border-2 border-foreground px-8 py-6",
                ink.shadow,
                ink.press,
                link.primary ? "bg-foreground text-background" : "bg-card text-foreground",
              )}
            >
              <span className={cn(ink.display, "text-2xl")}>{link.label}</span>
              <div className="relative h-12 w-5 shrink-0">
                <svg
                  className="h-full w-full"
                  fill="none"
                  viewBox={link.arrow === svgPaths.p34f64980 ? "0 0 10.6633 10.6633" : "0 0 6.66667 11.6667"}
                >
                  <path
                    d={link.arrow}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={link.arrow === svgPaths.p34f64980 ? "1.33" : "1.66667"}
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinkInBio02;
