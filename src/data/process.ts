/** Process content: homepage 5-step summary, full 12-step process page and timeline comparison. */

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  /** Who is responsible. "cliente" steps may depend on the client or local authorities. */
  owner: "empresa" | "cliente" | "compartido";
  duration?: string;
};

export const homeSteps: { number: string; title: string; text: string }[] = [
  { number: "01", title: "Elige tu modelo", text: "Explora los modelos, compara tamaños y usa el cotizador para tener una estimación preliminar en minutos." },
  { number: "02", title: "Adaptamos el proyecto", text: "Ajustamos orientación, fachada y acabados a tu terreno y a tu forma de vivir. Recibes una cotización formal." },
  { number: "03", title: "Preparamos tu terreno", text: "Estudio de suelo, cimentación y conexiones. Se ejecuta al mismo tiempo que la fabricación." },
  { number: "04", title: "Fabricamos tu casa", text: "Los módulos se producen bajo techo, con instalaciones y acabados integrados y control de calidad por etapa." },
  { number: "05", title: "Instalamos y entregamos", text: "Transporte, montaje con grúa, conexiones y detalles finales. Recibes tu casa lista para habitar." },
];

export const fullProcess: ProcessStep[] = [
  { number: "01", title: "Consulta inicial", owner: "empresa", duration: "1 semana", text: "Platicamos sobre tu terreno, tu presupuesto y cómo quieres vivir. Revisamos juntos qué modelo tiene sentido y qué implicaciones tiene tu ubicación." },
  { number: "02", title: "Evaluación del terreno", owner: "compartido", duration: "1–2 semanas", text: "Analizamos acceso, pendiente, orientación, servicios disponibles y normativa local. Puede requerir un estudio de mecánica de suelos, que se cotiza por separado." },
  { number: "03", title: "Selección del modelo", owner: "cliente", duration: "1 semana", text: "Confirmas el modelo, el nivel de acabado y los sistemas opcionales. Emitimos una cotización formal por escrito con alcances claros." },
  { number: "04", title: "Personalización", owner: "compartido", duration: "2–3 semanas", text: "Elegimos fachada, paleta interior, cocina y las opciones de distribución disponibles para el modelo. Se firma el contrato y se define el calendario." },
  { number: "05", title: "Ingeniería", owner: "empresa", duration: "2–4 semanas", text: "Desarrollamos el proyecto estructural y de instalaciones adaptado a tu terreno, junto con el proyecto de cimentación." },
  { number: "06", title: "Permisos", owner: "cliente", duration: "Variable", text: "La licencia de construcción y trámites municipales dependen de cada municipio. Entregamos los planos y documentos técnicos necesarios; el cliente o su gestor realiza el trámite ante la autoridad." },
  { number: "07", title: "Cimentación y preparación del sitio", owner: "compartido", duration: "3–5 semanas", text: "Se ejecuta la cimentación, acometidas de agua, drenaje y electricidad. Puede realizarse por nuestro equipo o por un contratista local bajo nuestras especificaciones." },
  { number: "08", title: "Fabricación en planta", owner: "empresa", duration: "6–12 semanas", text: "Los módulos se producen bajo techo mientras avanza la cimentación. Estructura, aislamiento, instalaciones, cancelería y gran parte de los acabados se integran en fábrica." },
  { number: "09", title: "Transporte", owner: "empresa", duration: "1–3 días", text: "Los módulos viajan en plataformas con permisos de carga. La ruta y el acceso al terreno se validan desde la evaluación inicial." },
  { number: "10", title: "Montaje", owner: "empresa", duration: "1–3 días", text: "Con grúa, los módulos se colocan sobre la cimentación y se unen estructuralmente. Es el momento en que la casa aparece en el terreno." },
  { number: "11", title: "Conexiones y acabados finales", owner: "empresa", duration: "2–4 semanas", text: "Se conectan instalaciones, se sellan juntas, se colocan pisos de terraza, pérgolas y sistemas opcionales, y se realizan pruebas de funcionamiento." },
  { number: "12", title: "Entrega", owner: "empresa", duration: "1 día", text: "Recorrido de entrega contigo, manual de mantenimiento y documentación técnica. Tu casa queda lista para habitar." },
];

export const responsibilities = {
  empresa: [
    "Diseño arquitectónico y adaptación del modelo",
    "Ingeniería estructural y de instalaciones",
    "Fabricación de módulos en planta",
    "Transporte y montaje",
    "Conexiones interiores y acabados finales",
    "Documentación técnica y manual de mantenimiento",
  ],
  cliente: [
    "Propiedad y documentación legal del terreno",
    "Licencias y permisos municipales (con nuestros planos)",
    "Contratación de servicios ante CFE, agua y drenaje municipal",
    "Acceso al terreno para transporte y grúa",
    "Estudios de suelo y topografía (pueden gestionarse con nosotros)",
  ],
  compartido: [
    "Cimentación y preparación del sitio: por nuestro equipo o contratista local bajo especificación",
    "Calendario de obra sujeto a permisos y clima",
  ],
};

/**
 * Illustrative timeline comparison in weeks. Values are a schematic example of a
 * ~85 m² house and must be adjusted with real project data before publishing claims.
 */
export type TimelinePhase = { label: string; start: number; end: number; track?: number };

export const timelineComparison = {
  unit: "semanas",
  totalWeeks: 40,
  traditional: {
    label: "Construcción tradicional",
    totalLabel: "≈ 36–40 semanas",
    phases: [
      { label: "Proyecto y permisos", start: 0, end: 6 },
      { label: "Cimentación", start: 6, end: 10 },
      { label: "Estructura y muros", start: 10, end: 20 },
      { label: "Instalaciones", start: 20, end: 26 },
      { label: "Acabados", start: 26, end: 36 },
      { label: "Entrega", start: 36, end: 38 },
    ] as TimelinePhase[],
  },
  prefab: {
    label: "Proceso prefabricado",
    totalLabel: "≈ 16–20 semanas",
    tracks: ["En sitio", "En planta", "Trámites"],
    phases: [
      { label: "Ingeniería", start: 0, end: 4, track: 0 },
      { label: "Cimentación", start: 6, end: 10, track: 0 },
      { label: "Montaje y conexiones", start: 14, end: 18, track: 0 },
      { label: "Entrega", start: 18, end: 19.5, track: 0 },
      { label: "Fabricación en planta", start: 4, end: 14, track: 1 },
      { label: "Permisos municipales", start: 3, end: 8, track: 2 },
    ] as TimelinePhase[],
  },
};
