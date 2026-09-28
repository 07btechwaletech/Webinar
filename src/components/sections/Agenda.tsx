import { agenda } from "@/content/webinar";
import { formatTime, getSession } from "@/lib/session";

export function Agenda() {
  const { start } = getSession();
  return (
    <section id="agenda" aria-labelledby="agenda-title" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="agenda-title" className="display h2">
            The 2-hour plan
          </h2>
          <p className="hand mt-3 text-2xl text-muted">time pe shuru, time pe khatam</p>
          <p className="mt-5 max-w-sm text-muted">Every segment has a slot. Plan dinner around us, we won’t run over.</p>
        </div>

        <ol className="box divide-y-2 divide-dashed divide-line overflow-hidden">
          {agenda.map((item) => (
            <li key={item.at} className="grid gap-x-6 gap-y-2 p-6 sm:grid-cols-[110px_1fr]">
              <span className="sticker h-fit w-fit bg-marigold-soft tabular-nums shadow-none">
                {formatTime(start + item.at * 60_000)}
              </span>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-1 text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
