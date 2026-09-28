"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { href: string; label: string };

// Header links with a pill that slides to whichever section is in view.
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "hero" ? null : `#${e.target.id}`);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["#hero", ...items.map((i) => i.href)].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const measure = useCallback(() => {
    const el = active ? links.current[active] : null;
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);

  useEffect(() => {
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <div className="relative">
        {pill && (
          <span
            aria-hidden="true"
            className="nav-pill absolute inset-y-0 left-0 rounded-full bg-paper shadow-[0_1px_3px_rgb(17_19_24/0.1)]"
            style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
          />
        )}
        <ul className="relative flex items-center gap-1 text-[0.95rem]">
          {items.map((item) => (
            <li key={item.href}>
              <a
                ref={(el) => {
                  links.current[item.href] = el;
                }}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`block rounded-full px-3.5 py-2 transition-colors ${
                  active === item.href ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
