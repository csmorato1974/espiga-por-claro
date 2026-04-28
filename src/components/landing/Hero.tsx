import { MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { EspigaProductsIllustration } from "./EspigaProductsIllustration";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 texture-wheat opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <div className="container relative grid gap-10 px-4 pb-16 pt-10 md:grid-cols-2 md:items-center md:pt-16 md:pb-24">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Promo activa desde el QR
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            Internet desde{" "}
            <span className="bg-gradient-claro bg-clip-text text-transparent">S/30</span>{" "}
            para clientes de La Espiga
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Escanea, elige tu plan y recibe atención inmediata por WhatsApp.{" "}
            <span className="font-semibold text-foreground">
              Además, al contratar tu paquete Claro, te llevas S/30 de consumo gratis en La Espiga.
            </span>
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-primary text-primary-foreground shadow-claro hover:bg-primary-dark"
            >
              <a
                href={buildWhatsAppLink("general")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero_primary")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Quiero mi plan por WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-foreground/20 bg-card hover:bg-secondary"
            >
              <a href="#planes">
                Ver planes disponibles
                <ChevronDown className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Atención por asesores reales · Instalación sujeta a cobertura
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-fade-up md:max-w-md" style={{ animationDelay: "120ms" }}>
          <PhoneScanIllustration />
        </div>
      </div>
    </section>
  );
};
