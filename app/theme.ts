import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  text: "#222",
  background: `radial-gradient(
    92.87% 268.8% at 64.72% 210.98%,
    rgba(203, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.75) 100%
  )`,
  primary: "#0070f3",
  border: "#eaeaea",
};

export const darkTheme: DefaultTheme = {
  text: "#fff",
  background: "#222",
  primary: "#1e90ff",
  border: "#333",
};
