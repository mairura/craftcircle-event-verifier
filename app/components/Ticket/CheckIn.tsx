"use client";

import { Attendee } from "@/app/hooks/useAttendeeForEvent";
import { useScanTicketFromQr } from "@/app/hooks/useScanTicketFromQr";
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
  SearchIconWrapper,
  SearchInput,
  StyledTable,
  TableWrapper,
} from "@/app/styles/TicketStyles/Stats.styles";
import { showErrorToast, showSuccessToast } from "@/app/utils/toast";
import { Clock, Wallet, Search, ScanBarcode, TicketCheck } from "lucide-react";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

type Row = {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
};

const CheckIn = ({
  summary,
  attendees = [],
}: {
  summary?: TicketTypesWithSummaryForEvent;
  attendees?: Attendee[];
}) => {
  const [scannedRows, setScannedRows] = useState<Row[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const { scanTicket } = useScanTicketFromQr();

  // Handles QR scan result
  const handleScan = async (scannedText: string | null) => {
    if (!scannedText) return;

    try {
      const ticket = await scanTicket(scannedText); // payload for mutation

      if (ticket) {
        if (ticket.scanned) {
          showSuccessToast("Ticket scanned successfully ✅");
        } else {
          showErrorToast("Ticket invalid or already used ❌");
        }

        // Add scanned ticket to state
        setScannedRows(prev => [
          ...prev,
          {
            id: prev.length + 1,
            name: `Ticket #${ticket.id}`,
            email: "",
            phone: "",
            code: ticket.transactionId,
          },
        ]);
      }

      setScannerOpen(false);
    } catch (err) {
      console.error(err);
      showErrorToast("Scanning failed. Try again.");
    }
  };

  // Handles camera errors
  const handleError = (err: Error) => {
    console.error(err);
    showErrorToast("Camera error. Please allow camera access.");
  };

  const filteredRows = attendees.filter(row =>
    row.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Search with Plus */}
        <SearchContainer>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <SearchInput
            type="search"
            placeholder="Search attendees..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <PlusIconWrapper onClick={() => setScannerOpen(true)}>
            <ScanBarcode size={16} color="#444" />
          </PlusIconWrapper>
        </SearchContainer>

        {/* Scanner Overlay */}
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
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (!!result) handleScan(result.getText());
                if (!!error) handleError(error);
              }}
              videoStyle={{ width: "90%", maxWidth: 400, borderRadius: 16 }}
            />
            <button
              style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
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
              {/* Use scannedRows for tickets scanned via QR */}
              {scannedRows.map((row, index) => (
                <tr key={row.code}>
                  <td>{index + 1}</td>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </tr>
              ))}

              {/* Existing attendees filtered */}
              {filteredRows.map((row, index) => (
                <tr key={row.ticketId}>
                  <td>{index + 1}</td>
                  <td>{row.ticketId}</td>
                  <td>{row.recipient.name}</td>
                  <td>{row.ticketType}</td>
                  <td>{row.scanned ? "✅" : "❌"}</td>
                </tr>
              ))}

              {filteredRows.length === 0 && scannedRows.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
                    No Attendees found
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
