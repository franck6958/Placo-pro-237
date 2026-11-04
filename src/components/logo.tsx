import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ invert = false, className }: { invert?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="PLACO PRO 237 — accueil"
      className={cn("flex items-center gap-2.5 font-display text-[1.2rem] font-bold tracking-wide", className)}
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-[10px] font-sans text-[0.78rem] font-bold",
          invert ? "bg-accent text-white" : "bg-ink text-plaster",
        )}
        aria-hidden
      >
        PP
      </span>
      <span className={invert ? "text-plaster" : "text-ink"}>
        PLACO PRO <span className="text-accent">237</span>
      </span>
    </Link>
  );
}
