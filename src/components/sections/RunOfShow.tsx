import { runOfShow } from "@/content/webinar";

// Timecodes read like a broadcast rundown: hours:minutes from the start.
const timecode = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export function RunOfShow() {
  return (
    <section id="agenda" aria-labelledby="agenda-title" className="section bg-paper">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-muted">Run of show</p>
            <h2 id="agenda-title" className="display h2 mt-4 max-w-2xl">
              Two hours, planned down to the minute.
            </h2>
          </div>
          <p className="max-w-xs text-muted">
            Times are from the start of the session. We stick to them, so you can plan dinner around us.
          </p>
        </div>

        {/* As you scroll, each segment's cue light goes on air (red), then stays done (ink). */}
        <div className="rundown relative mt-14">
          <div aria-hidden="true" className="absolute inset-y-0 left-[5px] hidden w-px bg-line md:block">
            <div className="rundown-fill size-full bg-ink" />
          </div>
          <ol className="md:pl-12">
            {runOfShow.map((item) => (
              <li
                key={item.at}
                className="reveal group relative grid grid-cols-[76px_1fr] gap-x-5 gap-y-2 border-b border-line py-7 first:border-t md:grid-cols-[150px_1fr_1fr] md:gap-x-10"
              >
                <span
                  aria-hidden="true"
                  className="cue absolute -left-12 top-[36px] hidden size-[11px] rounded-full border-2 border-paper bg-line md:block"
                />
                <span className="timecode led row-span-2 text-2xl leading-none text-muted transition-colors group-hover:text-ink md:row-span-1 md:text-3xl">
                  {timecode(item.at)}
                </span>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h3>
                <p className="leading-relaxed text-muted">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
