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
import {
  Clock,
  Wallet,
  ScanBarcode,
  TicketCheck,
  Check,
  X,
} from "lucide-react";
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

// ✅ Improved Modal Styles

const TicketModal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-in-out;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(6px);
    }
  }
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  width: 95%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.35s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: #555;

    strong {
      display: inline-block;
      margin-top: 0.15rem;
      font-size: 1rem;
      font-weight: 500;
      color: #222;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const TicketStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const TicketData = styled.div`
  border-radius: 8px;
  width: 100%;
  padding: 1rem 10px;
  background: #f9f9f9;
`;

const TicketInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
  padding: 1rem 10px;
  background: #f9f9f9;
  border-radius: 8px;

  div:last-child {
    text-align: right;
  }

  p strong {
    display: inline-block;
    margin-top: 0.25rem;
    font-weight: 500;
  }
`;

const CloseButton = styled.button`
  background: #35938d;
  color: #fff;
  padding: 1rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  width: 100%;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #e53935;
  }
`;

const StatusBadge = styled.span<{ scanned: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.85rem;
  background: ${(props) => (props.scanned ? "#d1fae5" : "#fee2e2")};
  color: ${(props) => (props.scanned ? "#059669" : "#dc2626")};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const CheckIn = ({ summary, ticketId, setTicketId }: CheckInProps) => {
  const [scannedRows, setScannedRows] = useState<Row[]>([]);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Row | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const { scanTicket: scanTicketById, message: idMessage } = useScanTicket();
  const { scanTicket: scanTicketFromQr, message: qrMessage } =
    useScanTicketFromQr();

  const handleTicketScan = (ticket: Row) => {
    setScannedRows((prev) => [...prev, ticket]);
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const handleScanQr = async (payload: string | null) => {
    if (!payload) return;

    // Check if ticket already scanned locally
    const existing = scannedRows.find((r) => r.transactionId === payload);
    if (existing) {
      setSelectedTicket(null);
      setModalMessage("This ticket has already been scanned.");
      setModalOpen(true);

      return;
    }

    try {
      const ticket: ScannedTicketFromQr | null =
        await scanTicketFromQr(payload);

      if (!ticket) {
        setSelectedTicket(null);
        setModalMessage("Ticket not found.");
        setModalOpen(true);
        return;
      }

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

      setSelectedTicket(row);
      setModalOpen(true);
      setTicketId(ticket.transactionId);
      setScannerOpen(false);

      if (ticket.scanned) {
        setModalMessage("This ticket has already been scanned.");
        setSelectedTicket(row);
        setModalOpen(true);
        setScannerOpen(false);
        return;
      } else {
        setScannedRows((prev) => [...prev, row]);
        setSelectedTicket(row);
        setModalMessage(null);
        setModalOpen(true);
      }
    } catch (err) {
      setSelectedTicket(null);
      setModalMessage("Ticket scan failed. Please try again.");
      setModalOpen(true);
    }
  };

  const handleScanByTicketId = async () => {
    if (!ticketId) return;

    const existing = scannedRows.find((r) => r.transactionId === ticketId);
    if (existing) {
      setSelectedTicket(null);
      setModalMessage("This ticket has already been scanned.");
      setModalOpen(true);

      return;
    }

    try {
      const ticket: ScannedTicketWithUser | null =
        await scanTicketById(ticketId);

      if (!ticket) {
        setSelectedTicket(null);
        setModalMessage("Ticket not found.");
        setModalOpen(true);

        return;
      }

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

      setSelectedTicket(row);
      setModalOpen(true);
      setTicketId("");

      if (ticket.scanned) {
        setModalMessage("This ticket has already been scanned.");
        setModalOpen(true);
      } else {
        setScannedRows((prev) => [...prev, row]);
        showSuccessToast("Ticket scanned successfully ✅");
      }
    } catch (err) {
      setSelectedTicket(null);
      setModalMessage("Ticket scan failed. Please try again.");
      setModalOpen(true);
    }
  };

  const filteredByTicketId = ticketId
    ? scannedRows.filter((r) => r.transactionId.includes(ticketId))
    : scannedRows;

  return (
    <CheckInContainer>
      <CheckInWrapper>
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
              <p>Remaining Tickets</p>
              <h3>{summary?.totalTickets ?? 0}</h3>
            </CardText>
          </CheckInCard>
        </CheckInCards>

        {/* Manual ticket ID input / QR button */}
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Ticket ID will show here..."
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
                  setSelectedTicket(null);
                  setModalMessage("Camera error. Please allow camera access.");
                  setModalOpen(true);
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

        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket ID</th>
                <th>Attendee</th>
                <th>Ticket Type</th>
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
        {/* ✅ Proper Modal Structure */}
        <TicketModal open={modalOpen}>
          <ModalContent>
            {/* ❗ If modalMessage exists → error modal */}
            {modalMessage ? (
              <>
                <TicketStatus>
                  <StatusBadge scanned={false}>
                    <X size={24} />
                  </StatusBadge>
                  <p>
                    <strong>{modalMessage}</strong>
                  </p>
                </TicketStatus>

                <CloseButton
                  onClick={() => {
                    setModalOpen(false);
                    setModalMessage(null);
                  }}
                >
                  Close
                </CloseButton>
              </>
            ) : (
              /* ✅ NORMAL TICKET DETAILS MODAL */
              selectedTicket && (
                <>
                  <TicketStatus>
                    <StatusBadge scanned={selectedTicket.scanned}>
                      {selectedTicket.scanned ? (
                        <Check size={24} />
                      ) : (
                        <X size={24} />
                      )}
                    </StatusBadge>

                    <p>
                      <strong>
                        {selectedTicket.scanned
                          ? `Success! "${selectedTicket.name}" has been checked in!`
                          : `"${selectedTicket.name}" not yet checked in`}
                      </strong>
                    </p>
                  </TicketStatus>

                  <TicketInfo>
                    <div>
                      <p>
                        Ticket Type: <br />
                        <strong>{selectedTicket.ticketTypeName}</strong>
                      </p>
                    </div>
                    <div>
                      <p>
                        Price:
                        <br />
                        <strong>KES {selectedTicket.price}</strong>
                      </p>
                    </div>
                  </TicketInfo>

                  <TicketData>
                    <p>
                      Ticket ID:
                      <br />
                      <strong>{selectedTicket.transactionId}</strong>
                    </p>
                  </TicketData>

                  <CloseButton
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedTicket(null);
                    }}
                  >
                    Okay, great!
                  </CloseButton>
                </>
              )
            )}
          </ModalContent>
        </TicketModal>
      </CheckInWrapper>
    </CheckInContainer>
  );
};

export default CheckIn;
