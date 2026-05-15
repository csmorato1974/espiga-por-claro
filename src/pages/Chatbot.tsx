import { useEffect, useMemo, useRef } from "react";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { MessageBubble } from "@/components/chatbot/MessageBubble";
import { QuickReplyButtons } from "@/components/chatbot/QuickReplyButtons";
import { WhatsAppHeader } from "@/components/chatbot/WhatsAppHeader";
import { useChatbot } from "@/hooks/useChatbot";
import { trackPageView } from "@/lib/analytics";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", hour12: false });
}

const Chatbot = () => {
  const { loading, sending, messages, quickReplies, sendQuickReply, sendText, state } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackPageView("/chatbot");
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, quickReplies.length]);

  const lastBotIdx = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) if (messages[i].role === "bot") return i;
    return -1;
  }, [messages]);

  return (
    <div className="min-h-screen w-full bg-neutral-200 md:flex md:items-center md:justify-center md:py-6">
      <div className="mx-auto flex h-screen w-full flex-col bg-wa-bg shadow-2xl md:h-[90vh] md:max-h-[820px] md:max-w-md md:overflow-hidden md:rounded-2xl">
        <WhatsAppHeader />

        {/* Chat area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto py-3"
          style={{
            backgroundColor: "hsl(var(--wa-bg))",
            backgroundImage:
              "radial-gradient(hsl(var(--wa-green) / 0.06) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-wa-meta">
              Cargando conversación...
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {messages.map((m, idx) => (
                <div key={m.id}>
                  <MessageBubble role={m.role} content={m.content} time={formatTime(m.created_at)} />
                  {idx === lastBotIdx && idx === messages.length - 1 && (
                    <QuickReplyButtons
                      replies={quickReplies}
                      disabled={sending}
                      onPick={sendQuickReply}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <ChatInput
          disabled={loading || sending || state === "requiere_supervisor"}
          onSend={sendText}
        />
      </div>
    </div>
  );
};

export default Chatbot;
