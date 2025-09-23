import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 2rem;

  background: radial-gradient(
      92.87% 268.8% at 64.72% 210.98%,
      rgba(203, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.75) 100%
    ),
    #555151;

  @media (max-width: 768px) {
    padding: 0;
    height: 100%;
  }
`;

export const Navbar = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  padding-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    height: 70px;
    justify-content: space-between;
  }
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SignOutContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  background: #f5f5f54d;
  cursor: pointer;
  height: 43px;
  width: 43px;
  justify-content: center;
`;

export const LogoWrapper = styled.div`
  cursor: pointer;
  img {
    width: 150px;
    height: auto;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    img {
      width: 110px;
    }
  }
`;
