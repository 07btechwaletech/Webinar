import { tickets } from "@/content/webinar";
import { formatDay, formatPrice, formatTime, getSession } from "@/lib/session";
import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Learn } from "@/components/sections/Learn";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Agenda } from "@/components/sections/Agenda";
import { Host } from "@/components/sections/Host";
import { Reviews } from "@/components/sections/Reviews";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Rebuild hourly so the session date rolls forward on its own.
export const revalidate = 3600;

export default function HomePage() {
  const { start } = getSession();

  return (
    <CheckoutProvider>
      <div id="top" />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Stats />
        <Learn />
        <HowItWorks />
        <Agenda />
        <Host />
        <Reviews />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar price={formatPrice(tickets[0].price)} when={`${formatDay(start)} · ${formatTime(start)} IST`} />
      <WhatsAppFab />
    </CheckoutProvider>
  );
}
