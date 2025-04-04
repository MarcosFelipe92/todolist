import styled from "styled-components";
import Modal from "react-modal";

export const StyledModal = styled(Modal).attrs({
  style: {
    overlay: {
      backgroundColor: "transparent",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
    },
    content: {
      backgroundColor: "transparent",
      border: "none",
      padding: 0,
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
})``;

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

export const ModalSaveButton = styled(ModalConfirmButton)`
  background: ${({ theme }) => theme.primary};

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
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
