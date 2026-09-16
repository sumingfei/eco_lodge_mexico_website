export type NavLink = { label: string; href: string; description?: string };

export const mainNav: NavLink[] = [
  { label: "Modelos", href: "/modelos" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Diseño", href: "/diseño" },
  { label: "Sustentabilidad", href: "/sustentabilidad" },
  { label: "Desarrolladores", href: "/desarrolladores" },
  { label: "Preguntas", href: "/preguntas-frecuentes" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Casas",
    links: [
      { label: "Todos los modelos", href: "/modelos" },
      { label: "Cotizador", href: "/cotizador" },
      { label: "Diseño y acabados", href: "/diseño" },
      { label: "Proyectos", href: "/proyectos" },
    ],
  },
  {
    title: "Proceso",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Sustentabilidad", href: "/sustentabilidad" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Desarrolladores", href: "/desarrolladores" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "Cotizar mi casa", href: "/cotizador" },
      { label: "Contacto", href: "/contacto" },
      { label: "Aviso de privacidad", href: "/aviso-de-privacidad" },
    ],
  },
];
