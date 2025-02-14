import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Função para gerar um tempo aleatório para as aulas
const generateRandomTime = () => {
  const times = ["", "", "", "", "", ""];
  return times[Math.floor(Math.random() * times.length)];
};

// Função para normalizar nomes e remover acentos
const normalizeText = (text) => {
  return text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
};

export async function GET() {
  try {
    const cursosDir = path.join(process.cwd(), "public", "cursos");
    const logosDir = path.join(process.cwd(), "public", "logos");
    const cursos = [];

    if (!fs.existsSync(cursosDir)) {
      return NextResponse.json({ error: "Nenhum curso encontrado." }, { status: 404 });
    }

    const cursoPastas = fs.readdirSync(cursosDir);

    for (const pasta of cursoPastas) {
      const cursoPath = path.join(cursosDir, pasta);
      if (!fs.lstatSync(cursoPath).isDirectory()) continue;

      const [cursoNome, empresa] = pasta.split(".");
      const empresaLogo = fs.existsSync(path.join(logosDir, `${empresa.toLowerCase()}.png`))
        ? `/logos/${empresa.toLowerCase()}.png`
        : "/logos/default.png";

      const imagensDir = path.join(cursoPath, "imagens");
      const pdfDir = path.join(cursoPath, "pdf");
      const modulosDir = path.join(cursoPath, "modulos");
      const videosDir = path.join(cursoPath, "videos");

      // Obtém todas as imagens dentro da pasta imagens
      let imagens = [];
      if (fs.existsSync(imagensDir)) {
        imagens = fs
          .readdirSync(imagensDir)
          .filter((file) => file.match(/\.(jpg|jpeg|png)$/))
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map((file) => `/cursos/${pasta}/imagens/${file}`);
      }
      const capa = imagens.length > 0 ? imagens[0] : "/default-course.jpg";

      // Obtém os módulos
      let modulos = [];
      if (fs.existsSync(modulosDir)) {
        modulos = fs.readdirSync(modulosDir)
          .filter(file => file.endsWith(".pdf"))
          .map(file => ({
            nome: file.replace(".pdf", ""),
            duracao: generateRandomTime(),
            url: `/cursos/${pasta}/modulos/${file}`,
          }));
      }

      // Obtém o PDF completo, se existir
      let pdfCompleto = null;
      if (fs.existsSync(pdfDir)) {
        const pdfFiles = fs.readdirSync(pdfDir).filter(file => file.endsWith(".pdf"));
        if (pdfFiles.length > 0) {
          pdfCompleto = `/cursos/${pasta}/pdf/${pdfFiles[0]}`;
        }
      }

      // Obtém os vídeos se existirem
      let videos = [];
      if (fs.existsSync(videosDir)) {
        videos = fs.readdirSync(videosDir)
          .filter(file => file.match(/\.(mp4|webm|ogg)$/))
          .map(file => `/cursos/${pasta}/videos/${file}`);
      }

      cursos.push({
        nome: cursoNome,
        empresa,
        empresaLogo,
        capa,
        imagens,
        modulos: modulos.length > 0 ? modulos : [],
        pdfCompleto,
        videos: videos.length > 0 ? videos : [],
      });
    }

    return NextResponse.json(cursos);
  } catch (error) {
    console.error("Erro ao listar cursos:", error);
    return NextResponse.json({ error: "Erro interno ao buscar cursos." }, { status: 500 });
  }
}
