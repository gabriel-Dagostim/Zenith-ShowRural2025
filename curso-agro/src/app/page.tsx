"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState("todos");

  const cursos = [
    {
      id: 1,
      title: "Drone Agrícola T30",
      image: "/products/dji_t30.jpg",
      logo: "/logos/dji.png",
      totalHours: "8h",
      company: "DJI",
      category: "Máquinas Agrícolas",
    },
    {
      id: 2,
      title: "Trator 8R",
      image: "/products/john_8r.jpg",
      logo: "/logos/john_deere.png",
      totalHours: "10h",
      company: "John Deere",
      category: "Máquinas Agrícolas",
    },
    {
      id: 3,
      title: "Motosserra MS 881",
      image: "/products/stihl_ms881.jpg",
      logo: "/logos/stihl.png",
      totalHours: "5h",
      company: "Stihl",
      category: "Ferramentas",
    },
    {
      id: 4,
      title: "Plantadeira ExactEmerge",
      image: "/products/john_exactemerge.jpg",
      logo: "/logos/john_deere.png",
      totalHours: "12h",
      company: "John Deere",
      category: "Máquinas Agrícolas",
    },
  ];

  const filteredCourses =
    filter === "todos"
      ? cursos
      : cursos.filter((curso) => curso.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#EAE0D5] text-[#4A3F35] pb-20">
      <Navbar />

      <div className="h-16"></div>

      {/* 🔹 Seção de Filtros */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#F37826] mb-4">🔍 Filtrar Cursos</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          <button onClick={() => setFilter("todos")} className={`px-4 py-2 rounded-lg ${filter === "todos" ? "bg-[#F37826] text-white" : "bg-gray-300"}`}>Todos</button>
          <button onClick={() => setFilter("Máquinas Agrícolas")} className={`px-4 py-2 rounded-lg ${filter === "Máquinas Agrícolas" ? "bg-[#F37826] text-white" : "bg-gray-300"}`}>Máquinas Agrícolas</button>
          <button onClick={() => setFilter("Ferramentas")} className={`px-4 py-2 rounded-lg ${filter === "Ferramentas" ? "bg-[#F37826] text-white" : "bg-gray-300"}`}>Ferramentas</button>
        </div>
      </div>

      {/* 🔹 Cursos Disponíveis */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#F37826] mb-4">📚 Cursos Disponíveis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((curso) => (
            <ProductCard
              key={curso.id}
              title={curso.title}
              image={curso.image}
              logo={curso.logo}
              totalHours={curso.totalHours}
              company={curso.company}
            />
          ))}
        </div>
      </div>


      

      {/* 🔹 Depoimentos de Alunos */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#F37826] mb-4">💬 Depoimentos de Alunos</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="italic">"Fiz o curso de Tratores John Deere e foi incrível! A plataforma é intuitiva e os conteúdos são de alta qualidade!"</p>
          <p className="text-right mt-2 font-bold">— João da Silva</p>
        </div>
      </div>

      {/* 🔹 Empresas Parceiras */}
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold text-[#F37826] mb-4">🤝 Empresas Parceiras</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <img src="/logos/dji.png" alt="DJI" className="h-14" />
          <img src="/logos/john_deere.png" alt="John Deere" className="h-14" />
          <img src="/logos/stihl.png" alt="Stihl" className="h-14" />
          <img src="/logos/new_holland.png" alt="New Holland" className="h-14" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
