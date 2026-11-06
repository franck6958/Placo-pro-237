import Link from "next/link";
import { cn } from "@/lib/cn";

/** Couleurs officielles du logo PLACO PRO 237. */
const BRAND = { navy: "#14284B", gray: "#4B4844", orange: "#D9620F", sep: "#93918F" };
/** Variante pour fond sombre : le bleu nuit et le gris passent en clair, l'orange reste. */
const BRAND_INVERT = { navy: "#F5F1EA", gray: "#B9B3A8", orange: "#E8701C", sep: "rgba(245,241,234,.4)" };

/** Monogramme seul (blocs bleu / gris / orange). */
export function LogoMark({ className, invert = false }: { className?: string; invert?: boolean }) {
  const c = invert ? BRAND_INVERT : BRAND;
  return (
    <svg viewBox="0 0 185 200" aria-hidden className={cn("h-10 w-auto shrink-0", className)}>
      <rect x="0" y="0" width="44" height="200" fill={c.navy} />
      <rect x="53" y="0" width="132" height="43" fill={c.navy} />
      <rect x="142" y="52" width="43" height="44" fill={c.navy} />
      <rect x="53" y="104" width="132" height="44" fill={c.gray} />
      <rect x="142" y="157" width="43" height="43" fill={c.orange} />
    </svg>
  );
}

/**
 * Logo complet : monogramme + « PLACO PRO » + « 237 | PLÂTRERIE · AMÉNAGEMENT INTÉRIEUR ».
 * Les textes ont une largeur imposée (textLength) pour respecter exactement les proportions du logo officiel.
 */
export function Logo({
  invert = false,
  className,
}: {
  /** true sur fond sombre */
  invert?: boolean;
  className?: string;
}) {
  const c = invert ? BRAND_INVERT : BRAND;
  return (
    <Link
      href="/"
      aria-label="PLACO PRO 237 — Plâtrerie · Aménagement intérieur — accueil"
      className={cn("flex min-h-11 shrink-0 items-center", className)}
    >
      <svg
        viewBox="0 0 872 200"
        aria-hidden
        className="h-10 w-auto md:h-11"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, Arial, sans-serif" }}
      >
        <rect x="0" y="0" width="44" height="200" fill={c.navy} />
        <rect x="53" y="0" width="132" height="43" fill={c.navy} />
        <rect x="142" y="52" width="43" height="44" fill={c.navy} />
        <rect x="53" y="104" width="132" height="44" fill={c.gray} />
        <rect x="142" y="157" width="43" height="43" fill={c.orange} />

        <text x="241" y="106" fontSize="104" fontWeight="800" fill={c.navy} textLength="373" lengthAdjust="spacingAndGlyphs">
          PLACO
        </text>
        <text x="641" y="106" fontSize="104" fontWeight="800" fill={c.gray} textLength="236" lengthAdjust="spacingAndGlyphs">
          PRO
        </text>
        <text x="241" y="171" fontSize="43" fontWeight="800" fill={c.orange} textLength="83" lengthAdjust="spacingAndGlyphs">
          237
        </text>
        <rect x="344" y="139" width="3" height="34" fill={c.sep} />
        <text x="367" y="162" fontSize="16.5" fontWeight="600" fill={c.gray} textLength="499" lengthAdjust="spacing">
          PLÂTRERIE · AMÉNAGEMENT INTÉRIEUR
        </text>
      </svg>
    </Link>
  );
}
