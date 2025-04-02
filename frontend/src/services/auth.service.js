import Cookies from "js-cookie";

const API_URL = "http://localhost:8080";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Erro na autenticação.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const token = data?.token;

      if (token) {
        Cookies.set("authToken", token, { expires: 7 });
        return { success: true };
      } else {
        throw new Error("Token não recebido do servidor.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },

  logout: () => {
    Cookies.remove("authToken");
  },

  getToken: () => {
    return Cookies.get("authToken");
  },

  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao cadastrar Usuário.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao conectar com o servidor.",
      };
    }
  },
};
