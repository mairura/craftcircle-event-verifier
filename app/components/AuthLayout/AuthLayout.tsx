import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  AuthPageWrapper,
  Logo,
  Nav,
  NavbarContainer,
  NavbarWrapper,
} from "@/app/styles/AuthStyles/Navbar.styles";
import {
  AuthBoxContainer,
  AuthContainer,
  AuthFormWrapper,
  AuthImages,
  AuthWrapper,
  BackButton,
} from "@/app/styles/AuthStyles/Auth.styles";
import { useRouter } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <AuthPageWrapper>
        <NavbarContainer>
          <NavbarWrapper>
            <Nav>
              <Logo>
                <Link href="/">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src="/Logo.svg"
                      alt="Logo"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </Link>
              </Logo>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BackButton onClick={() => router.push("/")}>
                  <Image
                    src="/World.svg"
                    alt="World Icon"
                    width={14}
                    height={14}
                  />
                  Back to Website
                </BackButton>
              </motion.div>
            </Nav>
          </NavbarWrapper>
        </NavbarContainer>

        <AuthContainer>
          <AuthBoxContainer>
            <AuthWrapper>
              <AuthImages>
                <Image
                  src="/authImage.svg"
                  width={460}
                  height={694}
                  alt=""
                  priority
                  unoptimized
                />{" "}
              </AuthImages>
              <AuthFormWrapper>{children}</AuthFormWrapper>
            </AuthWrapper>
          </AuthBoxContainer>
        </AuthContainer>
      </AuthPageWrapper>
    </>
  );
};

export default AuthLayout;
