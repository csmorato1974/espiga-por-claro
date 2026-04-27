import { cn } from "@/lib/utils";

/**
 * Logotipos placeholder (SVG inline, sin assets externos).
 * Se pueden reemplazar por SVGs/PNGs oficiales del cliente más adelante.
 */
export const ClaroLogo = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "inline-flex select-none items-center rounded-md bg-primary px-2.5 py-1 font-extrabold tracking-tight text-primary-foreground shadow-soft",
      className,
    )}
    aria-label="Claro"
  >
    <span className="text-[0.95em]">claro</span>
  </div>
);

export const EspigaLogo = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "inline-flex select-none items-center gap-1 rounded-md border border-espiga-gold/60 bg-espiga-cream px-2.5 py-1 font-bold text-espiga-coffee",
      className,
    )}
    aria-label="La Espiga"
  >
    <svg viewBox="0 0 24 24" className="h-[1em] w-[1em] text-espiga-gold" fill="currentColor" aria-hidden>
      <path d="M12 2c-2 3-2 5-2 7 0 4 2 6 2 13 0-7 2-9 2-13 0-2 0-4-2-7zm-6 6c0 3 1 5 4 6-1-3-2-4-4-6zm12 0c-2 2-3 3-4 6 3-1 4-3 4-6zM6 13c0 2 1 4 4 5-1-2-2-3-4-5zm12 0c-2 2-3 3-4 5 3-1 4-3 4-5z"/>
    </svg>
    <span className="text-[0.85em] uppercase tracking-wider">La Espiga</span>
  </div>
);
