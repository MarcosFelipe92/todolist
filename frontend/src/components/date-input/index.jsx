import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapper } from "./styles";
import { CustomDateInput } from "../custom-date-input";

export function DateInput({ value, onChange, label }) {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) =>
          onChange(date ? date.toISOString().split("T")[0] : "")
        }
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/AAAA"
        customInput={<CustomDateInput />}
      />
    </DatePickerWrapper>
  );
}
