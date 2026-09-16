/**
 * Frequently asked questions.
 * Answers avoid legal, financing, warranty and engineering claims that require
 * company-specific verification; those are marked with TODO and phrased as
 * process descriptions rather than guarantees.
 */

export type FaqItem = { q: string; a: string; category: FaqCategory };
export type FaqCategory = "Precios" | "Proceso" | "Diseño" | "Terreno y permisos" | "Sustentabilidad" | "Vida útil";

export const faqCategories: FaqCategory[] = ["Precios", "Proceso", "Diseño", "Terreno y permisos", "Sustentabilidad", "Vida útil"];

export const faqs: FaqItem[] = [
  {
    category: "Precios",
    q: "¿Cuánto cuesta una casa prefabricada?",
    a: "Depende del modelo, el nivel de acabado y los sistemas opcionales. Publicamos precios de referencia por m² y un precio 'desde' por modelo; el cotizador en línea te da una estimación preliminar en minutos, y la cotización formal se emite después de evaluar tu terreno.",
  },
  {
    category: "Precios",
    q: "¿Qué incluye el precio de la casa?",
    a: "La casa completa fabricada en planta: estructura, envolvente aislada, cancelería, instalaciones eléctricas, hidráulicas y sanitarias, cocina, baños, pisos, carpintería y pintura según el nivel de acabado, además del transporte y montaje en sitio dentro del alcance cotizado.",
  },
  {
    category: "Precios",
    q: "¿El precio incluye el terreno?",
    a: "No. Construimos sobre un terreno que ya sea tuyo o que estés por adquirir. Si aún no tienes terreno, podemos orientarte sobre qué características conviene buscar para tu modelo.",
  },
  {
    category: "Precios",
    q: "¿El precio incluye la cimentación?",
    a: "El precio del modelo no incluye cimentación ni preparación del sitio, porque dependen del suelo, la pendiente y los servicios disponibles en cada terreno. Se cotizan por separado después de la evaluación del terreno, y el cotizador muestra un rango estimado para que lo consideres desde el inicio.",
  },
  {
    category: "Precios",
    q: "¿Cómo funciona el financiamiento?",
    // TODO: describe the company's real options (mortgage lenders that accept prefab, staged payments, financial partners).
    a: "Las condiciones de pago y las opciones de financiamiento disponibles se explican en la cotización formal. Si estás tramitando un crédito hipotecario, cuéntanoslo desde el inicio para alinear la documentación técnica que la institución requiera.",
  },
  {
    category: "Proceso",
    q: "¿Cuánto tiempo tarda la construcción?",
    a: "Cada modelo indica un rango estimado de semanas desde la aprobación de ingeniería hasta la entrega. El tiempo total también depende de los permisos municipales y del estado del terreno, que pueden avanzar en paralelo con la fabricación.",
  },
  {
    category: "Proceso",
    q: "¿Cómo se transporta la casa?",
    a: "Los módulos se transportan en plataformas de carga con los permisos correspondientes. Desde la evaluación del terreno verificamos el acceso, el ancho de caminos y la maniobra de la grúa para el montaje.",
  },
  {
    category: "Proceso",
    q: "¿Construyen en cualquier parte de México?",
    a: "Atendemos proyectos en toda la República sujeto a evaluación logística: distancia desde la planta, acceso al terreno y disponibilidad de grúa en la zona. En el cotizador puedes indicar tu estado para considerarlo en la estimación.",
  },
  {
    category: "Proceso",
    q: "¿Qué tipo de cimentación se usa?",
    a: "Generalmente losa de cimentación o zapatas con dados de concreto, según el estudio de suelo. El proyecto de cimentación se define en la etapa de ingeniería y puede ejecutarlo nuestro equipo o un contratista local bajo nuestras especificaciones.",
  },
  {
    category: "Diseño",
    q: "¿Puedo modificar el diseño?",
    a: "Sí, dentro de las opciones de cada modelo: fachada, paleta interior, cocina, pisos, baños, terrazas, pérgolas y sistemas. Algunas distribuciones también tienen variantes. Los cambios estructurales fuera del catálogo se evalúan caso por caso.",
  },
  {
    category: "Diseño",
    q: "¿Se puede ampliar la casa después?",
    a: "Los modelos están pensados para crecer por módulos: se puede añadir una recámara, un estudio o cerrar una terraza. Conviene decirlo desde el inicio para prever la conexión estructural y de instalaciones.",
  },
  {
    category: "Terreno y permisos",
    q: "¿Se necesitan permisos?",
    a: "Sí. Una casa prefabricada es una construcción y requiere licencia de construcción municipal, además de los trámites que apliquen en cada localidad (uso de suelo, alineamiento, conexión a servicios).",
  },
  {
    category: "Terreno y permisos",
    q: "¿Quién gestiona los permisos?",
    // TODO: confirm the exact permit-management scope the company offers.
    a: "Entregamos los planos arquitectónicos y estructurales y la documentación técnica necesaria. El trámite ante la autoridad municipal lo realiza el cliente o un gestor local; en algunas zonas podemos recomendarte gestores con experiencia en este tipo de construcción.",
  },
  {
    category: "Sustentabilidad",
    q: "¿Se pueden instalar paneles solares?",
    a: "Sí. Todos los modelos se entregan preparados: cubierta estructurada y canalizaciones. El sistema fotovoltaico se dimensiona según tu consumo y la tarifa de tu zona, y puede instalarse desde el inicio o más adelante.",
  },
  {
    category: "Sustentabilidad",
    q: "¿La casa puede captar agua de lluvia?",
    a: "Sí. Las bajantes llegan a un punto de conexión previsto para cisterna y filtro. La capacidad se calcula con la superficie de techo y la lluvia de tu región.",
  },
  {
    category: "Vida útil",
    q: "¿Cuánto dura una casa prefabricada?",
    // TODO: add the design life and the contractual structural warranty once defined.
    a: "Una casa con estructura de acero galvanizado, envolvente protegida y mantenimiento básico está diseñada para la misma vida útil que una casa convencional bien construida. Los términos de garantía se detallan por escrito en el contrato.",
  },
  {
    category: "Vida útil",
    q: "¿Cómo es el mantenimiento?",
    a: "Similar al de cualquier casa: revisión anual de sellos y canalones, limpieza de fachadas ventiladas, cuidado de maderas exteriores según el clima. Entregamos un manual de mantenimiento con cada casa.",
  },
];

export const homeFaqs = faqs.slice(0, 6);
