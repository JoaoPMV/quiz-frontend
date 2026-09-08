const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function loginFetch(formData) {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw data || { erro: "Erro ao fazer login" };
  }

  return data;
}
