import { CAMPAIGN } from "@/config/campaign";

/**
 * Construye un deep link de WhatsApp con mensaje pre-rellenado.
 * TODO tracking: disparar evento `whatsapp_click` con la `key` recibida
 *   - Google Analytics: gtag('event', 'whatsapp_click', { key })
 *   - Meta Pixel:       fbq('trackCustom', 'WhatsAppClick', { key })
 */
export function buildWhatsAppLink(
  key: keyof typeof CAMPAIGN.messages = "general",
  customMessage?: string,
): string {
  const raw = customMessage ?? (CAMPAIGN.messages[key] as string);
  const text = encodeURIComponent(raw);
  return `https://wa.me/${CAMPAIGN.whatsappNumber}?text=${text}`;
}

export function trackWhatsAppClick(key: string) {
  // TODO conectar:
  // window.gtag?.("event", "whatsapp_click", { key });
  // window.fbq?.("trackCustom", "WhatsAppClick", { key });
  if (import.meta.env.DEV) {
    console.info("[tracking] whatsapp_click", { key });
  }
}
