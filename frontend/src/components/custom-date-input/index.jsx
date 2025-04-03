import { forwardRef } from "react";
import * as S from "./styles";

export const CustomDateInput = forwardRef(({ value, onClick, label }, ref) => {
  return (
    <>
      {label && <S.Label>{label}</S.Label>}
      <S.Container onClick={onClick}>
        <S.Input ref={ref} value={value} readOnly />
      </S.Container>
    </>
  );
});
