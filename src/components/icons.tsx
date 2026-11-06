/**
 * Icônes — convention PLACO PRO 237 (Phosphor Icons v2)
 * -----------------------------------------------------------------------------
 * Bibliothèque unique : @phosphor-icons/react. lucide-react n'est plus utilisé.
 *
 * Où importer ?
 *  - Server Components (par défaut dans app/ et components/) :
 *      import { Phone, UI } from "@/components/icons";
 *    Ce module ré-exporte la variante `@phosphor-icons/react/ssr` (aucun contexte React,
 *    compatible RSC). Elle fonctionne aussi dans un fichier "use client".
 *  - Fichiers "use client" qui veulent l'IconContext : importer directement
 *    depuis "@phosphor-icons/react". Sinon, ce module convient aussi.
 *
 * Quels poids ?
 *  - weight="duotone" → icônes illustratives / décoratives : services, valeurs,
 *    coordonnées, garanties, pictos de cartes. Spread : {...DECOR}
 *  - weight="bold"    → petites icônes d'UI ≤ 20px : flèches, chevrons, check, plus,
 *    fermer, téléphone dans un bouton. Spread : {...UI}
 *  - weight="regular" → icônes d'UI plus grandes (≥ 24px) si "bold" paraît lourd.
 *  - weight="fill"    → logos de marque (WhatsappLogo) et états actifs uniquement.
 *
 * Taille : via className Tailwind (size-4, size-5…) — la taille CSS l'emporte sur l'attribut.
 * Couleur : `currentColor` → utiliser text-accent (fond clair) ou text-gold (fond sombre).
 * Accessibilité : toujours aria-hidden sur les icônes décoratives (inclus dans DECOR / UI) ;
 *   un bouton icône seule DOIT porter un aria-label.
 */

export {
  AndroidLogo,
  AppleLogo,
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Buildings,
  CaretDown,
  CaretRight,
  ChatCircleDots,
  Check,
  CheckCircle,
  CircleNotch,
  Clock,
  Crosshair,
  DeviceMobile,
  Diamond,
  DownloadSimple,
  Envelope,
  EnvelopeSimple,
  Eye,
  FrameCorners,
  LampPendant,
  Lightning,
  Lightbulb,
  List,
  MapPin,
  MapPinLine,
  PaintRoller,
  Palette,
  PaperPlaneTilt,
  Phone,
  PhoneCall,
  Plus,
  Ruler,
  SealCheck,
  ShieldCheck,
  Sparkle,
  SquaresFour,
  Stack,
  Star,
  Tag,
  WarningCircle,
  Wall,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react/ssr";

export type { Icon as PhosphorIcon, IconProps, IconWeight } from "@phosphor-icons/react";

/** Icône illustrative (services, valeurs, contact, garanties). */
export const DECOR = { weight: "duotone", "aria-hidden": true } as const;
/** Petite icône d'interface (flèches, chevrons, check…). */
export const UI = { weight: "bold", "aria-hidden": true } as const;
