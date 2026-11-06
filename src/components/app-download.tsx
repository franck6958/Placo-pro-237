"use client";

import { useEffect, useState } from "react";
import { AndroidLogo, CheckCircle, DownloadSimple } from "./icons";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./ui";
import { APP } from "@/lib/site";
import { cn } from "@/lib/cn";

/** true quand le site est affiché dans l'application Android (user-agent ajouté par l'APK). */
function useInApp() {
  const [inApp, setInApp] = useState(false);
  useEffect(() => {
    setInApp(navigator.userAgent.includes("PlacoPro237App"));
  }, []);
  return inApp;
}

/** Bouton de téléchargement de l'APK. Remplacé par un message quand on est déjà dans l'application. */
export function ApkButton({
  variant = "primary",
  size = "md",
  className,
  label = "Télécharger l'application",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
}) {
  const inApp = useInApp();
  if (inApp) {
    return (
      <p className={cn("inline-flex min-h-11 items-center gap-2 font-semibold", className)}>
        <CheckCircle weight="fill" aria-hidden className="size-5 text-[#3DDC84]" /> Application installée
      </p>
    );
  }
  return (
    <a href={APP.apk} download="placo-pro-237.apk" type="application/vnd.android.package-archive" className={buttonClass(variant, className, size)}>
      <AndroidLogo weight="fill" aria-hidden className="size-5" />
      {label}
      <DownloadSimple weight="bold" aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
    </a>
  );
}
