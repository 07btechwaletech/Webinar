import { brand, faqs } from "@/content/webinar";
import { Plus } from "@/components/ui/Icons";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-paper">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-muted">Questions</p>
          <h2 id="faq-title" className="display h2 mt-4">
            The things people ask before booking.
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Didn’t find yours?{" "}
            <a href={`https://wa.me/${brand.whatsapp}`} className="font-medium text-ink underline underline-offset-4">
              Message us on WhatsApp
            </a>
            . A real person replies, usually within the hour.
          </p>
        </div>

        <div className="faq border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold">
                {f.q}
                <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-hover:border-ink">
                  <Plus width={18} height={18} />
                </span>
              </summary>
              <p className="max-w-xl pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
