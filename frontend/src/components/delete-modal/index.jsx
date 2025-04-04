import Modal from "react-modal";
import {
  ModalActions,
  ModalCancelButton,
  ModalConfirmButton,
  ModalDialog,
  ModalHeader,
  ModalText,
  StyledModal,
} from "./styles";
import { taskService } from "../../services/task.service";

export function DeleteModal({
  isOpen,
  onRequestClose,
  onDeleteSuccess,
  id,
  title,
}) {
  const onDelete = async () => {
    try {
      const result = await taskService.delete(id);
      if (result.success) {
        onDeleteSuccess(id);
      }
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
    onRequestClose();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <ModalDialog>
        <ModalHeader>Confirmar Exclusão</ModalHeader>
        <ModalText>
          Tem certeza que deseja excluir a tarefa "{title}"?
        </ModalText>
        <ModalActions>
          <ModalCancelButton onClick={onRequestClose}>
            Cancelar
          </ModalCancelButton>
          <ModalConfirmButton onClick={onDelete}>
            Confirmar Exclusão
          </ModalConfirmButton>
        </ModalActions>
      </ModalDialog>
    </StyledModal>
  );
}
