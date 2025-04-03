import { useState, useEffect } from "react";
import { taskService } from "../services/task.service";
import { authService } from "../services/auth.service";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.findAll();
        if (!response.success) {
          if (response.message == "Token Invalido.") {
            authService.logout();
            window.location.replace("/");
          }
        }
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredTasks(
      query
        ? tasks.filter(
            (task) =>
              task.status.toLowerCase().includes(query.toLowerCase()) ||
              task.title.toLowerCase().includes(query.toLowerCase()) ||
              task.description.toLowerCase().includes(query.toLowerCase())
          )
        : tasks
    );
  };

  return {
    tasks,
    filteredTasks,
    isLoading,
    searchQuery,
    handleSearch,
    setTasks,
    setFilteredTasks,
  };
}
