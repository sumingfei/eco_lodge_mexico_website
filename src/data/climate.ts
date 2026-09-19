/**
 * Reference climate data for the water & solar estimator, by state and city.
 *
 * `rainMm`  — approximate mean annual precipitation (mm).
 * `ghi`     — approximate mean daily global horizontal irradiance (kWh/m²/day).
 *
 * Values are rounded long-term averages compiled from public climate normals
 * (SMN/CONAGUA) and solar atlases (NASA POWER, Global Solar Atlas). They are
 * for preliminary estimates only. TODO: replace with the exact figures for
 * the localities the company serves; the first city of each state is used as
 * that state's fallback.
 */
export type ClimateCity = { name: string; rainMm: number; ghi: number };

export const climateByState: Record<string, ClimateCity[]> = {
  AGU: [{ name: "Aguascalientes", rainMm: 500, ghi: 5.9 }],
  BCN: [
    { name: "Tijuana", rainMm: 230, ghi: 5.4 },
    { name: "Mexicali", rainMm: 80, ghi: 5.9 },
    { name: "Ensenada", rainMm: 280, ghi: 5.5 },
  ],
  BCS: [
    { name: "La Paz", rainMm: 180, ghi: 6.0 },
    { name: "Los Cabos", rainMm: 250, ghi: 6.0 },
    { name: "Loreto", rainMm: 150, ghi: 6.0 },
  ],
  CAM: [{ name: "Campeche", rainMm: 1200, ghi: 5.3 }],
  CHP: [
    { name: "Tuxtla Gutiérrez", rainMm: 950, ghi: 5.4 },
    { name: "San Cristóbal de las Casas", rainMm: 1100, ghi: 5.0 },
    { name: "Tapachula", rainMm: 2500, ghi: 5.0 },
  ],
  CHH: [
    { name: "Chihuahua", rainMm: 400, ghi: 6.0 },
    { name: "Ciudad Juárez", rainMm: 250, ghi: 6.0 },
  ],
  CMX: [{ name: "Ciudad de México", rainMm: 850, ghi: 5.3 }],
  COA: [
    { name: "Saltillo", rainMm: 370, ghi: 5.6 },
    { name: "Torreón", rainMm: 250, ghi: 6.0 },
  ],
  COL: [
    { name: "Colima", rainMm: 950, ghi: 5.5 },
    { name: "Manzanillo", rainMm: 900, ghi: 5.6 },
  ],
  DUR: [{ name: "Durango", rainMm: 500, ghi: 5.8 }],
  GUA: [
    { name: "León", rainMm: 650, ghi: 5.8 },
    { name: "Guanajuato", rainMm: 700, ghi: 5.8 },
    { name: "San Miguel de Allende", rainMm: 550, ghi: 5.8 },
  ],
  GRO: [
    { name: "Acapulco", rainMm: 1300, ghi: 5.6 },
    { name: "Chilpancingo", rainMm: 900, ghi: 5.5 },
    { name: "Zihuatanejo", rainMm: 1100, ghi: 5.6 },
  ],
  HID: [{ name: "Pachuca", rainMm: 400, ghi: 5.5 }],
  JAL: [
    { name: "Guadalajara", rainMm: 1000, ghi: 5.6 },
    { name: "Puerto Vallarta", rainMm: 1300, ghi: 5.5 },
    { name: "Chapala", rainMm: 850, ghi: 5.7 },
  ],
  MEX: [
    { name: "Toluca", rainMm: 800, ghi: 5.3 },
    { name: "Valle de Bravo", rainMm: 1100, ghi: 5.4 },
  ],
  MIC: [
    { name: "Morelia", rainMm: 800, ghi: 5.5 },
    { name: "Pátzcuaro", rainMm: 1000, ghi: 5.4 },
  ],
  MOR: [
    { name: "Cuernavaca", rainMm: 1100, ghi: 5.6 },
    { name: "Tepoztlán", rainMm: 1100, ghi: 5.6 },
  ],
  NAY: [
    { name: "Tepic", rainMm: 1200, ghi: 5.4 },
    { name: "Sayulita", rainMm: 1300, ghi: 5.5 },
  ],
  NLE: [{ name: "Monterrey", rainMm: 600, ghi: 5.0 }],
  OAX: [
    { name: "Oaxaca de Juárez", rainMm: 700, ghi: 5.6 },
    { name: "Puerto Escondido", rainMm: 1000, ghi: 5.6 },
    { name: "Huatulco", rainMm: 900, ghi: 5.7 },
  ],
  PUE: [
    { name: "Puebla", rainMm: 900, ghi: 5.5 },
    { name: "Cholula", rainMm: 900, ghi: 5.5 },
  ],
  QUE: [
    { name: "Querétaro", rainMm: 550, ghi: 5.7 },
    { name: "Tequisquiapan", rainMm: 500, ghi: 5.7 },
  ],
  ROO: [
    { name: "Cancún", rainMm: 1300, ghi: 5.2 },
    { name: "Playa del Carmen", rainMm: 1250, ghi: 5.2 },
    { name: "Tulum", rainMm: 1200, ghi: 5.2 },
    { name: "Bacalar", rainMm: 1300, ghi: 5.2 },
  ],
  SLP: [{ name: "San Luis Potosí", rainMm: 400, ghi: 5.7 }],
  SIN: [
    { name: "Culiacán", rainMm: 650, ghi: 5.7 },
    { name: "Mazatlán", rainMm: 800, ghi: 5.6 },
  ],
  SON: [
    { name: "Hermosillo", rainMm: 350, ghi: 6.0 },
    { name: "Puerto Peñasco", rainMm: 90, ghi: 6.0 },
  ],
  TAB: [{ name: "Villahermosa", rainMm: 2100, ghi: 4.9 }],
  TAM: [
    { name: "Tampico", rainMm: 1000, ghi: 5.0 },
    { name: "Reynosa", rainMm: 550, ghi: 5.2 },
  ],
  TLA: [{ name: "Tlaxcala", rainMm: 700, ghi: 5.4 }],
  VER: [
    { name: "Veracruz", rainMm: 1700, ghi: 5.0 },
    { name: "Xalapa", rainMm: 1500, ghi: 4.6 },
  ],
  YUC: [
    { name: "Mérida", rainMm: 1000, ghi: 5.3 },
    { name: "Valladolid", rainMm: 1150, ghi: 5.2 },
  ],
  ZAC: [{ name: "Zacatecas", rainMm: 450, ghi: 5.9 }],
};

export function getClimate(stateCode: string, city?: string): ClimateCity | undefined {
  const cities = climateByState[stateCode];
  if (!cities) return undefined;
  return cities.find((c) => c.name === city) ?? cities[0];
}
