import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  role: "bot" | "user";
  content: string;
  time: string;
};

function renderContent(text: string) {
  // simple *bold* support
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <strong key={i} className="font-semibold">
        {p.slice(1, -1)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export function MessageBubble({ role, content, time }: Props) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full px-2", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative max-w-[78%] rounded-lg px-2.5 py-1.5 shadow-sm",
          "text-[14.5px] leading-snug text-wa-text whitespace-pre-wrap break-words",
          isUser ? "bg-wa-bubble-out rounded-tr-sm" : "bg-wa-bubble-in rounded-tl-sm"
        )}
      >
        <div className="pr-12">{renderContent(content)}</div>
        <div className="float-right -mb-1 ml-2 mt-1 flex items-center gap-1 text-[10.5px] text-wa-meta">
          <span>{time}</span>
          {isUser && <CheckCheck className="h-3.5 w-3.5 text-wa-tick" />}
        </div>
      </div>
    </div>
  );
}
