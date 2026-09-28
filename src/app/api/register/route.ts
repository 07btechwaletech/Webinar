import { tickets } from "@/content/webinar";
import { cleanPhone, validateLead } from "@/lib/validate";
import { attachOrder, createLead } from "@/server/leads";
import { createOrder, razorpayEnabled, razorpayKeyId } from "@/server/razorpay";

// Step 1 of checkout: save the lead first (so nobody is lost if payment fails), then open a payment.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const ticket = tickets.find((t) => t.id === body?.ticketId);
  if (!body || !ticket) return Response.json({ error: "Pick a ticket and try again." }, { status: 400 });

  const input = {
    name: String(body.name ?? "").trim().slice(0, 80),
    email: String(body.email ?? "").trim().toLowerCase().slice(0, 120),
    phone: cleanPhone(String(body.phone ?? "")),
  };
  const errors = validateLead(input);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  try {
    const lead = await createLead({ ...input, ticketId: ticket.id, amount: ticket.price, whatsappOptIn: body.whatsappOptIn !== false });
    if (!razorpayEnabled) return Response.json({ leadId: lead.id, payment: { mode: "demo" } });

    const order = await createOrder(ticket.price, lead.id);
    await attachOrder(lead.id, order.id);
    return Response.json({
      leadId: lead.id,
      payment: { mode: "razorpay", keyId: razorpayKeyId, orderId: order.id, amount: order.amount },
    });
  } catch (error) {
    console.error("[register]", error);
    return Response.json({ error: "We couldn’t save your details just now. Please try again in a minute." }, { status: 500 });
  }
}
