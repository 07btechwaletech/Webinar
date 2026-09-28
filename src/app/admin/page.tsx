import type { Metadata } from "next";
import { brand, tickets } from "@/content/webinar";
import { formatPrice } from "@/lib/session";
import { adminConfigured, isAdmin } from "@/server/admin";
import { listLeads, usingDatabase, type Lead } from "@/server/leads";
import { Download, WhatsApp } from "@/components/ui/Icons";
import { Wordmark } from "@/components/layout/SiteHeader";
import { LoginForm } from "./LoginForm";
import { logout } from "./actions";

export const metadata: Metadata = { title: `Leads · ${brand.name}`, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const when = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(d));

const followUpLink = (lead: Lead) =>
  `https://wa.me/91${lead.phone}?text=${encodeURIComponent(brand.followUp.replace("{name}", lead.name.split(" ")[0]))}`;

const WHATSAPP_LABEL: Record<string, string> = { sent: "Sent", simulated: "Demo (not sent)", failed: "Failed" };

export default async function AdminPage() {
  if (!adminConfigured) {
    return (
      <main className="wrap py-16">
        <div className="box mx-auto max-w-lg p-7">
          <h1 className="display text-3xl">Set an admin password first</h1>
          <p className="mt-3 text-muted">
            This page shows people’s phone numbers, so it stays locked until you add <code className="font-bold">ADMIN_PASSWORD</code> in
            your Vercel project’s environment variables and redeploy.
          </p>
        </div>
      </main>
    );
  }
  if (!(await isAdmin())) return <main className="wrap">{<LoginForm />}</main>;

  const leads = await listLeads();
  const paid = leads.filter((l) => l.status === "paid");
  const cards = [
    { label: "Registrations", value: leads.length },
    { label: "Paid", value: paid.length },
    { label: "Revenue", value: formatPrice(paid.reduce((sum, l) => sum + l.amount, 0)) },
    { label: "WhatsApp confirmations", value: paid.filter((l) => l.whatsappStatus).length },
  ];

  return (
    <div className="min-h-dvh bg-marigold-soft">
      <header className="border-b-2 border-ink bg-white">
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <Wordmark />
          <div className="flex items-center gap-3">
            <a href="/admin/leads.csv" className="btn btn-primary min-h-11 px-4 text-base">
              <Download width={18} height={18} /> <span className="hidden sm:inline">Download</span> CSV
            </a>
            <form action={logout}>
              <button type="submit" className="btn btn-white min-h-11 px-4 text-base">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="wrap space-y-8 py-10">
        <div>
          <h1 className="display text-4xl">Leads</h1>
          <p className="mt-1 text-muted">Everyone who filled the form, paid or not. Message them about your next course from here.</p>
        </div>

        {!usingDatabase && (
          <p role="status" className="rounded-xl border-2 border-ink bg-blush-soft px-4 py-3 font-medium">
            Demo storage: leads are kept in memory and disappear when the server restarts. Connect a Postgres database
            (DATABASE_URL) to keep them permanently.
          </p>
        )}

        <dl className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="box flex flex-col-reverse justify-center p-5">
              <dt className="text-muted">{c.label}</dt>
              <dd className="display text-4xl">{c.value}</dd>
            </div>
          ))}
        </dl>

        <div className="box overflow-hidden">
          {leads.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-xl font-bold">No registrations yet</p>
              <p className="mt-1 text-muted">Share the landing page. Each sign-up shows up here the moment it happens.</p>
              <a href="/" className="btn btn-primary mt-6">
                Open the landing page
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left">
                <thead className="border-b-2 border-ink bg-white text-sm">
                  <tr>
                    {["Name", "WhatsApp", "Email", "Ticket", "Status", "Registered", ""].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="align-middle">
                      <td className="px-4 py-3 font-semibold">{lead.name}</td>
                      <td className="px-4 py-3 tabular-nums">+91 {lead.phone}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{tickets.find((t) => t.id === lead.ticketId)?.name ?? lead.ticketId}</td>
                      <td className="px-4 py-3">
                        <span className={`sticker shadow-none ${lead.status === "paid" ? "bg-mint-soft" : "bg-white"}`}>
                          {lead.status === "paid" ? `Paid · Seat ${lead.seatNo}` : "Not paid"}
                        </span>
                        {lead.whatsappStatus && <span className="mt-1 block text-xs text-muted">WhatsApp: {WHATSAPP_LABEL[lead.whatsappStatus]}</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{when(lead.createdAt)}</td>
                      <td className="px-4 py-3">
                        <a href={followUpLink(lead)} target="_blank" rel="noreferrer" className="btn btn-white min-h-10 gap-2 px-3 text-sm">
                          <WhatsApp width={16} height={16} className="text-wa-dark" /> Message
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
