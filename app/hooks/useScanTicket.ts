"use client";

import { useState } from "react";

export type ScannedTicketWithUser = {
  id: string;
  code: string;
  scanned: boolean;
  scannedAt?: string | null;
  status: string;
  issuedBy?: string | null;
  ticketRecipient?: {
    email: string;
    name: string;
    ticketId: string;
  } | null;
};

const MUTATION = `
  mutation ScanTicket($idempotencyKey: String!, $sessionToken: String!, $ticketCode: String!) {
    ScanTicket(idempotencyKey: $idempotencyKey, sessionToken: $sessionToken, ticketCode: $ticketCode) {
      message
      status
      ticket {
        scanned
        status
        ticketRecipient {
          email
          name
          ticketId
        }
        issuedBy
        scannedAt
        id
        code
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
    ticketCode: string,
    idempotencyKey: string,
    sessionToken: string,
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
          variables: { ticketCode, idempotencyKey, sessionToken },
        }),
      });

      const json = await res.json();

      if (json.errors) throw new Error(json.errors[0].message);

      const result = json.data?.ScanTicket;
      if (!result) throw new Error("Unexpected response format.");

      const rawTicket = result.ticket;

      if (!rawTicket) {
        setMessage(result.message || "Ticket not found.");
        return null;
      }

      const ticket: ScannedTicketWithUser = {
        id: rawTicket.id,
        code: rawTicket.code,
        scanned: rawTicket.scanned,
        scannedAt: rawTicket.scannedAt ?? null,
        status: result.status,
        issuedBy: rawTicket.issuedBy ?? null,
        ticketRecipient: rawTicket.ticketRecipient ?? null,
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
