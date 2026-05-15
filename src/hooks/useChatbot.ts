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

const CLIENT_ID_KEY = "chatbot_client_id";

function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

export function useChatbot() {
  const [sessionId, setSessionId] = useState<string | null>(null);
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
      const clientId = getOrCreateClientId();
      // Try fetch existing
      const { data: existing } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("client_id", clientId)
        .maybeSingle();

      let session = existing;
      if (!session) {
        const { data: created, error } = await supabase
          .from("chat_sessions")
          .insert({ client_id: clientId, state: "menu" })
          .select()
          .single();
        if (error) {
          console.error("create session error", error);
          setLoading(false);
          return;
        }
        session = created;
      }

      setSessionId(session.id);
      setState(session.state as ChatState);

      const { data: msgs } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", session.id)
        .order("created_at", { ascending: true });

      if (!msgs || msgs.length === 0) {
        // Seed with greeting
        const seed = initialBotMessages();
        const inserted = await Promise.all(
          seed.map((m) =>
            supabase
              .from("chat_messages")
              .insert({ session_id: session!.id, role: m.role, content: m.content, kind: m.kind })
              .select()
              .single()
          )
        );
        setMessages(
          inserted
            .map((r) => r.data)
            .filter(Boolean)
            .map((d: any) => d as UIMessage)
        );
      } else {
        setMessages(msgs as UIMessage[]);
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
      if (!sessionId) return [];
      const updates: Record<string, unknown> = { state: newState, ...fields };
      const { error: upErr } = await supabase
        .from("chat_sessions")
        .update(updates)
        .eq("id", sessionId);
      if (upErr) console.error("update session", upErr);

      const inserted: UIMessage[] = [];
      for (const m of botMsgs) {
        const { data, error } = await supabase
          .from("chat_messages")
          .insert({ session_id: sessionId, role: m.role, content: m.content, kind: m.kind })
          .select()
          .single();
        if (error) {
          console.error("insert message", error);
          continue;
        }
        inserted.push(data as UIMessage);
      }
      return inserted;
    },
    [sessionId]
  );

  const sendQuickReply = useCallback(
    async (id: string, label: string) => {
      if (!sessionId || sending) return;
      setSending(true);
      const result = handleQuickReply(state, id);
      const userInsert = await persist(state, [{ role: "user", content: label, kind: "text" }], {});
      const botInsert = await persist(result.newState, result.messages, result.persist);
      setMessages((prev) => [...prev, ...userInsert, ...botInsert]);
      setState(result.newState);
      setSending(false);
    },
    [sessionId, state, persist, sending]
  );

  const sendText = useCallback(
    async (raw: string) => {
      if (!sessionId || sending) return;
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
    [sessionId, state, persist, sending]
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
