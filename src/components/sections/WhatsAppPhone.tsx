import { brand, tickets, webinar } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession } from "@/lib/session";
import { Ticks } from "@/components/ui/Icons";

type Message = { from: "business" | "me"; lines: string[]; time: string };

// A phone showing the WhatsApp messages an attendee gets after paying. Bubbles pop in one by one.
export function WhatsAppPhone() {
  const { start } = getSession();
  const messages: Message[] = [
    { from: "business", time: "6:02 PM", lines: [`Namaste Priya! 🙏 Your payment of ${formatPrice(tickets[0].price)} is received.`] },
    {
      from: "business",
      time: "6:02 PM",
      lines: ["Your seat is confirmed ✅", `📅 ${formatDay(start)}, ${formatTime(start)} IST`, `🎟️ Seat no. ${webinar.seatsTaken + 1}`],
    },
    { from: "me", time: "6:04 PM", lines: ["Thank you! Excited 🙌"] },
    { from: "business", time: "6:05 PM", lines: ["Reminder ⏰ The join link will come right here, 15 minutes before we start."] },
  ];

  return (
    <div className="mx-auto w-[290px] sm:w-[320px]" aria-label="Example WhatsApp confirmation" role="img">
      <div className="rounded-[46px] border-2 border-ink bg-ink p-2 shadow-[8px_8px_0_var(--color-ink)]">
        <div className="overflow-hidden rounded-[38px] bg-wa-wall">
          {/* chat header */}
          <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-7 text-white">
            <span className="display grid size-9 place-items-center rounded-full border-2 border-white bg-marigold text-ink">B</span>
            <div className="leading-tight">
              <p className="font-semibold">{brand.name}</p>
              <p className="text-xs text-white/75">online</p>
            </div>
          </div>

          {/* messages */}
          <div className="flex min-h-[380px] flex-col gap-2 px-3 py-4 text-[0.9rem] leading-snug">
            <span className="mx-auto mb-1 rounded-md bg-white/80 px-2 py-0.5 text-xs text-muted">Today</span>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`pop max-w-[85%] rounded-xl px-3 py-2 shadow-[0_1px_0_rgb(0_0_0/0.12)] ${
                  m.from === "me" ? "ml-auto rounded-tr-sm bg-wa-bubble" : "rounded-tl-sm bg-white"
                }`}
                style={{ "--d": `${700 + i * 750}ms` } as React.CSSProperties}
              >
                {m.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="mt-0.5 flex items-center justify-end gap-1 text-[0.68rem] text-muted">
                  {m.time}
                  {m.from === "me" && <Ticks />}
                </p>
              </div>
            ))}
          </div>

          {/* composer */}
          <div className="flex items-center gap-2 px-3 pb-5">
            <span className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-muted">Message</span>
            <span className="grid size-9 place-items-center rounded-full bg-wa-dark text-white" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-2.1a7 7 0 006-6.9h-2z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
