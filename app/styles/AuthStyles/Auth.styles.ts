import styled, { keyframes } from "styled-components";

export const AuthFormContainer = styled.div`
  width: 100%;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  width: 100%;
  min-height: 100vh;
  background-image: url("/AuthBox.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    padding-top: 3rem;
    height: 100%;
    width: 100%;
  }
`;

export const AuthImages = styled.div`
  width: 30%;
  flex-shrink: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: auto;

  img {
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1110px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: 20px;
  width: 80%;
  gap: 5rem;
  height: 50vh;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  @media (max-width: 1110px) {
    gap: 4rem;
  }

  @media (max-width: 1024px) {
    width: 90%;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    align-items: stretch;
    max-height: none;
  }
`;

export const AuthBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  @media (max-width: 768px) {
    height: auto;
    overflow: hidden;
    align-items: flex-start;
  }
`;

export const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #b9e0de;
  border-radius: 20px;
  padding: 40px;
  background: rgba(232, 245, 244, 0.5);
  backdrop-filter: blur(2px);
  width: 100%;
  flex: 1;
  max-width: 35vw;
  min-width: 320px;
  //   overflow-y: auto;
  // align-self: stretch;
  // flex-shrink: 0;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  @media (max-width: 1110px) {
    max-width: 50vw;
    padding: 30px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: unset;
    width: 100%;
    padding: 2rem 1rem;
    border-radius: 0;
    border: none;
    background: none;
    justify-content: flex-start;
    flex: unset;
    overflow-y: hidden;
  }
`;

export const WrapImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  height: 100%;

  .image-box {
    overflow: hidden;
    transform: skewY(-3deg);
    animation: float 6s ease-in-out infinite;
  }

  .image-box:nth-child(even) {
    transform: skewY(-3deg) translateY(15px);
    animation-delay: 1.5s;
  }

  @keyframes float {
    0% {
      transform: skewY(-3deg) translateY(0px);
    }
    50% {
      transform: skewY(-3deg) translateY(-10px);
    }
    100% {
      transform: skewY(-3deg) translateY(0px);
    }
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  position: relative;
  overflow: hidden;
`;

export const AuthHeader = styled.div`
  color: #050505;
  font-weight: 700;
  font-size: clamp(1rem, -4rem + 16vw, 2rem);
  padding-bottom: 5px;
  font-family: Outfit;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerProps {
  size?: number;
  color?: string;
  background?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  width: ${({ size }) => size || 20}px;
  height: ${({ size }) => size || 20}px;
  border: 3px solid ${({ background }) => background || "#e8f5f480"};
  border-top: 3px solid ${({ color }) => color || "#e8f5f4"};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const AuthTag = styled.h4`
  color: #828282;
  font-family: Outfit;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AuthFields = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  width: 100%;
  // gap: clamp(0.5rem, 2vw, 2rem);
`;

export const FieldNames = styled.div`
  display: flex;
  gap: 3rem;

  label {
    font-weight: 500;
    font-style: medium;
    font-size: 12px;
    color: #1a1a1a;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const AuthCredentials = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

export const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  align-self: stretch;
  width: 100%;

  label {
    color: #1a1a1a;
    font-family: Outfit;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const AuthButton = styled.button`
  border-radius: 8px;
  background: var(--CF-Primary, #35938d);
  border: none;
  padding: 0 16px;
  margin: 1rem 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: Outfit;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  gap: 10px;
  cursor: pointer;
  font-style: semi-bold;
  height: 45px;
`;

export const AuthGoogle = styled(AuthButton)`
  background: transparent;
  color: #1a1a1a;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6e1f5;
  margin-top: 1rem;
  cursor: pointer;
`;

export const AuthLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #828282;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 2rem;
  font-family: Outfit;

  div {
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  div > a {
    color: #1a1a1a;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    font-style: semi-bold;

    &:hover {
      color: #35938d;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  @media (max-width: 768px) {
    align-items: flex-end;
    height: 100%;
  }
`;

export const OTPBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
`;

export const StyledInput = styled.input`
  display: flex;
  height: clamp(40px, 4vh, 50px);
  padding: 0 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  width: 100%;
  border: 1px solid #d6e1f5;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 4px;
  margin-bottom: 12px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  font-family: Outfit;

  &::placeholder {
    color: #828282;
    font-family: Outfit;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:focus {
    border-color: #35938d;
    outline: none;
  }
`;

export const AuthFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    img {
      width: 330px;
      height: 200px;
      object-fit: contain;
    }
  }
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  color: #000;
  padding: 10px;
  cursor: pointer;
  font-family: Outfit;
  font-size: 1rem;
  font-weight: 400;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
