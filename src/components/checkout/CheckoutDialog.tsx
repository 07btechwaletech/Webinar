"use client";

import { useEffect, useRef, useState } from "react";
import { brand, tickets, webinar, type Ticket } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession, googleCalendarUrl } from "@/lib/session";
import { cleanPhone, validateLead, type LeadErrors, type LeadInput } from "@/lib/validate";
import { ArrowRight, Calendar, Check, Close, Lock, Ticks, WhatsApp } from "@/components/ui/Icons";

type Step = "details" | "pay" | "processing" | "done";
type Payment = { mode: "demo" } | { mode: "razorpay"; keyId: string; orderId: string; amount: number };
type Result = { seatNo: number; whatsapp: "sent" | "simulated" | "failed" | null; message: string };
type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const STEPS = ["Details", "Payment", "Confirmed"];
const STEP_INDEX: Record<Step, number> = { details: 0, pay: 1, processing: 1, done: 2 };
const METHODS = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm, any UPI app" },
  { id: "card", label: "Card", hint: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net banking", hint: "All major Indian banks" },
];

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay failed to load"));
    document.body.append(script);
  });
}

export function CheckoutDialog({ initialTicket, onClose }: { initialTicket: Ticket["id"]; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const handingOff = useRef(false); // true while Razorpay's own window is open
  const drag = useRef<{ startY: number; dy: number } | null>(null);

  const [step, setStep] = useState<Step>("details");
  const [ticketId, setTicketId] = useState(initialTicket);
  const [fields, setFields] = useState<LeadInput>({ name: "", email: "", phone: "" });
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [method, setMethod] = useState("upi");
  const [result, setResult] = useState<Result | null>(null);

  const ticket = tickets.find((t) => t.id === ticketId)!;
  const session = getSession();
  const phone = cleanPhone(fields.phone);
  const firstName = fields.name.trim().split(" ")[0];

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function update(key: keyof LeadInput, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submitDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validateLead(fields);
    setErrors(found);
    setNotice("");
    const first = Object.keys(found)[0];
    if (first) return form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();

    setBusy(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, ticketId, whatsappOptIn }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        return setNotice(data.error ?? "Please check the highlighted fields.");
      }
      setLeadId(data.leadId);
      const payment: Payment = data.payment;
      if (payment.mode === "razorpay") await openRazorpay(data.leadId, payment);
      else setStep("pay");
    } catch {
      setNotice("You seem to be offline. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  // Razorpay opens its own window, so ours steps aside until it reports back.
  async function openRazorpay(id: string, payment: Extract<Payment, { mode: "razorpay" }>) {
    await loadRazorpay();
    const reopen = () => {
      handingOff.current = false;
      dialog.current?.showModal();
    };
    handingOff.current = true;
    dialog.current?.close();
    new window.Razorpay!({
      key: payment.keyId,
      order_id: payment.orderId,
      amount: payment.amount,
      currency: "INR",
      name: brand.name,
      description: ticket.name,
      prefill: { name: fields.name, email: fields.email, contact: `+91${phone}` },
      theme: { color: "#FFC23A" },
      handler: (r: RazorpayResponse) => {
        reopen();
        confirm(id, { orderId: r.razorpay_order_id, paymentId: r.razorpay_payment_id, signature: r.razorpay_signature });
      },
      modal: {
        ondismiss: () => {
          reopen();
          setNotice("Payment cancelled. Your seat isn’t booked yet, so try again whenever you’re ready.");
        },
      },
    }).open();
  }

  async function confirm(id: string, payload: Record<string, unknown>) {
    setStep("processing");
    setNotice("");
    try {
      const [res] = await Promise.all([
        fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId: id, ...payload }),
        }),
        new Promise((r) => setTimeout(r, 900)), // long enough to read "Confirming…"
      ]);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      setStep("done");
    } catch (error) {
      setNotice(error instanceof Error && error.message ? error.message : "Something went wrong. Please try again.");
      setStep(payload.demo ? "pay" : "details");
    }
  }

  function close() {
    dialog.current?.close();
  }

  // Phone sheets: drag the grabber down to dismiss, like a native bottom sheet.
  function dragStart(e: React.PointerEvent<HTMLDivElement>) {
    if (step === "processing") return;
    drag.current = { startY: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function dragMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current || !dialog.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.startY);
    dialog.current.style.transform = `translateY(${drag.current.dy}px)`;
  }
  function dragEnd() {
    const sheet = dialog.current;
    if (!drag.current || !sheet) return;
    const dismiss = drag.current.dy > 110;
    drag.current = null;
    sheet.style.transition = "transform 0.3s var(--ease-soft)";
    sheet.style.transform = dismiss ? "translateY(100%)" : "";
    setTimeout(() => {
      sheet.style.transition = "";
      sheet.style.transform = "";
      if (dismiss) sheet.close();
    }, 300);
  }

  return (
    <dialog
      ref={dialog}
      className="sheet"
      aria-labelledby="checkout-title"
      onClose={() => !handingOff.current && onClose()}
      onCancel={(e) => step === "processing" && e.preventDefault()}
      onClick={(e) => e.target === dialog.current && step !== "processing" && close()}
    >
      <div
        className="flex h-7 cursor-grab touch-none items-center justify-center sm:hidden"
        onPointerDown={dragStart}
        onPointerMove={dragMove}
        onPointerUp={dragEnd}
        onPointerCancel={dragEnd}
        aria-hidden="true"
      >
        <span className="h-1.5 w-10 rounded-full bg-ink/25" />
      </div>

      <div className="max-h-[calc(94dvh-1.75rem)] overflow-y-auto p-5 pt-2 sm:max-h-[94dvh] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted">
              {formatDay(session.start)} · {formatTime(session.start)} IST
            </p>
            <h2 id="checkout-title" className="display mt-1 text-3xl">
              {step === "done" ? `You’re in, ${firstName}!` : "Reserve your seat"}
            </h2>
          </div>
          {step !== "processing" && (
            <button type="button" onClick={close} className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white hover:bg-marigold-soft" aria-label="Close">
              <Close />
            </button>
          )}
        </div>

        <ol className="mt-5 grid grid-cols-3 gap-2" aria-label="Checkout progress">
          {STEPS.map((label, i) => (
            <li key={label} aria-current={i === STEP_INDEX[step] ? "step" : undefined}>
              <span className={`block h-1.5 rounded-full border border-ink transition-colors duration-500 ${i <= STEP_INDEX[step] ? "bg-marigold" : "bg-white"}`} />
              <span className={`mt-1.5 block text-xs ${i <= STEP_INDEX[step] ? "font-bold" : "text-muted"}`}>{label}</span>
            </li>
          ))}
        </ol>

        {notice && (
          <p role="alert" className="mt-5 rounded-xl border-2 border-ink bg-blush-soft px-4 py-3 text-sm font-medium">
            {notice}
          </p>
        )}

        {step === "details" && (
          <form noValidate onSubmit={submitDetails} className="mt-6 space-y-5">
            <fieldset>
              <legend className="mb-2 font-bold">Ticket</legend>
              <div className="grid gap-2.5">
                {tickets.map((t) => (
                  <label key={t.id} className="choice justify-between">
                    <span className="flex items-center gap-3">
                      <input type="radio" name="ticket" checked={t.id === ticketId} onChange={() => setTicketId(t.id)} className="size-4 accent-ink" />
                      <span className="font-semibold">{t.name}</span>
                    </span>
                    <span className="display text-xl">{formatPrice(t.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="Your name" name="name" error={errors.name}>
              <input id="name" name="name" className="field" autoComplete="name" value={fields.name} onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
            </Field>

            <Field label="Email" name="email" hint="Your receipt and GST invoice go here." error={errors.email}>
              <input id="email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} className="field" value={fields.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : "email-hint"} />
            </Field>

            <Field label="WhatsApp number" name="phone" error={errors.phone}>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-semibold">+91</span>
                <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={14} className="field pl-14" value={fields.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
              </div>
            </Field>

            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={whatsappOptIn} onChange={(e) => setWhatsappOptIn(e.target.checked)} className="mt-1 size-5 shrink-0 accent-ink" />
              <span>Send my confirmation and reminders on WhatsApp</span>
            </label>

            <button type="submit" disabled={busy} className="btn btn-primary w-full">
              {busy ? "Saving your details…" : `Continue to pay ${formatPrice(ticket.price)}`} {!busy && <ArrowRight />}
            </button>
          </form>
        )}

        {step === "pay" && (
          <div className="mt-6 space-y-5">
            <div className="rounded-xl border-2 border-ink bg-marigold-soft p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold">{ticket.name}</span>
                <span className="display text-xl">{formatPrice(ticket.price)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {fields.name.trim()} · +91 {phone}
              </p>
              <p className="mt-2 text-xs text-muted">Includes {formatPrice(Math.round(ticket.price - ticket.price / 1.18))} GST.</p>
            </div>

            <fieldset>
              <legend className="mb-2 font-bold">Pay with</legend>
              <div className="grid gap-2.5">
                {METHODS.map((m) => (
                  <label key={m.id} className="choice">
                    <input type="radio" name="method" checked={m.id === method} onChange={() => setMethod(m.id)} className="size-4 accent-ink" />
                    <span className="leading-tight">
                      <span className="block font-semibold">{m.label}</span>
                      <span className="text-sm text-muted">{m.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="button" onClick={() => confirm(leadId, { demo: true })} className="btn btn-primary w-full">
              <Lock width={18} height={18} /> Pay {formatPrice(ticket.price)}
            </button>
            <div className="flex items-center justify-between gap-3 text-sm">
              <button type="button" onClick={() => setStep("details")} className="font-semibold underline underline-offset-4">
                Edit details
              </button>
              <span className="text-muted">Demo checkout · no money is charged</span>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="grid place-items-center py-16 text-center" role="status">
            <svg className="spinner size-10" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-line)" strokeWidth="5" />
              <path d="M20 4a16 16 0 0116 16" fill="none" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <p className="mt-5 font-bold">Confirming your payment…</p>
            <p className="mt-1 text-sm text-muted">Please don’t close this window.</p>
          </div>
        )}

        {step === "done" && result && (
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-ink bg-marigold p-4">
              <div>
                <p className="text-sm font-semibold">Seat confirmed · {ticket.name}</p>
                <p className="mt-0.5 leading-snug">{webinar.title}</p>
              </div>
              <div className="shrink-0 text-center">
                <p className="text-xs font-bold">SEAT</p>
                <p className="display text-4xl">{result.seatNo}</p>
              </div>
            </div>

            {result.whatsapp && (
              <div className="overflow-hidden rounded-xl border-2 border-ink">
                <p className="flex items-center gap-2 bg-[#075e54] px-4 py-2 text-sm font-semibold text-white">
                  <WhatsApp width={16} height={16} /> WhatsApp · +91 {phone}
                </p>
                <div className="bg-wa-wall p-3">
                  <div className="w-fit max-w-[92%] whitespace-pre-line rounded-xl rounded-tl-sm bg-white px-3 py-2 text-sm leading-snug shadow-[0_1px_0_rgb(0_0_0/0.12)]">
                    {result.message}
                    <span className="mt-0.5 flex justify-end">
                      <Ticks />
                    </span>
                  </div>
                </div>
                <p className="border-t-2 border-ink px-4 py-2 text-sm text-muted">
                  {result.whatsapp === "sent" && "Sent to your WhatsApp just now."}
                  {result.whatsapp === "simulated" && "Demo mode: this exact message goes out once the WhatsApp API is connected."}
                  {result.whatsapp === "failed" && "WhatsApp didn’t go through, but your seat is confirmed. We’ll resend it shortly."}
                </p>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <a href={googleCalendarUrl(session.start, session.end)} target="_blank" rel="noreferrer" className="btn btn-white">
                <Calendar width={18} height={18} /> Add to calendar
              </a>
              <button type="button" onClick={close} className="btn btn-primary">
                <Check width={18} height={18} /> Done
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

function Field({ label, name, hint, error, children }: { label: string; name: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm font-medium text-[#c4271f]">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${name}-hint`} className="mt-2 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
