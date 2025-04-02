import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 1rem;
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 0.875rem;
  margin: -0.5rem 0 0.5rem 0;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.primaryLight};
    cursor: not-allowed;
  }
`;
