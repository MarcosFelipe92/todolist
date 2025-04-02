import FormLogin from "../../components/form-login";
import { LinkWrapper, StyledLink } from "./styles";

export function LoginPage() {
  return (
    <div>
      <FormLogin />
      <LinkWrapper>
        <StyledLink to="/register">Ainda não possui uma conta?</StyledLink>
      </LinkWrapper>
    </div>
  );
}
