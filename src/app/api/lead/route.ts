import { NextResponse } from "next/server";

/**
 * Lead intake endpoint.
 * - Validates the payload.
 * - Forwards it to LEAD_WEBHOOK_URL (CRM, Zapier, Make, Slack…) when configured.
 * - Otherwise logs it on the server so nothing is lost during development.
 *
 * TODO: connect to the company CRM / email provider via LEAD_WEBHOOK_URL.
 */

export type LeadPayload = {
  source: "estimator" | "contact" | "developers";
  name: string;
  email: string;
  phone: string;
  location?: string;
  hasLand?: string;
  timeframe?: string;
  message?: string;
  estimate?: Record<string, unknown>;
  /** Honeypot — must be empty. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  if (body.website) {
    // Bot filled the honeypot; pretend success.
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.replace(/\D/g, "");

  if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Escribe tu nombre." }, { status: 422 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Revisa tu correo electrónico." }, { status: 422 });
  if (!phone || phone.length < 10) return NextResponse.json({ ok: false, error: "Escribe un teléfono de 10 dígitos." }, { status: 422 });

  const lead = { ...body, name, email, phone, receivedAt: new Date().toISOString() };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[lead] webhook failed", err);
      return NextResponse.json({ ok: false, error: "No pudimos enviar tu solicitud. Escríbenos por WhatsApp." }, { status: 502 });
    }
  } else {
    console.info("[lead] (no LEAD_WEBHOOK_URL configured)", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
