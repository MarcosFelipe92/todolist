import { Link, Navigate } from "react-router-dom";
import FormRegister from "../../components/form-register";
import { LinkWrapper, StyledLink } from "./styles";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth.provider";

export function RegisterPage() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <FormRegister />
      <LinkWrapper>
        <StyledLink to="/">Já possui uma conta?</StyledLink>
      </LinkWrapper>
    </div>
  );
}
