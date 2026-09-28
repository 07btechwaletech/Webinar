import { tickets } from "@/content/webinar";
import { formatPrice } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { ArrowRight, Check, Lock } from "@/components/ui/Icons";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section border-t-2 border-ink bg-blush-soft">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-title" className="display h2">
            Pick your seat
          </h2>
          <p className="mt-3 text-lg text-muted">One session, two ways in. Prices include GST.</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl auto-rows-fr gap-6 md:grid-cols-2">
          {tickets.map((t) => (
            <article key={t.id} className={`box reveal relative flex flex-col p-6 sm:p-8 ${t.featured ? "bg-marigold" : ""}`}>
              {t.featured && <span className="sticker absolute -top-4 right-6 rotate-3">Most popular</span>}
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="text-muted">{t.blurb}</p>
              <p className="display mt-6 text-6xl">{formatPrice(t.price)}</p>

              <ul className="mt-6 flex-1 space-y-3 border-t-2 border-dashed border-ink/25 pt-6">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink bg-white">
                      <Check width={14} height={14} strokeWidth={3} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <CheckoutButton ticket={t.id} className={`btn mt-8 w-full whitespace-normal text-center ${t.featured ? "btn-dark" : "btn-primary"}`}>
                {t.featured ? "Get the seat and the kit" : "Reserve my seat"} <ArrowRight />
              </CheckoutButton>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 text-center text-muted">
          <Lock width={18} height={18} className="shrink-0" />
          Secure payment via Razorpay. Not useful? Full refund within 24 hours.
        </p>
      </div>
    </section>
  );
}
