import { tickets, webinar } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession, seatsLeft } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { ArrowRight } from "@/components/ui/Icons";
import { DotRing } from "@/components/ui/DotRing";

export function FinalCta() {
  const session = getSession();
  return (
    <section aria-labelledby="final-title" className="px-2.5 py-3 sm:px-4">
      <div
        data-spotlight
        className="spotlight grain relative overflow-hidden rounded-[28px] bg-ink py-24 text-center text-white sm:rounded-[36px] sm:py-32"
        style={{ "--mx": "50%", "--my": "0%" } as React.CSSProperties}
      >
        {/* the studio clock ring, blown up and turning slowly behind the headline */}
        <DotRing className="spin-slow pointer-events-none absolute left-1/2 top-1/2 w-[min(135vw,860px)] -translate-x-1/2 -translate-y-1/2 text-white/[0.07]" />

        <div className="wrap relative">
          <p className="eyebrow reveal flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-white/70">
            <span className="pulse size-2 rounded-full bg-signal" aria-hidden="true" />
            {formatDay(session.start)} · {formatTime(session.start)} IST · {webinar.platform}
          </p>
          <h2 id="final-title" className="display reveal mx-auto mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.8rem)]">
            Bring your idea. Leave with a launch plan.
          </h2>
          <div className="reveal mt-10 flex flex-col items-center gap-4">
            <CheckoutButton className="btn btn-light">
              Save my seat · {formatPrice(tickets[0].price)} <ArrowRight />
            </CheckoutButton>
            <p className="text-sm text-white/50">
              {seatsLeft()} of {webinar.seatsTotal} seats left
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
