import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

export function FloatingChatbotButton() {
  return (
    <Link
      to="/chatbot"
      aria-label="Abrir Chat Bot"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-brand ring-2 ring-primary/30 transition hover:scale-105 hover:bg-primary-dark active:scale-95"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <Bot className="h-6 w-6" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-espiga-gold opacity-80" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-espiga-gold" />
        </span>
      </span>
      <span className="pr-1 text-sm font-bold uppercase tracking-wide">
        Chat Bot
      </span>
    </Link>
  );
}
