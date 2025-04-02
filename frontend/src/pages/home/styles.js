import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.cardShadow};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.cardHoverShadow};
  }
`;

export const CardHeader = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const CardBody = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.cardBodyBg || theme.cardBg};
`;

export const CardFooter = styled.div`
  background: ${({ theme }) => theme.cardFooterBg};
  color: ${({ theme }) => theme.textSecondary};
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryLight};
  }
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;

export const AddButton = styled(SearchButton)`
  background: ${({ theme }) => theme.success};
  margin-left: auto;

  &:hover {
    background: ${({ theme }) => theme.successDark};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
`;

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid ${({ theme }) => theme.primaryLight};
  border-top-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.modalOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 1rem;
`;

export const ModalText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 1.5rem 0;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ModalCancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.buttonSecondaryBg};
  color: ${({ theme }) => theme.buttonSecondaryText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.buttonSecondaryHover};
  }
`;

export const ModalConfirmButton = styled(ModalCancelButton)`
  background: ${({ theme }) => theme.danger};
  color: white;
  border: none;

  &:hover {
    background: ${({ theme }) => theme.dangerDark};
  }
`;

export const ModalEditButton = styled(ModalConfirmButton)`
  background: ${({ theme }) => theme.primary};

  &:hover {
    background: ${({ theme }) => theme.warningDark};
  }
`;

export const EditButton = styled.button`
  background: ${({ theme }) => theme.warning};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.warningDark};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.modalBackdrop};
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalDialog = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  z-index: 1001;
`;
