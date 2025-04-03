import { EnvelopeSimple, LockSimple, User } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth.provider";
import { Input } from "../input";
import { schemaRegister } from "./schema";
import { Button, Container, ErrorMessage, Form } from "./styles";

import { zodResolver } from "@hookform/resolvers/zod";

export default function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaRegister),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const handleFormSubmit = async ({ username, email, password }) => {
    setLoading(true);
    setErrorForm("");
    const result = await register(username, email, password);
    setLoading(false);

    if (!result.success) {
      setErrorForm(result.message);
      return;
    }

    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          {...register("username")}
          type="text"
          placeholder="Digite seu username"
          label="Username"
          startAdornment={<User />}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}

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
          {loading ? "Carregando..." : "Cadastrar"}
        </Button>

        {errorForm && <ErrorMessage>{errorForm}</ErrorMessage>}
      </Form>
    </Container>
  );
}
