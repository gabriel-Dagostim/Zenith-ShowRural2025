"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircleIcon,
  BookOpenIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import BottomNav from "@/components/BottomNav";
import ProfileTab from "@/components/ProfileTab";
import CompletedCoursesTab from "@/components/CompletedCoursesTab";
import CertificatesTab from "@/components/CertificatesTab";
import SettingsTab from "@/components/SettingsTab";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<{ firstName: string; lastName: string; phone: string; birthDate: string; email: string; memberSince: string } | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        
        // Adiciona a informação "Membro desde" se não existir
        if (!parsedUser.memberSince) {
          parsedUser.memberSince = new Date().toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
          });
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }
        
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      localStorage.removeItem("user"); // Limpa dados corrompidos
    }
  }, []);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = async () => {
    if (user) {
      const updatedUser = { ...user, [editingField!]: tempValue };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditingField(null);

      // Atualiza no backend
      try {
        const res = await fetch("/api/auth/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });

        if (res.ok) {
          setMessage("Perfil atualizado com sucesso!");
        } else {
          setMessage("Erro ao atualizar perfil.");
        }
      } catch (error) {
        setMessage("Erro de conexão com o servidor.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove os dados do usuário
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black p-4">
      {/* Cabeçalho do Perfil */}
      <div className="flex flex-col items-center">
        <UserCircleIcon className="h-24 w-24 text-gray-500" />
      </div>

      {/* Seção de Informações Pessoais */}
      {user ? (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold text-[#F37826] mb-3">Informações Pessoais</h2>
          <p className="text-gray-700"><strong>Nome:</strong> {user.firstName} {user.lastName}</p>
          <p className="text-gray-700"><strong>E-mail:</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Telefone:</strong> {user.phone}</p>
          <p className="text-gray-700"><strong>Data de Nascimento:</strong> {user.birthDate}</p>
          <p className="text-gray-700"><strong>Membro desde:</strong> {user.memberSince}</p>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">Nenhum usuário logado</p>
      )}

      {/* Seção de Edição */}
      {user && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold text-[#F37826] mb-3">Editar Informações</h2>
          
          <p className="text-gray-700 flex items-center gap-2">
            <strong>Nome:</strong>
            {editingField === "firstName" || editingField === "lastName" ? (
              <>
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="p-1 border rounded text-black"
                />
                <CheckIcon className="h-5 w-5 text-green-500 cursor-pointer" onClick={handleSave} />
                <XMarkIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => setEditingField(null)} />
              </>
            ) : (
              <>
                {user.firstName} {user.lastName}
                <PencilIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => handleEdit("firstName", user.firstName)} />
              </>
            )}
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <strong>E-mail:</strong>
            {editingField === "email" ? (
              <>
                <input
                  type="email"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="p-1 border rounded text-black"
                />
                <CheckIcon className="h-5 w-5 text-green-500 cursor-pointer" onClick={handleSave} />
                <XMarkIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => setEditingField(null)} />
              </>
            ) : (
              <>
                {user.email}
                <PencilIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => handleEdit("email", user.email)} />
              </>
            )}
          </p>
        </div>
      )}

      {/* Navegação do Perfil */}
      <div className="flex justify-between mt-6 border-b border-gray-300 pb-2 text-sm">
        <button onClick={() => setActiveTab("courses")} className={`flex-1 py-2 text-center ${activeTab === "courses" ? "border-b-2 border-[#F37826] text-[#F37826]" : "text-gray-600"}`}>
          <BookOpenIcon className="h-5 w-5 mx-auto" /> Cursos Concluídos
        </button>
        <button onClick={() => setActiveTab("certificates")} className={`flex-1 py-2 text-center ${activeTab === "certificates" ? "border-b-2 border-[#F37826] text-[#F37826]" : "text-gray-600"}`}>
          <DocumentTextIcon className="h-5 w-5 mx-auto" /> Certificados
        </button>
      </div>

      {/* Conteúdo das Abas */}
      <div className="mt-4">
        {activeTab === "courses" && <CompletedCoursesTab />}
        {activeTab === "certificates" && <CertificatesTab />}
      </div>

      {/* Botão de Logout */}
      <div className="flex justify-center mt-6">
        <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 flex items-center gap-2">
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Sair da Conta
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
