"use client";

import { useState } from "react";

export type ScannedTicketFromQr = {
  createdAt: string;
  code: string;
  price: number;
  scanned: boolean;
  transactionId: string;
  userName?: string | null;
  ticketName?: string;
};

const MUTATION = `
  mutation ScanTicketFromQr($encryptedPayload: String!) {
    ScanTicketFromQr(encryptedPayload: $encryptedPayload) {
      message
      status
      ticket {
        TicketType { name }
        code
        createdAt
        eventId
        price
        scanned
        transactionId
        user { name }
      }
    }
  }
`;

export const useScanTicketFromQr = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<ScannedTicketFromQr | null>(null);

  const scanTicket = async (
    encryptedPayload: string
  ): Promise<ScannedTicketFromQr | null> => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: MUTATION,
          variables: { encryptedPayload },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const result = json.data?.ScanTicketFromQr;
      if (!result) {
        throw new Error("Unexpected response format.");
      }

      if (result.status !== "SUCCESS") {
        setMessage(result.message || "Unknown ticket status");
        setError(result.message || "Unknown error");
        return null;
      }

      const rawTicket = result.ticket;
      if (!rawTicket) {
        setMessage("Ticket not found.");
        return null;
      }

      const ticket: ScannedTicketFromQr = {
        createdAt: rawTicket.createdAt,
        code: rawTicket.code,
        transactionId: rawTicket.transactionId,
        price: rawTicket.price,
        scanned: rawTicket.scanned,
        ticketName: rawTicket.TicketType?.name || "Unknown Ticket",
        userName: rawTicket.user?.name || null,
      };

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
