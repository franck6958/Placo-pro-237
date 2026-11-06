import { STEPS } from "@/lib/data";
import { Reveal } from "./reveal";
import { DrawLine } from "./motion-fx";
import { cn } from "@/lib/cn";

/**
 * Méthode en 4 étapes.
 *  - Mobile : frise verticale (pastille numérotée + filet).
 *  - layout="row" : passe en 4 colonnes à partir de lg, filet or qui se dessine.
 *  - layout="stack" : reste vertical (à placer dans une colonne).
 *  - tone="dark" sur fond bleu nuit (le conteneur doit porter `theme-dark`).
 */
export function Steps({
  tone = "light",
  layout = "row",
  className,
}: {
  tone?: "light" | "dark";
  layout?: "row" | "stack";
  className?: string;
}) {
  const dark = tone === "dark";
  const row = layout === "row";
  return (
    <div className={cn("relative", className)}>
      {row && (
        <div aria-hidden className="absolute top-[1.4rem] right-[12%] left-6 hidden lg:block">
          <DrawLine className={dark ? "opacity-80" : "opacity-70"} />
        </div>
      )}
      <ol className={cn("relative grid", row ? "gap-0 lg:grid-cols-4 lg:gap-8" : "gap-0")}>
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          return (
            <li key={s.title} className={cn("group relative pb-10 pl-[4.25rem] last:pb-0", row && "lg:pb-0 lg:pl-0 lg:pt-[4.5rem]")}>
              {/* Filet vertical entre les pastilles */}
              {!last && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-12 bottom-1 left-[1.375rem] w-px",
                    dark ? "bg-gradient-to-b from-gold/60 to-white/10" : "bg-gradient-to-b from-gold to-line",
                    row && "lg:hidden",
                  )}
                />
              )}
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 left-0 grid size-11 place-items-center rounded-full font-display text-lg font-semibold transition-transform duration-500 ease-out-expo group-hover:scale-110",
                  dark
                    ? "bg-gold-gradient text-white shadow-glow"
                    : "bg-ink text-gold shadow-[0_0_0_6px_var(--color-plaster-2)]",
                )}
              >
                {i + 1}
              </span>
              <Reveal delay={i * 0.08} y={18}>
                <p className={cn("text-[0.7rem] font-bold tracking-[0.2em] uppercase", dark ? "text-gold" : "text-accent")}>
                  Étape 0{i + 1}
                </p>
                <h3 className={cn("mt-2 text-2xl", dark ? "text-plaster" : "text-ink")}>{s.title}</h3>
                <p className={cn("mt-2 max-w-sm text-[0.97rem]", dark ? "text-mist" : "text-ink-soft")}>{s.text}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
