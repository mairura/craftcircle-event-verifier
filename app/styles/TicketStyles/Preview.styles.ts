import styled from "styled-components";

export const PreviewContainer = styled.section`
  display: flex;
  gap: 2rem;
  width: 100%;
  position: relative;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1px;
    padding: 10px;
    height: auto;
  }
`;

export const PreviewActionTabs = styled.div`
  display: flex;
  margin-right: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PreviewActionTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #555555;
  }
`;

export const PreviewBackArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 50%;
  background-color: #f5f5f5;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dee2e6;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  img {
    object-fit: cover;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const PreviewDetails = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 10px 3rem 10px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const PreviewData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const PreviewDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
`;

export const PreviewDetailsSectionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 10px 0;

  h4 {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
    color: #121212;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    p {
      margin: 0;
      font-size: 0.9rem;
      color: #35938d;
    }
  }
`;

export const ShareContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
    font-size: 1rem;
    color: #35938d;
    font-weight: 500;
  }

  &:hover ul {
    display: block;
  }
`;

export const ShareDropdown = styled.ul`
  display: none;
  position: absolute;
  top: 2rem;
  left: 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  z-index: 10;

  li {
    margin: 0.3rem 0;

    a {
      text-decoration: none;
      color: #333;
      font-size: 0.9rem;

      &:hover {
        color: #35938d;
      }
    }
  }
`;

export const PreviewEvent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;

  p {
    color: #444444;
    font-size: 1rem;
    text-decoration: underline;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;

export const PreviewTimeZone = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;

  div {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    p {
      color: #444444;
      font-size: 1rem;

      @media (max-width: 768px) {
        font-size: 11px;
      }
    }
  }

  @media (max-width: 768px) {
    padding-top: 1rem;
  }
`;

export const AboutPreview = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding: 0 10px;
  }
`;

export const MessageIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #555555;
  font-size: 1.2rem;
  font-weight: 500;
  border-bottom: 1px solid #aecdcb;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const AboutDetails = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
  padding: 2rem 0;

  p {
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 0 0 0;
  }
`;

export const StyledList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;

  li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #0d0d0d;
    font-weight: 300;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background: #35938d;
  height: auto;
`;

export const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    border: none;
    padding-right: 0;
    overflow-y: none;
    overflow: visible;
    max-height: unset;
  }
`;

export const StatsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 95vh;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    overflow: visible;
    border: none;
    padding-right: 0;
    overflow-y: none;
    max-height: unset;
    height: 100%;
  }
`;