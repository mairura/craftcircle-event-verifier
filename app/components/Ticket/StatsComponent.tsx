"use client";
import React, { useState } from "react";
import styled from "styled-components";
import CheckIn from "./CheckIn";
import { TicketTypesWithSummaryForEvent } from "@/app/hooks/useTicketTypesSummaryForEvent";

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  width: 100%;
`;

const StatsTags = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #495057;
  border-bottom: 1px solid #aecdcb;
  padding: 0 0 1rem 1rem;

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0 0 10px 1px;
    gap: 5px;
  }
`;

const StatsTag = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  white-space: nowrap;
  font-size: 1.5rem;
`;

const TabContentRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const TabColumn = styled.div`
  flex: 1 1 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const StatsComponent = ({ summary }: { summary?: TicketTypesWithSummaryForEvent }) => {
  const [ticketId, setTicketId] = useState("");

  return (
    <StatsContainer>
      <StatsTags>
        <StatsTag>Your tickets checkin</StatsTag>
      </StatsTags>

      <TabContentRow>
        <TabColumn style={{ flex: "1 1 100%" }}>
          <CheckIn
            summary={summary}
            ticketId={ticketId}
            setTicketId={setTicketId}
          />
        </TabColumn>
      </TabContentRow>
    </StatsContainer>
  );
};

export default StatsComponent;
