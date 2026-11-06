import type { Metadata } from "next";
import Link from "next/link";
import { ChatCircleDots, Clock, PhoneCall } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { WhatsAppIcon } from "@/components/whatsapp-float";
import { ButtonLink, IconBadge } from "@/components/ui";
import { FAQS } from "@/lib/data";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Devis, délais, matériaux, pièces humides : les réponses aux questions fréquentes sur nos travaux de plâtrerie.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions fréquentes"
        title={
          <>
            Vous vous demandez <em className="italic">peut-être…</em>
          </>
        }
        text="Devis, délais, matériaux, pièces humides : les réponses aux questions que l'on nous pose le plus souvent."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="pb-24 md:pb-32">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)] lg:gap-14">
          <Reveal>
            <FaqAccordion items={FAQS} />
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <aside
              aria-labelledby="faq-aside-title"
              className="theme-dark bg-navy-glow relative isolate overflow-hidden rounded-[28px] p-7 text-plaster shadow-lift sm:p-8"
            >
              <div aria-hidden className="led-line absolute inset-x-8 top-0" />
              <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />
              <IconBadge tone="dark">
                <ChatCircleDots weight="duotone" />
              </IconBadge>
              <h2 id="faq-aside-title" className="mt-6 text-2xl text-plaster">
                Une autre question ?
              </h2>
              <p className="mt-3 text-mist">Écrivez-nous, nous répondons rapidement du lundi au samedi.</p>
              <div className="mt-7 flex flex-col gap-3">
                <ButtonLink
                  href={waLink("Bonjour PLACO PRO 237, j'ai une question :")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="w-full"
                >
                  <WhatsAppIcon /> Poser ma question
                </ButtonLink>
                <ButtonLink href="/contact#devis" arrow className="w-full">
                  Demander un devis
                </ButtonLink>
              </div>
              <ul className="mt-7 space-y-2 border-t border-white/10 pt-6 text-sm text-mist">
                <li>
                  <Link href="/contact" className="inline-flex min-h-10 items-center gap-2.5 transition-colors hover:text-gold-light">
                    <PhoneCall weight="duotone" className="size-5 text-gold" aria-hidden /> Nos numéros de téléphone
                  </Link>
                </li>
                <li className="flex min-h-10 items-center gap-2.5">
                  <Clock weight="duotone" className="size-5 text-gold" aria-hidden /> {SITE.hours}
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
