import { Link } from "react-router-dom";
import FormRegister from "../../components/form-register";
import { LinkWrapper, StyledLink } from "./styles";

export function RegisterPage() {
  return (
    <div>
      <FormRegister />
      <LinkWrapper>
        <StyledLink to="/">Já possui uma conta?</StyledLink>
      </LinkWrapper>
    </div>
  );
}
