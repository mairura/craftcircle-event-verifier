"use client";

import { useState } from "react";

export type ScannedTicketWithUser = {
  createdAt: string;
  eventId: string;
  transactionId: string;
  ticketTypeId: string;
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
    ticketId: string
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

      // Handle custom message / status
      if (result.status !== "SUCCESS") {
        setMessage(result.message || "Unknown ticket status");
        setError(result.message || "Unknown error");
        return null;
      }

      const ticket: ScannedTicketWithUser = result.ticket;
      setData(ticket);
      setMessage(result.message || null);
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

  return { scanTicket, data, loading, error, message };
};
