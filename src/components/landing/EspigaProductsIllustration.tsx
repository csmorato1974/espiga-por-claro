import { Wifi, Wheat } from "lucide-react";

export const EspigaProductsIllustration = () => {
  return (
    <div className="relative aspect-square w-full">
      {/* Warm glow background */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2.5rem] bg-gradient-warm opacity-90 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-4 rounded-[2rem] border border-primary/10 bg-card/60 backdrop-blur-sm shadow-soft"
      />

      {/* Decorative floating wheat ears */}
      <Wheat
        aria-hidden
        className="absolute left-4 top-6 h-8 w-8 rotate-[-25deg] text-primary/40"
      />
      <Wheat
        aria-hidden
        className="absolute right-6 bottom-10 h-10 w-10 rotate-[20deg] text-primary/30"
      />
      <Wheat
        aria-hidden
        className="absolute right-10 top-10 h-6 w-6 rotate-[45deg] text-primary/30"
      />

      {/* Main scene */}
      <div className="relative flex h-full w-full items-end justify-center pb-10">
        <svg
          viewBox="0 0 320 320"
          className="h-[88%] w-[88%] drop-shadow-brand"
          role="img"
          aria-label="Bolsa de panadería La Espiga con pan, baguette y café"
        >
          {/* Steam from coffee */}
          <g className="origin-center animate-pulse" style={{ animationDuration: "2.4s" }}>
            <path
              d="M232 70 q-6 -10 0 -20 q6 -10 0 -20"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M248 70 q-6 -10 0 -20 q6 -10 0 -20"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M264 70 q-6 -10 0 -20 q6 -10 0 -20"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
          </g>

          {/* Coffee cup */}
          <g>
            <path
              d="M210 80 h60 v36 a18 18 0 0 1 -18 18 h-24 a18 18 0 0 1 -18 -18 z"
              fill="hsl(var(--card))"
              stroke="hsl(var(--foreground))"
              strokeWidth="3"
            />
            <path
              d="M270 92 h8 a10 10 0 0 1 0 20 h-8"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="3"
            />
            <ellipse cx="240" cy="86" rx="28" ry="5" fill="hsl(25 60% 35%)" />
            <rect x="218" y="138" width="44" height="6" rx="2" fill="hsl(var(--foreground))" />
          </g>

          {/* Baguette behind bag */}
          <g transform="rotate(-18 120 120)">
            <ellipse cx="120" cy="120" rx="70" ry="18" fill="hsl(35 70% 55%)" stroke="hsl(25 60% 30%)" strokeWidth="2.5" />
            <path d="M80 118 l8 -6 M100 116 l8 -6 M120 116 l8 -6 M140 118 l8 -6" stroke="hsl(25 60% 30%)" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Round bread loaf */}
          <g>
            <ellipse cx="200" cy="160" rx="34" ry="26" fill="hsl(32 65% 50%)" stroke="hsl(25 55% 28%)" strokeWidth="2.5" />
            <path d="M178 152 q22 -18 44 0 M184 162 q16 -10 32 0" stroke="hsl(25 55% 28%)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Kraft paper bag */}
          <g>
            <path
              d="M70 180 h180 l-12 120 a16 16 0 0 1 -16 14 h-124 a16 16 0 0 1 -16 -14 z"
              fill="hsl(35 50% 70%)"
              stroke="hsl(25 45% 30%)"
              strokeWidth="3"
            />
            {/* Bag fold/top edge */}
            <path
              d="M70 180 q90 -20 180 0"
              fill="none"
              stroke="hsl(25 45% 30%)"
              strokeWidth="3"
            />
            {/* Vertical pleats */}
            <path d="M110 184 v126 M210 184 v126" stroke="hsl(25 45% 30%)" strokeWidth="1.5" opacity="0.4" />

            {/* Label */}
            <rect x="120" y="220" width="80" height="60" rx="6" fill="hsl(var(--card))" stroke="hsl(25 45% 30%)" strokeWidth="2" />
            <text
              x="160"
              y="250"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
              fontSize="16"
              fontWeight="800"
              fill="hsl(var(--foreground))"
            >
              La Espiga
            </text>
            {/* Mini wheat icon on label */}
            <g transform="translate(150 258)">
              <path d="M10 0 v18" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 4 q-6 -2 -8 4 M10 4 q6 -2 8 4 M10 10 q-6 -2 -8 4 M10 10 q6 -2 8 4" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* Floating chips */}
      <div
        className="absolute left-2 top-6 flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        <Wheat className="h-3.5 w-3.5 text-primary" />
        +S/30 en La Espiga
      </div>
      <div
        className="absolute bottom-4 right-2 flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-brand animate-fade-up"
        style={{ animationDelay: "320ms" }}
      >
        <Wifi className="h-3.5 w-3.5" />
        Internet desde S/39.50
      </div>
    </div>
  );
};
