import { brand, tickets } from "@/content/webinar";
import { formatPrice } from "@/lib/session";
import { CheckoutButton } from "@/components/checkout/CheckoutProvider";

const NAV = [
  { href: "#learn", label: "What you’ll learn" },
  { href: "#how", label: "How it works" },
  { href: "#host", label: "Your host" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 rounded-lg">
      <span
        className="display grid size-9 -rotate-6 place-items-center rounded-lg border-2 border-ink bg-marigold text-lg text-ink shadow-[2px_2px_0_var(--color-ink)]"
        aria-hidden="true"
      >
        B
      </span>
      <span className={`display text-2xl ${light ? "text-white" : ""}`}>{brand.name}</span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 font-semibold">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline decoration-transparent decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-marigold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <CheckoutButton className="btn btn-primary min-h-11 px-4 text-base">
          Register <span className="hidden sm:inline">· {formatPrice(tickets[0].price)}</span>
        </CheckoutButton>
      </div>
    </header>
  );
}
