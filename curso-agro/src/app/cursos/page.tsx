"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CompanyCard from "@/components/CompanyCard";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";

export default function CoursesPage() {
  const [selectedCompany, setSelectedCompany] = useState("Todas");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const companies = [
    { name: "Todas", logo: "" },
    { name: "DJI", logo: "/logos/dji.png" },
    { name: "John Deere", logo: "/logos/john_deere.png" },
    { name: "Stihl", logo: "/logos/stihl.png" },
    { name: "New Holland", logo: "/logos/new_holland.png" },
  ];

  const categories = ["Todos", "Máquinas", "Drones", "Ferramentas", "Tecnologia"];

  const courses = [
    { title: "Drone Agrícola T30", company: "DJI", image: "/products/dji_t30.jpg", totalHours: "5", category: "Drones" },
    { title: "Drone Phantom 4 RTK", company: "DJI", image: "/products/dji_p4.jpg", totalHours: "3.5", category: "Drones" },
    { title: "Mavic 3 Enterprise", company: "DJI", image: "/products/dji_mavic3.jpg", totalHours: "4", category: "Drones" },
    { title: "Trator 8R", company: "John Deere", image: "/products/john_8r.jpg", totalHours: "4.2", category: "Máquinas" },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCompany === "Todas" || course.company === selectedCompany) &&
      (selectedCategory === "Todos" || course.category === selectedCategory)
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

      {/* Seção de Cursos Filtrados */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#F37826] mb-4">Cursos Disponíveis</h2>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
            {filteredCourses.map((course, index) => (
              <ProductCard
                key={index}
                title={course.title}
                image={course.image}
                logo={`/logos/${course.company.toLowerCase().replace(/\s+/g, "_")}.png`}
                totalHours={course.totalHours}
                company={course.company}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">Nenhum curso encontrado com os filtros selecionados.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
