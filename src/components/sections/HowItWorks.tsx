import { steps } from "@/content/webinar";
import { WhatsApp } from "@/components/ui/Icons";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="section border-y-2 border-ink bg-marigold-soft">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="how-title" className="display h2">
            From “Register” to live in four steps
          </h2>
          <p className="hand mt-3 text-2xl text-muted">koi app download nahi karna</p>
        </div>

        <ol className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="box reveal flex flex-col p-6">
              <span className="display grid size-11 place-items-center rounded-full border-2 border-ink bg-marigold text-xl">
                {i + 1}
              </span>
              <h3 className="mt-5 flex items-center gap-2 text-xl font-bold">
                {step.title}
                {step.title.includes("WhatsApp") && <WhatsApp className="text-wa-dark" />}
              </h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
