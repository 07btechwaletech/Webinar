"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/session";
import { ringPoint } from "@/lib/ring";

// A broadcast studio clock: the outer ring holds 60 dots, one per second.
// The digits count down to the session; the ring drains each minute.
const RING = Array.from({ length: 60 }, (_, i) => i);
const HOURS = Array.from({ length: 12 }, (_, i) => i);
const pad = (n: number) => String(n).padStart(2, "0");

export function StudioClock({ className = "" }: { className?: string }) {
  // null until mounted, so server and client render the same markup
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const session = now === null ? null : getSession(now);
  const left = session && now !== null ? Math.max(0, session.start - now) : 0;
  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor(left / 3_600_000) % 24;
  const minutes = Math.floor(left / 60_000) % 60;
  const seconds = Math.floor(left / 1000) % 60;
  const live = session?.isLive ?? false;
  const lit = live ? 60 : session ? seconds : 0;

  const groups = [
    { value: session ? pad(days) : "--", label: "Days" },
    { value: session ? pad(hours) : "--", label: "Hrs" },
    { value: session ? pad(minutes) : "--", label: "Min" },
  ];

  return (
    <div
      role="timer"
      aria-label={
        live
          ? "The session is live now"
          : session
            ? `Starts in ${days} days, ${hours} hours and ${minutes} minutes`
            : "Countdown to the session"
      }
      className={`relative aspect-square ${className}`}
    >
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <circle cx="200" cy="200" r="198" fill="#0b0d11" stroke="rgb(255 255 255 / 0.08)" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgb(255 255 255 / 0.04)" />

        {/* LED bloom behind the lit dots */}
        <g filter="url(#led-glow)">
          {RING.map((i) => (
            <circle
              key={i}
              {...ringPoint(i, 60, 178)}
              r="7"
              style={{ fill: "var(--color-signal)", opacity: i < lit ? 0.75 : 0, transition: "opacity 0.35s ease" }}
            />
          ))}
        </g>

        {RING.map((i) => (
          <circle
            key={i}
            {...ringPoint(i, 60, 178)}
            r="5.4"
            className="clock-dot"
            style={{ "--i": i, fill: i < lit ? "var(--color-signal)" : "rgb(255 255 255 / 0.12)" } as React.CSSProperties}
          />
        ))}
        {HOURS.map((i) => (
          <circle key={i} {...ringPoint(i, 12, 156)} r="3.6" fill="rgb(255 255 255 / 0.55)" />
        ))}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {live ? (
          <>
            <span className="eyebrow text-[0.65rem] text-white/55">We’re live now</span>
            <span className="led mt-3 text-[clamp(2.5rem,9vw,4rem)] leading-none">ON AIR</span>
          </>
        ) : (
          <>
            <span className="eyebrow text-[0.62rem] text-white/55">Doors open in</span>
            <div className="mt-3 flex items-start">
              {groups.map((g, i) => (
                <div key={g.label} className="flex items-start">
                  {i > 0 && <span className="led px-1 text-[clamp(2rem,7vw,3.4rem)] leading-none text-white/40">:</span>}
                  <div className="flex flex-col items-center">
                    <span className="led text-[clamp(2rem,7vw,3.4rem)] leading-none">{g.value}</span>
                    <span className="eyebrow mt-2 text-[0.58rem] text-white/40">{g.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
