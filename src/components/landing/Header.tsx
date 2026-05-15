import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { InkacelLogo, EspigaLogo } from "./Logos";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-14 items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <EspigaLogo className="h-6 sm:h-7" />
          <span className="text-sm font-semibold text-muted-foreground sm:text-base">por</span>
          <InkacelLogo className="h-6 sm:h-7" />
        </div>
        <Button
          asChild
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft"
        >
          <a
            href={buildWhatsAppLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("header")}
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </header>
  );
};
