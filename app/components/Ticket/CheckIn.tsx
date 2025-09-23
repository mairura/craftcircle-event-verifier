"use client";

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
import { BrowserMultiFormatReader } from "@zxing/library";
import { Clock, Wallet, Search, ScanBarcode } from "lucide-react";
import React, { useState } from "react";

type Row = {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
};

const CheckIn = () => {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+254700000000",
      code: "ABC123",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+254711111111",
      code: "XYZ789",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const startScanner = async () => {
    if (!videoRef.current) return;
    setScannerOpen(true);

    const codeReader = new BrowserMultiFormatReader();
    try {
      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current
      );
      const scannedCode = result.getText();

      // Add a new attendee (just for testing)
      setRows((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: "New User",
          email: "",
          phone: "",
          code: scannedCode,
        },
      ]);

      setScannerOpen(false);
      codeReader.reset();
    } catch (err) {
      console.error(err);
      setScannerOpen(false);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3>105</h3>
            </CardText>
          </CheckInCard>

          <CheckInCard>
            <IconWrapper>
              <Wallet />
            </IconWrapper>
            <CardText>
              <p>Total Sold</p>
              <h3>250</h3>
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <PlusIconWrapper onClick={startScanner}>
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
            <video
              ref={videoRef}
              style={{ width: "90%", maxWidth: 400, borderRadius: "16px" }}
              autoPlay
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
              {filteredRows.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
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
