import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 9rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 12px;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 14px;
  margin-bottom: 0px;
`;

export const Button = styled.button`
  background-color: #1fe6dd;
  padding: 6px;
  border-radius: 6px;
  margin-top: 8px;
  color: white;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #17cfc6;
  }

  &:disabled {
    background-color: #7fe6dc;
    cursor: not-allowed;
  }
`;
