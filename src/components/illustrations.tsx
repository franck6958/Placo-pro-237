import Image from "next/image";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Photo réelle si disponible, sinon illustration paramétrique.
 * Les photos du dossier public/realisations sont en basse résolution (~500px) :
 * à afficher dans des cadres de taille raisonnable, jamais en plein écran.
 */
export function ProjectVisual({
  project,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  alt,
  imageClassName,
}: {
  project: Pick<Project, "slug" | "cat" | "tone" | "title"> & { image?: string };
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Texte alternatif (par défaut : titre du projet). Passer "" si l'image est décorative. */
  alt?: string;
  /** Classes appliquées à l'<Image> (zoom au survol, cadrage…). */
  imageClassName?: string;
}) {
  if (!project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-plaster-3", className)}>
        <RoomScene project={project} className={cn("absolute inset-0 size-full", imageClassName)} />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden bg-plaster-3", className)}>
      <Image
        src={project.image}
        alt={alt ?? project.title}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

const TONES = {
  warm: { wall: "#F3ECE1", wall2: "#E6DCCB", ceil: "#FFFFFF", floor: "#D6CCBB", glow: "#F6C9A4", ink: "#14284B", accent: "#1D3763", line: "#B5500A" },
  sand: { wall: "#ECE5D9", wall2: "#DCD1BF", ceil: "#F8F5EF", floor: "#C9BCA6", glow: "#F3C7A0", ink: "#1D3763", accent: "#27477C", line: "#B5500A" },
  night: { wall: "#22406F", wall2: "#1D3763", ceil: "#2A4A7E", floor: "#14284B", glow: "#F08A3E", ink: "#0C1A33", accent: "#D9620F", line: "#F08A3E" },
} as const;

/**
 * Illustration paramétrique d'un projet (catégorie + tonalité), façon
 * « perspective d'architecte » : volumes, gorge lumineuse et cotes dorées.
 */
export function RoomScene({ project, className }: { project: Pick<Project, "slug" | "cat" | "tone">; className?: string }) {
  const t = TONES[project.tone];
  const id = `rs-${project.slug}`;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.wall} />
          <stop offset="1" stopColor={t.wall2} />
        </linearGradient>
        <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.glow} stopOpacity=".95" />
          <stop offset="1" stopColor={t.glow} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx=".5" cy="0" r=".9">
          <stop offset="0" stopColor={t.glow} stopOpacity=".55" />
          <stop offset="1" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.floor} />
          <stop offset="1" stopColor={t.wall2} />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${id}-wall)`} />
      {/* sol en perspective */}
      <path d="M0 250 L400 250 L400 300 L0 300 Z" fill={`url(#${id}-floor)`} />
      {[60, 140, 220, 300, 380].map((x) => (
        <path key={x} d={`M${x - 20} 250 L${(x - 200) * 1.6 + 200} 300`} stroke={t.ink} strokeOpacity=".06" />
      ))}

      {project.cat === "plafond" && (
        <g>
          <rect width="400" height="40" fill={t.ceil} />
          <rect x="70" y="40" width="260" height="22" fill={t.ceil} stroke={t.wall2} />
          {/* gorge LED */}
          <rect x="70" y="62" width="260" height="2" fill={t.glow} />
          <rect x="70" y="64" width="260" height="64" fill={`url(#${id}-glow)`} />
          <rect x="110" y="40" width="180" height="10" fill={t.wall} opacity=".6" />
          {[40, 360].map((x) => (
            <g key={x}>
              <circle cx={x} cy="44" r="3.5" fill={t.ink} />
              <path d={`M${x} 47 L${x - 22} 230 L${x + 22} 230 Z`} fill={t.glow} opacity=".26" />
            </g>
          ))}
          <path d="M0 40 h400" stroke={t.line} strokeWidth="1.2" />
          {/* canapé */}
          <rect x="120" y="204" width="160" height="46" rx="8" fill={t.accent} />
          <rect x="120" y="188" width="160" height="22" rx="8" fill={t.ink} opacity=".75" />
          {/* cote */}
          <g stroke={t.line} strokeOpacity=".7" fill="none">
            <path d="M70 22 h260" />
            <path d="M70 17 v10 M330 17 v10" />
          </g>
        </g>
      )}

      {project.cat === "cloison" && (
        <g>
          <rect width="400" height="34" fill={t.ceil} />
          <rect width="400" height="300" fill={`url(#${id}-halo)`} />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${30 + i * 120} 60)`}>
              <rect width="100" height="190" fill={t.ceil} stroke={t.wall2} strokeWidth="2" />
              <rect x="30" y="70" width="40" height="120" fill={t.wall2} />
              <circle cx="62" cy="132" r="2.5" fill={t.accent} />
              <path d="M0 0 v190" stroke={t.ink} strokeOpacity=".15" strokeDasharray="4 6" />
            </g>
          ))}
          <path d="M0 250 h400" stroke={t.ink} strokeOpacity=".2" />
          <g stroke={t.line} strokeOpacity=".7" fill="none">
            <path d="M18 60 v190" />
            <path d="M13 60 h10 M13 250 h10" />
          </g>
        </g>
      )}

      {project.cat === "deco" && (
        <g>
          <rect width="400" height="36" fill={t.ceil} />
          <rect x="60" y="56" width="280" height="194" fill={t.wall2} />
          <rect x="60" y="56" width="280" height="5" fill={t.glow} opacity=".85" />
          <rect x="60" y="61" width="280" height="50" fill={`url(#${id}-glow)`} opacity=".7" />
          <rect x="130" y="100" width="140" height="80" rx="4" fill={t.ink} />
          <rect x="136" y="106" width="128" height="68" rx="2" fill={t.ink} stroke={t.glow} strokeOpacity=".25" />
          {[80, 290].map((x) => (
            <g key={x}>
              <rect x={x} y="90" width="30" height="120" fill={t.wall} />
              <rect x={x} y="90" width="30" height="4" fill={t.glow} />
              <rect x={x + 8} y="120" width="14" height="18" fill={t.accent} opacity=".85" />
              <circle cx={x + 15} cy="180" r="7" fill={t.line} />
            </g>
          ))}
          <rect x="110" y="200" width="180" height="26" fill={t.wall} />
          <rect x="110" y="226" width="180" height="4" fill={t.glow} opacity=".6" />
        </g>
      )}
    </svg>
  );
}
