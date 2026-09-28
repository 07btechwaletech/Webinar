import "server-only";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { webinar } from "@/content/webinar";

export type WhatsAppStatus = "sent" | "simulated" | "failed";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string; // 10 digits, no country code
  ticketId: string;
  amount: number; // rupees
  status: "pending" | "paid";
  orderId: string | null;
  paymentId: string | null;
  seatNo: number | null;
  whatsappOptIn: boolean;
  whatsappStatus: WhatsAppStatus | null;
  createdAt: Date;
  paidAt: Date | null;
};

type NewLead = Pick<Lead, "name" | "email" | "phone" | "ticketId" | "amount" | "whatsappOptIn">;

// With DATABASE_URL set, leads live in Postgres. Without it (local demo) they live in
// memory and disappear on restart; the admin page warns about this.
export const usingDatabase = Boolean(process.env.DATABASE_URL);

const g = globalThis as unknown as { leadPool?: Pool; leadMemory?: Lead[]; leadTable?: Promise<unknown> };
const pool = usingDatabase ? (g.leadPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3 })) : null;
const memory = (g.leadMemory ??= []);

const COLUMNS = `id, name, email, phone, ticket_id as "ticketId", amount, status, order_id as "orderId",
  payment_id as "paymentId", seat_no as "seatNo", whatsapp_opt_in as "whatsappOptIn",
  whatsapp_status as "whatsappStatus", created_at as "createdAt", paid_at as "paidAt"`;

// Creates the table on first use, so there is no migration step.
function db() {
  g.leadTable ??= pool!.query(`
    create table if not exists leads (
      id uuid primary key,
      name text not null,
      email text not null,
      phone text not null,
      ticket_id text not null,
      amount integer not null,
      status text not null default 'pending',
      order_id text,
      payment_id text,
      seat_no integer,
      whatsapp_opt_in boolean not null default true,
      whatsapp_status text,
      created_at timestamptz not null default now(),
      paid_at timestamptz
    )`);
  return g.leadTable.then(() => pool!);
}

const isUuid = (id: string) => /^[0-9a-f-]{36}$/i.test(id);

export async function createLead(input: NewLead): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: randomUUID(),
    status: "pending",
    orderId: null,
    paymentId: null,
    seatNo: null,
    whatsappStatus: null,
    createdAt: new Date(),
    paidAt: null,
  };
  if (!pool) {
    memory.unshift(lead);
    return lead;
  }
  await (await db()).query(
    `insert into leads (id, name, email, phone, ticket_id, amount, whatsapp_opt_in) values ($1, $2, $3, $4, $5, $6, $7)`,
    [lead.id, lead.name, lead.email, lead.phone, lead.ticketId, lead.amount, lead.whatsappOptIn],
  );
  return lead;
}

export async function getLead(id: string): Promise<Lead | null> {
  if (!isUuid(id)) return null;
  if (!pool) return memory.find((l) => l.id === id) ?? null;
  const { rows } = await (await db()).query(`select ${COLUMNS} from leads where id = $1`, [id]);
  return rows[0] ?? null;
}

export async function attachOrder(id: string, orderId: string) {
  if (!pool) {
    const lead = memory.find((l) => l.id === id);
    if (lead) lead.orderId = orderId;
    return;
  }
  await (await db()).query(`update leads set order_id = $2 where id = $1`, [id, orderId]);
}

// Idempotent: a second call for the same lead changes nothing and reports newlyPaid: false,
// so a retried request never sends a second WhatsApp message.
// ponytail: seat numbers come from max()+1, so two payments in the same instant can share one.
// Move to a sequence if that ever matters.
export async function markPaid(id: string, paymentId: string): Promise<{ lead: Lead; newlyPaid: boolean } | null> {
  if (!pool) {
    const lead = memory.find((l) => l.id === id);
    if (!lead) return null;
    if (lead.status === "paid") return { lead, newlyPaid: false };
    const lastSeat = Math.max(webinar.seatsTaken, ...memory.map((l) => l.seatNo ?? 0));
    Object.assign(lead, { status: "paid", paymentId, paidAt: new Date(), seatNo: lastSeat + 1 });
    return { lead, newlyPaid: true };
  }
  const conn = await db();
  const { rows } = await conn.query(
    `update leads set status = 'paid', payment_id = $2, paid_at = now(),
       seat_no = (select coalesce(max(seat_no), $3) + 1 from leads)
     where id = $1 and status = 'pending'
     returning ${COLUMNS}`,
    [id, paymentId, webinar.seatsTaken],
  );
  if (rows[0]) return { lead: rows[0], newlyPaid: true };
  const lead = await getLead(id);
  return lead ? { lead, newlyPaid: false } : null;
}

export async function setWhatsAppStatus(id: string, status: WhatsAppStatus) {
  if (!pool) {
    const lead = memory.find((l) => l.id === id);
    if (lead) lead.whatsappStatus = status;
    return;
  }
  await (await db()).query(`update leads set whatsapp_status = $2 where id = $1`, [id, status]);
}

export async function listLeads(): Promise<Lead[]> {
  if (!pool) return [...memory];
  const { rows } = await (await db()).query(`select ${COLUMNS} from leads order by created_at desc limit 5000`);
  return rows;
}
