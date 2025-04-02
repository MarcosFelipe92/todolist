import { forwardRef, useId } from "react";
import * as S from "./styles";

export const Input = forwardRef(
  (
    {
      name = "",
      label = "",
      type = "text",
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const labelId = useId();

    return (
      <>
        {label && <S.Label htmlFor={labelId}>{label}</S.Label>}
        <S.Container>
          {startAdornment && (
            <S.StartAdornment>{startAdornment}</S.StartAdornment>
          )}
          <S.Input ref={ref} type={type} name={name} id={labelId} {...props} />
          {endAdornment && <S.EndAdornment>{endAdornment}</S.EndAdornment>}
        </S.Container>
      </>
    );
  }
);
