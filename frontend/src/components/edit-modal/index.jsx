import Modal from "react-modal";
import {
  Form,
  ModalActions,
  ModalCancelButton,
  ModalDialog,
  ModalEditButton,
  ModalHeader,
  StyledModal,
} from "./styles";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "./schema";
import { DateInput } from "../date-input";
import { Select } from "../select";
import { taskService } from "../../services/task.service";

export function EditModal({ isOpen, onRequestClose, task, onEditSuccess }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  const handleEditSubmit = async (data) => {
    const updatedTask = {
      ...task,
      ...data,
      completedAt: data.completedAt
        ? new Date(data.completedAt).toISOString()
        : null,
    };

    try {
      const result = await taskService.update(updatedTask);
      if (result.success) {
        onEditSuccess(result.data);
        onRequestClose();
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar a tarefa.");
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <ModalDialog>
        <ModalHeader>Editar Tarefa</ModalHeader>
        <Form onSubmit={handleSubmit(handleEditSubmit)}>
          <Input
            {...register("title")}
            type="text"
            placeholder="Titulo"
            label="Titulo"
            defaultValue={task?.title}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}

          <Input
            {...register("description")}
            type="text"
            placeholder="Descrição"
            label="Descrição"
            defaultValue={task?.description}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}

          <Select
            label="Status"
            options={[
              { value: "PENDENTE", label: "PENDENTE" },
              { value: "CONCLUIDO", label: "CONCLUÍDO" },
            ]}
            value={watch("status")}
            onChange={(val) => setValue("status", val)}
          />
          {errors.status && (
            <p style={{ color: "red" }}>{errors.status.message}</p>
          )}

          <DateInput
            value={task?.completedAt}
            onChange={(date) => setValue("completedAt", date)}
            label={"Data de conclusão"}
          />
          {errors.completedAt && (
            <p style={{ color: "red" }}>{errors.completedAt.message}</p>
          )}

          <ModalActions>
            <ModalCancelButton type="button" onClick={onRequestClose}>
              Cancelar
            </ModalCancelButton>
            <ModalEditButton type="submit">Salvar Alterações</ModalEditButton>
          </ModalActions>
        </Form>
      </ModalDialog>
    </StyledModal>
  );
}
