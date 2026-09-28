// All page copy lives here. Swap this file to rebrand the site for a client.
// Names, reviews and numbers below are sample content for the demo.

export const brand = {
  name: "Baithak",
  whatsapp: "919296210282", // wa.me number, country code first, no "+"
  email: "hello@baithak.live",
  // Pre-filled text when you message a lead from the admin page. {name} becomes their first name.
  followUp: "Hi {name}! Thanks for joining the webinar 🙏 My full course opens this week. Shall I send you the details?",
};

export const webinar = {
  title: "Sell your first online course with one live webinar",
  highlight: "one live webinar", // part of the title that gets the marker stroke
  subtitle:
    "A 2-hour live session in Hindi + English. We build your registration page, WhatsApp reminders and sales pitch together, so you leave ready to launch.",
  // First session: Sun 4 Oct 2026, 7:00 PM IST. Rolls forward weekly (see lib/session.ts).
  firstSessionISO: "2026-10-04T13:30:00Z",
  durationMin: 120,
  language: "Hindi + English",
  seatsTotal: 500,
  seatsTaken: 312,
  replayDays: 7,
};

export type Ticket = {
  id: "live" | "kit";
  name: string;
  price: number;
  blurb: string;
  perks: string[];
  featured?: boolean;
};

export const tickets: Ticket[] = [
  {
    id: "live",
    name: "Live seat",
    price: 99,
    blurb: "Everything you need on the night.",
    perks: ["2-hour live session", "Replay for 7 days", "Printable worksheet", "Live Q&A"],
  },
  {
    id: "kit",
    name: "Seat + launch kit",
    price: 299,
    blurb: "For when you want to launch this month.",
    perks: [
      "Everything in the live seat",
      "Registration page template",
      "Ready-to-send WhatsApp scripts",
      "Replay for 30 days",
      "First pick for the hot seat",
    ],
    featured: true,
  },
];

export const stats = [
  { value: 12400, suffix: "+", label: "creators have attended" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "average rating" },
  { value: 63, label: "live sessions since 2019" },
];

export const outcomes = [
  {
    icon: "page",
    tint: "bg-sky-soft",
    title: "A registration page that’s ready to share",
    body: "We build it live, section by section. You copy the structure and fill in your own words.",
  },
  {
    icon: "bell",
    tint: "bg-mint-soft",
    title: "WhatsApp reminders that get people to show up",
    body: "A confirmation, a nudge the day before, and the link 15 minutes out. Most no-shows just forgot.",
  },
  {
    icon: "mic",
    tint: "bg-blush-soft",
    title: "A 20-minute pitch you won’t cringe at",
    body: "How to move from teaching to selling without the awkward change in tone.",
  },
  {
    icon: "tag",
    tint: "bg-marigold-soft",
    title: "A price you can say out loud",
    body: "A simple way to price your first course so it pays for your time and still sells.",
  },
] as const;

// The real order of what happens after someone clicks Register.
export const steps = [
  { title: "Register", body: "Your name, email and WhatsApp number. Takes 30 seconds." },
  { title: "Pay ₹99", body: "UPI, card or net banking, through Razorpay." },
  { title: "Get it on WhatsApp", body: "Confirmation the moment you pay, and a reminder the day before." },
  { title: "Join live", body: "The link comes 15 minutes before we start. Phone or laptop, no app." },
];

// Minutes from the start of the session. The order is the real order of the evening.
export const agenda = [
  { at: 0, title: "Doors open", detail: "Drop your niche in the chat. I’ll use a few real ones as examples all evening." },
  { at: 10, title: "Why most webinars don’t sell", detail: "The three places people drop off, and the one that matters most." },
  { at: 30, title: "Build the registration page", detail: "Headline, promise, agenda, proof. Live, on screen, in 25 minutes." },
  { at: 55, title: "Set up the WhatsApp reminders", detail: "Confirmation on sign-up, a nudge the day before, a link 15 minutes out." },
  { at: 80, title: "Write your pitch", detail: "The bridge from free value to a paid offer, with scripts you can adapt." },
  { at: 100, title: "Hot seat", detail: "I review five attendees’ offers live. Bring yours, it’s less scary than it sounds." },
];

export const host = {
  name: "Prakash Singh Rajput",
  initials: "PSR",
  role: "Course creator and launch coach",
  photo: null as string | null, // e.g. "/host.jpg" after adding the file to /public
  story: [
    "I sold my first course, a ₹999 Excel class, to 14 people on a Zoom call in 2019. I was so nervous I forgot to share my screen for the first five minutes.",
    "Since then I’ve helped teachers, coaches and small creators run more than 60 launches. I still get nervous before every session. That’s normal, and we’ll deal with it together.",
  ],
};

export const reviews = [
  { name: "Priya", city: "Pune", time: "9:12 PM", text: "Reminder wala part alone was worth it. Last webinar mein 300 signups the aur sirf 41 aaye 😅 Is baar sab set kar diya." },
  { name: "Arjun", city: "Indore", time: "9:15 PM", text: "Did the pricing exercise. I was charging ₹299 for something people pay ₹3k for offline." },
  { name: "Karthik", city: "Chennai", time: "9:21 PM", text: "Ran my first paid webinar last month. 62 people came, 19 bought the course 🙏" },
  { name: "Meenal", city: "Jaipur", time: "9:26 PM", text: "Hindi mein samjhaya toh finally clear hua. Thank you sir!" },
  { name: "Rohit", city: "Delhi", time: "9:30 PM", text: "Hot seat was scary but so useful. Changed my offer title right there." },
  { name: "Sana", city: "Hyderabad", time: "9:41 PM", text: "Expected 2 hours of sales pitch. Got 10 minutes of pitch and 110 minutes of actual work." },
];

export const faqs = [
  {
    q: "Is the session in Hindi or English?",
    a: "Both. We switch between them the way most of us do on calls. The slides are in English.",
  },
  {
    q: "What if I can’t make it live?",
    a: "You get the replay for 7 days, or 30 with the launch kit. Come live if you can, though. The hot seat only happens live.",
  },
  {
    q: "How do I join on the day?",
    a: "The link comes on WhatsApp and email right after you pay, and again 15 minutes before we start. It opens in any browser.",
  },
  {
    q: "Why only ₹99?",
    a: "A small price keeps the room full of people who actually show up, and it’s low enough that price is never the reason to skip.",
  },
  {
    q: "Which payment methods work?",
    a: "UPI, all major cards and net banking. Payments go through Razorpay.",
  },
  {
    q: "What if it isn’t useful for me?",
    a: "Attend, and if it wasn’t worth it, reply to your WhatsApp confirmation within 24 hours. You’ll get a full refund, no questions.",
  },
];
