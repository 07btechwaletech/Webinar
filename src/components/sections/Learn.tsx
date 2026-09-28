import { outcomes } from "@/content/webinar";
import { outcomeIcons } from "@/components/ui/Icons";

export function Learn() {
  return (
    <section id="learn" aria-labelledby="learn-title" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="learn-title" className="display h2">
            What you’ll walk away with
          </h2>
          <p className="hand mt-3 text-2xl text-muted">sab kuch live, screen pe, aapke saath</p>
        </div>

        <ul className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => {
            const Icon = outcomeIcons[o.icon];
            return (
              <li key={o.title} className="box reveal flex flex-col p-6">
                <span className={`grid size-12 place-items-center rounded-xl border-2 border-ink ${o.tint}`}>
                  <Icon width={22} height={22} />
                </span>
                <h3 className="mt-5 text-xl font-bold leading-snug">{o.title}</h3>
                <p className="mt-2 text-muted">{o.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
