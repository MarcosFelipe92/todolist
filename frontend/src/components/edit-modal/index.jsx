import Modal from "react-modal";
import {
  ModalActions,
  ModalCancelButton,
  ModalDialog,
  ModalEditButton,
  ModalHeader,
} from "./styles";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "./schema";
import { DateInput } from "../date-input";
import { Select } from "../select";

export function EditModal({ isOpen, onRequestClose, task, onSubmit }) {
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
        <ModalHeader>Editar Tarefa</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
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
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
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
              value={task?.completedAt}
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
            <ModalEditButton type="submit">Salvar Alterações</ModalEditButton>
          </ModalActions>
        </form>
      </ModalDialog>
    </Modal>
  );
}
