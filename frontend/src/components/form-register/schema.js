import { z } from "zod";

export const schemaRegister = z
  .object({
    username: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z
      .string()
      .email("Por favor insira um email válido")
      .min(1, "Por favor, informe um email!"),
    password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
  })
  .transform((field) => ({
    username: field.email,
    email: field.email,
    password: field.password,
  }));
