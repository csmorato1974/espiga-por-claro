import { Pause, Play, SkipForward } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { MessageBubble } from "@/components/chatbot/MessageBubble";
import { QuickReplyButtons } from "@/components/chatbot/QuickReplyButtons";
import { WhatsAppHeader } from "@/components/chatbot/WhatsAppHeader";
import { QAPanel } from "@/components/simulator/QAPanel";
import { useSimulator } from "@/components/simulator/useSimulator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { quickRepliesFor } from "@/lib/chatbot/flow";

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const Simulador = () => {
  const sim = useSimulator();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [sim.messages.length, sim.typing]);

  const replies = useMemo(() => quickRepliesFor(sim.state), [sim.state]);
  const lastBotIdx = useMemo(() => {
    for (let i = sim.messages.length - 1; i >= 0; i--)
      if (sim.messages[i].role === "bot") return i;
    return -1;
  }, [sim.messages]);

  const totalSteps = sim.currentScenario?.steps.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold sm:text-lg">
              Simulador del flujo del chatbot
            </h1>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
              en memoria
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/chatbot">Abrir chatbot real</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Inicio</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-border bg-muted/30">
        <div className="container flex flex-wrap items-center gap-3 py-3">
          <Select
            value={sim.scenarioId}
            onValueChange={(v) => {
              sim.setScenarioId(v);
              sim.reset();
            }}
          >
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Escenario" />
            </SelectTrigger>
            <SelectContent>
              {sim.scenarios.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1.5">
            {sim.playing ? (
              <Button size="sm" onClick={() => sim.setPlaying(false)} variant="secondary">
                <Pause className="mr-1.5 h-4 w-4" />
                Pausar
              </Button>
            ) : (
              <Button size="sm" onClick={() => sim.playScenario(sim.scenarioId)}>
                <Play className="mr-1.5 h-4 w-4" />
                Reproducir
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={sim.stepOnce}
              disabled={sim.typing || sim.stepIdx >= totalSteps}
            >
              <SkipForward className="mr-1.5 h-4 w-4" />
              Paso
            </Button>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 4].map((sp) => (
              <Button
                key={sp}
                size="sm"
                variant={sim.speed === sp ? "default" : "ghost"}
                className="h-8 px-2.5 text-xs"
                onClick={() => sim.setSpeed(sp)}
              >
                {sp}x
              </Button>
            ))}
          </div>

          <span className="ml-auto text-xs text-muted-foreground">
            Paso {Math.min(sim.stepIdx, totalSteps)} / {totalSteps}
            {sim.currentScenario && (
              <span className="ml-3 hidden sm:inline">
                · {sim.currentScenario.description}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="container grid gap-4 py-4 lg:grid-cols-[minmax(320px,420px)_1fr]">
        {/* Chat */}
        <div className="flex h-[70vh] min-h-[520px] flex-col overflow-hidden rounded-xl bg-wa-bg shadow-xl lg:h-[78vh]">
          <WhatsAppHeader />
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
            <div className="flex flex-col gap-1.5">
              {sim.messages.map((m, idx) => (
                <div key={m.id}>
                  <MessageBubble
                    role={m.role}
                    content={m.content}
                    time={formatTime(m.ts)}
                  />
                  {idx === lastBotIdx &&
                    idx === sim.messages.length - 1 &&
                    !sim.typing && (
                      <QuickReplyButtons
                        replies={replies}
                        disabled={sim.playing}
                        onPick={sim.sendQuickReply}
                      />
                    )}
                </div>
              ))}
              {sim.typing && (
                <div className="px-4 pt-1 text-[11px] italic text-wa-meta">
                  escribiendo…
                </div>
              )}
            </div>
          </div>
          <ChatInput
            disabled={sim.playing || sim.typing || sim.state === "requiere_supervisor"}
            onSend={sim.sendText}
          />
        </div>

        {/* QA Panel */}
        <QAPanel
          state={sim.state}
          direccion={sim.direccion}
          dni={sim.dni}
          messages={sim.messages}
          onForceState={sim.forceState}
          onInjectText={sim.sendText}
          onReset={sim.reset}
        />
      </div>
    </div>
  );
};

export default Simulador;
