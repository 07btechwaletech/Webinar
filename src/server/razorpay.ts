import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

// Without keys the site runs a demo checkout that never charges money.
export const razorpayEnabled = Boolean(keyId && keySecret);
export const razorpayKeyId = keyId ?? "";

export async function createOrder(rupees: number, receipt: string) {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: rupees * 100, currency: "INR", receipt }),
  });
  if (!res.ok) throw new Error(`Razorpay order failed with ${res.status}: ${await res.text()}`);
  return (await res.json()) as { id: string; amount: number };
}

// Razorpay signs "order_id|payment_id" with the key secret. A match proves the payment is real.
export function verifyPayment(orderId: string, paymentId: string, signature: string) {
  if (!keySecret) return false;
  const expected = Buffer.from(createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex"));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
