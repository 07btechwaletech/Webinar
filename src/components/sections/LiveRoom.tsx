"use client";

import { useEffect, useRef, useState } from "react";
import { chat, host, poll, roomFeatures } from "@/content/webinar";
import { CamOff, Eye, Hand, Heart, Lock, MicOff, Send } from "@/components/ui/Icons";

type Reaction = { id: number; x: number; drift: number };

const clock = (s: number) =>
  [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

// A working preview of the room attendees join: slides, host video, chat, poll, reactions.
// Timers only run while it's on screen, and not at all with reduced motion.
export function LiveRoom() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pollShown, setPollShown] = useState(false);
  const [count, setCount] = useState(4); // chat messages posted so far
  const [viewers, setViewers] = useState(1204);
  const [elapsed, setElapsed] = useState(34 * 60 + 12);
  const [reactions, setReactions] = useState<Reaction[]>([]);

  function sendHeart() {
    setReactions((list) => [
      ...list.slice(-10),
      { id: Date.now() + Math.random(), x: Math.random() * 48, drift: (Math.random() - 0.5) * 48 },
    ]);
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPollShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setPollShown(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const timers = [
      setInterval(() => setElapsed((s) => s + 1), 1000),
      setInterval(() => setCount((c) => c + 1), 2400),
      setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 3)), 1700),
      setInterval(sendHeart, 900),
    ];
    return () => timers.forEach(clearInterval);
  }, [active]);

  // the five most recent messages, cycling through the sample chat
  const recent = Array.from({ length: 5 }, (_, k) => count - 5 + k).filter((n) => n >= 0);

  return (
    <section id="room" aria-labelledby="room-title" className="section pt-0">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="eyebrow text-muted">The live room</p>
            <h2 id="room-title" className="display h2 mt-4 max-w-2xl">
              Join from your phone or laptop. No app, no links to lose.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted md:justify-self-end">
            The room opens 15 minutes early. Chat, ask questions and vote in polls, all in the same tab.
          </p>
        </div>

        <div
          ref={root}
          data-spotlight
          className="spotlight grain reveal relative mt-14 overflow-hidden rounded-[28px] bg-ink text-white shadow-[0_50px_100px_-50px_rgb(17_19_24/0.7)]"
          style={{ "--mx": "30%", "--my": "0%" } as React.CSSProperties}
        >
          {/* window chrome */}
          <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3 sm:px-5" aria-hidden="true">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2.5 rounded-full bg-white/15" />
              ))}
            </div>
            <div className="mx-auto flex min-w-0 items-center gap-2 truncate rounded-full bg-white/6 px-4 py-1.5 text-xs text-white/55">
              <Lock width={12} height={12} className="shrink-0" /> baithak.live/room/sunday-launch
            </div>
            <div className="hidden w-10 sm:block" />
          </div>

          <div className="grid lg:grid-cols-[1fr_340px]">
            {/* stage */}
            <div className="p-3 sm:p-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-ink-2 sm:aspect-16/10" aria-hidden="true">
                <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-2 sm:inset-x-4 sm:top-4">
                  <span className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 backdrop-blur">
                    <span className="pulse size-2 rounded-full bg-signal" />
                    <span className="eyebrow text-[0.6rem]">Live</span>
                    <span className="led text-sm">{clock(elapsed)}</span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs backdrop-blur">
                    <Eye width={14} height={14} />
                    <span className="tabular-nums">{viewers.toLocaleString("en-IN")}</span>
                    <span className="hidden sm:inline">watching</span>
                  </span>
                </div>

                {/* the slide being presented: a registration page assembling itself */}
                <div className="absolute inset-0 grid place-items-center px-5 pb-16 pt-14 sm:px-12 sm:pb-20 sm:pt-16">
                  <div className="w-full max-w-[520px] rounded-xl bg-paper p-4 text-ink shadow-2xl sm:p-6">
                    <p className="eyebrow text-[0.55rem] text-muted sm:text-[0.62rem]">00:30 · Build the registration page</p>
                    <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                      <div className="build-bar h-3 w-4/5 rounded bg-ink sm:h-4" style={{ "--b": 0 } as React.CSSProperties} />
                      <div className="build-bar h-2 w-3/5 rounded bg-ink/25" style={{ "--b": 1 } as React.CSSProperties} />
                      <div className="build-bar h-2 w-2/3 rounded bg-ink/25" style={{ "--b": 2 } as React.CSSProperties} />
                      <div className="build-bar mt-3 h-6 w-28 rounded-full bg-ink sm:h-7" style={{ "--b": 3 } as React.CSSProperties} />
                      <div className="hidden grid-cols-3 gap-2 pt-2 sm:grid">
                        {[4, 5, 6].map((b) => (
                          <div key={b} className="build-bar h-14 rounded-md bg-fog" style={{ "--b": b } as React.CSSProperties} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* host, picture-in-picture */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 rounded-2xl bg-black/50 p-2 pr-4 backdrop-blur sm:bottom-4 sm:left-4">
                  <span className="display grid size-10 place-items-center rounded-xl bg-white/10 text-xs sm:size-12 sm:text-sm">
                    {host.initials}
                  </span>
                  <span className="hidden text-xs leading-tight sm:block">
                    <span className="block font-semibold">{host.name}</span>
                    <span className="text-white/60">Host · speaking</span>
                  </span>
                  <span className="voice flex h-4 items-end gap-[3px]">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} style={{ "--v": i } as React.CSSProperties} />
                    ))}
                  </span>
                </div>

                {/* reactions */}
                <div className="pointer-events-none absolute inset-y-0 right-4 w-20 sm:right-8">
                  {reactions.map((r) => (
                    <Heart
                      key={r.id}
                      width={22}
                      height={22}
                      className="float-heart absolute bottom-6 text-white"
                      style={{ left: `${r.x}px`, "--drift": `${r.drift}px` } as React.CSSProperties}
                      onAnimationEnd={() => setReactions((list) => list.filter((x) => x.id !== r.id))}
                    />
                  ))}
                </div>
              </div>

              {/* attendee controls: only React is live in the preview */}
              <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
                <span className="room-ctl" aria-hidden="true">
                  <MicOff width={18} height={18} />
                </span>
                <span className="room-ctl" aria-hidden="true">
                  <CamOff width={18} height={18} />
                </span>
                <span className="room-ctl gap-2 px-4" aria-hidden="true">
                  <Hand width={18} height={18} />
                  <span className="hidden text-sm sm:inline">Raise hand</span>
                </span>
                <button type="button" onClick={sendHeart} className="room-ctl gap-2 px-4 text-sm hover:bg-white/15">
                  <Heart width={16} height={16} /> React
                </button>
              </div>
            </div>

            {/* side panel */}
            <div className="flex h-[380px] flex-col border-t border-white/10 lg:h-auto lg:border-l lg:border-t-0" aria-hidden="true">
              <div className="flex gap-1 border-b border-white/10 p-2 text-sm">
                {["Chat", "Q&A", "Poll"].map((t, i) => (
                  <span key={t} className={`rounded-full px-3.5 py-1.5 ${i === 0 ? "bg-white/10 font-medium" : "text-white/50"}`}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="m-3 hidden rounded-2xl bg-white/6 p-4 sm:block">
                <p className="eyebrow text-[0.6rem] text-white/50">Poll · 842 votes</p>
                <p className="mt-1.5 text-sm font-medium">What do you teach?</p>
                <ul className="mt-3 space-y-2">
                  {poll.map((option, i) => (
                    <li key={option.label} className="relative overflow-hidden rounded-lg bg-white/6 px-3 py-1.5 text-xs">
                      <span
                        className="absolute inset-y-0 left-0 bg-white/15 transition-[width] duration-1000 ease-soft"
                        style={{ width: pollShown ? `${option.pct}%` : 0, transitionDelay: `${i * 120}ms` }}
                      />
                      <span className="relative flex justify-between gap-2">
                        <span>{option.label}</span>
                        <span className="tabular-nums text-white/70">{option.pct}%</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="flex min-h-0 flex-1 flex-col justify-end gap-4 overflow-hidden px-4 pb-1 pt-3">
                {recent.map((n) => {
                  const m = chat[n % chat.length];
                  return (
                    <li key={n} className="msg-in flex gap-2.5 text-sm">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-[0.7rem] font-semibold">
                        {m.name[0]}
                      </span>
                      <p className="min-w-0 leading-snug">
                        <span className="font-semibold">{m.name}</span> <span className="text-white/75">{m.text}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="m-3 flex items-center justify-between rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/40">
                Say something…
                <Send width={16} height={16} />
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {roomFeatures.map((f) => (
            <li key={f.title} className="reveal border-t border-line pt-6">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
