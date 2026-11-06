"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Accordéon FAQ — une question ouverte à la fois.
 * Chaque item est une carte numérotée ; la carte ouverte passe en blanc avec un filet or.
 */
export function FaqAccordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "relative overflow-hidden rounded-[22px] border transition-all duration-300 ease-out-expo",
              isOpen ? "border-ink/15 bg-white shadow-soft" : "border-line bg-white/50 hover:border-ink/25 hover:bg-white",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-5 left-0 w-[3px] rounded-r-full bg-gold-gradient transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            />
            <h3 className="font-display text-[1.08rem] md:text-[1.25rem]">
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full cursor-pointer items-center gap-4 px-5 py-4 text-left text-ink sm:gap-5 sm:px-6"
              >
                <span
                  aria-hidden
                  className={cn(
                    "w-7 shrink-0 font-display text-base italic tabular-nums transition-colors duration-300",
                    isOpen ? "text-accent" : "text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out-expo",
                    isOpen ? "rotate-45 border-ink bg-ink text-gold" : "border-line text-accent",
                  )}
                >
                  <Plus weight="bold" className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-a${i}`}
                  role="region"
                  aria-labelledby={`${base}-q${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pr-6 pb-6 pl-16 text-base text-ink-soft sm:pl-[4.5rem]">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
