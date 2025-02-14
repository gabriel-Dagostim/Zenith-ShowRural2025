"use client";
import { useState } from "react";
import Image from "next/image";
import { XMarkIcon, PlayIcon, ClockIcon } from "@heroicons/react/24/solid";
import Carousel from "./Carousel";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    company: string;
    logo: string;
    duration: string;
    description: string;
    images: string[];
    lessons: { title: string; duration: string }[];
  };
}

const CourseModal = ({ isOpen, onClose, course }: CourseModalProps) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-5 relative">
        {/* Botão de Fechar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Carrossel de Imagens */}
        <Carousel images={course.images} />

        {/* Informações do Curso */}
        <div className="mt-4 text-center">
          <div className="flex flex-col items-center">
            <Image src={course.logo} alt="Logo" width={50} height={50} className="rounded-full" />
            <h1 className="text-xl font-bold text-[#F37826] mt-2">{course.title}</h1>
          </div>
          <p className="text-gray-600 mt-2 text-sm">{course.description}</p>

          {/* Duração e Inscrição */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <ClockIcon className="h-4 w-4 text-[#F37826]" />
            <span className="text-black text-sm">{course.duration}</span>
          </div>

          {/* Botão de Inscrição e Desinscrição */}
          <div className="mt-4">
            {!isEnrolled ? (
              <button
                onClick={() => setIsEnrolled(true)}
                className="w-full py-2 rounded-lg text-white font-bold bg-[#F37826] hover:bg-orange-600 transition"
              >
                Inscrever-se
              </button>
            ) : (
              <>
                <button className="w-full py-2 rounded-lg text-white font-bold bg-gray-600 cursor-default">
                  ✅ Inscrito
                </button>
                <button
                  onClick={() => setIsEnrolled(false)}
                  className="w-full py-2 mt-2 text-[#F37826] font-bold hover:underline"
                >
                  ❌ Desinscrever-se
                </button>
              </>
            )}
          </div>
        </div>

        {/* Se o usuário estiver inscrito, mostra as aulas */}
        {isEnrolled && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-center text-[#F37826]">📖 Aulas Disponíveis</h2>
            <ul className="mt-2 text-sm text-gray-700">
              {course.lessons.map((lesson, index) => (
                <li key={index} className="flex items-center gap-2 py-1 border-b border-gray-300">
                  <PlayIcon className="h-5 w-5 text-[#F37826]" />
                  {lesson.title} - <span className="text-black">{lesson.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseModal;
