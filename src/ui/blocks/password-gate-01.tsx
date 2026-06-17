import { ArrowRight, Lock } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "utils";
import { Halftone, ink, InkBadge } from "./ink";

/**
 * A LIGHT, client-side gate that keeps the dashboard out of view for casual
 * visitors and crawlers. It is **not** real security: the password lives in
 * the shipped bundle and the unlock flag is just sessionStorage, so anyone
 * who reads the source or sets the flag can get past it. For genuine
 * protection the host app must gate the route server-side (real auth). See
 * the note in the viewer / PR discussion.
 *
 * Because monofly is pre-built and published, a `VITE_*` env var would bake
 * monofly's build-time value — not the consumer's — so the password is a
 * prop instead. The consumer wires it (and can pull from their own env).
 */
export interface PasswordGate01Props {
  children: ReactNode;
  /** The unlock phrase. Default "monofly". Shipped in the client bundle. */
  password?: string;
  title?: string;
  subtitle?: string;
  /** Optional hint shown under the form (handy in demos; omit in production). */
  hint?: string;
  /** sessionStorage key for the unlock flag. */
  storageKey?: string;
  className?: string;
}

export function PasswordGate01({
  children,
  password = "monofly",
  title = "Restricted",
  subtitle = "Dashboard access only",
  hint,
  storageKey = "monofly.dashboard.unlocked",
  className,
}: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(storageKey) === "1",
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (unlocked) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value === password) {
      try {
        window.sessionStorage.setItem(storageKey, "1");
      } catch {
        /* private mode / storage disabled — unlock for this render anyway */
      }
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
      // Retriggers on every wrong attempt without remounting the input.
      formRef.current?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-7px)" },
          { transform: "translateX(7px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 240, easing: "ease-in-out" },
      );
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4 py-12 text-foreground",
        className,
      )}
    >
      <Halftone className="opacity-[0.12]" />

      <form
        ref={formRef}
        onSubmit={submit}
        className={cn(
          ink.panel,
          "relative z-10 w-full max-w-md border-4 p-8 pb-10",
          "shadow-[12px_12px_0_0_var(--foreground)]",
        )}
      >
        {/* Lock badge */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className={cn(
              "mb-6 grid h-20 w-20 -rotate-3 place-items-center border-2 border-foreground bg-foreground text-background",
              ink.shadow,
            )}
          >
            <Lock className="h-9 w-9" strokeWidth={2.5} />
          </div>
          <h1 className={cn(ink.display, "text-center text-5xl leading-none")}>{title}</h1>
          <InkBadge className="mt-3 -rotate-1">{subtitle}</InkBadge>
        </div>

        {/* Password input */}
        <label htmlFor="monofly-gate-password" className={cn(ink.display, "mb-2 block text-xl")}>
          Enter password
        </label>
        <input
          id="monofly-gate-password"
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          placeholder="••••••••"
          className={cn(
            ink.panel,
            "w-full p-4 font-mono text-lg outline-none transition-all",
            "placeholder:text-muted-foreground",
            "focus:-translate-x-1 focus:-translate-y-1 focus:shadow-[6px_6px_0_0_var(--foreground)]",
          )}
        />

        {error && (
          <InkBadge className="mt-3 rotate-1 normal-case">Wrong password. Try again.</InkBadge>
        )}

        {/* Submit */}
        <button
          type="submit"
          className={cn(
            ink.display,
            "group mt-8 flex w-full items-center justify-center gap-3 border-2 border-foreground bg-foreground px-4 py-4 text-2xl tracking-widest text-background",
            "shadow-[8px_8px_0_0_var(--foreground)] transition-all",
            "hover:bg-background hover:text-foreground hover:shadow-[4px_4px_0_0_var(--foreground)]",
            "active:translate-x-1 active:translate-y-1 active:shadow-none",
          )}
        >
          Unlock
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </button>

        <p className="mt-6 text-center text-xs font-semibold text-muted-foreground">
          The link in bio stays public. This only guards the OS.
        </p>
        {hint && (
          <p className={cn(ink.label, "mt-2 text-center text-muted-foreground")}>{hint}</p>
        )}
      </form>
    </div>
  );
}

export default PasswordGate01;
