/**
 * Campaña: La Espiga por Inkacel
 * --------------------------------------------------------------------------
 * Edita aquí los valores principales de la landing sin tocar componentes.
 * - Número de WhatsApp del asesor comercial (placeholder)
 * - Mensajes pre-rellenados según plan
 * - Precios y bullets de planes (PRECIOS PLACEHOLDER, EDITAR CON CLIENTE)
 * - Identificadores de campaña / origen
 *
 * Integraciones futuras (TODO):
 * - Google Analytics: dispara `gtag('event', 'lead_submit', { plan })`
 * - Meta Pixel:        `fbq('track', 'Lead', { value: 30, currency: 'PEN' })`
 * - Google Sheets:     enviar a Apps Script webhook
 * - Airtable:          POST a airtable.com/v0/{baseId}/Leads
 * - CRM comercial:     POST al endpoint del CRM del cliente
 * (ver `src/lib/whatsapp.ts` y `LeadForm.tsx` para los puntos de conexión)
 */

export const CAMPAIGN = {
  name: "La Espiga por Inkacel",
  origen: "QR Display La Espiga",

  // 🔧 EDITAR: número real del asesor comercial (formato internacional sin "+")
  whatsappNumber: "51999999999", // +51 999 999 999

  // Mensajes pre-rellenados de WhatsApp por contexto
  messages: {
    general:
      "Hola, vengo desde el QR de La Espiga y quiero información sobre internet desde S/30.",
    entrada: "Hola, estoy interesado en el Plan Entrada desde S/30.",
    intensivo: "Hola, estoy interesado en el Plan Intensivo.",
    completo: "Hola, estoy interesado en el Plan Completo.",
    callback: "Hola, vengo desde la landing La Espiga por Inkacel. Quisiera que un asesor me llame.",
    afterLead: (nombre: string, plan: string) =>
      `Hola, soy ${nombre}. Acabo de dejar mis datos en la landing La Espiga por Inkacel. Estoy interesado en el ${plan}.`,
  },
} as const;

export type PlanId = "entrada" | "intensivo" | "completo";

export interface PlanCard {
  id: PlanId;
  name: string;
  price: string;        // 🔧 PLACEHOLDER editable
  priceNote: string;
  tagline: string;
  bullets: string[];
  highlighted?: boolean;
  ctaLabel: string;
  whatsappKey: keyof typeof CAMPAIGN.messages;
}

// 🔧 PRECIOS PLACEHOLDER — confirmar con Inkacel antes de publicar
export const PLANS: PlanCard[] = [
  {
    id: "entrada",
    name: "Plan Entrada",
    price: "S/30",
    priceNote: "desde / mes",
    tagline: "Ideal para navegación básica",
    bullets: [
      "WhatsApp y redes sociales",
      "Consultas rápidas y mensajería",
      "Activación inmediata",
    ],
    ctaLabel: "Consultar este plan",
    whatsappKey: "entrada",
  },
  {
    id: "intensivo",
    name: "Plan Intensivo",
    price: "S/60",
    priceNote: "desde / mes",
    tagline: "Para familias o uso frecuente",
    bullets: [
      "Streaming en HD",
      "Videollamadas estables",
      "Mejor relación precio-beneficio",
    ],
    highlighted: true,
    ctaLabel: "Consultar este plan",
    whatsappKey: "intensivo",
  },
  {
    id: "completo",
    name: "Plan Completo",
    price: "S/90",
    priceNote: "desde / mes",
    tagline: "Para alto consumo",
    bullets: [
      "Más velocidad y estabilidad",
      "Varios dispositivos a la vez",
      "Streaming 4K y gaming",
    ],
    ctaLabel: "Consultar este plan",
    whatsappKey: "completo",
  },
];

export const PLAN_LABEL: Record<string, string> = {
  entrada: "Plan Entrada",
  intensivo: "Plan Intensivo",
  completo: "Plan Completo",
  no_seguro: "el plan que mejor me convenga",
};
