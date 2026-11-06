import Link from "next/link";
import type { ReactNode } from "react";
import { CaretRight } from "./icons";
import { Reveal } from "./reveal";
import { MaskReveal } from "./motion-fx";
import { Eyebrow } from "./ui";
import { cn } from "@/lib/cn";

/**
 * En-tête de page intérieure.
 * tone="light" (défaut) : ivoire + halo doré · tone="dark" : bleu nuit + gorge lumineuse.
 * Dans `title`, un <em> est automatiquement passé en italique or (accent sur clair, gold sur sombre).
 */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  crumbs: { href?: string; label: string }[];
  children?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24",
        dark ? "theme-dark bg-navy-glow text-plaster" : "grain",
      )}
    >
      <div aria-hidden className={cn("absolute inset-0 -z-10", dark ? "grid-lines-dark opacity-50" : "grid-lines opacity-60")} />
      <div
        aria-hidden
        className={cn(
          "absolute -top-24 right-[-10%] -z-10 h-[460px] w-[560px] rounded-full blur-[110px]",
          dark ? "bg-gold/20" : "bg-gold/25",
        )}
      />
      <div aria-hidden className="led-line absolute inset-x-0 bottom-0 opacity-40" />
      <div className="container-x">
        <Reveal>
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className={cn("flex flex-wrap items-center gap-1 text-sm", dark ? "text-mist" : "text-muted")}>
              <li>
                <Link
                  href="/"
                  className={cn("inline-flex min-h-8 items-center transition-colors", dark ? "hover:text-gold-light" : "hover:text-ink")}
                >
                  Accueil
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1">
                  <CaretRight weight="bold" className={cn("size-3.5", dark ? "text-gold" : "text-accent")} aria-hidden />
                  {c.href ? (
                    <Link
                      href={c.href}
                      className={cn("inline-flex min-h-8 items-center transition-colors", dark ? "hover:text-gold-light" : "hover:text-ink")}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className={cn("font-medium", dark ? "text-plaster" : "text-ink")}>
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Eyebrow invert={dark}>{eyebrow}</Eyebrow>
          <MaskReveal delay={0.45}>
            <h1
              className={cn(
                "mt-5 max-w-4xl pb-2 text-[clamp(2.6rem,6.5vw,5.2rem)]",
                dark ? "[&_em]:text-gold" : "[&_em]:text-accent",
              )}
            >
              {title}
            </h1>
          </MaskReveal>
          {text && (
            <MaskReveal delay={0.6}>
              <p className={cn("mt-6 max-w-2xl text-lg md:text-xl", dark ? "text-mist" : "text-ink-soft")}>{text}</p>
            </MaskReveal>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
