# Plan: Simulador del flujo de conversación

Voy a entregar las tres piezas integradas en una sola página `/simulador`, más un acceso visible desde el landing.

## 1. Acceso al chatbot existente

- Añadir un botón "Probar chatbot" en `Header.tsx` (junto al de WhatsApp) que enlace a `/chatbot` con `react-router` `<Link>`.
- Añadir un botón flotante (burbuja verde, esquina inferior derecha) visible en todo el landing que abra `/chatbot` en una nueva pestaña.
- No tocar los botones existentes de wa.me — siguen abriendo WhatsApp real como ahora.

## 2. Página `/simulador` con tres zonas

```text
┌─────────────────────────────────────────────────────┐
│  Header: título + selector escenario + controles    │
├──────────────────────┬──────────────────────────────┤
│                      │  Panel QA                    │
│  Chat WhatsApp       │  - Estado actual             │
│  (mismas burbujas    │  - direccion / dni           │
│   que /chatbot)      │  - Historial JSON            │
│                      │  - Botones forzar transición │
│                      │  - Reiniciar / Exportar      │
└──────────────────────┴──────────────────────────────┘
```

En móvil se apila: chat arriba, panel QA en un acordeón debajo.

### Modo automático (demo paso a paso)

- Selector de escenario con 4 presets:
  - **Cobertura completa**: usuario elige opción 1 → escribe dirección válida → vuelve al menú.
  - **Cobertura con error**: usuario elige opción 1 → escribe "abc" (corta) → reintenta con dirección válida.
  - **Planes con DNI**: opción 2 → DNI inválido → DNI válido de 8 dígitos.
  - **Escala a supervisor**: opción 3 directa, y otro escenario que escribe "supervisor" en medio del flujo.
- Controles: **Play / Pause / Paso siguiente / Reiniciar / Velocidad (1x, 2x, 4x)**.
- El simulador llama directamente a `handleQuickReply` y `handleUserText` de `src/lib/chatbot/flow.ts` con un delay configurable entre pasos. Muestra un indicador "escribiendo…" antes de cada mensaje del bot.
- **No persiste en Supabase** — corre 100% en memoria para que se pueda repetir sin ensuciar la base de datos. Esto lo diferencia del chatbot real de `/chatbot`.

### Panel QA (lateral derecho)

- **Estado actual** (badge): `menu` / `await_direccion` / `await_dni` / `requiere_supervisor`.
- **Campos guardados**: `direccion`, `dni` (en vivo).
- **Historial JSON**: array de `{role, content, kind, ts}` con scroll, monospace.
- **Forzar transición**: 4 botones que setean el estado manualmente sin pasar por el flujo (útil para QA de mensajes específicos).
- **Inyectar texto libre**: input que dispara `handleUserText` con el estado actual — para probar entradas raras (vacío, solo espacios, palabras clave, etc.).
- **Exportar transcript**: botón que descarga el historial como `.json`.
- **Reiniciar**: limpia estado y mensajes.

## 3. Detalles técnicos

**Archivos nuevos:**
- `src/pages/Simulador.tsx` — página principal con layout 2 columnas.
- `src/components/simulator/ScenarioRunner.tsx` — motor de auto-play con `setTimeout`/refs.
- `src/components/simulator/QAPanel.tsx` — panel lateral.
- `src/components/simulator/scenarios.ts` — definición de los 4 presets como secuencias `[{type:'quick', id:'cobertura'}, {type:'text', value:'Av. Arequipa 123'}, ...]`.
- `src/components/landing/FloatingChatbotButton.tsx` — burbuja flotante.

**Archivos editados:**
- `src/App.tsx` — registrar ruta `/simulador`.
- `src/components/landing/Header.tsx` — añadir link "Probar chatbot".
- `src/pages/Index.tsx` — montar el botón flotante.

**Reutilización:**
- Las burbujas, quick replies y header de WhatsApp se reusan tal cual desde `src/components/chatbot/`.
- La lógica de `flow.ts` se usa sin modificar — confirma que es portable a un edge function/webhook.

**Sin cambios en:**
- Base de datos (no se necesitan migraciones).
- `useChatbot.ts` (sigue siendo el hook del chatbot real persistido).
- Botones existentes de wa.me en el landing.
