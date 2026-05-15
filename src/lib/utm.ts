/**
 * Lee los parámetros UTM de la URL para attribuir el lead a la campaña QR.
 * Por ejemplo: ?utm_source=qr&utm_medium=display&utm_campaign=espiga_inkacel&local=miraflores
 */
export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  local: string | null;
}

export function readUtm(): UtmParams {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null, local: null };
  }
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source: sp.get("utm_source"),
    utm_medium: sp.get("utm_medium"),
    utm_campaign: sp.get("utm_campaign"),
    local: sp.get("local"),
  };
}
