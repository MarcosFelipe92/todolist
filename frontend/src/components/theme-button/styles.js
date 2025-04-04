import styled from "styled-components";

export const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.themeToggleBg};
  color: ${({ theme }) => theme.themeToggleColor};
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px ${({ theme }) => theme.shadow};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
