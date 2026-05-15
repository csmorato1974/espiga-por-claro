import { cn } from "@/lib/utils";
import inkacelLogo from "@/assets/inkacel-logo.png";
import espigaLogo from "@/assets/espiga-logo.png";

/**
 * Logotipos de marca.
 * - InkacelLogo usa el PNG oficial de Inkacel.
 * - EspigaLogo es un placeholder SVG inline (reemplazable por asset oficial).
 */
export const InkacelLogo = ({ className }: { className?: string }) => (
  <img
    src={inkacelLogo}
    alt="Inkacel"
    className={cn("inline-block h-7 w-auto select-none object-contain", className)}
  />
);

export const EspigaLogo = ({ className }: { className?: string }) => (
  <img
    src={espigaLogo}
    alt="La Espiga"
    className={cn("inline-block h-16 w-auto select-none object-contain", className)}
  />
);
