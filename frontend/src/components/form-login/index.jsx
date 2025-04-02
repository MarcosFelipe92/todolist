import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth.provider";
import { Input } from "../input";
import { Button, Container, ErrorMessage, Form } from "./styles";
import { schemaLogin } from "./schema";

import { zodResolver } from "@hookform/resolvers/zod";

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaLogin),
    mode: "onChange",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const handleFormSubmit = async ({ email, password }) => {
    setLoading(true);
    setErrorForm("");
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setErrorForm(result.message);
      return;
    }

    navigate("/home");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          {...register("email")}
          type="text"
          placeholder="Digite seu email"
          label="Email"
          startAdornment={<EnvelopeSimple />}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          {...register("password")}
          type="password"
          placeholder="Digite sua senha"
          label="Senha"
          startAdornment={<LockSimple />}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        {errorForm && <ErrorMessage>{errorForm}</ErrorMessage>}
      </Form>
    </Container>
  );
}
