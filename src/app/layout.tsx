import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollProgress, SmoothScroll } from "@/components/motion-fx";
import { SITE } from "@/lib/site";
import "./globals.css";

// Montserrat — police de la charte : ExtraBold 800 (titres, interlettrage serré), SemiBold 600 (signatures, capitales espacées).
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "PLACO PRO 237 — Plâtrerie, faux plafonds & décoration intérieure | Douala · Yaoundé",
    template: "%s | PLACO PRO 237",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F4" },
    { media: "(prefers-color-scheme: dark)", color: "#14284B" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: SITE.email,
  areaServed: SITE.cities.map((c) => ({ "@type": "City", name: c })),
  openingHours: "Mo-Sa 08:00-18:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable} suppressHydrationWarning>
      {/* Les extensions du navigateur (LanguageTool, etc.) ajoutent des attributs sur <html>/<body> */}
      <body suppressHydrationWarning>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-gold-light"
        >
          Aller au contenu
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
