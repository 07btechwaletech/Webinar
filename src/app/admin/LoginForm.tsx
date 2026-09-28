"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="box mx-auto mt-16 max-w-sm space-y-5 p-7">
      <div>
        <h1 className="display text-3xl">Leads dashboard</h1>
        <p className="mt-1 text-muted">Enter the admin password to see registrations.</p>
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block font-bold">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" aria-invalid={!!error} aria-describedby={error ? "password-error" : undefined} />
        {error && (
          <p id="password-error" className="mt-2 text-sm font-medium text-[#c4271f]">
            {error}
          </p>
        )}
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? "Checking…" : "Open dashboard"}
      </button>
    </form>
  );
}
