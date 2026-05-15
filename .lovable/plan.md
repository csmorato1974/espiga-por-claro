## Reemplazar ilustración del hero por foto real de La Espiga

### 1. Asset
- Copiar `user-uploads://Captura_de_pantalla_2026-05-15_113450.png` → `src/assets/espiga-empanadas.jpg` (renombrar a algo descriptivo y `.jpg` para mejor compresión, aunque conservaré PNG si el usuario lo prefiere — uso `.png` por simplicidad y respeto al original).

### 2. Hero (`src/components/landing/Hero.tsx`)
- Eliminar import y uso de `EspigaProductsIllustration`.
- Importar la nueva imagen como módulo ES6 (`import espigaPhoto from "@/assets/espiga-empanadas.png"`).
- Reemplazar el bloque visual derecho por:
  - `<img>` con `loading="eager"`, `alt="Productos de La Espiga"`, esquinas redondeadas (`rounded-3xl`), sombra (`shadow-brand`), `object-cover` en aspect-square o aspect-[4/5].
  - Mantener los **chips flotantes** actuales ("+S/30 en La Espiga" y "Internet desde S/39.50") superpuestos como `absolute` sobre la foto, para no perder los mensajes promocionales clave.
  - Conservar la animación `animate-fade-up` y el contenedor `relative mx-auto w-full max-w-sm md:max-w-md`.

### 3. Limpieza
- Borrar `src/components/landing/EspigaProductsIllustration.tsx` (queda sin usos).

### 4. Verificación
- Build limpio.
- Preview: foto visible en hero a la derecha en desktop y debajo del copy en mobile, con los dos chips de promoción aún visibles encima.

### Notas
- No se toca paleta, planes ni copy del hero.
- Si el usuario luego prefiere recortar la foto o usar un fondo distinto, se puede iterar sobre el mismo asset.
