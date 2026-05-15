## Medición de conversiones

Centralizar el tracking en un solo helper que guarda eventos en Lovable Cloud (consultable después) y, si están presentes, también dispara `gtag`/`fbq` para integraciones futuras de GA4/Meta.

### 1. Backend: tabla `analytics_events`
Migración en Supabase con:
- `event_name` (texto, p. ej. `cta_click`, `whatsapp_click`, `lead_submit`)
- `source` (texto, ubicación: `header`, `hero_primary`, `plan_plan_400`, `qr_callout`, `final_whatsapp`, `after_lead`, `lead_form`, etc.)
- `metadata` (jsonb, opcional: plan, utm, etc.)
- `session_id` (uuid, generado por cliente y persistido en `localStorage` para hilar la sesión)
- `path`, `referrer`, `user_agent`
- `utm_source`, `utm_medium`, `utm_campaign`, `local`
- `created_at`
- RLS:
  - INSERT abierto a `anon` y `authenticated` (cualquiera puede registrar eventos desde la landing)
  - SELECT solo para `authenticated` (lectura desde el dashboard de Cloud / consultas)

### 2. Helper `src/lib/analytics.ts`
Exporta `trackEvent(eventName, source, metadata?)` que:
- Genera/recupera `session_id` desde `localStorage` (`la_espiga_sid`).
- Lee UTMs vía `readUtm()` ya existente.
- Inserta en `analytics_events` (fire-and-forget, sin bloquear UI; ignora errores en consola DEV).
- Llama además a `window.gtag?.("event", eventName, { source, ...metadata })` y `window.fbq?.("trackCustom", eventName, { source, ...metadata })` si existen.
- Reemplaza/usa `trackWhatsAppClick` para que delegue en `trackEvent("whatsapp_click", source, …)`.

### 3. Eventos a instrumentar
- **`whatsapp_click`** (ya parcialmente cableado): `header`, `hero_primary`, `plan_<id>`, `qr_callout`, `final_whatsapp`, `after_lead`, `lead_form_followup`. Migrar todos los `trackWhatsAppClick` actuales para que pasen por el nuevo helper.
- **`cta_click`** para botones no-WhatsApp:
  - `Hero` → "Ver planes disponibles"
  - `FinalCTA` → "Solicitar llamada"
  - `Plans` → click en cada tarjeta de plan (además del WhatsApp interno).
  - `QRCallout` → click en el QR / botón asociado.
- **`lead_submit`** disparado en `LeadForm.onSubmit` tras `insert` exitoso (con `plan_interes`, `distrito`, utm).
- **`page_view`** automático al montar `Index` y `Chatbot` con la ruta actual.
- **`chatbot_open`** al hacer click en el botón flotante (`FloatingChatbotButton`).

### 4. Cómo verás las conversiones
- En **Lovable Cloud → Database** podrás consultar `analytics_events` (filtrar por `event_name`, `source`, fecha).
- Vista SQL sugerida (incluida en la migración) `analytics_conversion_summary` que agrupa por día/evento/fuente para revisar conversiones de un vistazo (totales y únicos por `session_id`).
- Si más adelante conectas GA4 o Meta Pixel solo agregando los snippets en `index.html`, los eventos viajarán automáticamente sin tocar código.

### Archivos a tocar
- Migración: nueva tabla + vista + RLS.
- Nuevo: `src/lib/analytics.ts`.
- Editar: `src/lib/whatsapp.ts` (delegar `trackWhatsAppClick`), `src/components/landing/{Hero,Plans,FinalCTA,QRCallout,Header,LeadForm}.tsx`, `src/components/simulator/FloatingChatbotButton.tsx`, `src/pages/{Index,Chatbot}.tsx`.

### Notas
- No se rompen los componentes: el helper es no-bloqueante.
- No requiere claves de terceros; queda preparado para GA/Meta cuando los configures.
