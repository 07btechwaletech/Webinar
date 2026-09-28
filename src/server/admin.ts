import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Local dev falls back to "admin". In production the page stays locked until ADMIN_PASSWORD is set,
// because it shows people's phone numbers.
const password = process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === "production" ? undefined : "admin");

export const adminConfigured = Boolean(password);

const COOKIE = "baithak_admin";
const sessionToken = () => createHmac("sha256", password!).update("admin-session").digest("hex");

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const checkPassword = (input: string) => Boolean(password) && same(input, password!);

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(password && value && same(value, sessionToken()));
}

export async function startSession() {
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
