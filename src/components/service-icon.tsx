import { Armchair, FrameCorners, Lightbulb, PaintRoller, Stack, Wall, type IconWeight, type PhosphorIcon } from "./icons";
import type { ServiceSlug } from "@/lib/data";

/** Pictogramme Phosphor par service (duotone par défaut — icône illustrative). */
export const SERVICE_ICONS: Record<ServiceSlug, PhosphorIcon> = {
  "faux-plafonds": Stack, // plaques suspendues en strates
  "cloisons-doublages": Wall,
  "staff-corniches": FrameCorners, // moulures, encadrements
  "eclairage-integre": Lightbulb, // gorges LED, spots
  "decoration-interieure": Armchair,
  "enduits-peinture": PaintRoller,
};

export function ServiceIcon({
  slug,
  className,
  weight = "duotone",
}: {
  slug: ServiceSlug;
  className?: string;
  weight?: IconWeight;
}) {
  const Icon = SERVICE_ICONS[slug];
  return <Icon className={className} weight={weight} aria-hidden />;
}
