import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.cardShadow};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.cardHoverShadow};
  }
`;

export const CardHeader = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const CardBody = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.cardBodyBg || theme.cardBg};
`;

export const CardFooter = styled.div`
  background: ${({ theme }) => theme.cardFooterBg};
  color: ${({ theme }) => theme.textSecondary};
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryLight};
  }
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;

export const AddButton = styled(SearchButton)`
  background: ${({ theme }) => theme.success};
  margin-left: auto;

  &:hover {
    background: ${({ theme }) => theme.successDark};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
`;

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid ${({ theme }) => theme.primaryLight};
  border-top-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
