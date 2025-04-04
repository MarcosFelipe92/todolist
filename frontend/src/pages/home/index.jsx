import { Door } from "phosphor-react";
import { CreateModal } from "../../components/create-modal";
import { DeleteModal } from "../../components/delete-modal";
import { EditModal } from "../../components/edit-modal";
import { TaskList } from "../../components/task-list";
import { useModal } from "../../hooks/use.modal";
import { useTasks } from "../../hooks/use.tasks";
import { authService } from "../../services/auth.service";
import { taskService } from "../../services/task.service";
import {
  AddButton,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  LoadingContainer,
  PageContainer,
  SearchButton,
  SearchContainer,
  SearchInput,
  Spinner,
} from "./styles";
import { LogoutButton } from "../../components/logout-button";

export function Home() {
  const {
    tasks,
    filteredTasks,
    isLoading,
    searchQuery,
    handleSearch,
    setTasks,
    setFilteredTasks,
  } = useTasks();

  const {
    isEditModalOpen,
    isDeleteModalOpen,
    isCreateModalOpen,
    currentTask,
    openEditModal,
    openDeleteModal,
    openCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeCreateModal,
  } = useModal();

  const handleEditSubmit = async (data) => {
    if (!currentTask) return;

    const updatedTask = {
      ...currentTask,
      ...data,
      completedAt: data.completedAt
        ? new Date(data.completedAt).toISOString()
        : null,
    };

    try {
      const result = await taskService.update(updatedTask);
      if (result.success) {
        setTasks(
          tasks.map((task) => (task.id === currentTask.id ? updatedTask : task))
        );
        setFilteredTasks(
          filteredTasks.map((task) =>
            task.id === currentTask.id ? updatedTask : task
          )
        );
        closeEditModal();
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar a tarefa.");
    }
  };

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
        setTasks((prevTasks) => [...prevTasks, result.data]);
        setFilteredTasks((prevTasks) => [...prevTasks, result.data]);
        closeCreateModal();
      }
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Não foi possível criar a tarefa.");
    }
  };

  const confirmDelete = async () => {
    try {
      const result = await taskService.delete(currentTask.id);
      if (result.success) {
        setTasks(tasks.filter((task) => task.id !== currentTask.id));
        setFilteredTasks(
          filteredTasks.filter((task) => task.id !== currentTask.id)
        );
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
    closeDeleteModal();
  };

  const handleComplete = async (task) => {
    const updatedTask = {
      ...task,
      status: task.status != "CONCLUIDO" ? "CONCLUIDO" : "PENDENTE",
    };

    try {
      const result = await taskService.update(updatedTask);
      if (result.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? updatedTask : t))
        );
        setFilteredTasks((prev) =>
          prev.map((t) => (t.id === task.id ? updatedTask : t))
        );
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao marcar tarefa como concluída.");
    }
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <h1>Gerenciador de Tarefas</h1>
          <LogoutButton />
        </CardHeader>

        <CardBody>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Buscar por status, título ou descrição..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <SearchButton>Buscar</SearchButton>
            <AddButton onClick={openCreateModal}>Nova Tarefa</AddButton>
          </SearchContainer>

          {isLoading ? (
            <LoadingContainer>
              <Spinner />
              <p>Carregando tarefas...</p>
            </LoadingContainer>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={openDeleteModal}
              onEdit={openEditModal}
              onComplete={handleComplete}
            />
          )}
        </CardBody>

        <CardFooter>Total de tarefas: {filteredTasks.length}</CardFooter>
      </Card>

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        task={currentTask}
        onSubmit={handleEditSubmit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        title={currentTask?.title}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateModal}
        onSubmit={handleCreateSubmit}
      />
    </PageContainer>
  );
}
