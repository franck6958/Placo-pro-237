import { Sparkle } from "./icons";
import { cn } from "@/lib/cn";

/**
 * Bandeau défilant d'engagements. Les éléments sont lus une seule fois par les
 * lecteurs d'écran (liste sr-only) ; la bande animée est décorative.
 * tone="navy" (défaut) : bleu nuit + étoiles or · tone="gold" : aplat or + texte bleu nuit.
 */
export function Marquee({ items, tone = "navy" }: { items: string[]; tone?: "navy" | "gold" }) {
  const row = [...items, ...items, ...items];
  const navy = tone === "navy";
  const fade = navy ? "from-ink" : "from-gold";
  return (
    <div
      role="region"
      aria-label="Nos engagements"
      className={cn("relative overflow-hidden py-6", navy ? "bg-ink text-plaster" : "bg-gold-gradient text-white")}
    >
      {navy && <div aria-hidden className="led-line absolute inset-x-0 top-0 opacity-50" />}
      <ul className="sr-only">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div aria-hidden className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-10">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 font-display text-xl whitespace-nowrap md:text-2xl">
                {t}
                <Sparkle weight="fill" className={cn("size-4", navy ? "text-gold" : "text-ink/70")} />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r", fade)} />
      <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l", fade)} />
    </div>
  );
}
