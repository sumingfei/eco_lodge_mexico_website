"use client";

import { useState, type FormEvent } from "react";
import { mexicanStates } from "@/data/locations";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LocaleProvider";

type Props = {
  source: "estimator" | "contact" | "developers";
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

export function LeadForm({ source, title, intro, submitLabel, defaults, extra, whatsappMessage, showMessage, compact, titleAs: Title = "h3" }: Props) {
  const { locale, dict, p } = useI18n();
  const f = dict.leadForm;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      source,
      locale,
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
      if (!res.ok || !data.ok) throw new Error(data.error ?? f.errorGeneric);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : f.errorGeneric);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.25rem] bg-agave-100 p-8 text-agave-700">
        <p className="font-serif text-2xl">{f.successTitle}</p>
        <p className="mt-3 text-sm leading-relaxed">{f.successText}</p>
        {whatsappMessage && (
          <Button href={whatsappLink(whatsappMessage)} external variant="primary" className="mt-6" icon={<WhatsApp size={16} />}>
            {dict.common.continueWhatsapp}
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
            {f.name}
          </label>
          <input id={`${source}-name`} name="name" type="text" autoComplete="name" required minLength={2} className={field} placeholder={f.namePlaceholder} />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={label}>
            {f.email}
          </label>
          <input id={`${source}-email`} name="email" type="email" autoComplete="email" required className={field} placeholder={f.emailPlaceholder} />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className={label}>
            {f.phone}
          </label>
          <input id={`${source}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} placeholder={f.phonePlaceholder} />
        </div>
        <div>
          <label htmlFor={`${source}-state`} className={label}>
            {f.state}
          </label>
          <select id={`${source}-state`} name="state" defaultValue={defaults?.stateCode ? mexicanStates.find((s) => s.code === defaults.stateCode)?.name : ""} className={field}>
            <option value="">{f.selectState}</option>
            {mexicanStates.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${source}-city`} className={label}>
            {f.city}
          </label>
          <input id={`${source}-city`} name="city" type="text" autoComplete="address-level2" defaultValue={defaults?.location ?? ""} className={field} placeholder={f.cityPlaceholder} />
        </div>
        <div>
          <label htmlFor={`${source}-hasLand`} className={label}>
            {f.hasLand}
          </label>
          <select id={`${source}-hasLand`} name="hasLand" defaultValue={defaults?.hasLand ?? "si"} className={field}>
            {(Object.keys(f.landOptions) as (keyof typeof f.landOptions)[]).map((value) => (
              <option key={value} value={value}>
                {f.landOptions[value]}
              </option>
            ))}
          </select>
        </div>
        <div className={cn(!compact && "sm:col-span-2")}>
          <label htmlFor={`${source}-timeframe`} className={label}>
            {f.timeframe}
          </label>
          <select id={`${source}-timeframe`} name="timeframe" defaultValue={f.timeframes[1]} className={field}>
            {f.timeframes.map((tf) => (
              <option key={tf} value={tf}>
                {tf}
              </option>
            ))}
          </select>
        </div>
        {showMessage && (
          <div className={cn(!compact && "sm:col-span-2")}>
            <label htmlFor={`${source}-message`} className={label}>
              {f.message}
            </label>
            <textarea id={`${source}-message`} name="message" rows={4} className={cn(field, "h-auto py-3")} placeholder={f.messagePlaceholder} />
          </div>
        )}
        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor={`${source}-website`}>{f.website}</label>
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
          {status === "sending" ? f.sending : (submitLabel ?? f.submitDefault)}
        </Button>
        <p className="text-xs leading-relaxed text-stone">
          {f.consent}{" "}
          <a href={p("privacy")} className="underline hover:text-ink">
            {f.privacy}
          </a>
          . {f.noCommitment}
        </p>
      </div>
    </form>
  );
}
