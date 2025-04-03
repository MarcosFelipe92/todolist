import Modal from "react-modal";
import {
  ModalActions,
  ModalCancelButton,
  ModalConfirmButton,
  ModalDialog,
  ModalHeader,
  ModalText,
} from "./styles";

export function DeleteModal({
  isOpen,
  onRequestClose,
  onConfirm,
  onCancel,
  title,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
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
      }}
    >
      <ModalDialog>
        <ModalHeader>Confirmar Exclusão</ModalHeader>
        <ModalText>
          Tem certeza que deseja excluir a tarefa "{title}"?
        </ModalText>
        <ModalActions>
          <ModalCancelButton onClick={onCancel}>Cancelar</ModalCancelButton>
          <ModalConfirmButton onClick={onConfirm}>
            Confirmar Exclusão
          </ModalConfirmButton>
        </ModalActions>
      </ModalDialog>
    </Modal>
  );
}
