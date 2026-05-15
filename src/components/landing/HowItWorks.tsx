import { QrCode, Layers, ClipboardList, MessageCircle } from "lucide-react";

const STEPS = [
  { icon: QrCode, title: "Escanea el QR", desc: "El cliente encuentra el display en La Espiga y escanea el código." },
  { icon: Layers, title: "Elige su plan", desc: "Revisa la oferta Inkacel y selecciona el paquete de interés." },
  { icon: ClipboardList, title: "Deja sus datos", desc: "El sistema registra el lead para seguimiento comercial." },
  { icon: MessageCircle, title: "Atención por WhatsApp", desc: "Un asesor confirma cobertura, resuelve dudas y gestiona la instalación." },
];

export const HowItWorks = () => {
  return (
    <section className="bg-foreground py-14 text-background sm:py-20">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-glow">Cómo funciona</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">De una gráfica a un cliente atendido</h2>
          <p className="mt-3 text-background/70">El embudo completo en cuatro pasos.</p>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-background/10 bg-background/[0.04] p-5 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-background/50">
                  Paso {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-background/70">{s.desc}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm italic text-background/60">
          "Tráfico sin sistema de gestión de leads es inversión perdida."
        </p>
      </div>
    </section>
  );
};
