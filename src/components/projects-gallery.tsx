"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CATEGORIES, PROJECTS, type ProjectCat } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/cn";

type Filter = ProjectCat | "all";

const ease = [0.16, 1, 0.3, 1] as const;

function GalleryFromParams() {
  const cat = useSearchParams().get("cat");
  return <ProjectsGallery urlCat={cat} />;
}

/** Galerie + lecture du filtre dans l'URL (?cat=plafond). */
export function ProjectsGallerySection() {
  return (
    <Suspense fallback={<ProjectsGallery urlCat={null} />}>
      <GalleryFromParams />
    </Suspense>
  );
}

function ProjectsGallery({ urlCat }: { urlCat: string | null }) {
  const reduce = useReducedMotion();
  const [chosen, setChosen] = useState<Filter | null>(null);
  // Lien profond : /realisations?cat=plafond
  const fromUrl = CATEGORIES.find((c) => c.key === urlCat)?.key;
  const filter: Filter = chosen ?? fromUrl ?? "all";

  const select = (f: Filter) => {
    setChosen(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", f);
    window.history.replaceState(null, "", url);
  };

  const list = PROJECTS.filter((p) => filter === "all" || p.cat === filter);
  const current = CATEGORIES.find((c) => c.key === filter)?.label ?? "Tout";

  return (
    <div>
      {/* Barre de filtres : défilement horizontal sur mobile, segmenté sur desktop */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          <div
            role="group"
            aria-label="Filtrer par type de travaux"
            className="inline-flex gap-1 rounded-full border border-line bg-white p-1.5 shadow-[0_10px_30px_-20px_rgb(20_40_75/0.2)]"
          >
            {CATEGORIES.map((c) => {
              const count = c.key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c.key).length;
              const active = filter === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(c.key)}
                  className={cn(
                    "relative isolate inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 sm:px-5",
                    active ? "text-plaster" : "text-ink-soft hover:bg-plaster hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {c.label}
                  <span
                    className={cn(
                      "grid min-w-6 place-items-center rounded-full px-1.5 text-[0.7rem] leading-5 font-bold tabular-nums",
                      active ? "bg-gold-gradient text-white" : "bg-plaster-2 text-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-display text-lg text-ink italic">{current}</span> · {list.length} projet
          {list.length > 1 ? "s" : ""}
        </p>
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
              transition={{ duration: 0.5, ease, delay: reduce ? 0 : i * 0.04 }}
              // Colonne centrale décalée : rythme de mosaïque éditoriale sur grand écran
              className={cn(i % 3 === 1 && "lg:translate-y-14")}
            >
              <ProjectCard project={p} index={PROJECTS.indexOf(p)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {/* compense le décalage de la colonne centrale */}
      <div aria-hidden className="hidden lg:block lg:h-14" />
    </div>
  );
}
