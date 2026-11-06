import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ProjectsGallerySection } from "@/components/projects-gallery";
import { CtaBanner } from "@/components/cta-banner";
import { PhotoGallery } from "@/components/photo-gallery";
import { Stagger, StaggerItem } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import { GALLERY, PROJECTS } from "@/lib/data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Faux plafonds, cloisons et décoration intérieure : découvrez des projets PLACO PRO 237 à Douala et Yaoundé.",
};

/** Les coulisses : étapes visibles sur chantier (photos de matériaux et de pose). */
const BACKSTAGE = [
  {
    src: "/realisations/plafond_06.jpg",
    alt: "Faux plafond en cours de pose, échelle sur chantier",
    k: "01",
    title: "L'ossature",
    text: "Rails et montants posés d'aplomb et de niveau : c'est elle qui garantit des lignes droites.",
  },
  {
    src: "/realisations/plafond_09.jpg",
    alt: "Plafond en plâtre avant enduits et peinture",
    k: "02",
    title: "Les plaques",
    text: "Plaques standard ou hydrofuges selon la pièce, vissées et jointées avec soin.",
  },
  {
    src: "/realisations/plafond_01.jpg",
    alt: "Faux plafond fini, surface lisse et spots encastrés",
    k: "03",
    title: "La finition",
    text: "Bandes, enduits, ponçage et peinture pour des surfaces lisses, sans joints visibles.",
  },
];

export default function RealisationsPage() {
  const collage = [
    { src: "/realisations/salon-caissons-arrondis-lustre.jpg", cls: "left-0 top-6 w-[58%] aspect-[3/4] -rotate-3 z-10" },
    { src: "/realisations/plafond_02.jpg", cls: "right-0 top-0 w-[50%] aspect-[4/5] rotate-2" },
    { src: "/realisations/salle-a-manger-suspensions.jpg", cls: "right-[6%] bottom-0 w-[54%] aspect-[4/3] -rotate-1 z-20" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title={
          <>
            Des projets <em className="italic">finis au millimètre</em>.
          </>
        }
        text="Salons, chambres, bureaux, commerces : parcourez nos projets puis la galerie photo, pièce par pièce."
        crumbs={[{ label: "Réalisations" }]}
      >
        <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1fr_minmax(0,460px)]">
          <dl className="grid max-w-lg grid-cols-3 divide-x divide-line rounded-[24px] border border-line bg-white/70 py-5 backdrop-blur">
            {[
              { k: String(PROJECTS.length), v: "projets détaillés" },
              { k: String(GALLERY.length), v: "photos" },
              { k: String(SITE.cities.length), v: SITE.cities.join(" · ") },
            ].map((s) => (
              <div key={s.v} className="px-5">
                <dt className="sr-only">{s.v}</dt>
                <dd>
                  <span className="block font-display text-4xl text-ink">{s.k}</span>
                  <span className="mt-1 block text-sm text-muted">{s.v}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div aria-hidden className="relative hidden h-[400px] lg:-mt-72 lg:block">
            {collage.map((c) => (
              <span key={c.src} className={`absolute overflow-hidden rounded-[22px] ring-4 ring-plaster ${c.cls}`}>
                <Image src={c.src} alt="" fill sizes="280px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </PageHero>

      <section aria-labelledby="projets-titre" className="pt-6 pb-20 md:pb-28">
        <div className="container-x">
          <h2 id="projets-titre" className="sr-only">
            Projets
          </h2>
          <ProjectsGallerySection />
        </div>
      </section>

      {/* Galerie photo */}
      <section aria-labelledby="galerie-photos" className="border-y border-line bg-plaster-2 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHead
              eyebrow="Galerie photos"
              title={
                <span id="galerie-photos">
                  Nos plafonds <em className="italic">en images</em>.
                </span>
              }
              text="Filtrez par pièce et cliquez sur une photo pour l'agrandir."
            />
            <p className="flex shrink-0 items-center gap-2 text-sm text-muted">
              <MapPin weight="duotone" className="size-5 text-accent" aria-hidden />
              {SITE.cities.join(" · ")}
            </p>
          </div>
          <div className="mt-10">
            <PhotoGallery />
          </div>
        </div>
      </section>

      {/* Les coulisses */}
      <section className="theme-dark bg-navy-glow relative isolate overflow-hidden py-20 text-plaster md:py-28">
        <div aria-hidden className="led-line absolute inset-x-0 top-0 opacity-60" />
        <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />
        <div className="container-x">
          <SectionHead
            invert
            eyebrow="Les coulisses"
            title={
              <>
                Ce que l&apos;on ne voit plus, <em className="text-gold italic">une fois fini</em>.
              </>
              }
              text="Un beau plafond se joue avant la peinture. Trois étapes que nous soignons sur chaque chantier."
            />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {BACKSTAGE.map((b) => (
              <StaggerItem key={b.k}>
                <figure className="group h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-2.5 transition-colors duration-300 hover:border-gold/40">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                    <Image
                      src={b.src}
                      alt={b.alt}
                      fill
                      sizes="(min-width: 768px) 380px, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <span aria-hidden className="absolute bottom-3 left-4 font-display text-4xl text-gold italic">
                      {b.k}
                    </span>
                  </div>
                  <figcaption className="px-3 pt-5 pb-4">
                    <h3 className="text-xl text-plaster">{b.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-mist">{b.text}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner title="Votre intérieur pourrait être le prochain projet." />
    </>
  );
}
