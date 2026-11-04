import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "light" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark shadow-[0_10px_30px_-10px_rgb(181_86_46/0.6)]",
  ghost: "border border-ink/20 text-ink hover:bg-ink hover:text-plaster hover:border-ink",
  light: "bg-plaster text-ink hover:bg-white",
  dark: "bg-ink text-plaster hover:bg-black",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-all duration-300 ease-out-expo active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  className,
  children,
  ...rest
}: { href: string; variant?: Variant; arrow?: boolean; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, className)} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {content}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  className,
  invert = false,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
  invert?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span className={cn("eyebrow", invert && "text-gold")}>{eyebrow}</span>
      <h2 className={cn("mt-4 text-[clamp(2rem,4.2vw,3.25rem)]", invert && "text-plaster")}>{title}</h2>
      {text && <p className={cn("mt-5 text-lg", invert ? "text-plaster/65" : "text-ink-soft")}>{text}</p>}
    </div>
  );
}
