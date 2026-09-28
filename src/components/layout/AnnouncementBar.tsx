import { tickets } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession, seatsLeft } from "@/lib/session";

export function AnnouncementBar() {
  const { start } = getSession();
  return (
    <p className="border-b-2 border-ink bg-marigold px-4 py-2 text-center text-sm font-semibold">
      <span className="pulse mr-2 inline-block size-2 rounded-full bg-live align-middle" aria-hidden="true" />
      Live on {formatDay(start)} at {formatTime(start)} IST
      <span className="hidden sm:inline">
        {" "}
        · only {seatsLeft()} seats left at {formatPrice(tickets[0].price)}
      </span>
    </p>
  );
}
