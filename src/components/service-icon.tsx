import { Brush, Columns3, Layers, Lightbulb, Sofa, Waves, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/lib/data";

const ICONS: Record<ServiceSlug, LucideIcon> = {
  "faux-plafonds": Layers,
  "cloisons-doublages": Columns3,
  "staff-corniches": Waves,
  "eclairage-integre": Lightbulb,
  "decoration-interieure": Sofa,
  "enduits-peinture": Brush,
};

export function ServiceIcon({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const Icon = ICONS[slug];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
