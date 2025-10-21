"use client";

import { useState } from "react";

export type ScannedTicketWithUser = {
  createdAt: string;
  eventId: string;
  transactionId: string;
  ticketTypeId: string;
  price: number;
  scanned: boolean;
  user: {
    name: string;
  } | null;
  TicketType: {
    name: string;
  } | null;
};

const MUTATION = `
  mutation ScanTicket($ticketId: String!) {
    ScanTicket(ticketId: $ticketId) {
      TicketType {
        name
      }
      user {
        name
      }
      scanned
      price
      eventId
      createdAt
      transactionId
      ticketTypeId
    }
  }
`;

export const useScanTicket = () => {
  const [data, setData] = useState<ScannedTicketWithUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanTicket = async (ticketId: string): Promise<ScannedTicketWithUser | null> => {
    setLoading(true);
    setError(null);

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

      const ticket: ScannedTicketWithUser = json.data.ScanTicket;
      setData(ticket);
      return ticket;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { scanTicket, data, loading, error };
};
