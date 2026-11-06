import Link from "next/link";
import { ArrowUpRight, Clock, EnvelopeSimple, MapPin, PhoneCall, WhatsappLogo } from "./icons";
import { Logo } from "./logo";
import { NAV, SITE, waLink } from "@/lib/site";
import { SERVICES } from "@/lib/data";
import { Year } from "./year";
import { buttonClass } from "./ui";
import { ApkButton } from "./app-download";

const linkClass =
  "inline-flex min-h-9 items-center rounded-md transition-colors duration-200 hover:text-gold-light";

export function Footer() {
  return (
    <footer className="theme-dark relative isolate overflow-hidden bg-night text-mist">
      {/* gorge lumineuse en tête de footer */}
      <div aria-hidden className="led-line absolute inset-x-0 top-0 opacity-70" />
      <div
        aria-hidden
        className="absolute -top-48 left-1/2 -z-10 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-gold/[0.12] blur-[120px]"
      />
      <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />

      <div className="container-x relative pt-20 pb-10">
        {/* Bandeau d'appel à l'action */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-7 md:flex-row md:items-center md:p-9">
          <div>
            <p className="font-display text-2xl text-plaster md:text-3xl">
              Un plafond qui sublime la lumière, <em className="text-gold italic">ça se prépare</em>.
            </p>
            <p className="mt-2 text-[0.95rem]">Visite et devis gratuits à Douala et Yaoundé.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/contact#devis" className={buttonClass("primary")}>
              Devis gratuit <ArrowUpRight weight="bold" aria-hidden className="size-4" />
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={buttonClass("outline")}>
              <WhatsappLogo weight="fill" aria-hidden className="size-5 text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="grid gap-12 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo invert className="[&_svg]:h-14" />
            <p className="mt-5 max-w-xs text-[0.95rem]">
              Plâtrerie, faux plafonds, éclairage intégré et décoration intérieure. Finitions soignées, chantiers
              propres, délais tenus.
            </p>
            <div className="mt-6">
              <p className="text-sm text-plaster">Notre application Android</p>
              <div className="mt-3 flex flex-col items-start gap-1">
                <ApkButton variant="outline" size="sm" label="Télécharger l'APK" />
                <Link href="/application" className={`${linkClass} text-[0.85rem] underline-offset-4 hover:underline`}>
                  Comment l&apos;installer ?
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-base text-plaster">Services</h3>
            <ul className="mt-4 space-y-1 text-[0.93rem]">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base text-plaster">Navigation</h3>
            <ul className="mt-4 space-y-1 text-[0.93rem]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={linkClass}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base text-plaster">Contact</h3>
            <ul className="mt-4 space-y-2 text-[0.93rem]">
              <li>
                <a href={SITE.phoneHref} className={`${linkClass} gap-3`}>
                  <PhoneCall weight="duotone" className="size-5 text-gold" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkClass} gap-3 break-all`}>
                  <EnvelopeSimple weight="duotone" className="size-5 shrink-0 text-gold" aria-hidden /> {SITE.email}
                </a>
              </li>
              <li className="flex min-h-9 items-center gap-3">
                <MapPin weight="duotone" className="size-5 text-gold" aria-hidden /> {SITE.cities.join(" · ")}
              </li>
              <li className="flex min-h-9 items-center gap-3">
                <Clock weight="duotone" className="size-5 text-gold" aria-hidden /> {SITE.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-[0.82rem]">
          Copyright © <Year /> | Placo-pro-237 Tous Droits Réservés | Developed By ING Franck Junior MENOUNGA
        </div>
      </div>
    </footer>
  );
}
