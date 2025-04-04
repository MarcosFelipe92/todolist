import { authService } from "../auth.service";

const API_URL = "http://localhost:8080";

export async function fetchWrapper(endpoint, options = {}) {
  const token = authService.getToken();

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const responseData = isJson ? await response.json() : null;

    if (!response.ok) {
      let message = responseData?.error || "Erro ao processar requisição.";
      if (response.status === 401) message = "Token inválido.";
      return { success: false, message };
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Erro na requisição:", error);
    return {
      success: false,
      message: error.message || "Erro ao conectar com o servidor.",
    };
  }
}
