import { brand } from "@/content/webinar";
import { WhatsApp } from "@/components/ui/Icons";

export function WhatsAppFab() {
  const text = encodeURIComponent("Hi! I have a question about the Sunday webinar.");
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Ask a question on WhatsApp"
      className="wiggle fixed bottom-24 right-4 z-30 grid size-14 place-items-center rounded-full border-2 border-ink bg-wa text-white shadow-[3px_3px_0_var(--color-ink)] md:bottom-6 md:right-6"
    >
      <WhatsApp width={28} height={28} />
    </a>
  );
}
