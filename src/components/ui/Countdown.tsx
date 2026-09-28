"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/session";

const pad = (n: number) => String(n).padStart(2, "0");

// Four boxes counting down to the session. Empty until mounted so server and client markup match.
export function Countdown({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const session = now === null ? null : getSession(now);
  const left = session && now !== null ? Math.max(0, session.start - now) : 0;
  const parts = [
    { label: "Days", value: Math.floor(left / 86_400_000) },
    { label: "Hours", value: Math.floor(left / 3_600_000) % 24 },
    { label: "Mins", value: Math.floor(left / 60_000) % 60 },
    { label: "Secs", value: Math.floor(left / 1000) % 60 },
  ];

  if (session?.isLive) {
    return (
      <p className={`sticker bg-marigold ${className}`}>
        <span className="pulse size-2.5 rounded-full bg-live" aria-hidden="true" /> We’re live right now
      </p>
    );
  }

  return (
    <div
      role="timer"
      aria-label={session ? `Starts in ${parts[0].value} days, ${parts[1].value} hours and ${parts[2].value} minutes` : "Countdown"}
      className={`grid w-fit grid-cols-4 gap-2 ${className}`}
    >
      {parts.map((p) => (
        <div key={p.label} className="grid w-16 place-items-center rounded-xl border-2 border-ink bg-white py-2 sm:w-[4.5rem]">
          <span className="display text-2xl tabular-nums sm:text-3xl" aria-hidden="true">
            {session ? pad(p.value) : "--"}
          </span>
          <span className="text-xs font-semibold text-muted" aria-hidden="true">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
