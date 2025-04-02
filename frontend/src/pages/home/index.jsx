import React, { useEffect, useState } from "react";
import { Circle, MagnifyingGlass } from "phosphor-react";
import { TaskList } from "../../components/task-list";
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
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await taskService.delete(id);
        setTasks(tasks.filter((task) => task.id !== id));
        setFilteredTasks(filteredTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Não foi possível excluir a tarefa.");
      }
    }
  };

  const handleEdit = async (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);

    const newTitle = prompt("Novo título:", taskToEdit.title);
    if (newTitle === null) return;

    const newDescription = prompt("Nova descrição:", taskToEdit.description);
    if (newDescription === null) return;

    try {
      const updatedTask = {
        ...taskToEdit,
        title: newTitle,
        description: newDescription,
      };

      await taskService.update(id, updatedTask);

      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      setFilteredTasks(
        filteredTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar a tarefa.");
    }
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
              onEdit={handleEdit}
            />
          )}
        </CardBody>

        <CardFooter>Total de tarefas: {filteredTasks.length}</CardFooter>
      </Card>
    </PageContainer>
  );
}
