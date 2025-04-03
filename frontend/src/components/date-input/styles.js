import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export const DatePickerWrapper = styled.div`
  .react-datepicker {
    background-color: ${({ theme }) => theme.inputBg};
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 8px;
    padding: 8px;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.textLight};
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.text};
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.textLight};
    border-radius: 50%;
  }
`;
