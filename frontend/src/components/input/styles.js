import styled from "styled-components";

export const Input = styled.input`
  border: none;
  background: transparent;
  height: 1.6rem;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.textSecondary};
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

export const Adornment = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
`;

export const StartAdornment = styled(Adornment)`
  margin-right: 0.4em;
`;

export const EndAdornment = styled(Adornment)`
  margin-left: 0.4em;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.6rem;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryLight};

    ${Adornment} {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
