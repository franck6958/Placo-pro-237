// Enregistre la vidéo de présentation du site PLACO PRO 237.
// Pré-requis : le site tourne sur http://localhost:3210 (npm run build && npx next start -p 3210)
// Usage : node record.mjs
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const OUT = path.resolve("out");
const RAW = path.join(OUT, "raw");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(RAW, { recursive: true });

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`;

/* -------------------------------------------------------------- */
/* Surcouche injectée dans le site : sous-titres + curseur visible */
/* -------------------------------------------------------------- */
const overlayScript = () => {
  const css = `
  #__demo-cap{position:fixed;left:50%;bottom:44px;transform:translateX(-50%);z-index:2147483646;display:flex;align-items:center;gap:18px;
    max-width:1280px;padding:18px 30px 18px 18px;border-radius:999px;background:rgba(20,20,19,.88);backdrop-filter:blur(14px);
    color:#F5F1EA;font:500 25px/1.35 Inter,system-ui,sans-serif;box-shadow:0 20px 60px -20px rgba(0,0,0,.6);
    transition:opacity .45s cubic-bezier(.16,1,.3,1),transform .45s cubic-bezier(.16,1,.3,1);pointer-events:none}
  #__demo-cap.hide{opacity:0;transform:translateX(-50%) translateY(16px)}
  #__demo-cap b{flex:none;background:#B5562E;color:#fff;border-radius:999px;padding:8px 18px;font:600 17px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase}
  #__demo-cur{position:fixed;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;z-index:2147483647;pointer-events:none;
    background:rgba(30,30,28,.85);border:3px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,.35);transition:transform .15s}
  #__demo-cur.down{transform:scale(.7)}
  .__demo-ripple{position:fixed;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;border:3px solid #B5562E;z-index:2147483646;pointer-events:none;
    animation:__rip .6s ease-out forwards}
  @keyframes __rip{to{transform:scale(4);opacity:0}}`;
  const ensure = () => {
    if (!document.getElementById("__demo-style")) {
      const s = document.createElement("style");
      s.id = "__demo-style";
      s.textContent = css;
      document.head.appendChild(s);
    }
    let cap = document.getElementById("__demo-cap");
    if (!cap) {
      cap = document.createElement("div");
      cap.id = "__demo-cap";
      cap.className = "hide";
      cap.innerHTML = "<b></b><span></span>";
      document.body.appendChild(cap);
    }
    let cur = document.getElementById("__demo-cur");
    if (!cur) {
      cur = document.createElement("div");
      cur.id = "__demo-cur";
      document.body.appendChild(cur);
    }
    return { cap, cur };
  };
  window.__cap = (chapter, text) => {
    const { cap } = ensure();
    if (!text) return cap.classList.add("hide");
    cap.classList.add("hide");
    setTimeout(() => {
      cap.querySelector("b").textContent = chapter;
      cap.querySelector("span").textContent = text;
      cap.classList.remove("hide");
    }, 260);
  };
  document.addEventListener("mousemove", (e) => {
    if (!document.body) return;
    const { cur } = ensure();
    cur.style.left = e.clientX + "px";
    cur.style.top = e.clientY + "px";
  }, true);
  document.addEventListener("mousedown", (e) => {
    const { cur } = ensure();
    cur.classList.add("down");
    const r = document.createElement("div");
    r.className = "__demo-ripple";
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }, true);
  document.addEventListener("mouseup", () => document.getElementById("__demo-cur")?.classList.remove("down"), true);
};

/* --------------------------- Cartons ---------------------------- */
const card = ({ kicker, title, sub, chips = [] }) => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{margin:0;box-sizing:border-box}
  html{background:#F5F1EA}
  body:not(.go){visibility:hidden}
  body:not(.go) *,body:not(.go):before{animation-play-state:paused!important}
  body{width:1920px;height:1080px;overflow:hidden;background:#F5F1EA;color:#1E1E1C;font-family:Inter,sans-serif;display:grid;place-items:center;position:relative}
  body:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 159px,rgba(30,30,28,.08) 159px 160px);animation:fade 1.5s both}
  .halo{position:absolute;top:-200px;right:-150px;width:900px;height:900px;border-radius:50%;background:rgba(201,164,106,.35);filter:blur(140px);animation:fade 2s both}
  .wrap{position:relative;text-align:center;max-width:1500px}
  .logo{display:inline-flex;align-items:center;gap:18px;font:700 40px Fraunces,Georgia,serif;letter-spacing:.02em;animation:up 1s .2s both cubic-bezier(.16,1,.3,1)}
  .logo i{display:grid;place-items:center;width:64px;height:64px;border-radius:16px;background:#1E1E1C;color:#F5F1EA;font:700 22px Inter;font-style:normal}
  .logo em{color:#B5562E;font-style:normal}
  .k{margin-top:70px;color:#B5562E;font:600 22px Inter;letter-spacing:.2em;text-transform:uppercase;animation:up 1s .5s both cubic-bezier(.16,1,.3,1)}
  h1{margin-top:28px;font:600 112px/1.02 Fraunces,Georgia,serif;letter-spacing:-.02em;overflow:hidden}
  h1 span{display:inline-block;animation:rise 1.2s .7s both cubic-bezier(.16,1,.3,1)}
  h1 em{color:#B5562E}
  .line{height:3px;width:420px;margin:44px auto 0;background:linear-gradient(90deg,#B5562E,#C9A46A,#B5562E);transform-origin:left;animation:draw 1.4s 1.1s both cubic-bezier(.16,1,.3,1)}
  p{margin-top:40px;font-size:32px;color:#4A4844;animation:up 1s 1.4s both cubic-bezier(.16,1,.3,1)}
  .chips{margin-top:46px;display:flex;gap:14px;justify-content:center}
  .chips span{padding:14px 26px;border-radius:999px;background:#1E1E1C;color:#F5F1EA;font:500 22px Inter;animation:up .8s both cubic-bezier(.16,1,.3,1)}
  @keyframes up{from{opacity:0;transform:translateY(30px)}}
  @keyframes rise{from{transform:translateY(110%) rotate(3deg)}}
  @keyframes draw{from{transform:scaleX(0)}}
  @keyframes fade{from{opacity:0}}
</style></head><body><div class="halo"></div><div class="wrap">
  <div class="logo"><i>PP</i><span>PLACO PRO <em>237</em></span></div>
  <div class="k">${kicker}</div>
  <h1><span>${title}</span></h1>
  <div class="line"></div>
  <p>${sub}</p>
  <div class="chips">${chips.map((c, i) => `<span style="animation-delay:${1.7 + i * 0.12}s">${c}</span>`).join("")}</div>
</div><script>
  const go=()=>document.body.classList.add("go");
  Promise.all(["600 112px Fraunces","italic 600 112px Fraunces","700 40px Fraunces","500 22px Inter"].map(f=>document.fonts.load(f)))
    .then(()=>document.fonts.ready).then(()=>setTimeout(go,150),go);
  setTimeout(go,4000);
</script></body></html>`;

/* --------------------------- Outils ----------------------------- */
const ff = (args) => execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

function tools(page) {
  const wait = (ms) => page.waitForTimeout(ms);
  const cap = (chapter, text) => page.evaluate(([c, t]) => window.__cap?.(c, t), [chapter, text]);
  let mouse = { x: 960, y: 540 };
  const moveTo = async (x, y, steps = 30) => {
    await page.mouse.move(x, y, { steps });
    mouse = { x, y };
  };
  // Next garde les pages précédentes cachées (Activity) : on ne vise que les éléments visibles.
  const vis = (l) => l.filter({ visible: true }).first();
  const hover = async (locator, steps = 30) => {
    locator = vis(locator);
    let b = await locator.boundingBox();
    if (!b) throw new Error("élément introuvable pour survol");
    const vh = page.viewportSize().height;
    if (b.y < 0 || b.y + Math.min(b.height, 200) > vh - 150) {
      await scrollTo(locator, Math.max(120, vh / 2 - Math.min(b.height, 400) / 2));
      b = await locator.boundingBox();
    }
    await moveTo(b.x + b.width / 2, b.y + b.height / 2, steps);
  };
  const click = async (locator) => {
    await hover(locator);
    await wait(250);
    await page.mouse.down();
    await wait(90);
    await page.mouse.up(); // vrai clic à la position du curseur
  };
  /** Défilement doux à la molette (Lenis lisse le mouvement). */
  const scroll = async (px, stepMs = 22) => {
    const step = 60 * Math.sign(px);
    for (let done = 0; Math.abs(done) < Math.abs(px); done += step) {
      await page.mouse.wheel(0, step);
      await wait(stepMs);
    }
    await wait(500);
  };
  /** Défile jusqu'à amener l'élément à `top` px du haut de l'écran. */
  const scrollTo = async (locator, top = 160) => {
    locator = vis(locator);
    let last = null;
    let still = 0;
    for (let i = 0; i < 200; i++) {
      const b = await locator.boundingBox();
      if (!b) break;
      const d = b.y - top;
      if (Math.abs(d) < 40) break;
      // Élément fixe ou bout de page atteint : on arrête
      still = last !== null && Math.abs(last - b.y) < 1 ? still + 1 : 0;
      if (still > 8) break;
      last = b.y;
      await page.mouse.wheel(0, Math.max(-90, Math.min(90, d)));
      await wait(22);
    }
    await wait(600);
  };
  return { wait, cap, moveTo, hover, click, scroll, scrollTo, get mouse() { return mouse; } };
}

/* ======================== 1. Bureau ============================== */
const browser = await chromium.launch({ channel: "msedge", headless: true });
console.log("▶ Enregistrement version bureau…");
{
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: RAW, size: { width: 1920, height: 1080 } },
  });
  const page = await ctx.newPage();
  const t = tools(page);

  // Intro
  await page.setContent(card({
    kicker: "Présentation du nouveau site",
    title: "Des intérieurs finis <em>avec précision</em>",
    sub: "Le site web de PLACO PRO 237, refait en Next.js",
    chips: ["Multi-pages", "Animations", "Devis en ligne", "Mobile"],
  }), { waitUntil: "networkidle" }).catch(() => {});
  await t.wait(5200);

  await page.addInitScript(overlayScript);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await t.moveTo(1500, 640, 10);

  // --- Accueil
  await t.cap("Accueil", "Chaque page s'ouvre avec un rideau terre cuite, puis le titre apparaît mot par mot.");
  await t.wait(3500);
  await t.cap("Accueil", "Le faux plafond s'illumine : spots, faisceaux et gorge LED s'allument en séquence.");
  await t.wait(3000);
  const heroCard = page.locator('main svg[viewBox="0 0 400 500"]');
  await t.cap("Effet 3D", "Les cartes réagissent à la souris : inclinaison 3D et halo de lumière.");
  await t.hover(heroCard);
  await t.moveTo(t.mouse.x - 160, t.mouse.y - 180, 40);
  await t.moveTo(t.mouse.x + 260, t.mouse.y + 300, 50);
  await t.moveTo(t.mouse.x - 120, t.mouse.y - 60, 40);
  await t.wait(800);
  await t.cap("Accueil", "Bouton magnétique : il suit le curseur pour inviter au clic.");
  const heroCta = page.locator("main a", { hasText: "Demander un devis gratuit" }).first();
  await t.hover(heroCta, 40);
  await t.moveTo(t.mouse.x + 25, t.mouse.y + 10, 15);
  await t.moveTo(t.mouse.x - 40, t.mouse.y - 12, 15);
  await t.wait(1200);

  await t.cap("Services", "Les 6 services en grille « bento » — chaque carte ouvre sa propre page.");
  await t.moveTo(960, 700, 20);
  await t.scrollTo(page.locator("h2", { hasText: "Un seul interlocuteur" }), 140);
  await t.wait(1200);
  await t.hover(page.locator('main a[href="/services/faux-plafonds"]').first());
  await t.wait(900);
  await t.hover(page.locator('main a[href="/services/staff-corniches"]').first(), 35);
  await t.wait(900);
  await t.hover(page.locator('main a[href="/services/decoration-interieure"]').first(), 35);
  await t.wait(1000);

  await t.cap("Méthode", "La méthode en 4 étapes, reliées par un fil qui se dessine au défilement.");
  await t.scrollTo(page.locator("h2", { hasText: "Comment se déroule votre projet" }), 160);
  await t.wait(2600);

  await t.cap("Réalisations", "Les projets à la une, avec zoom et aperçu au survol.");
  await t.scrollTo(page.locator("h2", { hasText: "Quelques projets" }), 140);
  await t.hover(page.locator('main a[href^="/realisations/"]').nth(1));
  await t.wait(1600);

  await t.cap("Zones", "Zones d'intervention : Douala et Yaoundé.");
  await t.scrollTo(page.locator("h2", { hasText: "Présents à Douala" }), 160);
  await t.wait(2400);

  await t.cap("FAQ", "FAQ interactive : les réponses s'ouvrent en douceur.");
  await t.scrollTo(page.locator("h2", { hasText: "Vous vous demandez" }), 160);
  await t.click(page.getByRole("button", { name: "Combien de temps durent les travaux ?" }));
  await t.wait(1500);
  await t.click(page.getByRole("button", { name: "Fournissez-vous les matériaux ?" }));
  await t.wait(1500);

  await t.cap("Pied de page", "Appel à l'action, puis pied de page complet : services, navigation, contact.");
  await t.scroll(1600);
  await t.wait(2500);

  // --- Services
  await t.cap("Navigation", "Le menu mène à de vraies pages : direction « Services ».");
  await t.click(page.locator('nav[aria-label="Navigation principale"] a', { hasText: "Services" }));
  await page.waitForURL("**/services");
  await t.wait(2600);
  await t.cap("Services", "La liste détaillée des six savoir-faire.");
  await t.scroll(700);
  await t.hover(page.locator('main a[href="/services/eclairage-integre"]').first());
  await t.wait(1400);
  await t.click(page.locator('main a[href="/services/faux-plafonds"]').first());
  await page.waitForURL("**/services/faux-plafonds");
  await t.cap("Page service", "Chaque service a sa page : prestations, avantages, méthode et projets liés.");
  await t.wait(3000);
  await t.scroll(900);
  await t.wait(1500);
  await t.scroll(1100);
  await t.wait(1500);

  // --- Réalisations
  await t.cap("Réalisations", "Galerie de projets avec filtres animés.");
  await t.click(page.locator('nav[aria-label="Navigation principale"] a', { hasText: "Réalisations" }));
  await page.waitForURL("**/realisations");
  await t.wait(2400);
  await t.scroll(450);
  const filters = page.getByRole("group", { name: "Filtrer par type de travaux" });
  await t.click(filters.getByRole("button", { name: /Faux plafonds/ }));
  await t.wait(1500);
  await t.click(filters.getByRole("button", { name: /Cloisons/ }));
  await t.wait(1500);
  await t.click(filters.getByRole("button", { name: /Décoration/ }));
  await t.wait(1500);
  await t.click(filters.getByRole("button", { name: /Tout/ }));
  await t.wait(1400);
  await t.cap("Fiche projet", "Un clic ouvre la fiche du projet : ville, type de lieu, travaux réalisés.");
  await t.click(page.locator('main a[href="/realisations/chambre-deux-niveaux"]'));
  await page.waitForURL("**/realisations/chambre-deux-niveaux");
  await t.wait(2800);
  await t.scroll(350);
  await t.wait(800);

  // --- Devis
  await t.cap("Devis", "« Je veux un projet similaire » ouvre le formulaire, service déjà sélectionné.");
  await t.click(page.locator("main a", { hasText: "Je veux un projet similaire" }));
  await page.waitForURL("**/contact**");
  await t.wait(2600);
  await t.scrollTo(page.locator("form"), 130);
  await t.wait(800);
  await t.cap("Validation", "Validation en direct : chaque erreur s'affiche sous le bon champ.");
  await t.click(page.getByRole("button", { name: "Envoyer ma demande" }));
  await t.wait(2200);
  await t.cap("Saisie", "Le client remplit sa demande…");
  await t.click(page.locator("#name"));
  await page.locator("#name").pressSequentially("Aïcha Mbarga", { delay: 55 });
  await t.click(page.locator("#phone"));
  await page.locator("#phone").pressSequentially("+237 690 12 34 56", { delay: 45 });
  await t.hover(page.locator("#city"));
  await page.locator("#city").selectOption("Yaoundé");
  await t.wait(500);
  await t.click(page.locator("#message"));
  await page.locator("#message").pressSequentially("Chambre de 16 m², plafond à deux niveaux avec LED blanc chaud.", { delay: 28 });
  await t.wait(600);
  await t.cap("Envoi", "La demande part au serveur (route API /api/devis), qui la vérifie à son tour…");
  await t.click(page.getByRole("button", { name: "Envoyer ma demande" }));
  await t.wait(1200);
  await t.scrollTo(page.locator("h3", { hasText: "Merci" }), 300);
  await t.cap("Confirmation", "…puis confirmation, avec un raccourci WhatsApp pré-rempli.");
  await t.hover(page.locator("a", { hasText: "Continuer sur WhatsApp" }));
  await t.wait(3200);
  await t.cap("", "");
  await t.wait(600);

  await ctx.close();
  fs.renameSync(await page.video().path(), path.join(RAW, "desktop.webm"));
}

/* ======================== 2. Mobile ============================== */
console.log("▶ Enregistrement version mobile…");
{
  const ctx = await browser.newContext({
    viewport: { width: 430, height: 932 },
    recordVideo: { dir: RAW, size: { width: 430, height: 932 } },
  });
  const page = await ctx.newPage();
  const t = tools(page);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await t.moveTo(215, 600, 2);
  await t.wait(4500);
  await t.scroll(900, 30);
  await t.wait(1200);
  await t.scroll(1300, 30);
  await t.wait(1000);
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await t.wait(2200);
  await page.locator('nav[aria-label="Navigation mobile"] a', { hasText: "Réalisations" }).click();
  await page.waitForURL("**/realisations");
  await t.wait(2600);
  await t.scroll(500, 30);
  await page.getByRole("button", { name: /Faux plafonds/ }).click();
  await t.wait(1800);
  await t.scroll(700, 30);
  await t.wait(1500);
  await ctx.close();
  fs.renameSync(await page.video().path(), path.join(RAW, "mobile.webm"));
}

/* ==================== 3. Fond mobile + outro ===================== */
console.log("▶ Cartons…");
{
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
    *{margin:0;box-sizing:border-box}
    body{width:1920px;height:1080px;background:#1E1E1C;color:#F5F1EA;font-family:Inter,sans-serif;position:relative;overflow:hidden}
    body:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 159px,rgba(245,241,234,.05) 159px 160px)}
    .halo{position:absolute;top:-250px;left:900px;width:900px;height:900px;border-radius:50%;background:rgba(201,164,106,.25);filter:blur(140px)}
    .txt{position:absolute;left:150px;top:310px;width:820px}
    .k{color:#C9A46A;font:600 22px Inter;letter-spacing:.2em;text-transform:uppercase}
    h2{margin-top:26px;font:600 92px/1.04 Fraunces,Georgia,serif;letter-spacing:-.02em}
    h2 em{color:#C9A46A}
    p{margin-top:34px;font-size:30px;line-height:1.45;color:rgba(245,241,234,.72)}
    .phone{position:absolute;left:1236px;top:52px;width:466px;height:976px;border-radius:56px;background:#0E0E0D;box-shadow:0 0 0 2px rgba(255,255,255,.08),0 40px 120px -30px rgba(0,0,0,.8)}
  </style></head><body><div class="halo"></div>
  <div class="txt"><div class="k">Version mobile</div><h2>Pensé d'abord <em>pour le téléphone</em>.</h2>
  <p>Menu plein écran animé, boutons faciles à toucher, galerie et formulaire adaptés à toutes les tailles d'écran.</p></div>
  <div class="phone"></div></body></html>`, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(RAW, "mobile-bg.png") });
  await ctx.close();
}
{
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: RAW, size: { width: 1920, height: 1080 } },
  });
  const page = await ctx.newPage();
  await page.setContent(card({
    kicker: "Douala · Yaoundé",
    title: "Devis <em>gratuit</em> sur visite",
    sub: "Faux plafonds · Cloisons · Staff · Éclairage · Décoration · Peinture",
    chips: ["placopro237.com", "WhatsApp", "Lun – Sam · 8h – 18h"],
  }), { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(6000);
  await ctx.close();
  fs.renameSync(await page.video().path(), path.join(RAW, "outro.webm"));
}
await browser.close();

/* ========================= 4. Montage ============================ */
console.log("▶ Montage ffmpeg…");
const enc = ["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30"];
// Bureau : on coupe le flash blanc du tout début
ff(["-ss", "0.4", "-i", path.join(RAW, "desktop.webm"), "-vf", "scale=1920:1080,fps=30", ...enc, "-an", path.join(RAW, "1-desktop.mp4")]);
// Mobile : téléphone incrusté à droite du carton
ff([
  "-loop", "1", "-i", path.join(RAW, "mobile-bg.png"),
  "-ss", "0.4", "-i", path.join(RAW, "mobile.webm"),
  "-filter_complex", "[1:v]scale=436:946,fps=30[m];[0:v][m]overlay=1251:67:shortest=1,format=yuv420p,fade=t=in:st=0:d=0.5",
  ...enc, "-an", path.join(RAW, "2-mobile.mp4"),
]);
ff(["-ss", "0.3", "-i", path.join(RAW, "outro.webm"), "-vf", "scale=1920:1080,fps=30,fade=t=in:st=0:d=0.4", ...enc, "-an", path.join(RAW, "3-outro.mp4")]);
ff([
  "-i", path.join(RAW, "1-desktop.mp4"), "-i", path.join(RAW, "2-mobile.mp4"), "-i", path.join(RAW, "3-outro.mp4"),
  "-filter_complex", "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]", "-map", "[v]", ...enc, "-movflags", "+faststart",
  path.join(OUT, "PLACO-PRO-237-presentation.mp4"),
]);
console.log("✔ Vidéo :", path.join(OUT, "PLACO-PRO-237-presentation.mp4"));
