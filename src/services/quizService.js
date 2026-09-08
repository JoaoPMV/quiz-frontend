const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getQuestions() {
  const response = await fetch(`${API_BASE_URL}/api/questions`);
  if (!response.ok) throw new Error("Erro ao buscar questões");
  return response.json();
}
