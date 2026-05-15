## Actualizar promo con datos del documento

### 1. Planes (`src/config/campaign.ts`)
Reemplazar los 3 planes actuales por los **4 planes del documento**, manteniendo el tipo `PlanCard` (extender `priceNote` y `bullets` para acomodar cargo regular, descuento y promo de velocidad).

| id | name | price | priceNote | bullets |
|---|---|---|---|---|
| `plan_200` | 1Play 200MB | S/39.50 | x 4 meses · luego S/69 | "200MB de internet (400MB por 12 meses promo)", "Instalación FTTH", "Cargo regular S/69 desde el mes 5" |
| `plan_400` | 1Play 400MB + Repetidor | S/55 | x 6 meses · luego S/89 | "400MB FTTH (1000MB por 12 meses promo)", "Incluye 1 repetidor WiFi", "Cargo regular S/89 desde el mes 7" |
| `plan_2play_200` | 2Play 200MB + Claro TV+ | S/75 | x 4 meses · luego S/150 | "200MB FTTH (400MB por 6 meses promo)", "Claro TV+ Estándar Pro con 2 decos", "Cargo regular S/150 desde el mes 5" |
| `plan_2play_400` | 2Play 400MB + Claro TV+ + Repetidor | S/85 | x 4 meses · luego S/170 | "400MB FTTH (1000MB por 12 meses promo)", "Claro TV+ Estándar Pro con 2 decos", "Incluye 1 repetidor WiFi", "Cargo regular S/170 desde el mes 5" |

- `highlighted: true` en `plan_400` (mejor balance precio/beneficio).
- Renombrar `PlanId`/keys de mensajes (`entrada/intensivo/completo` → nuevos ids); actualizar `messages` y `PLAN_LABEL` en consecuencia.
- Mensajes WhatsApp por plan: "Hola, vengo del QR de La Espiga y quiero el plan **{nombre}** (S/{precio} promocional)."

### 2. Hero (`src/components/landing/Hero.tsx`)
- Cambiar "Internet desde **S/30**" → "Internet desde **S/39.50**".
- Sub-copy: usar texto del doc — "Escanea, elige tu plan y recibe atención inmediata por WhatsApp. Además, al contratar tu paquete de Internet recibes **S/30 de consumo gratis en La Espiga**."

### 3. Plans grid (`src/components/landing/Plans.tsx`)
- `md:grid-cols-3` → `md:grid-cols-2 lg:grid-cols-4` para encajar 4 tarjetas.
- Subtítulo: "Cuatro planes Inkacel pensados para ti".

### 4. Beneficio + chips
- `BenefitCard.tsx`: ya menciona S/30 → ajustar texto a "Contrata tu paquete de Internet y recibe S/30 de consumo gratis en La Espiga." (quitar "Inkacel" del verbo, suena más fluido).
- `EspigaProductsIllustration.tsx`: chip inferior "Internet desde S/30" → "Internet desde S/39.50".

### 5. Bot WhatsApp (`src/lib/whatsapp.ts` / mensajes)
Añadir guion del bot del documento como mensaje `general` ampliado (3 preguntas) o, más limpio, mantener `general` corto pero documentar el flujo en un comentario para que el asesor lo conteste manual:
```
1) Dirección para validar tecnología y oferta
2) DNI para confirmar planes disponibles
3) Escalar a supervisor si lo solicita
```
(Solo comentario; el bot real lo configura el cliente fuera del código.)

### 6. SEO (`index.html`)
- Title/description/og/twitter: "S/30" → "S/39.50".

### 7. Verificación
- `rg "S/30"` queda solo en las menciones del **beneficio** en La Espiga (no en internet).
- Preview: hero, 4 cards alineadas en desktop / 2 col en tablet / 1 col en mobile, footer y chips coherentes.

### Notas
- No se toca paleta, logos ni autenticación.
- "Claro TV+" se conserva literal porque es el nombre comercial del producto incluido (no la marca de la promo).
