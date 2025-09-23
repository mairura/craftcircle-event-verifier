"use client";

import ToastProvider from "./components/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
