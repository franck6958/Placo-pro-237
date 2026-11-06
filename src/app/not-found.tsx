import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ButtonLink, Eyebrow } from "@/components/ui";

const LINKS = [
  { href: "/services", label: "Nos services" },
  { href: "/realisations", label: "Nos réalisations" },
  { href: "/faq", label: "Questions fréquentes" },
];

export default function NotFound() {
  return (
    <section className="grain relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60" />
      <div className="container-x">
        <div className="theme-dark bg-navy-glow relative isolate overflow-hidden rounded-[36px] px-6 py-16 text-center text-plaster shadow-lift sm:px-12 md:py-24">
          {/* Plafond « en chantier » : gorge lumineuse + grille d'ossature */}
          <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-50" />
          <div aria-hidden className="led-line absolute inset-x-[10%] top-0" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -z-10 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-gold/20 blur-[100px]"
          />

          <Eyebrow invert>Erreur 404</Eyebrow>
          <p aria-hidden className="text-gold-gradient mt-4 font-display text-[clamp(6rem,22vw,13rem)] leading-none font-semibold italic">
            404
          </p>
          <div aria-hidden className="led-line mx-auto mt-2 w-40" />
          <h1 className="mx-auto mt-8 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] text-plaster">
            Cette page est encore en chantier.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-mist">La page demandée n&apos;existe pas ou a été déplacée.</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" arrow size="lg">
              Retour à l&apos;accueil
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Nous contacter
            </ButtonLink>
          </div>

          <nav aria-label="Pages utiles" className="mt-12 border-t border-white/10 pt-8">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex min-h-11 items-center gap-1.5 text-mist transition-colors hover:text-gold-light"
                  >
                    {l.label}
                    <ArrowUpRight
                      weight="bold"
                      aria-hidden
                      className="size-3.5 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
