# Vidéo de présentation — PLACO PRO 237

Script qui filme automatiquement le site (Microsoft Edge piloté par Playwright), ajoute des sous-titres
explicatifs, un curseur visible, une séquence mobile, une intro et une outro, puis monte le tout en MP4.

## Régénérer la vidéo

```bash
# 1. Lancer le site en production
cd ../placo-pro-237
npm run build
npx next start -p 3210

# 2. Dans un autre terminal
cd ../video-demo
npm install
npx playwright install ffmpeg   # une seule fois
node record.mjs
```

Résultat : `out/PLACO-PRO-237-presentation.mp4` (1920×1080, 30 i/s).

Pour modifier le scénario ou les sous-titres : `record.mjs` (appels `t.cap("Chapitre", "Texte")`).
