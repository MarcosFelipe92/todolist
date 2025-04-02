import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.text};
    font-family: Arial, sans-serif;
    transition: all 0.3s ease-in-out;
  }
`;

export default GlobalStyle;
