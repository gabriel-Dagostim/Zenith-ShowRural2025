export const getUser = async () => {
    try {
      const res = await fetch("/api/auth/user", { credentials: "include" });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  };
  