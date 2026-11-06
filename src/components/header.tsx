"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock, PhoneCall, WhatsappLogo } from "@phosphor-icons/react";
import { Logo } from "./logo";
import { NAV, SITE, waLink } from "@/lib/site";
import { buttonClass } from "./ui";
import { cn } from "@/lib/cn";

const MOBILE_NAV = [{ href: "/", label: "Accueil" }, ...NAV];

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu à chaque navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Piège de focus simple : menu + bouton de fermeture
      if (e.key === "Tab" && panelRef.current) {
        const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      {/* Bande floue pleine largeur : le contenu qui défile sous la navbar est flouté, avec un fondu vers le bas */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+2rem)] bg-plaster/40 backdrop-blur-lg transition-opacity duration-500 ease-out-expo [mask-image:linear-gradient(to_bottom,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]",
          solid ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="container-x">
        <div
          className={cn(
            "flex h-[4.25rem] items-center justify-between gap-3 rounded-full border pr-2 pl-4 transition-all duration-500 ease-out-expo md:pl-5",
            solid
              ? "border-line bg-plaster/85 shadow-[0_10px_34px_-14px_rgb(20_40_75/0.16)] backdrop-blur-xl"
              : "border-white/40 bg-plaster/75 backdrop-blur-xl", // toujours lisible, même sur un hero sombre
          )}
        >
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative isolate inline-flex min-h-11 items-center rounded-full px-4 text-[0.92rem] font-semibold transition-colors duration-200",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    >
                      <span className="led-line absolute inset-x-4 -bottom-px" />
                    </motion.span>
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={SITE.phoneHref}
              className="group hidden min-h-11 items-center gap-2.5 rounded-full px-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 xl:inline-flex"
            >
              <span className="grid size-8 place-items-center rounded-full bg-ink text-gold transition-transform duration-300 group-hover:scale-105">
                <PhoneCall weight="duotone" className="size-[18px]" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">Appelez-nous</span>
                {SITE.phoneDisplay}
              </span>
            </a>
            <a
              href={SITE.phoneHref}
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 xl:hidden"
              aria-label={`Appeler le ${SITE.phoneDisplay}`}
            >
              <PhoneCall weight="duotone" className="size-[22px]" aria-hidden />
            </a>
            <Link href="/contact#devis" className={buttonClass("primary", "max-sm:hidden", "sm")}>
              Devis gratuit
              <ArrowUpRight weight="bold" aria-hidden className="size-4" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-ink text-plaster transition-colors hover:bg-navy lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 rounded-full bg-gold transition-all duration-300",
                    open ? "w-5 -translate-y-[5px] -rotate-45 bg-current" : "w-3.5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="container-x mt-2 lg:hidden"
          >
            <div className="theme-dark bg-navy-glow relative max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-[28px] border border-white/10 p-3 text-plaster shadow-xl">
              <nav aria-label="Navigation mobile">
                <ul>
                  {MOBILE_NAV.map((item, i) => {
                    const active = isActive(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={reduce ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i + 0.05 }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex min-h-14 items-center gap-4 rounded-2xl px-4 transition-colors",
                            active ? "bg-white/[0.08]" : "hover:bg-white/[0.05]",
                          )}
                        >
                          <span className={cn("w-6 text-xs font-bold tabular-nums", active ? "text-gold" : "text-mist")}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={cn("flex-1 font-display text-2xl", active && "text-gold-light")}>{item.label}</span>
                          <ArrowUpRight
                            weight="bold"
                            aria-hidden
                            className="size-5 text-gold opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div aria-hidden className="led-line mx-4 my-3 opacity-60" />

              <div className="grid gap-2 sm:grid-cols-2">
                <Link href="/contact#devis" className={buttonClass("primary", "w-full")}>
                  Demander un devis gratuit
                </Link>
                <a href={SITE.phoneHref} className={buttonClass("outline", "w-full")}>
                  <PhoneCall weight="duotone" className="size-5 text-gold" aria-hidden /> {SITE.phoneDisplay}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("outline", "w-full sm:col-span-2")}
                >
                  <WhatsappLogo weight="fill" className="size-5 text-[#25D366]" aria-hidden /> Écrire sur WhatsApp
                </a>
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 pb-1 text-sm text-mist">
                <Clock weight="duotone" className="size-4 text-gold" aria-hidden /> {SITE.hours} · {SITE.cities.join(" · ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
