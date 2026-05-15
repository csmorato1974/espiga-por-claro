# Plan: Chatbot tipo WhatsApp con flujo guiado

## Alcance
Nueva ruta `/chatbot` (enlazable desde el landing si se desea más adelante). Una sola conversación por navegador, persistida en Lovable Cloud. UI fiel al estilo WhatsApp (header verde, fondo con patrón, burbujas, hora, doble check, botones rápidos tipo "Quick Reply").

## Backend (Lovable Cloud)

Migración con dos tablas:

- `chat_sessions`
  - `client_id` (text, único) — UUID generado en el navegador y guardado en `localStorage` para identificar la sesión sin login
  - `state` (text) — `menu` | `await_direccion` | `await_dni` | `requiere_supervisor` | `finalizado`
  - `direccion` (text, nullable)
  - `dni` (text, nullable)

- `chat_messages`
  - `session_id` (uuid → chat_sessions)
  - `role` (text) — `bot` | `user`
  - `content` (text)
  - `kind` (text) — `text` | `menu` | `confirmation` | `error`

RLS: acceso público anónimo restringido por `client_id` (se filtra en cliente; insert/select abiertos a `anon` con `client_id` enviado en el payload). Sin auth — coherente con el patrón actual de `leads`.

## Frontend

### Archivos nuevos
- `src/pages/Chatbot.tsx` — página standalone con la UI del chat
- `src/components/chatbot/WhatsAppHeader.tsx` — header verde, avatar "Claro Bot", estado "en línea"
- `src/components/chatbot/MessageBubble.tsx` — burbuja con cola, hora, doble check
- `src/components/chatbot/QuickReplyButtons.tsx` — botones rápidos bajo el último mensaje del bot
- `src/components/chatbot/ChatInput.tsx` — input inferior estilo WhatsApp (deshabilitado cuando solo hay botones)
- `src/lib/chatbot/flow.ts` — máquina de estados pura (sin React) con la lógica de transiciones, validaciones y mensajes
- `src/lib/chatbot/config.ts` — constantes: longitud DNI (default 8), copys, opciones del menú
- `src/hooks/useChatbot.ts` — orquesta sesión, carga histórica, envío y persistencia

### Diseño
- Tokens nuevos en `index.css` y `tailwind.config.ts`: `--whatsapp-green`, `--whatsapp-green-dark`, `--whatsapp-bg`, `--whatsapp-bubble-out`, `--whatsapp-bubble-in`, `--whatsapp-tick`. HSL.
- Fondo con patrón tenue (SVG inline doodle WhatsApp-like)
- Responsive: en móvil ocupa toda la pantalla; en desktop, marco centrado tipo "teléfono" max-w-md con sombra

## Lógica del flujo (`flow.ts`)

Estado inicial → bot envía saludo + menú con 3 botones:
1. Validar cobertura y ofertas
2. Consultar planes con DNI
3. Hablar con un supervisor

Manejo:
- Botón 1 → estado `await_direccion`, mensaje pidiendo dirección + botón "Volver al menú"
  - Validar `trim().length > 0` (mín 5 chars). Error: "La dirección no puede estar vacía. Inténtalo de nuevo."
  - OK → guardar `direccion`, confirmar: "Recibimos tu dirección: *<dir>*. Un asesor revisará la cobertura disponible y se comunicará contigo." → reenvía menú
- Botón 2 → `await_dni`, pide DNI + botón "Volver al menú"
  - Validar `/^\d{8}$/` (longitud configurable en `config.ts`). Error: "El DNI debe tener 8 dígitos numéricos."
  - OK → guardar `dni`, confirmar: "Gracias. Validaremos los planes disponibles para el DNI *<dni>*." → reenvía menú
- Botón 3 → estado `requiere_supervisor`, mensaje de derivación, deshabilita input. Botón "Volver al menú" disponible.

Reglas globales:
- Texto libre fuera de un estado de captura → "No entendí tu mensaje. Te muestro el menú principal." + menú
- Palabras clave `supervisor`, `asesor`, `humano` en cualquier momento → escala a flujo 3
- Botón "Volver al menú" siempre visible en estados de captura

## Persistencia

`useChatbot`:
1. Al montar: lee `client_id` de localStorage (genera uno si no existe), busca/crea `chat_sessions`, carga `chat_messages` ordenados
2. Cada mensaje (user o bot) → insert en `chat_messages`
3. Cada cambio de estado → update `chat_sessions`
4. Si la sesión ya estaba en `requiere_supervisor`, mantiene UI escalada al recargar

## Preparado para webhook futuro
- `flow.ts` exporta función pura `nextStep(state, input) → { newState, messages, persistFields }`. Cualquier integración futura (edge function que llame a CRM/WhatsApp Business API) reusará esta función.
- Estructura de `chat_messages` ya compatible con formato típico de WhatsApp (role, content, timestamp).

## Verificación
- Build limpio
- Probar los 3 flujos, validaciones (dirección vacía, DNI no numérico/longitud incorrecta), recarga preserva estado, palabra clave "supervisor" escala, botón "Volver al menú" funciona, responsive en móvil

## Lo que NO se hace
- No se conecta aún a WhatsApp Business API real (se deja la arquitectura lista)
- No se modifica el landing actual ni `leads`
- No se agregan auth ni roles
