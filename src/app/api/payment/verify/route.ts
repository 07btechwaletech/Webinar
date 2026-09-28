import { getLead, markPaid, setWhatsAppStatus } from "@/server/leads";
import { razorpayEnabled, verifyPayment } from "@/server/razorpay";
import { confirmationText, sendConfirmation } from "@/server/whatsapp";

// Step 2 of checkout: prove the payment happened, mark the seat paid, send the WhatsApp confirmation.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lead = body?.leadId ? await getLead(String(body.leadId)) : null;
  if (!lead) return Response.json({ error: "We couldn’t find this registration. Please register again." }, { status: 404 });

  if (body.demo) {
    // Demo payments only exist while Razorpay isn't connected.
    if (razorpayEnabled) return Response.json({ error: "Demo payments are switched off." }, { status: 400 });
  } else {
    const { orderId, paymentId, signature } = body;
    if (!lead.orderId || lead.orderId !== orderId || !verifyPayment(String(orderId), String(paymentId), String(signature))) {
      return Response.json(
        { error: "We couldn’t verify this payment. If money left your account, message us on WhatsApp and we’ll sort it out." },
        { status: 400 },
      );
    }
  }

  try {
    const result = await markPaid(lead.id, body.demo ? "demo" : String(body.paymentId));
    if (!result) return Response.json({ error: "We couldn’t find this registration." }, { status: 404 });

    const paid = result.lead;
    let whatsapp = paid.whatsappStatus;
    if (result.newlyPaid && paid.whatsappOptIn) {
      whatsapp = await sendConfirmation(paid);
      await setWhatsAppStatus(paid.id, whatsapp);
    }
    return Response.json({ seatNo: paid.seatNo, whatsapp, message: confirmationText(paid) });
  } catch (error) {
    console.error("[verify]", error);
    return Response.json({ error: "Your payment went through but we hit a snag saving it. Message us on WhatsApp." }, { status: 500 });
  }
}
