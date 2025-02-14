import { cookies } from "next/headers";

export const getSession = async () => {
  try {
    const cookiesList = cookies();
    const sessionCookie = cookiesList.get("session"); // 🔹 Agora usamos `await`
    
    if (!sessionCookie) return null;

    return JSON.parse(sessionCookie.value);
  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
};
