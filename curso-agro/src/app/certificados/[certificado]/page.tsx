"use client";
import { useRouter } from "next/navigation";

const CertificadoPage = ({ params }: { params: { certificado: string } }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] text-black">
      <h1 className="text-2xl font-bold text-[#F37826]">Certificado de {params.certificado}</h1>
      <embed src={`/certificados/${params.certificado}.pdf`} width="80%" height="600px" />

      <button onClick={() => router.push("/perfil")} className="mt-4 bg-[#F37826] text-white px-4 py-2 rounded-lg">
        🔙 Voltar ao Perfil
      </button>
    </div>
  );
};

export default CertificadoPage;
