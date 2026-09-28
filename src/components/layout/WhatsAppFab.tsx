import { brand } from "@/content/webinar";
import { WhatsApp } from "@/components/ui/Icons";

export function WhatsAppFab() {
  const text = encodeURIComponent("Hi! I have a question about the Sunday webinar.");
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-6 z-30 hidden items-center gap-3 rounded-full bg-ink py-3 pl-4 pr-5 text-sm font-medium text-white shadow-xl transition-transform duration-300 hover:-translate-y-0.5 md:flex"
    >
      <WhatsApp />
      Questions? Chat with us
    </a>
  );
}
