## Landing "La Espiga × Claro" — Plan

Landing page de una sola página, mobile-first, para una campaña de captación de leads desde QR físicos en locales de La Espiga, redirigiendo a WhatsApp y guardando leads reales en Lovable Cloud.

### Identidad visual

- **Paleta principal Claro**: rojo (#DA291C aprox), blanco, negro, grises.
- **Acentos La Espiga**: crema, dorado suave, tonos trigo/café, textura sutil tipo papel/panadería.
- **Tipografía**: sans-serif moderna (Inter o similar), titulares grandes y muy legibles.
- **Estilo**: limpio, comercial, con bloques rojos y tarjetas blancas con bordes cálidos. Co-branding equilibrado: Claro domina, La Espiga acompaña.
- Diseñado primero para 360–414px, luego escala a tablet/desktop.

### Estructura de la página (single page con anclas)

1. **Header sticky** con co-branding "Claro × La Espiga" y un CTA WhatsApp pequeño.
2. **Hero**
   - Título: "Internet desde S/30 para clientes de La Espiga"
   - Subtítulo con el beneficio de S/30 gratis.
   - Mockup ilustrado de celular escaneando QR (SVG/ilustración sencilla, sin foto stock).
   - Botón rojo principal "Quiero mi plan por WhatsApp" + secundario "Ver planes disponibles".
   - Badge "Promo activa desde el QR".
3. **Bloque de beneficio promocional** — tarjeta destacada "S/30 de consumo gratis en La Espiga al contratar Claro" + letra chica.
4. **Sección de planes** — 3 tarjetas: Entrada (S/30), Intensivo (S/60 placeholder), Completo (S/90 placeholder). Precios marcados como editables con comentario en código. Cada botón abre WhatsApp con mensaje específico del plan.
5. **Mockup del display físico con QR** — tarjeta visual que simula el cartel impreso, con QR placeholder (SVG) y los textos del brief.
6. **Cómo funciona** — 4 pasos numerados con íconos (lucide-react): Escanea, Elige, Deja datos, WhatsApp.
7. **Formulario de captura de lead** — Nombre, Celular, Distrito, Plan de interés (select con 4 opciones), botón "Solicitar contacto". Validación con zod. Tras enviar: estado de éxito + botón "Continuar por WhatsApp" con mensaje pre-rellenado según plan elegido.
8. **Bloque de confianza** — 5 frases cortas con íconos.
9. **CTA final** — "¿Listo para tener internet desde S/30?" + botones WhatsApp / "Solicitar llamada" (que hace scroll al formulario).
10. **Footer** mínimo con co-branding y disclaimer.

### Funcionalidad

- **WhatsApp**: helper `buildWhatsAppLink(plan)` con número placeholder editable en un único archivo `src/config/campaign.ts` (número, mensajes por plan, nombre de campaña, origen). Toda la landing consume desde ahí.
- **Formulario**: react-hook-form + zod. Validación cliente con mensajes claros en español.
- **Lead storage (Lovable Cloud)**:
  - Tabla `leads` con campos: id, nombre, celular, distrito, plan_interes, origen ("QR Display La Espiga"), campania ("La Espiga x Claro"), estado ("Nuevo lead"), created_at.
  - RLS habilitado: política pública de INSERT (cualquiera puede crear lead desde la landing); SELECT solo para usuarios autenticados (admins futuros). Sin update/delete públicos.
  - Inserción directa desde el cliente con el SDK ya integrado en Lovable Cloud.
- **Tracking**: parámetros UTM en URL (`?utm_source=qr&utm_medium=display&utm_campaign=espiga_claro&local=...`) leídos en el cliente y guardados junto al lead. Comentarios `// TODO conectar:` para Google Analytics, Meta Pixel, Google Sheets, Airtable, CRM.
- **Toasts** con sonner para éxito/error del formulario.
- **Accesibilidad**: contraste alto, foco visible, labels asociados, alt text.
- **Responsive**: grid 1 columna en mobile, 3 columnas en planes/pasos a partir de md.

### Detalles técnicos

- Stack actual: React + Vite + Tailwind + shadcn/ui (ya disponible).
- Tokens HSL en `index.css` y `tailwind.config.ts`: añadir `--claro-red`, `--claro-red-dark`, `--espiga-cream`, `--espiga-gold`, `--espiga-wheat`, gradientes y sombras.
- Componentes nuevos en `src/components/landing/`: `Header`, `Hero`, `BenefitCard`, `Plans`, `DisplayMockup`, `HowItWorks`, `LeadForm`, `TrustStrip`, `FinalCTA`, `Footer`.
- Helpers en `src/lib/whatsapp.ts` y configuración en `src/config/campaign.ts`.
- Página `src/pages/Index.tsx` reemplazada y compone las secciones.
- Lovable Cloud se activa para crear la tabla `leads` con la migración correspondiente y políticas RLS.

### Lo que el usuario podrá editar fácilmente

- Número de WhatsApp y mensajes por plan en `src/config/campaign.ts`.
- Precios y bullets de planes en el mismo archivo de config.
- Textos del display QR y copys principales con comentarios indicando la sección.
- Variables CSS de color para ajustar branding sin tocar componentes.

### Fuera de alcance (no incluido)

- Panel admin para ver leads (los leads quedan en la tabla, visibles desde Lovable Cloud → Database).
- Integración real con Google Analytics, Meta Pixel, Sheets, Airtable o CRM (solo se dejan TODOs y la estructura lista).
- Auth de usuarios finales (no aplica a esta landing).
