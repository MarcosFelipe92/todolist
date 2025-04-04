import { fetchWrapper } from "./utils/fetch.wrapper";

export const taskService = {
  findAll: () => fetchWrapper("/tasks", { method: "GET" }),

  findById: (id) => fetchWrapper(`/tasks/${id}`, { method: "GET" }),

  create: (task) =>
    fetchWrapper("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  update: (task) =>
    fetchWrapper(`/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    }),

  delete: (id) =>
    fetchWrapper(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
