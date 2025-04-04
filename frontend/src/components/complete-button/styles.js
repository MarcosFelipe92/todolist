import styled from "styled-components";

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    background: ${({ theme }) => theme.buttonHoverBg};
    color: ${({ theme }) => theme.primary};
  }

  & + & {
    margin-left: 0.5rem;
  }
`;

export const Button = styled(ActionButton)`
  &:hover {
    color: ${({ theme }) => theme.success};
  }
`;
