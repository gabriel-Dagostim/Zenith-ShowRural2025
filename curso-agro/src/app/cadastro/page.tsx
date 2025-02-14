"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    if (selectedDate > today) {
      setMessage("A data de nascimento não pode estar no futuro.");
      return;
    }

    setMessage(""); 
    setForm({ ...form, birthDate: e.target.value });
  };

  const handleCheckboxChange = () => {
    setForm({ ...form, termsAccepted: !form.termsAccepted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.termsAccepted) {
      setMessage("Você precisa aceitar os termos de uso.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Cadastro realizado com sucesso!");

      const userData = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        birthDate: new Date(form.birthDate).toLocaleDateString("pt-BR"),
        email: form.email,
        memberSince: new Date().toLocaleDateString("pt-BR", { year: "numeric", month: "long" }),
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setTimeout(() => {
        router.push("/perfil");
      }, 1500);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] p-4 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#F37826]">Criar Conta</h2>

        {message && <p className="text-center text-sm mt-2 text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          {step === 1 && (
            <>
              <input type="text" name="firstName" placeholder="Nome" value={form.firstName} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
              <input type="text" name="lastName" placeholder="Sobrenome" value={form.lastName} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
              <button type="button" onClick={() => setStep(2)} className="w-full bg-[#F37826] text-white p-3 rounded-lg font-bold hover:bg-orange-600 transition">Avançar</button>
            </>
          )}

          {step === 2 && (
            <>
              <input type="text" name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition">Voltar</button>
                <button type="button" onClick={() => setStep(3)} className="bg-[#F37826] text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition">Avançar</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <input 
                type="date" 
                name="birthDate" 
                value={form.birthDate} 
                onChange={handleDateChange} 
                className="w-full p-3 border rounded-lg mb-2 text-black" 
                max={new Date().toISOString().split("T")[0]} 
                required 
              />
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition">Voltar</button>
                <button type="button" onClick={() => setStep(4)} className="bg-[#F37826] text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition">Avançar</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
              <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
              <div className="flex items-center mt-2">
                <input type="checkbox" checked={form.termsAccepted} onChange={handleCheckboxChange} className="mr-2" />
                <span className="text-sm">Eu aceito os <Link href="/termos" className="text-[#F37826] underline">termos de uso</Link>.</span>
              </div>
              <div className="flex justify-between mt-3">
                <button type="button" onClick={() => setStep(3)} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition">Voltar</button>
                <button type="submit" className="bg-[#F37826] text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition">Cadastrar</button>
              </div>
            </>
          )}
        </form>

        {/* 🚀 Adicionando opção para fazer login */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-[#F37826] font-semibold hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
