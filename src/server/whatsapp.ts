import "server-only";
import { webinar } from "@/content/webinar";
import { formatDay, formatTime, getSession } from "@/lib/session";
import type { Lead, WhatsAppStatus } from "./leads";

// The confirmation as the attendee reads it. The approved Meta template should say the same
// thing with {{1}} name, {{2}} date, {{3}} time, {{4}} seat number.
export function confirmationText(lead: Lead) {
  const { start } = getSession();
  return [
    `Namaste ${lead.name.split(" ")[0]}! 🙏 Your payment of ₹${lead.amount} is received.`,
    `Your seat for “${webinar.title}” is confirmed ✅`,
    `📅 ${formatDay(start)}, ${formatTime(start)} IST`,
    `🎟️ Seat no. ${lead.seatNo}`,
    `The join link will come here 15 minutes before we start.`,
  ].join("\n");
}

// Sends the confirmation through the WhatsApp Cloud API. Without credentials it only logs,
// and the admin page shows the message as "simulated".
export async function sendConfirmation(lead: Lead): Promise<WhatsAppStatus> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    console.info(`[whatsapp simulated] to +91${lead.phone}\n${confirmationText(lead)}`);
    return "simulated";
  }

  const { start } = getSession();
  const params = [lead.name.split(" ")[0], formatDay(start), formatTime(start), String(lead.seatNo)];
  try {
    const res = await fetch(`https://graph.facebook.com/v23.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: `91${lead.phone}`,
        type: "template",
        template: {
          name: process.env.WHATSAPP_TEMPLATE ?? "webinar_confirmation",
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG ?? "en" },
          components: [{ type: "body", parameters: params.map((text) => ({ type: "text", text })) }],
        },
      }),
    });
    if (!res.ok) console.error(`[whatsapp] ${res.status} ${await res.text()}`);
    return res.ok ? "sent" : "failed";
  } catch (error) {
    console.error("[whatsapp]", error);
    return "failed";
  }
}
