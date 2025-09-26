"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  LayoutWrapper,
  LogoWrapper,
  Navbar,
  NavbarContent,
  SignOutContainer,
} from "@/app/styles/TicketStyles/TicketLayout.styles";

type TicketLayoutProps = {
  children: React.ReactNode;
};

const TicketLayout: React.FC<TicketLayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <LayoutWrapper>
      <Navbar>
        <LogoWrapper onClick={() => router.push("/")}>
          <Image
            src="/footer-logo.svg"
            alt="logo"
            width={150}
            height={50}
            style={{ height: "auto" }}
            priority
          />
        </LogoWrapper>

        <NavbarContent>
          <SignOutContainer onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut size={20} />
          </SignOutContainer>

          {/* <div
            style={{ position: "relative" }}
            ref={avatarRef}
            onClick={() => router.push("/dashboard-account-setup")}
          >
            <Image
              src="/profile.svg"
              alt="Avatar"
              width={43}
              height={43}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                // cursor: "pointer",
              }}
            />
          </div> */}
        </NavbarContent>
      </Navbar>

      <main>{children}</main>
    </LayoutWrapper>
  );
};

export default TicketLayout;
