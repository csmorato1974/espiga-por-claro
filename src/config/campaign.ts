/**
 * Campaña: La Espiga por Inkacel
 * --------------------------------------------------------------------------
 * Edita aquí los valores principales de la landing sin tocar componentes.
 *
 * Flujo del bot de WhatsApp (configurado fuera del código por el cliente):
 *   1) Pedir dirección para validar tecnología/cobertura y oferta aplicable.
 *   2) Pedir DNI para confirmar planes a los que el cliente accede.
 *   3) Escalar a un supervisor si el cliente lo solicita.
 */

export const CAMPAIGN = {
  name: "La Espiga por Inkacel",
  origen: "QR Display La Espiga",

  // 🔧 Número real del asesor comercial (formato internacional sin "+")
  whatsappNumber: "51983058468", // +51 983 058 468

  // Mensajes pre-rellenados de WhatsApp por contexto
  messages: {
    general:
      "Hola, vengo desde el QR de La Espiga y quiero información sobre el 2Play 300Mbps con promo de 600Mbps por 3 meses a S/42.",
    plan_2play_300:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 2Play 300Mbps (promo 600Mbps por 3 meses) a S/42.",
    plan_400:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 1Play 400Mbps + Repetidor a S/55 promocional.",
    plan_2play_200:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 2Play 200Mbps + TV+ a S/75 promocional.",
    plan_2play_400:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 2Play 400Mbps + TV+ + Repetidor a S/85 promocional.",
    callback:
      "Hola, vengo desde la landing La Espiga por Inkacel. Quisiera que un asesor me llame.",
    afterLead: (nombre: string, plan: string) =>
      `Hola, soy ${nombre}. Acabo de dejar mis datos en la landing La Espiga por Inkacel. Estoy interesado en el ${plan}.`,
  },
} as const;

export type PlanId =
  | "plan_2play_300"
  | "plan_400"
  | "plan_2play_200"
  | "plan_2play_400";

export interface PlanCard {
  id: PlanId;
  name: string;
  price: string;        // precio promocional destacado
  priceNote: string;    // duración + cargo regular
  tagline: string;
  bullets: string[];
  highlighted?: boolean;
  ctaLabel: string;
  whatsappKey: keyof typeof CAMPAIGN.messages;
}

export const PLANS: PlanCard[] = [
  {
    id: "plan_2play_300",
    name: "2Play 300Mbps",
    price: "S/42",
    priceNote: "x 3 meses promo",
    tagline: "Promo 600Mbps por 3 meses",
    bullets: [
      "300Mbps FTTH (600Mbps por 3 meses promo)",
      "Incluye TV+",
      "Instalación incluida",
    ],
    highlighted: true,
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_2play_300",
  },
  {
    id: "plan_400",
    name: "1Play 400Mbps + Repetidor",
    price: "S/55",
    priceNote: "x 6 meses · luego S/89",
    tagline: "El más elegido por familias",
    bullets: [
      "400Mbps FTTH (1000Mbps por 12 meses promo)",
      "Incluye 1 repetidor WiFi",
      "Cargo regular S/89 desde el mes 7",
    ],
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_400",
  },
  {
    id: "plan_2play_200",
    name: "2Play 200Mbps + TV+",
    price: "S/75",
    priceNote: "x 4 meses · luego S/150",
    tagline: "Internet + TV con 2 decos",
    bullets: [
      "200Mbps FTTH (400Mbps por 6 meses promo)",
      "TV+ Estándar Pro con 2 decodificadores",
      "Cargo regular S/150 desde el mes 5",
    ],
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_2play_200",
  },
  {
    id: "plan_2play_400",
    name: "2Play 400Mbps + TV+ + Repetidor",
    price: "S/85",
    priceNote: "x 4 meses · luego S/170",
    tagline: "El combo completo para alto consumo",
    bullets: [
      "400Mbps FTTH (1000Mbps por 12 meses promo)",
      "TV+ Estándar Pro con 2 decodificadores",
      "Incluye 1 repetidor WiFi",
      "Cargo regular S/170 desde el mes 5",
    ],
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_2play_400",
  },
];

export const PLAN_LABEL: Record<string, string> = {
  plan_2play_300: "2Play 300Mbps (promo 600Mbps x 3 meses)",
  plan_400: "1Play 400Mbps + Repetidor",
  plan_2play_200: "2Play 200Mbps + TV+",
  plan_2play_400: "2Play 400Mbps + TV+ + Repetidor",
  no_seguro: "el plan que mejor me convenga",
};
