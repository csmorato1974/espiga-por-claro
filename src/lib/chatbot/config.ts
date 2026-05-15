export const DNI_LENGTH = 8;

export const MENU_OPTIONS = [
  { id: "cobertura", label: "1. Validar cobertura y ofertas" },
  { id: "planes", label: "2. Consultar planes con DNI" },
  { id: "supervisor", label: "3. Hablar con un supervisor" },
] as const;

export type MenuOptionId = (typeof MENU_OPTIONS)[number]["id"];

export const COPY = {
  greeting:
    "¡Hola! 👋 Soy el asistente virtual. ¿En qué puedo ayudarte hoy? Selecciona una opción:",
  askDireccion:
    "Por favor, indícanos la dirección donde deseas instalar el servicio para verificar la tecnología disponible y las ofertas especiales que podemos brindarte.",
  askDni:
    "Por favor, comparte tu número de DNI para indicarte a qué planes puedes acceder.",
  supervisor:
    "Voy a derivar tu solicitud a un supervisor para que te brinde el soporte que necesitas. En breve te contactaremos. 🙌",
  errorDireccionVacia:
    "La dirección no puede estar vacía. Por favor, escríbela nuevamente (incluye calle, número y distrito).",
  errorDni: `El DNI debe contener exactamente ${DNI_LENGTH} dígitos numéricos. Inténtalo nuevamente.`,
  fueraDeFlujo:
    "No entendí tu mensaje. Te muestro nuevamente el menú principal:",
  backToMenu: "Volver al menú",
  confirmDireccion: (d: string) =>
    `✅ Recibimos tu dirección: *${d}*. Un asesor revisará la cobertura disponible y se comunicará contigo a la brevedad.`,
  confirmDni: (d: string) =>
    `✅ Gracias. Validaremos los planes disponibles para el DNI *${d}* y te responderemos en breve.`,
};

export const SUPERVISOR_KEYWORDS = ["supervisor", "asesor", "humano", "agente"];
