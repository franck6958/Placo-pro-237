# PLACO PRO 237 — site Next.js

Site multi-pages (Next.js 16, App Router, Tailwind CSS 4, Motion).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| URL | Contenu |
| --- | --- |
| `/` | Accueil (hero, services, méthode, projets, zones, FAQ) |
| `/services` | Liste des 6 services |
| `/services/[slug]` | Page détaillée par service |
| `/realisations` | Galerie filtrable (`?cat=plafond`, `cloison`, `deco`) |
| `/realisations/[slug]` | Fiche projet |
| `/a-propos` | Entreprise, valeurs, méthode |
| `/faq` | Questions fréquentes |
| `/contact` | Formulaire de devis (`?service=...` pré-sélectionne le service) |
| `POST /api/devis` | Réception et validation des demandes de devis |

## À personnaliser

- **Coordonnées** (WhatsApp, téléphone, e-mail, horaires) : `src/lib/site.ts`
- **Contenus** (services, projets, FAQ, étapes) : `src/lib/data.ts`
- **E-mail des devis** : copier `.env.example` en `.env.local` et renseigner `RESEND_API_KEY`
- **Photos** : les projets utilisent des illustrations SVG (`src/components/illustrations.tsx`) à remplacer par de vraies photos (`next/image`).
