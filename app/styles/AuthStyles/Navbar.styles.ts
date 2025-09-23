import Link from "next/link";
import styled from "styled-components";

export const AuthPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // background: radial-gradient(
  //   92.87% 268.8% at 64.72% 210.98%,
  //   rgba(203, 255, 255, 0.75) 0%,
  //   rgba(255, 255, 255, 0.75) 100%
  // );
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

export const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(50px);

  @media (max-width: 768px) {
    height: 70px;
  }
`;

export const NavbarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 0 3rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0rem;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 154px;
  height: 70px;

  @media (max-width: 768px) {
    width: 100px;
    height: 50px;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileNavList = styled.ul`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: #e8f5f480;
    gap: 2rem;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
    overflow-y: auto;
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  list-style: none;
  cursor: pointer;
  width: 100%;

  a,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 8px 16px;
    font-size: 1rem;
    line-height: 24px;
    color: #121212;
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 100px;
    font-weight: 400;
    font-family: Outfit;
  }
  &.active a {
    background-color: #aecdcb;
    border: 1px solid ${({ theme }) => theme.border};
    color: #121212;
  }

  @media (max-width: 768px) {
    &.active a {
      width: 90%;
      margin: 0 auto;
    }
  }
`;

export const NavButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: #aecdcb;
  border: none;
  color: #121212;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  margin-right: 1rem;

  &:hover {
    background-color: #35938d;
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #aecdcb;
  border: none;
  color: #121212;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  margin-left: 1rem;
  font-family: Outfit;
`;

export const RedirectLinks = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #333;
  font-family: Outfit;
`;
