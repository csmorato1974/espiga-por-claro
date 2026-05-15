import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/integrations/supabase/client";
import { CAMPAIGN, PLAN_LABEL } from "@/config/campaign";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { readUtm } from "@/lib/utm";

const planValues = [
  "plan_200",
  "plan_400",
  "plan_2play_200",
  "plan_2play_400",
  "no_seguro",
] as const;

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo").max(100),
  celular: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{7,20}$/u, "Ingresa un número de celular válido"),
  distrito: z.string().trim().min(2, "Ingresa tu distrito o zona").max(80),
  plan_interes: z.enum(planValues),
});

type FormValues = z.infer<typeof schema>;

export const LeadForm = () => {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      celular: "",
      distrito: "",
      plan_interes: "no_seguro",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const utm = readUtm();

    const payload = {
      nombre: values.nombre,
      celular: values.celular,
      distrito: values.distrito,
      plan_interes: values.plan_interes,
      origen: CAMPAIGN.origen,
      campania: CAMPAIGN.name,
      estado: "Nuevo lead",
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      local: utm.local,
      // fecha_registro -> created_at (server-side default)
    };

    const { error } = await supabase.from("leads").insert(payload);

    if (error) {
      console.error("Error guardando lead:", error);
      toast.error("No pudimos registrar tus datos. Intenta nuevamente.");
      return;
    }

    // TODO conectar tracking del lead:
    // window.gtag?.("event", "generate_lead", { plan: values.plan_interes });
    // window.fbq?.("track", "Lead", { value: 30, currency: "PEN" });
    // fetch("<APPS_SCRIPT_URL_GOOGLE_SHEETS>", { method: "POST", body: JSON.stringify(payload) });
    // fetch("<AIRTABLE_WEBHOOK_URL>", { method: "POST", body: JSON.stringify(payload) });
    // fetch("<CRM_WEBHOOK_URL>", { method: "POST", body: JSON.stringify(payload) });

    toast.success("¡Listo! Un asesor te contactará por WhatsApp.");
    setSubmitted(values);
    form.reset();
  };

  if (submitted) {
    const planLabel = PLAN_LABEL[submitted.plan_interes];
    const link = buildWhatsAppLink(
      "general",
      CAMPAIGN.messages.afterLead(submitted.nombre, planLabel),
    );

    return (
      <div className="rounded-3xl border border-success/30 bg-card p-8 text-center shadow-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-extrabold">¡Gracias, {submitted.nombre.split(" ")[0]}!</h3>
        <p className="mt-2 text-muted-foreground">
          Un asesor te contactará por WhatsApp para confirmar cobertura y completar la activación.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 h-12 w-full bg-primary text-primary-foreground hover:bg-primary-dark shadow-brand sm:w-auto"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("after_lead")}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Continuar por WhatsApp
          </a>
        </Button>
        <button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-4 block w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Registrar otro contacto
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
      noValidate
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input
            id="nombre"
            autoComplete="name"
            placeholder="Ej. María Gonzales"
            {...form.register("nombre")}
            aria-invalid={!!form.formState.errors.nombre}
          />
          {form.formState.errors.nombre && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.nombre.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="celular">Celular</Label>
          <Input
            id="celular"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. 999 999 999"
            {...form.register("celular")}
            aria-invalid={!!form.formState.errors.celular}
          />
          {form.formState.errors.celular && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.celular.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="distrito">Distrito o zona</Label>
          <Input
            id="distrito"
            autoComplete="address-level2"
            placeholder="Ej. Miraflores"
            {...form.register("distrito")}
            aria-invalid={!!form.formState.errors.distrito}
          />
          {form.formState.errors.distrito && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.distrito.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="plan_interes">Plan de interés</Label>
          <Select
            defaultValue="no_seguro"
            onValueChange={(v) => form.setValue("plan_interes", v as FormValues["plan_interes"])}
          >
            <SelectTrigger id="plan_interes">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plan_200">1Play 200MB (S/39.50 x 4 meses)</SelectItem>
              <SelectItem value="plan_400">1Play 400MB + Repetidor (S/55 x 6 meses)</SelectItem>
              <SelectItem value="plan_2play_200">2Play 200MB + Claro TV+ (S/75 x 4 meses)</SelectItem>
              <SelectItem value="plan_2play_400">2Play 400MB + Claro TV+ + Repetidor (S/85 x 4 meses)</SelectItem>
              <SelectItem value="no_seguro">No estoy seguro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
        className="mt-6 h-12 w-full bg-primary text-primary-foreground hover:bg-primary-dark shadow-brand"
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando…
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" /> Solicitar contacto
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Tu solicitud será atendida por un asesor comercial.
      </p>
    </form>
  );
};
