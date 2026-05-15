import { supabase } from "@/integrations/supabase/client";
import { readUtm } from "@/lib/utm";

/**
 * Helper unificado de medición.
 * - Persiste eventos en `analytics_events` (Lovable Cloud).
 * - Reenvía a window.gtag y window.fbq si están disponibles (GA4 / Meta Pixel).
 * - No bloquea la UI: fire-and-forget.
 */

const SESSION_KEY = "la_espiga_sid";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let sid = window.localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      window.localStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return null;
  }
}

export type EventName =
  | "page_view"
  | "cta_click"
  | "whatsapp_click"
  | "lead_submit"
  | "chatbot_open"
  | "plan_view";

export function trackEvent(
  eventName: EventName | string,
  source?: string,
  metadata: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;

  const utm = readUtm();
  const session_id = getSessionId();

  const payload = {
    event_name: eventName,
    source: source ?? null,
    metadata: metadata as never,
    session_id,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    local: utm.local,
  };

  // 1) Cloud (no esperar)
  void supabase
    .from("analytics_events")
    .insert(payload)
    .then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn("[analytics] insert error", error);
      }
    });

  // 2) GA4 si está disponible
  try {
    window.gtag?.("event", eventName, { source, ...metadata });
  } catch {
    /* noop */
  }

  // 3) Meta Pixel si está disponible
  try {
    window.fbq?.("trackCustom", eventName, { source, ...metadata });
  } catch {
    /* noop */
  }

  if (import.meta.env.DEV) {
    console.info("[analytics]", eventName, source, metadata);
  }
}

export function trackPageView(path?: string) {
  trackEvent("page_view", path ?? window.location.pathname);
}
