import { Mic, Plus, Send, Smile } from "lucide-react";
import { useState, type FormEvent } from "react";

type Props = {
  disabled?: boolean;
  onSend: (text: string) => void;
};

export function ChatInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v || disabled) return;
    onSend(v);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-end gap-1.5 bg-wa-bg px-2 py-1.5"
      aria-label="Enviar mensaje"
    >
      <div className="flex flex-1 items-center gap-1 rounded-full bg-white px-3 py-2 shadow-sm">
        <Smile className="h-5 w-5 shrink-0 text-wa-meta" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "Esperando..." : "Mensaje"}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-wa-text outline-none placeholder:text-wa-meta disabled:opacity-60"
        />
        <Plus className="h-5 w-5 shrink-0 text-wa-meta" />
      </div>
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-green text-white shadow-md transition active:scale-95 disabled:opacity-60"
        aria-label="Enviar"
      >
        {value.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>
    </form>
  );
}
