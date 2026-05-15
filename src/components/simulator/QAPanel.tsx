import { Download, RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ChatState } from "@/lib/chatbot/flow";
import type { SimMessage } from "./useSimulator";

type Props = {
  state: ChatState;
  direccion?: string;
  dni?: string;
  messages: SimMessage[];
  onForceState: (s: ChatState) => void;
  onInjectText: (text: string) => void;
  onReset: () => void;
};

const STATES: ChatState[] = ["menu", "await_direccion", "await_dni", "requiere_supervisor"];

const stateColor: Record<ChatState, string> = {
  menu: "bg-wa-green/15 text-wa-green-dark",
  await_direccion: "bg-amber-500/15 text-amber-700",
  await_dni: "bg-blue-500/15 text-blue-700",
  requiere_supervisor: "bg-rose-500/15 text-rose-700",
};

export function QAPanel({
  state,
  direccion,
  dni,
  messages,
  onForceState,
  onInjectText,
  onReset,
}: Props) {
  const [text, setText] = useState("");

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-card p-4 text-sm">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Estado actual
        </h3>
        <Badge className={`${stateColor[state]} border-0 px-3 py-1 font-mono text-xs`}>
          {state}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="rounded-md bg-muted/50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase text-muted-foreground">Dirección</p>
          <p className="font-mono text-xs break-words">{direccion || "—"}</p>
        </div>
        <div className="rounded-md bg-muted/50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase text-muted-foreground">DNI</p>
          <p className="font-mono text-xs">{dni || "—"}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Forzar estado
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {STATES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={s === state ? "default" : "outline"}
              className="h-8 text-[11px] font-mono"
              onClick={() => onForceState(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Inyectar texto
        </h3>
        <form
          className="flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            onInjectText(text);
            setText("");
          }}
        >
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Mensaje del usuario..."
            className="h-8 text-xs"
          />
          <Button type="submit" size="sm" className="h-8 px-2">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>

      <div className="flex-1 min-h-[160px]">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Historial ({messages.length})
          </h3>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-[11px]"
            onClick={exportJson}
          >
            <Download className="mr-1 h-3 w-3" />
            JSON
          </Button>
        </div>
        <pre className="max-h-72 overflow-auto rounded-md bg-muted/40 p-2 text-[10.5px] leading-tight font-mono">
          {JSON.stringify(
            messages.map((m) => ({ role: m.role, kind: m.kind, content: m.content })),
            null,
            2
          )}
        </pre>
      </div>

      <Button onClick={onReset} variant="destructive" size="sm" className="w-full">
        <RotateCcw className="mr-2 h-3.5 w-3.5" />
        Reiniciar simulación
      </Button>
    </div>
  );
}
