import { loginFetch } from "./authService";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function registerFetch(formData) {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw data || { erro: "Erro ao cadastrar" };
  }

  return data;
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_BASE_URL}/api/users/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw data || { erro: "Erro ao solicitar recuperação de senha" };
  }

  return data;
}

export async function resetPassword(token, newPassword) {
  const response = await fetch(`${API_BASE_URL}/api/users/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw data || { erro: "Erro ao redefinir senha" };
  }

  return data;
}

function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  } catch {
    return null;
  }
}

export async function deleteOwnAccountFetch(formData) {
  const loginData = await loginFetch(formData);

  const token = loginData?.token;
  if (!token) {
    throw { erro: "Token não retornado no login" };
  }

  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw { erro: "Não foi possível identificar o usuário no token" };
  }

  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw data || { erro: "Erro ao deletar conta" };
  }

  return data;
}
