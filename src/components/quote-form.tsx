"use client";

import { Suspense, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowCounterClockwise,
  Check,
  CircleNotch,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  ShieldCheck,
  WarningCircle,
} from "@phosphor-icons/react";
import { CITY_OPTIONS, SERVICE_OPTIONS } from "@/lib/data";
import { quoteText, validateQuote, type QuoteErrors, type QuoteInput } from "@/lib/quote";
import { SITE, waLink } from "@/lib/site";
import { buttonClass } from "./ui";
import { WhatsAppIcon } from "./whatsapp-float";
import { cn } from "@/lib/cn";

const EMPTY: QuoteInput = { name: "", phone: "", city: "", service: "", message: "" };
const REQUIRED: (keyof QuoteInput)[] = ["service", "city", "name", "phone"];

type Status = "idle" | "sending" | "sent" | "error";

function QuoteFormFromParams() {
  const s = useSearchParams().get("service");
  const service = s && SERVICE_OPTIONS.includes(s) ? s : "";
  return <QuoteForm key={service} defaultService={service} />;
}

/** Formulaire + pré-sélection du service depuis l'URL (?service=Faux%20plafonds). */
export function QuoteFormSection() {
  return (
    <Suspense fallback={<QuoteForm defaultService="" />}>
      <QuoteFormFromParams />
    </Suspense>
  );
}

function QuoteForm({ defaultService }: { defaultService: string }) {
  const reduce = useReducedMotion();
  const [raw, setValues] = useState<QuoteInput>(EMPTY);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState<QuoteInput | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pré-sélection depuis une page service : /contact?service=Faux%20plafonds
  const values: QuoteInput = { ...raw, service: raw.service || defaultService };

  const set = <K extends keyof QuoteInput>(key: K, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateQuote(next));
  };
  const blur = (key: keyof QuoteInput) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateQuote(values));
  };
  const pick = (key: "service" | "city", value: string) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const next = { ...values, [key]: value };
    setValues(next);
    setErrors(validateQuote(next));
  };

  const check = () => {
    const e = validateQuote(values);
    setErrors(e);
    setTouched({ name: true, phone: true, city: true, service: true, message: true });
    const first = REQUIRED.concat("message").find((k) => e[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!check()) return;
    setStatus("sending");
    setServerError("");
    const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error ?? "Vérifiez les champs du formulaire.");
      }
      setSent(values);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  const sendWhatsApp = () => {
    if (!check()) return;
    window.open(waLink(quoteText(values)), "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setSent(null);
  };

  const err = (k: keyof QuoteInput) => (touched[k] ? errors[k] : undefined);

  // Progression : champs obligatoires valides
  const live = validateQuote(values);
  const done = REQUIRED.filter((k) => !live[k]).length;
  const stepDone = {
    1: !live.service,
    2: !live.city,
    3: !live.name && !live.phone,
  };

  const fade = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-white shadow-lift">
      <div aria-hidden className="led-line absolute inset-x-10 top-0" />
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" && sent ? (
          <motion.div
            key="ok"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={fade}
            className="px-6 py-14 text-center sm:px-10"
            role="status"
          >
            <div className="mx-auto grid size-18 place-items-center rounded-full bg-gold-gradient text-white shadow-glow">
              <Check weight="bold" className="size-8" aria-hidden />
            </div>
            <h3 className="mt-7 text-3xl md:text-4xl">Merci {sent.name.split(" ")[0]} !</h3>
            <p className="mx-auto mt-4 max-w-md text-ink-soft">
              Votre demande de devis « {sent.service} » à {sent.city} est bien enregistrée. Nous vous
              recontactons rapidement au {sent.phone}.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Pour aller plus vite, envoyez-nous aussi le récapitulatif sur WhatsApp.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={waLink(quoteText(sent))} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                <WhatsAppIcon /> Continuer sur WhatsApp
              </a>
              <button type="button" onClick={reset} className={buttonClass("ghost")}>
                <ArrowCounterClockwise weight="bold" className="size-4" aria-hidden /> Nouvelle demande
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            aria-labelledby="devis-title"
            aria-describedby="form-hint"
          >
            {/* En-tête + progression */}
            <div className="border-b border-line bg-plaster/60 px-6 pt-8 pb-6 sm:px-9">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">Devis gratuit · sans engagement</p>
                  <h2 id="devis-title" className="mt-2 text-2xl md:text-3xl">
                    Décrivez votre projet
                  </h2>
                </div>
                <p className="text-sm text-muted tabular-nums" aria-hidden>
                  {done}/{REQUIRED.length}
                </p>
              </div>
              <div
                role="progressbar"
                aria-label="Champs obligatoires complétés"
                aria-valuemin={0}
                aria-valuemax={REQUIRED.length}
                aria-valuenow={done}
                className="mt-5 h-1.5 overflow-hidden rounded-full bg-plaster-3"
              >
                <div
                  className="h-full rounded-full bg-gold-gradient transition-[width] duration-500 ease-out-expo"
                  style={{ width: `${(done / REQUIRED.length) * 100}%` }}
                />
              </div>
              <p id="form-hint" className="mt-4 text-sm text-muted">
                Les champs marqués d&apos;un <span className="text-accent">*</span> sont obligatoires.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-9">
              {/* 1 — Type de travaux */}
              <Step n={1} done={stepDone[1]}>
                <fieldset aria-describedby={err("service") ? "service-err" : undefined}>
                  <legend className="text-lg font-semibold">
                    Quel type de travaux ? <span className="text-accent">*</span>
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((s) => (
                      <Chip
                        key={s}
                        name="service"
                        value={s}
                        checked={values.service === s}
                        invalid={!!err("service")}
                        onChange={() => pick("service", s)}
                      />
                    ))}
                  </div>
                  <FieldError id="service-err" msg={err("service")} />
                </fieldset>
              </Step>

              {/* 2 — Ville + description */}
              <Step n={2} done={stepDone[2]}>
                <fieldset aria-describedby={err("city") ? "city-err" : undefined}>
                  <legend className="text-lg font-semibold">
                    Où se situe le chantier ? <span className="text-accent">*</span>
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {CITY_OPTIONS.map((c) => (
                      <Chip
                        key={c}
                        name="city"
                        value={c}
                        checked={values.city === c}
                        invalid={!!err("city")}
                        onChange={() => pick("city", c)}
                        icon={<MapPin weight="duotone" className="size-4" aria-hidden />}
                      />
                    ))}
                  </div>
                  <FieldError id="city-err" msg={err("city")} />
                </fieldset>

                <div className="mt-6">
                  <Field label="Votre projet (facultatif)" error={err("message")} id="message" hint="Pièce(s), surface approximative, style souhaité…">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => set("message", e.target.value)}
                      onBlur={() => blur("message")}
                      placeholder="Ex. : salon de 30 m², plafond à caisson avec gorge LED"
                      aria-invalid={!!err("message")}
                      aria-describedby={err("message") ? "message-err" : "message-hint"}
                      className={cn(inputClass(!!err("message")), "min-h-32 resize-y")}
                    />
                  </Field>
                </div>
              </Step>

              {/* 3 — Coordonnées */}
              <Step n={3} done={stepDone[3]} last>
                <p className="text-lg font-semibold">Comment vous joindre ?</p>
                <div className="mt-4 grid gap-x-4 sm:grid-cols-2">
                  <Field label="Nom complet" required error={err("name")} id="name">
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      onBlur={() => blur("name")}
                      placeholder="Votre nom"
                      aria-invalid={!!err("name")}
                      aria-describedby={err("name") ? "name-err" : undefined}
                      className={inputClass(!!err("name"))}
                    />
                  </Field>
                  <Field label="Téléphone / WhatsApp" required error={err("phone")} id="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      onBlur={() => blur("phone")}
                      placeholder="+237 6 …"
                      aria-invalid={!!err("phone")}
                      aria-describedby={err("phone") ? "phone-err" : undefined}
                      className={inputClass(!!err("phone"))}
                    />
                  </Field>
                </div>
              </Step>

              {/* Piège anti-spam */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <AnimatePresence>
                {status === "error" && serverError && (
                  <motion.p
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="mt-2 mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    <WarningCircle weight="bold" className="size-4 shrink-0" aria-hidden /> {serverError}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className={buttonClass("primary", "flex-1", "lg")}
                >
                  {status === "sending" ? (
                    <>
                      <CircleNotch weight="bold" className="size-4 animate-spin" aria-hidden /> Envoi…
                    </>
                  ) : (
                    <>
                      <PaperPlaneTilt weight="bold" className="size-4" aria-hidden /> Envoyer ma demande
                    </>
                  )}
                </button>
                <button type="button" onClick={sendWhatsApp} className={buttonClass("ghost", "flex-1", "lg")}>
                  <WhatsAppIcon /> Envoyer via WhatsApp
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck weight="duotone" className="size-4 text-accent" aria-hidden /> Vos coordonnées servent
                  uniquement à vous recontacter.
                </p>
                <p className="flex items-center gap-1.5">
                  <EnvelopeSimple weight="bold" className="size-3.5" aria-hidden />
                  <a className="inline-flex min-h-8 items-center underline underline-offset-2 hover:text-ink" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Étape numérotée avec fil vertical (rail) — purement visuel. */
function Step({ n, done, last, children }: { n: number; done: boolean; last?: boolean; children: ReactNode }) {
  return (
    <div className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 sm:grid-cols-[2.5rem_1fr] sm:gap-x-5">
      <div aria-hidden className="relative flex flex-col items-center">
        <span
          className={cn(
            "relative z-10 grid size-9 place-items-center rounded-full font-display text-base transition-all duration-500 ease-out-expo sm:size-10",
            done ? "bg-gold-gradient text-white shadow-glow" : "bg-ink text-gold",
          )}
        >
          {done ? <Check weight="bold" className="size-4" /> : n}
        </span>
        {!last && <span className="mt-2 w-px flex-1 bg-line" />}
      </div>
      <div className={cn("min-w-0 pt-1", !last && "pb-9")}>{children}</div>
    </div>
  );
}

function Chip({
  name,
  value,
  checked,
  invalid,
  onChange,
  icon,
}: {
  name: string;
  value: string;
  checked: boolean;
  invalid?: boolean;
  onChange: () => void;
  icon?: ReactNode;
}) {
  return (
    <label
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent active:scale-[0.97]",
        checked
          ? "border-ink bg-ink text-plaster shadow-[0_10px_24px_-14px_rgb(20_40_75/0.4)]"
          : invalid
            ? "border-red-300 bg-plaster/60 text-ink hover:border-ink/40"
            : "border-line bg-plaster/60 text-ink hover:border-ink/40 hover:bg-white",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {checked ? <Check weight="bold" className="size-3.5 text-gold" aria-hidden /> : icon}
      {value}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "w-full min-h-12 rounded-2xl border bg-plaster/60 px-4 py-3.5 text-base text-ink transition-all duration-200 placeholder:text-muted/70 focus:bg-white focus:outline-none focus:ring-4",
    invalid ? "border-red-500 focus:ring-red-500/15" : "border-line hover:border-ink/25 focus:border-accent focus:ring-accent/15",
  );
}

function Field({
  label,
  id,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-err`} msg={error} />
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700"
        >
          <WarningCircle weight="bold" className="size-3.5 shrink-0" aria-hidden /> {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
