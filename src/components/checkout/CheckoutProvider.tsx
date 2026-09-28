"use client";

import { createContext, useContext, useState } from "react";
import type { Ticket } from "@/content/webinar";
import { CheckoutDialog } from "./CheckoutDialog";

type TicketId = Ticket["id"];
const CheckoutContext = createContext<(ticket?: TicketId) => void>(() => {});

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [openWith, setOpenWith] = useState<TicketId | null>(null);

  return (
    <CheckoutContext.Provider value={(ticket = "live") => setOpenWith(ticket)}>
      {children}
      {openWith && <CheckoutDialog initialTicket={openWith} onClose={() => setOpenWith(null)} />}
    </CheckoutContext.Provider>
  );
}

export function CheckoutButton({
  ticket,
  className,
  children,
}: {
  ticket?: TicketId;
  className?: string;
  children: React.ReactNode;
}) {
  const open = useContext(CheckoutContext);
  return (
    <button type="button" className={className} onClick={() => open(ticket)}>
      {children}
    </button>
  );
}
