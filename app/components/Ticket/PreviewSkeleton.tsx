import React from "react";
import {
  ActionContainer,
  Divider,
  ImageWrapper,
  PreviewContainer,
  PreviewDetails,
  PreviewData,
  PreviewDetailsSection,
  PreviewDetailsSectionItem,
  PreviewEvent,
  PreviewTimeZone,
  AboutPreview,
  AboutDetails,
  StatsContainer,
} from "@/app/styles/TicketStyles/Preview.styles";
import styled from "styled-components";

const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  background: #e5e7eb;
  border-radius: 6px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
`;

const PreviewSkeleton = () => {
  return (
    <PreviewContainer>
      <ActionContainer>
        <ImageWrapper>
          <SkeletonBox width="100%" height="250px" />
        </ImageWrapper>

        <PreviewDetails>
          <PreviewData>
            <PreviewDetailsSection>
              <PreviewDetailsSectionItem>
                <SkeletonBox width="200px" height="24px" />
              </PreviewDetailsSectionItem>

              <PreviewEvent>
                <SkeletonBox width="100px" height="16px" />
              </PreviewEvent>
            </PreviewDetailsSection>

            <PreviewTimeZone>
              <SkeletonBox width="120px" height="16px" />
              <SkeletonBox width="120px" height="16px" />
              <SkeletonBox width="120px" height="16px" />
            </PreviewTimeZone>
          </PreviewData>
        </PreviewDetails>

        <AboutPreview>
          <SkeletonBox width="150px" height="20px" />
          <AboutDetails>
            <SkeletonBox width="100%" height="16px" />
            <SkeletonBox width="90%" height="16px" />
            <SkeletonBox width="80%" height="16px" />
          </AboutDetails>
        </AboutPreview>
      </ActionContainer>

      <Divider />

      <StatsContainer>
        <SkeletonBox width="100%" height="100px" />
      </StatsContainer>
    </PreviewContainer>
  );
};

export default PreviewSkeleton;
