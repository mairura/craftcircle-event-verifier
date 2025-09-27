"use client";

import {
  useScanTicketFromQr,
  ScannedTicket as ScannedTicketFromQr,
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
import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

type Row = {
  id: number;
  name: string;
  email: string;
  phone: string;
  transactionId: string;
  price: number;
  createdAt: string;
  eventId: string;
  scanned: boolean;
};

interface CheckInProps {
  summary?: TicketTypesWithSummaryForEvent;
  ticketId: string;
  setTicketId: (id: string) => void;
}

const CheckIn = ({ summary, ticketId, setTicketId }: CheckInProps) => {
  const [scannedRows, setScannedRows] = useState<Row[]>([]);
  const [scannerOpen, setScannerOpen] = useState(false);

  const { scanTicket: scanTicketFromQr } = useScanTicketFromQr();
  const { scanTicket: scanTicketById } = useScanTicket();

  /** Handle QR scan */
  const handleScanQr = async (payload: string | null) => {
    if (!payload) return;

    try {
      console.log("Payload detected:", payload);
      showSuccessToast(`QR payload detected: ${payload}`);

      const ticket: ScannedTicketFromQr | null = await scanTicketFromQr(payload);
      if (!ticket) {
        showErrorToast("Failed to fetch ticket details");
        return;
      }

      showSuccessToast(ticket.scanned ? "Ticket scanned ✅" : "Ticket invalid ❌");

      // Add to table
      setScannedRows((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: `Ticket #${ticket.id}`,
          email: "",
          phone: "",
          transactionId: ticket.transactionId,
          price: ticket.price,
          createdAt: ticket.createdAt,
          eventId: ticket.eventId,
          scanned: ticket.scanned,
        },
      ]);

      setTicketId(ticket.transactionId);
      setScannerOpen(false); // automatically close camera
    } catch (err) {
      console.error(err);
      showErrorToast("QR scanning failed.");
    }
  };

  const handleError = (err: unknown) => {
    console.error(err);
    showErrorToast("Camera error. Please allow camera access.");
  };

  /** Handle manual ticket ID scan */
  const handleScanByTicketId = async () => {
    if (!ticketId) return;
    try {
      const ticket: ScannedTicketWithUser | null = await scanTicketById(ticketId);
      if (!ticket) return showErrorToast("Ticket not found.");

      showSuccessToast(ticket.scanned ? "Ticket scanned ✅" : "Ticket invalid ❌");

      setScannedRows((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: ticket.user?.name || `Ticket #${ticket.id}`,
          email: ticket.user?.name || "",
          phone: "",
          transactionId: ticket.transactionId,
          price: ticket.price,
          createdAt: ticket.createdAt,
          eventId: ticket.eventId,
          scanned: ticket.scanned,
        },
      ]);

      setTicketId(""); // reset after scanning
    } catch (err) {
      console.error(err);
      showErrorToast("Ticket scan failed.");
    }
  };

  const filteredByTicketId = ticketId
    ? scannedRows.filter((r) => r.transactionId.includes(ticketId))
    : scannedRows;

  const noRecordsFound = filteredByTicketId.length === 0;

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

        {/* QR Scanner */}
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
                  console.log("Payload detected from scanner:", payload);
                  showSuccessToast(`Payload detected: ${payload}`); // instant toast
                  handleScanQr(payload); // send to backend and add to table
                }}
                onError={handleError}
                constraints={{ facingMode: { exact: "environment" } }}
              />
            </div>

            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                color: "#fff",
                background: "#ff4d4f",
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
                <th>Price</th>
                <th>Scanned</th>
                <th>Created At</th>
                <th>Event ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredByTicketId.map((row, index) => (
                <tr key={row.transactionId}>
                  <td>{index + 1}</td>
                  <td>{row.transactionId}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td>{row.scanned ? "✅" : "❌"}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                  <td>{row.eventId}</td>
                </tr>
              ))}
              {noRecordsFound && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    No record found
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </CheckInWrapper>
    </CheckInContainer>
  );
};

export default CheckIn;
