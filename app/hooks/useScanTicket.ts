"use client";

import { useState } from "react";

export type ScannedTicketWithUser = {
  createdAt: string;
  eventId: string;
  transactionId: string;
  ticketTypeId: string;
  status: string;
  price: number;
  scanned: boolean;
  user: { name: string } | null;
  TicketType: { name: string } | null;
};

const MUTATION = `
  mutation ScanTicket($ticketId: String!) {
    ScanTicket(ticketId: $ticketId) {
      message
      status
      ticket {
        TicketType { name }
        user { name }
        scanned
        price
        eventId
        createdAt
        transactionId
        ticketTypeId
      }
    }
  }
`;

export const useScanTicket = () => {
  const [data, setData] = useState<ScannedTicketWithUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const scanTicket = async (
    ticketId: string,
  ): Promise<ScannedTicketWithUser | null> => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: MUTATION,
          variables: { ticketId },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const result = json.data?.ScanTicket;
      if (!result) {
        throw new Error("Unexpected response format.");
      }

      const rawTicket = result.ticket;

      if (!rawTicket) {
        setMessage(result.message || "Ticket not found.");
        return null;
      }

      const ticket: ScannedTicketWithUser = {
        ...rawTicket,
        status: result.status,
      };

      setData(ticket);
      setMessage(result.message || null);
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { scanTicket, data, loading, error, message };
};
