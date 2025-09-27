"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const StyledToastContainer = styled(ToastContainer).attrs({
  // override react-toastify defaults
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: true,
})`
  .Toastify__toast {
    padding: 0; /* let your ToastWrapper control padding */
    margin-bottom: 0.5rem;
    background: transparent;
    box-shadow: none;
    width: auto;
    min-width: unset;
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__toast-container {
    width: auto;
  }
`;

export default function ToastProvider() {
  return <StyledToastContainer />;
}
