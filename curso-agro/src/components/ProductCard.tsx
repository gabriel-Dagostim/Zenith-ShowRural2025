"use client";
import { useState } from "react";
import Image from "next/image";
import { PlayIcon, ClockIcon } from "@heroicons/react/24/solid";
import CourseModal from "./CourseModal";

interface ProductCardProps {
  title: string;
  image: string;
  logo: string;
  totalHours: string;
  company: string;
}

const ProductCard = ({ title, image, logo, totalHours, company }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courseData = {
    title,
    company,
    logo,
    description: "Aprenda tudo sobre esse curso com vídeos exclusivos.",
    duration: `${totalHours} horas`,
    images: [image, "/products/dji_p4.jpg", "/products/dji_mavic3.jpg"],
    lessons: [
      { title: "Introdução ao Curso", duration: "10 min" },
      { title: "Aula 1: Primeiros Passos", duration: "20 min" },
      { title: "Aula 2: Técnicas Avançadas", duration: "35 min" },
    ],
  };

  return (
    <>
      <div className="w-48 md:w-60 bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer">
        {/* Imagem do Curso */}
        <div className="relative w-full h-36">
          <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-md" />
        </div>

        {/* Logo da Empresa e Nome do Curso */}
        <div className="flex items-center gap-2 mt-3">
          <Image src={logo} alt="Logo" width={35} height={35} className="rounded-full" />
          <h3 className="text-black text-sm font-semibold truncate">{title}</h3>
        </div>

        {/* Tempo de Duração */}
        <div className="flex items-center text-gray-500 text-xs mt-2">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{totalHours} horas de tutorial</span>
        </div>

        {/* Botão de Ver Detalhes */}
        <div className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#F37826] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition"
          >
            <PlayIcon className="h-5 w-5" /> Ver Detalhes
          </button>
        </div>
      </div>

      {/* Modal de informações do curso */}
      <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={courseData} />
    </>
  );
};

export default ProductCard;
