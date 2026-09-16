/**
 * Trust & credibility data.
 * Everything here is EMPTY on purpose: nothing is rendered until real data is
 * supplied AND the corresponding flag in siteConfig.features is enabled.
 *
 * TODO: fill with verified company information.
 */

export type Testimonial = { name: string; location: string; model: string; quote: string; image?: string };
export type CompletedProject = { title: string; location: string; year: number; model: string; image: string };
export type Credential = { title: string; issuer: string; year?: number; url?: string };
export type MaterialSpec = { component: string; specification: string; standard?: string };
export type Partner = { name: string; logo: string; url?: string };

export const trust = {
  /** e.g. { label: "Casas entregadas", value: "120+" } — only with verifiable numbers. */
  stats: [] as { label: string; value: string }[],
  testimonials: [] as Testimonial[],
  completedProjects: [] as CompletedProject[],
  engineeringCredentials: [] as Credential[],
  materialSpecs: [] as MaterialSpec[],
  warranty: {
    summary: "", // e.g. "Garantía estructural de X años y de acabados de Y años, por contrato."
    details: [] as string[],
  },
  partners: [] as Partner[],
  factory: {
    location: "", // e.g. "Planta en El Marqués, Querétaro"
    areaM2: 0,
    description: "",
    images: [] as string[],
  },
};

/**
 * Process-based statements that do not require external verification.
 * Shown on the homepage as “Cómo trabajamos”.
 */
export const transparencyPoints = [
  { title: "Precios de referencia públicos", text: "Publicamos el precio por m² y el precio 'desde' de cada modelo para que sepas de qué estamos hablando antes de la primera llamada." },
  { title: "Estimación en línea, cotización por escrito", text: "El cotizador te da un rango preliminar; después de evaluar tu terreno recibes una cotización formal con alcances claros." },
  { title: "Lo que no incluimos, lo decimos", text: "Terreno, permisos, cimentación y conexiones a servicios se presentan como partidas separadas, nunca escondidas en el precio." },
  { title: "Seguimiento por WhatsApp", text: "Un canal directo con el equipo de proyecto desde la primera pregunta hasta la entrega." },
];
