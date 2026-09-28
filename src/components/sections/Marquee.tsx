import { niches } from "@/content/webinar";

// Who comes to these sessions, on a slow loop. The second copy makes the loop seamless.
export function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line py-7">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? "Who comes to these sessions" : undefined}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {niches.map((n) => (
              <li key={n} className="display flex items-center whitespace-nowrap text-[clamp(1.6rem,3.2vw,2.6rem)]">
                <span className="px-8">{n}</span>
                <span className="size-2 rounded-full bg-ink/25" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
