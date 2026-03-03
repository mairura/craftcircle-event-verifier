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
  status?: string;
};

const MUTATION = `
  mutation ScanTicketFromQr($encryptedPayload: String!, $eventId: String!) {
    ScanTicketFromQr(encryptedPayload: $encryptedPayload, eventId: $eventId) {
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
    encryptedPayload: string,
    eventId: string,
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
          variables: { encryptedPayload, eventId },
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

      const rawTicket = result.ticket;

      if (!rawTicket) {
        setMessage(result.message || "Ticket not found.");
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
        status: result.status,
      };

      setData(ticket);
      setMessage(result.message);
      return ticket;
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { scanTicket, data, loading, error, message };
};
