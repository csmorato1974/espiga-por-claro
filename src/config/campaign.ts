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

  // 🔧 EDITAR: número real del asesor comercial (formato internacional sin "+")
  whatsappNumber: "51999999999", // +51 999 999 999

  // Mensajes pre-rellenados de WhatsApp por contexto
  messages: {
    general:
      "Hola, vengo desde el QR de La Espiga y quiero información sobre internet desde S/39.50.",
    plan_200:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 1Play 200MB a S/39.50 promocional.",
    plan_400:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 1Play 400MB + Repetidor a S/55 promocional.",
    plan_2play_200:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 2Play 200MB + Claro TV+ a S/75 promocional.",
    plan_2play_400:
      "Hola, vengo del QR de La Espiga. Me interesa el plan 2Play 400MB + Claro TV+ + Repetidor a S/85 promocional.",
    callback:
      "Hola, vengo desde la landing La Espiga por Inkacel. Quisiera que un asesor me llame.",
    afterLead: (nombre: string, plan: string) =>
      `Hola, soy ${nombre}. Acabo de dejar mis datos en la landing La Espiga por Inkacel. Estoy interesado en el ${plan}.`,
  },
} as const;

export type PlanId =
  | "plan_200"
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
    id: "plan_200",
    name: "1Play 200MB",
    price: "S/39.50",
    priceNote: "x 4 meses · luego S/69",
    tagline: "Internet en casa para empezar",
    bullets: [
      "200MB FTTH (400MB por 12 meses promo)",
      "Instalación incluida",
      "Cargo regular S/69 desde el mes 5",
    ],
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_200",
  },
  {
    id: "plan_400",
    name: "1Play 400MB + Repetidor",
    price: "S/55",
    priceNote: "x 6 meses · luego S/89",
    tagline: "El más elegido por familias",
    bullets: [
      "400MB FTTH (1000MB por 12 meses promo)",
      "Incluye 1 repetidor WiFi",
      "Cargo regular S/89 desde el mes 7",
    ],
    highlighted: true,
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_400",
  },
  {
    id: "plan_2play_200",
    name: "2Play 200MB + Claro TV+",
    price: "S/75",
    priceNote: "x 4 meses · luego S/150",
    tagline: "Internet + TV con 2 decos",
    bullets: [
      "200MB FTTH (400MB por 6 meses promo)",
      "Claro TV+ Estándar Pro con 2 decodificadores",
      "Cargo regular S/150 desde el mes 5",
    ],
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_2play_200",
  },
  {
    id: "plan_2play_400",
    name: "2Play 400MB + Claro TV+ + Repetidor",
    price: "S/85",
    priceNote: "x 4 meses · luego S/170",
    tagline: "El combo completo para alto consumo",
    bullets: [
      "400MB FTTH (1000MB por 12 meses promo)",
      "Claro TV+ Estándar Pro con 2 decodificadores",
      "Incluye 1 repetidor WiFi",
      "Cargo regular S/170 desde el mes 5",
    ],
    ctaLabel: "Quiero este plan",
    whatsappKey: "plan_2play_400",
  },
];

export const PLAN_LABEL: Record<string, string> = {
  plan_200: "1Play 200MB",
  plan_400: "1Play 400MB + Repetidor",
  plan_2play_200: "2Play 200MB + Claro TV+",
  plan_2play_400: "2Play 400MB + Claro TV+ + Repetidor",
  no_seguro: "el plan que mejor me convenga",
};
