"use client";
import { useState } from "react";
import { PlayIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const cursos = [
  {
    categoria: "Máquinas Agrícolas",
    nomeProduto: "Drone Agrícola T30",
    empresa: "DJI Agriculture",
    logoEmpresa: "/logos/dji.png",
    imagemProduto: "/products/dji_t30.jpg",
    cargaHoraria: "8h",
  },
  {
    categoria: "Máquinas Agrícolas",
    nomeProduto: "Trator 8R",
    empresa: "John Deere",
    logoEmpresa: "/logos/john_deere.png",
    imagemProduto: "/products/john_8r.jpg",
    cargaHoraria: "10h",
  },
  {
    categoria: "Implementos",
    nomeProduto: "Plantadeira ExactEmerge",
    empresa: "John Deere",
    logoEmpresa: "/logos/john_deere.png",
    imagemProduto: "/products/john_exactemerge.jpg",
    cargaHoraria: "12h",
  },
  {
    categoria: "Máquinas Agrícolas",
    nomeProduto: "Colheitadeira S700",
    empresa: "John Deere",
    logoEmpresa: "/logos/john_deere.png",
    imagemProduto: "/products/colheitadeira_s700.jpg",
    cargaHoraria: "15h",
  },
  {
    categoria: "Ferramentas",
    nomeProduto: "Motosserra Stihl MS881",
    empresa: "Stihl",
    logoEmpresa: "/logos/stihl.png",
    imagemProduto: "/products/stihl_ms881.jpg",
    cargaHoraria: "5h",
  },
  // 🔹 Adicione mais cursos conforme necessário
];

// Obtendo todas as categorias únicas para filtro
const categoriasUnicas = ["Todos", ...new Set(cursos.map((curso) => curso.categoria))];

const CursosOnline = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const cursosFiltrados = cursos.filter(
    (curso) =>
      (categoriaSelecionada === "Todos" || curso.categoria === categoriaSelecionada) &&
      curso.nomeProduto.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const handleDownload = (cursoNome: string) => {
    alert(`📥 ${cursoNome} foi adicionado ao Meus Cursos Offline!`);
  };

  const handleAcessar = () => {
    alert("🚧 Este curso ainda não está disponível.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#EAE0D5] pb-16">
      <Navbar />
      <div className="pt-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A3F35] mb-6 text-center">📚 Cursos Online</h1>

        {/* 🔹 Barra de Filtros */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {categoriasUnicas.map((categoria) => (
            <button
              key={categoria}
              className={`px-4 py-2 rounded-lg transition ${
                categoriaSelecionada === categoria
                  ? "bg-[#F37826] text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
              onClick={() => setCategoriaSelecionada(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* 🔹 Grid de Cursos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cursosFiltrados.map((curso, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={curso.imagemProduto} alt={curso.nomeProduto} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src={curso.logoEmpresa} alt={curso.empresa} className="h-6" />
                  <span className="text-gray-500 text-sm">{curso.empresa}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#4A3F35]">{curso.nomeProduto}</h3>
                <p className="text-sm text-gray-500">⏳ {curso.cargaHoraria} de duração</p>
                <div className="flex mt-3 gap-2">
                  <button
                    className="bg-[#4A3F35] text-white p-2 rounded-md flex items-center gap-2 hover:bg-[#372E25] transition w-full"
                    onClick={handleAcessar}
                  >
                    <PlayIcon className="h-5 w-5" />
                    Acessar
                  </button>
                  <button
                    className="bg-[#F37826] text-white p-2 rounded-md flex items-center gap-2 hover:bg-[#D65C1F] transition w-full"
                    onClick={() => handleDownload(curso.nomeProduto)}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CursosOnline;
