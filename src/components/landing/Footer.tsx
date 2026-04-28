import { ClaroLogo, EspigaLogo } from "./Logos";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container flex flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <EspigaLogo className="h-6" />
          <span className="text-sm font-semibold text-muted-foreground">por</span>
          <ClaroLogo className="h-6" />
        </div>
        <p className="max-w-md text-xs text-muted-foreground">
          Campaña La Espiga por Claro. Promoción válida sujeta a cobertura y validación comercial.
          Los precios son referenciales y pueden variar.
        </p>
      </div>
    </footer>
  );
};
