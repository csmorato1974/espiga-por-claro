import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function FloatingChatbotButton() {
  return (
    <Link
      to="/chatbot"
      aria-label="Abrir chatbot"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa-green text-white shadow-2xl transition hover:scale-105 hover:bg-wa-green-dark active:scale-95"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa-green opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-wa-green-dark" />
      </span>
    </Link>
  );
}
