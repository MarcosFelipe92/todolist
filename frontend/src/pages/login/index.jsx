import { Navigate } from "react-router-dom";
import FormLogin from "../../components/form-login";
import { LinkWrapper, StyledLink } from "./styles";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth.provider";

export function LoginPage() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <FormLogin />
      <LinkWrapper>
        <StyledLink to="/register">Ainda não possui uma conta?</StyledLink>
      </LinkWrapper>
    </div>
  );
}
