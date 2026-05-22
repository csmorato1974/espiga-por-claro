## Cambios en la landing

### 1. Número de WhatsApp
En `src/config/campaign.ts`, cambiar `whatsappNumber` de `"51999999999"` a `"51983058468"`.

### 2. Reemplazar oferta destacada S/39.50 → nueva promo 2Play 300Mbps
La oferta principal pasa a ser: **2Play 300Mbps — Promo 600Mbps por 6 meses a S/42**.

Actualizaciones:
- **`src/components/landing/Hero.tsx`**: cambiar el precio destacado `S/39.50` por `S/42` y el copy: "Internet desde S/42 para clientes de La Espiga" + chip flotante "Internet desde S/42".
- **`src/config/campaign.ts` › `messages.general`**: actualizar el texto pre-rellenado a la nueva promo (S/42, 2Play 300Mbps, 600Mbps x 6 meses).
- **`src/config/campaign.ts` › `PLANS`**: reemplazar el plan actual `plan_200` (1Play 200MB, S/39.50) por el nuevo plan principal:
  - id: `plan_2play_300`
  - name: "2Play 300Mbps"
  - price: "S/42"
  - priceNote: "x 6 meses promo"
  - tagline: "Promo 600Mbps por 6 meses"
  - bullets: "300Mbps FTTH (600Mbps por 6 meses promo)", "Incluye TV+", "Instalación incluida"
  - whatsappKey + mensaje nuevo en `CAMPAIGN.messages`
- Actualizar `PLAN_LABEL` y eliminar referencias a `plan_200` antiguo (o renombrar la key conservando posición).
- Revisar `src/components/simulator/scenarios.ts` y `src/lib/chatbot/*` por menciones a `S/39.50` o `plan_200` y alinear.

### 3. "MB" → "Mbps" en todo el proyecto
Reemplazar la unidad **MB** por **Mbps** en todos los textos visibles (bullets de planes, nombres como "1Play 200MB" → "1Play 200Mbps", "400MB", "1000MB", etc.), incluyendo:
- `src/config/campaign.ts` (PLANS, PLAN_LABEL, messages)
- `src/components/landing/*` si hay textos hardcodeados
- `src/components/simulator/scenarios.ts`
- `src/lib/chatbot/config.ts` y `flow.ts`

No se tocan `MessageBubble`, lógica de negocio ni nada fuera de copy/configuración.

### Notas técnicas
- No se modifican logos, ni el flujo del chatbot, ni edge functions.
- Los `whatsappKey` deben quedar consistentes entre `PLANS` y `CAMPAIGN.messages` para no romper `buildWhatsAppLink`.
