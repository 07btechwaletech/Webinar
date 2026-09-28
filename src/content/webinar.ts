// All page copy lives here. Swap this file to rebrand the demo for a client.
// Names, quotes and numbers below are sample content for the demo.

export const brand = {
  name: "Baithak",
  whatsapp: "919876543210", // wa.me number, country code first, no "+"
  email: "hello@baithak.live",
};

export const webinar = {
  title: "Run a webinar that actually sells your course",
  // First session: Sun 4 Oct 2026, 7:00 PM IST. Rolls forward weekly (see lib/session.ts).
  firstSessionISO: "2026-10-04T13:30:00Z",
  durationMin: 120,
  platform: "Live in your browser",
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
    price: 499,
    blurb: "Everything you need to follow along on the night.",
    perks: [
      "2-hour live session, no app needed",
      "Replay for 7 days",
      "Printable worksheet",
      "Chat and Q&A access",
    ],
  },
  {
    id: "kit",
    name: "Seat + launch kit",
    price: 1499,
    blurb: "For when you want to launch within the month.",
    perks: [
      "Everything in the live seat",
      "Landing page template (Canva + Notion)",
      "Ready-to-send WhatsApp message scripts",
      "Replay for 30 days",
      "First pick for the hot-seat review",
    ],
    featured: true,
  },
];

export const outcomes = [
  {
    icon: "page",
    title: "A registration page that’s ready to share",
    body: "We build it on screen, section by section. You copy the structure and fill in your own words.",
  },
  {
    icon: "bell",
    title: "WhatsApp reminders that get people to show up",
    body: "A confirmation, a nudge the day before, and the link 15 minutes out. Most no-shows just forgot.",
  },
  {
    icon: "mic",
    title: "A 20-minute pitch you won’t cringe at",
    body: "How to move from teaching to selling without the sudden change in tone everyone can feel.",
  },
  {
    icon: "tag",
    title: "A price you can say out loud",
    body: "A simple way to price your first course so it pays for your time and still sells.",
  },
] as const;

// Minutes from the start of the session. The order is the real order of the evening.
export const runOfShow = [
  { at: 0, title: "Doors open", detail: "Drop your niche in the chat. I’ll use a few real ones as examples all evening." },
  { at: 10, title: "Why most webinars don’t sell", detail: "The three places people drop off, and the one that matters most." },
  { at: 30, title: "Build the registration page", detail: "Headline, promise, agenda, proof. Live, on screen, in 25 minutes." },
  { at: 55, title: "Set up the WhatsApp reminders", detail: "Confirmation on sign-up, a nudge the day before, a link 15 minutes out." },
  { at: 80, title: "Write your pitch", detail: "The bridge from free value to a paid offer, with scripts you can adapt." },
  { at: 100, title: "Hot seat", detail: "I review five attendees’ offers live. Bring yours, it’s less scary than it sounds." },
];

export const fit = {
  yes: [
    "You teach something, and people already ask you for help with it",
    "You’ve thought about a course but have no idea how to sell it",
    "You’d rather talk to people live than record 40 videos first",
  ],
  no: [
    "You’re looking for a get-rich-quick plan",
    "You already run profitable webinars every month",
    "You want someone to build it all for you. That’s a different service.",
  ],
};

export const host = {
  name: "Prakash Singh Rajput",
  initials: "PSR",
  role: "Course creator and launch coach, Bengaluru",
  story: [
    "I sold my first course, a ₹999 Excel class, to 14 people on a Zoom call in 2019. I was so nervous I forgot to share my screen for the first five minutes.",
    "Since then I’ve helped teachers, coaches and small creators run more than 60 launches. I still get nervous before every session. That’s normal, and we’ll deal with it together.",
  ],
  facts: [
    { value: 63, label: "live sessions since 2019" },
    { value: 12400, suffix: "+", label: "people have attended" },
    { value: 4.8, decimals: 1, suffix: "/5", label: "average rating" },
  ],
};

export const chat = [
  { name: "Priya", city: "Pune", time: "7:24 PM", text: "the reminder part alone was worth it. my last webinar had 300 signups and 41 showed up 😅" },
  { name: "Arjun", city: "Indore", time: "7:31 PM", text: "Did the pricing exercise. I was charging ₹299 for something people pay ₹3k for offline." },
  { name: "Sana", city: "Hyderabad", time: "7:46 PM", text: "can we get the page template? mine looks exactly like the ‘before’ example lol" },
  { name: "Meenal", city: "Jaipur", time: "7:52 PM", text: "Hindi mein samjhaya toh finally clear hua. Thank you!" },
  { name: "Karthik", city: "Chennai", time: "8:05 PM", text: "Update from last month’s session: ran my first paid webinar. 62 people came, 19 bought the course 🙏" },
  { name: "Rohit", city: "Delhi", time: "8:18 PM", text: "Hot seat was scary but so useful. Changed my offer title right there." },
  { name: "Aman", city: "Lucknow", time: "8:40 PM", text: "honestly expected 2 hours of sales pitch. got 10 min of pitch and 110 min of actual work" },
  { name: "Divya", city: "Kochi", time: "8:51 PM", text: "Can I bring my co-founder next week? She needs to hear the WhatsApp bit." },
];

export const faqs = [
  {
    q: "Is the session in Hindi or English?",
    a: "Both. I switch between them the way most of us do on calls. The slides are in English.",
  },
  {
    q: "What if I can’t make it live?",
    a: "You get the replay for 7 days, or 30 with the launch kit. Come live if you can, though. The hot seat only happens live.",
  },
  {
    q: "Do I need a course already?",
    a: "No. About half the room usually has just an idea. You’ll leave knowing whether it’s worth building.",
  },
  {
    q: "How do I join on the day?",
    a: "Open the link we send on WhatsApp and email. It works in any browser, on your phone or laptop, with nothing to install. It comes again 15 minutes before we start.",
  },
  {
    q: "Which payment methods work?",
    a: "UPI, all major cards, net banking, and EMI on the launch kit. Payments go through Razorpay.",
  },
  {
    q: "What if it isn’t useful for me?",
    a: "Attend the session, and if it wasn’t worth it, reply to your confirmation message within 24 hours. You’ll get a full refund, no questions.",
  },
];

export const niches = [
  "Yoga teachers",
  "Excel trainers",
  "Spoken-English coaches",
  "Home bakers",
  "Chartered accountants",
  "Guitar tutors",
  "UPSC mentors",
  "Fitness coaches",
  "Photographers",
  "Coding teachers",
];

// Sample poll shown inside the live room preview.
export const poll = [
  { label: "Fitness or yoga", pct: 34 },
  { label: "School or exam prep", pct: 27 },
  { label: "A skill like Excel or design", pct: 25 },
  { label: "Something else", pct: 14 },
];

export const roomFeatures = [
  { title: "Works in any browser", body: "Chrome, Safari, even the locked-down one on your office laptop." },
  { title: "Ask without unmuting", body: "Questions go into a queue. I answer the most-voted ones live." },
  { title: "Replay on the same link", body: "It’s ready about an hour after we finish. Nothing new to find." },
];
