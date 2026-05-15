import { QRCodeSVG } from "qrcode.react";
import { MessageCircle, Wifi, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EspigaLogo } from "./Logos";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

export const QRCallout = () => {
  const landingUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "https://espiga-por-claro.lovable.app/";

  return (
    <section id="qr" className="bg-gradient-warm py-14 sm:py-20">
      <div className="container px-4">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-brand sm:p-10">
          <div className="absolute inset-0 texture-wheat opacity-30" aria-hidden />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-espiga-gold/30 blur-3xl" aria-hidden />

          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Wheat className="h-3.5 w-3.5" /> Promo La Espiga
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
                ¿Quieres internet por{" "}
                <span className="bg-gradient-brand bg-clip-text text-transparent">
                  S/ 39.50
                </span>{" "}
                al mes y{" "}
                <span className="text-espiga-coffee">S/ 30 de consumo gratis</span>{" "}
                en La Espiga?
              </h2>

              <p className="mt-3 text-lg font-semibold text-foreground/80">
                Escanea este QR y un asesor te atiende al toque.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-wa-brand text-white hover:bg-wa-brand-dark shadow-brand"
                >
                  <a
                    href={buildWhatsAppLink("general")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("qr_callout")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Hablar por WhatsApp
                  </a>
                </Button>
                <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-2 text-sm font-semibold text-foreground">
                  <Wifi className="h-4 w-4 text-primary" /> Internet desde S/39.50
                </div>
              </div>
            </div>

            <div className="mx-auto flex flex-col items-center gap-3">
              <div className="rounded-2xl border-4 border-primary bg-white p-4 shadow-card">
                <QRCodeSVG
                  value={landingUrl}
                  size={196}
                  level="H"
                  includeMargin={false}
                  fgColor="hsl(145 80% 18%)"
                  bgColor="#ffffff"
                />
              </div>
              <div className="flex items-center gap-2">
                <EspigaLogo className="h-10 w-auto" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Escanea aquí
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
