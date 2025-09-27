"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TicketLayout from "../components/Ticket/TicketLayout";
import { Spinner } from "../styles/AuthStyles/Auth.styles";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const access = sessionStorage.getItem("verifiedEventAccess");
    if (access) {
      const parsed = JSON.parse(access);
      if (parsed?.granted) {
        setIsVerified(true);
        return;
      }
    }

    // ❌ No access → redirect
    setIsVerified(false);
    router.replace("/"); // adjust your auth route path
  }, [router]);

  if (isVerified === null) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // full screen height
          width: "100%", // full width
        }}
      >
        <Spinner color="#35938d" />
        <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#444" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!isVerified) {
    return null; // already redirected
  }

  return <TicketLayout>{children}</TicketLayout>;
}
