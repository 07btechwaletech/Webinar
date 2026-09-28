import { tickets } from "@/content/webinar";
import { formatPrice } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { ArrowRight, Check, Lock } from "@/components/ui/Icons";
import { DotRing } from "@/components/ui/DotRing";

export function Tickets() {
  return (
    <section id="seats" aria-labelledby="seats-title" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted">Seats</p>
          <h2 id="seats-title" className="display h2 mt-4">
            Pick your seat.
          </h2>
          <p className="mt-5 text-lg text-muted">One session, two ways in. Prices include GST.</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
          {tickets.map((t) => (
            <article
              key={t.id}
              data-spotlight={t.featured || undefined}
              className={`reveal lift relative flex flex-col overflow-hidden rounded-[28px] p-7 sm:p-9 ${
                t.featured ? "spotlight grain bg-ink text-white" : "card"
              }`}
              style={t.featured ? ({ "--mx": "85%", "--my": "0%" } as React.CSSProperties) : undefined}
            >
              {t.featured && (
                <>
                  <DotRing className="spin-slow pointer-events-none absolute -right-28 -top-28 size-72 text-white/10" />
                  <span className="eyebrow absolute right-6 top-6 rounded-full border border-white/20 bg-ink px-3 py-1.5 text-[0.6rem] text-white/80">
                    Most picked
                  </span>
                </>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className={`mt-1 text-sm ${t.featured ? "text-white/60" : "text-muted"}`}>{t.blurb}</p>
              <p className="display mt-8 text-6xl">{formatPrice(t.price)}</p>

              <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-8 ${t.featured ? "border-white/12" : "border-line"}`}>
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <Check className="mt-0.5 shrink-0" width={18} height={18} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <CheckoutButton ticket={t.id} className={`btn mt-9 w-full ${t.featured ? "btn-light" : "btn-ink"}`}>
                {t.featured ? "Get the seat and the kit" : "Save my seat"} <ArrowRight />
              </CheckoutButton>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted">
          <Lock width={16} height={16} className="shrink-0" />
          UPI, cards, net banking and EMI through Razorpay. Your GST invoice arrives by email.
        </p>
      </div>
    </section>
  );
}
