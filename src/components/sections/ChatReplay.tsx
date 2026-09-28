import { chat } from "@/content/webinar";

type Message = (typeof chat)[number];

function ChatMessage({ m }: { m: Message }) {
  return (
    <li className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fog text-xs font-semibold" aria-hidden="true">
        {m.name[0]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2 text-sm">
          <span className="font-semibold">{m.name}</span>
          <span className="text-muted">{m.city}</span>
          <span className="ml-auto text-xs tabular-nums text-muted">{m.time}</span>
        </p>
        <p className="mt-1 leading-relaxed">{m.text}</p>
      </div>
    </li>
  );
}

export function ChatReplay() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section bg-paper">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-muted">From the chat</p>
          <h2 id="reviews-title" className="display h2 mt-4">
            What people typed while it was happening.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Messages from the 14 September session, shared with permission. Typos left in.
          </p>
          <p className="mt-8 flex items-center gap-3">
            <span className="display text-4xl">4.8</span>
            <span className="text-sm leading-snug text-muted">
              average rating
              <br />
              from 926 attendees
            </span>
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-line bg-fog/60">
          <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-4">
            <p className="text-sm font-semibold">Live chat</p>
            <p className="eyebrow text-[0.62rem] text-muted">14 Sept · Replay</p>
          </div>
          {/* tabIndex lets keyboard users pause the scroll by focusing the window */}
          <div tabIndex={0} className="chat-window h-[440px] overflow-hidden px-5" aria-label="Chat messages from a past session">
            <div className="chat-track">
              {/* both copies need identical height for a seamless loop */}
              <ul className="space-y-6 pt-6">
                {chat.map((m) => (
                  <ChatMessage key={m.name} m={m} />
                ))}
              </ul>
              <ul className="space-y-6 pt-6" aria-hidden="true">
                {chat.map((m) => (
                  <ChatMessage key={m.name} m={m} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
