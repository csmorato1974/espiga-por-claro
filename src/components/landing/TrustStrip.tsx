import { ShieldCheck, Zap, Gift, UserCheck, MapPin } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, text: "Campaña exclusiva para clientes de La Espiga." },
  { icon: Zap, text: "Atención rápida por WhatsApp." },
  { icon: Gift, text: "Promoción con beneficio de consumo en tienda." },
  { icon: UserCheck, text: "Seguimiento personalizado." },
  { icon: MapPin, text: "Instalación sujeta a cobertura." },
];

export const TrustStrip = () => {
  return (
    <section className="border-y border-border bg-card py-10">
      <div className="container px-4">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((it) => (
            <li
              key={it.text}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-4"
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                <it.icon className="h-4.5 w-4.5" />
              </span>
              <p className="text-sm font-medium text-foreground">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
