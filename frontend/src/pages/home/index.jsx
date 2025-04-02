import React, { useState } from "react";
import { TaskList } from "../../components/task-list";

export function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Tarefa 1",
      description: "Descrição da tarefa 1",
      status: "Pendente",
      dueDate: "2025-04-05",
    },
    {
      id: 2,
      title: "Tarefa 2",
      description: "Descrição da tarefa 2",
      status: "Concluída",
      dueDate: "2025-04-02",
    },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    const newTitle = prompt("Novo título:", taskToEdit.title);
    const newDescription = prompt("Nova descrição:", taskToEdit.description);
    if (newTitle && newDescription) {
      setTasks(
        tasks.map((task) =>
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
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
