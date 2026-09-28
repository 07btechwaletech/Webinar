import { brand, tickets, webinar } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession, seatsLeft } from "@/lib/session";
import { StudioClock } from "@/components/clock/StudioClock";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { ArrowRight } from "@/components/ui/Icons";
import { SplitWords } from "@/components/ui/SplitWords";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const session = getSession();
  const filled = Math.round((webinar.seatsTaken / webinar.seatsTotal) * 100);

  const facts = [
    { label: "Length", value: "2 hours, live" },
    { label: "Language", value: webinar.language },
    { label: "Replay", value: `${webinar.replayDays} days included` },
  ];

  return (
    <section id="hero" aria-labelledby="hero-title" className="px-2.5 pt-2 sm:px-4">
      {/* the stage: a studio light follows the pointer, film grain, one light sweep on load */}
      <div data-spotlight className="spotlight grain sweep relative overflow-hidden rounded-[28px] bg-ink text-white sm:rounded-[36px]">

        <div className="wrap relative grid items-center gap-12 pb-12 pt-12 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:pb-14 lg:pt-16">
          <div>
            {/* each part is its own item, so on phones the date wraps cleanly under the first line */}
            <p className="rise eyebrow flex items-start gap-2.5 text-white/70">
              <span className="pulse mt-[5px] size-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              <span className="flex flex-wrap gap-x-2.5 gap-y-1.5">
                <span>{webinar.platform}</span>
                <span aria-hidden="true" className="hidden text-white/35 sm:inline">
                  ·
                </span>
                <span>
                  {formatDay(session.start)}, {formatTime(session.start)} IST
                </span>
              </span>
            </p>

            <h1 id="hero-title" className="display mt-6 text-[clamp(2.7rem,5.6vw,4.6rem)]">
              <span className="sr-only">{webinar.title}.</span>
              <SplitWords text={`${webinar.title}.`} delay={120} />
            </h1>

            <p className="rise mt-7 max-w-[34rem] text-lg leading-relaxed text-white/70" style={delay(520)}>
              A two-hour live session where we build your launch together: the registration page, the WhatsApp reminders,
              and a 20-minute pitch that turns attendees into students.
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay(620)}>
              <CheckoutButton className="btn btn-light">
                Save my seat · {formatPrice(tickets[0].price)} <ArrowRight />
              </CheckoutButton>
              <a href="#agenda" className="btn btn-line-dark">
                See the 2-hour plan
              </a>
            </div>

            <p className="rise mt-5 text-sm text-white/50" style={delay(700)}>
              Didn’t find it useful? Full refund, just reply to your confirmation within 24 hours.
            </p>
          </div>

          <div className="rise flex justify-center lg:justify-end" style={delay(250)}>
            <StudioClock className="w-[min(82vw,400px)]" />
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <dl className="wrap grid auto-rows-fr grid-cols-2 gap-x-4 gap-y-6 py-6 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow text-[0.65rem] text-white/45">{f.label}</dt>
                <dd className="mt-1.5 font-medium">{f.value}</dd>
              </div>
            ))}
            <div>
              <dt className="eyebrow text-[0.65rem] text-white/45">Seats</dt>
              <dd className="mt-1.5 font-medium">
                {seatsLeft()} of {webinar.seatsTotal} left
              </dd>
              <div className="mt-2 h-1 max-w-40 overflow-hidden rounded-full bg-white/12" aria-hidden="true">
                <div className="h-full rounded-full bg-white" style={{ width: `${filled}%` }} />
              </div>
            </div>
          </dl>
        </div>
      </div>

      <SocialProof />
    </section>
  );
}

function SocialProof() {
  const faces = ["PK", "AS", "MN", "RV", "SD"];
  return (
    <div className="wrap reveal flex flex-col items-center gap-4 py-10 text-center sm:flex-row sm:justify-center sm:text-left">
      <div className="flex -space-x-2.5" aria-hidden="true">
        {faces.map((f, i) => (
          <span
            key={f}
            className="grid size-10 place-items-center rounded-full border-2 border-fog text-xs font-semibold text-white"
            style={{ background: `hsl(222 10% ${16 + i * 9}%)` }}
          >
            {f}
          </span>
        ))}
      </div>
      <p className="max-w-xl text-muted">
        <span className="font-semibold text-ink">12,400+ people have joined a {brand.name} session.</span> Yoga teachers,
        Excel trainers, spoken-English coaches, home bakers, and a surprising number of CAs.
      </p>
    </div>
  );
}
