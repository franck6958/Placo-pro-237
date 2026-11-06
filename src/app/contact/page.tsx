import type { Metadata } from "next";
import { ArrowRight, Clock, EnvelopeSimple, MapPin, PhoneCall } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { QuoteFormSection } from "@/components/quote-form";
import { WhatsAppIcon } from "@/components/whatsapp-float";
import { IconBadge } from "@/components/ui";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & devis gratuit",
  description: "Décrivez votre projet de plâtrerie ou de décoration : visite et devis gratuit à Douala et Yaoundé.",
};

const PHONES = SITE.phones;

const NEXT_STEPS = [
  "Nous vous rappelons pour préciser le besoin.",
  "Visite sur place et prise de mesures.",
  "Devis détaillé et proposition de design.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Parlons de <em className="italic">votre projet</em>.
          </>
        }
        text="Appelez-nous, écrivez-nous sur WhatsApp ou remplissez le formulaire : nous organisons une visite et établissons votre devis, gratuitement."
        crumbs={[{ label: "Contact" }]}
      >
        {/* Actions directes — prioritaires sur mobile */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group theme-dark flex min-h-20 items-center gap-4 rounded-[22px] bg-ink p-4 pr-5 text-plaster shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy motion-reduce:hover:translate-y-0"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-gradient text-white">
              <WhatsAppIcon className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold tracking-[0.16em] text-gold uppercase">WhatsApp</span>
              <span className="block font-display text-lg">Écrire maintenant</span>
            </span>
            <ArrowRight weight="bold" aria-hidden className="size-4 text-gold transition-transform group-hover:translate-x-0.5" />
            <span className="sr-only">(nouvelle fenêtre)</span>
          </a>
          {PHONES.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="group flex min-h-20 items-center gap-4 rounded-[22px] border border-line bg-white p-4 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-soft motion-reduce:hover:translate-y-0"
            >
              <IconBadge className="transition-colors duration-300 group-hover:bg-ink group-hover:text-gold">
                <PhoneCall weight="duotone" />
              </IconBadge>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold tracking-[0.16em] text-muted uppercase">Appeler</span>
                <span className="block font-display text-lg whitespace-nowrap text-ink tabular-nums">{p.display}</span>
              </span>
            </a>
          ))}
        </div>
      </PageHero>

      <section id="devis" className="scroll-mt-28 pb-24 md:pb-32">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-12">
          <Reveal>
            <QuoteFormSection />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-line bg-white p-6 sm:p-7">
              <h2 className="text-2xl">Nos coordonnées</h2>
              <dl className="mt-6 divide-y divide-line">
                <div className="flex gap-4 pb-5">
                  <PhoneCall weight="duotone" className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Téléphone</dt>
                    {PHONES.map((p) => (
                      <dd key={p.href}>
                        <a
                          href={p.href}
                          className="inline-flex min-h-10 items-center font-display text-lg text-ink tabular-nums underline-offset-4 hover:text-accent hover:underline"
                        >
                          {p.display}
                        </a>
                      </dd>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">WhatsApp</dt>
                    <dd>
                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center font-display text-lg text-ink underline-offset-4 hover:text-accent hover:underline"
                      >
                        Démarrer une conversation<span className="sr-only"> (nouvelle fenêtre)</span>
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <EnvelopeSimple weight="duotone" className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <div className="min-w-0">
                    <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">E-mail</dt>
                    <dd>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="inline-flex min-h-10 items-center font-display text-lg break-all text-ink underline-offset-4 hover:text-accent hover:underline"
                      >
                        {SITE.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <MapPin weight="duotone" className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Zones</dt>
                    <dd className="font-display text-lg text-ink">{SITE.cities.join(" · ")}</dd>
                  </div>
                </div>
                <div className="flex gap-4 pt-5">
                  <Clock weight="duotone" className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Horaires</dt>
                    <dd className="font-display text-lg text-ink">{SITE.hours}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="theme-dark bg-navy-glow relative overflow-hidden rounded-[28px] p-6 text-plaster sm:p-7">
              <div aria-hidden className="led-line absolute inset-x-8 top-0" />
              <h2 className="text-xl text-plaster">Et ensuite ?</h2>
              <ol className="mt-5 space-y-4">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s} className="flex items-start gap-4 text-[0.95rem] text-mist">
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.07] font-display text-sm text-gold ring-1 ring-white/10"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
