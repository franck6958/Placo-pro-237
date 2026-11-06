import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, UI } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { ButtonLink, Eyebrow, IconBadge, SectionHead } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Steps } from "@/components/steps";
import { CtaBanner } from "@/components/cta-banner";
import { WhatsAppIcon } from "@/components/whatsapp-float";
import { PROJECTS, SERVICES } from "@/lib/data";
import { waLink } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} à Douala et Yaoundé`, description: s.short };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const index = SERVICES.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const s = SERVICES[index];
  const prev = SERVICES[(index - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(index + 1) % SERVICES.length];
  const related = PROJECTS.filter((p) => p.service === s.slug);
  const quoteHref = `/contact?service=${encodeURIComponent(s.title)}#devis`;

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow={`Service 0${index + 1} / 0${SERVICES.length}`}
        title={s.title}
        text={s.short}
        crumbs={[{ href: "/services", label: "Services" }, { label: s.title }]}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={quoteHref} size="lg" arrow className="w-full sm:w-auto">
            Devis « {s.title} »
          </ButtonLink>
          <ButtonLink
            href={waLink(`Bonjour PLACO PRO 237, je souhaite un devis pour : ${s.title}.`)}
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <WhatsAppIcon className="text-[#25D366]" /> Poser une question
          </ButtonLink>
        </div>
      </PageHero>

      {/* ============ Présentation ============ */}
      <section aria-label="Présentation du service" className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[560px]">
            <div aria-hidden className="absolute -right-4 -bottom-4 -z-10 h-3/4 w-3/4 rounded-[28px] bg-plaster-3" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink">
              {s.image ? (
                <Image
                  src={s.image}
                  alt={`${s.title} — réalisation PLACO PRO 237`}
                  fill
                  preload
                  sizes="(min-width: 640px) 560px, 92vw"
                  className="object-cover"
                />
              ) : (
                <div className="bg-navy-glow grid size-full place-items-center text-gold [&_svg]:size-20">
                  <ServiceIcon slug={s.slug} />
                </div>
              )}
              <div aria-hidden className="led-line absolute inset-x-8 bottom-0" />
            </div>
            <div className="absolute -top-5 left-4 sm:-left-5">
              <IconBadge tone="gold" className="size-14 shadow-glow [&_svg]:size-7">
                <ServiceIcon slug={s.slug} />
              </IconBadge>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>En bref</Eyebrow>
            <p className="mt-4 font-display text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
              {s.intro}
            </p>
            <h2 className="mt-10 text-sm font-bold tracking-[0.18em] text-muted uppercase font-sans">Ce que nous réalisons</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-3 py-3.5 text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-gold">
                    <Check {...UI} className="size-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ Bénéfices (sombre) ============ */}
      <section
        aria-labelledby="benefices-titre"
        className="theme-dark relative isolate overflow-hidden bg-ink py-24 text-plaster md:py-28"
      >
        <div aria-hidden className="absolute -top-32 right-[-10%] -z-10 size-[480px] rounded-full bg-gold/15 blur-[110px]" />
        <div className="container-x">
          <Reveal>
            <Eyebrow invert>Les bénéfices</Eyebrow>
            <h2 id="benefices-titre" className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] text-plaster">
              Pourquoi choisir ce service
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {s.benefits.map((b, i) => (
              <StaggerItem
                key={b.title}
                className="relative overflow-hidden rounded-[24px] bg-white/[0.04] p-7 ring-1 ring-white/10 md:p-8"
              >
                <div aria-hidden className="led-line absolute inset-x-8 top-0 opacity-60" />
                <span aria-hidden className="text-gold-gradient font-display text-5xl leading-none font-semibold">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-2xl text-plaster">{b.title}</h3>
                <p className="mt-2 text-mist">{b.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="text-sm font-bold tracking-[0.18em] text-gold uppercase">Idéal pour</p>
            <ul className="flex flex-wrap gap-2">
              {s.ideal.map((t) => (
                <li key={t} className="rounded-full border border-white/15 px-4 py-2 text-sm text-plaster">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ Méthode ============ */}
      <section className="bg-plaster-2 py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Notre méthode"
              title="Quatre étapes, zéro surprise"
              text="Le même parcours pour chaque chantier, de votre premier message à la réception des travaux."
            />
          </Reveal>
          <Steps className="mt-14" />
        </div>
      </section>

      {/* ============ Réalisations liées ============ */}
      {related.length > 0 && (
        <section className="py-24 md:py-28">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <SectionHead eyebrow="Réalisations" title={`Projets « ${s.title} »`} />
              </Reveal>
              <Reveal delay={0.1} className="shrink-0">
                <ButtonLink href="/realisations" variant="ghost" arrow>
                  Toutes les réalisations
                </ButtonLink>
              </Reveal>
            </div>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProjectCard project={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ============ Navigation entre services ============ */}
      <nav aria-label="Autres services" className="container-x grid gap-4 pt-4 sm:grid-cols-2">
        <Link
          href={`/services/${prev.slug}`}
          className="group flex min-h-24 items-center gap-4 rounded-[24px] border border-line bg-white p-5 transition-all duration-300 hover:border-transparent hover:shadow-soft sm:p-6"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-gold">
            <ArrowLeft {...UI} className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-muted">Service précédent</span>
            <span className="block truncate font-display text-xl">{prev.title}</span>
          </span>
        </Link>
        <Link
          href={`/services/${next.slug}`}
          className="group flex min-h-24 items-center justify-end gap-4 rounded-[24px] border border-line bg-white p-5 text-right transition-all duration-300 hover:border-transparent hover:shadow-soft sm:p-6"
        >
          <span className="min-w-0">
            <span className="block text-sm text-muted">Service suivant</span>
            <span className="block truncate font-display text-xl">{next.title}</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-gold">
            <ArrowRight {...UI} className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </nav>

      <CtaBanner title={`Votre projet « ${s.title} » commence ici.`} />
    </>
  );
}
