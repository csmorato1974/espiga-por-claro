import { QrPlaceholder } from "./QrPlaceholder";
import { ClaroLogo, EspigaLogo } from "./Logos";

/**
 * Mockup del display físico que estará impreso en los locales de La Espiga.
 * Sirve para que el cliente visualice la pieza completa de campaña.
 */
export const DisplayMockup = () => {
  return (
    <section className="container px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">El display físico</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Así se verá en cada local</h2>
        <p className="mt-3 text-muted-foreground">
          Una pieza simple, con el QR que dirige a esta misma landing.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md">
        <div className="relative rounded-[2rem] border-[10px] border-espiga-coffee/90 bg-card p-6 shadow-card">
          {/* "Easel" tab */}
          <div className="absolute -top-3 left-1/2 h-3 w-24 -translate-x-1/2 rounded-t-md bg-espiga-coffee/90" aria-hidden />

          <div className="flex items-center justify-center gap-2">
            <ClaroLogo className="h-7" />
            <span className="text-base font-semibold text-muted-foreground" aria-hidden>×</span>
            <EspigaLogo className="h-7" />
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-claro p-5 text-center text-primary-foreground">
            <p className="text-xs font-bold uppercase tracking-widest opacity-90">Oferta exclusiva</p>
            <p className="mt-1 text-2xl font-extrabold leading-tight">¿Quieres internet desde S/30?</p>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="rounded-xl border border-border bg-card p-3 shadow-soft">
              <QrPlaceholder className="h-40 w-40" />
            </div>
            <p className="mt-3 text-lg font-bold text-foreground">Escanea aquí</p>
          </div>

          <p className="mt-4 rounded-xl bg-espiga-cream px-4 py-3 text-center text-sm font-medium text-espiga-coffee">
            Y recibe <strong>S/30 de consumo gratis</strong> en La Espiga al contratar tu paquete Claro.
          </p>

          <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
            Campaña La Espiga × Claro
          </p>
        </div>
      </div>
    </section>
  );
};
