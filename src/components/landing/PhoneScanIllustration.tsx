import { QrPlaceholder } from "./QrPlaceholder";

/**
 * Ilustración SVG de un celular escaneando un QR. Sin imágenes externas.
 */
export const PhoneScanIllustration = () => {
  return (
    <div className="relative">
      {/* Glow background */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-claro opacity-20 blur-2xl" aria-hidden />

      <div className="relative mx-auto flex aspect-[4/5] w-full items-center justify-center">
        {/* Phone */}
        <div className="relative h-[88%] w-[58%] rounded-[2rem] border-[6px] border-foreground/90 bg-foreground shadow-claro">
          <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-background/30" />
          <div className="absolute inset-2 overflow-hidden rounded-[1.5rem] bg-background">
            {/* Camera viewfinder */}
            <div className="relative h-full w-full bg-gradient-warm p-3">
              <div className="relative mx-auto mt-6 aspect-square w-[78%] overflow-hidden rounded-xl border-2 border-primary/30 bg-card shadow-card">
                <QrPlaceholder className="h-full w-full" />
                {/* Scan line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 animate-scan bg-gradient-to-b from-primary/0 via-primary to-primary/0" aria-hidden />
                {/* Corner brackets */}
                {(["tl","tr","bl","br"] as const).map((c) => (
                  <span
                    key={c}
                    aria-hidden
                    className={
                      "absolute h-5 w-5 border-primary " +
                      (c === "tl" ? "left-1 top-1 border-l-[3px] border-t-[3px] " : "") +
                      (c === "tr" ? "right-1 top-1 border-r-[3px] border-t-[3px] " : "") +
                      (c === "bl" ? "left-1 bottom-1 border-l-[3px] border-b-[3px] " : "") +
                      (c === "br" ? "right-1 bottom-1 border-r-[3px] border-b-[3px] " : "")
                    }
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Escaneando…
              </p>
            </div>
          </div>
        </div>

        {/* Floating chips */}
        <div className="absolute -left-2 top-6 rotate-[-6deg] rounded-xl bg-card px-3 py-2 text-xs font-semibold shadow-card">
          <span className="text-primary">●</span> Internet desde S/30
        </div>
        <div className="absolute -right-2 bottom-8 rotate-[5deg] rounded-xl bg-card px-3 py-2 text-xs font-semibold shadow-card">
          🥖 +S/30 en La Espiga
        </div>
      </div>
    </div>
  );
};
