import type { Project } from "@/lib/data";

/** Coupe de faux plafond avec gorge lumineuse (reprise de l'illustration d'origine, animée). */
export function CeilingScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="cs-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4D9A8" stopOpacity=".95" />
          <stop offset="1" stopColor="#F4D9A8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F3EC" />
          <stop offset="1" stopColor="#E7DFD1" />
        </linearGradient>
        <linearGradient id="cs-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4D9A8" stopOpacity=".7" />
          <stop offset="1" stopColor="#F4D9A8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#cs-wall)" />
      <rect width="400" height="70" fill="#FFFFFF" />
      <rect y="70" width="400" height="10" fill="#E2D9CA" />
      <rect x="60" y="80" width="280" height="44" fill="#FFFFFF" stroke="#DDD3C3" />
      <rect x="60" y="124" width="280" height="70" fill="url(#cs-glow)" className="animate-pulse [animation-duration:5s]" />
      <rect x="100" y="80" width="200" height="22" fill="#F1ECE3" />
      <g fill="#1E1E1C">
        <circle cx="30" cy="76" r="4" />
        <circle cx="370" cy="76" r="4" />
      </g>
      <g fill="url(#cs-beam)">
        <path d="M30 80 L4 320 L56 320 Z" />
        <path d="M370 80 L344 320 L396 320 Z" />
      </g>
      <path d="M0 80 h400" stroke="#C9A46A" strokeWidth="2" />
      <rect y="420" width="400" height="80" fill="#D6CCBB" />
      <rect x="90" y="350" width="220" height="70" rx="10" fill="#B5562E" />
      <rect x="90" y="330" width="220" height="30" rx="10" fill="#8E3F1F" />
      <rect x="150" y="215" width="100" height="70" fill="none" stroke="#1E1E1C" strokeWidth="3" />
      <path d="M155 280 l30 -35 l20 22 l15 -14 l25 27 z" fill="#C9A46A" />
      <circle cx="225" cy="235" r="7" fill="#B5562E" opacity=".8" />
    </svg>
  );
}

const TONES = {
  warm: { wall: "#F3ECE1", wall2: "#E6DCCB", ceil: "#FFFFFF", floor: "#D6CCBB", glow: "#F4D9A8", ink: "#1E1E1C", accent: "#B5562E" },
  sand: { wall: "#ECE5D9", wall2: "#DCD1BF", ceil: "#F8F5EF", floor: "#C9BCA6", glow: "#F1D7A4", ink: "#2B2926", accent: "#8E3F1F" },
  night: { wall: "#2B2825", wall2: "#1F1D1B", ceil: "#34302C", floor: "#171615", glow: "#E9C27F", ink: "#0E0E0D", accent: "#C9A46A" },
} as const;

/** Illustration paramétrique d'un projet, selon la catégorie et la tonalité. */
export function RoomScene({ project, className }: { project: Pick<Project, "slug" | "cat" | "tone">; className?: string }) {
  const t = TONES[project.tone];
  const id = project.slug;
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
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-wall)`} />
      <rect y="250" width="400" height="50" fill={t.floor} />

      {project.cat === "plafond" && (
        <g>
          <rect width="400" height="40" fill={t.ceil} />
          <rect x="70" y="40" width="260" height="26" fill={t.ceil} stroke={t.wall2} />
          <rect x="70" y="66" width="260" height="60" fill={`url(#${id}-glow)`} />
          <rect x="110" y="40" width="180" height="12" fill={t.wall} opacity=".6" />
          {[40, 360].map((x) => (
            <g key={x}>
              <circle cx={x} cy="44" r="3.5" fill={t.ink} />
              <path d={`M${x} 47 L${x - 22} 230 L${x + 22} 230 Z`} fill={t.glow} opacity=".28" />
            </g>
          ))}
          <path d="M0 40 h400" stroke="#C9A46A" strokeWidth="1.5" />
          <rect x="120" y="200" width="160" height="50" rx="8" fill={t.accent} />
          <rect x="120" y="186" width="160" height="22" rx="8" fill={t.ink} opacity=".75" />
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
        </g>
      )}

      {project.cat === "deco" && (
        <g>
          <rect width="400" height="36" fill={t.ceil} />
          <rect x="60" y="56" width="280" height="194" fill={t.wall2} />
          <rect x="60" y="56" width="280" height="6" fill={t.glow} opacity=".8" />
          <rect x="60" y="62" width="280" height="50" fill={`url(#${id}-glow)`} opacity=".7" />
          <rect x="130" y="100" width="140" height="80" rx="4" fill={t.ink} />
          <rect x="136" y="106" width="128" height="68" rx="2" fill={t.ink} stroke={t.glow} strokeOpacity=".25" />
          {[80, 290].map((x) => (
            <g key={x}>
              <rect x={x} y="90" width="30" height="120" fill={t.wall} />
              <rect x={x} y="90" width="30" height="4" fill={t.glow} />
              <rect x={x + 8} y="120" width="14" height="18" fill={t.accent} opacity=".85" />
              <circle cx={x + 15} cy="180" r="7" fill="#C9A46A" />
            </g>
          ))}
          <rect x="110" y="200" width="180" height="26" fill={t.wall} />
          <rect x="110" y="226" width="180" height="4" fill={t.glow} opacity=".6" />
        </g>
      )}
    </svg>
  );
}
