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
import { Scanner } from "@yudiel/react-qr-scanner"; // Correct import

type Row = {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
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
  const handleScanQr = async (scannedText: string | null) => {
    if (!scannedText) return;
    try {
      const ticket: ScannedTicketFromQr | null = await scanTicketFromQr(
        scannedText
      );
      if (!ticket) return;

      showSuccessToast(
        ticket.scanned ? "Ticket scanned ✅" : "Ticket invalid ❌"
      );

      setScannedRows((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: `Ticket #${ticket.id}`,
          email: "",
          phone: "",
          code: ticket.transactionId,
        },
      ]);

      setTicketId(ticket.transactionId);
      setScannerOpen(false);
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
      const ticket: ScannedTicketWithUser | null = await scanTicketById(
        ticketId
      );
      if (!ticket) return showErrorToast("Ticket not found.");

      showSuccessToast(
        ticket.scanned ? "Ticket scanned ✅" : "Ticket invalid ❌"
      );

      setScannedRows((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: ticket.user?.name || `Ticket #${ticket.id}`,
          email: ticket.user?.name || "",
          phone: "",
          code: ticket.transactionId,
        },
      ]);

      setTicketId(""); // reset after scanning
    } catch (err) {
      console.error(err);
      showErrorToast("Ticket scan failed.");
    }
  };

  const filteredByTicketId = ticketId
    ? scannedRows.filter((r) => r.code.includes(ticketId))
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
                overflow: "hidden", // optional, for rounded corners
              }}
            >
              <Scanner
                onScan={(detectedCodes) => {
                  if (detectedCodes.length === 0) return;
                  console.log("Detected codes:", detectedCodes);
                  handleScanQr(detectedCodes[0].rawValue);
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
                <th>Ticket Code</th>
                <th>Attendee</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredByTicketId.map((row, index) => (
                <tr key={row.code}>
                  <td>{index + 1}</td>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </tr>
              ))}
              {noRecordsFound && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
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
