import styled from "styled-components";

export const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 1rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
`;

export const TableHeader = styled.thead`
  background: ${({ theme }) => theme.tableHeaderBg};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.tableRowEvenBg};
  }

  &:hover {
    background: ${({ theme }) => theme.tableRowHoverBg};
  }
`;

export const TableHeaderCell = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  vertical-align: middle;
`;

export const DescriptionCell = styled(TableCell)`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;

  ${({ status }) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "background: #fff3cd; color: #856404;";
      case "completed":
        return "background: #d4edda; color: #155724;";
    }
  }}
`;

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

export const EditButton = styled(ActionButton)`
  &:hover {
    color: ${({ theme }) => theme.warning};
  }
`;

export const DeleteButton = styled(ActionButton)`
  &:hover {
    color: ${({ theme }) => theme.danger};
  }
`;

export const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  margin-top: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;
