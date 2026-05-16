## Reemplazar logos de Inkacel y La Espiga

Reemplazar los dos archivos de logo usados en `src/components/landing/Logos.tsx` por las imágenes subidas, conservando las proporciones (los componentes ya usan `object-contain` y altura fija, así que el ancho se ajusta automáticamente).

### Pasos

1. Copiar `user-uploads://ChatGPT_Image_15_may_2026_11_27_49-2.png` a `src/assets/inkacel-logo.png` (sobrescribir).
2. Copiar `user-uploads://ChatGPT_Image_15_may_2026_13_07_20-2.png` a `src/assets/espiga-logo.png` (sobrescribir).

### Notas técnicas

- No se modifica `Logos.tsx`, `Header.tsx` ni `Footer.tsx`: siguen importando desde `@/assets/inkacel-logo.png` y `@/assets/espiga-logo.png`.
- `object-contain` + altura fija preserva proporciones del nuevo logo automáticamente.
- No se tocan otros archivos.