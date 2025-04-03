import React from "react";
import {
  Badge,
  DeleteButton,
  DescriptionCell,
  EditButton,
  EmptyMessage,
  StyledTable,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./styles";
import { PencilSimple, Trash } from "phosphor-react";

export function TaskList({ tasks, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  if (tasks.length === 0) {
    return (
      <EmptyMessage>
        Nenhuma tarefa encontrada. Que tal criar uma nova?
      </EmptyMessage>
    );
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            <TableHeaderCell>Título</TableHeaderCell>
            <TableHeaderCell>Descrição</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Data de Conclusão</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell style={{ fontWeight: "500" }}>{task.title}</TableCell>
              <DescriptionCell title={task.description}>
                {task.description}
              </DescriptionCell>
              <TableCell>
                <Badge status={task.status}>
                  {task.status == "COMPLETED" ? "CONCLUÍDO" : "PENDENTE"}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(task.completedAt)}</TableCell>
              <TableCell>
                <div style={{ display: "flex" }}>
                  <EditButton onClick={() => onEdit(task)} title="Editar">
                    <PencilSimple size={16} />
                  </EditButton>
                  <DeleteButton onClick={() => onDelete(task)} title="Excluir">
                    <Trash size={16} />
                  </DeleteButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
