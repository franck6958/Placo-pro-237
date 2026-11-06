"""
Construit la version WordPress du site PLACO PRO 237, identique au site Next.js.

    python scripts/build_wordpress.py [version]

Étapes :
  1. copie du projet dans .wp-build/ (sans la route /api/devis, robots.ts et sitemap.ts,
     incompatibles avec l'export statique ; ils sont remplacés côté WordPress) ;
  2. `next build` en mode export statique (WP_EXPORT=1) ;
  3. ajout de robots.txt / sitemap.xml, recompression des photos ;
  4. assemblage du thème (wordpress-theme/ + site/) et des extensions « Photos » ;
  5. un zip par élément, chacun sous la limite d'envoi (2 Mo par défaut).

Résultat : ../wordpress/  (zips à téléverser + dossiers pour l'envoi FTP).
Prérequis : Node (dépendances installées) et Python avec Pillow.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

from PIL import Image

# Console Windows : affichage des accents et symboles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VERSION = sys.argv[1] if len(sys.argv) > 1 else "2.2.0"
ZIP_LIMIT = 1_950_000  # octets : marge sous 2 Mo
THEME_SLUG = "placo-pro-237"
PHOTOS_SLUG = "placo-pro-237-photos"
BINARY_EXT = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".mp4", ".woff2", ".woff", ".ico"}

ROOT = Path(__file__).resolve().parent.parent  # projet Next.js
BUILD = ROOT / ".wp-build"
TEMPLATE = ROOT / "wordpress-theme"
OUT = ROOT.parent / "wordpress"


def log(msg: str) -> None:
    print(f"› {msg}", flush=True)


def site_url() -> str:
    m = re.search(r'url:\s*"([^"]+)"', (ROOT / "src/lib/site.ts").read_text(encoding="utf-8"))
    return (m.group(1) if m else "https://placopro237.com").rstrip("/")


# ---------------------------------------------------------------- 1-2. export Next.js
def export_site() -> Path:
    if BUILD.exists():
        shutil.rmtree(BUILD)
    BUILD.mkdir()
    for name in ("src", "public"):
        shutil.copytree(ROOT / name, BUILD / name)
    for name in ("package.json", "tsconfig.json", "next.config.ts", "next-env.d.ts"):
        shutil.copy2(ROOT / name, BUILD / name)
    shutil.rmtree(BUILD / "src/app/api", ignore_errors=True)
    for name in ("robots.ts", "sitemap.ts"):
        (BUILD / "src/app" / name).unlink(missing_ok=True)

    log("next build (export statique)…")
    env = {**os.environ, "WP_EXPORT": "1", "NEXT_TELEMETRY_DISABLED": "1"}
    subprocess.run("npx next build", cwd=BUILD, env=env, shell=True, check=True)
    site = BUILD / ".next-wp"
    if not (site / "index.html").exists():
        site = BUILD / "out"
    if not (site / "index.html").exists():
        sys.exit("Export introuvable (.next-wp/ ou out/).")
    return site


# ---------------------------------------------------------------- 3. compléments
def flatten_segments(site: Path) -> None:
    """
    L'export écrit les données de navigation par segment dans des sous-dossiers
    (faq/__next.faq/__PAGE__.txt) alors que le navigateur les demande avec des points
    (faq/__next.faq.__PAGE__.txt). On les renomme au format attendu.
    """
    moved = 0
    for f in sorted(site.rglob("*.txt")):
        parts = f.relative_to(site).parts
        k = next((i for i, p in enumerate(parts[:-1]) if p.startswith("__next.")), None)
        if k is None or parts[0] == "_next":
            continue
        dest = site.joinpath(*parts[:k], ".".join(parts[k:]))
        dest.parent.mkdir(parents=True, exist_ok=True)
        f.replace(dest)
        moved += 1
    # dossiers __next.* devenus vides
    for d in sorted((d for d in site.rglob("__next.*") if d.is_dir()), key=lambda d: len(d.parts), reverse=True):
        shutil.rmtree(d, ignore_errors=True)
    log(f"données de navigation renommées : {moved}")


def add_seo_files(site: Path) -> None:
    url = site_url()
    pages = sorted(
        p.relative_to(site).with_suffix("").as_posix()
        for p in site.rglob("*.html")
        if p.name not in ("404.html", "_not-found.html") and "_not-found" not in p.parts
    )
    urls = ["" if p == "index" else "/" + p for p in pages]
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        prio = "1.0" if u == "" else "0.8" if u.count("/") == 1 else "0.6"
        xml.append(f"  <url><loc>{url}{u}</loc><priority>{prio}</priority></url>")
    xml.append("</urlset>")
    (site / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")
    (site / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nSitemap: {url}/sitemap.xml\n",
        encoding="utf-8",
    )
    # Fichiers de démonstration de create-next-app, inutiles en ligne
    for junk in ("file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg"):
        (site / junk).unlink(missing_ok=True)


def compress_photos(site: Path) -> None:
    before = after = 0
    for f in site.rglob("*"):
        if f.suffix.lower() not in (".jpg", ".jpeg"):
            continue
        size = f.stat().st_size
        before += size
        with Image.open(f) as im:
            im = im.convert("RGB")
            im.thumbnail((1600, 1600), Image.LANCZOS)
            tmp = f.with_suffix(".tmp.jpg")
            im.save(tmp, "JPEG", quality=80, optimize=True, progressive=True)
        if tmp.stat().st_size < size:
            tmp.replace(f)
        else:
            tmp.unlink()
        after += f.stat().st_size
    log(f"photos : {before / 1e6:.1f} Mo → {after / 1e6:.1f} Mo")


def form_options() -> dict:
    data = (ROOT / "src/lib/data.ts").read_text(encoding="utf-8")
    services_block = data.split("export const SERVICES", 1)[1].split("\n];", 1)[0]
    services = re.findall(r'^\s{4}title:\s*"([^"]+)"', services_block, re.M) + ["Autre"]
    cities_m = re.search(r"export const CITY_OPTIONS\s*=\s*\[([^\]]*)\]", data)
    cities = re.findall(r'"([^"]+)"', cities_m.group(1)) if cities_m else ["Douala", "Yaoundé", "Autre"]
    email_m = re.search(r'email:\s*"([^"]+)"', (ROOT / "src/lib/site.ts").read_text(encoding="utf-8"))
    return {"cities": cities, "services": services, "email": email_m.group(1) if email_m else ""}


# ---------------------------------------------------------------- 4-5. assemblage
def zip_dir(folder: Path, dest: Path) -> int:
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for f in sorted(folder.rglob("*")):
            if f.is_file():
                z.write(f, (Path(folder.name) / f.relative_to(folder)).as_posix())
    return dest.stat().st_size


def fill(text: str, **values: str) -> str:
    for k, v in values.items():
        text = text.replace(f"__{k}__", v)
    return text


def assemble(site: Path) -> None:
    ftp = OUT / "dossiers-ftp"
    archive = OUT / "archive"
    OUT.mkdir(exist_ok=True)
    # Ancienne version du thème (avant le passage au site statique) : conservée à part
    old_theme = OUT / THEME_SLUG
    if old_theme.is_dir() and (old_theme / "front-page.php").exists():
        archive.mkdir(exist_ok=True)
        shutil.move(str(old_theme), archive / f"{THEME_SLUG}-ancien-theme")
        old_zip = OUT / f"{THEME_SLUG}.zip"
        if old_zip.exists():
            shutil.move(str(old_zip), archive / f"{THEME_SLUG}-ancien-theme.zip")
    if ftp.exists():
        shutil.rmtree(ftp)
    for z in OUT.glob(f"{THEME_SLUG}*.zip"):
        z.unlink()

    # Répartition : fichiers texte → thème ; binaires → thème tant que ça tient, sinon extensions photos
    files = [f for f in site.rglob("*") if f.is_file()]
    text_files = [f for f in files if f.suffix.lower() not in BINARY_EXT]
    binaries = sorted((f for f in files if f.suffix.lower() in BINARY_EXT), key=lambda f: f.stat().st_size)

    theme = ftp / THEME_SLUG
    theme_site = theme / "site"

    def copy_into(base: Path, f: Path) -> None:
        dest = base / f.relative_to(site)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, dest)

    def write_theme_shell() -> None:
        theme.mkdir(parents=True, exist_ok=True)
        shell = sorted(f.name for f in TEMPLATE.glob("*.php") if f.name != "photos-plugin.php") + ["style.css"]
        for name in shell:
            (theme / name).write_text(fill((TEMPLATE / name).read_text(encoding="utf-8"), PLACO_VERSION=VERSION), encoding="utf-8")
        if (TEMPLATE / "screenshot.jpg").exists():
            shutil.copy2(TEMPLATE / "screenshot.jpg", theme / "screenshot.jpg")
        (theme / "form-options.json").write_text(json.dumps(form_options(), ensure_ascii=False, indent=2), encoding="utf-8")

    write_theme_shell()
    for f in text_files:
        copy_into(theme_site, f)
    probe = OUT / "_probe.zip"
    if zip_dir(theme, probe) > ZIP_LIMIT:
        probe.unlink()
        sys.exit("Le thème sans photos dépasse déjà la limite : à découper davantage.")

    # Petits binaires (polices, icônes) dans le thème tant que le zip reste sous la limite
    leftovers: list[Path] = []
    budget = ZIP_LIMIT - probe.stat().st_size - 20_000
    for f in binaries:
        size = f.stat().st_size
        if size <= budget and size < 400_000:
            copy_into(theme_site, f)
            budget -= size
        else:
            leftovers.append(f)
    probe.unlink()

    # Extensions photos : remplissage glouton, du plus gros au plus petit
    buckets: list[list[Path]] = []
    sizes: list[int] = []
    cap = ZIP_LIMIT - 30_000
    for f in sorted(leftovers, key=lambda f: f.stat().st_size, reverse=True):
        size = f.stat().st_size
        for i, s in enumerate(sizes):
            if s + size <= cap:
                buckets[i].append(f)
                sizes[i] += size
                break
        else:
            buckets.append([f])
            sizes.append(size)

    total = len(buckets)
    # Liste des photos attendues : le thème affiche « Téléverser les photos » tant qu'il en manque
    manifest = {
        "parts": [f"{PHOTOS_SLUG}-{i}.zip" for i in range(1, total + 1)],
        "files": [
            {"path": f.relative_to(site).as_posix(), "size": f.stat().st_size, "part": f"{PHOTOS_SLUG}-{i}.zip"}
            for i, bucket in enumerate(buckets, 1)
            for f in sorted(bucket)
        ],
    }
    (theme / "photos-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
    plugin_tpl = (TEMPLATE / "photos-plugin.php").read_text(encoding="utf-8")
    for i, bucket in enumerate(buckets, 1):
        slug = f"{PHOTOS_SLUG}-{i}"
        base = ftp / slug
        base.mkdir(parents=True)
        (base / f"{slug}.php").write_text(fill(plugin_tpl, PART=str(i), TOTAL=str(total), PLACO_VERSION=VERSION), encoding="utf-8")
        for f in bucket:
            copy_into(base / "site", f)

    log("zips :")
    for folder in sorted(ftp.iterdir()):
        size = zip_dir(folder, OUT / f"{folder.name}.zip")
        flag = "OK" if size <= ZIP_LIMIT else "TROP GROS"
        log(f"  {folder.name}.zip  {size / 1e6:.2f} Mo  {flag}")
        if size > ZIP_LIMIT:
            sys.exit("Un zip dépasse la limite.")


def main() -> None:
    site = export_site()
    flatten_segments(site)
    add_seo_files(site)
    compress_photos(site)
    assemble(site)
    shutil.rmtree(BUILD, ignore_errors=True)
    log(f"Terminé : {OUT}")


if __name__ == "__main__":
    main()
