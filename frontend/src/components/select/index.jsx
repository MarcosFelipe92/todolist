import { useState } from "react";
import * as S from "./styles";

export const Select = ({ name, label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Selecione";

  return (
    <>
      {label && <S.Label>{label}</S.Label>}
      <S.Container onClick={() => setIsOpen(!isOpen)}>
        <S.Selected>{selectedLabel}</S.Selected>
        <S.DropdownIcon>▼</S.DropdownIcon>

        {isOpen && (
          <S.Options>
            {options.map((option) => (
              <S.Option
                key={option.value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </S.Option>
            ))}
          </S.Options>
        )}
      </S.Container>
    </>
  );
};
