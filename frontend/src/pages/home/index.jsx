import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, MagnifyingGlass } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";
import { Input } from "../../components/input";
import { TaskList } from "../../components/task-list";
import { taskService } from "../../services/task.service";
import {
  AddButton,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  LoadingContainer,
  ModalActions,
  ModalCancelButton,
  ModalConfirmButton,
  ModalDialog,
  ModalEditButton,
  ModalHeader,
  ModalText,
  PageContainer,
  SearchButton,
  SearchContainer,
  SearchInput,
  Spinner,
} from "./styles";

const taskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
});

export function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    setValue: setValueEdit,
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await (await taskService.findAll()).data;
        setTasks(tasks);
        setFilteredTasks(tasks);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.status.toLowerCase().includes(query.toLowerCase()) ||
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setValueEdit("title", task.title);
    setValueEdit("description", task.description);
    setValueEdit("status", task.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (data) => {
    try {
      const updatedTask = {
        ...currentTask,
        title: data.title,
        description: data.description,
        status: data.status,
      };

      await taskService.update(currentTask.id, updatedTask);

      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? updatedTask : task))
      );
      setFilteredTasks(
        filteredTasks.map((task) =>
          task.id === currentTask.id ? updatedTask : task
        )
      );

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar a tarefa.");
    }
  };

  const handleDelete = (task) => {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await taskService.delete(currentTask.id);
      setTasks(tasks.filter((task) => task.id !== currentTask.id));
      setFilteredTasks(
        filteredTasks.filter((task) => task.id !== currentTask.id)
      );
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Não foi possível excluir a tarefa.");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <h1>Gerenciador de Tarefas</h1>
        </CardHeader>

        <CardBody>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Buscar por status, título ou descrição..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <SearchButton>
              <MagnifyingGlass size={18} />
              Buscar
            </SearchButton>
            <AddButton>
              <Circle size={18} />
              Nova Tarefa
            </AddButton>
          </SearchContainer>

          {isLoading ? (
            <LoadingContainer>
              <Spinner />
              <p>Carregando tarefas...</p>
            </LoadingContainer>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          )}
        </CardBody>

        <CardFooter>Total de tarefas: {filteredTasks.length}</CardFooter>
      </Card>

      {/* Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
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
          <form onSubmit={handleSubmitEdit(handleEditSubmit)}>
            <div style={{ marginBottom: "1rem" }}>
              <Input
                {...registerEdit("title")}
                type="text"
                placeholder="Titulo"
                label="Titulo"
              />
              {errorsEdit.title && (
                <p style={{ color: "red" }}>{errorsEdit.title.message}</p>
              )}
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <Input
                {...registerEdit("description")}
                type="text"
                placeholder="Descrição"
                label="Descrição"
              />
              {errorsEdit.description && (
                <p style={{ color: "red" }}>{errorsEdit.description.message}</p>
              )}
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <Input
                {...registerEdit("status")}
                type="text"
                placeholder="Status"
                label="Status"
              />
              {errorsEdit.description && (
                <p style={{ color: "red" }}>{errorsEdit.status.message}</p>
              )}
            </div>
            <ModalActions>
              <ModalCancelButton
                type="button"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </ModalCancelButton>
              <ModalEditButton type="submit">Salvar Alterações</ModalEditButton>
            </ModalActions>
          </form>
        </ModalDialog>
      </Modal>

      {/* Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
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
            Tem certeza que deseja excluir a tarefa "{currentTask?.title}"?
          </ModalText>
          <ModalActions>
            <ModalCancelButton onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </ModalCancelButton>
            <ModalConfirmButton onClick={confirmDelete}>
              Confirmar Exclusão
            </ModalConfirmButton>
          </ModalActions>
        </ModalDialog>
      </Modal>
    </PageContainer>
  );
}
