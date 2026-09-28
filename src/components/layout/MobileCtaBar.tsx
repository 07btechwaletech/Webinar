"use client";

import { useEffect, useState } from "react";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";

// Phone-only bar that slides up once the hero has scrolled away.
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
      className={`fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t-2 border-ink bg-white px-4 py-3 transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="min-w-0 flex-1 leading-tight">
        <p className="display text-2xl">{price}</p>
        <p className="truncate text-sm text-muted">{when}</p>
      </div>
      <CheckoutButton className="btn btn-primary min-h-12 px-5">Register now</CheckoutButton>
    </div>
  );
}
