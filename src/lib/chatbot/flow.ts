import { COPY, DNI_LENGTH, MENU_OPTIONS, SUPERVISOR_KEYWORDS, type MenuOptionId } from "./config";

export type ChatState = "menu" | "await_direccion" | "await_dni" | "requiere_supervisor";

export type BotMessage = {
  role: "bot";
  content: string;
  kind: "text" | "menu" | "confirmation" | "error";
};

export type StepResult = {
  newState: ChatState;
  messages: BotMessage[];
  persist: { direccion?: string; dni?: string };
};

const menuMessage = (intro?: string): BotMessage[] => {
  const arr: BotMessage[] = [];
  if (intro) arr.push({ role: "bot", content: intro, kind: "text" });
  arr.push({ role: "bot", content: COPY.greeting, kind: "menu" });
  return arr;
};

export function initialBotMessages(): BotMessage[] {
  return menuMessage();
}

export function quickRepliesFor(state: ChatState): { id: string; label: string }[] {
  if (state === "menu") return MENU_OPTIONS.map((o) => ({ id: o.id, label: o.label }));
  if (state === "await_direccion" || state === "await_dni")
    return [{ id: "back", label: COPY.backToMenu }];
  if (state === "requiere_supervisor")
    return [{ id: "back", label: COPY.backToMenu }];
  return [];
}

function isSupervisorKeyword(text: string): boolean {
  const t = text.toLowerCase();
  return SUPERVISOR_KEYWORDS.some((k) => t.includes(k));
}

export function handleQuickReply(state: ChatState, id: string): StepResult {
  if (id === "back") {
    return { newState: "menu", messages: menuMessage(), persist: {} };
  }
  if (id === "cobertura") {
    return {
      newState: "await_direccion",
      messages: [{ role: "bot", content: COPY.askDireccion, kind: "text" }],
      persist: {},
    };
  }
  if (id === "planes") {
    return {
      newState: "await_dni",
      messages: [{ role: "bot", content: COPY.askDni, kind: "text" }],
      persist: {},
    };
  }
  if (id === "supervisor") {
    return {
      newState: "requiere_supervisor",
      messages: [{ role: "bot", content: COPY.supervisor, kind: "confirmation" }],
      persist: {},
    };
  }
  return { newState: state, messages: menuMessage(COPY.fueraDeFlujo), persist: {} };
}

export function handleUserText(state: ChatState, raw: string): StepResult {
  const text = raw.trim();

  // Global supervisor escalation
  if (isSupervisorKeyword(text) && state !== "requiere_supervisor") {
    return {
      newState: "requiere_supervisor",
      messages: [{ role: "bot", content: COPY.supervisor, kind: "confirmation" }],
      persist: {},
    };
  }

  if (state === "await_direccion") {
    if (text.length < 5) {
      return {
        newState: state,
        messages: [{ role: "bot", content: COPY.errorDireccionVacia, kind: "error" }],
        persist: {},
      };
    }
    return {
      newState: "menu",
      messages: [
        { role: "bot", content: COPY.confirmDireccion(text), kind: "confirmation" },
        { role: "bot", content: COPY.greeting, kind: "menu" },
      ],
      persist: { direccion: text },
    };
  }

  if (state === "await_dni") {
    const re = new RegExp(`^\\d{${DNI_LENGTH}}$`);
    if (!re.test(text)) {
      return {
        newState: state,
        messages: [{ role: "bot", content: COPY.errorDni, kind: "error" }],
        persist: {},
      };
    }
    return {
      newState: "menu",
      messages: [
        { role: "bot", content: COPY.confirmDni(text), kind: "confirmation" },
        { role: "bot", content: COPY.greeting, kind: "menu" },
      ],
      persist: { dni: text },
    };
  }

  // menu or requiere_supervisor receiving free text
  return { newState: "menu", messages: menuMessage(COPY.fueraDeFlujo), persist: {} };
}
