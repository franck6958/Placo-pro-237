import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { NAV, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/data";
import { Year } from "./year";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-[#A9A398]">
      <div className="container-x relative pt-20 pb-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-xs text-[0.95rem]">
              Plâtrerie, faux plafonds et décoration intérieure à Douala et Yaoundé.
            </p>
          </div>
          <div>
            <h3 className="text-base text-plaster">Services</h3>
            <ul className="mt-4 space-y-2.5 text-[0.93rem]">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-gold">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base text-plaster">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-[0.93rem]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base text-plaster">Contact</h3>
            <ul className="mt-4 space-y-3 text-[0.93rem]">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone className="size-4 text-gold" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail className="size-4 text-gold" aria-hidden /> {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-gold" aria-hidden /> Douala · Yaoundé
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none select-none py-8 text-center font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-none tracking-tight text-white/[0.04]"
        >
          PLACO PRO 237
        </p>

        <div className="flex flex-wrap justify-between gap-3 text-[0.82rem]">
          <span>
            © <Year /> PLACO PRO 237. Tous droits réservés.
          </span>
          <span>Douala · Yaoundé — Cameroun</span>
        </div>
      </div>
    </footer>
  );
}
