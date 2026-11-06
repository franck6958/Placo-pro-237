import type { Metadata } from "next";
import { AndroidLogo, AppleLogo, DeviceMobile, Lightning, PhoneCall, ShieldCheck, WhatsappLogo } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ApkButton } from "@/components/app-download";
import { LogoMark } from "@/components/logo";
import { IconBadge } from "@/components/ui";
import { APP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application Android",
  description:
    "Téléchargez l'application PLACO PRO 237 pour Android : nos réalisations, nos services et votre devis gratuit, à portée de main.",
};

const FEATURES = [
  { icon: DeviceMobile, title: "Toujours sous la main", text: "Une icône sur votre écran d'accueil : nos réalisations et nos services en une touche." },
  { icon: WhatsappLogo, title: "Contact immédiat", text: "Appel, WhatsApp et demande de devis directement depuis l'application." },
  { icon: Lightning, title: "Ultra légère", text: `Seulement ${APP.size}. Le contenu est toujours à jour, sans réinstaller.` },
  { icon: ShieldCheck, title: "Sans publicité", text: "Aucune donnée collectée, aucune permission inutile : seulement l'accès à Internet." },
];

const STEPS = [
  { title: "Téléchargez le fichier", text: "Touchez « Télécharger l'application » depuis votre téléphone Android." },
  { title: "Ouvrez-le", text: "Ouvrez placo-pro-237.apk depuis la notification ou le dossier Téléchargements." },
  {
    title: "Autorisez l'installation",
    text: "Si Android le demande, touchez Paramètres puis activez « Autoriser cette source » pour votre navigateur. C'est normal pour une application hors Play Store.",
  },
  { title: "Installez", text: "Touchez Installer. L'icône PLACO PRO 237 apparaît sur votre écran d'accueil." },
];

export default function ApplicationPage() {
  return (
    <>
      <PageHero
        eyebrow="Application Android"
        title={
          <>
            PLACO PRO 237 <em className="italic">dans votre poche</em>
          </>
        }
        text="Nos réalisations, nos services et votre devis gratuit, à portée de main. Téléchargez l'application pour Android en quelques secondes."
        crumbs={[{ label: "Application" }]}
      >
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ApkButton size="lg" />
          <p className="text-sm text-muted">
            Version {APP.version} · {APP.size} · {APP.minAndroid}
          </p>
        </div>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          {/* Aperçu + atouts */}
          <Reveal>
            <div className="theme-dark bg-navy-glow relative isolate overflow-hidden rounded-[28px] p-7 text-plaster sm:p-10">
              <div aria-hidden className="led-line absolute inset-x-8 top-0" />
              <div aria-hidden className="grid-lines-dark absolute inset-0 -z-10 opacity-40" />
              <div className="flex items-center gap-5">
                <span className="grid size-20 shrink-0 place-items-center rounded-[22px] bg-white">
                  <LogoMark className="h-11" />
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold text-plaster">Placo Pro 237</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-mist">
                    <AndroidLogo weight="fill" aria-hidden className="size-4 text-[#3DDC84]" /> Application Android · v{APP.version}
                  </p>
                </div>
              </div>
              <ul className="mt-9 grid gap-6 sm:grid-cols-2">
                {FEATURES.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <IconBadge tone="dark">
                      <Icon weight="duotone" />
                    </IconBadge>
                    <h2 className="mt-4 text-lg text-plaster">{title}</h2>
                    <p className="mt-1.5 text-[0.95rem] text-mist">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Installation */}
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] text-ink">Installer en 4 étapes</h2>
            <ol className="mt-8 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-plaster"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg text-ink">{s.title}</h3>
                    <p className="mt-1 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9">
              <ApkButton variant="navy" />
            </div>

            <div className="mt-10 rounded-2xl border border-line bg-plaster-2 p-6">
              <h3 className="inline-flex items-center gap-2.5 text-base text-ink">
                <AppleLogo weight="fill" aria-hidden className="size-5" /> Sur iPhone ?
              </h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">
                Ouvrez placopro237.com dans Safari, touchez le bouton Partager puis « Sur l&apos;écran d&apos;accueil » :
                le site s&apos;ajoute comme une application.
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2.5 text-sm text-ink-soft">
              <PhoneCall weight="duotone" aria-hidden className="size-5 text-accent" /> Un souci d&apos;installation ? Appelez-nous, on vous guide.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
