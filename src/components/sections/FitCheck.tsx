import { fit } from "@/content/webinar";
import { Check, Minus } from "@/components/ui/Icons";

export function FitCheck() {
  return (
    <section aria-labelledby="fit-title" className="section">
      <div className="wrap">
        <p className="eyebrow text-muted">Before you book</p>
        <h2 id="fit-title" className="display h2 mt-4 max-w-2xl">
          It’s a good fit for most people. Not for everyone.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="card reveal p-7 sm:p-9">
            <h3 className="text-lg font-semibold">Come if…</h3>
            <ul className="mt-6 space-y-5">
              {fit.yes.map((line) => (
                <li key={line} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Check width={15} height={15} strokeWidth={2.5} />
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-3xl border border-line p-7 sm:p-9">
            <h3 className="text-lg font-semibold">Probably skip it if…</h3>
            <ul className="mt-6 space-y-5">
              {fit.no.map((line) => (
                <li key={line} className="flex gap-4 text-muted">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line">
                    <Minus width={15} height={15} strokeWidth={2.5} />
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
