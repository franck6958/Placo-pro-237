"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "./logo";
import { NAV, SITE } from "@/lib/site";
import { buttonClass } from "./ui";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu à chaque navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      <div className="container-x">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 ease-out-expo",
            scrolled || open
              ? "border border-line bg-plaster/80 shadow-[0_8px_30px_-12px_rgb(30_30_28/0.18)] backdrop-blur-xl"
              : "border border-transparent",
          )}
        >
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-200",
                  isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden size-12 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink md:grid"
              aria-label={`Appeler ${SITE.phoneDisplay}`}
            >
              <Phone className="size-[18px]" aria-hidden />
            </a>
            <Link href="/contact#devis" className={buttonClass("primary", "hidden min-h-12 px-5 text-sm sm:inline-flex")}>
              Devis gratuit
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-12 cursor-pointer place-items-center rounded-full bg-ink text-plaster lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-300",
                    open && "-translate-y-[5px] -rotate-45",
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="container-x mt-2 lg:hidden"
          >
            <nav
              aria-label="Navigation mobile"
              className="rounded-[28px] border border-line bg-plaster/95 p-3 shadow-2xl backdrop-blur-xl"
            >
              {[{ href: "/", label: "Accueil" }, ...NAV].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-2xl",
                      pathname === item.href ? "bg-ink text-plaster" : "hover:bg-ink/5",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden className="size-5 opacity-50" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={SITE.phoneHref} className={buttonClass("ghost", "w-full")}>
                  <Phone className="size-4" aria-hidden /> Appeler
                </a>
                <Link href="/contact#devis" className={buttonClass("primary", "w-full")}>
                  Devis gratuit
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
