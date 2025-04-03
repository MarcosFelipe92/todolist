import Cookies from "js-cookie";
import { authService } from "./auth.service";

const API_URL = "http://localhost:8080";

export const taskService = {
  findAll: async () => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage = "Erro ao buscar Tarefas.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      return { success: true, data: data };
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },

  findById: async (id) => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage = "Erro ao buscar Tarefa.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      return { success: true, data: data };
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },

  create: async (title, description, status, completedAt) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status,
          completedAt,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao adicionar Tarefa.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },

  update: async (task) => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao atualizar Tarefa.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },

  delete: async (id) => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage = "Erro ao deletar Tarefa.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },
};
