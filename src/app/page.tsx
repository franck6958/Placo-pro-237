import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Handshake } from "@phosphor-icons/react/ssr";
import { ArrowRight, ArrowUpRight, Check, CheckCircle, DECOR, MapPin, SealCheck, UI } from "@/components/icons";
import { ButtonLink, Eyebrow, IconBadge, SectionHead } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Float, Magnetic, SplitTitle } from "@/components/motion-fx";
import { Marquee } from "@/components/marquee";
import { ServiceIcon } from "@/components/service-icon";
import { Steps } from "@/components/steps";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { FAQS, PROJECTS, SERVICES, STRENGTHS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Engagements issus du flyer de la marque. */
const GUARANTEES = [
  {
    icon: SealCheck,
    title: "Travail soigné",
    text: "Lignes droites, angles nets, joints invisibles : chaque finition est vérifiée avec vous avant la réception.",
  },
  {
    icon: CalendarCheck,
    title: "Respect des délais",
    text: "Le délai est fixé dans le devis, avant tout démarrage, puis suivi jusqu'à la livraison du chantier.",
  },
  {
    icon: Handshake,
    title: "Satisfaction garantie",
    text: "Nous réceptionnons les travaux ensemble et reprenons les détails qui ne vous conviennent pas.",
  },
];

const HERO_TRUST = ["Visite & devis gratuits", "Douala · Yaoundé", SITE.hours];

const FEATURED = ["salon-caisson-led", "corniches-rosace", "meuble-tv-niches"]
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter((p): p is (typeof PROJECTS)[number] & { image: string } => Boolean(p?.image));

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="grain relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60" />
        <div aria-hidden className="absolute top-[-15%] left-[-10%] -z-10 size-[520px] rounded-full bg-gold/20 blur-[120px]" />

        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Texte */}
          <div className="min-w-0">
            <Reveal>
              <Eyebrow>Plâtrerie · Faux plafonds · Décoration</Eyebrow>
            </Reveal>
            <SplitTitle
              className="mt-6 text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.02]"
              delay={0.45}
              segments={["Des intérieurs finis", { em: "avec précision," }, "du plafond aux murs."]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-ink-soft md:text-xl">
                PLACO PRO 237 conçoit et pose vos faux plafonds, cloisons en plaque de plâtre, staff et éclairages
                intégrés pour maisons, bureaux et commerces à Douala et Yaoundé.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Magnetic>
                  <ButtonLink href="/contact#devis" size="lg" arrow className="w-full sm:w-auto">
                    Demander un devis gratuit
                  </ButtonLink>
                </Magnetic>
                <ButtonLink href="/realisations" variant="ghost" size="lg" className="w-full sm:w-auto">
                  Voir nos réalisations
                </ButtonLink>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 text-sm font-medium text-ink-soft">
                {HERO_TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle {...DECOR} className="size-5 text-accent" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Mosaïque photo — tailles limitées (photos basse définition) */}
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[560px]">
            {/* Panneau bleu nuit avec gorge LED derrière la mosaïque */}
            <div
              aria-hidden
              className="bg-navy-glow absolute -inset-x-4 top-10 -bottom-6 -z-10 rounded-[36px] sm:-inset-x-8 sm:-bottom-8"
            >
              <div className="led-line absolute inset-x-10 top-0" />
              <div className="grid-lines-dark absolute inset-0 rounded-[36px] opacity-40" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <figure className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-[24px] ring-1 ring-white/10">
                <Image
                  src="/realisations/plafond_02.jpg"
                  alt="Salon avec faux plafond à caisson, lignes lumineuses LED et suspension — réalisation PLACO PRO 237 à Douala"
                  fill
                  preload
                  sizes="(min-width: 640px) 560px, 92vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-plaster/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur sm:bottom-4 sm:left-4">
                  <MapPin {...UI} className="size-3.5 text-accent" /> Douala · Faux plafond à caisson LED
                </figcaption>
              </figure>
              <figure className="relative aspect-square overflow-hidden rounded-[20px] ring-1 ring-white/10">
                <Image
                  src="/realisations/plafond_14.jpg"
                  alt="Plafond à caissons superposés avec corniches LED et rosace centrale"
                  fill
                  sizes="(min-width: 640px) 275px, 45vw"
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-square translate-y-4 overflow-hidden rounded-[20px] ring-1 ring-white/10 sm:translate-y-6">
                <Image
                  src="/realisations/plafond_10.jpg"
                  alt="Meuble TV en plâtre avec niches éclairées"
                  fill
                  sizes="(min-width: 640px) 275px, 45vw"
                  className="object-cover"
                />
              </figure>
            </div>

            <Float delay={1.6} distance={7} className="absolute -top-4 right-2 z-10 sm:-right-4">
              <div className="flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-bold text-white shadow-glow">
                <Check {...UI} className="size-4" /> Devis gratuit
              </div>
            </Float>
          </Reveal>
        </div>
      </section>

      <Marquee items={STRENGTHS} tone="gold" />

      {/* ================= GARANTIES ================= */}
      <section aria-labelledby="garanties-titre" className="bg-plaster-2 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <Eyebrow>Nos garanties</Eyebrow>
            <h2 id="garanties-titre" className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)]">
              Trois engagements, <em className="text-accent italic">sur chaque chantier.</em>
            </h2>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Particulier ou entreprise, petite pièce ou plateau entier : la même exigence, du premier rendez-vous à la
              réception.
            </p>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {GUARANTEES.map((g, i) => (
              <StaggerItem
                key={g.title}
                className="group relative flex flex-col rounded-[24px] border border-line bg-white p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-soft md:p-7"
              >
                <div className="flex items-center justify-between">
                  <IconBadge tone="gold" className="size-14 [&_svg]:size-7">
                    <g.icon {...DECOR} />
                  </IconBadge>
                  <span aria-hidden className="font-display text-3xl text-ink/10">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{g.title}</h3>
                <p className="mt-2 text-[0.97rem] text-ink-soft">{g.text}</p>
                <span aria-hidden className="led-line absolute inset-x-6 bottom-0 origin-left scale-x-0 opacity-0 transition-all duration-700 ease-out-expo group-hover:scale-x-100 group-hover:opacity-100" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= SERVICES (sombre) ================= */}
      <section aria-labelledby="services-titre" className="theme-dark bg-navy-glow relative isolate overflow-hidden py-24 text-plaster md:py-32">
        <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />
        <div aria-hidden className="led-line absolute inset-x-0 top-0 opacity-50" />
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow invert>Nos services</Eyebrow>
              <h2 id="services-titre" className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] text-plaster">
                Un seul interlocuteur, <em className="text-gold italic">six savoir-faire.</em>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-mist">
                De l&apos;étude à la livraison, nous prenons en charge chaque étape pour un résultat propre, durable et à
                votre goût.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="shrink-0">
              <ButtonLink href="/services" variant="outline" arrow>
                Tous les services
              </ButtonLink>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white/[0.04] ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-gold/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 390px, (min-width: 640px) 46vw, 92vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="grid size-full place-items-center bg-navy-2 text-gold [&_svg]:size-16">
                        <ServiceIcon slug={s.slug} />
                      </div>
                    )}
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <span aria-hidden className="absolute top-4 left-4 font-display text-sm font-semibold tracking-[0.2em] text-gold-light">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="relative flex flex-1 flex-col px-6 pt-0 pb-6">
                    <IconBadge tone="gold" className="-mt-6 shadow-glow">
                      <ServiceIcon slug={s.slug} />
                    </IconBadge>
                    <h3 className="mt-5 text-2xl text-plaster">{s.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-mist">{s.short}</p>
                    <span className="mt-auto flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-gold-light">
                      Découvrir
                      <ArrowUpRight {...UI} className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= RÉALISATIONS ================= */}
      <section aria-labelledby="realisations-titre" className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Réalisations</Eyebrow>
              <h2 id="realisations-titre" className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)]">
                Quelques chantiers <em className="text-accent italic">livrés</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="shrink-0">
              <ButtonLink href="/realisations" variant="ghost" arrow>
                Voir tous les projets
              </ButtonLink>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
            {FEATURED.map((p, i) => (
              <StaggerItem
                key={p.slug}
                className={cn(i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5")}
              >
                <Link
                  href={`/realisations/${p.slug}`}
                  className={cn(
                    "group relative block h-full overflow-hidden rounded-[24px] bg-ink",
                    i === 0 ? "aspect-[4/3] md:aspect-auto md:min-h-[520px]" : "aspect-[16/10] md:aspect-auto md:min-h-[250px]",
                  )}
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 700px, 92vw" : "(min-width: 768px) 500px, 92vw"}
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-plaster/90 px-3 py-1 text-[0.7rem] font-bold tracking-[0.14em] text-accent uppercase backdrop-blur">
                    {p.label}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                    <div>
                      <p className="flex items-center gap-1.5 text-sm text-mist">
                        <MapPin {...UI} className="size-3.5 text-gold" /> {p.city} · {p.type}
                      </p>
                      <h3 className={cn("mt-1.5 text-plaster", i === 0 ? "text-2xl md:text-3xl" : "text-xl")}>{p.title}</h3>
                    </div>
                    <span
                      aria-hidden
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-plaster text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-gold-gradient group-hover:text-white"
                    >
                      <ArrowUpRight {...UI} className="size-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= MÉTHODE (sombre) ================= */}
      <section aria-labelledby="methode-titre" className="theme-dark relative isolate overflow-hidden bg-ink py-24 text-plaster md:py-32">
        <div aria-hidden className="absolute -bottom-40 left-[-10%] -z-10 size-[520px] rounded-full bg-gold/15 blur-[120px]" />
        <div className="container-x grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow invert>Notre méthode</Eyebrow>
              <h2 id="methode-titre" className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] text-plaster">
                Quatre étapes, <em className="text-gold italic">zéro surprise.</em>
              </h2>
              <p className="mt-5 max-w-md text-lg text-mist">
                Un parcours simple et transparent, de votre premier message à la réception des travaux.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 grid max-w-md grid-cols-2 gap-3">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[20px] ring-1 ring-white/10">
                <Image
                  src="/realisations/plafond_06.jpg"
                  alt="Faux plafond en cours de pose avec lignes LED"
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </figure>
              <figure className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[20px] ring-1 ring-white/10">
                <Image
                  src="/realisations/plafond_09.jpg"
                  alt="Plafond en plâtre avec profilés LED avant finition"
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>
          <div className="lg:pt-4">
            <Steps tone="dark" layout="stack" />
            <Reveal delay={0.2} className="mt-12 pl-[4.25rem]">
              <ButtonLink href="/contact#devis" variant="light" arrow>
                Commencer par l&apos;étape 1
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= ZONES ================= */}
      <section aria-labelledby="zones-titre" className="grain relative isolate overflow-hidden bg-plaster-2 py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Zones d'intervention"
              title={<span id="zones-titre">Présents à Douala et à Yaoundé</span>}
              text="Pour un chantier hors de ces villes, contactez-nous : nous étudions chaque demande au cas par cas."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {SITE.cities.map((city) => (
              <StaggerItem key={city}>
                <Link
                  href="/contact#devis"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-transparent hover:shadow-soft md:p-10"
                >
                  <div aria-hidden className="absolute -top-20 -right-20 size-56 rounded-full bg-gold/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <IconBadge tone="light">
                    <MapPin {...DECOR} />
                  </IconBadge>
                  <h3 className="mt-8 text-[clamp(2.5rem,6vw,4rem)] leading-none">{city}</h3>
                  <div aria-hidden className="led-line mt-6 w-24" />
                  <p className="mt-6 text-ink-soft">Particuliers, bureaux, commerces, hôtels et restaurants.</p>
                  <span className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
                    Demander une visite à {city}
                    <ArrowRight {...UI} className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHead eyebrow="Questions fréquentes" title="Vous vous demandez peut-être…" />
            <ButtonLink href="/faq" variant="ghost" arrow className="mt-8">
              Toutes les questions
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={FAQS.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
