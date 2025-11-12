"use client";

import React, { useState } from "react";
import {
  useScanTicketFromQr,
  ScannedTicketFromQr,
} from "@/app/hooks/useScanTicketFromQr";
import {
  useScanTicket,
  ScannedTicketWithUser,
} from "@/app/hooks/useScanTicket";
import { TicketTypesWithSummaryForEvent } from "@/app/hooks/useTicketTypesSummaryForEvent";
import {
  CardText,
  CheckInCard,
  CheckInCards,
  CheckInContainer,
  CheckInWrapper,
  IconWrapper,
  PlusIconWrapper,
  SearchContainer,
  SearchInput,
  StyledTable,
  TableWrapper,
} from "@/app/styles/TicketStyles/Stats.styles";
import { showErrorToast, showSuccessToast } from "@/app/utils/toast";
import { Clock, Wallet, ScanBarcode, TicketCheck } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import styled from "styled-components";

type Row = {
  id: number;
  name: string;
  email: string;
  phone: string;
  transactionId: string;
  price: number;
  createdAt: string;
  scanned: boolean;
  ticketTypeName?: string;
};

interface CheckInProps {
  summary?: TicketTypesWithSummaryForEvent;
  ticketId: string;
  setTicketId: (id: string) => void;
}

// Modal styled component
const TicketModal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: #ff4d4f;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-end;
`;

const CheckIn = ({ summary, ticketId, setTicketId }: CheckInProps) => {
  const [scannedRows, setScannedRows] = useState<Row[]>([]);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Row | null>(null);

  const { scanTicket: scanTicketFromQr } = useScanTicketFromQr();
  const { scanTicket: scanTicketById } = useScanTicket();

  console.log("get from ticket id data", ticketId);

  const handleTicketScan = (ticket: Row) => {
    setScannedRows((prev) => [...prev, ticket]);
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const handleScanQr = async (payload: string | null) => {
    if (!payload) return;
    try {
      const ticket: ScannedTicketFromQr | null = await scanTicketFromQr(
        payload
      );
      if (!ticket) return showErrorToast("Invalid QR code.");

      const row: Row = {
        id: scannedRows.length + 1,
        name: ticket.userName || ticket.ticketName || `Ticket #${ticket.code}`,
        email: ticket.userName || "",
        phone: "",
        transactionId: ticket.transactionId,
        price: ticket.price,
        createdAt: ticket.createdAt,
        scanned: ticket.scanned,
        ticketTypeName: ticket.ticketName || "Standard",
      };

      if (ticket.scanned) showErrorToast("Ticket has already been scanned.");
      else showSuccessToast("Ticket scanned successfully ✅");

      handleTicketScan(row);
      setTicketId(ticket.transactionId);
      setScannerOpen(false);
    } catch (err) {
      console.error(err);
      showErrorToast("QR scanning failed.");
    }
  };

  const handleScanByTicketId = async () => {
    if (!ticketId) return;
    try {
      const ticket: ScannedTicketWithUser | null = await scanTicketById(
        ticketId
      );
      if (!ticket) return showErrorToast("Ticket not found.");

      const row: Row = {
        id: scannedRows.length + 1,
        name: ticket.user?.name || `Ticket #${ticket.transactionId}`,
        email: ticket.user?.name || "",
        phone: "",
        transactionId: ticket.transactionId,
        price: ticket.price,
        createdAt: ticket.createdAt,
        scanned: ticket.scanned,
        ticketTypeName: ticket.TicketType?.name || "Standard",
      };

      if (ticket.scanned) showErrorToast("Ticket has already been scanned.");
      else showSuccessToast("Ticket scanned successfully ✅");

      handleTicketScan(row);
      setTicketId("");
    } catch (err) {
      console.error(err);
      showErrorToast("Ticket scan failed.");
    }
  };

  const filteredByTicketId = ticketId
    ? scannedRows.filter((r) => r.transactionId.includes(ticketId))
    : scannedRows;

  console.log("ticket id", filteredByTicketId);

  return (
    <CheckInContainer>
      <CheckInWrapper>
        {/* Cards */}
        <CheckInCards>
          <CheckInCard>
            <IconWrapper>
              <Clock />
            </IconWrapper>
            <CardText>
              <p>Tickets Checked In</p>
              <h3>{summary?.totalCheckedIn ?? 0}</h3>
            </CardText>
          </CheckInCard>
          <CheckInCard>
            <IconWrapper>
              <Wallet />
            </IconWrapper>
            <CardText>
              <p>Total Sold</p>
              <h3>{summary?.totalSold ?? 0}</h3>
            </CardText>
          </CheckInCard>
          <CheckInCard>
            <IconWrapper>
              <TicketCheck />
            </IconWrapper>
            <CardText>
              <p>Total Tickets</p>
              <h3>{summary?.totalTickets ?? 0}</h3>
            </CardText>
          </CheckInCard>
        </CheckInCards>

        {/* Manual ticket ID input / QR button */}
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Enter Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
          <PlusIconWrapper onClick={handleScanByTicketId}>
            <TicketCheck size={16} color="#444" />
          </PlusIconWrapper>
          <PlusIconWrapper onClick={() => setScannerOpen(true)}>
            <ScanBarcode size={16} color="#444" />
          </PlusIconWrapper>
        </SearchContainer>

        {scannerOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "90%",
                maxWidth: 400,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Scanner
                onScan={(detectedCodes) => {
                  if (detectedCodes.length === 0) return;
                  const payload = detectedCodes[0].rawValue;
                  handleScanQr(payload);
                }}
                onError={(err) => {
                  console.error(err);
                  showErrorToast("Camera error. Please allow camera access.");
                }}
                constraints={{ facingMode: { exact: "environment" } }}
                styles={{
                  container: { border: "2px solid #35938d", borderRadius: 16 },
                  video: { objectFit: "cover" },
                }}
              />
            </div>

            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                color: "#fff",
                background: "#35938d",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => setScannerOpen(false)}
            >
              Close Scanner
            </button>
          </div>
        )}

        {/* Table */}
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket ID</th>
                <th>Attendee</th>
                <th>Ticket Type</th> {/* <-- added */}
                <th>Price</th>
                <th>Scanned</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredByTicketId.map((row, index) => (
                <tr
                  key={row.transactionId}
                  onClick={() => {
                    setSelectedTicket(row);
                    setModalOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{row.transactionId}</td>
                  <td>{row.name}</td>
                  <td>{row.ticketTypeName}</td>
                  <td>{row.price}</td>
                  <td>{row.scanned ? "✅" : "❌"}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {filteredByTicketId.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No record found
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </TableWrapper>

        {/* Modal for scanned ticket details */}
        <TicketModal open={modalOpen}>
          <ModalContent>
            <CloseButton onClick={() => setModalOpen(false)}>Close</CloseButton>
            {selectedTicket && (
              <>
                <h3>Ticket Details</h3>
                <p>
                  <strong>Attendee:</strong> {selectedTicket.name}
                </p>
                <p>
                  <strong>Ticket ID:</strong> {selectedTicket.transactionId}
                </p>
                <p>
                  <strong>Price:</strong> KES {selectedTicket.price}
                </p>
                <p>
                  <strong>Scanned:</strong>{" "}
                  {selectedTicket.scanned ? "✅" : "❌"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
              </>
            )}
          </ModalContent>
        </TicketModal>
      </CheckInWrapper>
    </CheckInContainer>
  );
};

export default CheckIn;
