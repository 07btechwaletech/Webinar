import { host } from "@/content/webinar";
import { CountUp } from "@/components/ui/CountUp";
import { DotRing } from "@/components/ui/DotRing";

export function Host() {
  return (
    <section id="host" aria-labelledby="host-title" className="section pt-0">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait slot: swap for the host's photo with next/image */}
        <div data-spotlight
          className="spotlight grain reveal relative aspect-4/5 overflow-hidden rounded-[32px] bg-ink text-white">
          <DotRing className="spin-slow pointer-events-none absolute left-1/2 top-[44%] w-[82%] -translate-x-1/2 -translate-y-1/2 text-white/10" />
          <span
            aria-hidden="true"
            className="display absolute inset-x-0 top-[44%] -translate-y-1/2 text-center text-[clamp(4.5rem,13vw,7.5rem)] text-white/90"
          >
            {host.initials}
          </span>
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3 backdrop-blur-md">
            <span className="text-sm font-medium">{host.name}</span>
            <span className="eyebrow flex items-center gap-2 text-[0.62rem] text-white/70">
              <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" /> Host
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow text-muted">Your host</p>
          <h2 id="host-title" className="display h2 mt-4">
            Hi, I’m {host.name.split(" ")[0]}.
          </h2>
          <p className="mt-2 text-muted">{host.role}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            {host.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {/* phones: one row per stat with values in a fixed column; wider screens: three equal columns */}
          <dl className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
            {host.facts.map((f) => (
              <div
                key={f.label}
                className="flex flex-row-reverse items-baseline justify-end gap-4 sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-2"
              >
                <dt className="text-sm leading-snug text-muted">{f.label}</dt>
                <dd className="display w-32 shrink-0 text-[clamp(1.6rem,3.4vw,2.3rem)] sm:w-auto">
                  <CountUp value={f.value} decimals={"decimals" in f ? f.decimals : 0} suffix={"suffix" in f ? f.suffix : ""} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
