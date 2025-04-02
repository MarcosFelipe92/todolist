import styled from "styled-components";

export const Input = styled.input`
  border: none;
  background: transparent;
  height: 1.6rem;
  outline: none;
  width: 100%;
`;

export const Label = styled.label`
  color: #707070;
`;

export const Adornment = styled.span`
  font-size: 20px;
  color: #707070;
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

  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.6rem;

  &:focus-within {
    border-color: #1fe6dd;
    outline: 2px solid #7fe6dc;

    ${Adornment} {
      color: #1fe6dd;
    }
  }
`;
