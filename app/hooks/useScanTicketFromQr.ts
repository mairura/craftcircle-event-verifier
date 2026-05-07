"use client";

import { useState } from "react";

export type ScannedTicketFromQr = {
  code: string;
  scanned: boolean;
  scannedAt?: string | null;
  isComplementary?: boolean;
  issuedReason?: string | null;
  status?: string;
  transactionId?: string;
  userName?: string | null;
  ticketName?: string;
  createdAt?: string;
  price?: number;
};

const MUTATION = `
  mutation ScanTicketFromQr($encryptedPayload: String!, $idempotencyKey: String!, $sessionToken: String!) {
    ScanTicketFromQr(encryptedPayload: $encryptedPayload, idempotencyKey: $idempotencyKey, sessionToken: $sessionToken) {
      message
      status
      ticket {
        code
        issuedReason
        isComplementary
        status
        scannedAt
        scanned
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
    idempotencyKey: string,
    sessionToken: string,
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
          variables: { encryptedPayload, idempotencyKey, sessionToken },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const result = json.data?.ScanTicketFromQr;

      if (!result) throw new Error("Unexpected response format.");

      const rawTicket = result.ticket;

      if (!rawTicket) {
        setMessage(result.message || "Ticket not found.");
        return null;
      }

      const ticket: ScannedTicketFromQr = {
        code: rawTicket.code,
        scanned: rawTicket.scanned,
        scannedAt: rawTicket.scannedAt ?? null,
        isComplementary: rawTicket.isComplementary,
        issuedReason: rawTicket.issuedReason ?? null,
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
