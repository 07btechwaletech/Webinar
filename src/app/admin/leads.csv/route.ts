import { isAdmin } from "@/server/admin";
import { listLeads } from "@/server/leads";

// Quotes every cell and defuses spreadsheet formulas (a name like "=HYPERLINK(...)").
const cell = (value: unknown) => {
  const text = value instanceof Date ? value.toISOString() : String(value ?? "");
  return `"${(/^[=+\-@]/.test(text) ? `'${text}` : text).replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Log in at /admin first.", { status: 401 });

  const leads = await listLeads();
  const header = ["Name", "WhatsApp (+91)", "Email", "Ticket", "Amount", "Status", "Seat", "WhatsApp confirmation", "Registered", "Paid at"];
  const rows = leads.map((l) =>
    [l.name, l.phone, l.email, l.ticketId, l.amount, l.status, l.seatNo, l.whatsappStatus, l.createdAt, l.paidAt].map(cell).join(","),
  );

  // BOM so Excel opens ₹ and Hindi names correctly
  return new Response(String.fromCharCode(0xfeff) + [header.map(cell).join(","), ...rows].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
