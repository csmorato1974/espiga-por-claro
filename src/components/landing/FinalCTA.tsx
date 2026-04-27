import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

export const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-claro py-16 text-primary-foreground sm:py-24">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary-foreground/30 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-espiga-gold/40 blur-3xl" />
      </div>

      <div className="container relative px-4 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
          ¿Listo para tener internet desde S/30?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
          Déjanos tus datos o conversa directamente con un asesor por WhatsApp.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 bg-card text-foreground hover:bg-card/90"
          >
            <a
              href={buildWhatsAppLink("general")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("final_whatsapp")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar por WhatsApp
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href="#formulario">
              <PhoneCall className="mr-2 h-5 w-5" />
              Solicitar llamada
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
