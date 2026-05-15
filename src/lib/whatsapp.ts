import { CAMPAIGN } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";

/**
 * Construye un deep link de WhatsApp con mensaje pre-rellenado.
 */
export function buildWhatsAppLink(
  key: keyof typeof CAMPAIGN.messages = "general",
  customMessage?: string,
): string {
  const raw = customMessage ?? (CAMPAIGN.messages[key] as string);
  const text = encodeURIComponent(raw);
  return `https://wa.me/${CAMPAIGN.whatsappNumber}?text=${text}`;
}

export function trackWhatsAppClick(source: string, metadata: Record<string, unknown> = {}) {
  trackEvent("whatsapp_click", source, metadata);
}
