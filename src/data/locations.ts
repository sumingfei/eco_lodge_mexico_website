/**
 * Mexican states with a rough logistics factor applied to site preparation costs
 * in the estimator. 1.00 is the base. Adjust with real logistics data.
 *
 * TODO: calibrate factors to the actual plant location and transport costs.
 */
export type MexicanState = { code: string; name: string; factor: number };

export const mexicanStates: MexicanState[] = [
  { code: "AGU", name: "Aguascalientes", factor: 1.0 },
  { code: "BCN", name: "Baja California", factor: 1.12 },
  { code: "BCS", name: "Baja California Sur", factor: 1.15 },
  { code: "CAM", name: "Campeche", factor: 1.1 },
  { code: "CHP", name: "Chiapas", factor: 1.1 },
  { code: "CHH", name: "Chihuahua", factor: 1.08 },
  { code: "CMX", name: "Ciudad de México", factor: 1.0 },
  { code: "COA", name: "Coahuila", factor: 1.06 },
  { code: "COL", name: "Colima", factor: 1.04 },
  { code: "DUR", name: "Durango", factor: 1.06 },
  { code: "GUA", name: "Guanajuato", factor: 1.0 },
  { code: "GRO", name: "Guerrero", factor: 1.06 },
  { code: "HID", name: "Hidalgo", factor: 1.0 },
  { code: "JAL", name: "Jalisco", factor: 1.02 },
  { code: "MEX", name: "Estado de México", factor: 1.0 },
  { code: "MIC", name: "Michoacán", factor: 1.03 },
  { code: "MOR", name: "Morelos", factor: 1.0 },
  { code: "NAY", name: "Nayarit", factor: 1.05 },
  { code: "NLE", name: "Nuevo León", factor: 1.05 },
  { code: "OAX", name: "Oaxaca", factor: 1.08 },
  { code: "PUE", name: "Puebla", factor: 1.0 },
  { code: "QUE", name: "Querétaro", factor: 1.0 },
  { code: "ROO", name: "Quintana Roo", factor: 1.12 },
  { code: "SLP", name: "San Luis Potosí", factor: 1.02 },
  { code: "SIN", name: "Sinaloa", factor: 1.08 },
  { code: "SON", name: "Sonora", factor: 1.1 },
  { code: "TAB", name: "Tabasco", factor: 1.08 },
  { code: "TAM", name: "Tamaulipas", factor: 1.06 },
  { code: "TLA", name: "Tlaxcala", factor: 1.0 },
  { code: "VER", name: "Veracruz", factor: 1.05 },
  { code: "YUC", name: "Yucatán", factor: 1.1 },
  { code: "ZAC", name: "Zacatecas", factor: 1.04 },
];
