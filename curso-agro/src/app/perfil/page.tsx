"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; cursosCompletos: string[] } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
          setUser(JSON.parse(storedUser));
        } else {
          const res = await fetch("/api/auth/user", { method: "GET", credentials: "include" });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            console.error("Erro ao obter usuário:", res.status);
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    fetch("/api/auth/logout", { method: "POST", credentials: "include" })
      .then(() => router.push("/login"))
      .catch((err) => console.error("Erro ao fazer logout:", err));
  };

  const handleDownloadCertificate = (curso: string) => {
    // Lógica para baixar o certificado (ainda será implementada)
    console.log(`Baixando certificado de ${curso}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black">
      <Navbar />
      
      {/* Seção do Perfil */}
      <div className="bg-white shadow-md rounded-lg p-6 mx-4 mt-16">
        <div className="flex flex-col items-center">
          <UserCircleIcon className="h-24 w-24 text-gray-500" />
          {user && (
            <h2 className="text-xl font-semibold text-[#F37826] mt-2">{user.firstName} {user.lastName}</h2>
          )}
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Seção de Certificados */}
      <div className="bg-white shadow-md rounded-lg p-6 mx-4 mt-4">
        <h2 className="text-xl font-semibold text-[#F37826] mb-3">📜 Certificados</h2>

        {user?.cursosCompletos?.length ? (
          <ul className="space-y-3">
            {user.cursosCompletos.map((curso, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                  <span className="text-gray-800">{curso}</span>
                </div>
                <button
                  onClick={() => handleDownloadCertificate(curso)}
                  className="bg-[#F37826] text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
                >
                  📥 Baixar Certificado
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhum curso concluído ainda.</p>
        )}
      </div>

      {/* Botão de Logout */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 flex items-center gap-2"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Sair da Conta
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
