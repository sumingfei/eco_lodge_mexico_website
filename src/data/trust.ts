/**
 * Trust & credibility data.
 * Everything here is EMPTY on purpose: nothing is rendered until real data is
 * supplied AND the corresponding flag in siteConfig.features is enabled.
 *
 * TODO: fill with verified company information.
 */

import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export type Testimonial = { name: string; location: string; model: string; quote: L; image?: string };
export type CompletedProject = { title: L; location: string; year: number; model: string; image: string };
export type Credential = { title: L; issuer: string; year?: number; url?: string };
export type MaterialSpec = { component: L; specification: L; standard?: string };
export type Partner = { name: string; logo: string; url?: string };

export const trust = {
  /** e.g. { label: "Casas entregadas", value: "120+" } — only with verifiable numbers. */
  stats: [] as { label: L; value: string }[],
  testimonials: [] as Testimonial[],
  completedProjects: [] as CompletedProject[],
  engineeringCredentials: [] as Credential[],
  materialSpecs: [] as MaterialSpec[],
  warranty: {
    summary: null as L | null, // e.g. W("Garantía estructural de X años…", "X-year structural warranty…")
    details: [] as L[],
  },
  partners: [] as Partner[],
  factory: {
    location: "", // e.g. "Planta en El Marqués, Querétaro"
    areaM2: 0,
    description: null as L | null,
    images: [] as string[],
  },
};

/**
 * Process-based statements that do not require external verification.
 * Shown on the homepage as “Cómo trabajamos”.
 */
export const transparencyPoints: { title: L; text: L }[] = [
  { title: W("Precios de referencia públicos", "Public reference prices"), text: W("Publicamos el precio por m² y el precio 'desde' de cada modelo para que sepas de qué estamos hablando antes de la primera llamada.", "We publish the price per m² and each model's starting price so you know what we're talking about before the first call.") },
  { title: W("Estimación en línea, cotización por escrito", "Online estimate, written quote"), text: W("El cotizador te da un rango preliminar; después de evaluar tu terreno recibes una cotización formal con alcances claros.", "The estimator gives you a preliminary range; after evaluating your site you receive a formal quote with a clear scope.") },
  { title: W("Lo que no incluimos, lo decimos", "What we don't include, we say"), text: W("Terreno, permisos, cimentación y conexiones a servicios se presentan como partidas separadas, nunca escondidas en el precio.", "Land, permits, foundation and utility connections are shown as separate items, never hidden in the price.") },
  { title: W("Seguimiento por WhatsApp", "Follow-up on WhatsApp"), text: W("Un canal directo con el equipo de proyecto desde la primera pregunta hasta la entrega.", "A direct channel to the project team from the first question to handover.") },
];
