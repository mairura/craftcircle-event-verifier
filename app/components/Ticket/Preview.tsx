"use client";

import { Calendar, LocationEdit, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";
import StatsComponent from "./StatsComponent";
import {
  AboutDetails,
  AboutPreview,
  ActionContainer,
  Divider,
  ImageWrapper,
  MessageIcon,
  PreviewContainer,
  PreviewData,
  PreviewDetails,
  PreviewDetailsSection,
  PreviewDetailsSectionItem,
  PreviewEvent,
  PreviewTimeZone,
  StatsContainer,
} from "@/app/styles/TicketStyles/Preview.styles";
import { useTicketTypesWithSummaryForEvent } from "@/app/hooks/useTicketTypesSummaryForEvent";
import { useAttendeesForEvent } from "@/app/hooks/useAttendeeForEvent";

const PreviewAction = () => {
  const access =
    typeof window !== "undefined"
      ? sessionStorage.getItem("verifiedEventAccess")
      : null;
  const eventId = access ? JSON.parse(access).eventId : "";

  const { data, loading, error } = useTicketTypesWithSummaryForEvent(eventId);
  const {
    data: attendees,
    loading: attendeesLoading,
    error: attendeesError,
  } = useAttendeesForEvent(eventId);

  const event = data?.event;

  return (
    <PreviewContainer>
      <ActionContainer>
        <ImageWrapper>
          {event?.image ? (
            <Image src={event.image} alt={event.name} fill priority />
          ) : (
            <Image src="/1.png" alt="fallback" fill priority />
          )}
        </ImageWrapper>

        <PreviewDetails>
          <PreviewData>
            <PreviewDetailsSection>
              <PreviewDetailsSectionItem>
                <h4>
                  {loading
                    ? "Loading..."
                    : error
                    ? "Error loading event"
                    : event?.name ?? "No event name"}
                </h4>
              </PreviewDetailsSectionItem>

              <PreviewEvent>
                <Image
                  src="/user.svg"
                  alt="Preview Action"
                  width={20}
                  height={20}
                />
                <p>{event?.venue ?? "Unknown venue"}</p>
              </PreviewEvent>
            </PreviewDetailsSection>

            <PreviewTimeZone>
              <div>
                <Calendar size={20} color="#444444" />
                <p>{event?.to ?? "N/A"}</p>
              </div>
              <div>
                <LocationEdit size={20} color="#444444" />
                <p>{event?.location ?? "N/A"}</p>
              </div>
              <div>
                <Timer size={20} color="#444444" />
                {event?.startTime && event?.endTime
                  ? `${event.startTime} - ${event.endTime}`
                  : "N/A"}
              </div>
            </PreviewTimeZone>
          </PreviewData>
        </PreviewDetails>

        <AboutPreview>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <MessageIcon>
              <div
                style={{
                  background: "#fff",
                  padding: "0.5rem 0.9rem",
                  borderRadius: "1rem",
                }}
              >
                <Image
                  src="/message.svg"
                  height={18}
                  width={18}
                  alt="message"
                />
              </div>
              About
            </MessageIcon>
            <AboutDetails>
              <p>
                {event?.description ??
                  (loading ? "Loading description..." : "No description.")}
              </p>
              <br />
              <p>This is an amazing event 🎟️</p>
            </AboutDetails>
          </div>
        </AboutPreview>
      </ActionContainer>
      <Divider />

      <StatsContainer>
        {attendeesLoading && <p>Loading attendees...</p>}
        {attendeesError && (
          <p style={{ color: "red" }}>Error loading attendees</p>
        )}
        <StatsComponent
          summary={data ?? undefined}
          attendees={attendees ?? []}
        />
      </StatsContainer>
    </PreviewContainer>
  );
};

export default PreviewAction;
