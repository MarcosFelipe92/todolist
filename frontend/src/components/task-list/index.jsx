import React from "react";

export function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="mt-4">
      <h2>Lista de Tarefas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data de Conclusão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => onEdit(task.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => onDelete(task.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
