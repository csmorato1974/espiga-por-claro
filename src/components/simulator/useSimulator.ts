import { useCallback, useEffect, useRef, useState } from "react";
import {
  handleQuickReply,
  handleUserText,
  initialBotMessages,
  type ChatState,
} from "@/lib/chatbot/flow";
import { SCENARIOS, type Scenario } from "./scenarios";

export type SimMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
  kind: string;
  ts: number;
};

let counter = 0;
const newId = () => `m${Date.now()}-${++counter}`;

function seed(): SimMessage[] {
  return initialBotMessages().map((m) => ({
    id: newId(),
    role: m.role,
    content: m.content,
    kind: m.kind,
    ts: Date.now(),
  }));
}

export function useSimulator() {
  const [state, setState] = useState<ChatState>("menu");
  const [direccion, setDireccion] = useState<string | undefined>();
  const [dni, setDni] = useState<string | undefined>();
  const [messages, setMessages] = useState<SimMessage[]>(() => seed());
  const [typing, setTyping] = useState(false);

  // Auto-play
  const [scenarioId, setScenarioId] = useState<string>(SCENARIOS[0].id);
  const [playing, setPlaying] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const stateRef = useRef(state);
  stateRef.current = state;

  const applyResult = useCallback(
    (
      userMsg: SimMessage | null,
      result: ReturnType<typeof handleQuickReply>
    ) => {
      if (userMsg) setMessages((p) => [...p, userMsg]);
      setTyping(true);
      const delay = 700 / speed;
      window.setTimeout(() => {
        setMessages((p) => [
          ...p,
          ...result.messages.map((m) => ({
            id: newId(),
            role: m.role,
            content: m.content,
            kind: m.kind,
            ts: Date.now(),
          })),
        ]);
        setState(result.newState);
        if (result.persist.direccion) setDireccion(result.persist.direccion);
        if (result.persist.dni) setDni(result.persist.dni);
        setTyping(false);
      }, delay);
    },
    [speed]
  );

  const sendQuickReply = useCallback(
    (id: string, label: string) => {
      const userMsg: SimMessage = {
        id: newId(),
        role: "user",
        content: label,
        kind: "text",
        ts: Date.now(),
      };
      const result = handleQuickReply(stateRef.current, id);
      applyResult(userMsg, result);
    },
    [applyResult]
  );

  const sendText = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      const userMsg: SimMessage = {
        id: newId(),
        role: "user",
        content: text,
        kind: "text",
        ts: Date.now(),
      };
      const result = handleUserText(stateRef.current, text);
      applyResult(userMsg, result);
    },
    [applyResult]
  );

  const reset = useCallback(() => {
    setState("menu");
    setDireccion(undefined);
    setDni(undefined);
    setMessages(seed());
    setStepIdx(0);
    setPlaying(false);
    setTyping(false);
  }, []);

  const forceState = useCallback((s: ChatState) => {
    setState(s);
  }, []);

  // Auto-play loop
  useEffect(() => {
    if (!playing) return;
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario || stepIdx >= scenario.steps.length) {
      setPlaying(false);
      return;
    }
    if (typing) return;
    const interval = 1500 / speed;
    const t = window.setTimeout(() => {
      const step = scenario.steps[stepIdx];
      if (step.type === "quick") sendQuickReply(step.id, step.label);
      else sendText(step.value);
      setStepIdx((i) => i + 1);
    }, interval);
    return () => window.clearTimeout(t);
  }, [playing, scenarioId, stepIdx, speed, typing, sendQuickReply, sendText]);

  const playScenario = useCallback(
    (id: string) => {
      reset();
      setScenarioId(id);
      window.setTimeout(() => setPlaying(true), 50);
    },
    [reset]
  );

  const stepOnce = useCallback(() => {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario || stepIdx >= scenario.steps.length || typing) return;
    const step = scenario.steps[stepIdx];
    if (step.type === "quick") sendQuickReply(step.id, step.label);
    else sendText(step.value);
    setStepIdx((i) => i + 1);
  }, [scenarioId, stepIdx, typing, sendQuickReply, sendText]);

  const currentScenario: Scenario | undefined = SCENARIOS.find(
    (s) => s.id === scenarioId
  );

  return {
    state,
    direccion,
    dni,
    messages,
    typing,
    sendQuickReply,
    sendText,
    reset,
    forceState,
    // auto-play
    scenarios: SCENARIOS,
    scenarioId,
    setScenarioId,
    playing,
    setPlaying,
    stepIdx,
    speed,
    setSpeed,
    playScenario,
    stepOnce,
    currentScenario,
  };
}
