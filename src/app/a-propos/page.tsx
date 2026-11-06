import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Crosshair, Eye, MapPinLine, Palette, ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ProjectVisual } from "@/components/illustrations";
import { ServiceIcon } from "@/components/service-icon";
import { ButtonLink, Eyebrow, IconBadge, SectionHead } from "@/components/ui";
import { Steps } from "@/components/steps";
import { Marquee } from "@/components/marquee";
import { CtaBanner } from "@/components/cta-banner";
import { SERVICES, STRENGTHS, VALUES } from "@/lib/data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "PLACO PRO 237, entreprise camerounaise spécialisée dans la plâtrerie et la décoration intérieure, à Douala et Yaoundé.",
};

const VALUE_ICONS = [Crosshair, Eye, ShieldCheck, Palette];

const MOSAIC = [
  { slug: "about-a", cat: "plafond", tone: "warm", title: "Plafond à caissons et corniches LED", image: "/realisations/plafond_14.jpg" },
  { slug: "about-b", cat: "plafond", tone: "night", title: "Faux plafond en cours de pose", image: "/realisations/plafond_06.jpg" },
  { slug: "about-c", cat: "plafond", tone: "sand", title: "Plafond avant finition", image: "/realisations/plafond_09.jpg" },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={
          <>
            Le savoir-faire du plâtre, <em className="italic">au service de vos espaces</em>.
          </>
        }
        text="Une entreprise camerounaise de plâtrerie et de décoration intérieure, à Douala et à Yaoundé."
        crumbs={[{ label: "À propos" }]}
      />

      {/* Qui sommes-nous — mosaïque + texte */}
      <section className="pb-20 md:pb-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[520px]">
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-gold/15 blur-3xl" />
            <div className="grid grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
              <div className="row-span-2 rounded-[26px] border border-line bg-white p-2">
                <ProjectVisual
                  project={MOSAIC[0]}
                  sizes="(min-width: 1024px) 290px, 55vw"
                  className="h-full min-h-[300px] rounded-[20px] sm:min-h-[400px]"
                />
              </div>
              <div className="rounded-[26px] border border-line bg-white p-2">
                <ProjectVisual project={MOSAIC[1]} sizes="(min-width: 1024px) 230px, 45vw" className="aspect-square rounded-[20px]" />
              </div>
              <div className="rounded-[26px] border border-line bg-white p-2">
                <ProjectVisual project={MOSAIC[2]} sizes="(min-width: 1024px) 230px, 45vw" className="aspect-square rounded-[20px]" />
              </div>
            </div>
            <p className="absolute -bottom-5 left-6 rounded-full bg-ink px-5 py-2.5 font-display text-sm text-plaster italic shadow-soft">
              De l&apos;ossature <span className="text-gold">à la finition</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Qui sommes-nous</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)]">Une entreprise camerounaise, une exigence de finition.</h2>
            <p className="mt-6 text-lg text-ink-soft">
              PLACO PRO 237 est une entreprise camerounaise spécialisée dans la plâtrerie et la décoration
              intérieure. Nous intervenons à Douala et à Yaoundé, chez les particuliers comme auprès des
              professionnels.
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-xl leading-snug text-ink md:text-2xl">
              Notre approche est simple : écouter votre projet, vous proposer une solution claire et chiffrée,
              puis l&apos;exécuter avec rigueur jusqu&apos;à la dernière finition.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <Marquee items={STRENGTHS} tone="gold" />

      {/* Métiers — index éditorial */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              eyebrow="Nos métiers"
              title="Six savoir-faire, un seul interlocuteur."
              text="Du plafond aux murs, nous prenons en charge l'ouvrage complet : structure, éclairage, décoration et finitions."
            />
            <ButtonLink href="/services" variant="ghost" arrow className="mt-8">
              Voir les services
            </ButtonLink>
          </div>
          <Stagger className="border-t border-line">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-5 border-b border-line py-5 transition-colors duration-300 hover:bg-white/60 sm:gap-7 sm:px-3 sm:py-6"
                >
                  <span aria-hidden className="w-8 shrink-0 font-display text-lg text-accent italic tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <IconBadge className="hidden transition-colors duration-300 group-hover:bg-ink group-hover:text-gold sm:grid">
                    <ServiceIcon slug={s.slug} />
                  </IconBadge>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl text-ink transition-colors group-hover:text-accent md:text-2xl">
                      {s.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[0.95rem] text-ink-soft">{s.short}</span>
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    aria-hidden
                    className="size-5 shrink-0 text-ink/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Valeurs — fond sombre */}
      <section className="theme-dark bg-navy-glow relative isolate overflow-hidden py-20 text-plaster md:py-28">
        <div aria-hidden className="led-line absolute inset-x-0 top-0 opacity-60" />
        <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />
        <div className="container-x">
          <SectionHead invert eyebrow="Nos valeurs" title="Ce qui guide chaque chantier" align="center" />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <StaggerItem
                  key={v.title}
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:border-gold/40 hover:bg-white/[0.07]"
                >
                  <span
                    aria-hidden
                    className="absolute -top-3 right-4 font-display text-[5.5rem] leading-none text-white/[0.05] italic transition-colors duration-500 group-hover:text-gold/15"
                  >
                    {i + 1}
                  </span>
                  <IconBadge tone="dark">
                    <Icon weight="duotone" />
                  </IconBadge>
                  <h3 className="mt-7 text-2xl text-plaster">{v.title}</h3>
                  <p className="mt-2 text-mist">{v.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Méthode */}
      <section id="methode" className="scroll-mt-28 bg-plaster-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Notre méthode" title="Comment se déroule votre projet" />
          <div className="mt-14">
            <Steps />
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Zones d'intervention" title="Présents à Douala et à Yaoundé" align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {SITE.cities.map((c) => (
              <Reveal
                key={c}
                className="flex items-center gap-5 rounded-[24px] border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-soft"
              >
                <IconBadge tone="gold">
                  <MapPinLine weight="duotone" />
                </IconBadge>
                <div>
                  <p className="font-display text-2xl text-ink">{c}</p>
                  <p className="text-sm text-ink-soft">Particuliers et professionnels</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-ink-soft">
            Ailleurs au Cameroun ? Contactez-nous : nous étudions chaque demande au cas par cas selon la taille du
            chantier.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
