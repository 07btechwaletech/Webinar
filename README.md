# Baithak: webinar landing page

A landing page for selling seats to a live webinar, with a live countdown, a preview of the in-browser webinar room, pricing, and a demo checkout.

Built with Next.js (App Router), TypeScript and Tailwind CSS. It has no backend yet: the checkout is a front-end demo and never charges money.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Change the content

All text, prices, the host, testimonials and the session date live in one file: `src/content/webinar.ts`.

The session date rolls forward one week at a time, so the countdown never shows a date in the past.

## Project structure

```
src/
  app/                 layout, page, global styles, favicon
  content/webinar.ts   every piece of copy and data on the page
  lib/                 session dates and formatting, ring geometry
  components/
    layout/            header, section nav, footer, mobile bar, WhatsApp button
    sections/          one file per page section (Hero, LiveRoom, Tickets…)
    checkout/          checkout sheet and the button that opens it
    clock/             the studio countdown clock
    ui/                icons and small shared effects
```

## Deploy on Vercel

Import the repository, set **Application Preset** to **Next.js**, and deploy. No environment variables are needed.

## Next steps

- Connect Razorpay in `CheckoutDialog.tsx` (the `pay()` function is where checkout opens).
- Send WhatsApp confirmations from a small API route after payment succeeds.
- Swap the host monogram for a real photo in `Host.tsx`.
