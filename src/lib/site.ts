/* === À PERSONNALISER === */
export const SITE = {
  name: "PLACO PRO 237",
  url: "https://placopro237.com",
  description:
    "PLACO PRO 237 : faux plafonds, cloisons en plaque de plâtre, staff, corniches, éclairage intégré et décoration intérieure à Douala et Yaoundé. Devis gratuit.",
  whatsapp: "237600000000", // format international, sans + ni espaces
  phoneDisplay: "+237 6XX XX XX XX",
  phoneHref: "tel:+237600000000",
  email: "contact@placopro237.com",
  hours: "Lun – Sam · 8h – 18h",
  cities: ["Douala", "Yaoundé"],
} as const;

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function waLink(text = "Bonjour PLACO PRO 237, je souhaite un devis.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
