"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/** Légende de la coupe (numéros reportés sur le schéma). */
export const CEILING_LEGEND = [
  { title: "Ossature métallique", text: "Suspentes et fourrures fixées à la dalle, réglées au niveau." },
  { title: "Plaques de plâtre", text: "Vissées sur l'ossature ; hydrofuges dans les pièces humides." },
  { title: "Gorge lumineuse LED", text: "Ruban caché derrière une joue : lumière indirecte, sans câble visible." },
  { title: "Spots encastrés", text: "Réservations prévues dès la pose pour un éclairage d'appoint." },
  { title: "Bandes, enduits & peinture", text: "Joints invisibles et surfaces lisses, prêtes à vivre." },
] as const;

/** Position des pastilles numérotées sur le schéma (viewBox 480 × 300). */
const MARKERS = [
  { x: 110, y: 148 },
  { x: 240, y: 150 },
  { x: 196, y: 176 },
  { x: 70, y: 238 },
  { x: 432, y: 216 },
];

/**
 * Coupe pédagogique d'un faux plafond à caisson avec gorge LED.
 * Conçue pour un fond sombre (bleu nuit). Les lumières s'allument à l'entrée dans le viewport ;
 * avec prefers-reduced-motion, l'état final est affiché directement.
 */
export function CeilingScene({ className, legend = true }: { className?: string; legend?: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const glow = `cs-glow-${uid}`;
  const beam = `cs-beam-${uid}`;
  const hatch = `cs-hatch-${uid}`;

  const appear = (delay: number, from: Record<string, number> = {}) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, ...from },
          whileInView: { opacity: 1, x: 0, y: 0, scaleY: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 1, delay, ease },
        };

  const hangers = [
    { x: 40, to: 182 },
    { x: 110, to: 182 },
    { x: 200, to: 112 },
    { x: 280, to: 112 },
    { x: 370, to: 182 },
    { x: 440, to: 182 },
  ];

  return (
    <figure className={cn("grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center", className)}>
      <div className="relative overflow-hidden rounded-[28px] bg-night/60 ring-1 ring-white/10">
        <svg viewBox="0 0 480 300" className="block h-auto w-full" role="img" aria-labelledby={`${uid}-t`}>
          <title id={`${uid}-t`}>Coupe d&apos;un faux plafond à caisson avec gorge lumineuse LED et spots encastrés</title>
          <defs>
            <linearGradient id={glow} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" style={{ stopColor: "var(--color-gold-light)", stopOpacity: 0.9 }} />
              <stop offset="1" style={{ stopColor: "var(--color-gold)", stopOpacity: 0.15 }} />
            </linearGradient>
            <linearGradient id={beam} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--color-gold-pale)", stopOpacity: 0.55 }} />
              <stop offset="1" style={{ stopColor: "var(--color-gold-pale)", stopOpacity: 0 }} />
            </linearGradient>
            <pattern id={hatch} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" className="stroke-white/10" strokeWidth="2" />
            </pattern>
          </defs>

          {/* Dalle béton */}
          <rect width="480" height="40" className="fill-navy-2" />
          <rect width="480" height="40" fill={`url(#${hatch})`} />
          <line x1="0" y1="40" x2="480" y2="40" className="stroke-white/20" />

          {/* 1 · Ossature : suspentes + fourrures */}
          <motion.g {...appear(0.1, { y: -12 })}>
            {hangers.map((h) => (
              <line key={h.x} x1={h.x} y1="40" x2={h.x} y2={h.to} className="stroke-mist/60" strokeWidth="2" strokeDasharray="3 4" />
            ))}
            <rect x="0" y="182" width="170" height="8" className="fill-mist/50" />
            <rect x="310" y="182" width="170" height="8" className="fill-mist/50" />
            <rect x="150" y="112" width="180" height="8" className="fill-mist/50" />
          </motion.g>

          {/* 2 · Plaques : niveaux bas (côtés) + caisson central + joues */}
          <motion.g {...appear(0.3, { y: 10 })}>
            <rect x="0" y="190" width="170" height="10" className="fill-plaster" />
            <rect x="310" y="190" width="170" height="10" className="fill-plaster" />
            <rect x="150" y="120" width="180" height="9" className="fill-plaster" />
            <rect x="150" y="120" width="8" height="42" className="fill-plaster-2" />
            <rect x="322" y="120" width="8" height="42" className="fill-plaster-2" />
            {/* lèvres de la gorge */}
            <rect x="166" y="172" width="4" height="18" className="fill-plaster-2" />
            <rect x="310" y="172" width="4" height="18" className="fill-plaster-2" />
          </motion.g>

          {/* 3 · Gorge LED : la lumière remonte sur le caisson */}
          <motion.g
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0 },
                  whileInView: { opacity: [0, 1, 0.75, 1] },
                  viewport: { once: true, margin: "-60px" },
                  transition: { duration: 1.8, delay: 0.9, ease: "easeOut" },
                })}
          >
            <path d="M158 188 L166 188 L252 129 L158 129 Z" fill={`url(#${glow})`} />
            <path d="M322 188 L314 188 L228 129 L322 129 Z" fill={`url(#${glow})`} />
          </motion.g>
          <motion.g {...appear(0.8)}>
            <rect x="158" y="185" width="8" height="5" rx="1" className="fill-gold-light" />
            <rect x="314" y="185" width="8" height="5" rx="1" className="fill-gold-light" />
          </motion.g>

          {/* 4 · Spots + faisceaux */}
          {[70, 410].map((x, i) => (
            <g key={x}>
              <motion.path
                d={`M${x - 6} 204 L${x - 46} 300 L${x + 46} 300 L${x + 6} 204 Z`}
                fill={`url(#${beam})`}
                style={{ transformOrigin: `${x}px 204px` }}
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, scaleY: 0 },
                      whileInView: { opacity: 1, scaleY: 1 },
                      viewport: { once: true, margin: "-60px" },
                      transition: { duration: 1.1, delay: 1.2 + i * 0.2, ease },
                    })}
              />
              <rect x={x - 8} y="199" width="16" height="5" rx="2" className="fill-ink" />
              <rect x={x - 5} y="203" width="10" height="2" rx="1" className="fill-gold-pale" />
            </g>
          ))}

          {/* 5 · Finition : sous-face enduite */}
          <motion.path
            d="M0 200 H170 M310 200 H480"
            className="stroke-gold"
            strokeWidth="1.5"
            {...(reduce
              ? {}
              : {
                  initial: { pathLength: 0 },
                  whileInView: { pathLength: 1 },
                  viewport: { once: true, margin: "-60px" },
                  transition: { duration: 1.4, delay: 0.5, ease },
                })}
          />

          {/* Sol */}
          <line x1="0" y1="292" x2="480" y2="292" className="stroke-white/15" />

          {/* Pastilles numérotées */}
          {MARKERS.map((m, i) => (
            <motion.g key={i} {...appear(1.4 + i * 0.1, { y: 6 })}>
              <circle cx={m.x} cy={m.y} r="11" className="fill-gold" />
              <circle cx={m.x} cy={m.y} r="15" className="fill-none stroke-gold/40" />
              <text
                x={m.x}
                y={m.y + 4}
                textAnchor="middle"
                className="fill-ink font-sans text-[12px] font-bold"
              >
                {i + 1}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {legend && (
        <figcaption>
          <ol className="grid gap-3">
            {CEILING_LEGEND.map((l, i) => (
              <li key={l.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-sm font-semibold text-white"
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold text-plaster">{l.title}</span>
                  <span className="mt-0.5 block text-sm text-mist">{l.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </figcaption>
      )}
    </figure>
  );
}
