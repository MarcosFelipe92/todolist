import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const LinkWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
  width: 100%;
`;

export const StyledLink = styled(RouterLink)`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
