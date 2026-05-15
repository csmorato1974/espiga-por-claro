type Reply = { id: string; label: string };

type Props = {
  replies: Reply[];
  disabled?: boolean;
  onPick: (id: string, label: string) => void;
};

export function QuickReplyButtons({ replies, disabled, onPick }: Props) {
  if (!replies.length) return null;
  return (
    <div className="flex flex-col items-stretch gap-1.5 px-2 pb-1 pt-1">
      {replies.map((r) => (
        <button
          key={r.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(r.id, r.label)}
          className="rounded-lg border border-wa-green/30 bg-white px-3 py-2 text-left text-[14px] font-medium text-wa-green shadow-sm transition hover:bg-wa-green/5 active:scale-[0.99] disabled:opacity-50"
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
