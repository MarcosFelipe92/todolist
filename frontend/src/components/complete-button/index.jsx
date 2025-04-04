import { Check } from "phosphor-react";
import { taskService } from "../../services/task.service";
import { Button } from "./styles";

export function CompleteButton({ task, onUpdateSuccess }) {
  const onComplete = async () => {
    const updatedTask = {
      ...task,
      status: task.status !== "CONCLUIDO" ? "CONCLUIDO" : "PENDENTE",
    };
    try {
      const result = await taskService.update(updatedTask);
      if (result.success) {
        onUpdateSuccess(result.data);
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao marcar tarefa como concluída.");
    }
  };

  return (
    <Button onClick={onComplete} title="Marcar como concluída/pendente">
      <Check size={16} />
    </Button>
  );
}
