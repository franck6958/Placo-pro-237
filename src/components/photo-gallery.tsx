"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, FrameCorners, Plus, X } from "@/components/icons";
import { GALLERY, GALLERY_ROOMS, type GalleryRoom } from "@/lib/data";
import { cn } from "@/lib/cn";

type Filter = GalleryRoom | "all";
const PAGE = 12;
const ease = [0.16, 1, 0.3, 1] as const;

/** « Salon — caisson LED » → ["Salon", "Caisson LED"] */
function splitTitle(t: string): [string, string] {
  const [a, b] = t.split(" — ");
  if (!b) return ["", a];
  return [a, b.charAt(0).toUpperCase() + b.slice(1)];
}

/** Galerie photo filtrable par pièce, avec visionneuse plein écran (clavier : ← → Échap). */
export function PhotoGallery() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  const list = GALLERY.filter((g) => filter === "all" || g.room === filter);
  const visible = list.slice(0, shown);

  const select = (f: Filter) => {
    setFilter(f);
    setShown(PAGE);
  };

  return (
    <div>
      {/* Filtres par pièce */}
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="group" aria-label="Filtrer les photos par pièce" className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {GALLERY_ROOMS.map((r) => {
            const count = r.key === "all" ? GALLERY.length : GALLERY.filter((g) => g.room === r.key).length;
            const active = filter === r.key;
            return (
              <button
                key={r.key}
                type="button"
                aria-pressed={active}
                onClick={() => select(r.key)}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200",
                  active
                    ? "border-ink bg-ink text-plaster"
                    : "border-line bg-white text-ink-soft hover:border-ink/30 hover:text-ink",
                )}
              >
                {r.label}
                <span className={cn("text-xs tabular-nums", active ? "text-gold" : "text-muted")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mosaïque */}
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        <AnimatePresence initial={false}>
          {visible.map((g, i) => (
            <motion.li
              key={g.src}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.5, ease, delay: reduce ? 0 : (i % PAGE) * 0.03 }}
              className="aspect-[4/5]"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Agrandir : ${g.title}`}
                className="group relative block size-full cursor-zoom-in overflow-hidden rounded-[18px] bg-plaster-2 text-left ring-1 ring-ink/5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-90 transition-opacity duration-500 sm:opacity-70 sm:group-hover:opacity-100"
                />
                <div aria-hidden className="led-line absolute inset-x-6 top-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-plaster/90 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <FrameCorners weight="bold" className="size-4" aria-hidden />
                </span>
                <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <span className="block text-[0.65rem] font-bold tracking-[0.16em] text-gold-light uppercase">
                    {splitTitle(g.title)[0]}
                  </span>
                  <span className="mt-1 block text-sm leading-snug font-semibold text-plaster sm:text-[0.95rem]">
                    {splitTitle(g.title)[1]}
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {shown < list.length && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-ink bg-white px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-plaster"
          >
            <Plus weight="bold" className="size-4" aria-hidden /> Voir plus de photos
          </button>
          <p className="text-sm text-muted" aria-live="polite">
            {visible.length} sur {list.length}
          </p>
        </div>
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open !== null && visible[open] && (
              <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: typeof GALLERY;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const nav = "grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-plaster backdrop-blur transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1000] flex flex-col bg-night/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 text-plaster sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-mist tabular-nums">
          {index + 1} / {items.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Fermer" className={nav}>
          <X weight="bold" className="size-5" aria-hidden />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 sm:px-20">
        <motion.div
          key={item.src}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease }}
          className="relative size-full"
        >
          <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" priority />
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 inset-x-2 flex items-center justify-between sm:inset-x-5">
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className={cn(nav, "pointer-events-auto")}
          >
            <ArrowLeft weight="bold" className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className={cn(nav, "pointer-events-auto")}
          >
            <ArrowRight weight="bold" className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="px-4 py-5 text-center sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-[0.7rem] font-bold tracking-[0.16em] text-gold-light uppercase">{splitTitle(item.title)[0]}</p>
        <p className="mt-1 font-display text-xl text-plaster">{splitTitle(item.title)[1]}</p>
      </div>
    </motion.div>
  );
}
