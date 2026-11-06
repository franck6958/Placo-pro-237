import { WhatsappLogo, type IconProps } from "./icons";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Logo WhatsApp (Phosphor, poids "fill"). Conservé sous ce nom pour compatibilité. */
export function WhatsAppIcon({ className, ...props }: IconProps) {
  return <WhatsappLogo weight="fill" aria-hidden className={cn("size-5", className)} {...props} />;
}

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp (nouvelle fenêtre)"
      className="group fixed right-4 bottom-4 z-40 flex h-14 items-center rounded-full bg-[#25D366] pr-4 pl-3.5 text-ink shadow-[0_14px_34px_-10px_rgb(20_40_75/0.3)] ring-4 ring-plaster/70 transition-all duration-300 hover:gap-2 hover:pr-5 focus-visible:gap-2 focus-visible:pr-5 sm:right-6 sm:bottom-6"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/35 [animation-duration:2.6s] motion-reduce:hidden"
      />
      <WhatsAppIcon className="size-7" />
      <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-focus-visible:max-w-40">
        Discutons
      </span>
    </a>
  );
}
