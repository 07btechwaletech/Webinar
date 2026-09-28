import { brand, faqs } from "@/content/webinar";
import { Plus, WhatsApp } from "@/components/ui/Icons";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 id="faq-title" className="display h2">
            Questions people ask before booking
          </h2>
          <p className="mt-5 max-w-sm text-muted">Didn’t find yours? A real person replies on WhatsApp, usually within the hour.</p>
          <a href={`https://wa.me/${brand.whatsapp}`} className="btn btn-white mt-6">
            <WhatsApp className="text-wa-dark" /> Ask on WhatsApp
          </a>
        </div>

        <div className="faq space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="box group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 text-lg font-bold">
                {f.q}
                <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300">
                  <Plus width={18} height={18} />
                </span>
              </summary>
              <p className="px-5 pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
