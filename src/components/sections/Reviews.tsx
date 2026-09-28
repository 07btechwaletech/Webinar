import { reviews } from "@/content/webinar";

// Styled like WhatsApp screenshots, the way creators actually share feedback.
export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="reviews-title" className="display h2">
            Messages we got after the last session
          </h2>
          <p className="hand mt-3 text-2xl text-muted">bina edit kiye, jaise aaye waise</p>
        </div>

        <ul className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name} className="box reveal flex flex-col overflow-hidden">
              <div className="flex items-center gap-3 border-b-2 border-ink px-4 py-3">
                <span className="grid size-9 place-items-center rounded-full border-2 border-ink bg-mint-soft font-bold" aria-hidden="true">
                  {r.name[0]}
                </span>
                <p className="leading-tight">
                  <span className="block font-bold">{r.name}</span>
                  <span className="text-sm text-muted">{r.city}</span>
                </p>
              </div>
              <div className="flex-1 bg-wa-wall p-4">
                <blockquote className="w-fit max-w-[95%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-[0_1px_0_rgb(0_0_0/0.12)]">
                  <p>{r.text}</p>
                  <p className="mt-0.5 text-right text-[0.7rem] text-muted">{r.time}</p>
                </blockquote>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
