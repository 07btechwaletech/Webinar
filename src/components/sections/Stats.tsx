import { stats } from "@/content/webinar";
import { CountUp } from "@/components/ui/CountUp";

export function Stats() {
  return (
    <section aria-label="In numbers" className="pb-4">
      <dl className="wrap grid auto-rows-fr gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="box reveal flex flex-col-reverse justify-center px-6 py-5 text-center">
            <dt className="text-muted">{s.label}</dt>
            <dd className="display text-4xl">
              <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
