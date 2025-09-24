"use client";

import { useEffect, useState } from "react";

export type TicketType = {
  name: string;
  totalCheckedIn: number;
  remainingQuantity: number;
  price: number;
  totalSold: number;
  initialQuantity: number;
};

export type EventDetails = {
  createdAt: string;
  creatorId: string;
  date: string;
  description: string;
  endTime: string;
  from: string;
  id: string;
  image: string;
  link: string;
  location: string;
  mode: string;
  name: string;
  startTime: string;
  status: string;
  timezone: string;
  to: string;
  type: string;
  updatedAt: string;
  venue: string;
};

export type TicketTypesWithSummaryForEvent = {
  eventId: string;
  ticketTypes: TicketType[];
  totalCheckedIn: number;
  totalSold: number;
  totalTickets: number;
  verifiersCount: number;
  event: EventDetails;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const QUERY = `
  query TicketTypesWithSummaryForEvent($eventId: String!) {
    TicketTypesWithSummaryForEvent(eventId: $eventId) {
      eventId
      ticketTypes {
        name
        totalCheckedIn
        remainingQuantity
        price
        totalSold
        initialQuantity
      }
      totalCheckedIn
      totalSold
      totalTickets
      verifiersCount
      event {
        createdAt
        creatorId
        date
        description
        endTime
        from
        id
        image
        link
        location
        mode
        name
        startTime
        status
        timezone
        to
        type
        updatedAt
        venue
      }
    }
  }
`;

export const useTicketTypesWithSummaryForEvent = (eventId: string) => {
  const [data, setData] = useState<TicketTypesWithSummaryForEvent | null>(null);
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

        const json: GraphQLResponse<{ TicketTypesWithSummaryForEvent: TicketTypesWithSummaryForEvent }> =
          await res.json();

        if (json.errors && json.errors.length > 0) {
          throw new Error(json.errors[0].message);
        }

        setData(json.data?.TicketTypesWithSummaryForEvent ?? null);
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
