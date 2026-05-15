import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";

export function WhatsAppHeader() {
  return (
    <header className="flex items-center gap-3 bg-wa-green-dark px-3 py-2.5 text-white shadow-md">
      <ArrowLeft className="h-5 w-5 shrink-0 opacity-90" />
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-base font-bold">
        CB
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold leading-tight">Claro Bot</p>
        <p className="truncate text-[12px] leading-tight opacity-80">en línea</p>
      </div>
      <Video className="h-5 w-5 opacity-90" />
      <Phone className="h-5 w-5 opacity-90" />
      <MoreVertical className="h-5 w-5 opacity-90" />
    </header>
  );
}
