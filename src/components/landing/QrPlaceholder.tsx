import { cn } from "@/lib/utils";

/**
 * QR placeholder visual (no es un QR real). Patrón SVG decorativo.
 * Reemplazar por un QR real generado a la URL final cuando se publique.
 */
export const QrPlaceholder = ({ className }: { className?: string }) => {
  // Pseudo-random pattern (estable, deterministic)
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }

  return (
    <svg viewBox="0 0 21 21" className={cn("text-foreground", className)} aria-label="Código QR de ejemplo">
      <rect width="21" height="21" fill="hsl(var(--card))" />
      {cells.map((on, i) => {
        const x = i % 21;
        const y = Math.floor(i / 21);
        // Reserve corners for finder patterns
        const inFinder =
          (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
        if (inFinder || !on) return null;
        return <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" />;
      })}
      {/* Finder patterns */}
      {[
        [0, 0],
        [14, 0],
        [0, 14],
      ].map(([fx, fy], idx) => (
        <g key={idx}>
          <rect x={fx} y={fy} width="7" height="7" fill="currentColor" />
          <rect x={fx + 1} y={fy + 1} width="5" height="5" fill="hsl(var(--card))" />
          <rect x={fx + 2} y={fy + 2} width="3" height="3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
};
