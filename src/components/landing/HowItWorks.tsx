import { QrCode, Layers, ClipboardList, MessageCircle } from "lucide-react";

const STEPS = [
  { icon: QrCode, title: "Escanea el QR", desc: "El sistema registra tu perfil para atención personalizada." },
  { icon: Layers, title: "Deja tus datos", desc: "Revisa la oferta Inkacel y selecciona el paquete de interés." },
  { icon: ClipboardList, title: "Deja sus datos", desc: "El sistema registra el lead para seguimiento comercial." },
  { icon: MessageCircle, title: "Atención por WhatsApp", desc: "Un asesor confirma cobertura, resuelve dudas y gestiona la instalación." },
];

export const HowItWorks = () => {
  return (
    <section className="bg-foreground py-14 text-background sm:py-20">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-bold uppercase tracking-widest text-primary-glow text-4xl font-mono">​</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Cómo funciona</h2>
          <p className="mt-3 text-background/70">​</p>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
// ... keep existing code
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-background/70">{s.desc}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm italic text-background/60">
          "​"
        </p>
      </div>
    </section>
  );
};
