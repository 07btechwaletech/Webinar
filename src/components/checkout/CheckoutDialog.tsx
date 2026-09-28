"use client";

import { useEffect, useRef, useState } from "react";
import { tickets, webinar, type Ticket } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession, googleCalendarUrl } from "@/lib/session";
import { ArrowRight, Calendar, Check, Close, Lock, WhatsApp } from "@/components/ui/Icons";

type Step = "details" | "pay" | "processing" | "done";
type Fields = { name: string; email: string; phone: string };
type Errors = Partial<Record<keyof Fields, string>>;

const STEPS = ["Details", "Payment", "Confirmed"];
const STEP_INDEX: Record<Step, number> = { details: 0, pay: 1, processing: 1, done: 2 };

const METHODS = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm, any UPI app" },
  { id: "card", label: "Card", hint: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net banking", hint: "All major Indian banks" },
];

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "Enter your name so we know what to call you.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = "Enter an email like name@example.com.";
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, ""))) errors.phone = "Enter a 10-digit Indian mobile number.";
  return errors;
}

export function CheckoutDialog({ initialTicket, onClose }: { initialTicket: Ticket["id"]; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("details");
  const [ticketId, setTicketId] = useState(initialTicket);
  const [fields, setFields] = useState<Fields>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [method, setMethod] = useState("upi");

  const ticket = tickets.find((t) => t.id === ticketId)!;
  const session = getSession();
  const seatNo = webinar.seatsTaken + 1;
  const phoneDigits = fields.phone.replace(/\D/g, "");
  const gst = Math.round(ticket.price - ticket.price / 1.18);
  const drag = useRef<{ startY: number; dy: number } | null>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submitDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) e.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
    else setStep("pay");
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
      if (dismiss) sheet.close();
    }, 300);
  }

  function pay() {
    // Demo only: this is where Razorpay Checkout opens once the backend is connected.
    setStep("processing");
    setTimeout(() => setStep("done"), 1800);
  }

  return (
    <dialog
      ref={dialog}
      className="sheet"
      aria-labelledby="checkout-title"
      onClose={onClose}
      onCancel={(e) => step === "processing" && e.preventDefault()}
      onClick={(e) => e.target === dialog.current && step !== "processing" && dialog.current?.close()}
    >
      <div
        className="-mb-2 flex h-7 cursor-grab touch-none items-center justify-center sm:hidden"
        onPointerDown={dragStart}
        onPointerMove={dragMove}
        onPointerUp={dragEnd}
        onPointerCancel={dragEnd}
        aria-hidden="true"
      >
        <span className="h-1.5 w-10 rounded-full bg-ink/20" />
      </div>
      <div className="max-h-[calc(92dvh-1.25rem)] overflow-y-auto p-5 pt-3 sm:max-h-[92dvh] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-muted">
              {formatDay(session.start)} · {formatTime(session.start)} IST
            </p>
            <h2 id="checkout-title" className="display mt-2 text-2xl">
              {step === "done" ? `You’re in, ${fields.name.trim().split(" ")[0]}.` : "Save your seat"}
            </h2>
          </div>
          {step !== "processing" && (
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-line"
              aria-label="Close"
            >
              <Close />
            </button>
          )}
        </div>

        <ol className="mt-5 grid grid-cols-3 gap-1.5" aria-label="Checkout progress">
          {STEPS.map((label, i) => (
            <li key={label} aria-current={i === STEP_INDEX[step] ? "step" : undefined}>
              <span
                className={`block h-1 rounded-full transition-colors duration-500 ${i <= STEP_INDEX[step] ? "bg-ink" : "bg-line"}`}
              />
              <span className={`mt-2 block text-xs ${i <= STEP_INDEX[step] ? "font-medium text-ink" : "text-muted"}`}>
                {label}
              </span>
            </li>
          ))}
        </ol>

        {step === "details" && (
          <form noValidate onSubmit={submitDetails} className="mt-6 space-y-5">
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Ticket</legend>
              <div className="grid gap-2">
                {tickets.map((t) => (
                  <label
                    key={t.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3.5 transition-colors ${
                      t.id === ticketId ? "border-ink" : "border-line hover:border-muted"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ticket"
                        value={t.id}
                        checked={t.id === ticketId}
                        onChange={() => setTicketId(t.id)}
                        className="size-4 accent-ink"
                      />
                      <span className="font-medium">{t.name}</span>
                    </span>
                    <span className="font-semibold tabular-nums">{formatPrice(t.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="Your name" name="name" error={errors.name}>
              <input
                id="name"
                name="name"
                className="field"
                autoComplete="name"
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </Field>

            <Field label="Email" name="email" hint="Your receipt and GST invoice go here." error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                className="field"
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : "email-hint"}
              />
            </Field>

            <Field label="WhatsApp number" name="phone" hint="We send the joining link here." error={errors.phone}>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">+91</span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={11}
                  className="field pl-13"
                  value={fields.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                />
              </div>
            </Field>

            <button type="submit" className="btn btn-ink w-full">
              Continue to payment <ArrowRight />
            </button>
          </form>
        )}

        {step === "pay" && (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{ticket.name}</span>
                <span className="font-semibold tabular-nums">{formatPrice(ticket.price)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {fields.name.trim()} · +91 {phoneDigits}
              </p>
              <p className="mt-3 border-t border-line pt-3 text-xs text-muted">
                Includes {formatPrice(gst)} GST. Invoice goes to {fields.email.trim()}.
              </p>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Pay with</legend>
              <div className="grid gap-2">
                {METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 transition-colors ${
                      m.id === method ? "border-ink" : "border-line hover:border-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={m.id}
                      checked={m.id === method}
                      onChange={() => setMethod(m.id)}
                      className="size-4 accent-ink"
                    />
                    <span>
                      <span className="block font-medium">{m.label}</span>
                      <span className="block text-sm text-muted">{m.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="button" onClick={pay} className="btn btn-ink w-full">
              <Lock width={18} height={18} /> Pay {formatPrice(ticket.price)}
            </button>
            <div className="flex items-center justify-between text-sm">
              <button type="button" onClick={() => setStep("details")} className="font-medium underline underline-offset-4">
                Edit details
              </button>
              <span className="text-muted">Demo checkout · no money is charged</span>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="grid place-items-center py-16 text-center" role="status">
            <svg className="spinner size-10" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-line)" strokeWidth="4" />
              <path d="M20 3a17 17 0 0117 17" fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p className="mt-5 font-medium">Confirming your payment…</p>
            <p className="mt-1 text-sm text-muted">Please don’t close this window.</p>
          </div>
        )}

        {step === "done" && (
          <div className="mt-6">
            <div className="ticket-print relative rounded-3xl bg-ink text-white">
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="eyebrow text-[0.65rem] text-white/50">Admit one · Live</p>
                  <p className="mt-2 font-medium leading-snug">{webinar.title}</p>
                  <p className="mt-1 text-sm text-white/60">
                    {formatDay(session.start)} · {formatTime(session.start)} IST · {webinar.platform}
                  </p>
                </div>
                <div className="text-right">
                  <p className="eyebrow text-[0.65rem] text-white/50">Seat</p>
                  <p className="led mt-1 text-4xl leading-none">{seatNo}</p>
                </div>
              </div>
              <div className="relative border-t border-dashed border-white/20 px-5 py-3 text-sm text-white/70">
                <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full bg-fog" aria-hidden="true" />
                <span className="absolute -right-2.5 -top-2.5 size-5 rounded-full bg-fog" aria-hidden="true" />
                {ticket.name} · {formatPrice(ticket.price)} paid
              </div>
            </div>

            <p className="mt-5 flex items-start gap-3 text-sm">
              <WhatsApp className="mt-0.5 shrink-0" />
              <span>
                Your confirmation is on its way to WhatsApp at +91 {phoneDigits.slice(0, 5)} {phoneDigits.slice(5)}. The
                joining link follows 15 minutes before we start.
              </span>
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a
                href={googleCalendarUrl(session.start, session.end)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-line bg-white"
              >
                <Calendar width={18} height={18} /> Add to calendar
              </a>
              <button type="button" onClick={() => dialog.current?.close()} className="btn btn-ink">
                <Check width={18} height={18} /> Done
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-[#c4321c]">
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
