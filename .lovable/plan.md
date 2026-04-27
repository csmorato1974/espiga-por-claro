## Eliminar sección "Display físico" de la landing page

### Resumen
Eliminar la sección que muestra el mockup del display físico impreso en los locales de La Espiga. Esta sección (componente `DisplayMockup`) ya no es necesaria en la landing page.

### Cambios necesarios

#### 1. `src/pages/Index.tsx`
- Eliminar el import de `DisplayMockup`
- Eliminar la línea `<DisplayMockup />` del JSX (entre `<Plans />` y `<HowItWorks />`)

#### 2. Archivos a eliminar (opcional - limpieza)
- `src/components/landing/DisplayMockup.tsx` — componente ya no usado
- `src/components/landing/QrPlaceholder.tsx` — solo usado por DisplayMockup

### Resultado esperado
La landing page fluye directamente de "Planes" a "Cómo funciona" sin la sección intermedia del display físico. El orden de secciones queda:
1. Hero
2. BenefitCard
3. Plans
4. HowItWorks
5. LeadSection
6. TrustStrip
7. FinalCTA
8. Footer