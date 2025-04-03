import Modal from "react-modal";
import {
  ModalActions,
  ModalCancelButton,
  ModalDialog,
  ModalSaveButton,
  ModalHeader,
} from "./styles";
import { Input } from "../input";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "./schema";
import { DateInput } from "../date-input";
import { useEffect } from "react";

export function CreateModal({ isOpen, onRequestClose, onSubmit }) {
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
        <ModalHeader>Criar Tarefa</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                { value: "PENDING", label: "PENDENTE" },
                { value: "COMPLETED", label: "CONCLUÍDO" },
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
    </Modal>
  );
}
