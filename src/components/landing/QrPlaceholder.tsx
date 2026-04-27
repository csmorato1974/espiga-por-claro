/**
 * Placeholder visual de un código QR (no es un QR real).
 * Sirve solo como mockup para la demo.
 */
export const QrPlaceholder = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={"grid grid-cols-8 grid-rows-8 gap-[2px] bg-foreground p-1 " + className}
      aria-label="QR de ejemplo"
      role="img"
    >
      {Array.from({ length: 64 }).map((_, i) => {
        // Pseudo-random pattern based on index for a QR-like look
        const on = ((i * 73 + 13) % 7) % 2 === 0 || i % 11 === 0;
        return (
          <span
            key={i}
            className={on ? "bg-background" : "bg-foreground"}
            aria-hidden
          />
        );
      })}
    </div>
  );
};
