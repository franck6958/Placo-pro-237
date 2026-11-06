/* === À PERSONNALISER === */
export const SITE = {
  name: "PLACO PRO 237",
  url: "https://placopro237.com",
  description:
    "PLACO PRO 237 : faux plafonds, cloisons en plaque de plâtre, staff, corniches, éclairage intégré et décoration intérieure à Douala et Yaoundé. Devis gratuit.",
  whatsapp: "237672840122", // format international, sans + ni espaces
  phoneDisplay: "+237 672 840 122",
  phoneHref: "tel:+237672840122",
  phones: [
    { display: "+237 672 840 122", href: "tel:+237672840122" },
    { display: "+237 656 963 006", href: "tel:+237656963006" },
  ],
  email: "contact@placopro237.com",
  hours: "Lun – Sam · 8h – 18h",
  cities: ["Douala", "Yaoundé"],
} as const;

/** Application Android (APK construit par `npm run build:apk`). */
export const APP = {
  apk: "/placo-pro-237.apk",
  version: "1.0.0",
  size: "42 Ko",
  minAndroid: "Android 5.0 ou plus récent",
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
