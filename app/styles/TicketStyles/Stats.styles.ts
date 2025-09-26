import styled from "styled-components";

export const CheckInContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }
`;

export const CheckInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CheckInCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const CheckInCard = styled.div`
  background: var(--CF-White-tr, rgba(245, 245, 245, 0.3));
  border-radius: 1rem;
  padding: 1rem;
  height: 100px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }

  svg {
    width: 35px;
    height: 35px;
    color: #6c757d;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 0.75rem;
  }
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1rem;
    color: #6c757d;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 600;
    color: #212529;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 2rem;
  border-radius: 32px;
  border: 1px solid #35938d;
  font-size: 0.9rem;
  outline: none;
  font-family: Outfit;
  background: var(--CF-White-tr, rgba(245, 245, 245, 0.3));

  &::placeholder {
    color: #adb5bd;
    font-size: 0.85rem;
    font-style: italic;
  }

  &:focus {
    border-color: #35938d;
  }
`;

export const PlusIconWrapper = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #0077b6;

  &:hover {
    color: #005f86;
  }
`;

export const TableWrapper = styled.div`
  margin-top: 1rem;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--CF-White-tr, rgba(245, 245, 245, 0.3));

  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #f1f3f5;
    font-size: 0.9rem;
  }

  th {
    background: var(--CF-White-tr, rgba(245, 245, 245, 0.3));
    font-weight: 600;
    color: #495057;
  }

  tbody tr:hover {
    background: #f8f9fa;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #aecdcb;
  border-radius: 8px;
  padding: 10px;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    padding: 9px;
  }
`;
