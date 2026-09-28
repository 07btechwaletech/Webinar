"use client";

import { useEffect } from "react";

// One listener for the whole page: any [data-spotlight] surface gets a soft light
// that follows the pointer (CSS reads --mx / --my). Mouse and trackpad only.
export function Spotlight() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
        if (!el) return;
        const box = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - box.left}px`);
        el.style.setProperty("--my", `${e.clientY - box.top}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
