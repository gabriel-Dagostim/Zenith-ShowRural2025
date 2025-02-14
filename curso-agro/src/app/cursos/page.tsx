"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CompanyCard from "@/components/CompanyCard";
import CourseCard from "@/components/CourseCard";
import BottomNav from "@/components/BottomNav";

export default function CoursesPage() {
  const [selectedCompany, setSelectedCompany] = useState("Todas");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cursos, setCursos] = useState([]);

  // Empresas disponíveis (logo puxado dinamicamente)
  const companies = [
    { name: "Todas", logo: "" },
    { name: "DJI", logo: "/logos/dji.png" },
    { name: "John Deere", logo: "/logos/john_deere.png" },
    { name: "Stihl", logo: "/logos/stihl.png" },
    { name: "New Holland", logo: "/logos/new_holland.png" },
  ];

  // Categorias dos cursos (exemplo inicial, pode ser expandido no futuro)
  const categories = ["Todos", "Máquinas", "Drones", "Ferramentas", "Tecnologia"];

  // Busca os cursos na API
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch("/api/cursos");
        if (!res.ok) throw new Error("Erro ao buscar cursos.");
        const data = await res.json();
        setCursos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCursos();
  }, []);

  // Filtra os cursos baseando-se nas seleções do usuário
  const filteredCourses = cursos.filter(
    (course) =>
      (selectedCompany === "Todas" || course.empresa === selectedCompany) &&
      (selectedCategory === "Todos" || categories.includes(selectedCategory))
  );

  return (
    <div className="bg-[#FDFDFD] text-black min-h-screen pb-20 mt-20">
      <Navbar />

      {/* Seção de Filtros */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#F37826]">Filtrar Cursos</h2>
        <div className="flex gap-4 mt-3">
          {/* Filtro por Empresa */}
          <select
            className="bg-white text-black border border-gray-300 rounded-lg px-4 py-2"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map((company) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>

          {/* Filtro por Categoria */}
          <select
            className="bg-white text-black border border-gray-300 rounded-lg px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Seção de Empresas */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-[#F37826] mb-4">Cursos por Empresas</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {companies.slice(1).map((company) => (
            <CompanyCard key={company.name} name={company.name} logo={company.logo} />
          ))}
        </div>
      </div>

      {/* Seção de Cursos Disponíveis */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#F37826] mb-4">📚 Cursos Disponíveis</h2>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                nome={course.nome}
                empresa={course.empresa}
                capa={course.capa}
                modulos={course.modulos}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4 text-center">Nenhum curso encontrado com os filtros selecionados.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
