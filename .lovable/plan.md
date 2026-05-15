## Eliminar secciones QR y Formulario de contacto

### Cambios en `src/pages/Index.tsx`
- Quitar import de `QRCallout` y `LeadSection`.
- Quitar `<QRCallout />` y `<LeadSection />` del `<main>`.

### Archivos a eliminar
- `src/components/landing/QRCallout.tsx`
- `src/components/landing/LeadSection.tsx`
- `src/components/landing/LeadForm.tsx` (sólo usado por LeadSection)

### Limpieza de referencias
- Revisar `Header.tsx`, `Hero.tsx`, `FinalCTA.tsx` y cualquier enlace `#formulario` o `#qr`. Si existen, redirigir a `#planes` (o WhatsApp) o eliminar el botón según el caso.
- Dependencia `qrcode.react` queda sin uso; se puede dejar en `package.json` (no afecta runtime) o removerla.

### Lo que NO cambia
- Tracking, planes, hero, beneficios, how it works, trust strip, footer, chatbot flotante.