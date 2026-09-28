import { brand, tickets } from "@/content/webinar";
import { formatPrice } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";
import { SectionNav } from "./SectionNav";

const NAV = [
  { href: "#learn", label: "What you’ll learn" },
  { href: "#room", label: "Live room" },
  { href: "#agenda", label: "Agenda" },
  { href: "#host", label: "Host" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-2.5 rounded-md">
      <span className="size-2.5 rounded-full bg-signal" aria-hidden="true" />
      <span className="display text-xl tracking-tight">{brand.name}</span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Wordmark />
        <SectionNav items={NAV} />
        <CheckoutButton className="btn btn-ink min-h-11 px-5 text-sm">
          Save my seat <span className="hidden sm:inline">· {formatPrice(tickets[0].price)}</span>
        </CheckoutButton>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
