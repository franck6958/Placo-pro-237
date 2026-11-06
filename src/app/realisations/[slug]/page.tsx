import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Buildings, MapPin, Tag } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ProjectVisual } from "@/components/illustrations";
import { ProjectCard } from "@/components/project-card";
import { ServiceIcon } from "@/components/service-icon";
import { WhatsAppIcon } from "@/components/whatsapp-float";
import { ButtonLink, Eyebrow, IconBadge, SectionHead } from "@/components/ui";
import { CtaBanner } from "@/components/cta-banner";
import { PROJECTS, SERVICES } from "@/lib/data";
import { waLink } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.city}`,
    description: p.summary,
    ...(p.image ? { openGraph: { images: [p.image] } } : {}),
  };
}

export default async function ProjectPage({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = PROJECTS[index];
  const service = SERVICES.find((s) => s.slug === p.service)!;
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  // Projets proches d'abord (même catégorie), puis les autres
  const others = [
    ...PROJECTS.filter((x) => x.slug !== p.slug && x.cat === p.cat),
    ...PROJECTS.filter((x) => x.slug !== p.slug && x.cat !== p.cat),
  ].slice(0, 3);

  const facts = [
    { icon: MapPin, k: "Ville", v: p.city },
    { icon: Buildings, k: "Type de lieu", v: p.type },
    { icon: Tag, k: "Catégorie", v: p.label },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Projet ${String(index + 1).padStart(2, "0")} · ${p.label}`}
        title={p.title}
        crumbs={[{ href: "/realisations", label: "Réalisations" }, { label: p.title }]}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {facts.map(({ icon: Icon, k, v }) => (
            <li
              key={k}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white/70 px-4 text-sm text-ink-soft backdrop-blur"
            >
              <Icon weight="duotone" className="size-4 text-accent" aria-hidden />
              <span className="sr-only">{k} : </span>
              {v}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Visuel encadré : passe-partout ivoire, taille maîtrisée (photos ~500px) */}
          <Reveal>
            <figure className="mx-auto w-full max-w-[560px] lg:sticky lg:top-28">
              <div className="relative rounded-[32px] border border-line bg-white p-3">
                <div aria-hidden className="led-line absolute inset-x-10 -top-px" />
                <ProjectVisual
                  project={p}
                  className="aspect-[4/5] w-full rounded-[24px]"
                  sizes="(min-width: 1024px) 540px, 100vw"
                  priority
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 px-2 text-sm text-muted">
                <span>{p.title}</span>
                <span className="font-display text-accent italic">{p.city}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal>
              <Eyebrow>Le projet</Eyebrow>
              <p className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-snug text-ink">{p.summary}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-2xl md:text-3xl">Travaux réalisés</h2>
              <ol className="mt-6 border-t border-line">
                {p.scope.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-5 border-b border-line py-4">
                    <span aria-hidden className="w-8 shrink-0 font-display text-lg text-accent italic tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg text-ink">{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-start gap-5 rounded-[24px] border border-line bg-white p-5 transition-all duration-300 hover:border-ink/25 hover:shadow-soft sm:p-6"
              >
                <IconBadge>
                  <ServiceIcon slug={service.slug} />
                </IconBadge>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold tracking-[0.16em] text-muted uppercase">Service associé</span>
                  <span className="mt-1 block font-display text-xl text-ink transition-colors group-hover:text-accent">
                    {service.title}
                  </span>
                  <span className="mt-1.5 block text-[0.95rem] text-ink-soft">{service.short}</span>
                </span>
                <ArrowUpRight
                  weight="bold"
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={`/contact?service=${encodeURIComponent(service.title)}#devis`}
                  arrow
                  size="lg"
                  className="flex-1"
                >
                  Je veux un projet similaire
                </ButtonLink>
                <ButtonLink
                  href={waLink(`Bonjour PLACO PRO 237, j'ai vu le projet « ${p.title} » sur votre site et je souhaite un devis similaire.`)}
                  variant="ghost"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <WhatsAppIcon /> En parler sur WhatsApp
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Navigation précédent / suivant */}
        <nav aria-label="Projets voisins" className="container-x mt-20 grid gap-3 sm:grid-cols-2">
          {[
            { dir: "prev" as const, proj: prev, label: "Projet précédent" },
            { dir: "next" as const, proj: next, label: "Projet suivant" },
          ].map(({ dir, proj, label }) => (
            <Link
              key={dir}
              href={`/realisations/${proj.slug}`}
              className={`group flex min-h-20 items-center gap-4 rounded-[22px] border border-line bg-white px-5 py-4 transition-all duration-300 hover:border-ink/25 hover:shadow-soft ${dir === "next" ? "sm:flex-row-reverse sm:text-right" : ""}`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-plaster-2 text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold">
                {dir === "prev" ? (
                  <ArrowLeft weight="bold" className="size-4" aria-hidden />
                ) : (
                  <ArrowRight weight="bold" className="size-4" aria-hidden />
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold tracking-[0.16em] text-muted uppercase">{label}</span>
                <span className="mt-0.5 block truncate font-display text-lg text-ink">{proj.title}</span>
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="bg-plaster-2 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHead eyebrow="À voir aussi" title="D'autres projets" />
            <ButtonLink href="/realisations" variant="ghost" arrow className="self-start md:self-auto">
              Toutes les réalisations
            </ButtonLink>
          </div>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <ProjectCard project={o} index={PROJECTS.indexOf(o)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
