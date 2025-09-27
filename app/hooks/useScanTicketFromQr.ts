"use client";

import { useState } from "react";

export type ScannedTicket = {
  createdAt: string;
  eventId: string;
  id: string;
  price: number;
  scanned: boolean;
  transactionId: string;
};

const MUTATION = `
  mutation ScanTicketFromQr($encryptedPayload: String!) {
    ScanTicketFromQr(encryptedPayload: $encryptedPayload) {
      createdAt
      eventId
      id
      price
      scanned
      transactionId
    }
  }
`;

export const useScanTicketFromQr = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ScannedTicket | null>(null);

  const scanTicket = async (
    encryptedPayload: string
  ): Promise<ScannedTicket | null> => {
    setLoading(true);
    setError(null);

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

      const ticket: ScannedTicket = json.data.ScanTicketFromQr;

      if (!ticket) {
        return null;
      }

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
