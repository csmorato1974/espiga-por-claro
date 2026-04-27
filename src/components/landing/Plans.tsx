import { Check, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/config/campaign";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Plans = () => {
  return (
    <section id="planes" className="bg-secondary/50 py-14 sm:py-20">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Elige tu plan</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Tres planes Claro pensados para ti</h2>
          <p className="mt-3 text-muted-foreground">
            Precios referenciales. Un asesor confirmará disponibilidad y cobertura por WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-1",
                plan.highlighted
                  ? "border-primary/40 ring-2 ring-primary/30"
                  : "border-border",
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-claro px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-claro">
                  <Star className="mr-1 inline h-3 w-3" /> Más elegido
                </div>
              )}

              <h3 className="text-xl font-extrabold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {plan.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  "mt-6 h-11 w-full",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary-dark shadow-claro"
                    : "bg-foreground text-background hover:bg-foreground/90",
                )}
              >
                <a
                  href={buildWhatsAppLink(plan.whatsappKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`plan_${plan.id}`)}
                >
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  {plan.ctaLabel}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
