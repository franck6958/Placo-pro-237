import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, UI } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { CeilingScene } from "@/components/ceiling-scene";
import { ButtonLink, Eyebrow, IconBadge } from "@/components/ui";
import { CtaBanner } from "@/components/cta-banner";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Faux plafonds, cloisons et doublages, staff et corniches, éclairage intégré, décoration intérieure, enduits et peinture à Douala et Yaoundé.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Nos services"
        title={
          <>
            Six savoir-faire, <em className="italic">un seul</em> interlocuteur.
          </>
        }
        text="De l'étude à la livraison, nous prenons en charge chaque étape pour un résultat propre, durable et à votre goût."
        crumbs={[{ label: "Services" }]}
      >
        <nav aria-label="Accès rapide aux services" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 text-sm font-semibold text-plaster transition-colors duration-300 hover:border-gold hover:text-gold-light"
                >
                  <ServiceIcon slug={s.slug} className="size-4 text-gold" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* ============ Liste éditoriale (zigzag) ============ */}
      <section aria-label="Détail des services" className="py-20 md:py-28">
        <div className="container-x grid gap-20 md:gap-28">
          {SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
              >
                <Reveal className={cn("relative mx-auto w-full max-w-[560px]", flip && "md:order-2")}>
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -bottom-4 -z-10 h-3/4 w-3/4 rounded-[28px] bg-plaster-3",
                      flip ? "-left-4" : "-right-4",
                    )}
                  />
                  <Link
                    href={`/services/${s.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="group relative block aspect-[4/3] overflow-hidden rounded-[24px] bg-ink"
                  >
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 560px, 92vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="bg-navy-glow grid size-full place-items-center text-gold [&_svg]:size-20">
                        <ServiceIcon slug={s.slug} />
                      </div>
                    )}
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <span className="text-gold-gradient absolute bottom-3 left-5 font-display text-6xl leading-none font-semibold md:text-7xl">
                      0{i + 1}
                    </span>
                  </Link>
                </Reveal>

                <Reveal delay={0.1} className={cn(flip && "md:order-1")}>
                  <div className="flex items-center gap-4">
                    <IconBadge tone="light">
                      <ServiceIcon slug={s.slug} />
                    </IconBadge>
                    <Eyebrow>Service 0{i + 1}</Eyebrow>
                  </div>
                  <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)]">{s.title}</h2>
                  <p className="mt-4 max-w-lg text-lg text-ink-soft">{s.short}</p>
                  <ul className="mt-7 grid gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[0.95rem] text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-gold">
                          <Check {...UI} className="size-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted">
                    <span className="font-semibold text-ink-soft">Idéal pour :</span> {s.ideal.join(" · ")}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <ButtonLink href={`/services/${s.slug}`} variant="navy" arrow>
                      Découvrir « {s.title} »
                    </ButtonLink>
                    <Link
                      href={`/contact?service=${encodeURIComponent(s.title)}#devis`}
                      className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
                    >
                      Demander un devis
                      <ArrowRight {...UI} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============ Coupe technique (sombre) ============ */}
      <section
        aria-labelledby="coupe-titre"
        className="theme-dark bg-navy-glow relative isolate overflow-hidden py-24 text-plaster md:py-32"
      >
        <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />
        <div aria-hidden className="led-line absolute inset-x-0 top-0 opacity-50" />
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow invert>Sous la surface</Eyebrow>
            <h2 id="coupe-titre" className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] text-plaster">
              Ce que cache un <em className="text-gold italic">faux plafond réussi</em>
            </h2>
            <p className="mt-5 text-lg text-mist">
              Ossature, plaques, lumière et finition : chaque couche compte. Voici comment nous assemblons un plafond à
              caisson avec gorge LED.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <CeilingScene />
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
