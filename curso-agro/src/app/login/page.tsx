"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Login realizado com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#F37826]">Login</h2>

        {message && <p className="text-center text-sm mt-2 text-gray-600">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-2 text-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-2 text-black"
            required
          />
          <button className="w-full bg-[#F37826] text-white p-3 rounded-lg font-bold hover:bg-orange-600 transition">
            Entrar
          </button>
        </form>

        {/* 🚀 Adicionando opção para se cadastrar */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Ainda não tem uma conta?{" "}
            <Link href="/cadastro" className="text-[#F37826] font-semibold hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
