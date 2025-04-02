import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import GlobalStyle from "./GlobalStyle";
import { Home } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ProtectedRoute } from "./components/protected-routes";
import { RegisterPage } from "./pages/register";
import { authService } from "./services/auth.service";
import { Door } from "phosphor-react";

export function App() {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!authService.getToken()
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <button onClick={toggleTheme} style={{ borderRadius: "5px" }}>
            {theme === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Door /> Logout
            </button>
          )}
        </div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
