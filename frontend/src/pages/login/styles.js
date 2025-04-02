import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const LinkWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
  width: 100%;
`;

export const StyledLink = styled(RouterLink)`
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
    text-decoration: underline;
  }
`;
