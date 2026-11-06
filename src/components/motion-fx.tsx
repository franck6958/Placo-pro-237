"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Défilement fluide (désactivé si l'utilisateur réduit les animations) */
/* ------------------------------------------------------------------ */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -100 }, lerp: 0.1 });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Retour en haut à chaque nouvelle page
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Barre de progression de lecture                                     */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold via-gold-light to-gold"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Titre révélé mot par mot                                            */
/* ------------------------------------------------------------------ */
type Segment = string | { em: string };

export function SplitTitle({
  segments,
  as: Tag = "h1",
  className,
  delay = 0,
}: {
  segments: Segment[];
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = segments.flatMap((s): { w: string; em: boolean }[] => {
    const em = typeof s !== "string";
    const text = typeof s === "string" ? s : s.em;
    return text.split(" ").filter(Boolean).map((w) => ({ w, em }));
  });
  const label = segments.map((s) => (typeof s === "string" ? s : s.em)).join(" ").replace(/\s+/g, " ");
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;

  return (
    <MotionTag
      aria-label={label}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map(({ w, em }, i) => (
        <Fragment key={i}>
          <span aria-hidden className="-mb-[0.12em] inline-block overflow-hidden pr-[0.04em] pb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block", em && "text-accent italic")}
              variants={{
                hidden: { y: "110%", rotate: 4, opacity: 0 },
                show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.9, ease } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {/* Espace normale entre les mots : permet le retour à la ligne */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* Révélation par masque (fonctionne avec n'importe quel contenu)      */
/* ------------------------------------------------------------------ */
export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", y: 40 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Carte 3D : inclinaison + halo lumineux qui suit la souris           */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  intensity = 6,
  glow = "rgb(217 98 15 / 0.18)",
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, ${glow}, transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (!reduce) {
      rx.set((0.5 - py) * intensity);
      ry.set((px - 0.5) * intensity);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("group/tilt relative h-full", className)}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Bouton « magnétique »                                               */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  return (
    <motion.div
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallaxe verticale                                                 */
/* ------------------------------------------------------------------ */
export function Parallax({ children, className, offset = 80 }: { children: ReactNode; className?: string; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Flottement doux (badges du hero)                                    */
/* ------------------------------------------------------------------ */
export function Float({ children, className, delay = 0, distance = 10 }: { children: ReactNode; className?: string; delay?: number; distance?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, y: [0, -distance, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay, ease },
        y: { duration: 5, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Grand texte du pied de page, lettres qui montent                    */
/* ------------------------------------------------------------------ */
export function RisingLetters({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      aria-hidden
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-20px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: "60%", opacity: 0 },
            show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/* Ligne qui se dessine au défilement (étapes)                         */
/* ------------------------------------------------------------------ */
export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("h-px origin-left bg-gradient-to-r from-gold via-gold-light to-gold", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.6, ease }}
    />
  );
}
