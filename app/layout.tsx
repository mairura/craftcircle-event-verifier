"use client";

import { ThemeProvider } from "styled-components";
import { useState } from "react";
import StyledComponentsRegistry from "./styled-registery";
import { lightTheme } from "./theme";
import { Providers } from "./Provider";
import { Outfit } from "next/font/google";
import GlobalStyles from "./styles/GlobalStyles";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme] = useState(lightTheme);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Verifier Profile</title>
      </head>
      <body className={outfit.className}>
        <GlobalStyles />
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
