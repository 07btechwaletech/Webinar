import { webinar } from "@/content/webinar";

const WEEK = 7 * 24 * 60 * 60 * 1000;
const IST = "Asia/Kolkata";

// Rolls the first session forward week by week, so the demo never shows a past date.
export function getSession(now = Date.now()) {
  const duration = webinar.durationMin * 60 * 1000;
  let start = Date.parse(webinar.firstSessionISO);
  while (start + duration <= now) start += WEEK;
  return { start, end: start + duration, isLive: now >= start };
}

export const formatDay = (t: number) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: IST, weekday: "short", day: "numeric", month: "short" }).format(t);

export const formatTime = (t: number) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: IST, hour: "numeric", minute: "2-digit", hour12: true })
    .format(t)
    .toUpperCase();

export const formatPrice = (rupees: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(rupees);

export const seatsLeft = () => webinar.seatsTotal - webinar.seatsTaken;

export function googleCalendarUrl(start: number, end: number) {
  const stamp = (t: number) => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: webinar.title,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: "Your joining link arrives on WhatsApp 15 minutes before we start.",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
