"""
Construit l'application Android PLACO PRO 237 (APK signé) sans Gradle,
avec les outils du SDK Android installés par Android Studio :

  aapt2 (ressources) → javac → d8 (dex) → zipalign → apksigner

Résultat : public/placo-pro-237.apk (téléchargeable sur le site).

Usage : python scripts/build_apk.py
La clé de signature est créée au premier lancement dans android-app/signing/.
À CONSERVER : sans elle, impossible de publier une mise à jour de l'application.
"""
from __future__ import annotations

import os
import secrets
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "android-app"
BUILD = APP / "build"
SIGNING = APP / "signing"
OUTPUT = ROOT / "public" / "placo-pro-237.apk"

MIN_SDK, TARGET_SDK = 21, 34

SDK = Path(os.environ.get("ANDROID_HOME") or os.environ.get("ANDROID_SDK_ROOT") or Path(os.environ["LOCALAPPDATA"]) / "Android" / "Sdk")
JDK = Path(os.environ.get("JAVA_HOME") or r"C:\Program Files\Android\Android Studio\jbr")


def log(msg: str) -> None:
    print(f"› {msg}", flush=True)


def latest(folder: Path) -> Path:
    dirs = sorted((d for d in folder.iterdir() if d.is_dir()), key=lambda d: [int(x) if x.isdigit() else 0 for x in d.name.replace("android-", "").split(".")])
    if not dirs:
        sys.exit(f"Rien dans {folder}")
    return dirs[-1]


BT = latest(SDK / "build-tools")
ANDROID_JAR = latest(SDK / "platforms") / "android.jar"
ENV = {**os.environ, "JAVA_HOME": str(JDK), "PATH": str(JDK / "bin") + os.pathsep + os.environ["PATH"]}


def tool(name: str) -> str:
    for ext in (".exe", ".bat", ""):
        p = BT / f"{name}{ext}"
        if p.exists():
            return str(p)
    sys.exit(f"Outil introuvable : {name} dans {BT}")


def run(*args: str | Path) -> None:
    cmd = [str(a) for a in args]
    r = subprocess.run(cmd, env=ENV, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout, r.stderr, sep="\n")
        sys.exit(f"Échec : {Path(cmd[0]).name}")


# ------------------------------------------------------------ icônes (Android < 8)
NAVY, GRAY, ORANGE = "#14284B", "#4B4844", "#D9620F"
RECTS = [(0, 0, 44, 200, NAVY), (53, 0, 132, 43, NAVY), (142, 52, 43, 44, NAVY), (53, 104, 132, 44, GRAY), (142, 157, 43, 43, ORANGE)]
DENSITIES = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}


def legacy_icons(res: Path) -> None:
    for density, px in DENSITIES.items():
        big = px * 4
        for name, round_ in (("ic_launcher", False), ("ic_launcher_round", True)):
            im = Image.new("RGBA", (big, big), (0, 0, 0, 0))
            d = ImageDraw.Draw(im)
            if round_:
                d.ellipse((0, 0, big - 1, big - 1), fill="white")
            else:
                d.rounded_rectangle((0, 0, big - 1, big - 1), radius=big // 6, fill="white")
            scale = big * 0.56 / 200
            ox, oy = (big - 185 * scale) / 2, (big - 200 * scale) / 2
            for x, y, w, h, c in RECTS:
                d.rectangle((ox + x * scale, oy + y * scale, ox + (x + w) * scale, oy + (y + h) * scale), fill=c)
            out = res / f"mipmap-{density}" / f"{name}.png"
            out.parent.mkdir(parents=True, exist_ok=True)
            im.resize((px, px), Image.LANCZOS).save(out)


# ------------------------------------------------------------ signature
def keystore() -> tuple[Path, str]:
    SIGNING.mkdir(exist_ok=True)
    ks = SIGNING / "placo-pro-237.jks"
    props = SIGNING / "keystore.properties"
    if ks.exists() and props.exists():
        password = dict(l.split("=", 1) for l in props.read_text(encoding="utf-8").splitlines() if "=" in l)["password"]
        return ks, password
    password = secrets.token_urlsafe(18)
    log("création de la clé de signature (une seule fois)")
    run(JDK / "bin" / "keytool.exe", "-genkeypair", "-keystore", ks, "-alias", "placopro237", "-keyalg", "RSA", "-keysize", "2048",
        "-validity", "10000", "-storepass", password, "-keypass", password,
        "-dname", "CN=PLACO PRO 237, O=PLACO PRO 237, L=Douala, C=CM")
    props.write_text(
        "# Clé de signature de l'application Android PLACO PRO 237.\n"
        "# À SAUVEGARDER avec placo-pro-237.jks : sans ces deux fichiers, aucune mise à jour de l'application n'est possible.\n"
        f"alias=placopro237\npassword={password}\n",
        encoding="utf-8",
    )
    return ks, password


def main() -> None:
    log(f"SDK : {BT.name} / {ANDROID_JAR.parent.name}")
    if BUILD.exists():
        shutil.rmtree(BUILD)
    gen_res, gen_java, classes, dex = BUILD / "res-gen", BUILD / "gen", BUILD / "classes", BUILD / "dex"
    for d in (gen_res, gen_java, classes, dex):
        d.mkdir(parents=True)

    log("icônes")
    legacy_icons(gen_res)

    log("ressources (aapt2)")
    aapt2 = tool("aapt2")
    run(aapt2, "compile", "--dir", APP / "res", "-o", BUILD / "res.zip")
    run(aapt2, "compile", "--dir", gen_res, "-o", BUILD / "res-gen.zip")
    base = BUILD / "base.apk"
    run(aapt2, "link", "-I", ANDROID_JAR, "--manifest", APP / "AndroidManifest.xml", "-A", APP / "assets",
        "--java", gen_java, "--min-sdk-version", str(MIN_SDK), "--target-sdk-version", str(TARGET_SDK),
        "-o", base, BUILD / "res.zip", BUILD / "res-gen.zip")

    log("compilation Java")
    sources = [str(p) for p in (APP / "src").rglob("*.java")] + [str(p) for p in gen_java.rglob("*.java")]
    run(JDK / "bin" / "javac.exe", "-encoding", "UTF-8", "-source", "8", "-target", "8", "-Xlint:-options",
        "-bootclasspath", ANDROID_JAR, "-d", classes, *sources)

    log("dex (d8)")
    run(tool("d8"), "--release", "--min-api", str(MIN_SDK), "--lib", ANDROID_JAR, "--output", dex,
        *[str(p) for p in classes.rglob("*.class")])

    unaligned = BUILD / "unaligned.apk"
    shutil.copy2(base, unaligned)
    with zipfile.ZipFile(unaligned, "a", zipfile.ZIP_DEFLATED) as z:
        z.write(dex / "classes.dex", "classes.dex")

    aligned = BUILD / "aligned.apk"
    run(tool("zipalign"), "-p", "-f", "4", unaligned, aligned)

    log("signature")
    ks, password = keystore()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    run(tool("apksigner"), "sign", "--ks", ks, "--ks-key-alias", "placopro237", "--ks-pass", f"pass:{password}",
        "--key-pass", f"pass:{password}", "--min-sdk-version", str(MIN_SDK), "--out", OUTPUT, aligned)
    run(tool("apksigner"), "verify", OUTPUT)
    idsig = OUTPUT.with_suffix(".apk.idsig")
    if idsig.exists():
        idsig.unlink()

    shutil.rmtree(BUILD)
    log(f"OK : {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size / 1024:.0f} Ko)")


if __name__ == "__main__":
    main()
