import Modal from "react-modal";
import {
  ModalActions,
  ModalCancelButton,
  ModalDialog,
  ModalSaveButton,
  ModalHeader,
  StyledModal,
} from "./styles";
import { Input } from "../input";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "./schema";
import { DateInput } from "../date-input";
import { useEffect } from "react";
import { taskService } from "../../services/task.service";

export function CreateModal({ isOpen, onRequestClose, onCreateSuccess }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: "",
        description: "",
        status: "",
        completedAt: null,
      });
    }
  }, [isOpen, reset]);

  const handleCreateSubmit = async (data) => {
    const createTask = {
      ...data,
      completedAt: data.completedAt
        ? new Date(data.completedAt).toISOString()
        : null,
    };

    try {
      const result = await taskService.create(createTask);
      if (result.success) {
        onCreateSuccess(result.data);
        onRequestClose();
      }
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Não foi possível criar a tarefa.");
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <ModalDialog>
        <ModalHeader>Criar Tarefa</ModalHeader>
        <form onSubmit={handleSubmit(handleCreateSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <Input
              {...register("title")}
              type="text"
              placeholder="Titulo"
              label="Titulo"
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title.message}</p>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <Input
              {...register("description")}
              type="text"
              placeholder="Descrição"
              label="Descrição"
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
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
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <DateInput
              onChange={(date) => setValue("completedAt", date)}
              label={"Data de conclusão"}
            />
            {errors.completedAt && (
              <p style={{ color: "red" }}>{errors.completedAt.message}</p>
            )}
          </div>

          <ModalActions>
            <ModalCancelButton type="button" onClick={onRequestClose}>
              Cancelar
            </ModalCancelButton>
            <ModalSaveButton type="submit">Salvar Tarefa</ModalSaveButton>
          </ModalActions>
        </form>
      </ModalDialog>
    </StyledModal>
  );
}
