import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";
import { MaskReveal } from "./motion-fx";

/**
 * Variantes de bouton
 *  - primary : or dégradé + texte bleu nuit — CTA principal (devis). 1 par écran idéalement.
 *  - navy    : aplat bleu nuit + texte ivoire — CTA secondaire fort sur fond clair.
 *  - dark    : alias historique de navy.
 *  - ghost   : contour bleu nuit sur fond clair.
 *  - outline : contour clair sur fond sombre (navy / night / photo).
 *  - light   : aplat ivoire — sur fond sombre.
 */
export type ButtonVariant = "primary" | "navy" | "dark" | "ghost" | "outline" | "light";
export type ButtonSize = "md" | "sm" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-gradient text-white shadow-glow hover:brightness-[1.06] hover:shadow-[0_16px_40px_-12px_rgb(217_98_15/0.6)]",
  navy: "bg-ink text-plaster hover:bg-navy shadow-[0_12px_30px_-14px_rgb(20_40_75/0.35)]",
  dark: "bg-ink text-plaster hover:bg-navy shadow-[0_12px_30px_-14px_rgb(20_40_75/0.35)]",
  ghost: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-plaster",
  outline: "border border-white/25 text-plaster hover:border-gold hover:text-gold-light",
  light: "bg-plaster text-ink hover:bg-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 py-3 text-[0.95rem]",
  lg: "min-h-14 px-8 py-3.5 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string, size: ButtonSize = "md") {
  return cn(
    "btn-shine group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition-all duration-300 ease-out-expo active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
    sizes[size],
    variants[variant],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          weight="bold"
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, className, size)} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className, size)} {...rest}>
      {content}
    </Link>
  );
}

/** Sur-titre doré. `invert` pour les fonds sombres. */
export function Eyebrow({ children, invert = false, className }: { children: ReactNode; invert?: boolean; className?: string }) {
  return <span className={cn("eyebrow", invert && "eyebrow-invert", className)}>{children}</span>;
}

export function SectionHead({
  eyebrow,
  title,
  text,
  className,
  invert = false,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
  /** true sur fond sombre (ink / navy / night) */
  invert?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow invert={invert}>{eyebrow}</Eyebrow>
      <MaskReveal delay={0.1}>
        <h2 className={cn("mt-4 text-[clamp(2rem,4.2vw,3.25rem)]", invert ? "text-plaster" : "text-ink")}>{title}</h2>
      </MaskReveal>
      {text && (
        <MaskReveal delay={0.25}>
          <p className={cn("mt-5 text-lg", invert ? "text-mist" : "text-ink-soft")}>{text}</p>
        </MaskReveal>
      )}
    </div>
  );
}

/** Pastille d'icône illustrative (services, valeurs, contact). */
export function IconBadge({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  /** light : fond ivoire, icône or profond · dark : fond verre sur navy, icône or · gold : aplat or, icône navy */
  tone?: "light" | "dark" | "gold";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-2xl [&_svg]:size-6",
        tone === "light" && "bg-plaster text-accent ring-1 ring-line",
        tone === "dark" && "bg-white/[0.07] text-gold ring-1 ring-white/10",
        tone === "gold" && "bg-gold-gradient text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
