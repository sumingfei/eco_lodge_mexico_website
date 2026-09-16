"use client";

import { useState, type FormEvent } from "react";
import { mexicanStates } from "@/data/locations";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const timeframes = ["Lo antes posible", "En 3 – 6 meses", "En 6 – 12 meses", "Más de un año / explorando"];
export const landOptions = [
  { value: "si", label: "Sí, ya tengo terreno" },
  { value: "buscando", label: "Estoy buscando terreno" },
  { value: "no", label: "Aún no tengo terreno" },
];

type Props = {
  source: "cotizador" | "contacto" | "desarrolladores";
  title?: string;
  intro?: string;
  submitLabel?: string;
  defaults?: { location?: string; hasLand?: string; stateCode?: string };
  /** Extra data attached to the lead (e.g. the estimate). */
  extra?: Record<string, unknown>;
  /** Prefilled WhatsApp message offered after submission. */
  whatsappMessage?: string;
  showMessage?: boolean;
  compact?: boolean;
  titleAs?: "h2" | "h3";
};

export function LeadForm({ source, title, intro, submitLabel = "Solicitar cotización formal", defaults, extra, whatsappMessage, showMessage, compact, titleAs: Title = "h3" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      source,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      location: [form.get("state"), form.get("city")].filter(Boolean).join(", "),
      hasLand: String(form.get("hasLand") ?? ""),
      timeframe: String(form.get("timeframe") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      estimate: extra,
    };
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Error");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "No pudimos enviar tu solicitud.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.25rem] bg-agave-100 p-8 text-agave-700">
        <p className="font-serif text-2xl">Recibimos tu solicitud.</p>
        <p className="mt-3 text-sm leading-relaxed">Un integrante del equipo te contactará por WhatsApp o correo para revisar tu terreno y preparar una cotización formal.</p>
        {whatsappMessage && (
          <Button href={whatsappLink(whatsappMessage)} external variant="primary" className="mt-6" icon={<WhatsApp size={16} />}>
            Continuar por WhatsApp
          </Button>
        )}
      </div>
    );
  }

  const field = "mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[0.9375rem] text-ink placeholder:text-stone-300 focus:border-ink focus:outline-none";
  const label = "text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className={cn("rounded-[1.25rem] border border-ink/10 bg-limestone-50", compact ? "p-6" : "p-6 sm:p-8")} noValidate>
      {title && <Title className="font-serif text-2xl text-ink">{title}</Title>}
      {intro && <p className="mt-2 text-sm leading-relaxed text-charcoal-700/80">{intro}</p>}

      <div className={cn("grid gap-5", (title || intro) && "mt-6", !compact && "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${source}-name`} className={label}>
            Nombre
          </label>
          <input id={`${source}-name`} name="name" type="text" autoComplete="name" required minLength={2} className={field} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={label}>
            Correo electrónico
          </label>
          <input id={`${source}-email`} name="email" type="email" autoComplete="email" required className={field} placeholder="tu@correo.com" />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className={label}>
            Teléfono / WhatsApp
          </label>
          <input id={`${source}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} placeholder="55 1234 5678" />
        </div>
        <div>
          <label htmlFor={`${source}-state`} className={label}>
            Estado donde construirías
          </label>
          <select id={`${source}-state`} name="state" defaultValue={defaults?.stateCode ? mexicanStates.find((s) => s.code === defaults.stateCode)?.name : ""} className={field}>
            <option value="">Selecciona un estado</option>
            {mexicanStates.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${source}-city`} className={label}>
            Municipio / ciudad
          </label>
          <input id={`${source}-city`} name="city" type="text" autoComplete="address-level2" defaultValue={defaults?.location ?? ""} className={field} placeholder="Ej. Tequisquiapan" />
        </div>
        <div>
          <label htmlFor={`${source}-hasLand`} className={label}>
            ¿Ya tienes terreno?
          </label>
          <select id={`${source}-hasLand`} name="hasLand" defaultValue={defaults?.hasLand ?? "si"} className={field}>
            {landOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={cn(!compact && "sm:col-span-2")}>
          <label htmlFor={`${source}-timeframe`} className={label}>
            ¿Cuándo te gustaría construir?
          </label>
          <select id={`${source}-timeframe`} name="timeframe" defaultValue={timeframes[1]} className={field}>
            {timeframes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {showMessage && (
          <div className={cn(!compact && "sm:col-span-2")}>
            <label htmlFor={`${source}-message`} className={label}>
              Cuéntanos sobre tu proyecto
            </label>
            <textarea id={`${source}-message`} name="message" rows={4} className={cn(field, "h-auto py-3")} placeholder="Terreno, número de unidades, uso, calendario…" />
          </div>
        )}
        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor={`${source}-website`}>Sitio web</label>
          <input id={`${source}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-terracotta-600">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"} className="disabled:opacity-60">
          {status === "sending" ? "Enviando…" : submitLabel}
        </Button>
        <p className="text-xs leading-relaxed text-stone">
          Al enviar aceptas nuestro{" "}
          <a href="/aviso-de-privacidad" className="underline hover:text-ink">
            aviso de privacidad
          </a>
          . Sin compromiso.
        </p>
      </div>
    </form>
  );
}
