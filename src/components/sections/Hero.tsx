import { tickets, webinar } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { Countdown } from "@/components/ui/Countdown";
import { Scribble } from "@/components/ui/Scribble";
import { ArrowRight, Star } from "@/components/ui/Icons";
import { WhatsAppPhone } from "./WhatsAppPhone";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const FACES = [
  { initials: "PK", tint: "bg-sky-soft" },
  { initials: "AS", tint: "bg-blush-soft" },
  { initials: "MN", tint: "bg-mint-soft" },
  { initials: "RV", tint: "bg-marigold-soft" },
];

export function Hero() {
  const { start } = getSession();
  const [before, after] = webinar.title.split(webinar.highlight);

  return (
    <section id="hero" aria-labelledby="hero-title" className="grid-paper">
      <div className="wrap grid items-center gap-14 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-20">
        <div>
          <p className="sticker rise -rotate-2">
            <span className="pulse size-2.5 rounded-full bg-live" aria-hidden="true" />
            Live · {formatDay(start)} · {formatTime(start)} IST
          </p>

          <h1 id="hero-title" className="display rise mt-6 text-[clamp(2.6rem,6vw,4.5rem)]" style={delay(80)}>
            {before}
            <span className="marker">{webinar.highlight}</span>
            {after}
          </h1>

          <p className="rise mt-6 max-w-xl text-lg text-muted sm:text-xl" style={delay(160)}>
            {webinar.subtitle}
          </p>

          <div className="rise mt-8" style={delay(240)}>
            <p className="mb-2 text-sm font-bold">Starts in</p>
            <Countdown />
          </div>

          <div className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" style={delay(320)}>
            <CheckoutButton className="btn btn-primary min-h-[60px] px-7 text-lg">
              Reserve my seat for {formatPrice(tickets[0].price)} <ArrowRight />
            </CheckoutButton>
            <p className="hand flex items-center gap-1 text-xl">
              <Scribble to="left" className="h-8 w-12" delay={1100} />
              chai se bhi sasta ☕
            </p>
          </div>

          <div className="rise mt-8 flex items-center gap-3" style={delay(400)}>
            <div className="flex -space-x-2" aria-hidden="true">
              {FACES.map((f) => (
                <span key={f.initials} className={`grid size-10 place-items-center rounded-full border-2 border-ink text-xs font-bold ${f.tint}`}>
                  {f.initials}
                </span>
              ))}
            </div>
            <div className="leading-tight">
              <p className="flex items-center gap-0.5 text-marigold-deep" aria-label="Rated 4.8 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} />
                ))}
                <span className="ml-1.5 font-bold text-ink">4.8</span>
              </p>
              <p className="text-sm text-muted">12,400+ creators have joined</p>
            </div>
          </div>
        </div>

        <div className="rise relative" style={delay(200)}>
          <p className="hand mx-auto mb-1 flex w-[290px] -rotate-2 items-end justify-between gap-2 text-xl sm:w-[320px]">
            payment hote hi, WhatsApp pe confirmation
            <Scribble to="down" className="h-12 w-14 shrink-0 -scale-x-100" delay={1400} />
          </p>
          <WhatsAppPhone />
        </div>
      </div>
    </section>
  );
}
