/**
 * Sustainability content. Every item describes a concrete design or material decision.
 * No certifications, percentages or performance figures are claimed here on purpose:
 * add them only with verifiable data.
 */

export type SustainabilityStrategy = { title: string; text: string };

export const homeStrategies: SustainabilityStrategy[] = [
  { title: "Aislamiento de alto desempeño", text: "Muros, losa y cubierta con aislamiento continuo que reduce la necesidad de climatización." },
  { title: "Ventilación natural", text: "Ventanas enfrentadas y patios que generan corrientes cruzadas en cada espacio." },
  { title: "Orientación solar pasiva", text: "Cada modelo se gira según el terreno para proteger el vidrio del sol de la tarde." },
  { title: "Preparación para paneles solares", text: "Cubierta estructurada y canalizaciones listas para un sistema fotovoltaico." },
  { title: "Captación de agua de lluvia", text: "Bajantes y espacio de cisterna preparados para almacenar y filtrar el agua del techo." },
  { title: "Grifería de bajo consumo", text: "Sanitarios, regaderas y llaves ahorradoras incluidos en todos los niveles de acabado." },
  { title: "Iluminación eficiente", text: "LED en toda la casa y luz natural en cada espacio habitable." },
  { title: "Menos desperdicio en obra", text: "Corte de precisión en planta y reaprovechamiento de sobrantes entre proyectos." },
  { title: "Materiales apropiados al lugar", text: "Recubrimientos y protecciones seleccionados según clima: costa, desierto, bosque o ciudad." },
  { title: "Reúso de aguas grises (opcional)", text: "Sistema para tratar el agua de regaderas y lavabos y reutilizarla en riego." },
];

export type SustainabilitySection = {
  id: string;
  title: string;
  intro: string;
  points: SustainabilityStrategy[];
  diagram?: "orientation" | "ventilation" | "shading" | "insulation" | "rainwater";
  /** Photo shown when the section has no diagram. TODO: replace with company photography. */
  image?: { src: string; alt: string };
};

export const sustainabilitySections: SustainabilitySection[] = [
  {
    id: "diseno-pasivo",
    title: "Diseño pasivo",
    intro: "Antes de instalar cualquier sistema, la casa misma debe trabajar a favor del clima. La orientación, las proporciones de las ventanas y la profundidad de los aleros se resuelven en la adaptación de cada proyecto.",
    diagram: "orientation",
    points: [
      { title: "Orientación según el terreno", text: "Los espacios de estar miran hacia el norte o el sur según la latitud y el paisaje; los muros más cerrados reciben el sol del poniente." },
      { title: "Proporción de vidrio controlada", text: "Ventanales grandes donde hay sombra; ventanas altas y estrechas donde el sol es más agresivo." },
      { title: "Masa térmica donde conviene", text: "Pisos de concreto pulido en zonas con noches frías; acabados ligeros en clima cálido húmedo." },
    ],
  },
  {
    id: "confort-termico",
    title: "Confort térmico",
    intro: "Una envolvente bien aislada mantiene la temperatura interior estable y hace que el aire acondicionado, si se instala, trabaje mucho menos.",
    diagram: "insulation",
    points: [
      { title: "Aislamiento continuo", text: "Paneles con núcleo aislante en muros, piso y cubierta, sin puentes térmicos en la estructura de acero." },
      { title: "Cubierta ventilada", text: "Cámara de aire entre la lámina exterior y el aislamiento para disipar el calor antes de que entre a la casa." },
      { title: "Vidrio doble", text: "Cancelería con doble vidrio en todos los modelos; control solar bajo emisivo en Confort y Premium." },
    ],
  },
  {
    id: "ventilacion",
    title: "Ventilación cruzada",
    intro: "Cada espacio habitable tiene al menos dos aberturas en fachadas opuestas o hacia un patio, de modo que el aire fresco entre por un lado y el caliente salga por el otro.",
    diagram: "ventilation",
    points: [
      { title: "Ventanas enfrentadas", text: "La distribución de cada modelo coloca aberturas en lados opuestos de los espacios principales." },
      { title: "Ventilación nocturna", text: "Ventanas altas operables que permiten enfriar la casa de noche sin comprometer la seguridad." },
      { title: "Patios y terrazas", text: "En los modelos Patio, el jardín interior actúa como chimenea térmica que extrae el aire caliente." },
    ],
  },
  {
    id: "sombreado",
    title: "Sombreado de cubierta y fachadas",
    intro: "Los aleros, pérgolas y celosías se dimensionan para bloquear el sol alto de verano y dejar entrar el sol bajo de invierno.",
    diagram: "shading",
    points: [
      { title: "Aleros calculados", text: "Entre 1.2 y 1.5 m de volado sobre los ventanales principales, según la orientación." },
      { title: "Celosías y pérgolas", text: "Elementos de madera o metal que filtran la luz en terrazas y fachadas poniente." },
      { title: "Vegetación como sombra", text: "Recomendamos árboles de hoja caduca al poniente y enredaderas en pérgolas." },
    ],
  },
  {
    id: "energia",
    title: "Energía",
    intro: "Menos demanda primero; después, generación. Todos los modelos se entregan preparados para energía solar.",
    image: { src: "/images/hero/hero-garden.jpg", alt: "Casa con cubierta plana preparada para paneles solares y grandes ventanales sombreados" },
    points: [
      { title: "Iluminación LED", text: "Incluida en todos los espacios, con circuitos separados para exteriores." },
      { title: "Preparación fotovoltaica", text: "Cubierta estructurada para el peso de paneles y canalizaciones hasta el tablero." },
      { title: "Calentamiento solar de agua", text: "Opción de calentador solar con respaldo de gas o eléctrico." },
      { title: "Electrodomésticos eficientes", text: "Recomendamos equipos con etiqueta de eficiencia energética en cocina y lavado." },
    ],
  },
  {
    id: "energia-renovable",
    title: "Energía renovable",
    intro: "Un sistema fotovoltaico se dimensiona según tu consumo estimado y la tarifa de CFE de tu zona. Puede instalarse desde el inicio o más adelante.",
    image: { src: "/images/landscapes/desierto.jpg", alt: "Paisaje desértico mexicano bajo un sol intenso" },
    points: [
      { title: "Interconectado a la red", text: "La opción más común: la casa genera de día y compensa con la red de noche mediante medidor bidireccional." },
      { title: "Con respaldo de baterías", text: "Para terrenos con cortes frecuentes o sin acceso a la red." },
      { title: "Dimensionamiento honesto", text: "Cotizamos el sistema con base en el consumo real esperado, no en promesas de 'cero recibo'." },
    ],
  },
  {
    id: "agua",
    title: "Agua",
    intro: "En gran parte de México el agua es el recurso más escaso. La casa reduce el consumo y puede captar y reutilizar.",
    diagram: "rainwater",
    points: [
      { title: "Grifería de bajo consumo", text: "Incluida en todos los niveles de acabado." },
      { title: "Captación pluvial", text: "Bajantes, filtro de primeras lluvias y cisterna dimensionada según la superficie de techo y la precipitación local." },
      { title: "Reúso de aguas grises", text: "Sistema opcional que trata agua de regaderas y lavabos para riego de jardín." },
      { title: "Biodigestor", text: "Para terrenos sin drenaje municipal, en lugar de fosa séptica convencional." },
    ],
  },
  {
    id: "materiales",
    title: "Materiales",
    intro: "Elegimos materiales por durabilidad, mantenimiento y comportamiento en cada clima, no por moda.",
    image: { src: "/images/sections/fachada-madera.jpg", alt: "Fachada de madera termotratada y acero oscuro" },
    points: [
      { title: "Acero galvanizado", text: "Estructura ligera, reciclable y de dimensiones exactas." },
      { title: "Madera certificada", text: "Recubrimientos y carpinterías de madera con origen verificable; solicitamos documentación a nuestros proveedores." },
      { title: "Acabados de bajo mantenimiento", text: "Fachadas ventiladas que se limpian con agua y no necesitan pintura periódica." },
      { title: "Pinturas de baja emisión", text: "Interiores con pinturas de bajo contenido de compuestos orgánicos volátiles." },
    ],
  },
  {
    id: "residuos",
    title: "Reducción de residuos",
    intro: "Fabricar bajo techo cambia la ecuación del desperdicio: lo que en obra termina en escombro, en planta se planifica.",
    image: { src: "/images/sections/fachada-metal.jpg", alt: "Fachada de paneles metálicos perforados fabricados con precisión" },
    points: [
      { title: "Corte de precisión", text: "Los paneles se cortan con maquinaria a partir de planos de fabricación, con nesting para aprovechar el material." },
      { title: "Sobrantes reutilizados", text: "Los recortes de un proyecto se emplean en el siguiente." },
      { title: "Menos escombro en tu terreno", text: "La obra en sitio se limita a cimentación, conexiones y remates." },
    ],
  },
];
