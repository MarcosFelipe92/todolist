import { z } from "zod";

export const schemaLogin = z
  .object({
    email: z
      .string()
      .email("Por favor insira um email válido")
      .min(1, "Por favor, informe um email!"),
    password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
  })
  .transform((field) => ({
    email: field.email,
    password: field.password,
  }));
