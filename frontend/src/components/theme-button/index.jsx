import { Moon, Sun } from "phosphor-react";
import { ThemeToggleButton } from "./styles";

export function ThemeButton({ theme, handleTheme }) {
  return (
    <ThemeToggleButton onClick={handleTheme}>
      {theme === "light" ? <Moon /> : <Sun />}
    </ThemeToggleButton>
  );
}
