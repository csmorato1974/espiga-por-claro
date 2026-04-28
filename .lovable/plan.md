## Cambios al Header y al Hero

### 1. Header — actualizar branding
En `src/components/landing/Header.tsx`, reemplazar el bloque de logos `Claro × Espiga` por:

```
[EspigaLogo]  por  [ClaroLogo]
```

Lectura: "La Espiga por Claro". Mantener tamaños actuales (`h-6 sm:h-7`) y la palabra "por" en gris/muted.

### 2. Hero — nueva ilustración alusiva a La Espiga
Reemplazar `PhoneScanIllustration` por un nuevo componente **`EspigaProductsIllustration`** que evoque el consumo de productos de panadería de La Espiga, manteniendo el guiño a la conectividad Claro.

**Archivos:**
- Crear `src/components/landing/EspigaProductsIllustration.tsx`
- Editar `src/components/landing/Hero.tsx` (cambiar import y uso)
- Eliminar `src/components/landing/PhoneScanIllustration.tsx` y `src/components/landing/QrPlaceholder.tsx` (ya no se usan en ningún sitio)

**Diseño de la nueva ilustración (SVG/emoji + Tailwind, sin imágenes externas):**
- Una **bolsa de papel kraft** (estilo panadería) en el centro, con el rótulo "La Espiga" y una espiga de trigo estilizada
- Sobresaliendo de la bolsa: una **baguette** y un **pan redondo** dibujados con SVG simples
- Una **taza de café humeante** flotando a un lado
- Chips flotantes que conectan el contexto con la promo:
  - "🥖 +S/30 en La Espiga"
  - "📶 Internet desde S/30"
- Glow de fondo con `bg-gradient-warm` (tonos cream/gold) para reforzar la identidad espiga
- Pequeñas espigas de trigo decorativas alrededor
- Animación sutil: `animate-fade-up` y un ligero `animate-pulse` en el vapor del café

Resultado: el Hero deja de mostrar un celular escaneando y muestra el universo La Espiga (pan, café, bolsa) conectado visualmente al beneficio Claro mediante los chips.