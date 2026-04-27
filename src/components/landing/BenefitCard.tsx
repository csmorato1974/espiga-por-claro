import { Gift } from "lucide-react";

export const BenefitCard = () => {
  return (
    <section className="container px-4 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-6 shadow-claro sm:p-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-claro opacity-20 blur-3xl" aria-hidden />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-espiga-gold/30 blur-3xl" aria-hidden />

        <div className="relative grid gap-6 sm:grid-cols-[auto,1fr] sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-claro text-primary-foreground shadow-claro">
            <Gift className="h-8 w-8" />
          </div>

          <div>
            <span className="inline-block rounded-full bg-espiga-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-espiga-coffee">
              Beneficio exclusivo
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
              Contrata tu paquete Claro y recibe{" "}
              <span className="text-primary">S/30 de consumo gratis</span> en La Espiga.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Promoción válida para clientes que lleguen desde el QR de campaña. Sujeto a validación comercial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
