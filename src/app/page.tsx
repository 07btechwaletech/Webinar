import { tickets } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession } from "@/lib/session";
import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Spotlight } from "@/components/ui/Spotlight";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { LiveRoom } from "@/components/sections/LiveRoom";
import { Outcomes } from "@/components/sections/Outcomes";
import { RunOfShow } from "@/components/sections/RunOfShow";
import { FitCheck } from "@/components/sections/FitCheck";
import { Host } from "@/components/sections/Host";
import { ChatReplay } from "@/components/sections/ChatReplay";
import { Tickets } from "@/components/sections/Tickets";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Rebuild hourly so the session date rolls forward on its own.
export const revalidate = 3600;

export default function HomePage() {
  const session = getSession();

  return (
    <CheckoutProvider>
      <div id="top" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Outcomes />
        <LiveRoom />
        <RunOfShow />
        <FitCheck />
        <Host />
        <ChatReplay />
        <Tickets />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar
        price={`${formatPrice(tickets[0].price)} · ${formatDay(session.start)}`}
        when={`${formatTime(session.start)} IST · online`}
      />
      <WhatsAppFab />
      <Spotlight />
    </CheckoutProvider>
  );
}
