import Link from "next/link";
import { ArrowUpRight, MapPin } from "@/components/icons";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./illustrations";

/**
 * Carte projet « éditoriale » : photo encadrée (passe-partout ivoire), numéro,
 * catégorie, puis titre et lieu sous l'image. Toute la carte est cliquable.
 */
export function ProjectCard({
  project,
  index,
  className,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  /** Numéro affiché (01, 02…) — optionnel. */
  index?: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/realisations/${project.slug}`}
      className={cn(
        "group block rounded-[28px] border border-line bg-white p-2.5 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/20 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
        <ProjectVisual
          project={project}
          alt=""
          sizes={sizes}
          className="size-full"
          imageClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
        />
        {/* voile bas pour la lisibilité des étiquettes */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/70 to-transparent" />
        {/* gorge lumineuse qui s'allume au survol */}
        <div
          aria-hidden
          className="led-line absolute inset-x-6 top-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.16em] text-gold-light uppercase backdrop-blur-md">
          {project.label}
        </span>
        {index !== undefined && (
          <span aria-hidden className="absolute top-2.5 right-4 font-display text-2xl text-plaster/90 italic">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plaster">
          <MapPin weight="fill" className="size-4 text-gold" aria-hidden /> {project.city}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 px-3 pt-5 pb-3">
        <div className="min-w-0">
          <p className="text-[0.72rem] font-bold tracking-[0.16em] text-muted uppercase">{project.type}</p>
          <h3 className="mt-1.5 text-[1.3rem] leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-gold motion-reduce:group-hover:rotate-0"
        >
          <ArrowUpRight weight="bold" className="size-4" />
        </span>
      </div>
    </Link>
  );
}
