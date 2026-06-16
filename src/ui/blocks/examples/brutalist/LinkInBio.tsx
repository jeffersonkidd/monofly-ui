import {
  ArrowUpRight,
  Instagram,
  Mail,
  Music2,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { cn } from "utils";
import { Halftone, ink, InkBadge } from "./ink";

/**
 * The creator's public-facing front door — the "link in bio" page of their
 * design-system OS. This is the one screen their audience actually sees, so
 * it leads with identity and a stack of big tappable destinations. Comic-book
 * brutalist by default, and fully prop-driven for personalization.
 */

export interface BioLink {
  title: string;
  subtitle?: string;
  tag?: string;
  href?: string;
}

export interface BioSocial {
  icon: LucideIcon;
  label: string;
  href?: string;
}

export interface LinkInBioProps {
  name?: string;
  handle?: string;
  bio?: string;
  avatar?: string;
  tags?: string[];
  links?: BioLink[];
  socials?: BioSocial[];
  className?: string;
}

const DEFAULT_LINKS: BioLink[] = [
  { title: "Latest character drop", subtitle: "Cosplay set #47 — out now", tag: "New" },
  { title: "Join the inner circle", subtitle: "Subscribe for full library + DMs" },
  { title: "Custom PPV requests", subtitle: "Pick a character, pitch a scene" },
  { title: "Convention schedule", subtitle: "Where to find me IRL this season" },
  { title: "Shop prints & merch", subtitle: "Signed posters, pins, and more" },
];

const DEFAULT_SOCIALS: BioSocial[] = [
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Music2, label: "TikTok" },
  { icon: Mail, label: "Email" },
];

export function LinkInBio({
  name = "KOB",
  handle = "@kobcosplay",
  bio = "Cosplayer & character creator. Comic-accurate builds, behind-the-scenes, and a little chaos.",
  avatar,
  tags = ["COSPLAY", "PPV", "18+"],
  links = DEFAULT_LINKS,
  socials = DEFAULT_SOCIALS,
  className,
}: LinkInBioProps) {
  return (
    <div className={cn("relative min-h-full overflow-hidden bg-background text-foreground", className)}>
      <Halftone />

      <div className="relative mx-auto flex w-full max-w-[480px] flex-col items-center px-5 py-12">
        {/* Identity */}
        <div className={cn("grid h-28 w-28 place-items-center overflow-hidden border-2 border-foreground bg-card", ink.shadow)}>
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full object-cover grayscale" />
          ) : (
            <span className={cn(ink.display, "text-4xl")}>{name.slice(0, 2)}</span>
          )}
        </div>

        <h1 className={cn(ink.display, "mt-5 text-center text-4xl sm:text-5xl")}>{name}</h1>
        <p className={cn(ink.label, "mt-1 text-muted-foreground")}>{handle}</p>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <InkBadge key={t}>{t}</InkBadge>
          ))}
        </div>

        <p className="mt-4 max-w-sm text-center text-sm leading-relaxed text-foreground/85">{bio}</p>

        {/* Link stack */}
        <nav className="mt-8 flex w-full flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href ?? "#"}
              className={cn(
                "group flex items-center gap-3 border-2 border-foreground bg-card px-4 py-3.5 text-left",
                ink.shadow,
                ink.press,
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn(ink.display, "truncate text-base")}>{link.title}</span>
                  {link.tag && <InkBadge>{link.tag}</InkBadge>}
                </div>
                {link.subtitle && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{link.subtitle}</p>
                )}
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:rotate-45" />
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="mt-8 flex gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href ?? "#"}
                aria-label={s.label}
                className={cn("grid h-11 w-11 place-items-center border-2 border-foreground bg-card", ink.shadowSm, ink.press)}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        <p className={cn(ink.label, "mt-10 text-muted-foreground")}>Built with Monofly</p>
      </div>
    </div>
  );
}

export default LinkInBio;
