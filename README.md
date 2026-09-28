# Baithak: webinar landing page

A landing page that sells seats to a live webinar. It saves every registration, takes payment through Razorpay, and sends the confirmation on WhatsApp. A password-protected dashboard lists every lead.

Built with Next.js (App Router), TypeScript, Tailwind CSS and PostgreSQL.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The leads dashboard is at http://localhost:3000/admin (local password: `admin`).

With no environment variables everything runs in demo mode: payments are simulated, WhatsApp messages are only logged, and leads live in memory. See `.env.example` to switch each part on.

## Where the data goes

1. Someone fills in name, email and WhatsApp number → saved as a lead straight away, before payment, so nobody is lost.
2. They pay → the payment is verified on the server (Razorpay signature) and the lead is marked paid with a seat number.
3. The WhatsApp confirmation is sent through the WhatsApp Cloud API.
4. `/admin` shows every lead with a one-tap **Message** button (opens WhatsApp with a follow-up about your next course) and a **Download CSV** button for Excel or Google Sheets.

## WhatsApp template

Business-initiated WhatsApp messages need a template approved by Meta. Create one named `webinar_confirmation` with this body:

```
Namaste {{1}}! 🙏 Your seat for our live webinar is confirmed ✅
📅 {{2}}, {{3}} IST
🎟️ Seat no. {{4}}
The join link will come here 15 minutes before we start.
```

## Change the content

All text, prices, the host, reviews and the session date live in `src/content/webinar.ts`. To show a real host photo, put it in `public/host.jpg` and set `photo: "/host.jpg"`.

## Project structure

```
src/
  app/
    page.tsx              the landing page
    admin/                leads dashboard, login, CSV export
    api/register          saves the lead, opens a Razorpay order
    api/payment/verify    verifies payment, marks paid, sends WhatsApp
  content/webinar.ts      every piece of copy and data on the page
  server/                 leads storage, Razorpay, WhatsApp, admin login
  lib/                    dates, prices, form validation
  components/
    layout/               header, footer, announcement bar, mobile bar
    sections/             one file per page section
    checkout/             the checkout sheet
    ui/                   icons, countdown, hand-drawn arrows
```

## Deploy on Vercel

Import the repository with the **Next.js** preset, add the variables from `.env.example`, and deploy.
