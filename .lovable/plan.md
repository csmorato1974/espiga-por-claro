## Reemplazo de marca: Claro → Inkacel

### 1. Logo
- Copiar `user-uploads://inkacel_logo_png_diseno_solo_marca_transparente_1024.png` a `src/assets/inkacel-logo.png`.
- En `src/components/landing/Logos.tsx`: renombrar `ClaroLogo` → `InkacelLogo`, mostrar el PNG real (`<img>`) en lugar del placeholder rojo "claro". Mantener `EspigaLogo` igual.

### 2. Paleta de marca (Inkacel = magenta/rosa + amarillo)
En `src/index.css`:
- `--primary`: magenta Inkacel (~`322 85% 55%`).
- `--primary-dark`: magenta más profundo (~`322 80% 42%`).
- `--primary-glow`: rosa coral claro (~`345 90% 70%`).
- `--accent`: amarillo Inkacel (~`46 95% 58%`) — reemplaza el dorado actual del acento.
- Renombrar tokens `--gradient-claro` → `--gradient-brand` y `--shadow-claro` → `--shadow-brand`. Actualizar las utilidades `.bg-gradient-claro` y `.shadow-claro` a las nuevas (o dejar alias para no romper nada). Comentarios "Claro" → "Inkacel".

### 3. Buscar y reemplazar referencias textuales
- `index.html`: title/description/og/twitter — cambiar "La Espiga × Claro" → "La Espiga por Inkacel" y "plan Claro" → "plan Inkacel".
- `src/config/campaign.ts`: `name`, mensajes (`callback`, `afterLead`), comentario de precios — sustituir "Claro" por "Inkacel".
- `src/components/landing/Header.tsx` y `Footer.tsx`: importar `InkacelLogo`, conservar el patrón "[EspigaLogo] por [InkacelLogo]" y cambiar "Campaña La Espiga por Claro" → "…por Inkacel".
- `src/components/landing/Hero.tsx`: "tu paquete Claro" → "tu paquete Inkacel".
- `src/components/landing/Plans.tsx`: "Tres planes Claro pensados para ti" → "Tres planes Inkacel pensados para ti".
- `src/components/landing/HowItWorks.tsx`: "la oferta Claro" → "la oferta Inkacel".
- `src/components/landing/BenefitCard.tsx`: "Contrata tu paquete Claro…" → "Contrata tu paquete Inkacel…".
- Reemplazar las clases `bg-gradient-claro` / `shadow-claro` que queden por las renombradas (`bg-gradient-brand` / `shadow-brand`) en Hero, Plans, FinalCTA, BenefitCard, LeadForm, HowItWorks, EspigaProductsIllustration, Header.

### 4. Verificación
- `rg -i claro` debe quedar vacío.
- Revisar preview: header, hero, planes, footer y chips del ilustrativo se ven con la nueva paleta magenta/amarilla y el logo Inkacel.

### Notas
- No se tocan funcionalidad, formularios, ni integración con WhatsApp más allá del texto del mensaje.
- La paleta cambia globalmente porque `--primary` se usa en CTAs, badges y gradientes; el rojo Claro desaparece por completo.
