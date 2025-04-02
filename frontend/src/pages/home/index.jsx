import React, { useEffect, useState } from "react";
import { TaskList } from "../../components/task-list";
import { taskService } from "../../services/task.service";

export function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      const tasks = await (await taskService.findAll()).data;
      setTasks(tasks);
      setFilteredTasks(tasks);
    };
    fetchTask();
  }, []);

  const handleSearch = (query) => {
    if (query === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.status.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    const newTitle = prompt("Novo título:", taskToEdit.title);
    const newDescription = prompt("Nova descrição:", taskToEdit.description);
    if (newTitle && newDescription) {
      setTasks(
        filteredTasks.map((task) =>
          task.id === id
            ? { ...task, title: newTitle, description: newDescription }
            : task
        )
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1>Bem-vindo ao Gerenciador de Tarefas!</h1>
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
