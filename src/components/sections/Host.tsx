import Image from "next/image";
import { host } from "@/content/webinar";

export function Host() {
  const firstName = host.name.split(" ")[0];
  return (
    <section id="host" aria-labelledby="host-title" className="section border-y-2 border-ink bg-sky-soft">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* a polaroid: set host.photo in content/webinar.ts to show a real photo */}
        <figure className="box reveal mx-auto w-full max-w-sm -rotate-2 p-4 pb-5">
          <div className="relative grid aspect-4/5 place-items-center overflow-hidden rounded-xl border-2 border-ink bg-marigold">
            {host.photo ? (
              <Image src={host.photo} alt={host.name} fill sizes="(min-width: 1024px) 384px, 90vw" className="object-cover" />
            ) : (
              <span className="display text-8xl" aria-hidden="true">
                {host.initials}
              </span>
            )}
          </div>
          <figcaption className="hand mt-4 text-center text-2xl">{host.name}</figcaption>
        </figure>

        <div>
          <h2 id="host-title" className="display h2">
            Hi, I’m {firstName}.
          </h2>
          <p className="mt-2 text-lg font-semibold">{host.role}</p>
          <div className="mt-6 space-y-4 text-lg">
            {host.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {["60+ launches", "Hindi + English", "Teaching since 2019"].map((tag) => (
              <li key={tag} className="sticker">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
