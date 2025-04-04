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

  const updateTasksState = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setFilteredTasks(
      filteredTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const removeTaskState = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setFilteredTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTaskState = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setFilteredTasks((prevFilteredTasks) => [...prevFilteredTasks, newTask]);
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
              onTaskUpdate={updateTasksState}
            />
          )}
        </CardBody>
        <CardFooter>Total de tarefas: {filteredTasks.length}</CardFooter>
      </Card>

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        task={currentTask}
        onEditSuccess={updateTasksState}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onDeleteSuccess={removeTaskState}
        id={currentTask?.id}
        title={currentTask?.title}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateModal}
        onCreateSuccess={addTaskState}
      />
    </PageContainer>
  );
}
