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

const PreviewAction = () => {
  const access =
    typeof window !== "undefined"
      ? sessionStorage.getItem("verifiedEventAccess")
      : null;
  const eventId = access ? JSON.parse(access).eventId : "";

  const { data, loading, error } = useTicketTypesWithSummaryForEvent(eventId);

  if (loading) return <p>Loading event data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!data) return <p>No event data found</p>;

  const event = data.event;

  return (
    <PreviewContainer>
      <ActionContainer>
        <ImageWrapper>
          <Image src={event.image || "/1.png"} alt={event.name} fill priority />
        </ImageWrapper>

        <PreviewDetails>
          <PreviewData>
            <PreviewDetailsSection>
              <PreviewDetailsSectionItem>
                <h4>{event.name}</h4>
              </PreviewDetailsSectionItem>

              <PreviewEvent>
                <Image
                  src="/user.svg"
                  alt="Preview Action"
                  width={20}
                  height={20}
                />
                <p>{event.venue}</p>
              </PreviewEvent>
            </PreviewDetailsSection>

            <PreviewTimeZone>
              <div>
                <Calendar size={20} color="#444444" />
                <p>{event.to}</p>
              </div>
              <div>
                <LocationEdit size={20} color="#444444" />
                <p>{event.location}</p>
              </div>
              <div>
                <Timer size={20} color="#444444" />
                {event.startTime} - {event.endTime}
              </div>
            </PreviewTimeZone>
          </PreviewData>
        </PreviewDetails>

        <AboutPreview>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <MessageIcon>About the Event</MessageIcon>
            <AboutDetails>
              <p>{event.description || "No description provided."}</p>
              <br />
              <p>This is an amazing event 🎟️</p>
            </AboutDetails>
          </div>
        </AboutPreview>
      </ActionContainer>
      <Divider />

      <StatsContainer>
        <StatsComponent summary={data} />
      </StatsContainer>
    </PreviewContainer>
  );
};

export default PreviewAction;
