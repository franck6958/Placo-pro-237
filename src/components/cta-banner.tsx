import { ButtonLink, Eyebrow } from "./ui";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-float";
import { CheckCircle } from "./icons";
import { waLink } from "@/lib/site";
import { Magnetic } from "./motion-fx";

const PROMISES = ["Visite sur place offerte", "Devis détaillé et gratuit", "Douala & Yaoundé"];

export function CtaBanner({
  title = "Un projet de plafond, de cloison ou de décoration ?",
  text = "Décrivez-nous vos travaux : nous organisons une visite et vous remettons un devis détaillé, gratuitement.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="theme-dark bg-navy-glow relative isolate overflow-hidden rounded-[32px] px-6 py-16 text-center text-plaster shadow-lift sm:px-12 md:py-24">
          {/* gorge LED : filet lumineux + halo */}
          <div aria-hidden className="led-line absolute inset-x-[12%] top-0" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/20 blur-[100px]"
          />
          <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-50" />

          <Eyebrow invert>Devis gratuit</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)]">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">{text}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <ButtonLink href="/contact#devis" size="lg" arrow>
                Demander un devis
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={waLink()} variant="outline" size="lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="text-[#25D366]" /> WhatsApp
            </ButtonLink>
          </div>

          <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-mist">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CheckCircle weight="duotone" aria-hidden className="size-5 text-gold" /> {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
