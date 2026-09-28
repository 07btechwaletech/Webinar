// Shared by the checkout form and the register API, so both give the same answers.

export type LeadInput = { name: string; email: string; phone: string };
export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

// "+91 98765-43210", "098765 43210" → "9876543210"
export const cleanPhone = (phone: string) => phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

export function validateLead(f: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (f.name.trim().length < 2) errors.name = "Enter your name so we know what to call you.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = "Enter an email like name@example.com.";
  if (!/^[6-9]\d{9}$/.test(cleanPhone(f.phone))) errors.phone = "Enter a 10-digit Indian mobile number.";
  return errors;
}
