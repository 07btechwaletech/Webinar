"use server";

import { redirect } from "next/navigation";
import { checkPassword, endSession, startSession } from "@/server/admin";

export async function login(_: string | null, form: FormData) {
  if (!checkPassword(String(form.get("password") ?? ""))) return "That password didn’t match. Try again.";
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}
