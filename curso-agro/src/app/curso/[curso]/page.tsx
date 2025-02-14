"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { XMarkIcon, PlayIcon, ClockIcon } from "@heroicons/react/24/solid";
import Carousel from "@/components/Carousel";

const CourseDetails = () => {
  const params = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseTitle, setCourseTitle] = useState<string | null>(null);

  useEffect(() => {
    if (params?.curso) {
      setCourseTitle(decodeURIComponent(params.curso.replace(/-/g, " ")));
    }
  }, [params]);

  if (!courseTitle) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-bold text-[#F37826]">Carregando curso...</p>
      </div>
    );
  }

  // Simulação de dados do curso
  const courseData = {
    title: courseTitle,
    company: "DJI",
    logo: "/logos/dji.png",
    duration: "5 horas",
    description:
      "Este curso ensina tudo sobre o uso de drones na agricultura, incluindo técnicas de pulverização, mapeamento e monitoramento de culturas.",
    images: ["/products/dji_t30.jpg", "/products/dji_p4.jpg", "/products/dji_mavic3.jpg"],
    lessons: [
      { title: "Introdução ao Curso", duration: "10 min" },
      { title: "Aula 1: Primeiros Passos", duration: "20 min" },
      { title: "Aula 2: Técnicas Avançadas", duration: "35 min" },
    ],
  };

  return (
    <div className="bg-[#FDFDFD] text-black min-h-screen pb-20 p-4 mt-20">
      {/* Botão para Fechar */}
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Carrossel de Imagens */}
      <Carousel images={courseData.images} />

      {/* Informações do Curso */}
      <div className="mt-4 text-center">
        <div className="flex flex-col items-center">
          <Image src={courseData.logo} alt="Logo" width={60} height={60} className="rounded-full" />
          <h1 className="text-2xl font-bold text-[#F37826] mt-2">{courseData.title}</h1>
        </div>
        <p className="text-gray-600 mt-2 text-lg">{courseData.description}</p>

        {/* Duração e Inscrição */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <ClockIcon className="h-5 w-5 text-[#F37826]" />
          <span className="text-black text-lg">{courseData.duration}</span>
        </div>

        {/* Botão de Inscrição e Desinscrição */}
        <div className="mt-4">
          {!isEnrolled ? (
            <button
              onClick={() => setIsEnrolled(true)}
              className="w-full max-w-sm py-3 rounded-lg text-white font-bold bg-[#F37826] hover:bg-orange-600 transition"
            >
              Inscrever-se
            </button>
          ) : (
            <>
              <button className="w-full max-w-sm py-3 rounded-lg text-white font-bold bg-gray-600 cursor-default">
                ✅ Inscrito
              </button>
              <button
                onClick={() => setIsEnrolled(false)}
                className="w-full max-w-sm py-2 mt-2 text-[#F37826] font-bold hover:underline flex items-center justify-center"
              >
                <XMarkIcon className="h-5 w-5 mr-2" /> Desinscrever-se
              </button>
            </>
          )}
        </div>
      </div>

      {/* Se o usuário estiver inscrito, mostra as aulas */}
      {isEnrolled && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-[#F37826]">📖 Aulas Disponíveis</h2>
          <ul className="mt-3">
            {courseData.lessons.map((lesson, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700 text-lg py-2 border-b border-gray-300">
                <PlayIcon className="h-6 w-6 text-[#F37826]" />
                {lesson.title} - <span className="text-black">{lesson.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
