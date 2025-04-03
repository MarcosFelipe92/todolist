import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  completedAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional()
  ),
});
