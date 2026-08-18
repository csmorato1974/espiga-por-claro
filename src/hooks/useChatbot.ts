import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  handleQuickReply,
  handleUserText,
  initialBotMessages,
  quickRepliesFor,
  type ChatState,
} from "@/lib/chatbot/flow";

export type UIMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
  kind: string;
  created_at: string;
};

type SessionRow = {
  id: string;
  client_id: string;
  state: string;
  direccion: string | null;
  dni: string | null;
};

const CLIENT_ID_KEY = "chatbot_client_id";

// The client_id is a private capability token: it is the only thing that lets
// the secured database functions return this browser's conversation.
function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

// Typed thin wrappers around the security-definer RPCs.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export function useChatbot() {
  const [clientId, setClientId] = useState<string | null>(null);
  const [state, setState] = useState<ChatState>("menu");
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const initRef = useRef(false);

  // Bootstrap session
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    (async () => {
      const id = getOrCreateClientId();

      const { data: sessionData, error: sessionErr } = await rpc(
        "chat_get_or_create_session",
        { p_client_id: id }
      );
      if (sessionErr || !sessionData) {
        console.error("No se pudo iniciar la conversación");
        setLoading(false);
        return;
      }
      const session = sessionData as SessionRow;
      setClientId(id);
      setState(session.state as ChatState);

      const { data: msgData } = await rpc("chat_get_messages", { p_client_id: id });
      const msgs = (msgData ?? []) as UIMessage[];

      if (msgs.length === 0) {
        const seeded: UIMessage[] = [];
        for (const m of initialBotMessages()) {
          const { data, error } = await rpc("chat_add_message", {
            p_client_id: id,
            p_role: m.role,
            p_content: m.content,
            p_kind: m.kind,
          });
          if (error || !data) continue;
          seeded.push(data as UIMessage);
        }
        setMessages(seeded);
      } else {
        setMessages(msgs);
      }
      setLoading(false);
    })();
  }, []);

  const persist = useCallback(
    async (
      newState: ChatState,
      botMsgs: { role: "bot" | "user"; content: string; kind: string }[],
      fields: { direccion?: string; dni?: string }
    ) => {
      if (!clientId) return [];

      const { error: upErr } = await rpc("chat_update_session", {
        p_client_id: clientId,
        p_state: newState,
        p_direccion: fields.direccion ?? null,
        p_dni: fields.dni ?? null,
      });
      if (upErr) console.error("No se pudo actualizar la conversación");

      const inserted: UIMessage[] = [];
      for (const m of botMsgs) {
        const { data, error } = await rpc("chat_add_message", {
          p_client_id: clientId,
          p_role: m.role,
          p_content: m.content,
          p_kind: m.kind,
        });
        if (error || !data) {
          console.error("No se pudo guardar el mensaje");
          continue;
        }
        inserted.push(data as UIMessage);
      }
      return inserted;
    },
    [clientId]
  );

  const sendQuickReply = useCallback(
    async (id: string, label: string) => {
      if (!clientId || sending) return;
      setSending(true);
      const result = handleQuickReply(state, id);
      const userInsert = await persist(state, [{ role: "user", content: label, kind: "text" }], {});
      const botInsert = await persist(result.newState, result.messages, result.persist);
      setMessages((prev) => [...prev, ...userInsert, ...botInsert]);
      setState(result.newState);
      setSending(false);
    },
    [clientId, state, persist, sending]
  );

  const sendText = useCallback(
    async (raw: string) => {
      if (!clientId || sending) return;
      const text = raw.trim();
      if (!text) return;
      setSending(true);
      const result = handleUserText(state, text);
      const userInsert = await persist(state, [{ role: "user", content: text, kind: "text" }], {});
      const botInsert = await persist(result.newState, result.messages, result.persist);
      setMessages((prev) => [...prev, ...userInsert, ...botInsert]);
      setState(result.newState);
      setSending(false);
    },
    [clientId, state, persist, sending]
  );

  return {
    loading,
    sending,
    state,
    messages,
    quickReplies: quickRepliesFor(state),
    sendQuickReply,
    sendText,
  };
}
