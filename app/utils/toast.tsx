import { toast } from "react-toastify";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import styled from "styled-components";

const ToastWrapper = styled.div<{ bg: string; border: string; color?: string }>`
  background-color: ${({ bg }) => bg};
  border: 1px solid ${({ border }) => border};
  border-radius: 2rem;
  padding: 10px 16px;
  color: ${({ color }) => color || "white"};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-family: Outfit;

  width: fit-content;
  max-width: 90vw;
  word-break: break-word;

  justify-content: flex-start;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const showSuccessToast = (message: string) =>
  toast(
    <ToastWrapper bg="#35938d" border="#4bbfb7" color="white">
      <IconWrapper>
        <CheckCircle size={20} />
      </IconWrapper>
      {message}
    </ToastWrapper>,
    {
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
      draggable: true,
      closeButton: false,
    }
  );

export const showErrorToast = (message: string) =>
  toast(
    <ToastWrapper bg="#ff4d4f" border="#d9363e" color="white">
      <IconWrapper>
        <XCircle size={20} />
      </IconWrapper>
      {message}
    </ToastWrapper>,
    {
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
      draggable: true,
      closeButton: false,
    }
  );

export const showWarningToast = (message: string) =>
  toast(
    <ToastWrapper bg="#facc15" border="#eab308" color="black">
      <IconWrapper>
        <AlertTriangle size={20} />
      </IconWrapper>
      {message}
    </ToastWrapper>,
    {
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
      draggable: true,
      closeButton: false,
    }
  );
