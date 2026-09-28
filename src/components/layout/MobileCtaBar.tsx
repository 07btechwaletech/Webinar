"use client";

import { useEffect, useState } from "react";
import { brand } from "@/content/webinar";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { WhatsApp } from "@/components/ui/Icons";

// Phone-only bar that slides in once the hero has scrolled away.
export function MobileCtaBar({ price, when }: { price: string; when: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-3 bottom-3 z-30 flex items-center gap-2 rounded-full bg-ink p-2 pl-5 text-white shadow-2xl transition-transform duration-500 ease-[var(--ease-soft)] md:hidden ${
        shown ? "translate-y-0" : "translate-y-[160%]"
      }`}
    >
      <div className="min-w-0 flex-1 leading-tight">
        <p className="font-semibold">{price}</p>
        <p className="truncate text-xs text-white/60">{when}</p>
      </div>
      <a
        href={`https://wa.me/${brand.whatsapp}`}
        className="grid size-11 place-items-center rounded-full border border-white/20"
        aria-label="Ask a question on WhatsApp"
      >
        <WhatsApp />
      </a>
      <CheckoutButton className="btn btn-light min-h-11 px-5 text-sm">Save my seat</CheckoutButton>
    </div>
  );
}
