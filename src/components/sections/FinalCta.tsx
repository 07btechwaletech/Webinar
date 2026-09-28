import { tickets, webinar } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession, seatsLeft } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { Countdown } from "@/components/ui/Countdown";
import { ArrowRight } from "@/components/ui/Icons";

export function FinalCta() {
  const { start } = getSession();
  return (
    <section aria-labelledby="final-title" className="border-t-2 border-ink bg-marigold py-20 sm:py-24">
      <div className="wrap flex flex-col items-center text-center">
        <p className="sticker -rotate-2">
          {formatDay(start)} · {formatTime(start)} IST
        </p>
        <h2 id="final-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)]">
          Bring your idea. Leave with a launch plan.
        </h2>
        <Countdown className="mt-8" />
        <CheckoutButton className="btn btn-dark mt-8 min-h-[60px] px-7 text-lg">
          Reserve my seat for {formatPrice(tickets[0].price)} <ArrowRight />
        </CheckoutButton>
        <p className="mt-4 font-semibold">
          {seatsLeft()} of {webinar.seatsTotal} seats left
        </p>
      </div>
    </section>
  );
}
