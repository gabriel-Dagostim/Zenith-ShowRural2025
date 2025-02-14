"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import BottomNav from "@/components/BottomNav";

type Modulo = {
  nome: string;
  duracao: string;
  url: string;
};

type Curso = {
  nome: string;
  empresa: string;
  empresaLogo: string;
  imagens: string[];
  pdfCompleto: string;
  modulos: Modulo[];
  videos: string[];
};

const CourseDetailsPage = () => {
  const params = useParams();
  const nomeCursoUrl = params?.curso ? decodeURIComponent(params.curso as string) : "";
  
  const [curso, setCurso] = useState<Curso | null>(null);
  const [progresso, setProgresso] = useState(0);
  const [modulosConcluidos, setModulosConcluidos] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const res = await fetch("/api/cursos");
        if (!res.ok) throw new Error("Erro ao buscar cursos.");
        const cursos = await res.json();
        const cursoSelecionado = cursos.find((c: Curso) => c.nome === nomeCursoUrl);

        if (cursoSelecionado) {
          setCurso(cursoSelecionado);

          // Buscar progresso do usuário no MongoDB
          const progressoRes = await fetch(`/api/progresso?cursoNome=${cursoSelecionado.nome}`);
          const progressoData = await progressoRes.json();
          
          if (progressoData) {
            setModulosConcluidos(progressoData.modulosConcluidos || []);
            setProgresso(progressoData.progresso || 0);
          }
        } else {
          console.error("Curso não encontrado:", nomeCursoUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (nomeCursoUrl) fetchCurso();
  }, [nomeCursoUrl]);

  const marcarModuloConcluido = async (modulo: string) => {
    if (!curso) return;

    if (!modulosConcluidos.includes(modulo)) {
      const novosModulos = [...modulosConcluidos, modulo];
      setModulosConcluidos(novosModulos);
      const progressoCalculado = Math.round((novosModulos.length / curso.modulos.length) * 100);
      setProgresso(progressoCalculado);

      await fetch("/api/progresso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cursoNome: curso.nome,
          progresso: progressoCalculado,
          modulosConcluidos: novosModulos,
        }),
      });
    }
  };

  if (!curso) return <p className="text-center text-gray-600">Carregando curso...</p>;

  return (
    <div className="bg-[#FDFDFD] text-black min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-[#F37826] text-center">{curso.nome}</h1>

      <div className="mt-2 flex items-center gap-2">
        <Image src={curso.empresaLogo} alt={curso.empresa} width={60} height={60} className="h-10 w-10 object-contain" />
        <p className="text-gray-600 text-sm md:text-base">{curso.empresa}</p>
      </div>

      <div className="mt-4 w-full max-w-lg">
        <ImageCarousel images={curso.imagens} />
      </div>

      <p className="text-lg font-semibold text-gray-700 mt-4">⏳ Progresso: {progresso}%</p>
      <div className="w-full max-w-lg mt-2 h-4 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full bg-[#4CAF50] transition-all duration-300" style={{ width: `${progresso}%` }}></div>
      </div>

      {curso.pdfCompleto && (
        <div className="mt-6">
          <a href={curso.pdfCompleto} download className="bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition">
            📄 Baixar Curso Completo (PDF)
          </a>
        </div>
      )}

      <h2 className="text-lg font-semibold text-[#F37826] mt-6">📖 Aulas Disponíveis</h2>
      {curso.modulos.length > 0 ? (
        <ul className="text-sm text-gray-700 mt-2 space-y-2">
          {curso.modulos.map((modulo, index) => (
            <li key={index} className="p-2 border-b border-gray-300 flex justify-between">
              <a href={modulo.url} download onClick={() => marcarModuloConcluido(modulo.nome)} className={`text-[#009DFF] underline ${modulosConcluidos.includes(modulo.nome) ? "line-through text-gray-500" : ""}`}>
                {modulo.nome}
              </a>
              <span className="text-gray-500">{modulo.duracao}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum módulo disponível.</p>
      )}

      <h2 className="text-lg font-semibold text-[#F37826] mt-6">🎥 Vídeos do Curso</h2>
      {curso.videos.length > 0 ? curso.videos.map((video, index) => (
        <video key={index} controls src={video} className="w-full max-w-lg mt-2"></video>
      )) : <p className="text-gray-500">Este curso não possui vídeos.</p>}
      <div className="mt-10"><BottomNav /></div>
      
    </div>
  );
};
export default CourseDetailsPage;
