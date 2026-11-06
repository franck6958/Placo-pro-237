import { CITY_OPTIONS, SERVICE_OPTIONS } from "./data";

export type QuoteInput = {
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

/** Validation partagée client / serveur. */
export function validateQuote(input: Partial<QuoteInput>): QuoteErrors {
  const e: QuoteErrors = {};
  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").replace(/[\s.-]/g, "");
  if (name.length < 2) e.name = "Indiquez votre nom (2 caractères minimum).";
  if (name.length > 80) e.name = "Nom trop long.";
  if (!/^\+?\d{8,15}$/.test(phone)) e.phone = "Numéro invalide. Exemple : +237 6 90 00 00 00";
  if (!CITY_OPTIONS.includes(input.city ?? "")) e.city = "Choisissez une ville.";
  if (!SERVICE_OPTIONS.includes(input.service ?? "")) e.service = "Choisissez un type de travaux.";
  if ((input.message ?? "").length > 2000) e.message = "Message trop long (2000 caractères max).";
  return e;
}

export function quoteText(v: QuoteInput) {
  return `Bonjour PLACO PRO 237,
Je souhaite un devis.

Nom : ${v.name}
Téléphone : ${v.phone}
Ville : ${v.city}
Travaux : ${v.service}
Projet : ${v.message || "—"}`;
}
