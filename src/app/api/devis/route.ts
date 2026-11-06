import { SITE } from "@/lib/site";
import { quoteText, validateQuote, type QuoteInput } from "@/lib/quote";

/**
 * Réception d'une demande de devis.
 * - Valide les données côté serveur.
 * - Si RESEND_API_KEY est défini, envoie un e-mail à l'entreprise via l'API Resend.
 * - Sinon, journalise la demande (visible dans les logs du serveur / de l'hébergeur).
 */
export async function POST(request: Request) {
  let body: Partial<QuoteInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège anti-spam : les robots le remplissent, les humains ne le voient pas.
  if ((body as Record<string, unknown>).website) {
    return Response.json({ ok: true });
  }

  const errors = validateQuote(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const data: QuoteInput = {
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    city: body.city!,
    service: body.service!,
    message: (body.message ?? "").trim(),
  };
  const text = quoteText(data);

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL ?? "PLACO PRO 237 <onboarding@resend.dev>",
        to: [process.env.QUOTE_TO_EMAIL ?? SITE.email],
        subject: `Demande de devis — ${data.service} (${data.city})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[devis] Échec d'envoi e-mail", res.status, await res.text());
      return Response.json(
        { ok: false, error: "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp." },
        { status: 502 },
      );
    }
  } else {
    console.info("[devis] Nouvelle demande\n" + text);
  }

  return Response.json({ ok: true });
}
