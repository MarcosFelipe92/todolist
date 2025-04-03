import { DeleteModal } from "../../components/delete-modal";
import { EditModal } from "../../components/edit-modal";
import { TaskList } from "../../components/task-list";
import { useModal } from "../../hooks/use.modal";
import { useTasks } from "../../hooks/use.tasks";
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
    currentTask,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
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
            <SearchButton>Buscar</SearchButton>
            <AddButton>Nova Tarefa</AddButton>
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
        handleSubmit={handleEditSubmit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        title={currentTask?.title}
      />
    </PageContainer>
  );
}
