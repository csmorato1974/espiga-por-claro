## Cambios solicitados en el documento

### 1. Retirar la palabra "Claro" de toda la landing
- `src/config/campaign.ts`: cambiar `"Claro TV+"` → `"TV+"` en nombres de planes, bullets, mensajes WhatsApp y `PLAN_LABEL`.
- `src/components/landing/LeadForm.tsx` (líneas 200-201): mismo reemplazo en los `SelectItem`.
- `src/components/chatbot/WhatsAppHeader.tsx`: cambiar `"Claro Bot"` y avatar `"CB"` → `"Asistente La Espiga"` / `"LE"`.

### 2. Colores corporativos La Espiga (ya aplicado)
La paleta verde/dorada/trigo ya está activa en `src/index.css`. Solo se aplicará un repaso para verificar que el Hero y CTAs respiren la línea gráfica de la espiga (mantener tokens actuales).

### 3. Botones WhatsApp en colores corporativos del WhatsApp
Cambiar los botones de "WhatsApp / Quiero mi plan por WhatsApp / Quiero este plan" para que usen verde WhatsApp (#25D366 / hover #128C7E) en vez del verde Espiga.
- Añadir tokens `--wa-brand` y `--wa-brand-dark` en `src/index.css` y mapearlos en `tailwind.config.ts`.
- Reemplazar `bg-primary text-primary-foreground hover:bg-primary-dark` por `bg-wa-brand text-white hover:bg-wa-brand-dark` en:
  - `Header.tsx`
  - `Hero.tsx` (CTA principal)
  - `Plans.tsx` (CTA de cada plan, manteniendo destaque del plan recomendado)
  - `FinalCTA.tsx`
  - `LeadForm.tsx` (botón de envío si aplica)
- Mantener el ícono `MessageCircle` de Lucide.

### 4. Botón flotante del Chat Bot más visible
`src/components/simulator/FloatingChatbotButton.tsx`: convertirlo en una píldora con ícono de robot (`Bot` de lucide-react) + texto **"Chat Bot"**, fondo verde Espiga con sombra fuerte y animación sutil de pulso. Mantener posición fija inferior derecha.

### 5. Sección Call To Action con QR + logo La Espiga
Crear `src/components/landing/QRCallout.tsx` y montarla en `Index.tsx` (después de `Hero` o antes de `FinalCTA`):
- Tarjeta destacada con fondo cream/dorado y borde verde.
- Headline: **"¿Quieres internet por S/. 39.50 al mes y S/. 30 de consumo gratis en La Espiga? Escanea este QR"**.
- QR generado con la librería `qrcode.react` (apuntando a la URL pública de la landing) acompañado del logo de La Espiga superpuesto al centro o al lado.
- CTA secundario WhatsApp debajo.
- Dependencia nueva: `qrcode.react`.

### Detalles técnicos
- Verde WhatsApp en HSL: `142 70% 49%` (brand) / `142 70% 38%` (dark).
- Mantener accesibilidad: contraste AA en botones (`text-white` sobre verde WhatsApp ✓).
- No tocar `client.ts`, `types.ts`, ni configuración Supabase.
- No se requieren cambios de backend ni migraciones.

### Archivos a modificar
- `src/config/campaign.ts`
- `src/components/landing/LeadForm.tsx`
- `src/components/chatbot/WhatsAppHeader.tsx`
- `src/index.css`
- `tailwind.config.ts`
- `src/components/landing/Header.tsx`
- `src/components/landing/Hero.tsx`
- `src/components/landing/Plans.tsx`
- `src/components/landing/FinalCTA.tsx`
- `src/components/simulator/FloatingChatbotButton.tsx`
- `src/components/landing/QRCallout.tsx` (nuevo)
- `src/pages/Index.tsx`
