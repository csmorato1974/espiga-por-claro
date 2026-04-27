import { LeadForm } from "./LeadForm";

export const LeadSection = () => {
  return (
    <section id="formulario" className="bg-gradient-warm py-14 sm:py-20">
      <div className="container grid gap-10 px-4 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Déjanos tus datos</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
            Solicita atención prioritaria desde el QR
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Completa el formulario y un asesor te contactará por WhatsApp para confirmar cobertura,
            resolver dudas y coordinar la instalación.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-foreground/80">
            <li>✅ Atención rápida por WhatsApp</li>
            <li>✅ Asesor humano, no un bot</li>
            <li>✅ Beneficio de S/30 en La Espiga al contratar</li>
          </ul>
        </div>

        <LeadForm />
      </div>
    </section>
  );
};
