import { ButtonLink } from "./ui";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-float";
import { waLink } from "@/lib/site";

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
        <Reveal className="grain relative isolate overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center text-plaster sm:px-12 md:py-24">
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/25 blur-[100px]"
          />
          <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-[0.15]" />
          <span className="eyebrow text-gold">Devis gratuit</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)]">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-plaster/70">{text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact#devis" arrow>
              Demander un devis
            </ButtonLink>
            <ButtonLink
              href={waLink()}
              variant="light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-5 text-[#25D366]" /> WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
