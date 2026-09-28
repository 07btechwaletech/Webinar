import { outcomes } from "@/content/webinar";
import { outcomeIcons } from "@/components/ui/Icons";

export function Outcomes() {
  return (
    <section id="learn" aria-labelledby="learn-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-muted">What you’ll leave with</p>
          <h2 id="learn-title" className="display h2 mt-4">
            By 9 PM, you’ll have four things you didn’t at 7.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            No theory decks. We build each of these together on screen, and you keep all of it.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {outcomes.map((o) => {
            const Icon = outcomeIcons[o.icon];
            return (
              <li key={o.title} className="card lift reveal group p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-fog transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                  <Icon width={22} height={22} />
                </span>
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{o.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
