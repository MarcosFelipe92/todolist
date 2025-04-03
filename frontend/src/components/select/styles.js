import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.6rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Selected = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

export const DropdownIcon = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const Options = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.6rem;
  margin-top: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

export const Option = styled.li`
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
  color: ${({ theme }) => theme.text};

  &:hover {
    background: ${({ theme }) => theme.primaryLight};
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.textSecondary};
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;
