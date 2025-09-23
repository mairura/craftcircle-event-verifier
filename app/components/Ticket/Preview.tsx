"use client";

import { Calendar, LocationEdit, Share, Timer } from "lucide-react";
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
  ShareContainer,
  ShareDropdown,
  StatsContainer,
} from "@/app/styles/TicketStyles/Preview.styles";


const PreviewAction = () => {
  return (
    <PreviewContainer>
      <ActionContainer>
        <ImageWrapper>
          <Image src="/1.png" alt="Preview Action" fill priority />
          {/* <Image src={event.image} alt={event.name} fill priority /> */}
        </ImageWrapper>

        <PreviewDetails>
          <PreviewData>
            <PreviewDetailsSection>
              <PreviewDetailsSectionItem>
                <h4>7. After Karura Forest Party</h4>
                <ShareContainer>
                  <Share size={24} color="#35938D" />
                  <p>Share</p>
                  <ShareDropdown>
                    {/* {shareOptions.map((option) => ( */}
                    {/* <li key={option.name}> */}
                    <li>
                      <a
                        // href={option.url}
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* {option.name} */}
                        Option 1
                      </a>
                    </li>
                    {/* ))} */}
                  </ShareDropdown>
                </ShareContainer>
              </PreviewDetailsSectionItem>

              <PreviewEvent>
                <Image
                  src="/user.svg"
                  alt="Preview Action"
                  width={20}
                  height={20}
                />
                <p>National Events</p>
                {/* <p>{event.venue}</p> */}
              </PreviewEvent>
            </PreviewDetailsSection>

            <PreviewTimeZone>
              <div>
                <Calendar size={20} color="#444444" />
                {/* <p>{event.to}</p> */}
                <p>To time</p>
              </div>
              <div>
                <LocationEdit size={20} color="#444444" />
                {/* <p>{event.location}</p> */}
                <p>Location</p>
              </div>
              <div>
                <Timer size={20} color="#444444" />
                  {/* {event.startTime} - {event.endTime} */}
                  <p>1100hrs - 1200hrs</p>
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
                  padding: "0.2rem 0.8rem",
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
              {/* <p>{event.description}</p> */}
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo
                vero mollitia officia. Dicta excepturi distinctio est voluptas
                corporis sint, inventore, unde, ipsam vel placeat nesciunt
                consectetur aperiam ipsum temporibus similique.
              </p>
              Descp
              <p>This is an amazing event 🎟️</p>
            </AboutDetails>
          </div>
        </AboutPreview>
      </ActionContainer>
      <Divider />

      <StatsContainer>
        <StatsComponent />
      </StatsContainer>
    </PreviewContainer>
  );
};

export default PreviewAction;
