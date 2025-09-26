"use client";

import { useEffect, useState } from "react";

export type Attendee = {
  purchasedAt: string;
  recipient: {
    name: string;
  };
  scanned: boolean;
  ticketId: string;
  ticketType: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const QUERY = `
  query AttendeesForEvent($eventId: String!) {
    AttendeesForEvent(eventId: $eventId) {
      purchasedAt
      recipient {
        name
      }
      scanned
      ticketId
      ticketType
    }
  }
`;

export const useAttendeesForEvent = (eventId: string) => {
  const [data, setData] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: QUERY,
            variables: { eventId },
          }),
        });

        const json: GraphQLResponse<{ AttendeesForEvent: Attendee[] }> =
          await res.json();

        if (json.errors && json.errors.length > 0) {
          throw new Error(json.errors[0].message);
        }

        setData(json.data?.AttendeesForEvent ?? []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  return { data, loading, error };
};
