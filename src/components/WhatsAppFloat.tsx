import { contactWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={contactWhatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-ink/90 px-3 py-2 text-xs font-semibold text-cream shadow-lg group-hover:block sm:block sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
        Commander sur WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/30 transition-transform hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
